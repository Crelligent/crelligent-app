import type { Metadata } from 'next'
import { PayFooter, PayHeader } from '@/components/foundry/pay/PayHeader'

export const metadata: Metadata = {
  title: 'Invoice',
  description: 'Crelligent invoice.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-(--cr-bg) print:bg-transparent">
      <PayHeader />
      <main id="main" className="flex-1 w-full max-w-2xl mx-auto px-4 py-10 lg:py-16">
        {children}
      </main>
      <PayFooter />
    </div>
  )
}
