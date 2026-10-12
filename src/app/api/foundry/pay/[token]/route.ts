import { NextResponse } from 'next/server'
import { getInvoiceRowByToken, newPaystackReference, setInvoiceReference } from '@/lib/foundry/invoices'
import { initializeTransaction, PaystackError } from '@/lib/foundry/paystack'
import { clientIp, rateLimit } from '@/lib/foundry/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store' }

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://crelligent.com').replace(/\/+$/, '')
}

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params

  const rl = rateLimit(`pay:${clientIp(req)}`, 20, 60 * 60 * 1000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSeconds: rl.retryAfterSeconds },
      { status: 429, headers: { ...NO_STORE, 'Retry-After': String(rl.retryAfterSeconds) } },
    )
  }

  try {
    const row = await getInvoiceRowByToken(token)
    if (!row || row.status === 'draft' || !row.engagement) {
      return NextResponse.json({ error: 'not_found' }, { status: 404, headers: NO_STORE })
    }
    if (row.status === 'paid') {
      return NextResponse.json({ error: 'already_paid', status: 'paid' }, { status: 409, headers: NO_STORE })
    }
    if (row.status !== 'sent') {
      return NextResponse.json({ error: 'not_payable', status: row.status }, { status: 409, headers: NO_STORE })
    }

    if (row.currency !== 'NGN' && row.currency !== 'USD') {
      // GBP / EUR invoices are bank transfer only.
      return NextResponse.json({ error: 'not_payable_by_card' }, { status: 409, headers: NO_STORE })
    }

    const reference = newPaystackReference(row.invoice_number)
    const stored = await setInvoiceReference(row.id, reference)
    if (!stored) {
      return NextResponse.json({ error: 'not_payable' }, { status: 409, headers: NO_STORE })
    }

    const { authorizationUrl } = await initializeTransaction({
      email: row.engagement.client_email,
      amountMinor: Number(row.amount_minor),
      currency: row.currency,
      reference,
      callbackUrl: `${siteUrl()}/foundry/pay/${row.pay_token}/callback`,
      metadata: {
        source: 'crelligent-foundry',
        invoice_id: row.id,
        invoice_number: row.invoice_number,
        pay_token: row.pay_token,
        kind: row.kind,
        cancel_action: `${siteUrl()}/foundry/pay/${row.pay_token}`,
      },
    })

    return NextResponse.json({ authorizationUrl, reference }, { headers: NO_STORE })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[foundry] pay init failed', msg)
    const status = err instanceof PaystackError ? 502 : 500
    return NextResponse.json({ error: 'payment_init_failed' }, { status, headers: NO_STORE })
  }
}
