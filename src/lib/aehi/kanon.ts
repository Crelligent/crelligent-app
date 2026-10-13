/**
 * k-anonymity guard for published AEHI aggregates.
 * Pure module so it can be unit-tested with node:test.
 *
 * The database already refuses to store a group with n < 10 and only computes
 * groups at or above the edition's threshold. This is the last line of defence
 * in the app: anything below the threshold, or malformed, is dropped before it
 * can reach a page.
 */

/** Absolute floor. No AEHI figure is ever shown for a group smaller than this. */
export const MIN_GROUP_SIZE = 10

export interface CountedGroup {
  n: number
}

/** Effective threshold: the edition's own value, but never below MIN_GROUP_SIZE. */
export function effectiveThreshold(editionMin?: number | null): number {
  const v = typeof editionMin === 'number' && Number.isFinite(editionMin) ? Math.floor(editionMin) : MIN_GROUP_SIZE
  return Math.max(MIN_GROUP_SIZE, v)
}

/** Keeps only groups whose n is a finite integer >= the effective threshold. */
export function filterKAnon<T extends CountedGroup>(groups: readonly T[], editionMin?: number | null): T[] {
  const k = effectiveThreshold(editionMin)
  return groups.filter((g) => Number.isInteger(g.n) && g.n >= k)
}

// ---------------------------------------------------------------------------
// Parsing of aehi_edition_aggregates rows (pure; used by editions.ts)
// ---------------------------------------------------------------------------

export type LayerCode = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'

export interface EditionGroup {
  /** 'overall' (key 'all') or one sector, e.g. 'Financial Services'. */
  type: 'overall' | 'sector'
  key: string
  /** Number of enterprises in the group. Always >= minGroupSize. */
  n: number
  composite: { mean: number; median: number; p25: number; p75: number } // 0-100
  layers: Record<LayerCode, number> // mean per layer, 0-10
  weakestLayer: LayerCode
}

export interface AggregateRow {
  group_type: string
  group_key: string
  n: number
  composite_mean: number | string
  composite_median: number | string
  composite_p25: number | string
  composite_p75: number | string
  l1_mean: number | string
  l2_mean: number | string
  l3_mean: number | string
  l4_mean: number | string
  l5_mean: number | string
  weakest_layer: string
}

const LAYERS: LayerCode[] = ['L1', 'L2', 'L3', 'L4', 'L5']

function num(v: number | string, min: number, max: number): number | null {
  const n = typeof v === 'string' ? Number(v) : v
  return Number.isFinite(n) && n >= min && n <= max ? n : null
}

/** Converts a DB row to an EditionGroup, or null if anything is out of range. Exported for tests. */
export function toGroup(r: AggregateRow): EditionGroup | null {
  if (r.group_type !== 'overall' && r.group_type !== 'sector') return null
  if (!LAYERS.includes(r.weakest_layer as LayerCode)) return null
  const c = [r.composite_mean, r.composite_median, r.composite_p25, r.composite_p75].map((v) => num(v, 0, 100))
  const l = [r.l1_mean, r.l2_mean, r.l3_mean, r.l4_mean, r.l5_mean].map((v) => num(v, 0, 10))
  if ([...c, ...l].some((v) => v === null)) return null
  const [mean, median, p25, p75] = c as number[]
  const [l1, l2, l3, l4, l5] = l as number[]
  return {
    type: r.group_type,
    key: r.group_key,
    n: Number(r.n),
    composite: { mean, median, p25, p75 },
    layers: { L1: l1, L2: l2, L3: l3, L4: l4, L5: l5 },
    weakestLayer: r.weakest_layer as LayerCode,
  }
}

/** Applies validation + k-anonymity and splits overall/sectors. Exported for tests. */
export function buildGroups(rows: readonly AggregateRow[], editionMin: number | null | undefined) {
  const groups = filterKAnon(
    rows.map(toGroup).filter((g): g is EditionGroup => g !== null),
    editionMin,
  )
  return {
    overall: groups.find((g) => g.type === 'overall') ?? null,
    sectors: groups.filter((g) => g.type === 'sector').sort((a, b) => b.n - a.n || a.key.localeCompare(b.key)),
  }
}

