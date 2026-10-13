/**
 * Published-edition building blocks (DESIGN.md 7). Rendered ONLY when getEditionForDisplay()
 * returns an edition (server flag on + a published edition from the backend). Every figure
 * here comes from the API and is shown with its n.
 */
import { AlertTriangle } from 'lucide-react'
import type { EditionGroup, PublishedEdition } from '@/lib/aehi/editions'
import { LAYERS, LAYER_BY_CODE } from '@/data/aehi/edition'
import { formatCount, formatDate } from '@/data/aehi/live'

export const fmtScore = (v: number) => `${Math.round(v)}/100`
export const fmtLayer = (v: number) => `${v.toFixed(1)}/10`

export function NLine({ n, className = '' }: { n: number; className?: string }) {
  return <p className={`t-data text-xs text-aehi-text-subtle ${className}`}>n = {formatCount(n)}</p>
}

export function SourceLine({ edition, className = '' }: { edition: PublishedEdition; className?: string }) {
  const method = edition.methodologyVersion ? ` Method version ${edition.methodologyVersion}.` : ''
  return (
    <p className={`t-small text-aehi-text-subtle ${className}`}>
      Source: AEHI {edition.label} edition, published {formatDate(edition.publishedAt)}.{method}
    </p>
  )
}

/** Median with the middle half (25th to 75th percentile) drawn on a 0-100 track. */
export function CompositeRange({ group }: { group: EditionGroup }) {
  const { median, p25, p75 } = group.composite
  return (
    <div>
      <div className="relative mt-4 h-2 rounded-full bg-aehi-surface-2" aria-hidden="true">
        <div className="absolute inset-y-0 rounded-full bg-aehi-line-strong" style={{ left: `${p25}%`, width: `${Math.max(0, p75 - p25)}%` }} />
        <div className="absolute -top-1 h-4 w-0.5 bg-aehi-text" style={{ left: `${median}%` }} />
      </div>
      <p className="t-small mt-3 text-aehi-text-muted">
        Middle half of enterprises: <span className="t-data text-aehi-text">{Math.round(p25)}</span> to{' '}
        <span className="t-data text-aehi-text">{Math.round(p75)}</span> out of 100.
      </p>
    </div>
  )
}

/** Mean score per layer, L1 to L5 order, L2 emphasised. */
export function LayerMeans({ group, flagL2 = false }: { group: EditionGroup; flagL2?: boolean }) {
  return (
    <ul className="space-y-3">
      {LAYERS.map((l) => {
        const v = group.layers[l.code]
        const isL2 = l.code === 'L2'
        return (
          <li key={l.code}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="t-small flex flex-wrap items-center gap-2 text-aehi-text-muted">
                <span className={`t-data ${isL2 ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{l.code}</span> {l.name}
                {isL2 && flagL2 && v < 6 && (
                  <span className="chip chip-weak">
                    <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                    Primary constraint
                  </span>
                )}
              </span>
              <span className="t-data text-sm text-aehi-text">{fmtLayer(v)}</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-aehi-surface-2" aria-hidden="true">
              <div className={`h-full rounded-full ${isL2 ? 'bg-aehi-accent' : 'bg-aehi-line-strong'}`} style={{ width: `${v * 10}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function WeakestLayer({ group }: { group: EditionGroup }) {
  const l = LAYER_BY_CODE[group.weakestLayer]
  return (
    <p className={`font-aehi-head text-[28px] font-medium leading-tight ${l.code === 'L2' ? 'text-aehi-accent' : 'text-aehi-text'}`}>
      {l.code} {l.name}
    </p>
  )
}

/** Home page section "What the {label} edition found" (DESIGN.md 7.2, adapted to the backend contract). */
export function EditionFindingsGrid({ edition }: { edition: PublishedEdition }) {
  const g = edition.overall!
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="panel">
        <p className="t-label text-aehi-text-subtle">Median ESRE OS Performance Score</p>
        <p className="t-data mt-3 text-[44px] leading-none text-aehi-text lg:text-[56px]">{fmtScore(g.composite.median)}</p>
        <CompositeRange group={g} />
        <NLine n={g.n} className="mt-3" />
      </div>
      <div className="panel">
        <p className="t-label text-aehi-text-subtle">Weakest layer (lowest mean score)</p>
        <div className="mt-3">
          <WeakestLayer group={g} />
        </div>
        <p className="t-small mt-3 text-aehi-text-muted">
          Mean score {fmtLayer(g.layers[g.weakestLayer])} across all enterprises in the edition.
        </p>
        <NLine n={g.n} className="mt-3" />
      </div>
      <div className="panel">
        <p className="t-label text-aehi-text-subtle">Mean layer scores</p>
        <div className="mt-4">
          <LayerMeans group={g} />
        </div>
        <NLine n={g.n} className="mt-4" />
      </div>
    </div>
  )
}
