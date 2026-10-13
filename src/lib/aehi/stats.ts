/**
 * Honest live figures for the site. Server-only.
 *
 * Source: completed diagnostics from crelligent.com/diagnostic (table aehi_scores),
 * through the cleaned view aehi_assessments_v / function aehi_public_stats()
 * defined in supabase/2026-10-12_aehi_site.sql.
 *
 * Never returns an invented number: on any problem a figure is null and the UI
 * must hide it.
 */
import { getSupabaseConfig, isMissingObject, readPostgrestError, restFetch } from './supabase'

export const STATS_REVALIDATE_SECONDS = 600

export interface PublicStats {
  /** Distinct enterprises that completed the diagnostic. null = unknown, hide it. */
  enterprisesAssessed: number | null
  /** Completed diagnostics (an enterprise can retake it). null = unknown, hide it. */
  assessmentsCompleted: number | null
  /** ISO time these figures were read from the database (null when they were not). */
  updatedAt: string | null
  /** 'live' = from the database; 'unavailable' = env missing or DB unreachable. */
  status: 'live' | 'unavailable'
}

const UNAVAILABLE: PublicStats = {
  enterprisesAssessed: null,
  assessmentsCompleted: null,
  updatedAt: null,
  status: 'unavailable',
}

function toCount(v: unknown): number | null {
  const n = typeof v === 'string' ? Number(v) : v
  return typeof n === 'number' && Number.isInteger(n) && n >= 0 ? n : null
}

/**
 * Reads the stats. Prefers the SQL function (distinct enterprises). If the
 * migration has not been applied yet, falls back to an exact row count on
 * aehi_scores with the same test-row exclusions; that only gives
 * assessmentsCompleted, so enterprisesAssessed stays null.
 */
export async function getPublicStats(): Promise<PublicStats> {
  const cfg = getSupabaseConfig()
  if (!cfg) return UNAVAILABLE
  const cache = { revalidate: STATS_REVALIDATE_SECONDS, tags: ['aehi-stats'] }

  try {
    // GET is allowed because the function is STABLE; it also caches cleanly.
    const res = await restFetch(cfg, 'rpc/aehi_public_stats', { cache })
    if (res.ok) {
      const body = (await res.json()) as Record<string, unknown> | null
      const enterprises = toCount(body?.enterprises_assessed)
      const assessments = toCount(body?.assessments_completed)
      if (enterprises === null || assessments === null) return UNAVAILABLE
      return {
        enterprisesAssessed: enterprises,
        assessmentsCompleted: assessments,
        updatedAt: new Date().toISOString(),
        status: 'live',
      }
    }
    const err = await readPostgrestError(res)
    if (!isMissingObject(res.status, err)) {
      console.error('[aehi] stats rpc failed', res.status, err.code ?? '')
      return UNAVAILABLE
    }
  } catch (e) {
    console.error('[aehi] stats rpc error', e instanceof Error ? e.message : e)
    return UNAVAILABLE
  }

  // Fallback: migration not applied yet.
  try {
    const filter = [
      'select=id',
      'source=eq.website_diagnostic',
      'and=(email.not.ilike.*@crelligent.com,email.not.ilike.*.crelligent.com,email.not.ilike.*@example.com,email.not.ilike.*@example.org,email.not.ilike.*@example.net)',
    ].join('&')
    const res = await restFetch(cfg, `aehi_scores?${filter}`, {
      method: 'HEAD',
      headers: { Prefer: 'count=exact', Range: '0-0' },
      cache,
    })
    // Content-Range: "0-0/123" or "*/0"
    const total = res.headers.get('content-range')?.split('/')[1]
    const assessments = res.ok || res.status === 206 ? toCount(total) : null
    if (assessments === null) return UNAVAILABLE
    return { enterprisesAssessed: null, assessmentsCompleted: assessments, updatedAt: new Date().toISOString(), status: 'live' }
  } catch (e) {
    console.error('[aehi] stats fallback error', e instanceof Error ? e.message : e)
    return UNAVAILABLE
  }
}
