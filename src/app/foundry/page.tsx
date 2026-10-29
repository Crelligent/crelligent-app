import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { packagesOfKind } from '@/lib/foundry/packages'
import {
  FIXES,
  FINAL_CTA,
  HERO,
  L2_SECTION,
  NOT_ACCELERATOR,
  PACKAGES_SECTION,
  ADDONS_SECTION,
  LAUNCH_SECTION,
  PATHS_HEADING,
  PROBLEM,
  PROCESS_HEADING,
  STAT_CARDS,
} from '@/components/foundry/content'
import { Cite, Eyebrow, Section, SectionHeader } from '@/components/foundry/primitives'
import { Reveal } from '@/components/foundry/Reveal'
import { HeroForge } from '@/components/foundry/HeroForge'
import { FailureReasonsChart, FundingChart, SeedVsSeriesAChart } from '@/components/foundry/charts'
import {
  OsLiteStack,
  PathsDiagram,
  PaymentSplitBar,
  ProblemPackageFlow,
  ProblemSolutionMap,
  ProcessTimeline,
} from '@/components/foundry/diagrams'
import {
  BillingTerms,
  ComparisonTable,
  FAQ,
  faqJsonLd,
  HeroPathChooser,
  PackageCard,
  SourcesList,
  StatCard,
} from '@/components/foundry/sections'
import { btnPrimary, btnSecondary, cx, linkAccent, linkAccentStandalone } from '@/components/foundry/ui'
import { LibraryCard } from '@/components/library/LibraryCard'
import { foundryFeaturedItems } from '@/data/library'

const title = 'Foundry: Build and Validate Startups'
const description =
  'Crelligent Foundry designs, builds and launches ventures: validate the idea, design the operating system, build the product, launch with AD+Vantage, and scale.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/foundry' },
  openGraph: { title, description, url: '/foundry' },
}

function CtaPair() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link href="/foundry/apply" className={cx(btnPrimary, 'w-full sm:w-auto')}>
        {HERO.primaryCta}
        <ArrowRight aria-hidden className="size-4" />
      </Link>
      <a href="#packages" className={cx(btnSecondary, 'w-full sm:w-auto')}>
        {HERO.secondaryCta}
      </a>
    </div>
  )
}

function SnapshotLink() {
  return (
    <p className="mt-4 text-sm text-(--cr-text-muted)">
      Not sure where you stand?{' '}
      <Link href="/foundry/pmf-check" className={linkAccent}>
        Take the free 3-minute PMF snapshot
      </Link>
    </p>
  )
}

