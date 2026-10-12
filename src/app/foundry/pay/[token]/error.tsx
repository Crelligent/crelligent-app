'use client'

import { CloudOff } from 'lucide-react'
import { btnPrimary, linkAccent } from '@/components/foundry/ui'

export default function InvoiceError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-6 sm:p-10 text-center">
      <CloudOff aria-hidden className="mx-auto size-8 text-(--cr-text-muted)" />
      <h1 className="mt-5 font-outfit text-2xl text-(--cr-text)">We couldn&apos;t load this invoice right now.</h1>
      <p className="mt-3 text-(--cr-text-muted) leading-relaxed max-w-md mx-auto">
        Please try again in a moment. If it keeps happening, email{' '}
        <a href="mailto:billing@crelligent.com" className={linkAccent}>
          billing@crelligent.com
        </a>
        .
      </p>
      <button type="button" onClick={() => reset()} className={`${btnPrimary} mt-6`}>
        Try again
      </button>
    </div>
  )
}
