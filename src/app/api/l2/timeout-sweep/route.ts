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

  const supabaseAdmin = createAdminClient({ env })

  // 2. Find all active agent executions
  const { data: activeExecutions, error: fetchError } = await supabaseAdmin
    .from('agent_executions')
    .select('id, started_at, created_at, status, l2_workflow_steps (timeout_seconds)')
    .in('status', ['pending', 'running', 'retrying'])

  if (fetchError) {
    return NextResponse.json({ error: 'Failed to fetch active executions' }, { status: 500 })
  }

  const now = Date.now()
  const timedOutIds: string[] = []

  for (const exec of activeExecutions || []) {
    const startTimeStr = exec.started_at || exec.created_at
    if (!startTimeStr) continue

    const startTime = new Date(startTimeStr).getTime()
    const timeoutSecs = (exec.l2_workflow_steps as any)?.timeout_seconds || 300 // Default to 5 minutes
    
    if (now - startTime > timeoutSecs * 1000) {
      timedOutIds.push(exec.id)
    }
  }

  let timedOutCount = 0

  // 3. Update timed out executions and write logs
  if (timedOutIds.length > 0) {
    const timedOutAt = new Date().toISOString()
    
    const { error: updateError } = await supabaseAdmin
      .from('agent_executions')
      .update({ 
        status: 'timed_out', 
        timed_out_at: timedOutAt 
      })
      .in('id', timedOutIds)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update executions' }, { status: 500 })
    }

    const logs = timedOutIds.map(id => ({
      execution_id: id,
      event: 'timed_out',
      details: { reason: 'Timeout sweep' }
    }))

    const { error: logError } = await supabaseAdmin
      .from('agent_execution_logs')
      .insert(logs)

    if (logError) {
      console.error('Failed to write timeout logs:', logError)
    }

    timedOutCount = timedOutIds.length
  }

  return NextResponse.json({ 
    success: true, 
    timed_out_count: timedOutCount,
    message: `Successfully timed out ${timedOutCount} executions`
  })
}

export async function GET(req: Request) {
  return POST(req)
}
