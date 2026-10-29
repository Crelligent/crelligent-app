import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { getApplyPackage } from '@/lib/foundry/packages'
import { ApplyForm } from '@/components/foundry/apply/ApplyForm'
import { WhatHappensNext, WhatHappensNextCollapsed } from '@/components/foundry/apply/WhatHappensNext'
import { Eyebrow } from '@/components/foundry/primitives'
import { linkAccentStandalone } from '@/components/foundry/ui'

export const metadata: Metadata = {
  title: 'Apply to Crelligent Foundry or Request a Quote',
  description:
    'Apply to Crelligent Foundry in about 5 minutes. Tell us your stage and goals; we review every application and reply with next steps.',
  alternates: { canonical: '/foundry/apply' },
}

/** DESIGN.md 5.1: URL preselection. `package` wins over `path`. */
function preselect(sp: { path?: string | string[]; package?: string | string[] }) {
  const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v) ?? ''
  const pkg = getApplyPackage(one(sp.package))
  if (pkg?.path) return { path: pkg.path, packageInterest: pkg.id as string }
  const path = one(sp.path)
  if (path === 'validate') return { path: 'validate', packageInterest: '' }
  if (path === 'venture') return { path: 'venture', packageInterest: 'venture' }
  return { path: '', packageInterest: '' }
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string | string[]; package?: string | string[] }>
}) {
  const sp = await searchParams
  const initial = preselect(sp)
  const isQuote = Boolean(sp.package)

  return (
    <>
      <Navigation />
      <main id="main" className="px-4 sm:px-6 pt-28 pb-16 lg:pt-36 lg:pb-24 bg-(--cr-bg)">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 min-w-0">
            <Link href="/foundry" className={linkAccentStandalone}>
              <ArrowLeft aria-hidden className="size-4" /> Foundry
            </Link>
            <Eyebrow className="mt-6">{isQuote ? 'Request a quote' : 'Apply'}</Eyebrow>
            <h1 className="mt-3 heading-lg text-(--cr-text)">
              {isQuote ? 'Request a Foundry quote' : 'Apply to Crelligent Foundry'}
            </h1>
            <p className="mt-4 text-base text-(--cr-text-muted) leading-relaxed">
              {isQuote
                ? 'Tell us where you are in about 5 minutes. After a short discovery call we send a fixed scope, timeline and fee.'
                : 'Apply in about 5 minutes. We reply with next steps after we review your application.'}
            </p>
            <WhatHappensNextCollapsed className="mt-6 lg:hidden" />
            <div className="mt-10">
              <ApplyForm initialPath={initial.path} initialPackage={initial.packageInterest} />
            </div>
          </div>
          <aside className="hidden lg:block lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 self-start" aria-label="What happens next">
            <WhatHappensNext />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
