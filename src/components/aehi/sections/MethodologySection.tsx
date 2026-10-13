import { ShieldCheck } from 'lucide-react'
import { EDITION, DIAGNOSTIC_MINUTES, LAYERS, MIN_GROUP_SIZE } from '@/data/aehi/edition'
import { Band, Chip, Eyebrow } from '@/components/aehi/ui/Typography'
import { TextLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { WeightStrip } from '@/components/aehi/model/WeightStrip'
import { TocDesktop, TocMobile, type TocItem } from '@/components/aehi/methodology/Toc'

const TOC: TocItem[] = [
  { id: 'layers', n: '01', label: 'What the index measures' },
  { id: 'scoring', n: '02', label: 'How a score is calculated' },
  { id: 'scope', n: '03', label: 'Who is included' },
  { id: 'collection', n: '04', label: 'How data is collected' },
  { id: 'anonymisation', n: '05', label: 'Anonymisation and minimum group size' },
  { id: 'publication', n: '06', label: 'What each edition publishes' },
  { id: 'limitations', n: '07', label: 'Limitations' },
  { id: 'changes', n: '08', label: 'Change log' },
]

function Section({ item, children, first = false }: { item: TocItem; children: React.ReactNode; first?: boolean }) {
  return (
    <section id={item.id} aria-labelledby={`${item.id}-title`} className={first ? '' : 'mt-16 border-t border-aehi-line pt-16 lg:mt-20 lg:pt-20'}>
      <p className="t-label flex items-center gap-2 text-aehi-text-subtle">
        <span className="t-data">{item.n}</span>
        <span aria-hidden="true" className="h-px w-4 flex-none bg-aehi-accent" />
        {item.label}
      </p>
      <h2 id={`${item.id}-title`} className="t-h2 mt-4">
        {item.label}
      </h2>
      <div className="prose-aehi t-body mt-6">{children}</div>
    </section>
  )
}

function Bullets({ items, ordered = false }: { items: React.ReactNode[]; ordered?: boolean }) {
  const List = ordered ? 'ol' : 'ul'
  return (
    <List className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className={`flex-none ${ordered ? 't-data w-5 text-aehi-text-subtle' : 'mt-[11px] h-1 w-1 rounded-full bg-aehi-text-subtle'}`}>
            {ordered ? `${i + 1}.` : ''}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </List>
  )
}

export function MethodologySection() {
  return (
    <>
      <section id="methodology" aria-labelledby="methodology-title" className="scroll-mt-20 border-t border-aehi-line bg-aehi-bg pb-4 pt-16 lg:pb-0 lg:pt-24">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-8 lg:col-start-4">
              <Eyebrow>Methodology · Version {EDITION.methodVersion}</Eyebrow>
              <h2 id="methodology-title" className="t-h1 mt-5">
                How the index is built.
              </h2>
              <p className="t-lead mt-6">
                This section sets out how the African Enterprise Health Index measures enterprises, who is included, how scores are
                calculated and how individual results are protected. It applies to the inaugural edition (Q4 2026). Any change to the
                method will be published here, with each edition.
              </p>
              <p className="t-small mt-4 text-aehi-text-subtle">
                Version {EDITION.methodVersion} · Published {EDITION.methodPublished} · Questions:{' '}
                <a href={`mailto:${EDITION.contactEmail}`} className="link-inline">
                  {EDITION.contactEmail}
                </a>
              </p>
              <div className="mt-8 lg:hidden">
                <TocMobile items={TOC} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-aehi-bg pb-16 pt-12 lg:pb-28 lg:pt-16">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
            <div className="hidden lg:col-span-3 lg:block">
              <TocDesktop items={TOC} />
            </div>
            <div className="min-w-0 lg:col-span-8">
              <Section item={TOC[0]} first>
                <p>
                  The index scores each enterprise on the five layers of Crelligent&apos;s ESRE OS, a model of an enterprise as an
                  operating system. Each layer depends on the ones below it.
                </p>
              </Section>
              <p className="t-small mt-6 text-aehi-text-subtle">
                The five layers are shown in the <a href="#model" className="link-inline">model above</a>.
              </p>

              {/* Layer table: table on desktop, definition blocks on mobile */}
              <table className="mt-12 hidden w-full border-collapse text-left sm:table">
                <caption className="sr-only">The five OS layers, what each covers and its weight in the score</caption>
                <thead>
                  <tr className="border-b border-aehi-line-strong">
                    <th scope="col" className="t-label py-3 pr-4 font-medium text-aehi-text-subtle">
                      Layer
                    </th>
                    <th scope="col" className="t-label py-3 pr-4 font-medium text-aehi-text-subtle">
                      What it covers
                    </th>
                    <th scope="col" className="t-label py-3 text-right font-medium text-aehi-text-subtle">
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {LAYERS.map((l) => (
                    <tr key={l.code} className="border-b border-aehi-line align-top">
                      <th scope="row" className={`py-4 pr-4 font-normal ${l.code === 'L2' ? 'border-l-[3px] border-l-aehi-accent pl-3' : ''}`}>
                        <span className={`t-data mr-2 text-sm ${l.code === 'L2' ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{l.code}</span>
                        <span className="font-medium text-aehi-text">{l.name}</span>
                        {l.code === 'L2' && (
                          <span className="mt-2 block">
                            <Chip variant="weight">Highest weight</Chip>
                          </span>
                        )}
                      </th>
                      <td className="t-body py-4 pr-4">{l.covers}</td>
                      <td className="t-data whitespace-nowrap py-4 text-right text-sm text-aehi-text">
                        {l.weightLabel}
                        {l.code === 'L2' ? ' (highest)' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className="mt-12 sm:hidden">
                {LAYERS.map((l) => (
                  <div key={l.code} className={`border-t border-aehi-line py-4 ${l.code === 'L2' ? 'border-l-[3px] border-l-aehi-accent pl-3' : ''}`}>
                    <dt className="flex flex-wrap items-center gap-2">
                      <span className={`t-data text-sm ${l.code === 'L2' ? 'text-aehi-accent' : 'text-aehi-text-subtle'}`}>{l.code}</span>
                      <span className="font-medium text-aehi-text">{l.name}</span>
                      <span className="t-data text-sm text-aehi-text-muted">· {l.weightLabel}</span>
                      {l.code === 'L2' && <Chip variant="weight">Highest weight</Chip>}
                    </dt>
                    <dd className="t-body mt-2">{l.covers}</dd>
                  </div>
                ))}
              </dl>

              <Section item={TOC[1]}>
                <p>
                  Each layer is scored from 0 to 10, from the answers to the diagnostic. The five layer scores are combined into one
                  ESRE OS Performance Score from 0 to 100, using these weights:
                </p>
                <WeightStrip className="!mt-8 !mb-8" />
                <p>
                  The Operating Model (L2) carries the highest weight because the other layers depend on it: technology automates it,
                  data records it and governance controls it. Governance (L5) carries the lowest, because controls cannot make up for
                  weak layers underneath them.
                </p>
                <p>
                  In Crelligent&apos;s diagnostic work, L2 is the layer that most often holds enterprises back. That is a hypothesis.
                  The inaugural edition will test it, and the weights will be reviewed against the data.
                </p>
                <p>
                  Score bands (for example healthy, at risk, critical) are not fixed in advance. They will be set from the data once
                  the inaugural sample is complete, and published with the edition.
                </p>
                <h3 className="t-h3 !mt-10">Primary constraint</h3>
                {/* OWNER CONFIRM: the L2 < 6 rule as the public definition */}
                <p>
                  For each enterprise, the primary constraint is the layer that most limits its performance. Where L2 scores below 6
                  out of 10, it is flagged as the primary constraint.
                </p>
              </Section>

              <Section item={TOC[2]}>
                <p>
                  The index covers Nigerian mid-market enterprises. For the inaugural edition, that means private enterprises operating
                  in Nigeria with:
                </p>
                {/* OWNER CONFIRM: both thresholds (20+ staff, revenue above ₦500,000,000), as on the current site */}
                <Bullets items={['20 or more full-time staff, and', 'annual revenue above ₦500,000,000.']} />
                <p>
                  Any enterprise can take the diagnostic and receive its own score. Enterprises outside this range are not included in
                  the mid-market results; each edition states how many responses were excluded and why.
                </p>
                <p>
                  The diagnostic is designed to be completed by a CEO, founder or senior executive who can answer for the whole
                  business.
                </p>
              </Section>

              <Section item={TOC[3]}>
                <p>Data comes from two sources:</p>
                <Bullets
                  ordered
                  items={[
                    <>
                      The ESRE OS diagnostic at{' '}
                      <DiagnosticLink location="methodology-collection" variant="inline">
                        crelligent.com/diagnostic
                      </DiagnosticLink>
                      , completed by senior leaders of participating enterprises.
                    </>,
                    'Anonymised results from Crelligent client diagnostics, where the client has agreed to be included.',
                  ]}
                />
                <p>
                  Participation is voluntary, so the sample is self-selected rather than random. Each edition reports the final sample
                  size and its make-up (by sector, size and location), so readers can judge how far the results can be generalised.
                </p>
              </Section>

              <Section item={TOC[4]}>
                <ul className="!mt-10 space-y-4">
                  {[
                    'Company names, people’s names and contact details are removed before any analysis for publication.',
                    'Results are published only as aggregates: for example by sector, revenue band or location.',
                    `No published group contains fewer than ${MIN_GROUP_SIZE} enterprises. Where a group is smaller, it is merged into a broader one.`,
                    // OWNER CONFIRM: the last rule matches the diagnostic's privacy terms
                    'Individual answers and scores are never published, and never shared with other participants, partners or investors.',
                  ].map((rule) => (
                    <li key={rule} className="flex gap-3">
                      <ShieldCheck className="mt-1 h-4 w-4 flex-none text-aehi-accent" aria-hidden="true" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section item={TOC[5]}>
                <Bullets
                  items={[
                    'The sample size and how it breaks down by sector, size and location.',
                    'Median and spread of the ESRE OS Performance Score, and of each layer score.',
                    'How often each layer is the primary constraint.',
                    `Breakdowns by sector, revenue band and location, wherever each group has at least ${MIN_GROUP_SIZE} enterprises.`,
                    'The method, its limitations, and any changes since the last edition.',
                  ]}
                />
                <p>Editions are published quarterly. The inaugural edition covers Q4 2026.</p>
              </Section>

              <Section item={TOC[6]}>
                <Bullets
                  items={[
                    'The diagnostic is self-reported. Leaders may see their business more or less favourably than an outside reviewer would.',
                    'The sample is self-selected. Results describe the enterprises that took part, not every Nigerian enterprise.',
                    'Small groups are merged or not reported, so some sectors may not appear separately in early editions.',
                    'The weights reflect Crelligent’s model of how enterprises work. The inaugural data will be used to test them.',
                  ]}
                />
              </Section>

              <Section item={TOC[7]}>
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">Method change log</caption>
                  <thead>
                    <tr className="border-b border-aehi-line-strong">
                      <th scope="col" className="t-label py-3 pr-4 font-medium text-aehi-text-subtle">
                        Version
                      </th>
                      <th scope="col" className="t-label py-3 pr-4 font-medium text-aehi-text-subtle">
                        Date
                      </th>
                      <th scope="col" className="t-label py-3 font-medium text-aehi-text-subtle">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-aehi-line align-top">
                      <td className="t-data py-4 pr-4 text-sm text-aehi-text">1.0</td>
                      <td className="py-4 pr-4">October 2026</td>
                      <td className="py-4">First published method, for the inaugural edition.</td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            </div>
          </div>
        </div>
      </div>

      <Band tone="deep" labelledBy="end-title">
        <h2 id="end-title" className="t-h2">
          See how your enterprise scores.
        </h2>
        {/* OWNER CONFIRM: "about 10 minutes" */}
        <p className="t-body mt-4">The diagnostic takes about {DIAGNOSTIC_MINUTES} minutes and is free.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <DiagnosticLink location="methodology-end" fullWidthOnMobile />
          <TextLink href="/aehi#partners">Partner with the index</TextLink>
        </div>
      </Band>
    </>
  )
}
