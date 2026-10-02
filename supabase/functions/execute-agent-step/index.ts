/* eslint-disable */
import { withSupabase } from 'npm:@supabase/server'

async function logEvent(supabaseAdmin: any, executionId: string, event: string, details?: any) {
  await supabaseAdmin.from('agent_execution_logs').insert({
    execution_id: executionId,
    event,
    details: details || {}
  })
}

export default {
  fetch: withSupabase({ auth: 'none' }, async (req, ctx) => {
    const startTime = Date.now()
    const TIMEOUT_MS = 25000
    // 1. Parse the incoming webhook payload from the database trigger
    const { execution_id } = await req.json()
    
    // 2. Use the admin client to fetch the pending execution step and its required inputs
    const { data: execution, error: fetchError } = await ctx.supabaseAdmin
      .from('agent_executions')
      .select('id, inputs, max_retries, retry_count, l2_workflow_steps (step_name, required_inputs)')
      .eq('id', execution_id)
      .single()

    if (fetchError || !execution) {
      return Response.json({ error: 'Execution not found' }, { status: 404 })
    }

    console.log(`AI Agent starting work on step: ${execution.l2_workflow_steps?.step_name}`)

    await ctx.supabaseAdmin
      .from('agent_executions')
      .update({ status: 'running' })
      .eq('id', execution_id)
    await logEvent(ctx.supabaseAdmin, execution_id, 'started')

    let ai_output = {}
    let tokens_used = 0
    let lastError: any = null
    const maxRetries = execution.max_retries ?? 3
    let retryCount = execution.retry_count ?? 0
    let isSuccess = false
    let isTimedOut = false

    // 3. WAKE UP THE AI BRAIN (Anthropic Claude)
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')
    const aiPrompt = `You are the ESRE OS Intelligence Engine. You are executing an autonomous L2 DAG step.
Task: ${execution.l2_workflow_steps?.step_name}
Inputs: ${JSON.stringify(execution.inputs)}

Analyze the inputs and determine the correct mitigation. 
Return ONLY valid JSON output representing your analysis, proposed actions, and confidence score. Do not wrap it in markdown block quotes, just raw JSON.`

    const delays = [1000, 2000, 4000]

    while (retryCount <= maxRetries) {
      if (Date.now() - startTime >= TIMEOUT_MS) {
        isTimedOut = true
        break
      }

      const timeRemaining = TIMEOUT_MS - (Date.now() - startTime)
      const abortController = new AbortController()
      const timeoutId = setTimeout(() => abortController.abort(), timeRemaining)

      try {
        if (!anthropicKey || anthropicKey === 'your_anthropic_api_key_here') {
          console.log('No valid Anthropic key found. Falling back to simulated output.')
          ai_output = {
            analysis: "Anomaly detected in PRISM telemetry.",
            action_taken: "Scaled up Edge resources automatically.",
            confidence: 0.98,
            note: "This is simulated output because ANTHROPIC_API_KEY was not configured."
          }
          tokens_used = 0
        } else {
          console.log(`Calling Anthropic API... (Attempt ${retryCount + 1})`)
          const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': anthropicKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              model: 'claude-3-5-sonnet-latest',
              max_tokens: 1024,
              messages: [{ role: 'user', content: aiPrompt }]
            }),
            signal: abortController.signal
          })

          if (!anthropicRes.ok) {
            const errText = await anthropicRes.text().catch(() => '')
            throw new Error(`Anthropic API error: ${anthropicRes.status} ${errText}`)
          }

          const anthropicData = await anthropicRes.json()
          const ai_text = anthropicData.content?.[0]?.text || '{}'
          const usage = anthropicData.usage || {}
          tokens_used = (usage.input_tokens || 0) + (usage.output_tokens || 0)
          
          try {
            ai_output = JSON.parse(ai_text.trim())
          } catch {
            ai_output = { raw_text: ai_text, parse_error: true }
          }
        }
        
        clearTimeout(timeoutId)
        isSuccess = true
        break
      } catch (err: any) {
        clearTimeout(timeoutId)
        lastError = err.message
        
        if (err.name === 'AbortError' || Date.now() - startTime >= TIMEOUT_MS) {
          isTimedOut = true
          break
        }

        if (retryCount < maxRetries) {
          retryCount++
          await ctx.supabaseAdmin
            .from('agent_executions')
            .update({ status: 'retrying', retry_count: retryCount })
            .eq('id', execution_id)
            
          await logEvent(ctx.supabaseAdmin, execution_id, 'retry', { error: lastError, retry_count: retryCount })
          
          const delay = delays[retryCount - 1] || 4000
          if (Date.now() - startTime + delay >= TIMEOUT_MS) {
            isTimedOut = true
            break
          }
          await new Promise(res => setTimeout(res, delay))
        } else {
          break
        }
      }
    }

    const latency_ms = Date.now() - startTime

    if (isTimedOut) {
      await ctx.supabaseAdmin
        .from('agent_executions')
        .update({ status: 'timed_out', timed_out_at: new Date().toISOString() })
        .eq('id', execution_id)
      
      await logEvent(ctx.supabaseAdmin, execution_id, 'timed_out', { latency_ms })
      return Response.json({ error: 'Execution timed out' }, { status: 504 })
    }

    if (!isSuccess) {
      await ctx.supabaseAdmin
        .from('agent_executions')
        .update({ status: 'failed', last_error: { details: lastError } })
        .eq('id', execution_id)

      await logEvent(ctx.supabaseAdmin, execution_id, 'failed', { error: lastError, latency_ms })
      return Response.json({ error: 'Execution failed after retries', details: lastError }, { status: 500 })
    }

    await logEvent(ctx.supabaseAdmin, execution_id, 'completed', { latency_ms, tokens_used })

    // 4. Mark the step as complete in the DAG
    const backendUrl = Deno.env.get('NEXT_PUBLIC_APP_URL') || 'http://host.docker.internal:3000'
    const secretKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const completeRes = await fetch(`${backendUrl}/api/l2/complete-step`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': secretKey
      },
      body: JSON.stringify({
        execution_id: execution.id,
        status: 'completed',
        outputs: ai_output,
        latency_ms,
        tokens_used
      })
    })

    const completeData = await completeRes.json()

    return Response.json({ success: true, ai_output, next_step: completeData })
  })
}
