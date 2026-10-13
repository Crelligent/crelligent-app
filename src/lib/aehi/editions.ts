/**
 * "Ready for real data" layer. OFF by default.
 *
 * getPublishedEdition() returns null unless a row in aehi_editions has
 * status = 'published'. It also returns null when the env is missing, the
 * tables do not exist yet, or the database cannot be reached. The frontend must
 * render nothing from it while it is null.
 *
 * Every group is re-checked against the k-anonymity threshold (n >= 10, or the
 * edition's own higher value) before it is returned.
 */
import { buildGroups, effectiveThreshold, type AggregateRow, type EditionGroup } from './kanon'
import { getSupabaseConfig, isMissingObject, readPostgrestError, restFetch } from './supabase'

export const EDITION_REVALIDATE_SECONDS = 600

export type { EditionGroup, LayerCode } from './kanon'

export interface PublishedEdition {
  slug: string
  label: string
  periodStart: string
  periodEnd: string
  country: string | null
  publishedAt: string
  minGroupSize: number
  methodologyVersion: string | null
  summary: string | null
  reportUrl: string | null
  /** The all-enterprises group, or null if it did not reach the threshold. */
  overall: EditionGroup | null
  /** Sectors that reached the threshold, largest first. */
  sectors: EditionGroup[]
}

interface EditionRow {
  id: string
  slug: string
  label: string
  period_start: string
  period_end: string
  country: string | null
  published_at: string
  min_group_size: number
  methodology_version: string | null
  summary: string | null
  report_url: string | null
}

export async function getPublishedEdition(): Promise<PublishedEdition | null> {
  const cfg = getSupabaseConfig()
  if (!cfg) return null
  const cache = { revalidate: EDITION_REVALIDATE_SECONDS, tags: ['aehi-edition'] }

  try {
    const edRes = await restFetch(
      cfg,
      'aehi_editions?status=eq.published&published_at=not.is.null&order=published_at.desc&limit=1' +
        '&select=id,slug,label,period_start,period_end,country,published_at,min_group_size,methodology_version,summary,report_url',
      { cache },
    )
    if (!edRes.ok) {
      const err = await readPostgrestError(edRes)
      if (!isMissingObject(edRes.status, err)) console.error('[aehi] edition read failed', edRes.status, err.code ?? '')
      return null
    }
    const editions = (await edRes.json()) as EditionRow[]
    const e = editions?.[0]
    if (!e) return null

    const aggRes = await restFetch(
      cfg,
      `aehi_edition_aggregates?edition_id=eq.${encodeURIComponent(e.id)}` +
        '&select=group_type,group_key,n,composite_mean,composite_median,composite_p25,composite_p75,l1_mean,l2_mean,l3_mean,l4_mean,l5_mean,weakest_layer',
      { cache },
    )
    if (!aggRes.ok) {
      console.error('[aehi] edition aggregates read failed', aggRes.status)
      return null
    }
    const rows = (await aggRes.json()) as AggregateRow[]
    const { overall, sectors } = buildGroups(rows ?? [], e.min_group_size)

    return {
      slug: e.slug,
      label: e.label,
      periodStart: e.period_start,
      periodEnd: e.period_end,
      country: e.country,
      publishedAt: e.published_at,
      minGroupSize: effectiveThreshold(e.min_group_size),
      methodologyVersion: e.methodology_version,
      summary: e.summary,
      reportUrl: e.report_url,
      overall,
      sectors,
    }
  } catch (err) {
    console.error('[aehi] edition read error', err instanceof Error ? err.message : err)
    return null
  }
}
