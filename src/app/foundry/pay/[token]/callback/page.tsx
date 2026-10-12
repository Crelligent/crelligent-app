import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { PaymentResult } from '@/components/foundry/pay/PaymentResult'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Confirming payment',
  description: 'Crelligent payment confirmation.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

function Fallback() {
  return (
    <div className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-6 sm:p-10 text-center">
      <Loader2 aria-hidden className="mx-auto size-10 text-(--cr-text-muted) motion-safe:animate-spin" />
      <h1 className="mt-5 font-outfit text-2xl text-(--cr-text)">Confirming your payment…</h1>
    </div>
  )
}

export default async function PaymentCallbackPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  return (
    <Suspense fallback={<Fallback />}>
      <PaymentResult token={token} />
    </Suspense>
  )
}
