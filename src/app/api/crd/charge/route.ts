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

  // 1. Authenticate the agent using Secret Key auth
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

  const { account_id, amount, description } = body

  if (!account_id || !amount || !description) {
    return NextResponse.json({ error: 'Missing required fields: account_id, amount, description' }, { status: 400 })
  }

  // 3. Create Service Role client to bypass RLS and insert the transaction
  const supabaseAdmin = createAdminClient({ env })

  const { data, error } = await supabaseAdmin
    .from('crd_transactions')
    .insert({
      account_id,
      amount: -Math.abs(amount), // Consumptions are always negative
      transaction_type: 'consumption',
      description
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, transaction: data })
}
