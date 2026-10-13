import Link from 'next/link'
import { DIAGNOSTIC_MINUTES, EDITION, MIN_GROUP_SIZE } from '@/data/aehi/edition'
import { pageMetadata } from '@/data/aehi/site'
import { getAssessedCount } from '@/data/aehi/live'
import { Band, Eyebrow } from '@/components/aehi/ui/Typography'
import { TextLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { AssessedStatusLine } from '@/components/aehi/ui/AssessedCount'
import { IndexFlow } from '@/components/aehi/model/IndexFlow'

export const revalidate = 600

export const metadata = pageMetadata({
  title: 'Take part',
  // OWNER CONFIRM: "10-minute" diagnostic length
  description:
    'Take the free 10-minute ESRE OS diagnostic, see your enterprise’s score straight away, and help build the first edition of the AEHI.',
  path: '/aehi/contribute',
})

function RuledList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4">
      {items.map((it, i) => (
        <li key={i} className="t-body flex gap-4 border-t border-aehi-line py-5">
          <span className="t-data flex-none text-sm text-aehi-text-subtle">{String(i + 1).padStart(2, '0')}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Who should complete the diagnostic?',
    a: 'Someone who can answer for the whole business: the CEO, founder, managing director or another senior executive. One response per enterprise.',
  },
  {
    // OWNER CONFIRM against diagnostic terms
    q: 'Will my company be named?',
    a: `No. The index publishes only group results, and no group has fewer than ${MIN_GROUP_SIZE} enterprises. Your individual score is shown only to you.`,
  },
  {
    q: 'Is it really free?',
    a: 'Yes. The diagnostic and your score are free. Crelligent offers paid work to enterprises that want help on what the diagnostic finds, but taking part does not commit you to anything.',
  },
  {
    q: 'We are not in Lagos. Can we take part?',
    a: 'Yes. The index covers mid-market enterprises across Nigeria.',
  },
  {
    q: 'We are smaller than the mid-market definition. Should we still take it?',
    a: (
      <>
        Yes, you will still get your score. Your answers will not be included in the mid-market results; the{' '}
        <Link href="/aehi/methodology#scope" className="link-inline">
          methodology
        </Link>{' '}
        explains the definition.
      </>
    ),
  },
  {
    // OWNER CONFIRM
    q: 'Can I have my data removed?',
    a: `Yes. Email ${EDITION.contactEmail} from the address you used and we will delete your responses. Results already published in aggregate cannot be changed, but they never identify you.`,
  },
]

export default async function ContributePage() {
  const count = await getAssessedCount()
  return (
    <>
      <section aria-labelledby="page-title" className="bg-aehi-bg pb-16 pt-10 lg:pb-24 lg:pt-14">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <Eyebrow>Take part</Eyebrow>
              <h1 id="page-title" className="t-h1 mt-5">
                Get your enterprise&apos;s score, and help build the index.
              </h1>
              <p className="t-lead mt-6">
                The AEHI is built from the anonymised answers of the enterprises that take part. Take the diagnostic and you see your
                own ESRE OS Performance Score straight away. Your answers, without your name, become part of the inaugural edition.
              </p>
              <div className="mt-8">
                <DiagnosticLink location="contribute-hero" fullWidthOnMobile />
                <p className="t-small mt-3 text-aehi-text-subtle">Runs on crelligent.com. Designed for CEOs, founders and senior executives.</p>
              </div>
              <AssessedStatusLine count={count} className="mt-6" />
            </div>
            <aside aria-labelledby="what-it-takes" className="lg:col-span-4 lg:col-start-9">
              <div className="panel">
                <h2 id="what-it-takes" className="t-label text-aehi-text-muted">
                  What it takes
                </h2>
                <dl className="mt-4">
                  {[
                    // OWNER CONFIRM: "About 10 minutes"
                    ['Time', `About ${DIAGNOSTIC_MINUTES} minutes`],
                    ['Cost', 'Free'],
                    ['Who should answer', 'A CEO, founder or senior executive'],
                    ['What you get', 'Your ESRE OS Performance Score and five layer scores, straight away'],
                    ['What is published', 'Only group results. Never your name or your answers.'],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-aehi-line py-3">
                      <dt className="t-label text-aehi-text-subtle">{k}</dt>
                      <dd className="mt-1 text-[15px] font-medium text-aehi-text">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Band tone="deep" labelledBy="exchange-title">
        <h2 id="exchange-title" className="t-h2">
          A fair exchange.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          <div>
            <h3 className="t-h3">What you get</h3>
            <RuledList
              items={[
                'Your ESRE OS Performance Score out of 100, and a score out of 10 for each of the five layers.',
                'Your primary constraint: the layer most likely to be holding the business back.',
                // OWNER CONFIRM: participants receive the report
                'The inaugural report when it publishes, so you can see how the mid-market compares.',
              ]}
            />
          </div>
          <div>
            <h3 className="t-h3">What the index gets</h3>
            <RuledList
              items={[
                'Your answers, with your company’s name and contact details removed.',
                'One more enterprise in the inaugural sample, which makes every published breakdown more reliable.',
              ]}
            />
          </div>
        </div>
      </Band>

      <Band tone="bg" labelledBy="answers-title">
        <h2 id="answers-title" className="t-h2">
          What happens to your answers.
        </h2>
        <div className="mt-10 lg:mt-14">
          <IndexFlow compact />
        </div>
      </Band>

      <Band tone="deep" labelledBy="faq-title">
        <h2 id="faq-title" className="t-h2">
          Questions leaders ask before taking part.
        </h2>
        <ul className="mt-10 max-w-3xl lg:mt-14">
          {FAQ.map((item) => (
            <li key={item.q} className="border-t border-aehi-line py-6">
              <h3 className="font-aehi-head text-xl font-medium leading-7 text-aehi-text">{item.q}</h3>
              <p className="t-body mt-2 max-w-prose">{item.a}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="bg" labelledBy="ready-title">
        <h2 id="ready-title" className="t-h2">
          Ready when you are.
        </h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <DiagnosticLink location="contribute-end" fullWidthOnMobile />
          <TextLink href="/aehi/methodology">Read the methodology first</TextLink>
        </div>
      </Band>
    </>
  )
}
