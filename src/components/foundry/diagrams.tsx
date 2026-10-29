/**
 * Diagrams for /foundry: problem → package flow, problem/solution rows, OS Lite stack, paths, process,
 * payment split (DESIGN.md §4 iii–v, vi-a).
 */
import Link from 'next/link'
import { AlertTriangle, ArrowDown, ArrowRight, ChevronRight, Gauge, Rocket, Wallet } from 'lucide-react'
import { FOUNDRY_BILLING, packageName, type ApplyPackageId } from '@/lib/foundry/packages'
import { FIX_ROWS, PATHS, PROCESS_STEPS, type FixRow } from './content'
import { RichText } from './primitives'
import { chip, chipAccent, cx, linkAccentStandalone } from './ui'

const pkgName = (id: ApplyPackageId) => packageName(id)

/* ------------------------------------------------------------------ */
/* (iii-a) ProblemPackageFlow (md+)                                     */
/* ------------------------------------------------------------------ */
const FLOW_TARGETS: { id: ApplyPackageId; y: number }[] = [
  { id: 'sprint', y: 40 },
  { id: 'raise', y: 88 },
  { id: 'build', y: 136 },
  { id: 'blueprint', y: 184 },
  { id: 'venture', y: 232 },
]

export function ProblemPackageFlow({ className }: { className?: string }) {
  const targetY = (id: ApplyPackageId) => FLOW_TARGETS.find((t) => t.id === id)!.y
  return (
    <div className={cx('ppf', className)}>
      <svg
        viewBox="0 0 640 272"
        width="100%"
        className="block w-full h-auto"
        role="img"
        aria-labelledby="ppf-title ppf-desc"
      >
        <title id="ppf-title">Eight problems, five ways Foundry fixes them</title>
        <desc id="ppf-desc">
          Problem 1 maps to Foundry Sprint; 2 and 3 to Raise Ready; 4 and 5 to Foundry Build; 6 to Foundry Blueprint; 7
          and 8 to Foundry Venture.
        </desc>
        {FIX_ROWS.map((r, i) => {
          const y = 24 + i * 32
          const Y = targetY(r.packageId)
          return (
            <path
              key={`l-${r.n}`}
              className="ppf-link"
              data-pkg={r.packageId}
              d={`M205,${y} C320,${y} 320,${Y} 440,${Y}`}
              fill="none"
              stroke="var(--cr-border-strong)"
              strokeWidth={1.5}
            />
          )
        })}
        {FIX_ROWS.map((r, i) => {
          const y = 24 + i * 32
          return (
            <g key={`n-${r.n}`}>
              <circle cx={200} cy={y} r={5} fill={r.n >= 7 ? 'var(--cr-text)' : 'var(--cr-text-muted)'} />
              <text x={188} y={y + 4.5} textAnchor="end" fontSize={13}>
                <tspan className="font-mono" fill="var(--cr-text-dim)">
                  {String(r.n).padStart(2, '0')}
                </tspan>
                <tspan fill="var(--cr-text)" dx={8}>
                  {r.short}
                </tspan>
              </text>
            </g>
          )
        })}
        {FLOW_TARGETS.map((t) => {
          const featured = t.id === 'blueprint'
          return (
            <a key={t.id} href={`#pkg-${t.id}`} className="ppf-node" data-pkg={t.id} aria-label={pkgName(t.id)}>
              <rect
                x={440}
                y={t.y - 18}
                width={192}
                height={36}
                rx={8}
                fill={featured ? 'var(--cr-accent-tint)' : 'var(--cr-surface-2)'}
                stroke={featured ? 'var(--cr-accent)' : 'var(--cr-border-strong)'}
              />
              <text x={536} y={t.y + 4.5} textAnchor="middle" fontSize={13} fill="var(--cr-text)">
                {pkgName(t.id)}
              </text>
            </a>
          )
        })}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* (iii-b) ProblemSolutionMap                                           */
/* ------------------------------------------------------------------ */
function FixRowItem({ row }: { row: FixRow }) {
  const num = String(row.n).padStart(2, '0')
  return (
    <article
      aria-labelledby={`fix-${row.n}-title`}
      className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:rounded-none lg:border-0 lg:border-t lg:bg-transparent lg:px-0 lg:py-6 lg:grid lg:grid-cols-[3rem_minmax(0,1fr)_3.5rem_minmax(0,1fr)] lg:items-start lg:gap-4"
    >
      <span className="font-mono text-xs text-(--cr-text-dim) lg:text-sm lg:pt-1">{num}</span>
      <div className="mt-1 lg:mt-0">
        <h4 id={`fix-${row.n}-title`} className="font-outfit text-lg font-normal! text-(--cr-text)">
          {row.problem}
        </h4>
        <p className="mt-2 text-sm text-(--cr-text-muted) leading-relaxed">
          <span className="mr-1.5 text-xs uppercase tracking-wide">Evidence</span>
          <RichText segs={row.evidence} />
        </p>
      </div>
      <div className="my-4 flex items-center gap-2 text-xs text-(--cr-accent-ink) lg:hidden">
        <ArrowDown aria-hidden className="size-4" /> What Foundry does
      </div>
      <svg aria-hidden viewBox="0 0 56 16" className="hidden lg:block w-14 h-4 mt-1.5">
        <line x1={0} x2={46} y1={8} y2={8} stroke="var(--cr-border-strong)" strokeWidth={1.5} />
        <path d="M46,3 L54,8 L46,13 Z" fill="var(--cr-accent)" />
      </svg>
      <div>
        <span className="sr-only">What Foundry does: </span>
        <p className="text-base text-(--cr-text) border-l-2 border-(--cr-accent) pl-3 leading-relaxed">
          <RichText segs={row.solution} />
        </p>
        <a
          href={`#pkg-${row.packageId}`}
          className={cx(chipAccent, 'mt-3 py-2.5 no-underline hover:underline')}
          aria-label={`See ${pkgName(row.packageId)}`}
        >
          {pkgName(row.packageId)}
          <ArrowRight aria-hidden className="size-3.5" />
        </a>
      </div>
    </article>
  )
}

export function ProblemSolutionMap() {
  const early = FIX_ROWS.filter((r) => r.n <= 6)
  const growing = FIX_ROWS.filter((r) => r.n >= 7)
  return (
    <div>
      <div id="fix-early" className="scroll-mt-24">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h3 className="font-outfit text-xl font-normal! tracking-[-0.01em] text-(--cr-text)">
            If you&apos;re an early-stage founder
          </h3>
          <span className={chipAccent}>Path 1 · Validate &amp; scale</span>
        </div>
        <div className="space-y-4 lg:space-y-0 lg:border-b lg:border-(--cr-border)">
          {early.map((r) => (
            <FixRowItem key={r.n} row={r} />
          ))}
        </div>
      </div>
      <div id="fix-growing" className="scroll-mt-24 mt-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h3 className="font-outfit text-xl font-normal! tracking-[-0.01em] text-(--cr-text)">
            If you&apos;re a growing startup
          </h3>
          <span className={chipAccent}>Path 2 · Venture build</span>
        </div>
        <div className="space-y-4 lg:space-y-0 lg:border-b lg:border-(--cr-border)">
          {growing.map((r) => (
            <FixRowItem key={r.n} row={r} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* (vi-a) OsLiteStack                                                   */
/* ------------------------------------------------------------------ */
export function OsLiteStack() {
  return (
    <div>
      <ol aria-label="ESRE OS Lite: three OS layers, L2 installed first">
        <li className="rounded-lg border border-(--cr-border) flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-(--cr-l1-ink)">L1</span>
            <span className="text-(--cr-text)">Business Design</span>
          </div>
          <span className="font-mono text-sm text-(--cr-text-muted)">1.0×</span>
        </li>
        <li className="my-2 rounded-lg border border-(--cr-border) bg-(--cr-l2-tint) flex items-center justify-between gap-4 px-4 py-6">
          <div className="flex items-start gap-3 min-w-0">
            <span className="font-mono text-(--cr-l2-ink) pt-0.5">L2</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-medium text-(--cr-text)">Operating Model</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-(--cr-l2-ink) px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-(--cr-l2-ink)">
                  <AlertTriangle aria-hidden className="size-3.5" />
                  Primary constraint
                </span>
              </div>
              <p className="mt-1 text-xs text-(--cr-text-muted)">Installed first</p>
            </div>
          </div>
          <span className="font-mono text-2xl text-(--cr-l2-ink)">1.4×</span>
        </li>
        <li className="rounded-lg border border-(--cr-border) flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-(--cr-l3-ink)">L3</span>
            <span className="text-(--cr-text)">Technology &amp; Platform</span>
          </div>
          <span className="font-mono text-sm text-(--cr-text-muted)">1.0×</span>
        </li>
      </ol>
      <div className="mt-3 space-y-2" aria-label="Deferred OS layers">
        <div className="rounded-lg border border-dashed border-(--cr-border-strong) text-(--cr-text-muted) text-sm py-3 px-4">
          <span className="font-mono">L4</span> Data &amp; Intelligence
        </div>
        <div className="rounded-lg border border-dashed border-(--cr-border-strong) text-(--cr-text-muted) text-sm py-3 px-4">
          <span className="font-mono">L5</span> Governance, Risk &amp; Control
        </div>
        <p className="text-sm text-(--cr-text-muted)">Deferred until later stages.</p>
      </div>
      <p className="mt-4 text-xs text-(--cr-text-muted)">Weights from the ESRE OS Performance Score.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* (iv) PathsDiagram                                                    */
/* ------------------------------------------------------------------ */
export function PathsDiagram() {
  return (
    <div role="group" aria-label="Two ways into Crelligent Foundry">
      <div className="lg:mx-auto w-fit rounded-md border border-(--cr-border-strong) bg-(--cr-surface) px-4 py-2 font-outfit text-sm text-(--cr-text)">
        Crelligent Foundry
      </div>
      <svg
        aria-hidden
        viewBox="0 0 640 48"
        preserveAspectRatio="none"
        className="hidden lg:block w-full h-12"
      >
        <path
          d="M320,0 V24 M160,24 H480 M160,24 V48 M480,24 V48"
          fill="none"
          stroke="var(--cr-border-strong)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative mt-4 pl-6 lg:mt-0 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-8">
        <span aria-hidden className="absolute left-2 top-0 bottom-6 w-px bg-(--cr-border-strong) lg:hidden" />
        {PATHS.map((p) => {
          const Icon = p.n === 1 ? Gauge : Rocket
          return (
            <article
              key={p.id}
              id={`path-${p.id}`}
              aria-labelledby={`path-${p.id}-title`}
              className="relative scroll-mt-24 mb-6 last:mb-0 lg:mb-0 rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:p-6 flex flex-col"
            >
              <span
                aria-hidden
                className="absolute -left-[1.3rem] top-7 size-2.5 rounded-full bg-(--cr-accent) lg:left-1/2 lg:-top-[5px] lg:-translate-x-1/2"
              />
              <div className="flex items-center gap-3">
                <span className="size-10 rounded-md bg-(--cr-accent-tint) grid place-items-center">
                  <Icon aria-hidden className="size-5 text-(--cr-accent-ink)" />
                </span>
                <span className="font-mono text-xs text-(--cr-text-muted)">Path {p.n}</span>
              </div>
              <h3 id={`path-${p.id}-title`} className="mt-4 font-outfit text-2xl font-normal! text-(--cr-text)">
                {p.title}
              </h3>
              <p className="mt-3">
                <span className={chip}>For: {p.forWho}</span>
              </p>
              <p className="mt-3 text-lg text-(--cr-text)">{p.line}</p>
              <p className="mt-3 text-(--cr-text-muted) leading-relaxed">
                <RichText segs={p.body} />
              </p>
              <ol className="mt-5 flex flex-wrap items-center gap-2 text-xs" aria-label={`Path ${p.n} steps`}>
                {p.flow.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-(--cr-text-dim)" />}
                    <span className={i === 1 && p.n === 1 ? chipAccent : chip}>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-(--cr-text-muted)">
                <span>{p.packageIds.length > 1 ? 'Tiers:' : 'Tier:'}</span>
                {p.packageIds.map((id) => (
                  <a key={id} href={`#pkg-${id}`} className={cx(chip, 'py-2 no-underline hover:text-(--cr-text)')}>
                    {pkgName(id)}
                  </a>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <Link href={`/foundry/apply?path=${p.id}`} className={linkAccentStandalone}>
                  Apply for this path <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* (v) ProcessTimeline                                                  */
/* ------------------------------------------------------------------ */
export function ProcessTimeline() {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="hidden lg:block absolute top-[1.125rem] left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-(--cr-border-strong)"
      />
      <ol className="relative lg:grid lg:grid-cols-6 lg:gap-6">
        {PROCESS_STEPS.map((s, i) => (
          <li
            key={s.title}
            className="relative grid grid-cols-[2.25rem_1fr] gap-4 pb-8 last:pb-0 before:absolute before:left-[1.1rem] before:top-9 before:bottom-0 before:w-px before:bg-(--cr-border-strong) last:before:hidden lg:flex lg:flex-col lg:items-center lg:text-center lg:gap-3 lg:pb-0 lg:before:hidden"
          >
            <span className="relative z-10 size-9 rounded-full border border-(--cr-accent) bg-(--cr-bg) grid place-items-center font-mono text-sm text-(--cr-accent-ink)">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-(--cr-text)">{s.title}</p>
              {s.chip && (
                <p className="mt-1.5">
                  {s.chip.kind === 'pay' ? (
                    <span className={cx(chipAccent, 'font-mono')}>
                      <Wallet aria-hidden className="size-3.5" />
                      {s.chip.label}
                    </span>
                  ) : (
                    <span className={chip}>{s.chip.label}</span>
                  )}
                </p>
              )}
              <p className="mt-1.5 text-sm text-(--cr-text-muted) leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* (v-b) PaymentSplitBar                                                */
/* ------------------------------------------------------------------ */
export function PaymentSplitBar({ className }: { className?: string }) {
  const dep = FOUNDRY_BILLING.depositPercent
  const bal = 100 - dep
  return (
    <div className={className}>
      <div role="img" aria-label={`Payment: ${dep}% on signing, ${bal}% on delivery`} className="flex h-3 gap-0.5">
        <span className="h-full rounded-l-sm bg-(--cr-accent)" style={{ width: `${dep}%` }} />
        <span
          className="h-full rounded-r-sm border border-(--cr-accent) bg-(--cr-accent-tint)"
          style={{ width: `${bal}%` }}
        />
      </div>
      <div aria-hidden className="mt-2 flex justify-between gap-4 text-sm text-(--cr-text-muted)">
        <span>
          <span className="font-mono text-(--cr-text)">{dep}%</span> on signing
        </span>
        <span>
          <span className="font-mono text-(--cr-text)">{bal}%</span> on delivery
        </span>
      </div>
    </div>
  )
}
