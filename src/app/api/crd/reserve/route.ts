import { verifyCredentials, createAdminClient } from '@supabase/server/core'
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
  const { data: auth, error: authError } = await verifyCredentials(req, {
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

  const { account_id, amount, description, agent_task_id } = body

  if (!account_id || !amount || !description) {
    return NextResponse.json({ error: 'Missing required fields: account_id, amount, description' }, { status: 400 })
  }

  const supabaseAdmin = createAdminClient({ env })

  // 3. First check if they have enough balance to reserve
  const { data: account, error: accountError } = await supabaseAdmin
    .from('crd_accounts')
    .select('balance, reserved_balance')
    .eq('id', account_id)
    .single()

  if (accountError || !account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }

  const availableBalance = account.balance - account.reserved_balance
  if (availableBalance < Math.abs(amount)) {
    return NextResponse.json({ error: 'Insufficient available balance to reserve this amount' }, { status: 402 }) // 402 Payment Required
  }

  // 4. Create the reservation transaction
  const { data, error } = await supabaseAdmin
    .from('crd_transactions')
    .insert({
      account_id,
      agent_task_id,
      amount: Math.abs(amount), // Note: amount is positive here but handled as a hold by the DB trigger
      transaction_type: 'reservation',
      description
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, transaction: data })
}
