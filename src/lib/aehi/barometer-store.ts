/**
 * Server-only storage for the AEHI Executive Barometer (public.aehi_barometer_responses).
 * See supabase/migrations/20261013_aehi_barometer.sql.
 */
import { WAVE } from '@/data/aehi/barometer'
import { aggregate, isEligible, scoreAnswers, type StoredResponse, type Submission, type WaveResults } from './barometer'
import { StorageNotConfiguredError } from './store'
import { getSupabaseConfig, readPostgrestError, restFetch } from './supabase'

const TABLE = 'aehi_barometer_responses'

/** Saves one response. Returns 'duplicate' when this email already answered this wave. */
export async function saveBarometerResponse(
  s: Submission,
  meta: { userAgent: string | null },
): Promise<'created' | 'duplicate'> {
  const cfg = getSupabaseConfig()
  if (!cfg) throw new StorageNotConfiguredError()
  const score = scoreAnswers(s.answers)

  const res = await restFetch(cfg, TABLE, {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    cache: 'no-store',
    body: {
      wave: WAVE.id,
      role: s.answers.role,
      sector: s.answers.sector,
      employees_band: s.answers.employees,
      revenue_band: s.answers.revenue,
      location: s.answers.location,
      answers: s.answers,
      confidence_index: score.index,
      eligible: isEligible(s.answers),
      email: s.email ?? null,
      wants_results: s.wantsResults,
      wants_diagnostic: s.wantsDiagnostic,
      consent: true,
      source: s.source ?? null,
      user_agent: meta.userAgent,
    },
  })
  if (res.ok) return 'created'
  const err = await readPostgrestError(res)
  if (res.status === 409 || err.code === '23505') return 'duplicate'
  throw new Error(`Supabase insert failed: ${res.status} ${err.code ?? ''} ${err.message ?? ''}`.trim())
}

/**
 * Published results for the current wave, or null. Returns null unless the wave's status is
 * 'published' AND the eligible sample meets the minimum (aggregate() enforces that).
 */
export async function getPublishedBarometer(): Promise<WaveResults | null> {
  if (WAVE.status !== 'published') return null
  const cfg = getSupabaseConfig()
  if (!cfg) return null
  try {
    const res = await restFetch(cfg, `${TABLE}?select=answers&wave=eq.${encodeURIComponent(WAVE.id)}&eligible=is.true&limit=20000`, {
      cache: { revalidate: 3600, tags: ['aehi-barometer'] },
    })
    if (!res.ok) return null
    const rows = (await res.json()) as StoredResponse[]
    return aggregate(rows)
  } catch (err) {
    console.error('[aehi] barometer results failed', err instanceof Error ? err.message : err)
    return null
  }
}
