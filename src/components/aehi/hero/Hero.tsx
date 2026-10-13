/**
 * AEHI hero (one-page /aehi). Server component.
 * Numbers shown here are only: methodology facts (layer weights), the live assessed count from the
 * database (hidden when zero), and World Bank figures with their source on the same screen.
 */
import { ArrowDown } from 'lucide-react'
import { DIAGNOSTIC_MINUTES, EDITION, LAYERS } from '@/data/aehi/edition'
import { NAV_LINKS } from '@/data/aehi/site'
import { formatCount } from '@/data/aehi/live'
import { GROWTH_BY_SIZE, MANAGEMENT_PRACTICES } from '@/data/aehi/evidence'
import { Chip } from '@/components/aehi/ui/Typography'
import { ButtonLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'

const TOP_DOWN = [...LAYERS].reverse() // L5 at the top, L1 at the foundation

/** Decorative "OS scan": five slabs sized by layer weight, L2 emphasised, a scan line passing through. */
function OsScan() {
  return (
    <div className="aehi-scan relative" aria-hidden="true">
      <div className="absolute -inset-x-3 -inset-y-5 rounded-xl border border-aehi-line sm:-inset-x-4 sm:-inset-y-6" />
      <div className="relative space-y-2">
        {TOP_DOWN.map((l, i) => {
          const isL2 = l.code === 'L2'
          return (
            <div key={l.code} className="flex items-stretch gap-3" style={{ animationDelay: `${(4 - i) * 90}ms` }}>
              <div
                className={`relative flex flex-1 items-center justify-between overflow-hidden rounded-md border px-4 ${
                  isL2 ? 'border-aehi-accent bg-aehi-accent-tint' : 'border-aehi-line-strong bg-aehi-surface'
                }`}
                style={{ height: `${Math.round(26 + 28 * l.weight)}px` }}
              >
                <span className="flex items-baseline gap-3">
                  <span className={`t-data text-xs ${isL2 ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{l.code}</span>
                  <span className={`text-sm font-medium sm:text-[15px] ${isL2 ? 'text-aehi-text' : 'text-aehi-text-muted'}`}>{l.name}</span>
                </span>
                <span className={`t-data text-xs ${isL2 ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{l.weightLabel}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="aehi-scan-line pointer-events-none absolute -inset-x-4 top-0 h-px bg-aehi-accent" />
      <p className="t-data mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-aehi-text-subtle">
        <span>ESRE OS · five layers</span>
        <span className="hidden sm:inline">L2 weighted highest</span>
      </p>
    </div>
  )
}

export function Hero({
  count,
  publishedLabel,
  publishedN,
}: {
  count: number | null
  publishedLabel?: string
  publishedN?: number
}) {
  const published = !!publishedLabel
  const reacting = MANAGEMENT_PRACTICES.rows.find((r) => r.label.startsWith('Action taken'))!
  const underperf = MANAGEMENT_PRACTICES.rows.find((r) => r.label.startsWith('Under-performers'))!
  const medium = GROWTH_BY_SIZE.rows.find((r) => r.label.startsWith('Medium'))!

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-var(--aehi-nav-h))] flex-col overflow-hidden bg-aehi-bg"
    >
      {/* Fine grid, fading out towards the bottom (decorative) */}
      <div aria-hidden="true" className="aehi-hero-grid pointer-events-none absolute inset-0" />

      <div className="container-x relative flex flex-1 flex-col justify-center py-12 lg:py-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Chip variant={published ? 'neutral' : 'live'}>
                {published ? (
                  `${publishedLabel} edition published`
                ) : (
                  <>
                    Edition {EDITION.number} · {EDITION.label}
                    <span className="hidden sm:inline"> · collecting responses</span>
                  </>
                )}
              </Chip>
            </div>
            <h1 id="hero-title" className="t-display mt-6 max-w-[19ch] text-balance xl:text-[3.5rem] xl:leading-[1.06]">
              Every enterprise runs on an operating system. Most have never seen theirs.
            </h1>
            <p className="t-lead mt-6 max-w-[60ch]">
              The African Enterprise Health Index measures how Nigerian mid-market enterprises are actually run, across the five
              layers of the ESRE OS: business design, operating model, technology, data and governance.{' '}
              {published
                ? `The ${publishedLabel} edition covers ${formatCount(publishedN ?? 0)} enterprises.`
                : `The inaugural edition publishes in ${EDITION.label}.`}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DiagnosticLink location="hero" fullWidthOnMobile>
                Get your score in {DIAGNOSTIC_MINUTES} minutes
              </DiagnosticLink>
              {published ? (
                <ButtonLink href="#report" fullWidthOnMobile>
                  Read the {publishedLabel} report
                </ButtonLink>
              ) : (
                <ButtonLink href="#barometer" fullWidthOnMobile>
                  Answer the 5-minute Barometer
                </ButtonLink>
              )}
            </div>
            <p className="t-small mt-4 text-aehi-text-subtle">
              Free. You see your ESRE OS Performance Score straight away. Your company is never named.
              {count !== null && count > 0 && (
                <>
                  {' '}
                  <span className="text-aehi-text-muted">
                    Enterprises assessed so far: <span className="t-data text-aehi-text">{formatCount(count)}</span>.
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="lg:col-span-5">
            <OsScan />
          </div>
        </div>
      </div>

      {/* Evidence strip: third-party figures, sourced on the same screen */}
      <div className="relative border-t border-aehi-line bg-aehi-bg-deep/70">
        <div className="container-x grid grid-cols-1 gap-6 py-5 md:grid-cols-12 md:items-center md:gap-8">
          <p className="t-label text-aehi-text-subtle md:col-span-3">
            What the data already shows
            <span className="mt-1 block normal-case tracking-normal text-aehi-text-subtle">World Bank, Nigeria 2025</span>
          </p>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:col-span-7">
            <div>
              <dt className="sr-only">Score for reacting when a problem arises</dt>
              <dd className="t-data text-2xl text-aehi-text">
                {reacting.value}
                <span className="text-sm text-aehi-text-subtle">/100</span>
              </dd>
              <dd className="t-small text-aehi-text-muted">for reacting when a problem arises</dd>
            </div>
            <div>
              <dt className="sr-only">Score for acting on under-performance</dt>
              <dd className="t-data text-2xl text-aehi-accent">
                {underperf.value}
                <span className="text-sm text-aehi-text-subtle">/100</span>
              </dd>
              <dd className="t-small text-aehi-text-muted">for acting on under-performance</dd>
            </div>
            <div>
              <dt className="sr-only">Medium firms: yearly staff growth and real sales growth</dt>
              <dd className="t-data text-2xl text-aehi-text">
                +{medium.employment}% <span className="text-sm text-aehi-text-subtle">vs</span> +{medium.sales}%
              </dd>
              <dd className="t-small text-aehi-text-muted">staff vs real sales growth a year, medium firms</dd>
            </div>
          </dl>
          <a href="#research" className="link-tertiary md:col-span-2 md:justify-self-end">
            <span>See the research</span>
            <ArrowDown className="arrow h-4 w-4 flex-none" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Jump links: the page's sections (replaces the old section bar) */}
      <nav aria-label="AEHI sections" className="relative border-t border-aehi-line">
        <ul className="container-x flex gap-x-6 overflow-x-auto py-1.5 [scrollbar-width:none] lg:justify-between">
          {NAV_LINKS.filter((l) => l.href !== '/aehi').map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href.replace('/aehi', '')}
                className="t-small inline-flex min-h-[44px] items-center gap-2 text-aehi-text-muted transition-colors duration-150 hover:text-aehi-text"
              >
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-aehi-accent" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
