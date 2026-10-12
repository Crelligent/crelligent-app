/**
 * Hand-built inline SVG charts for /foundry (DESIGN.md §4 i, ii, ii-b, vi-b).
 * Data comes only from chartData.ts. Colour only via var(--cr-*).
 */
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  AFRICA_FUNDING_BY_YEAR,
  AFRICA_SEED_VS_SERIES_A_2025,
  STARTUP_FAILURE_REASONS,
} from './chartData'
import { ChartFigure, Cite } from './primitives'

const svgClass = 'block w-full h-auto'

/* ------------------------------------------------------------------ */
/* (i) African startup funding by year                                 */
/* ------------------------------------------------------------------ */
export function FundingChart({ onSurface = false, className }: { onSurface?: boolean; className?: string }) {
  const d = AFRICA_FUNDING_BY_YEAR
  const id = d.id
  const baseline = 200
  const scale = 32 // units per $1B
  const slot = 68.8
  const barW = 40
  const bars = d.data.map((p, i) => {
    const h = p.value * scale
    const x = 8 + i * slot + 14.4
    return { ...p, h, x, top: baseline - h, cx: x + barW / 2 }
  })
  const peak = bars[1]
  const last = bars[bars.length - 1]
  const label = (p: (typeof bars)[number]) => `$${p.value.toFixed(1)}B${'note' in p && p.note ? '+' : ''}`

  return (
    <ChartFigure
      onSurface={onSurface}
      className={className}
      takeaway={d.takeaway}
      title={d.title}
      subtitle={d.subtitle}
      caption={
        <>
          Source: Africa: The Big Deal <Cite n={[4, 5, 6]} />, via BusinessDay <Cite n={7} /> and Connecting Africa{' '}
          <Cite n={8} />.
        </>
      }
    >
      <div className="max-w-xl">
        <svg
          viewBox="0 0 360 236"
          width="100%"
          className={svgClass}
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>{d.title}</title>
          <desc id={`${id}-desc`}>
            Bar chart of African startup funding in US dollars. 2021: over 4.3 billion. 2022: 4.8 billion. 2023: 2.9
            billion. 2024: 2.2 billion. 2025: 3.2 billion, up 40% on 2024 and about a third below the 2022 peak.
          </desc>
          {/* peak reference */}
          <line
            x1={peak.x + barW}
            x2={352}
            y1={peak.top}
            y2={peak.top}
            stroke="var(--cr-text-dim)"
            strokeDasharray="3 3"
          />
          <text x={352} y={peak.top - 5} textAnchor="end" fontSize={11} fill="var(--cr-text-muted)">
            2022 peak
          </text>
          {bars.map((b, i) => {
            const isLast = i === bars.length - 1
            return (
              <g key={b.label}>
                <rect
                  className="bar-grow-y"
                  x={b.x}
                  y={b.top}
                  width={barW}
                  height={b.h}
                  rx={2}
                  fill={isLast ? 'var(--cr-accent)' : 'var(--cr-text-dim)'}
                />
                <text
                  className="font-mono"
                  x={b.cx}
                  y={b.top - 8}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={500}
                  fill={isLast ? 'var(--cr-accent-ink)' : 'var(--cr-text)'}
                >
                  {label(b)}
                </text>
                <text x={b.cx} y={222} textAnchor="middle" fontSize={12} fill="var(--cr-text-muted)">
                  {b.label}
                </text>
              </g>
            )
          })}
          <text
            className="font-mono"
            x={last.cx}
            y={last.top - 24}
            textAnchor="middle"
            fontSize={11}
            fill="var(--cr-accent-ink)"
          >
            +40%
          </text>
          <line x1={8} x2={352} y1={baseline} y2={baseline} stroke="var(--cr-border-strong)" />
        </svg>
      </div>
    </ChartFigure>
  )
}

