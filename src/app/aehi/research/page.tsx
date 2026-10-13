import type { Metadata } from 'next'
import { ArrowUpRight, FileText } from 'lucide-react'
import {
  BIGGEST_OBSTACLE,
  FAMILY_BUSINESS_GOVERNANCE,
  FAMILY_BUSINESS_STRATEGY,
  INFRA_FINANCE,
  MANAGEMENT_INDEX,
  MANAGEMENT_PRACTICES,
  MEDIUM_FIRM_OBSTACLES,
  MSME_CONTRIBUTION,
  MSME_TOP_CHALLENGES,
} from '@/data/aehi/evidence'
import { aehiResearch } from '@/data/aehi-research'
import { EDITION } from '@/data/aehi/edition'
import { WAVE } from '@/data/aehi/barometer'
import { pageMetadata } from '@/data/aehi/site'
import { Band, Chip, Eyebrow } from '@/components/aehi/ui/Typography'
import { TextLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { Cite, GrowthChart, HBarChart, SourcesList, StatTile } from '@/components/aehi/evidence/Charts'

export const metadata: Metadata = pageMetadata({
  title: 'Research',
  description:
    'What published data already says about how Nigerian enterprises are run, read through the five ESRE OS layers: World Bank 2025, PwC and SMEDAN figures, charts and research briefs.',
  path: '/aehi/research',
})

const TYPE = { whitepaper: 'Whitepaper', article: 'Research brief' } as const

export default function ResearchPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="bg-aehi-bg pb-12 pt-10 lg:pb-16 lg:pt-14">
        <div className="container-x">
          <div className="max-w-3xl">
            <Eyebrow>AEHI Research</Eyebrow>
            <h1 id="page-title" className="t-h1 mt-5">
              What the public data already says about how Nigerian firms are run.
            </h1>
            <p className="t-lead mt-6">
              Before the first AEHI edition publishes, here is the best published evidence, read through the five ESRE OS layers.
              Every figure on this page comes from a named source: the World Bank, PwC and SMEDAN. None of it is AEHI data.
            </p>
            <Chip className="mt-6">Third-party data · sources listed below</Chip>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              value={`${MSME_CONTRIBUTION.gdp}%`}
              label="of Nigeria's GDP from MSMEs"
              compare="Previous national MSME survey, as cited by SMEDAN"
              source={MSME_CONTRIBUTION.source}
            />
            <StatTile value="76%+" label="of employment in MSMEs" compare="Same survey" source={MSME_CONTRIBUTION.source} />
            <StatTile
              value={String(INFRA_FINANCE.outagesPerMonth.nigeria)}
              label="power outages in a typical month"
              compare={`Sub-Saharan Africa: ${INFRA_FINANCE.outagesPerMonth.ssa}`}
              source={INFRA_FINANCE.source}
            />
            <StatTile
              value={`${INFRA_FINANCE.investmentFinancedInternally.nigeria}%`}
              label="of investment financed from firms' own funds"
              compare={`By banks: ${INFRA_FINANCE.investmentFinancedByBanks.nigeria}%`}
              source={INFRA_FINANCE.source}
            />
          </div>
        </div>
      </section>

      {/* Environment */}
      <Band tone="deep" id="environment" labelledBy="env-title">
        <Eyebrow>The environment</Eyebrow>
        <h2 id="env-title" className="t-h2 mt-4 max-w-3xl">
          Firms name power and finance. Both sit outside the business.
        </h2>
        <p className="t-lead mt-4 max-w-3xl">
          Asked for their single biggest obstacle, Nigerian firms choose electricity more than twice as often as the regional
          average. For medium firms (20 to 99 staff), the top three are electricity ({MEDIUM_FIRM_OBSTACLES.medium[0].value}%),
          access to finance ({MEDIUM_FIRM_OBSTACLES.medium[1].value}%) and tax rates ({MEDIUM_FIRM_OBSTACLES.medium[2].value}%)
          <Cite n={MEDIUM_FIRM_OBSTACLES.source} />. These lists ask about the environment, so the way a business is run never
          appears on them.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HBarChart chart={BIGGEST_OBSTACLE} />
          <HBarChart chart={MSME_TOP_CHALLENGES} />
        </div>
      </Band>

      {/* L2 / L4 */}
      <Band tone="bg" id="operating-model" labelledBy="l2-title">
        <Eyebrow>L2 Operating Model · L4 Data &amp; Intelligence</Eyebrow>
        <h2 id="l2-title" className="t-h2 mt-4 max-w-3xl">
          Good at firefighting. Weaker at the routines that prevent fires.
        </h2>
        <p className="t-lead mt-4 max-w-3xl">
          The World Bank scores management practices for firms with 20 or more workers, close to the AEHI&apos;s mid-market.
          Nigeria&apos;s index is {MANAGEMENT_INDEX.nigeria} out of 100 (Sub-Saharan Africa {MANAGEMENT_INDEX.ssa.toFixed(1)})
          <Cite n={MANAGEMENT_INDEX.source} />, but the average hides a split: strong reactions to problems, low scores on
          measured, achievable targets and on acting on under-performance.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HBarChart chart={MANAGEMENT_PRACTICES} />
          </div>
          <div className="lg:col-span-5">
            <GrowthChart />
          </div>
        </div>
        <p className="t-small mt-6 max-w-3xl text-aehi-text-subtle">
          Mapping to ESRE OS layers is Crelligent&apos;s reading, not the World Bank&apos;s. It matches the first AEHI hypothesis,
          which the inaugural edition will test.
        </p>
      </Band>

      {/* L1 / L5 */}
      <Band tone="deep" id="governance" labelledBy="l5-title">
        <Eyebrow>L1 Business Design · L5 Governance</Eyebrow>
        <h2 id="l5-title" className="t-h2 mt-4 max-w-3xl">
          Decisions travel to the top because little is written down.
        </h2>
        <p className="t-lead mt-4 max-w-3xl">
          PwC&apos;s surveys of Nigerian family businesses, which include many founder-led mid-market firms, find them well
          behind global peers on governance policies, succession and written strategy.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HBarChart chart={FAMILY_BUSINESS_GOVERNANCE} />
          <HBarChart chart={FAMILY_BUSINESS_STRATEGY} />
        </div>
      </Band>

      {/* Research pieces */}
      <Band tone="bg" id="briefs" labelledBy="briefs-title">
        <Eyebrow>Whitepapers and briefs</Eyebrow>
        <h2 id="briefs-title" className="t-h2 mt-4">
          The analysis behind the charts.
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {aehiResearch.map((a) => (
            <li key={a.slug} className="flex">
              <a
                href={`/insights/${a.slug}`}
                className="panel group flex w-full flex-col transition-colors duration-150 hover:border-aehi-line-strong"
              >
                <span className="t-label text-aehi-text-subtle">
                  {TYPE[a.type]} · {a.readingMinutes} min
                </span>
                <span className="t-h3 mt-3 group-hover:text-aehi-accent">{a.title}</span>
                <span className="t-small mt-3 flex-1 text-aehi-text-muted">{a.excerpt}</span>
                <span className="t-small mt-6 font-medium text-aehi-accent">Read →</span>
              </a>
            </li>
          ))}
        </ul>
      </Band>

      {/* Reports */}
      <Band tone="deep" id="reports" labelledBy="reports-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Eyebrow>Reports</Eyebrow>
            <h2 id="reports-title" className="t-h2 mt-4">
              From public data to our own.
            </h2>
            <p className="t-lead mt-4">
              The public surveys measure the environment and general practices. The AEHI measures how each enterprise is run, layer by
              layer, and publishes only anonymised totals.
            </p>
            <div className="mt-8">
              <DiagnosticLink location="research-reports" fullWidthOnMobile />
            </div>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {[
              {
                title: `AEHI inaugural report, ${EDITION.label}`,
                status: 'In preparation',
                body: 'The first benchmark of how Nigerian mid-market enterprises are run, across the five ESRE OS layers.',
                href: '/aehi/report',
                cta: 'Get it when it publishes',
              },
              {
                title: `Executive Barometer, ${WAVE.label}`,
                status: WAVE.status === 'fielding' ? 'Open now' : 'Fieldwork closed',
                body: 'A five-minute survey of senior leaders: confidence, outlook, constraints and trust. Results publish when the wave closes.',
                href: '/aehi/barometer',
                cta: 'Answer the Barometer',
              },
              {
                title: 'AEHI data explorer',
                status: 'Opens with the first edition',
                body: 'Sector, size and layer breakdowns, shown only where each group is large enough to report.',
                href: '/aehi/data',
                cta: 'How the data will work',
              },
            ].map((r) => (
              <li key={r.title} className="border-t border-aehi-line py-6">
                <div className="flex flex-wrap items-center gap-3">
                  <FileText className="h-4 w-4 text-aehi-text-subtle" aria-hidden="true" />
                  <h3 className="t-h3">{r.title}</h3>
                  <Chip>{r.status}</Chip>
                </div>
                <p className="t-body mt-2">{r.body}</p>
                <TextLink href={r.href} className="mt-3">
                  {r.cta}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* Sources */}
      <Band tone="bg" id="sources" labelledBy="sources-title">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Eyebrow>Sources</Eyebrow>
            <h2 id="sources-title" className="t-h2-sm mt-4">
              Where every figure comes from.
            </h2>
            <p className="t-small mt-4 text-aehi-text-muted">
              Figures are copied from the sources as published. Comparisons with Sub-Saharan Africa or global averages are the
              sources&apos; own. The mapping to ESRE OS layers is Crelligent&apos;s.
            </p>
          </div>
          <div className="lg:col-span-8">
            <SourcesList />
            <p className="t-small mt-6 flex items-center gap-1.5 text-aehi-text-subtle">
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              Links open the original publications.
            </p>
          </div>
        </div>
      </Band>
    </>
  )
}
