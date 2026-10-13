import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink } from '@/components/aehi/ui/Links'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'
import { Eyebrow } from '@/components/aehi/ui/Typography'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const PAGES = [
  ['AEHI home', '/aehi'],
  ['Methodology', '/aehi/methodology'],
  ['Take part', '/aehi/contribute'],
  ['Inaugural report', '/aehi/report'],
  ['Data', '/aehi/data'],
  ['Partners', '/aehi/institutional'],
] as const

export default function NotFound() {
  return (
    <section aria-labelledby="page-title" className="bg-aehi-bg pb-24 pt-24 lg:pt-[120px]">
      <div className="mx-auto max-w-[560px] px-5 text-center">
        {/* A stack with a missing layer */}
        <div aria-hidden="true" className="mx-auto flex w-40 flex-col gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-3 rounded-[2px] ${i === 2 ? 'border border-dashed border-aehi-line-strong' : 'border border-aehi-line bg-aehi-surface-2'}`}
            />
          ))}
        </div>
        <Eyebrow className="mt-10 justify-center">Error 404</Eyebrow>
        <h1 id="page-title" className="t-h1 mt-5">
          This page is not part of the index.
        </h1>
        <p className="t-body mt-5">The link may be out of date, or the page may have moved. These are the pages that exist:</p>
        <ul className="mt-6 text-left">
          {PAGES.map(([label, href]) => (
            <li key={href} className="border-t border-aehi-line last:border-b">
              <Link href={href} className="flex min-h-[48px] items-center text-[15px] font-medium text-aehi-text hover:text-aehi-accent">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          <ButtonLink href="/aehi" variant="primary" fullWidthOnMobile>
            Go to the AEHI homepage
          </ButtonLink>
          <DiagnosticLink location="404" variant="tertiary" />
        </div>
      </div>
    </section>
  )
}
