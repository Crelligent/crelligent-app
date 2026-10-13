/**
 * Saves AEHI site submissions to public.aehi_interest and (optionally) emails admin@.
 * Server-only. See supabase/2026-10-12_aehi_site.sql for the table.
 */
import { getSupabaseConfig, readPostgrestError, restFetch } from './supabase'

export type InterestKind = 'edition_notify' | 'partner_inquiry'

export interface InterestRow {
  kind: InterestKind
  name: string
  email: string
  organisation?: string | null
  role?: string | null
  org_type?: string | null
  interest?: string | null
  message?: string | null
  country?: string | null
  source?: string | null
  consent: true
  user_agent?: string | null
}

export class StorageNotConfiguredError extends Error {
  constructor() {
    super('Storage is not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY)')
    this.name = 'StorageNotConfiguredError'
  }
}

/**
 * Inserts one row. Returns 'created', or 'duplicate' when the unique notify_key
 * index rejects a repeat "notify me" sign-up for the same email (callers treat
 * that as success). Throws on any other failure.
 */
export async function saveInterest(row: InterestRow): Promise<'created' | 'duplicate'> {
  const cfg = getSupabaseConfig()
  if (!cfg) throw new StorageNotConfiguredError()

  const res = await restFetch(cfg, 'aehi_interest', {
    method: 'POST',
    body: row,
    headers: { Prefer: 'return=minimal' },
    cache: 'no-store',
  })
  if (res.ok) return 'created'

  const err = await readPostgrestError(res)
  if (res.status === 409 || err.code === '23505') return 'duplicate'
  throw new Error(`Supabase insert failed: ${res.status} ${err.code ?? ''} ${err.message ?? ''}`.trim())
}

const ADMIN_EMAIL = 'admin@crelligent.com'
const DEFAULT_FROM = 'AEHI <aehi@crelligent.com>'

/**
 * Optional plain-text email to admin@crelligent.com via Resend.
 * - Skips silently when RESEND_API_KEY is not set.
 * - Never throws.
 * - Never holds the response for long: waits at most `maxWaitMs` (default 1.5s),
 *   then lets the request finish in the background. The database row is the
 *   source of truth; this email is only a convenience.
 */
export async function notifyAdmin(
  subject: string,
  lines: string[],
  replyTo?: string,
  maxWaitMs = 1500,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const send = (async () => {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.AEHI_NOTIFY_FROM || DEFAULT_FROM,
          to: [ADMIN_EMAIL],
          reply_to: replyTo,
          subject,
          text: lines.join('\n'),
        }),
        signal: AbortSignal.timeout(8000),
        cache: 'no-store',
      })
      if (!res.ok) console.error('[aehi] Resend notification failed', res.status)
    } catch (err) {
      console.error('[aehi] Resend notification error', err instanceof Error ? err.message : err)
    }
  })()

  await Promise.race([send, new Promise<void>((resolve) => setTimeout(resolve, maxWaitMs))])
}
