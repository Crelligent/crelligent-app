/**
 * Shared helpers for the AEHI API routes: one JSON response shape everywhere.
 *
 *   success: { ok: true }
 *   failure: { ok: false, error: ErrorCode, message: string, fieldErrors?: { [field]: message } }
 */
import { NextResponse } from 'next/server'
import { rateLimit } from './rate-limit'
import type { FieldErrors } from './validation'

export type ErrorCode =
  | 'invalid_json'
  | 'payload_too_large'
  | 'forbidden_origin'
  | 'validation'
  | 'rate_limited'
  | 'not_configured'
  | 'server_error'

const MESSAGES: Record<ErrorCode, string> = {
  invalid_json: 'The request could not be read. Please try again.',
  payload_too_large: 'The message is too long.',
  forbidden_origin: 'This form can only be sent from the AEHI site.',
  validation: 'Please check the highlighted fields.',
  rate_limited: 'Too many attempts from this connection. Please try again later.',
  not_configured: 'We could not save your details right now. Please email aehi@crelligent.com.',
  server_error: 'We could not save your details. Please try again, or email aehi@crelligent.com.',
}

const STATUS: Record<ErrorCode, number> = {
  invalid_json: 400,
  payload_too_large: 413,
  forbidden_origin: 403,
  validation: 422,
  rate_limited: 429,
  not_configured: 503,
  server_error: 500,
}

const NO_STORE = { 'Cache-Control': 'no-store' }

export function ok() {
  return NextResponse.json({ ok: true as const }, { status: 200, headers: NO_STORE })
}

export function fail(error: ErrorCode, opts: { fieldErrors?: FieldErrors; headers?: Record<string, string> } = {}) {
  return NextResponse.json(
    { ok: false as const, error, message: MESSAGES[error], ...(opts.fieldErrors ? { fieldErrors: opts.fieldErrors } : {}) },
    { status: STATUS[error], headers: { ...NO_STORE, ...opts.headers } },
  )
}

export function clientIp(req: Request): string {
  return (
    req.headers.get('x-real-ip')?.trim() ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

/**
 * Rejects cross-site form posts. Requests without an Origin header (curl, some
 * privacy setups) are allowed; the honeypot and rate limit still apply.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  try {
    return !!host && new URL(origin).host === host
  } catch {
    return false
  }
}

const MAX_BODY_BYTES = 16 * 1024

/** Reads a JSON body with a size cap. */
export async function readJson(req: Request): Promise<{ ok: true; body: unknown } | { ok: false; error: ErrorCode }> {
  const declared = Number(req.headers.get('content-length') || 0)
  if (declared > MAX_BODY_BYTES) return { ok: false, error: 'payload_too_large' }
  let text: string
  try {
    text = await req.text()
  } catch {
    return { ok: false, error: 'invalid_json' }
  }
  if (text.length > MAX_BODY_BYTES) return { ok: false, error: 'payload_too_large' }
  try {
    return { ok: true, body: JSON.parse(text) }
  } catch {
    return { ok: false, error: 'invalid_json' }
  }
}

/** Per-IP limit for form posts: `limit` per hour per route. */
export function checkRate(req: Request, route: string, limit: number) {
  const r = rateLimit(`${route}:${clientIp(req)}`, limit, 60 * 60 * 1000)
  return r.allowed ? null : fail('rate_limited', { headers: { 'Retry-After': String(r.retryAfter) } })
}

export function userAgent(req: Request): string | null {
  return req.headers.get('user-agent')?.slice(0, 300) ?? null
}
