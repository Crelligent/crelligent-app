import { NextResponse } from 'next/server'

// Simple secret verification (in production, use a secure webhook secret from PRISM)
const PRISM_WEBHOOK_SECRET = process.env.PRISM_WEBHOOK_SECRET || 'test-secret'

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

  // 4. Fire the L2 Trigger API (Looping back to our own server)
  // We use the absolute URL for the fetch call
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  try {
    const triggerRes = await fetch(`${baseUrl}/api/l2/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SECRET_KEY! // Use the secret key to call our own protected endpoint
      },
      body: JSON.stringify({
        organization_id,
        trigger_event: 'prism.anomaly.detected',
        initial_inputs: {
          metric,
          value,
          threshold,
          timestamp,
          anomaly_severity: 'high'
        }
      })
    })

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
    return NextResponse.json({ error: 'Internal fetch failed', details: error.message }, { status: 500 })
  }
}
