/**
 * Foundry invoice data access. Server-only (uses the service-role client).
 */
import { randomBytes } from 'node:crypto'
import { getFoundryAdminDb } from './admin-db'
import { FOUNDRY_BILLING, getPackage } from './packages'
import { FOUNDRY_REFERENCE_PREFIX, type PaystackTransaction } from './paystack'

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'void'
export type InvoiceKind = 'deposit' | 'balance'
export type InvoiceCurrency = 'NGN' | 'USD'

export interface EngagementRow {
  id: string
  client_name: string
  client_email: string
  company_name: string | null
  package_id: string
  title: string | null
  currency: InvoiceCurrency
  total_minor: number
  deposit_percent: number
  status: string
}

export interface InvoiceRow {
  id: string
  created_at: string
  engagement_id: string
  invoice_number: string
  kind: InvoiceKind
  description: string | null
  amount_minor: number
  currency: InvoiceCurrency
  status: InvoiceStatus
  due_date: string | null
  pay_token: string
  paystack_reference: string | null
  paystack_transaction_id: number | null
  paid_at: string | null
  sent_at: string | null
  notes: string | null
  engagement: EngagementRow | null
}

/** Safe public view returned by GET /api/foundry/invoice/[token]. No internal ids or emails. */
export interface PublicInvoice {
  token: string
  invoiceNumber: string
  kind: InvoiceKind
  description: string | null
  amountMinor: number
  currency: InvoiceCurrency
  /** 'draft' invoices are never exposed (404). */
  status: Exclude<InvoiceStatus, 'draft'>
  issuedAt: string // sent_at, falling back to created_at
  dueDate: string | null
  paidAt: string | null
  clientName: string
  companyName: string | null
  packageId: string
  packageName: string
  engagementTitle: string | null
  engagementTotalMinor: number
  depositPercent: number
  billingEmail: string
}

const INVOICE_SELECT = '*, engagement:foundry_engagements(*)'
const TOKEN_RE = /^[A-Za-z0-9_-]{32,128}$/

export function isValidPayToken(token: unknown): token is string {
  return typeof token === 'string' && TOKEN_RE.test(token)
}

/** Full row (server use only). Returns null for bad tokens and unknown invoices. */
export async function getInvoiceRowByToken(token: string): Promise<InvoiceRow | null> {
  if (!isValidPayToken(token)) return null
  const { data, error } = await getFoundryAdminDb()
    .from('foundry_invoices')
    .select(INVOICE_SELECT)
    .eq('pay_token', token)
    .maybeSingle()
  if (error) throw new Error(`foundry_invoices lookup failed: ${error.message}`)
  return (data as InvoiceRow | null) ?? null
}

export function toPublicInvoice(row: InvoiceRow): PublicInvoice | null {
  if (row.status === 'draft' || !row.engagement) return null
  const eng = row.engagement
  return {
    token: row.pay_token,
    invoiceNumber: row.invoice_number,
    kind: row.kind,
    description: row.description,
    amountMinor: Number(row.amount_minor),
    currency: row.currency,
    status: row.status,
    issuedAt: row.sent_at ?? row.created_at,
    dueDate: row.due_date,
    paidAt: row.paid_at,
    clientName: eng.client_name,
    companyName: eng.company_name,
    packageId: eng.package_id,
    packageName: getPackage(eng.package_id)?.name ?? eng.package_id,
    engagementTitle: eng.title,
    engagementTotalMinor: Number(eng.total_minor),
    depositPercent: eng.deposit_percent,
    billingEmail: FOUNDRY_BILLING.billingEmail,
  }
}

/** Public invoice view, or null (=> 404) for unknown, malformed or draft invoices. */
export async function getInvoiceByToken(token: string): Promise<PublicInvoice | null> {
  const row = await getInvoiceRowByToken(token)
  return row ? toPublicInvoice(row) : null
}

/**
 * Paystack reference: CF-<invoice number without its own CF- prefix>-<random>, e.g. CF-2026-0007-k3f9x2ab.
 * Paystack allows only [A-Za-z0-9-.=] and requires uniqueness per attempt.
 */
export function referencePrefixFor(invoiceNumber: string): string {
  const base = invoiceNumber.startsWith(FOUNDRY_REFERENCE_PREFIX)
    ? invoiceNumber.slice(FOUNDRY_REFERENCE_PREFIX.length)
    : invoiceNumber
  return `${FOUNDRY_REFERENCE_PREFIX}${base.replace(/[^A-Za-z0-9.=-]/g, '')}-`
}

export function newPaystackReference(invoiceNumber: string): string {
  return `${referencePrefixFor(invoiceNumber)}${randomBytes(6).toString('hex')}`
}

/** Stores the latest reference on a still-payable invoice. Returns false if the invoice is no longer 'sent'. */
export async function setInvoiceReference(invoiceId: string, reference: string): Promise<boolean> {
  const { data, error } = await getFoundryAdminDb()
    .from('foundry_invoices')
    .update({ paystack_reference: reference })
    .eq('id', invoiceId)
    .eq('status', 'sent')
    .select('id')
  if (error) throw new Error(`foundry_invoices reference update failed: ${error.message}`)
  return (data?.length ?? 0) > 0
}

// ---------------------------------------------------------------------------
// Payment matching (pure; unit-tested)
// ---------------------------------------------------------------------------

export type MatchResult =
  | { ok: true }
  | { ok: false; reason: 'not_successful' | 'amount_mismatch' | 'currency_mismatch' | 'reference_mismatch' }

