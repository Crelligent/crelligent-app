/**
 * Server-only (import from Server Components only) access to live figures, with the display rules from DESIGN.md 5 and 7.1.
 * Nothing here invents a value: every failure path returns null and the UI renders nothing.
 */
import { getPublicStats } from '@/lib/aehi/stats'
import { getPublishedEdition, type PublishedEdition } from '@/lib/aehi/editions'

const STATS_TIMEOUT_MS = 1500

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), ms)
    p.then(
      (v) => {
        clearTimeout(t)
        resolve(v)
      },
      () => {
        clearTimeout(t)
        resolve(null)
      },
    )
  })
}

/**
 * "Enterprises assessed so far". Returns a number only when the backend reports a real
 * count of at least 1; otherwise null (the row is then removed entirely).
 */
export async function getAssessedCount(): Promise<number | null> {
  try {
    const stats = await withTimeout(getPublicStats(), STATS_TIMEOUT_MS)
    const n = stats?.enterprisesAssessed
    return typeof n === 'number' && Number.isInteger(n) && n >= 1 ? n : null
  } catch {
    return null
  }
}

/**
 * The published edition, only when BOTH the server flag AEHI_SHOW_EDITION_DATA === 'true'
 * and the backend returns a published edition. Otherwise null: render the pre-publication layout.
 */
export async function getEditionForDisplay(): Promise<PublishedEdition | null> {
  if (process.env.AEHI_SHOW_EDITION_DATA !== 'true') return null
  try {
    const edition = await getPublishedEdition()
    if (!edition || !edition.overall) return null
    return edition
  } catch (e) {
    console.error('[aehi] edition fetch failed', e instanceof Error ? e.message : e)
    return null
  }
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat('en-GB').format(n)
}

/** "12 October 2026" */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' }).format(d)
}
