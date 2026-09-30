import { withSupabase } from 'npm:@supabase/server'

export default {
  fetch: withSupabase({ auth: 'none' }, async (req, ctx) => {
    // 1. Parse the incoming webhook payload from the database trigger
    const { execution_id } = await req.json()
    
    // 2. Use the admin client to fetch the pending execution step and its required inputs
    const { data: execution, error: fetchError } = await ctx.supabaseAdmin
      .from('agent_executions')
      .select('id, inputs, l2_workflow_steps (step_name, required_inputs)')
      .eq('id', execution_id)
      .single()

    if (fetchError || !execution) {
      return Response.json({ error: 'Execution not found' }, { status: 404 })
    }

    console.log(`AI Agent starting work on step: ${execution.l2_workflow_steps?.step_name}`)

    let ai_output = {}

    // 3. WAKE UP THE AI BRAIN (Anthropic Claude)
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')
    
    if (!anthropicKey || anthropicKey === 'your_anthropic_api_key_here') {
      console.log('No valid Anthropic key found. Falling back to simulated output.')
      ai_output = {
        analysis: "Anomaly detected in PRISM telemetry.",
        action_taken: "Scaled up Edge resources automatically.",
        confidence: 0.98,
        note: "This is simulated output because ANTHROPIC_API_KEY was not configured."
      }
    } else {
      console.log('Calling Anthropic API...')
      try {
        const aiPrompt = `You are the ESRE OS Intelligence Engine. You are executing an autonomous L2 DAG step.
Task: ${execution.l2_workflow_steps?.step_name}
Inputs: ${JSON.stringify(execution.inputs)}

Analyze the inputs and determine the correct mitigation. 
Return ONLY valid JSON output representing your analysis, proposed actions, and confidence score. Do not wrap it in markdown block quotes, just raw JSON.`

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
          })
        })

        const anthropicData = await anthropicRes.json()
        const ai_text = anthropicData.content?.[0]?.text || '{}'
        
        try {
          ai_output = JSON.parse(ai_text.trim())
        } catch {
          ai_output = { raw_text: ai_text, parse_error: true }
        }
      } catch (err: any) {
        ai_output = { error: 'Failed to call Anthropic API', details: err.message }
      }
    }

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
        outputs: ai_output
      })
    })

    const completeData = await completeRes.json()

    return Response.json({ success: true, ai_output, next_step: completeData })
  })
}