export function checkPaymentMatches(
  invoice: { amount_minor: number | string; currency: string },
  tx: Pick<PaystackTransaction, 'status' | 'amount' | 'currency' | 'reference'>,
  expectedReference?: string,
): MatchResult {
  if (tx.status !== 'success') return { ok: false, reason: 'not_successful' }
  if (expectedReference !== undefined && tx.reference !== expectedReference) {
    return { ok: false, reason: 'reference_mismatch' }
  }
  if (String(tx.currency).toUpperCase() !== String(invoice.currency).toUpperCase()) {
    return { ok: false, reason: 'currency_mismatch' }
  }
  const expected = Number(invoice.amount_minor)
  const paid = Number(tx.amount)
  if (!Number.isFinite(paid) || !Number.isSafeInteger(expected) || paid !== expected) {
    return { ok: false, reason: 'amount_mismatch' }
  }
  return { ok: true }
}

// ---------------------------------------------------------------------------
// Mark paid (idempotent)
// ---------------------------------------------------------------------------

export type MarkPaidStatus =
  | 'paid' // newly marked paid
  | 'already_paid' // idempotent repeat
  | 'not_found' // no invoice for this reference
  | 'not_successful' // Paystack says not (yet) successful
  | 'mismatch' // amount / currency / reference mismatch: NOT marked paid
  | 'not_payable' // invoice is draft or void; flagged in notes for manual follow-up

export interface MarkPaidResult {
  status: MarkPaidStatus
  token?: string
  invoiceNumber?: string
  reason?: string
}

function metadataInvoiceId(meta: unknown): { invoiceId?: string; payToken?: string } {
  let m = meta
  if (typeof m === 'string') {
    try {
      m = JSON.parse(m)
    } catch {
      return {}
    }
  }
  if (!m || typeof m !== 'object') return {}
  const o = m as Record<string, unknown>
  return {
    invoiceId: typeof o.invoice_id === 'string' ? o.invoice_id : undefined,
    payToken: typeof o.pay_token === 'string' ? o.pay_token : undefined,
  }
}

async function findInvoiceForReference(reference: string, tx: PaystackTransaction): Promise<InvoiceRow | null> {
  const db = getFoundryAdminDb()
  const { data, error } = await db
    .from('foundry_invoices')
    .select(INVOICE_SELECT)
    .eq('paystack_reference', reference)
    .maybeSingle()
  if (error) throw new Error(`foundry_invoices lookup failed: ${error.message}`)
  if (data) return data as InvoiceRow

  // A newer attempt may have replaced the stored reference; fall back to the metadata we set on initialize,
  // requiring both the invoice id and its pay token to match.
  const { invoiceId, payToken } = metadataInvoiceId(tx.metadata)
  if (!invoiceId || !payToken) return null
  const res = await db.from('foundry_invoices').select(INVOICE_SELECT).eq('id', invoiceId).maybeSingle()
  if (res.error) throw new Error(`foundry_invoices lookup failed: ${res.error.message}`)
  const row = res.data as InvoiceRow | null
  if (!row || row.pay_token !== payToken) return null
  // Must be a reference generated for this invoice.
  if (!reference.startsWith(referencePrefixFor(row.invoice_number))) return null
  return row
}

/**
 * Marks the invoice paid only if Paystack's verified transaction is successful AND amount + currency match.
 * Safe to call repeatedly (verify route + webhook may both fire).
 */
export async function markInvoicePaid(reference: string, verified: PaystackTransaction): Promise<MarkPaidResult> {
  const row = await findInvoiceForReference(reference, verified)
  if (!row) return { status: 'not_found' }
  const base = { token: row.pay_token, invoiceNumber: row.invoice_number }

  if (row.status === 'paid') return { status: 'already_paid', ...base }

  const match = checkPaymentMatches(row, verified, reference)
  if (!match.ok) {
    if (match.reason === 'not_successful') return { status: 'not_successful', ...base }
    console.error('[foundry] payment mismatch, NOT marking paid', {
      invoice: row.invoice_number,
      reference,
      reason: match.reason,
      expected: { amount: row.amount_minor, currency: row.currency },
      got: { amount: verified.amount, currency: verified.currency },
    })
    await appendNote(row, `Paystack ${reference}: ${match.reason} (got ${verified.amount} ${verified.currency}); not marked paid.`)
    return { status: 'mismatch', reason: match.reason, ...base }
  }

  if (row.status !== 'sent') {
    console.error('[foundry] successful payment on non-payable invoice', { invoice: row.invoice_number, reference, status: row.status })
    await appendNote(row, `Paystack ${reference}: successful payment received while invoice was ${row.status}. Review manually.`)
    return { status: 'not_payable', ...base }
  }

  const db = getFoundryAdminDb()
  const { data, error } = await db
    .from('foundry_invoices')
    .update({
      status: 'paid',
      paid_at: verified.paid_at ?? new Date().toISOString(),
      paystack_reference: reference,
      paystack_transaction_id: verified.id ?? null,
      payment_channel: verified.channel ?? null,
      paid_amount_minor: verified.amount,
      paid_currency: verified.currency,
    })
    .eq('id', row.id)
    .eq('status', 'sent') // guards against concurrent webhook + verify
    .select('id')
  if (error) throw new Error(`foundry_invoices mark paid failed: ${error.message}`)
  if (!data || data.length === 0) {
    const { data: again } = await db.from('foundry_invoices').select('status').eq('id', row.id).maybeSingle()
    if (again?.status === 'paid') return { status: 'already_paid', ...base }
    return { status: 'not_payable', ...base }
  }
  return { status: 'paid', ...base }
}

async function appendNote(row: InvoiceRow, line: string) {
  const stamp = new Date().toISOString()
  const notes = [row.notes, `[${stamp}] ${line}`].filter(Boolean).join('\n')
  const { error } = await getFoundryAdminDb().from('foundry_invoices').update({ notes }).eq('id', row.id)
  if (error) console.error('[foundry] could not append invoice note', error.message)
}
