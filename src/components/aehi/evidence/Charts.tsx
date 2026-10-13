/**
 * AEHI Research charts. Server components, no JS. Every chart shows its values as text,
 * its source and a one-line takeaway. Colours only via AEHI tokens.
 */
import type { BarChart } from '@/data/aehi/evidence'
import { EVIDENCE_SOURCES, GROWTH_BY_SIZE } from '@/data/aehi/evidence'

const fmt = (v: number, unit: BarChart['unit']) => (unit === '%' ? `${v}%` : unit === 'score' ? v.toFixed(1) : String(v))

export function Cite({ n }: { n: number[] }) {
  return (
    <sup className="t-data text-[0.7em] text-aehi-text-subtle">
      {n.map((x) => (
        <a key={x} href={`#source-${x}`} className="hover:text-aehi-accent">
          [{x}]
        </a>
      ))}
    </sup>
  )
}

export function ChartFrame({
  title,
  subtitle,
  caption,
  takeaway,
  legend,
  children,
  id,
}: {
  title: string
  subtitle?: string
  caption: string
  takeaway: string
  legend?: React.ReactNode
  children: React.ReactNode
  id?: string
}) {
  return (
    <figure id={id} className="panel flex h-full flex-col">
      <p className="t-small font-medium text-aehi-accent">{takeaway}</p>
      <h3 className="t-h3 mt-3">{title}</h3>
      {subtitle && <p className="t-small mt-1 text-aehi-text-subtle">{subtitle}</p>}
      {legend && <div className="mt-4">{legend}</div>}
      <div className="mt-5 flex-1">{children}</div>
      <figcaption className="t-small mt-6 border-t border-aehi-line pt-4 text-aehi-text-subtle">{caption}</figcaption>
    </figure>
  )
}

export function Legend({ value, compare }: { value: string; compare?: string }) {
  return (
    <ul className="t-small flex flex-wrap gap-x-5 gap-y-1 text-aehi-text-muted" aria-label="Legend">
      <li className="flex items-center gap-2">
        <span className="h-2 w-4 rounded-sm bg-aehi-accent" aria-hidden="true" />
        {value}
      </li>
      {compare && (
        <li className="flex items-center gap-2">
          <span className="h-3 w-0.5 bg-aehi-text" aria-hidden="true" />
          {compare}
        </li>
      )}
    </ul>
  )
}

/** Horizontal bars; the comparator is a tick mark on the same track. */
export function HBarChart({ chart }: { chart: BarChart }) {
  return (
    <ChartFrame
      id={chart.id}
      title={chart.title}
      subtitle={chart.subtitle}
      caption={chart.caption}
      takeaway={chart.takeaway}
      legend={<Legend value={chart.valueLabel} compare={chart.compareLabel} />}
    >
      <ul className="space-y-3.5">
        {chart.rows.map((r) => {
          const w = Math.max(0, Math.min(100, (r.value / chart.max) * 100))
          const c = r.compare != null ? Math.max(0, Math.min(100, (r.compare / chart.max) * 100)) : null
          return (
            <li key={r.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={`t-small ${r.highlight ? 'text-aehi-text' : 'text-aehi-text-muted'}`}>{r.label}</span>
                <span className="t-data shrink-0 text-sm tabular-nums text-aehi-text">
                  {fmt(r.value, chart.unit)}
                  {r.compare != null && (
                    <span className="text-aehi-text-subtle">
                      {' '}
                      <span className="sr-only">{chart.compareLabel}: </span>/ {fmt(r.compare, chart.unit)}
                    </span>
                  )}
                </span>
              </div>
              <div className="relative mt-1.5 h-2 rounded-full bg-aehi-surface-2" aria-hidden="true">
                <div
                  className={`h-full rounded-full ${r.highlight ? 'bg-aehi-accent' : 'bg-aehi-accent/45'}`}
                  style={{ width: `${w}%` }}
                />
                {c != null && <div className="absolute -top-1 h-4 w-0.5 bg-aehi-text" style={{ left: `calc(${c}% - 1px)` }} />}
              </div>
            </li>
          )
        })}
      </ul>
    </ChartFrame>
  )
}

/** Employment growth vs real sales growth by firm size (diverging from zero). */
export function GrowthChart() {
  const g = GROWTH_BY_SIZE
  const max = 10
  const bar = (v: number, cls: string) => {
    const w = (Math.min(Math.abs(v), max) / max) * 50
    return (
      <div className="relative h-2 rounded-full bg-aehi-surface-2" aria-hidden="true">
        <div className="absolute inset-y-[-3px] left-1/2 w-px bg-aehi-text-subtle" />
        <div className={`absolute inset-y-0 rounded-full ${cls}`} style={v >= 0 ? { left: '50%', width: `${w}%` } : { right: '50%', width: `${w}%` }} />
      </div>
    )
  }
  return (
    <ChartFrame
      id="growth-by-size"
      title="More people, little more output"
      subtitle="Annual growth, % a year, by firm size"
      caption={g.caption + ` Sub-Saharan Africa: employment ${g.ssa.employment}%, real sales ${g.ssa.sales}%.`}
      takeaway={g.takeaway}
      legend={
        <ul className="t-small flex flex-wrap gap-x-5 gap-y-1 text-aehi-text-muted" aria-label="Legend">
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-aehi-text-muted" aria-hidden="true" />
            Employment growth
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-sm bg-aehi-accent" aria-hidden="true" />
            Real sales growth
          </li>
        </ul>
      }
    >
      <ul className="space-y-6">
        {g.rows.map((r) => (
          <li key={r.label}>
            <p className="t-small text-aehi-text">{r.label}</p>
            <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2">
              {bar(r.employment, 'bg-aehi-text-muted')}
              <span className="t-data w-16 text-right text-sm tabular-nums text-aehi-text">
                <span className="sr-only">Employment </span>
                {r.employment > 0 ? '+' : ''}
                {r.employment}%
              </span>
              {bar(r.sales, r.sales >= 0 ? 'bg-aehi-accent' : 'bg-aehi-warn')}
              <span className="t-data w-16 text-right text-sm tabular-nums text-aehi-text">
                <span className="sr-only">Real sales </span>
                {r.sales > 0 ? '+' : r.sales < 0 ? '−' : ''}
                {Math.abs(r.sales)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </ChartFrame>
  )
}

/** A single sourced figure. */
export function StatTile({ value, label, compare, source }: { value: string; label: string; compare?: string; source: number[] }) {
  return (
    <div className="border-t border-aehi-line pt-5">
      <p className="font-mono text-4xl font-medium tabular-nums text-aehi-text">
        {value}
        <Cite n={source} />
      </p>
      <p className="t-small mt-2 text-aehi-text-muted">{label}</p>
      {compare && <p className="t-small mt-1 text-aehi-text-subtle">{compare}</p>}
    </div>
  )
}

export function SourcesList({ className = '' }: { className?: string }) {
  return (
    <ol className={`space-y-3 ${className}`}>
      {EVIDENCE_SOURCES.map((s) => (
        <li key={s.n} id={`source-${s.n}`} className="t-small flex gap-3 scroll-mt-28 text-aehi-text-muted">
          <span className="t-data shrink-0 text-aehi-text-subtle">[{s.n}]</span>
          <span>
            <a href={s.url} className="link-inline" target="_blank" rel="noopener noreferrer">
              {s.title}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            , {s.publisher}, {s.year}.{s.note ? ` ${s.note[0].toUpperCase()}${s.note.slice(1)}.` : ''}{' '}
            <span className="text-aehi-text-subtle">{s.domain}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
