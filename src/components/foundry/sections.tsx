/** /foundry landing building blocks (DESIGN.md §3). */
import Link from 'next/link'
import {
  ArrowDown,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Gauge,
  Globe,
  Landmark,
  Minus,
  Rocket,
  ShieldCheck,
} from 'lucide-react'
import { FOUNDRY_BILLING, SHOW_PRICES, formatNgn, priceLabel, type FoundryPackage } from '@/lib/foundry/packages'
import { FAQ_ITEMS, NOT_ACCELERATOR, type StatCardData } from './content'
import { Cite } from './primitives'
import { FOUNDRY_SOURCES } from './sources'
import { btnPrimary, btnSecondary, cx, eyebrowMuted, linkAccent } from './ui'

/* Hero path chooser */
export function HeroPathChooser() {
  const rows = [
    {
      href: '#fix-early',
      icon: Gauge,
      title: 'Early-stage founder',
      text: 'Pre-seed to Series A. Prove PMF, install the OS.',
    },
    { href: '#fix-growing', icon: Rocket, title: 'Growing startup', text: 'Second product, spin-out or new market.' },
  ]
  return (
    <nav aria-label="Jump to your situation" className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:p-6">
      <p className={eyebrowMuted}>Where are you?</p>
      <ul className="mt-4 space-y-3">
        {rows.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              className="min-h-16 flex items-center justify-between gap-4 rounded-md border border-(--cr-border) px-4 py-3 hover:border-(--cr-border-strong) hover:bg-(--cr-surface-2) transition-colors"
            >
              <span className="flex items-center gap-3">
                <r.icon aria-hidden className="size-5 shrink-0 text-(--cr-accent-ink)" />
                <span>
                  <span className="block font-medium text-(--cr-text)">{r.title}</span>
                  <span className="block text-sm text-(--cr-text-muted)">{r.text}</span>
                </span>
              </span>
              <ArrowDown aria-hidden className="size-4 shrink-0 text-(--cr-text-muted)" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* Stat card */
export function StatCard({ stat, describedBy }: { stat: StatCardData; describedBy?: string }) {
  return (
    <div
      aria-describedby={describedBy}
      className="relative rounded-lg border border-(--cr-border) bg-(--cr-bg) p-5 lg:p-6 before:absolute before:top-0 before:left-5 lg:before:left-6 before:h-0.5 before:w-8 before:bg-(--cr-accent)"
    >
      <p className="font-mono text-4xl lg:text-5xl font-medium text-(--cr-text) tabular">{stat.value}</p>
      <p className="mt-3 text-sm text-(--cr-text-muted) leading-relaxed">
        {stat.line}
        <Cite n={stat.cite} />
      </p>
      <p className="mt-4 text-xs text-(--cr-text-muted)">{stat.source}</p>
    </div>
  )
}

/* Package card */
function PriceBlock({ p }: { p: FoundryPackage }) {
  return (
    <div aria-label={priceLabel(p)} role="group" className="mt-5">
      {SHOW_PRICES && p.priceFromNgn != null && p.priceToNgn != null ? (
        <>
          <p aria-hidden className="font-mono text-2xl font-medium text-(--cr-text) tabular">
            {formatNgn(p.priceFromNgn)}
          </p>
          <p aria-hidden className="font-mono text-base text-(--cr-text-muted) tabular">
            to {formatNgn(p.priceToNgn)}
          </p>
        </>
      ) : (
        <>
          <p className="font-outfit text-2xl text-(--cr-text)">Quote on request</p>
          <p className="text-sm text-(--cr-text-muted)">Scoped to your stage and goals</p>
        </>
      )}
    </div>
  )
}

function Includes({ p }: { p: FoundryPackage }) {
  return (
    <ul className="space-y-2.5 text-sm text-(--cr-text)">
      {p.includes.map((item) => {
        const l2 = p.id === 'os-lite' && item.startsWith('L2 ')
        return (
          <li key={item} className="flex gap-2.5">
            <Check aria-hidden className="size-4 text-(--cr-accent-ink) mt-0.5 shrink-0" />
            <span>
              {l2 ? (
                <>
                  <strong className="font-medium text-(--cr-l2-ink)">L2</strong>
                  {item.slice(2)}
                </>
              ) : (
                item
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function PackageCard({ p, variant = 'default' }: { p: FoundryPackage; variant?: 'default' | 'wide' }) {
  const cta = (
    <Link
      href={`/foundry/apply?package=${p.id}`}
      aria-label={`Request a quote for ${p.name}`}
      className={cx(p.featured ? btnPrimary : btnSecondary, 'w-full', variant === 'wide' && 'lg:min-w-48')}
    >
      Request a quote
    </Link>
  )
  const timeline = (
    <p className="mt-2 flex items-center gap-2 text-sm text-(--cr-text-muted)">
      <Clock aria-hidden className="size-4" />
      {p.timeline}
    </p>
  )
  const head = (
    <>
      {p.featured && (
        <span className="mb-3 inline-block w-fit rounded-md bg-(--cr-accent) text-(--cr-on-accent) text-xs font-medium px-2 py-0.5 sm:absolute sm:top-5 sm:right-5 sm:mb-0">
          Most popular
        </span>
      )}
      <p className={cx(eyebrowMuted, p.featured && 'sm:pr-24')}>{p.forWho}</p>
      <h3 className="mt-2 font-outfit text-xl font-normal! tracking-[-0.01em] text-(--cr-text)">{p.name}</h3>
      <p className="mt-2 text-sm text-(--cr-text-muted) leading-relaxed">{p.summary}</p>
    </>
  )

  if (variant === 'wide') {
    return (
      <article
        id={`pkg-${p.id}`}
        aria-labelledby={`pkg-${p.id}-name`}
        className="relative scroll-mt-24 rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:p-6 flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr_auto] lg:gap-8 lg:items-start"
      >
        <div>
          <p className={eyebrowMuted}>{p.forWho}</p>
          <h3 id={`pkg-${p.id}-name`} className="mt-2 font-outfit text-xl font-normal! tracking-[-0.01em] text-(--cr-text)">
            {p.name}
          </h3>
          <p className="mt-2 text-sm text-(--cr-text-muted) leading-relaxed">{p.summary}</p>
        </div>
        <div className="order-last lg:order-none">
          <div className="my-5 border-t border-(--cr-border) lg:hidden" />
          <Includes p={p} />
        </div>
        <div className="lg:min-w-48">
          <PriceBlock p={p} />
          {timeline}
          <div className="hidden lg:block pt-6">{cta}</div>
        </div>
        <div className="order-last pt-6 lg:hidden">{cta}</div>
      </article>
    )
  }

  return (
    <article
      id={`pkg-${p.id}`}
      aria-label={p.name}
      className={cx(
        'relative scroll-mt-24 rounded-lg border bg-(--cr-surface) p-5 lg:p-6 flex flex-col h-full',
        p.featured ? 'border-(--cr-accent)' : 'border-(--cr-border)',
      )}
    >
      {head}
      <PriceBlock p={p} />
      {timeline}
      <div className="my-5 border-t border-(--cr-border)" />
      <Includes p={p} />
      <div className="mt-auto pt-6">{cta}</div>
    </article>
  )
}

/* Billing terms */
export function BillingTerms() {
  const items = [
    { icon: CalendarCheck, text: '50% on signing, 50% on delivery.' },
    { icon: Landmark, text: 'Nigerian clients are billed in NGN.' },
    { icon: Globe, text: 'International clients: quoted and invoiced in USD, GBP or EUR.' },
  ]
  return (
    <div className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 lg:p-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
      {items.map((it) => (
        <p key={it.text} className="flex gap-3 text-sm text-(--cr-text-muted)">
          <it.icon aria-hidden className="size-5 shrink-0 text-(--cr-accent-ink)" />
          <span>{it.text}</span>
        </p>
      ))}
      <p className="flex gap-3 text-sm text-(--cr-text-muted)">
        <ShieldCheck aria-hidden className="size-5 shrink-0 text-(--cr-accent-ink)" />
        <span>
          Payments are processed securely by Paystack. Payments and receipts:{' '}
          <a href={`mailto:${FOUNDRY_BILLING.billingEmail}`} className={cx(linkAccent, 'whitespace-nowrap')}>
            {FOUNDRY_BILLING.billingEmail}
          </a>
        </span>
      </p>
    </div>
  )
}

/* Not an accelerator: comparison table */
export function ComparisonTable() {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">How Crelligent Foundry differs from accelerators</caption>
      <thead>
        <tr>
          <th scope="col" className="w-2/5 pb-3 pr-4 text-sm font-medium text-(--cr-text-muted)">
            Accelerators often
          </th>
          <th scope="col" className="w-3/5 pb-3 text-sm font-medium text-(--cr-accent-ink)">
            Crelligent Foundry
          </th>
        </tr>
      </thead>
      <tbody>
        {NOT_ACCELERATOR.rows.map(([them, us]) => (
          <tr key={them} className="border-t border-(--cr-border)">
            <td className="py-4 pr-4 align-top text-sm lg:text-base text-(--cr-text-muted)">
              <span className="flex gap-2">
                <Minus aria-hidden className="size-4 mt-0.5 shrink-0 text-(--cr-text-dim)" />
                {them}
              </span>
            </td>
            <td className="py-4 align-top text-sm lg:text-base text-(--cr-text)">
              <span className="flex gap-2">
                <Check aria-hidden className="size-4 mt-0.5 shrink-0 text-(--cr-accent-ink)" />
                {us}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* FAQ */
export function FAQ() {
  return (
    <div className="max-w-3xl border-t border-(--cr-border)">
      {FAQ_ITEMS.map((f) => (
        <details key={f.q} className="group border-b border-(--cr-border)">
          <summary className="flex min-h-14 items-center justify-between gap-4 py-4 cursor-pointer list-none text-base font-medium text-(--cr-text)">
            {f.q}
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-(--cr-text-muted) transition-transform group-open:rotate-180"
            />
          </summary>
          <div className="pb-5 text-(--cr-text-muted) leading-relaxed">
            {f.intro && <p className="mb-2">{f.intro}</p>}
            {Array.isArray(f.a) ? (
              <ul className="list-disc pl-5 space-y-1.5">
                {f.a.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p>{f.a}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [f.intro, ...(Array.isArray(f.a) ? f.a : [f.a])].filter(Boolean).join(' '),
      },
    })),
  }
}

/* Sources */
export function SourcesList() {
  return (
    <section id="sources" aria-labelledby="sources-title" className="scroll-mt-24 px-4 sm:px-6 py-12 bg-(--cr-bg) border-t border-(--cr-border)">
      <div className="max-w-6xl mx-auto">
        <h2 id="sources-title" className="font-outfit text-base font-medium! text-(--cr-text)">
          Sources
        </h2>
        <ol className="mt-4 text-xs text-(--cr-text-muted) lg:columns-2 lg:gap-10 list-decimal pl-6">
          {FOUNDRY_SOURCES.map((s) => (
            <li
              key={s.n}
              id={`src-${s.n}`}
              value={s.n}
              className="scroll-mt-24 target:bg-(--cr-surface-2) rounded-md p-2 break-inside-avoid"
            >
              <em>{s.title}</em>
              {s.note && <> ({s.note})</>}, {s.publisher}, {s.year}.{' '}
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(linkAccent, 'inline-flex items-center gap-1 py-1')}
              >
                {s.domain}
                <ExternalLink aria-hidden className="size-3" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
