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

  const { organization_id, trigger_event, initial_inputs } = body

  if (!organization_id || !trigger_event) {
    return NextResponse.json({ error: 'Missing required fields: organization_id, trigger_event' }, { status: 400 })
  }

  const supabaseAdmin = createAdminClient({ env })

  // 3. Find the active workflow for this event
  const { data: workflow, error: workflowError } = await supabaseAdmin
    .from('l2_workflows')
    .select('id, name')
    .eq('organization_id', organization_id)
    .eq('trigger_event', trigger_event)
    .eq('is_active', true)
    .single()

  if (workflowError || !workflow) {
    return NextResponse.json({ error: `No active workflow found for event: ${trigger_event}` }, { status: 404 })
  }

  // 4. Find the first step (step_order = 1)
  const { data: firstStep, error: stepError } = await supabaseAdmin
    .from('l2_workflow_steps')
    .select('id, step_name, execution_type, timeout_seconds')
    .eq('workflow_id', workflow.id)
    .eq('step_order', 1)
    .single()

  if (stepError || !firstStep) {
    return NextResponse.json({ error: 'Workflow has no configured steps' }, { status: 500 })
  }

  // 5. Initialize the execution log for the first step
  const { data: execution, error: executionError } = await supabaseAdmin
    .from('agent_executions')
    .insert({
      organization_id,
      workflow_id: workflow.id,
      step_id: firstStep.id,
      status: firstStep.execution_type === 'human_approval' ? 'awaiting_approval' : 'pending',
      inputs: initial_inputs || {}
    })
    .select()
    .single()

  if (executionError) {
    return NextResponse.json({ error: executionError.message }, { status: 500 })
  }

  // NOTE: If execution_type == 'agent', this is where we would trigger an event or queue a background job for the AI to pick it up!
  
  return NextResponse.json({ 
    success: true, 
    workflow: workflow.name, 
    execution_id: execution.id,
    next_step: firstStep 
  })
}

