import type { Metadata } from 'next'
import { Clock, Lock, Users } from 'lucide-react'
import {
  ELIGIBILITY_TEXT,
  INDEX_FORMULA,
  INDEX_NAME,
  MIN_SUBGROUP_SAMPLE,
  MIN_WAVE_SAMPLE,
  SURVEY_MINUTES,
  WAVE,
} from '@/data/aehi/barometer'
import { pageMetadata } from '@/data/aehi/site'
import { getPublishedBarometer } from '@/lib/aehi/barometer-store'
import { Band, Chip, Eyebrow } from '@/components/aehi/ui/Typography'
import { TextLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { BarometerSurvey } from '@/components/aehi/barometer/BarometerSurvey'
import { BarometerResults } from '@/components/aehi/barometer/BarometerResults'

export const revalidate = 600

export const metadata: Metadata = pageMetadata({
  title: 'Executive Barometer',
  description: `A ${SURVEY_MINUTES}-minute survey of senior leaders in Nigeria's mid-market: confidence in their operating model, the year ahead, what holds them back and whom they trust. ${WAVE.label} is open.`,
  path: '/aehi/barometer',
})

const BLOCKS = [
  { n: '01', title: 'Your operating model', body: 'How confident you are in each of the five ESRE OS layers, from business design to governance.' },
  { n: '02', title: 'The year ahead', body: 'What you expect for revenue, staff, technology spending and business conditions.' },
  { n: '03', title: 'What holds you back', body: 'Your top three constraints, outside the business and inside it.' },
  { n: '04', title: 'Trust', body: 'How far you trust banks, government, suppliers, customers and your own figures.' },
]

export default async function BarometerPage() {
  const results = await getPublishedBarometer()
  const fielding = WAVE.status === 'fielding'

  return (
    <>
      <section aria-labelledby="page-title" className="bg-aehi-bg pb-12 pt-10 lg:pb-16 lg:pt-14">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <Eyebrow>Executive Barometer · {WAVE.label}</Eyebrow>
              <h1 id="page-title" className="t-h1 mt-5">
                How confident are the people who run Nigeria&apos;s mid-market?
              </h1>
              <Chip variant={fielding ? 'live' : 'neutral'} className="mt-5">
                {fielding ? `Open now · closes ${WAVE.closesShort}` : results ? 'Results published' : 'Fieldwork closed · results in preparation'}
              </Chip>
              <p className="t-lead mt-6">
                A {SURVEY_MINUTES}-minute survey for founders, CEOs and senior executives. It asks what leaders believe about their own
                enterprise and the year ahead. You get your own {INDEX_NAME} as soon as you finish.
              </p>
              {fielding && (
                <div className="mt-8">
                  <a href="#survey" className="btn btn-primary w-full sm:w-auto">
                    Answer the survey
                  </a>
                </div>
              )}
            </div>
            <ul className="space-y-5 self-end lg:col-span-4 lg:col-start-9" aria-label="About the survey">
              {[
                { Icon: Clock, title: `About ${SURVEY_MINUTES} minutes`, body: '20 multiple-choice questions. No free text.' },
                { Icon: Lock, title: 'Anonymous unless you add an email', body: 'Answers are published only as totals, never by name.' },
                { Icon: Users, title: 'For senior leaders', body: 'Founders, CEOs, managing directors, C-suite and directors.' },
              ].map(({ Icon, title, body }) => (
                <li key={title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 flex-none text-aehi-accent" aria-hidden="true" />
                  <span className="t-small text-aehi-text-muted">
                    <span className="block font-medium text-aehi-text">{title}</span>
                    {body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {results && (
        <Band tone="deep" id="results" labelledBy="results-title">
          <Eyebrow>{WAVE.label} results</Eyebrow>
          <h2 id="results-title" className="t-h2 mt-4">
            What senior leaders told us.
          </h2>
          <div className="mt-10 lg:mt-14">
            <BarometerResults r={results} />
          </div>
        </Band>
      )}

      {fielding && (
        <Band tone="deep" id="survey" labelledBy="survey-title" className="scroll-mt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <Eyebrow>The survey</Eyebrow>
              <h2 id="survey-title" className="t-h2 mt-4">
                Four short sections.
              </h2>
              <ol className="mt-8">
                {BLOCKS.map((b) => (
                  <li key={b.n} className="flex gap-4 border-t border-aehi-line py-4">
                    <span className="t-data flex-none text-sm text-aehi-text-subtle">{b.n}</span>
                    <span>
                      <span className="t-body block font-medium text-aehi-text">{b.title}</span>
                      <span className="t-small text-aehi-text-muted">{b.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="min-w-0 lg:col-span-7 lg:col-start-6">
              <BarometerSurvey />
            </div>
          </div>
        </Band>
      )}

      <Band tone="bg" id="method" labelledBy="method-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Eyebrow>Method</Eyebrow>
            <h2 id="method-title" className="t-h2 mt-4">
              What leaders believe, measured separately from what the diagnostic finds.
            </h2>
            <p className="t-lead mt-4">
              The AEHI scores enterprises on evidence, through the diagnostic. The Barometer asks for judgement. We publish them side by
              side and never mix them, so the gap between the two can be seen.
            </p>
            <div className="mt-8">
              <DiagnosticLink location="barometer-method" variant="secondary" fullWidthOnMobile>
                Take the diagnostic instead
              </DiagnosticLink>
            </div>
          </div>
          <dl className="lg:col-span-6 lg:col-start-7">
            {[
              { t: `The ${INDEX_NAME}`, d: `${INDEX_FORMULA}. Trust and constraints are reported on their own and are not in the index.` },
              { t: 'Who counts', d: ELIGIBILITY_TEXT },
              {
                t: 'When we publish',
                d: `After fieldwork closes, and only if at least ${MIN_WAVE_SAMPLE} eligible leaders have answered. Sector figures need at least ${MIN_SUBGROUP_SAMPLE} responses each; smaller groups are not shown.`,
              },
              {
                t: 'Limits',
                d: 'The sample is self-selected and reached online and through partner networks, so it leans towards larger, better-connected and urban enterprises. Every result is published with its sample size and fieldwork dates.',
              },
              {
                t: 'Privacy',
                d: 'Answers are stored securely and are never published individually. An email, if you give one, is used only for what you ticked and is never shared.',
              },
            ].map((row) => (
              <div key={row.t} className="border-t border-aehi-line py-5">
                <dt className="t-body font-medium text-aehi-text">{row.t}</dt>
                <dd className="t-small mt-1.5 text-aehi-text-muted">{row.d}</dd>
              </div>
            ))}
            <div className="border-t border-aehi-line pt-6">
              <TextLink href="/aehi/methodology">Read the AEHI methodology</TextLink>
            </div>
          </dl>
        </div>
      </Band>
    </>
  )
}
