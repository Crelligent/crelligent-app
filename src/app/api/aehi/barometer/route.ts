import { NextResponse } from 'next/server'
import { WAVE } from '@/data/aehi/barometer'
import { scoreAnswers, submissionSchema } from '@/lib/aehi/barometer'
import { saveBarometerResponse } from '@/lib/aehi/barometer-store'
import { checkRate, fail, isSameOrigin, readJson, userAgent } from '@/lib/aehi/http'
import { notifyAdmin, StorageNotConfiguredError } from '@/lib/aehi/store'
import { isHoneypotTripped, validate } from '@/lib/aehi/validation'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/aehi/barometer: one Executive Barometer response.
 * Success: { ok: true, score: { index, confidence, outlook, weakestLayer } }. The score is
 * recomputed here, never trusted from the client.
 */
export async function POST(req: Request) {
  const read = await readJson(req)
  if (!read.ok) return fail(read.error)
  if (!isSameOrigin(req)) return fail('forbidden_origin')

  if (WAVE.status !== 'fielding') {
    return NextResponse.json(
      { ok: false, error: 'wave_closed', message: `${WAVE.label} has closed. Thank you for your interest.` },
      { status: 409, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const v = validate(submissionSchema, read.body)
  // Honeypot after validation so bots get a plausible score back and store nothing.
  if (isHoneypotTripped(read.body)) {
    return v.ok ? NextResponse.json({ ok: true, score: scoreAnswers(v.data.answers) }) : fail('validation', { fieldErrors: v.fieldErrors })
  }
  if (!v.ok) return fail('validation', { fieldErrors: v.fieldErrors })

  const limited = checkRate(req, 'barometer', 20)
  if (limited) return limited

  const d = v.data
  const score = scoreAnswers(d.answers)
  try {
    const result = await saveBarometerResponse(d, { userAgent: userAgent(req) })
    if (result === 'created' && d.email) {
      await notifyAdmin(
        `AEHI Barometer: response from ${d.answers.sector}`,
        [
          `Wave: ${WAVE.label}`,
          `Email: ${d.email}`,
          `Role: ${d.answers.role}`,
          `Sector: ${d.answers.sector}`,
          `Staff: ${d.answers.employees}`,
          `Revenue: ${d.answers.revenue}`,
          `Confidence index: ${score.index}`,
          `Wants results: ${d.wantsResults ? 'yes' : 'no'}`,
          `Wants diagnostic invite: ${d.wantsDiagnostic ? 'yes' : 'no'}`,
        ],
        d.email,
      )
    }
    // A repeat from the same email in the same wave is not stored again, but the person still gets their score.
    return NextResponse.json({ ok: true, score, duplicate: result === 'duplicate' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    if (err instanceof StorageNotConfiguredError) {
      console.error('[aehi] barometer: storage not configured')
      return fail('not_configured')
    }
    console.error('[aehi] barometer save failed', err instanceof Error ? err.message : err)
    return fail('server_error')
  }
}
