import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Lock, Target } from 'lucide-react'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Eyebrow } from '@/components/foundry/primitives'
import { linkAccentStandalone } from '@/components/foundry/ui'
import { PmfCheck } from '@/components/foundry/pmf-check/PmfCheck'

export const metadata: Metadata = {
  title: 'Free PMF snapshot: how close are you to product-market fit? | Crelligent Foundry',
  description:
    'Answer 10 questions in about 3 minutes and get a product-market fit score, your three biggest gaps and the next step, weighted like the VeloDesk PMF Score.',
  alternates: { canonical: '/foundry/pmf-check' },
}

export default function PmfCheckPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="px-4 sm:px-6 pt-28 pb-16 lg:pt-36 lg:pb-24 bg-(--cr-bg)">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 min-w-0">
            <Link href="/foundry" className={linkAccentStandalone}>
              <ArrowLeft aria-hidden className="size-4" /> Foundry
            </Link>
            <Eyebrow className="mt-6">Free PMF snapshot</Eyebrow>
            <h1 className="mt-3 heading-lg text-(--cr-text)">How close are you to product-market fit?</h1>
            <p className="mt-4 text-base text-(--cr-text-muted) leading-relaxed">
              Ten questions, about 3 minutes. You get a score, your three biggest gaps and the next step. No sign-up
              needed to see your result.
            </p>
            <div className="mt-10">
              <PmfCheck />
            </div>
          </div>
          <aside className="mt-12 lg:mt-0 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 self-start" aria-label="About the snapshot">
            <ul className="space-y-5 text-sm text-(--cr-text-muted)">
              <li className="flex gap-3">
                <Target aria-hidden className="size-5 shrink-0 text-(--cr-accent)" />
                <span>
                  <span className="block font-medium text-(--cr-text)">Built on the VeloDesk PMF Score</span>
                  The same seven dimensions and weights, from retention to referrals, plus the 40% &ldquo;very
                  disappointed&rdquo; test.
                </span>
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden className="size-5 shrink-0 text-(--cr-accent)" />
                <span>
                  <span className="block font-medium text-(--cr-text)">Instant result</span>
                  Your score appears as soon as you finish. Save it only if you want a free review call.
                </span>
              </li>
              <li className="flex gap-3">
                <Lock aria-hidden className="size-5 shrink-0 text-(--cr-accent)" />
                <span>
                  <span className="block font-medium text-(--cr-text)">Private</span>
                  Nothing is stored unless you choose to save it. We never share your answers.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
