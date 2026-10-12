/**
 * Minimal Paystack client for Foundry invoices. Server-only (uses PAYSTACK_SECRET_KEY).
 * Docs: https://paystack.com/docs/api/transaction/
 * Amounts are in the lowest currency unit (kobo / cents).
 */
import { createHmac, timingSafeEqual } from 'node:crypto'

if (typeof window !== 'undefined') {
  throw new Error('src/lib/foundry/paystack.ts is server-only and must not be imported in client code.')
}

const PAYSTACK_API = 'https://api.paystack.co'

/** Every Foundry reference starts with this. Other Crelligent apps share the Paystack account. */
export const FOUNDRY_REFERENCE_PREFIX = 'CF-'

export class PaystackError extends Error {
  constructor(
    message: string,
    public readonly httpStatus?: number,
  ) {
    super(message)
    this.name = 'PaystackError'
  }
}

function secretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) throw new PaystackError('Paystack is not configured: missing env PAYSTACK_SECRET_KEY')
  return key
}

export type PaystackCurrency = 'NGN' | 'USD'

/** Subset of the Paystack transaction object we rely on. */
export interface PaystackTransaction {
  id: number
  status: string // 'success' | 'failed' | 'abandoned' | 'ongoing' | 'pending' | 'reversed' | ...
  reference: string
  amount: number // lowest unit
  currency: string
  paid_at?: string | null
  channel?: string | null
  gateway_response?: string | null
  metadata?: unknown
  customer?: { email?: string | null } | null
}

async function paystackFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${PAYSTACK_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
    cache: 'no-store',
    signal: init.signal ?? AbortSignal.timeout(15_000),
  })
  let json: { status?: boolean; message?: string; data?: T } | null = null
  try {
    json = await res.json()
  } catch {
    /* non-JSON body */
  }
  if (!res.ok || !json || json.status !== true || json.data === undefined) {
    throw new PaystackError(`Paystack ${path} failed: ${json?.message ?? res.statusText}`, res.status)
  }
  return json.data
}

export interface InitializeTransactionInput {
  email: string
  amountMinor: number
  currency: PaystackCurrency
  reference: string
  callbackUrl: string
  metadata?: Record<string, unknown>
}

export interface InitializeTransactionResult {
  authorizationUrl: string
  accessCode: string
  reference: string
}

export async function initializeTransaction(input: InitializeTransactionInput): Promise<InitializeTransactionResult> {
  if (!Number.isSafeInteger(input.amountMinor) || input.amountMinor <= 0) {
    throw new PaystackError('amountMinor must be a positive integer in the lowest currency unit')
  }
  const data = await paystackFetch<{ authorization_url: string; access_code: string; reference: string }>(
    '/transaction/initialize',
    {
      method: 'POST',
      body: JSON.stringify({
        email: input.email,
        amount: input.amountMinor,
        currency: input.currency,
        reference: input.reference,
        callback_url: input.callbackUrl,
        metadata: input.metadata ?? {},
      }),
    },
  )
  return { authorizationUrl: data.authorization_url, accessCode: data.access_code, reference: data.reference }
}

export async function verifyTransaction(reference: string): Promise<PaystackTransaction> {
  return paystackFetch<PaystackTransaction>(`/transaction/verify/${encodeURIComponent(reference)}`, { method: 'GET' })
}

/**
 * Checks the `x-paystack-signature` header: HMAC SHA512 of the raw request body, keyed with the secret key.
 * Pass `secret` only in tests; production reads PAYSTACK_SECRET_KEY.
 */
export function verifyWebhookSignature(
  rawBody: string | Buffer,
  signature: string | null | undefined,
  secret: string = secretKey(),
): boolean {
  if (!signature || typeof signature !== 'string') return false
  const expected = createHmac('sha512', secret).update(rawBody).digest('hex')
  const given = signature.trim().toLowerCase()
  if (!/^[0-9a-f]+$/.test(given) || given.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(given, 'hex'))
}

export function isFoundryReference(reference: unknown): reference is string {
  return typeof reference === 'string' && reference.startsWith(FOUNDRY_REFERENCE_PREFIX) && reference.length <= 100
}
