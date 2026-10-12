import { NextResponse } from 'next/server'
import { z } from 'zod'
import { foundryApplicationSchema, HONEYPOT_FIELD, type FoundryApplyResponse } from '@/lib/foundry/schema'
import { getFoundryAdminDb } from '@/lib/foundry/admin-db'
import { notifyNewApplication } from '@/lib/foundry/notify'
import { clientIp, rateLimit } from '@/lib/foundry/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const LIMIT = 5
const WINDOW_MS = 60 * 60 * 1000

function json(body: FoundryApplyResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers })
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  // Honeypot: bots fill the hidden field. Pretend success and drop it.
  if (body && typeof body === 'object') {
    const hp = (body as Record<string, unknown>)[HONEYPOT_FIELD]
    if (typeof hp === 'string' && hp.trim() !== '') return json({ ok: true })
  }

  const rl = rateLimit(`apply:${clientIp(req)}`, LIMIT, WINDOW_MS)
  if (!rl.allowed) {
    return json({ ok: false, error: 'rate_limited', retryAfterSeconds: rl.retryAfterSeconds }, 429, {
      'Retry-After': String(rl.retryAfterSeconds),
    })
  }

  const parsed = foundryApplicationSchema.safeParse(body)
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error)
    return json(
      {
        ok: false,
        error: 'validation',
        fieldErrors: flat.fieldErrors as Record<string, string[]>,
        formErrors: flat.formErrors,
      },
      400,
    )
  }
  const app = parsed.data

  try {
    const { data, error } = await getFoundryAdminDb()
      .from('foundry_applications')
      .insert({
        founder_name: app.founderName,
        email: app.email,
        phone: app.phone ?? null,
        company_name: app.companyName,
        website: app.website ?? null,
        country: app.country,
        stage: app.stage,
        team_size: app.teamSize,
        path: app.path,
        package_interest: app.packageInterest,
        revenue_band: app.revenueBand ?? null,
        goals: app.goals,
        heard_from: app.heardFrom,
        heard_from_other: app.heardFromOther ?? null,
        consent: true,
        user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
      })
      .select('id')
      .single()
    if (error) throw new Error(error.message)

    await notifyNewApplication(app, data?.id)
    return json({ ok: true })
  } catch (err) {
    console.error('[foundry] apply failed', err instanceof Error ? err.message : err)
    return json({ ok: false, error: 'server_error' }, 500)
  }
}
