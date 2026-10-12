import { NextResponse } from 'next/server'
import { markInvoicePaid } from '@/lib/foundry/invoices'
import { isFoundryReference, verifyWebhookSignature, type PaystackTransaction } from '@/lib/foundry/paystack'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Paystack webhook. Configure in the Paystack dashboard as:
 *   https://crelligent.com/api/foundry/paystack/webhook
 * The Paystack account is shared with other Crelligent apps, so only references starting with "CF-" are handled;
 * everything else is acknowledged with 200 and ignored.
 */
export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  let valid = false
  try {
    valid = verifyWebhookSignature(rawBody, signature)
  } catch (err) {
    // PAYSTACK_SECRET_KEY missing: cannot verify. 500 so Paystack retries once configured.
    console.error('[foundry] webhook cannot verify signature', err instanceof Error ? err.message : err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  if (!valid) return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 401 })

  let event: { event?: string; data?: PaystackTransaction }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ ok: true, ignored: 'unparseable' })
  }

  const reference = event.data?.reference
  if (event.event !== 'charge.success' || !event.data || !isFoundryReference(reference)) {
    return NextResponse.json({ ok: true, ignored: true })
  }

  try {
    const result = await markInvoicePaid(reference, event.data)
    if (result.status !== 'paid' && result.status !== 'already_paid') {
      console.warn('[foundry] webhook charge.success not applied', reference, result.status, result.reason ?? '')
    }
    return NextResponse.json({ ok: true, status: result.status })
  } catch (err) {
    // Transient DB failure: non-200 so Paystack retries; markInvoicePaid is idempotent.
    console.error('[foundry] webhook processing failed', reference, err instanceof Error ? err.message : err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
