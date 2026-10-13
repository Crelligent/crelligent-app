import Link from 'next/link'
import { NAV_LINKS } from '@/data/aehi/site'
import { EDITION } from '@/data/aehi/edition'
import { DiagnosticLink } from '@/components/aehi/ui/DiagnosticLink'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const linkCls = 'inline-flex min-h-[44px] items-center text-sm text-aehi-text-muted hover:text-aehi-text transition-colors duration-150'
  return (
    <footer className="border-t border-aehi-line bg-aehi-bg-deep pb-8 pt-16">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <p className="font-aehi-head text-xl font-semibold text-aehi-text">AEHI</p>
            <p className="t-small mt-3 max-w-[36ch] text-aehi-text-muted">
              African Enterprise Health Index. A quarterly benchmark of how Nigerian mid-market enterprises are run.
            </p>
            <p className="t-small mt-3 text-aehi-text-muted">Published by Crelligent &amp; Company Limited, Lagos.</p>
            <a href="https://crelligent.com" className="link-inline mt-1 inline-flex min-h-[44px] items-center text-sm">
              crelligent.com
            </a>
          </div>
          <nav aria-label="The index" className="lg:col-span-3">
            <p className="t-label text-aehi-text-subtle">The index</p>
            <ul className="mt-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="t-label text-aehi-text-subtle">Contact</p>
            <ul className="mt-2">
              <li>
                <a href={`mailto:${EDITION.contactEmail}`} className={linkCls}>
                  {EDITION.contactEmail}
                </a>
              </li>
              <li>
                <a href="https://crelligent.com/privacy" className={linkCls}>
                  Privacy policy
                </a>
              </li>
              <li>
                <DiagnosticLink location="footer" variant="plain" className={linkCls}>
                  Take the diagnostic
                </DiagnosticLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-aehi-line pt-6 font-mono text-xs text-aehi-text-subtle sm:flex-row sm:justify-between">
          <p>© {year} Crelligent &amp; Company Limited</p>
          <p>Method version {EDITION.methodVersion} · Inaugural edition in preparation</p>
        </div>
      </div>
    </footer>
  )
}
