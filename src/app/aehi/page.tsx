import { HYPOTHESES } from '@/data/aehi/edition'
import { pageMetadata } from '@/data/aehi/site'
import { getAssessedCount, getEditionForDisplay } from '@/data/aehi/live'
import { Band, Chip, Eyebrow } from '@/components/aehi/ui/Typography'
import { Hero } from '@/components/aehi/hero/Hero'
import { MethodologySection } from '@/components/aehi/sections/MethodologySection'
import { TakePartSection } from '@/components/aehi/sections/TakePartSection'
import { BarometerSection } from '@/components/aehi/sections/BarometerSection'
import { ReportSection } from '@/components/aehi/sections/ReportSection'
import { ResearchSection } from '@/components/aehi/sections/ResearchSection'
import { PartnersSection } from '@/components/aehi/sections/PartnersSection'
import { ButtonLink, TextLink } from '@/components/aehi/ui/Links'
import { LayerStack } from '@/components/aehi/model/LayerStack'
import { WeightStrip } from '@/components/aehi/model/WeightStrip'
import { IndexFlow } from '@/components/aehi/model/IndexFlow'
import { CoverageMap } from '@/components/aehi/model/CoverageMap'
import { EditionFindingsGrid, SourceLine } from '@/components/aehi/published/Figures'

export const revalidate = 600

export const metadata = pageMetadata({
  title: 'African Enterprise Health Index (AEHI) | Crelligent',
  absoluteTitle: true,
  description:
    'A quarterly benchmark of how Nigerian mid-market enterprises are run, scored on five OS layers. Inaugural edition Q4 2026. Take the free diagnostic.',
  path: '/aehi',
})

export default async function HomePage() {
  const [count, edition] = await Promise.all([getAssessedCount(), getEditionForDisplay()])
  const published = edition !== null

  return (
    <>
      <Hero
        count={count}
        publishedLabel={published ? edition.label : undefined}
        publishedN={published ? edition.overall?.n : undefined}
      />

      {/* Published only: what the edition found */}
      {published && (
        <Band tone="deep" labelledBy="found-title">
          <Eyebrow>{edition.label} edition</Eyebrow>
          <h2 id="found-title" className="t-h2 mt-4">
            What the {edition.label} edition found.
          </h2>
          <div className="mt-10 lg:mt-14">
            <EditionFindingsGrid edition={edition} />
          </div>
          <SourceLine edition={edition} className="mt-6" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/aehi#report" variant="primary" fullWidthOnMobile>
              Read the full report
            </ButtonLink>
            <TextLink href="/aehi/data">Explore the data</TextLink>
          </div>
        </Band>
      )}

      {/* §2 The model */}
      <Band id="model" tone={published ? 'bg' : 'deep'} labelledBy="model-title">
        <Eyebrow>The ESRE OS model</Eyebrow>
        <h2 id="model-title" className="t-h2 mt-4">
          Five layers. Weaknesses start low and travel up.
        </h2>
        <p className="t-lead mt-4">
          Every enterprise in the index is scored on the same five OS layers. They depend on each other: a weakness in a lower layer
          shows up in every layer built on top of it. Explore the layers, then trace what happens when one is weak.
        </p>
        <div className="mt-10 lg:mt-14">
          <LayerStack
            footer={
              <TextLink href="/aehi#methodology#layers" className="mt-2">
                Read all five layers as text
              </TextLink>
            }
          />
        </div>
        <WeightStrip className="mt-10 max-w-3xl" />
      </Band>

      {/* §3 How the index works */}
      <Band id="how-it-works" tone={published ? 'deep' : 'bg'} labelledBy="how-title">
        <Eyebrow>How the index works</Eyebrow>
        <h2 id="how-title" className="t-h2 mt-4">
          From one diagnostic to a national benchmark.
        </h2>
        <p className="t-lead mt-4">
          Each enterprise gets something useful straight away. The index only ever publishes what is true of a group.
        </p>
        <div className="mt-10 lg:mt-14">
          <IndexFlow tone={published ? 'deep' : 'bg'} />
        </div>
        <TextLink href="/aehi#methodology" className="mt-4">
          Read the full methodology
        </TextLink>
      </Band>

      {/* Coverage map */}
      <Band id="coverage" tone="deep" labelledBy="coverage-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Coverage</Eyebrow>
            <h2 id="coverage-title" className="t-h2 mt-4">
              The inaugural edition starts in Nigeria.
            </h2>
            <p className="t-lead mt-4">
              Every response so far comes from Nigerian mid-market enterprises. Other African markets are not covered
              yet, and we will only add a market when it has enough responses to report on.
            </p>
            <p className="t-small mt-4 text-aehi-text-subtle">
              Hover or tap a country to see its status. The map shows coverage only, not scores.
            </p>
          </div>
          <div className="lg:col-span-7">
            <CoverageMap />
          </div>
        </div>
      </Band>

      {/* §4 Hypotheses (pre-publication only) */}
      {!published && (
        <Band id="hypotheses" tone="bg" labelledBy="hyp-title">
          <Eyebrow>Hypotheses for the inaugural edition</Eyebrow>
          <h2 id="hyp-title" className="t-h2 mt-4">
            What we expect to find, and will test.
          </h2>
          <p className="t-lead mt-4">
            Three patterns Crelligent sees repeatedly in its diagnostic work. They are hypotheses, not findings. The inaugural edition
            will report how widely each one holds, including where we are wrong.
          </p>
          <ul className="mt-10 grid grid-cols-1 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {HYPOTHESES.map((h) => (
              <li key={h.index} className="border-t border-aehi-line py-6">
                <Chip variant="hypothesis">Hypothesis {h.index}</Chip>
                <h3 className="t-h3 mt-4">{h.title}</h3>
                <p className="t-body mt-2">{h.body}</p>
                <p className="t-data mt-3 text-sm text-aehi-text-subtle">Layers: {h.layers.join(', ')}</p>
              </li>
            ))}
          </ul>
        </Band>
      )}

      {/* One-page AEHI: each nav item is a section below */}
      <MethodologySection />
      <TakePartSection />
      <BarometerSection />
      <ReportSection />
      <ResearchSection />
      <PartnersSection />
    </>
  )
}
