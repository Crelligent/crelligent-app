import { ArrowDownToLine } from 'lucide-react'
import { EDITION } from '@/data/aehi/edition'
import { SITE_URL } from '@/data/aehi/site'
import { formatDate, getEditionForDisplay } from '@/data/aehi/live'
import { Chip, Eyebrow } from '@/components/aehi/ui/Typography'
import { TextLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { NotifyForm } from '@/components/aehi/forms/NotifyForm'
import { SourceLine } from '@/components/aehi/published/Figures'

export async function ReportSection() {
  const edition = await getEditionForDisplay()

  if (edition) {
    const year = new Date(edition.publishedAt).getFullYear()
    return (
      <section id="report" aria-labelledby="report-title" className="scroll-mt-20 border-t border-aehi-line bg-aehi-bg pb-16 pt-16 lg:pb-28 lg:pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Report',
              name: `African Enterprise Health Index, ${edition.label} edition`,
              datePublished: edition.publishedAt,
              url: `${SITE_URL}/aehi#report`,
              publisher: { '@type': 'Organization', name: 'Crelligent & Company', url: 'https://crelligent.com' },
            }),
          }}
        />
        <div className="container-x">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-6">
              <Eyebrow>{edition.label} edition</Eyebrow>
              <h2 id="report-title" className="t-h1 mt-5">
                AEHI {edition.label} edition.
              </h2>
              <Chip className="mt-5">Published {formatDate(edition.publishedAt)}</Chip>
              {edition.summary && <p className="t-lead mt-6">{edition.summary}</p>}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                {edition.reportUrl && (
                  <a href={edition.reportUrl} className="btn btn-primary w-full sm:w-auto">
                    <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                    Download the report (PDF)
                  </a>
                )}
                <TextLink href="/aehi/data">Explore the data</TextLink>
              </div>
              <h2 className="t-label mt-12 text-aehi-text-subtle">How to cite</h2>
              <pre className="mt-3 whitespace-pre-wrap break-words rounded-md border border-aehi-line bg-aehi-bg-deep p-4 font-mono text-sm text-aehi-text">
                Crelligent &amp; Company ({year}). African Enterprise Health Index, {edition.label} edition. Lagos: Crelligent &amp;
                Company. crelligent.com/aehi#report
              </pre>
              <SourceLine edition={edition} className="mt-6" />
            </div>
            <div id="notify" className="lg:col-span-5 lg:col-start-8">
              <NotifyForm
                title="Get the next edition"
                intro="One email each time a new edition is published."
                successText="We'll email {email} when the next edition publishes."
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="report" aria-labelledby="report-title" className="scroll-mt-20 border-t border-aehi-line bg-aehi-bg pb-16 pt-16 lg:pb-28 lg:pt-24">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Eyebrow>Inaugural report · {EDITION.label}</Eyebrow>
            <h2 id="report-title" className="t-h1 mt-5">
              The first AEHI report is being prepared.
            </h2>
            <Chip className="mt-5">In preparation</Chip>
            <p className="t-lead mt-6">
              The inaugural edition will benchmark how Nigerian mid-market enterprises are run, across the five OS layers. It will be
              free to read.
            </p>

            <h2 className="t-h3 mt-12">What it will set out</h2>
            <ol className="mt-4">
              {[
                'Where enterprises are most often constrained, layer by layer.',
                'How scores differ by sector, size and location, where each group is large enough to report.',
                'Which of our three hypotheses the data supports, and which it does not.',
                'The full method and sample, so readers can judge the evidence.',
              ].map((item, i) => (
                <li key={item} className="t-body flex gap-4 border-t border-aehi-line py-4">
                  <span className="t-data flex-none text-sm text-aehi-text-subtle">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <h2 className="t-h3 mt-10">What it will not contain</h2>
            <p className="t-body mt-3">Any individual enterprise&apos;s name, answers or score.</p>

            <p className="t-small mt-10 text-aehi-text-subtle">
              Want your enterprise to be in it?{' '}
              <DiagnosticLink location="report" variant="inline">
                Take the diagnostic
              </DiagnosticLink>
              .
            </p>
          </div>
          <div id="notify" className="lg:col-span-5 lg:col-start-8">
            <NotifyForm />
          </div>
        </div>
      </div>
    </section>
  )
}
