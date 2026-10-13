import Link from 'next/link'
import { EDITION, MIN_GROUP_SIZE, LAYERS, LAYER_BY_CODE } from '@/data/aehi/edition'
import { pageMetadata } from '@/data/aehi/site'
import { formatCount, getAssessedCount, getEditionForDisplay } from '@/data/aehi/live'
import { Eyebrow } from '@/components/aehi/ui/Typography'
import { TextLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { AssessedStatusLine } from '@/components/aehi/ui/AssessedCount'
import { CompositeRange, LayerMeans, NLine, SourceLine, fmtLayer, fmtScore } from '@/components/aehi/published/Figures'

export const revalidate = 600

export const metadata = pageMetadata({
  title: 'Data',
  description:
    'The AEHI data explorer opens with the inaugural Q4 2026 edition. See what will be published and how small groups are protected.',
  path: '/aehi/data',
})

const PREVIEW_BOXES = [
  { text: 'ESRE OS Performance Score: median and spread, with sample size' },
  { text: 'Five layer scores: median for L1 to L5' },
  { text: 'Primary constraint: how often each layer limits performance' },
  { text: `By sector, revenue band and location, where a group has at least ${MIN_GROUP_SIZE} enterprises` },
]

export default async function DataPage({ searchParams }: { searchParams?: { by?: string } }) {
  const edition = await getEditionForDisplay()

  if (edition && edition.overall) {
    const g = edition.overall
    const by = searchParams?.by === 'sector' ? 'sector' : 'all'
    return (
      <section aria-labelledby="page-title" className="bg-aehi-bg pb-16 pt-10 lg:pb-28 lg:pt-14">
        <div className="container-x">
          <Eyebrow>Data</Eyebrow>
          <h1 id="page-title" className="t-h1 mt-5">
            AEHI data: {edition.label} edition.
          </h1>
          <p className="t-lead mt-6">
            Aggregate results from {formatCount(g.n)} Nigerian mid-market enterprises. Groups with fewer than {edition.minGroupSize}{' '}
            enterprises are merged or not reported.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-aehi-line py-4">
            <p className="t-label text-aehi-text-subtle">
              Edition <span className="ml-2 text-aehi-text">{edition.label}</span>
            </p>
            <div className="flex items-center gap-3">
              <span className="t-label text-aehi-text-subtle" id="group-by">
                Group by
              </span>
              <ul aria-labelledby="group-by" className="inline-flex rounded-md border border-aehi-line-strong p-px">
                {(
                  [
                    ['all', 'All', '/aehi/data'],
                    ['sector', 'Sector', '/aehi/data?by=sector'],
                  ] as const
                ).map(([key, label, href]) => (
                  <li key={key}>
                    <Link
                      href={href}
                      scroll={false}
                      aria-current={by === key ? 'true' : undefined}
                      className={`inline-flex min-h-[42px] items-center rounded-[5px] px-4 text-[15px] font-medium ${
                        by === key ? 'bg-aehi-surface-2 text-aehi-text' : 'text-aehi-text-muted hover:text-aehi-text'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {by === 'all' ? (
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="panel lg:col-span-4">
                <h2 className="t-label text-aehi-text-subtle">Median ESRE OS Performance Score</h2>
                <p className="t-data mt-3 text-[44px] leading-none text-aehi-text lg:text-[56px]">{fmtScore(g.composite.median)}</p>
                <CompositeRange group={g} />
                <NLine n={g.n} className="mt-3" />
              </div>
              <div className="panel lg:col-span-8">
                <h2 className="t-label text-aehi-text-subtle">Mean layer scores</h2>
                <div className="mt-4">
                  <LayerMeans group={g} flagL2 />
                </div>
                <p className="t-small mt-4 text-aehi-text-muted">
                  Weakest layer overall: {g.weakestLayer} {LAYER_BY_CODE[g.weakestLayer].name}.
                </p>
                <NLine n={g.n} className="mt-2" />
              </div>
            </div>
          ) : (
            <div className="panel mt-10 !p-0">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-labelledby="sector-table-caption">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <caption id="sector-table-caption" className="t-label p-4 text-left text-aehi-text-subtle">
                    Results by sector, {edition.label}
                  </caption>
                  <thead>
                    <tr className="border-b border-aehi-line-strong">
                      <th scope="col" className="t-label sticky left-0 bg-aehi-surface px-4 py-3 font-medium text-aehi-text-subtle">
                        Group
                      </th>
                      <th scope="col" className="t-label px-3 py-3 text-right font-medium text-aehi-text-subtle">
                        n
                      </th>
                      <th scope="col" className="t-label px-3 py-3 text-right font-medium text-aehi-text-subtle">
                        OS score (median)
                      </th>
                      {LAYERS.map((l) => (
                        <th key={l.code} scope="col" className="t-label px-3 py-3 text-right font-medium text-aehi-text-subtle">
                          {l.code} (mean)
                        </th>
                      ))}
                      <th scope="col" className="t-label px-4 py-3 font-medium text-aehi-text-subtle">
                        Weakest layer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="t-data text-sm">
                    {edition.sectors.map((s) => (
                      <tr key={s.key} className="border-b border-aehi-line">
                        <th scope="row" className="sticky left-0 bg-aehi-surface px-4 py-3 font-sans font-medium text-aehi-text">
                          {s.key}
                        </th>
                        <td className="px-3 py-3 text-right text-aehi-text-muted">{formatCount(s.n)}</td>
                        <td className="px-3 py-3 text-right text-aehi-text">{fmtScore(s.composite.median)}</td>
                        {LAYERS.map((l) => (
                          <td key={l.code} className={`px-3 py-3 text-right ${l.code === 'L2' ? 'text-aehi-accent' : 'text-aehi-text'}`}>
                            {fmtLayer(s.layers[l.code])}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-aehi-text-muted">{s.weakestLayer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {edition.sectors.length === 0 && (
                <p className="t-body p-4">
                  No group in this view has {edition.minGroupSize} or more enterprises, so nothing can be shown. Try &apos;All&apos;
                  or a different grouping.
                </p>
              )}
              <p className="t-small border-t border-aehi-line p-4 text-aehi-text-subtle">
                Sectors with fewer than {edition.minGroupSize} enterprises are not listed.
              </p>
            </div>
          )}

          <SourceLine edition={edition} className="mt-6" />
          <p className="t-small mt-2 text-aehi-text-muted">
            How these figures are calculated:{' '}
            <Link href="/aehi/methodology" className="link-inline">
              methodology
            </Link>
            .
          </p>
        </div>
      </section>
    )
  }

  const count = await getAssessedCount()
  return (
    <section aria-labelledby="page-title" className="bg-aehi-bg pb-16 pt-10 lg:pb-28 lg:pt-14">
      <div className="container-x">
        <div className="max-w-[760px]">
          <Eyebrow>Data</Eyebrow>
          <h1 id="page-title" className="t-h1 mt-5">
            No data has been published yet.
          </h1>
          <p className="t-lead mt-6">
            The data explorer opens with the inaugural edition ({EDITION.label}). Until then this page shows what will be published,
            not results. We do not show estimates or sample figures.
          </p>
          <AssessedStatusLine count={count} className="mt-6" />
        </div>

        <h2 className="t-h2-sm mt-14">What the explorer will show</h2>
        <div className="relative mt-6 rounded-lg border border-dashed border-aehi-line-strong p-4 pt-14 sm:p-6 sm:pt-16">
          <span className="chip absolute left-4 top-4 sm:left-6 sm:top-6">Preview of layout · No data</span>
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {PREVIEW_BOXES.map((b) => (
              <li
                key={b.text}
                className="t-small flex min-h-[120px] items-center rounded-md border border-dashed border-aehi-line-strong p-5 text-aehi-text-subtle"
              >
                {b.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="t-body mt-6 max-w-prose">
          Every figure will show how many enterprises it is based on. Groups with fewer than {MIN_GROUP_SIZE} enterprises are merged or
          not reported.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <DiagnosticLink location="data" fullWidthOnMobile />
          <TextLink href="/aehi/report#notify">Get notified when the data is published</TextLink>
        </div>
      </div>
    </section>
  )
}
