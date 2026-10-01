import { verifyCredentials, createAdminClient, extractCredentials } from '@supabase/server/core'
import type { SupabaseEnv } from '@supabase/server'
import { NextResponse } from 'next/server'

function resolveNextEnv(): Partial<SupabaseEnv> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const secretKey = process.env.SUPABASE_SECRET_KEY

  return {
    url: url ?? undefined,
    publishableKeys: publishableKey ? { default: publishableKey } : {},
    secretKeys: secretKey ? { default: secretKey } : {},
  }
}

export async function POST(req: Request) {
  const env = resolveNextEnv()

  // 1. Authenticate using Secret Key auth
  const { data: auth, error: authError } = await verifyCredentials(extractCredentials(req), {
    auth: 'secret',
    env
  })

  if (authError) {
    return NextResponse.json({ error: authError.message, code: authError.code }, { status: authError.status })
  }

  // 2. Parse payload
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  let { execution_id, status, outputs, approver_id, latency_ms, tokens_used } = body

  if (!execution_id || !status) {
    return NextResponse.json({ error: 'Missing required fields: execution_id, status' }, { status: 400 })
  }

  const supabaseAdmin = createAdminClient({ env })

  // 3. Get current execution to check CRD cost
  const { data: currentExecution, error: fetchError } = await supabaseAdmin
    .from('agent_executions')
    .select('organization_id, workflow_id, step_id, l2_workflow_steps (step_order, cost_crd)')
    .eq('id', execution_id)
    .single()

  if (fetchError || !currentExecution) {
    return NextResponse.json({ error: 'Failed to fetch execution' }, { status: 500 })
  }

  const costCrd = (currentExecution.l2_workflow_steps as any).cost_crd || 0
  let insufficientFunds = false

  if (status === 'completed' && costCrd > 0) {
    // CRD deduction
    const { data: account, error: accountError } = await supabaseAdmin
      .from('crd_accounts')
      .select('id, balance')
      .eq('organization_id', currentExecution.organization_id)
      .single()

    if (accountError || !account || account.balance < costCrd) {
      status = 'failed'
      insufficientFunds = true
    } else {
      const newBalance = account.balance - costCrd
      await supabaseAdmin
        .from('crd_accounts')
        .update({ balance: newBalance })
        .eq('id', account.id)
    }
  }

  const updatePayload: any = {
    status,
    outputs: outputs || {},
    approver_id,
    completed_at: new Date().toISOString()
  }

  if (latency_ms !== undefined) updatePayload.latency_ms = latency_ms
  if (tokens_used !== undefined) updatePayload.tokens_used = tokens_used
  if (insufficientFunds) {
    updatePayload.last_error = { details: 'Insufficient CRD balance' }
  }

  // 4. Mark the current execution as complete
  const { error: updateError } = await supabaseAdmin
    .from('agent_executions')
    .update(updatePayload)
    .eq('id', execution_id)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update execution log' }, { status: 500 })
  }

  // Write observability log
  await supabaseAdmin.from('agent_execution_logs').insert({
    execution_id,
    event: status,
    details: {
      latency_ms,
      tokens_used,
      error: insufficientFunds ? 'Insufficient CRD balance' : undefined
    }
  })

  if (status !== 'completed') {
    return NextResponse.json({ success: true, message: insufficientFunds ? 'Workflow failed due to Insufficient CRD balance' : 'Workflow halted due to failure or rejection' })
  }

  // 5. Find the NEXT step in the DAG (step_order + 1)
  const currentOrder = (currentExecution.l2_workflow_steps as any).step_order
  const { data: nextStep, error: nextStepError } = await supabaseAdmin
    .from('l2_workflow_steps')
    .select('id, step_name, execution_type')
    .eq('workflow_id', currentExecution.workflow_id)
    .eq('step_order', currentOrder + 1)
    .maybeSingle()

  if (!nextStep) {
    // Reached the end of the DAG!
    return NextResponse.json({ success: true, message: 'Workflow completed successfully' })
  }

  // 6. Initialize the next step
  const { data: newExecution, error: newExecutionError } = await supabaseAdmin
    .from('agent_executions')
    .insert({
      organization_id: currentExecution.organization_id,
      workflow_id: currentExecution.workflow_id,
      step_id: nextStep.id,
      status: nextStep.execution_type === 'human_approval' ? 'awaiting_approval' : 'pending',
      inputs: outputs // Pass previous step outputs as inputs to the next step
    })
    .select()
    .single()

  if (newExecutionError) {
    return NextResponse.json({ error: newExecutionError.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Moved to next step', 
    execution_id: newExecution.id,
    next_step: nextStep 
  })
}
