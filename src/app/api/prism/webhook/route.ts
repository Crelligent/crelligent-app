import { NextResponse } from 'next/server'
import { createAdminClient } from '@supabase/server/core'
import type { SupabaseEnv } from '@supabase/server'
import { POST as triggerPOST } from '../../l2/trigger/route'

// Simple secret verification (in production, use a secure webhook secret from PRISM)
const PRISM_WEBHOOK_SECRET = process.env.PRISM_WEBHOOK_SECRET || 'test-secret'

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
  // 1. Verify PRISM signature
  const signature = req.headers.get('x-prism-signature')
  if (signature !== PRISM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized PRISM request' }, { status: 401 })
  }

  // 2. Parse Telemetry
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { organization_id, metric, value, threshold, timestamp } = body

  if (!organization_id || !metric || value === undefined) {
    return NextResponse.json({ error: 'Missing telemetry data' }, { status: 400 })
  }

  // 3. Detect Anomaly
  let isAnomaly = false
  if (metric === 'server_latency' && value > threshold) isAnomaly = true
  if (metric === 'cx_conversion_rate' && value < threshold) isAnomaly = true
  
  if (!isAnomaly) {
    return NextResponse.json({ success: true, message: 'Telemetry received, metrics normal. No DAG triggered.' })
  }

  const env = resolveNextEnv()
  const supabaseAdmin = createAdminClient({ env })

  // 4. Idempotency Check
  const idempotency_key = `${organization_id}:${metric}:${timestamp}`
  const { data: existingExecution } = await supabaseAdmin
    .from('agent_executions')
    .select('*')
    .eq('idempotency_key', idempotency_key)
    .single()

  if (existingExecution) {
    return NextResponse.json({ 
      success: true, 
      message: 'Anomaly detected! L2 DAG already triggered (idempotent return).', 
      dag_execution: { execution_id: existingExecution.id } 
    })
  }

  // 5. Rate Limiting and Daily Spend Check
  const { data: orgLimits } = await supabaseAdmin
    .from('org_rate_limits')
    .select('max_executions_per_hour, max_daily_crd_spend')
    .eq('organization_id', organization_id)
    .single()

  if (orgLimits) {
    // Check max executions per hour
    if (orgLimits.max_executions_per_hour !== null) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
      const { count: hourlyCount } = await supabaseAdmin
        .from('agent_executions')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organization_id)
        .gte('started_at', oneHourAgo)
      
      if (hourlyCount !== null && hourlyCount >= orgLimits.max_executions_per_hour) {
        await supabaseAdmin.from('agent_execution_logs').insert({
          event: 'rate_limited',
          details: { organization_id, reason: 'max_executions_per_hour exceeded', metric }
        })
        return NextResponse.json({ error: 'Rate limit exceeded for organization' }, { status: 429 })
      }
    }

    // Check daily crd spend
    if (orgLimits.max_daily_crd_spend !== null) {
      const today = new Date().toISOString().split('T')[0] // Simple YYYY-MM-DD
      const { data: todayExecutions } = await supabaseAdmin
        .from('agent_executions')
        .select('cost_crd')
        .eq('organization_id', organization_id)
        .gte('started_at', `${today}T00:00:00.000Z`)

      const totalSpend = todayExecutions?.reduce((sum, exec) => sum + (exec.cost_crd || 0), 0) || 0
      
      if (totalSpend >= orgLimits.max_daily_crd_spend) {
        await supabaseAdmin.from('agent_execution_logs').insert({
          event: 'budget_exceeded',
          details: { organization_id, reason: 'max_daily_crd_spend exceeded', metric }
        })
        return NextResponse.json({ error: 'Daily budget exceeded for organization' }, { status: 429 })
      }
    }
  }

  // 6. Fire the L2 Trigger API directly as a function call
  try {
    const triggerReq = new Request('http://localhost/api/l2/trigger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SECRET_KEY!
      },
      body: JSON.stringify({
        organization_id,
        trigger_event: 'prism.anomaly.detected',
        idempotency_key,
        initial_inputs: {
          metric,
          value,
          threshold,
          timestamp,
          anomaly_severity: 'high'
        }
      })
    })

    const triggerRes = await triggerPOST(triggerReq)
    const triggerData = await triggerRes.json()

    if (!triggerRes.ok) {
      return NextResponse.json({ error: 'Failed to trigger DAG', details: triggerData }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Anomaly detected! L2 DAG triggered.', 
      dag_execution: triggerData 
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal trigger failed', details: error.message }, { status: 500 })
  }
}

