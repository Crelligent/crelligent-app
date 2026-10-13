import { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import AehiDiagnosticForm from '@/components/diagnostic/AehiDiagnosticForm'

export const metadata: Metadata = {
  title: 'Free Business Diagnostic: Score How Your Company Is Run',
  description: "A free 10-minute diagnostic for Nigerian and African companies. Get your ESRE OS Performance Score across five layers and see which one is holding the business back.",
  alternates: { canonical: '/diagnostic' },
}

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#ec4899]/30 selection:text-white flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#ec4899]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24 px-6 flex items-center justify-center relative z-10">
        <AehiDiagnosticForm />
      </main>
      
      <Footer />
    </div>
  )
}
