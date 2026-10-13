import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

/** Shared shell for the /esre-os hub pages (layers, architecture, methodology). */
export function HubShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505] font-outfit text-white">
      <Navigation />
      <section className="mx-auto w-full max-w-5xl flex-1 px-6 pb-24 pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link href="/esre-os" className="text-[#22c55e] hover:underline">
            ESRE OS
          </Link>{' '}
          / <span className="text-gray-400">{eyebrow}</span>
        </nav>
        <h1 className="mb-6 text-4xl font-light md:text-5xl">{title}</h1>
        <div className="mb-16 max-w-3xl text-lg leading-relaxed text-gray-400">{intro}</div>
        {children}
      </section>
      <Footer />
    </main>
  )
}

export function HubCard({
  label,
  title,
  href,
  children,
}: {
  label?: string
  title: string
  href?: string
  children: React.ReactNode
}) {
  const inner = (
    <>
      {label && <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#22c55e]">{label}</p>}
      <h3 className="mb-3 text-xl font-light text-white">{title}</h3>
      <div className="text-[15px] leading-relaxed text-gray-400">{children}</div>
      {href && <p className="mt-4 text-sm text-[#22c55e]">Read more →</p>}
    </>
  )
  const cls = 'block rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25'
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export function HubCta() {
  return (
    <div className="mt-20 rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/[0.06] p-8">
      <h2 className="mb-3 text-2xl font-light">See where your enterprise stands</h2>
      <p className="mb-6 max-w-2xl text-gray-400">
        The free ESRE OS diagnostic scores your business on all five layers and shows which one is holding the rest back.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/diagnostic" className="rounded-md bg-[#22c55e] px-5 py-3 text-center text-sm font-medium text-black hover:bg-[#4ade80]">
          Take the free diagnostic
        </Link>
        <Link href="/contact" className="rounded-md border border-white/20 px-5 py-3 text-center text-sm text-white hover:border-white/50">
          Talk to us
        </Link>
      </div>
    </div>
  )
}