export default function FoundryPage() {
  const tiers = packagesOfKind('tier')
  const validate = tiers.filter((p) => p.path === 'validate')
  const venture = tiers.filter((p) => p.path === 'venture')
  const addons = packagesOfKind('addon')
  const launch = packagesOfKind('launch')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <Navigation />
      <main id="main">
        {/* 1. Hero */}
        <section id="top" aria-labelledby="hero-title" className="px-4 sm:px-6 pt-28 pb-16 lg:pt-36 lg:pb-24 bg-(--cr-bg)">
          <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow>{HERO.eyebrow}</Eyebrow>
              <h1
                id="hero-title"
                className="mt-4 font-outfit text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl tracking-[-0.03em] text-(--cr-text)"
              >
                {HERO.headline}
              </h1>
              <p className="mt-5 text-base lg:text-lg text-(--cr-text-muted) max-w-2xl leading-relaxed">{HERO.subhead}</p>
              <CtaPair />
              <SnapshotLink />
              <p className="mt-4 text-sm text-(--cr-text-muted)">
                {HERO.trust.map((t, i) => (
                  <span key={t}>
                    {i > 0 && (
                      <span aria-hidden className="mx-2">
                        ·
                      </span>
                    )}
                    {t}
                  </span>
                ))}
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-span-5 space-y-5">
              <HeroForge />
              <HeroPathChooser />
            </div>
          </div>
        </section>

        {/* 2. The problem */}
        <Section id="problem" labelledBy="problem-title" surface>
          <SectionHeader id="problem-title" eyebrow={PROBLEM.eyebrow} title={PROBLEM.heading} intro={PROBLEM.intro} />
          <Reveal className="mt-10 lg:mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STAT_CARDS.map((s, i) => (
                <StatCard key={s.value} stat={s} describedBy={i === 0 ? 'chart-failure-reasons' : undefined} />
              ))}
            </div>
            <p className="mt-4 text-xs text-(--cr-text-muted)">
              Global figures <Cite n={[1, 15]} /> are global data; <Cite n={2} /> is Africa-wide and Nigeria-specific.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7 min-w-0">
              <FundingChart onSurface className="h-full" />
            </Reveal>
            <Reveal className="lg:col-span-5 min-w-0">
              <FailureReasonsChart onSurface className="h-full" />
            </Reveal>
          </div>
          <Reveal className="mt-4">
            <SeedVsSeriesAChart onSurface />
          </Reveal>
        </Section>

        {/* 3. Problem → solution */}
        <Section id="fixes" labelledBy="fixes-title">
          <SectionHeader id="fixes-title" eyebrow={FIXES.eyebrow} title={FIXES.heading} intro={FIXES.intro} />
          <div className="mt-10 lg:mt-14">
            <Reveal className="hidden md:block max-w-3xl mb-12">
              <ProblemPackageFlow />
            </Reveal>
            <ProblemSolutionMap />
          </div>
        </Section>

        {/* 4. Why L2 first */}
        <Section id="l2" labelledBy="l2-title" surface>
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 id="l2-title" className="heading-lg text-(--cr-text)">
                {L2_SECTION.heading}
              </h2>
              <ul className="mt-6 space-y-3 text-base text-(--cr-text-muted) leading-relaxed">
                {L2_SECTION.body.map((b, i) => (
                  <li key={b} className="flex gap-3">
                    <span
                      aria-hidden
                      className={cx(
                        'mt-2.5 size-1.5 shrink-0 rounded-full',
                        i === 0 ? 'bg-(--cr-l2-ink)' : 'bg-(--cr-text-dim)',
                      )}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-(--cr-text-muted)">{L2_SECTION.aehiNote}</p>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-span-6 lg:pt-12">
              <Reveal>
                <OsLiteStack />
              </Reveal>
            </div>
          </div>
        </Section>

        {/* 5. Two ways in */}
        <Section id="paths" labelledBy="paths-title">
          <SectionHeader id="paths-title" eyebrow="Paths" title={PATHS_HEADING} />
          <div className="mt-10 lg:mt-14">
            <PathsDiagram />
          </div>
        </Section>

        {/* 6. How it works */}
        <Section id="process" labelledBy="process-title" surface>
          <SectionHeader id="process-title" eyebrow="How it works" title={PROCESS_HEADING} />
          <div className="mt-10 lg:mt-14">
            <ProcessTimeline />
            <PaymentSplitBar className="mt-10 max-w-xl" />
          </div>
        </Section>

        {/* 7. Packages */}
        <Section id="packages" labelledBy="packages-title">
          <SectionHeader id="packages-title" title={PACKAGES_SECTION.heading} intro={PACKAGES_SECTION.intro} />
          <div className="mt-10 lg:mt-14">
            <h3 className="mb-4 font-sans! text-sm font-medium! tracking-normal! text-(--cr-text)">
              Path 1 · Build and scale a startup
            </h3>
            <Reveal className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {validate.map((p) => (
                <PackageCard key={p.id} p={p} />
              ))}
            </Reveal>
            <p className="mt-4 text-sm text-(--cr-text-muted)">{PACKAGES_SECTION.credit}</p>
            <h3 className="mt-10 mb-4 font-sans! text-sm font-medium! tracking-normal! text-(--cr-text)">
              Path 2 · Co-build a venture
            </h3>
            <Reveal>
              {venture.map((p) => (
                <PackageCard key={p.id} p={p} variant="wide" />
              ))}
            </Reveal>

            <h3 className="mt-14 font-outfit text-2xl font-normal! text-(--cr-text)">{ADDONS_SECTION.heading}</h3>
            <p className="mt-2 mb-4 text-sm text-(--cr-text-muted)">{ADDONS_SECTION.intro}</p>
            <Reveal>
              {addons.map((p) => (
                <PackageCard key={p.id} p={p} variant="wide" />
              ))}
            </Reveal>

            <h3 id="launch" className="mt-14 scroll-mt-24 font-outfit text-2xl font-normal! text-(--cr-text)">
              {LAUNCH_SECTION.heading}
            </h3>
            <p className="mt-2 mb-4 max-w-3xl text-sm text-(--cr-text-muted) leading-relaxed">{LAUNCH_SECTION.intro}</p>
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {launch.map((p) => (
                <PackageCard key={p.id} p={p} />
              ))}
            </Reveal>
            <ul className="mt-4 space-y-1 text-sm text-(--cr-text-muted)">
              {LAUNCH_SECTION.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <div className="mt-10">
              <BillingTerms />
            </div>
          </div>
        </Section>

        {/* 8. Not an accelerator */}
        <Section id="not-an-accelerator" labelledBy="na-title" surface>
          <header>
            <h2 id="na-title" className="heading-lg text-(--cr-text)">
              {NOT_ACCELERATOR.heading}
            </h2>
            <p className="mt-3 text-lg text-(--cr-text-muted)">{NOT_ACCELERATOR.line}</p>
          </header>
          <div className="mt-10 max-w-4xl">
            <ComparisonTable />
            <p className="mt-6 text-sm text-(--cr-text-muted)">{NOT_ACCELERATOR.footer}</p>
          </div>
        </Section>

        {/* 9. Research for founders (Library) */}
        <Section id="research" labelledBy="research-title">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <SectionHeader
              id="research-title"
              eyebrow="Library"
              title="Research for founders"
              intro="What African investors are funding now, and the evidence that gets a founder through the door."
            />
            <Link href="/insights" className={cx(linkAccentStandalone, 'text-sm')}>
              Browse the library
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <Reveal className="mt-10 lg:mt-14">
            <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
              {foundryFeaturedItems.map((item) => (
                <li key={item.slug} className="min-w-0">
                  <LibraryCard item={item} sizes="(min-width: 768px) 33vw, 100vw" />
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* 10. FAQ */}
        <Section id="faq" labelledBy="faq-title" className="border-t border-(--cr-border)">
          <SectionHeader id="faq-title" title="FAQ" />
          <div className="mt-10">
            <FAQ />
          </div>
        </Section>

        {/* 11. Final CTA */}
        <section
          id="apply"
          aria-labelledby="apply-title"
          className="scroll-mt-24 px-4 sm:px-6 py-16 lg:py-24 bg-(--cr-surface) border-t border-(--cr-border)"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <h2 id="apply-title" className="heading-lg text-(--cr-text)">
                {FINAL_CTA.heading}
              </h2>
              <p className="mt-4 text-base lg:text-lg text-(--cr-text-muted)">{FINAL_CTA.line}</p>
              <CtaPair />
              <SnapshotLink />
            </div>
          </div>
        </section>

        {/* 12. Sources */}
        <SourcesList />
      </main>
      <Footer />
    </>
  )
}
