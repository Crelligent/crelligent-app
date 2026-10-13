import { checkRate, fail, isSameOrigin, ok, readJson, userAgent } from '@/lib/aehi/http'
import { notifyAdmin, saveInterest, StorageNotConfiguredError } from '@/lib/aehi/store'
import { isHoneypotTripped, notifySchema, oneLine, validate } from '@/lib/aehi/validation'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/notify: "email me when the inaugural edition publishes".
 * Idempotent per email: signing up twice returns { ok: true } and stores one row.
 */
export async function POST(req: Request) {
  const read = await readJson(req)
  if (!read.ok) return fail(read.error)
  if (!isSameOrigin(req)) return fail('forbidden_origin')
  if (isHoneypotTripped(read.body)) return ok() // pretend success; store nothing

  const v = validate(notifySchema, read.body)
  if (!v.ok) return fail('validation', { fieldErrors: v.fieldErrors })

  const limited = checkRate(req, 'notify', 10)
  if (limited) return limited

  const d = v.data
  try {
    const result = await saveInterest({
      kind: 'edition_notify',
      name: d.name,
      email: d.email,
      organisation: d.organisation,
      role: d.role ?? null,
      country: d.country ?? null,
      source: d.source ?? null,
      consent: true,
      user_agent: userAgent(req),
    })
    if (result === 'created') {
      await notifyAdmin(`AEHI: edition sign-up from ${oneLine(d.organisation)}`, [
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Organisation: ${d.organisation}`,
        `Role: ${d.role ?? '-'}`,
        `Country: ${d.country ?? '-'}`,
        `Source: ${d.source ?? '-'}`,
      ], d.email)
    }
    return ok()
  } catch (err) {
    if (err instanceof StorageNotConfiguredError) {
      console.error('[aehi] notify: storage not configured')
      return fail('not_configured')
    }
    console.error('[aehi] notify save failed', err instanceof Error ? err.message : err)
    return fail('server_error')
  }
}
