import { NextResponse } from 'next/server'
import { z } from 'zod'
import { HONEYPOT_FIELD } from '@/lib/foundry/schema'
import { packageName } from '@/lib/foundry/packages'
import { pmfCheckSaveSchema, scoreSnapshot, summariseSnapshot, type PmfCheckSaveResponse } from '@/lib/foundry/pmf-check'
import { getFoundryAdminDb } from '@/lib/foundry/admin-db'
import { notifyNewApplication } from '@/lib/foundry/notify'
import { clientIp, rateLimit } from '@/lib/foundry/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function json(body: PmfCheckSaveResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers })
}

/**
 * POST /api/foundry/pmf-check: saves a completed free PMF snapshot as a Foundry lead
 * (a foundry_applications row, marked in `notes`). The score is recomputed here, never trusted from the client.
 */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  if (body && typeof body === 'object') {
    const hp = (body as Record<string, unknown>)[HONEYPOT_FIELD]
    if (typeof hp === 'string' && hp.trim() !== '') return json({ ok: true })
  }

  const rl = rateLimit(`pmf-check:${clientIp(req)}`, 5, 60 * 60 * 1000)
  if (!rl.allowed) {
    return json({ ok: false, error: 'rate_limited', retryAfterSeconds: rl.retryAfterSeconds }, 429, {
      'Retry-After': String(rl.retryAfterSeconds),
    })
  }

  const parsed = pmfCheckSaveSchema.safeParse(body)
  if (!parsed.success) {
    return json(
      { ok: false, error: 'validation', fieldErrors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]> },
      400,
    )
  }
  const d = parsed.data
  const result = scoreSnapshot(d.answers)
  const pkg = result.recommended
  const path = pkg === 'venture' ? 'venture' : 'validate'
  const goals = summariseSnapshot(d.answers, result)
  const notes = JSON.stringify({ source: 'pmf-check', score: result.score, band: result.band, answers: d.answers })

  try {
    const { data, error } = await getFoundryAdminDb()
      .from('foundry_applications')
      .insert({
        founder_name: d.founderName,
        email: d.email,
        company_name: d.companyName,
        country: d.country,
        stage: d.answers.stage,
        team_size: d.teamSize,
        path,
        package_interest: pkg,
        goals,
        heard_from: d.heardFrom,
        consent: true,
        notes,
        user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
      })
      .select('id')
      .single()
    if (error) throw new Error(error.message)

    await notifyNewApplication(
      {
        founderName: d.founderName,
        email: d.email,
        companyName: d.companyName,
        website: undefined,
        phone: undefined,
        revenueBand: undefined,
        heardFromOther: undefined,
        country: d.country,
        stage: d.answers.stage,
        teamSize: d.teamSize,
        path,
        packageInterest: pkg,
        goals: `${goals}\n\nAsked for a free 20-minute review of the snapshot (${packageName(pkg)} suggested).`,
        heardFrom: d.heardFrom,
        consent: true,
      },
      data?.id,
    )
    return json({ ok: true })
  } catch (err) {
    console.error('[foundry] pmf-check save failed', err instanceof Error ? err.message : err)
    return json({ ok: false, error: 'server_error' }, 500)
  }
}