/* ------------------------------------------------------------------ */
/* (ii) Why VC-backed startups shut down                               */
/* ------------------------------------------------------------------ */
export function FailureReasonsChart({
  onSurface = false,
  className,
  id = 'chart-failure-reasons',
}: {
  onSurface?: boolean
  className?: string
  id?: string
}) {
  const d = STARTUP_FAILURE_REASONS
  const sid = d.id
  return (
    <div id={id} className={className}>
      <ChartFigure
        onSurface={onSurface}
        className="h-full"
        takeaway={d.takeaway}
        title={d.title}
        subtitle={d.subtitle}
        caption={
          <>
            Source: CB Insights, 2026 <Cite n={1} />. Global data.
          </>
        }
      >
        <div className="max-w-xl">
          <svg
            viewBox="0 0 360 196"
            width="100%"
            className={svgClass}
            role="img"
            aria-labelledby={`${sid}-title ${sid}-desc`}
          >
            <title id={`${sid}-title`}>{d.title}</title>
            <desc id={`${sid}-desc`}>
              {`Horizontal bar chart of the reasons VC-backed startups shut down, as a share of startups citing each reason. ${d.data
                .map((r) => `${r.label}: ${r.value}%`)
                .join('. ')}. Multiple reasons were allowed, so the shares sum to more than 100%.`}
            </desc>
            {d.data.map((r, i) => {
              const hl = 'highlight' in r && r.highlight
              const y = 28 + i * 48
              return (
                <g key={r.label}>
                  <text
                    x={0}
                    y={20 + i * 48}
                    fontSize={13}
                    fontWeight={hl ? 500 : 400}
                    fill={hl ? 'var(--cr-text)' : 'var(--cr-text-muted)'}
                  >
                    {r.label}
                  </text>
                  <rect x={0} y={y} width={300} height={14} rx={2} fill="var(--cr-border)" />
                  <rect
                    className="bar-grow-x"
                    x={0}
                    y={y}
                    width={r.value * 3}
                    height={14}
                    rx={2}
                    fill={hl ? 'var(--cr-accent)' : 'var(--cr-text-dim)'}
                  />
                  <text
                    className="font-mono"
                    x={r.value * 3 + 8}
                    y={y + 11}
                    fontSize={13}
                    fill={hl ? 'var(--cr-accent-ink)' : 'var(--cr-text)'}
                  >
                    {r.value}%
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </ChartFigure>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* (ii-b) Seed vs Series A, Africa 2025                                */
/* ------------------------------------------------------------------ */
function fmtSeries(rowIndex: number, v: number) {
  if (rowIndex === 1) return String(v)
  return `$${rowIndex === 2 ? v.toFixed(1) : String(v)}M`
}

export function SeedVsSeriesAChart({ onSurface = false, className }: { onSurface?: boolean; className?: string }) {
  const d = AFRICA_SEED_VS_SERIES_A_2025
  const id = d.id
  const rows = d.series.map((s, r) => {
    const max = Math.max(s.seed, s.seriesA)
    return { ...s, r, seedW: (s.seed / max) * 260, aW: (s.seriesA / max) * 260 }
  })
  const legend = (
    <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-(--cr-text-muted)">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="inline-block size-2.5 rounded-sm bg-(--cr-text-muted)" /> Seed
      </span>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="inline-block size-2.5 rounded-sm bg-(--cr-accent)" /> Series A
      </span>
    </div>
  )
  return (
    <ChartFigure
      onSurface={onSurface}
      className={className}
      takeaway={d.callouts[1]}
      title={d.title}
      caption={
        <>
          Source: Partech, 2025 Africa Tech Venture Capital Report <Cite n={2} />.
        </>
      }
    >
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 md:items-start">
        <div className="max-w-xl min-w-0">
          {legend}
          <svg
            viewBox="0 0 360 204"
            width="100%"
            className={svgClass}
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
          >
            <title id={`${id}-title`}>{d.title}</title>
            <desc id={`${id}-desc`}>
              Paired bars comparing seed and Series A rounds in Africa in 2025. Total raised: seed 462 million US dollars,
              Series A 610.6 million. Number of rounds: seed 311, Series A 95. Average ticket: seed 1.7 million US
              dollars, Series A 7.0 million. Each row uses its own scale.
            </desc>
            {rows.map((row) => (
              <g key={row.label}>
                <text x={0} y={16 + row.r * 72} fontSize={13} fill="var(--cr-text)">
                  {row.label}
                </text>
                <rect
                  className="bar-grow-x"
                  x={0}
                  y={24 + row.r * 72}
                  width={row.seedW}
                  height={12}
                  rx={2}
                  fill="var(--cr-text-muted)"
                />
                <text
                  className="font-mono"
                  x={row.seedW + 6}
                  y={24 + row.r * 72 + 10}
                  fontSize={12}
                  fill="var(--cr-text-muted)"
                >
                  {fmtSeries(row.r, row.seed)}
                </text>
                <rect
                  className="bar-grow-x"
                  x={0}
                  y={40 + row.r * 72}
                  width={row.aW}
                  height={12}
                  rx={2}
                  fill="var(--cr-accent)"
                />
                <text
                  className="font-mono"
                  x={row.aW + 6}
                  y={40 + row.r * 72 + 10}
                  fontSize={12}
                  fill="var(--cr-accent-ink)"
                >
                  {fmtSeries(row.r, row.seriesA)}
                </text>
              </g>
            ))}
          </svg>
          <p className="mt-2 text-xs text-(--cr-text-muted)">Each row uses its own scale.</p>
        </div>
        <ul className="mt-5 md:mt-8 space-y-3 text-sm text-(--cr-text) md:max-w-56">
          <li className="flex gap-2.5">
            <TrendingDown aria-hidden className="size-4 mt-0.5 shrink-0 text-(--cr-text-muted)" />
            <span>
              {d.callouts[0]}
              <Cite n={2} />
            </span>
          </li>
          <li className="flex gap-2.5">
            <TrendingUp aria-hidden className="size-4 mt-0.5 shrink-0 text-(--cr-accent-ink)" />
            <span>
              {d.callouts[1]}
              <Cite n={2} />
            </span>
          </li>
        </ul>
      </div>
    </ChartFigure>
  )
}

