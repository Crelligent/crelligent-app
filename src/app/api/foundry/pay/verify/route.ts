import { NextResponse } from 'next/server'
import { markInvoicePaid } from '@/lib/foundry/invoices'
import { isFoundryReference, PaystackError, verifyTransaction } from '@/lib/foundry/paystack'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store' }

/**
 * Called by the /foundry/pay/<token>/callback page with ?reference=<ref> (Paystack also appends ?trxref=).
 * Never trusts the redirect: always verifies with Paystack server-side.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const reference = url.searchParams.get('reference') ?? url.searchParams.get('trxref')
  if (!isFoundryReference(reference)) {
    return NextResponse.json({ status: 'invalid_reference' }, { status: 400, headers: NO_STORE })
  }

  try {
    const tx = await verifyTransaction(reference)
    const result = await markInvoicePaid(reference, tx)
    const status =
      result.status === 'paid' || result.status === 'already_paid'
        ? 'paid'
        : result.status === 'not_successful'
          ? tx.status === 'failed' || tx.status === 'abandoned' || tx.status === 'reversed'
            ? 'failed'
            : 'pending'
          : result.status // 'not_found' | 'mismatch' | 'not_payable'
    const httpStatus = status === 'not_found' ? 404 : 200
    return NextResponse.json(
      { status, token: result.token ?? null, invoiceNumber: result.invoiceNumber ?? null },
      { status: httpStatus, headers: NO_STORE },
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[foundry] verify failed', reference, msg)
    // Paystack 400/404 on verify => unknown reference
    if (err instanceof PaystackError && (err.httpStatus === 400 || err.httpStatus === 404)) {
      return NextResponse.json({ status: 'not_found' }, { status: 404, headers: NO_STORE })
    }
    return NextResponse.json({ status: 'error' }, { status: 502, headers: NO_STORE })
  }
}
