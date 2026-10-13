import { checkRate, fail, isSameOrigin, ok, readJson, userAgent } from '@/lib/aehi/http'
import { notifyAdmin, saveInterest, StorageNotConfiguredError } from '@/lib/aehi/store'
import { institutionalSchema, isHoneypotTripped, oneLine, validate } from '@/lib/aehi/validation'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/** POST /api/institutional: research partnership, distribution and data-access enquiries. */
export async function POST(req: Request) {
  const read = await readJson(req)
  if (!read.ok) return fail(read.error)
  if (!isSameOrigin(req)) return fail('forbidden_origin')
  if (isHoneypotTripped(read.body)) return ok() // pretend success; store nothing

  const v = validate(institutionalSchema, read.body)
  if (!v.ok) return fail('validation', { fieldErrors: v.fieldErrors })

  const limited = checkRate(req, 'institutional', 5)
  if (limited) return limited

  const d = v.data
  const fullName = `${d.firstName} ${d.lastName}`
  try {
    await saveInterest({
      kind: 'partner_inquiry',
      name: fullName,
      email: d.email,
      organisation: d.institution,
      org_type: d.institutionType,
      interest: d.interest,
      message: d.message ?? null,
      country: d.country ?? null,
      source: d.source ?? null,
      consent: true,
      user_agent: userAgent(req),
    })
    await notifyAdmin(`AEHI: ${oneLine(d.interest, 60)} enquiry from ${oneLine(d.institution)}`, [
      `Name: ${fullName}`,
      `Email: ${d.email}`,
      `Institution: ${d.institution} (${d.institutionType})`,
      `Interest: ${d.interest}`,
      `Country: ${d.country ?? '-'}`,
      `Source: ${d.source ?? '-'}`,
      '',
      d.message ?? '',
    ], d.email)
    return ok()
  } catch (err) {
    if (err instanceof StorageNotConfiguredError) {
      console.error('[aehi] institutional: storage not configured')
      return fail('not_configured')
    }
    console.error('[aehi] institutional save failed', err instanceof Error ? err.message : err)
    return fail('server_error')
  }
}
