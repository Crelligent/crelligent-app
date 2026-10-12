import { NextResponse } from 'next/server'
import { getInvoiceByToken } from '@/lib/foundry/invoices'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }

export async function GET(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params
  try {
    const invoice = await getInvoiceByToken(token)
    if (!invoice) return NextResponse.json({ error: 'not_found' }, { status: 404, headers: NO_STORE })
    return NextResponse.json({ invoice }, { headers: NO_STORE })
  } catch (err) {
    console.error('[foundry] invoice lookup failed', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'server_error' }, { status: 500, headers: NO_STORE })
  }
}
