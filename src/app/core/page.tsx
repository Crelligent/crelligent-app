import { CoreNavigation } from '@/components/shared/CoreNavigation'
import { CoreFooter } from '@/components/shared/CoreFooter'
import { HeroSection } from '@/components/core-landing/HeroSection'
import { TheProblem } from '@/components/core-landing/TheProblem'
import { ThePhilosophy } from '@/components/core-landing/ThePhilosophy'
import { TheVitalsBot } from '@/components/core-landing/TheVitalsBot'
import { TheVitalsCheck } from '@/components/core-landing/TheVitalsCheck'
import { TheVitalsScore } from '@/components/core-landing/TheVitalsScore'
import { SurvivalIntelligence } from '@/components/core-landing/SurvivalIntelligence'
import { PartnershipModel } from '@/components/core-landing/PartnershipModel'
import { DataPlay } from '@/components/core-landing/DataPlay'
import { ImpactNumbers } from '@/components/core-landing/ImpactNumbers'
import { TheEcosystem } from '@/components/core-landing/TheEcosystem'
import { PartnershipCTA } from '@/components/core-landing/PartnershipCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crelligent Core | Survival Intelligence',
  description: 'Survival intelligence for the grassroots economy. Crelligent Core translates raw conversational data into structured business vitals for the informal sector.',
}

export default function CoreLandingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#3b82f6] selection:text-white">
      <CoreNavigation />
      
      <HeroSection />
      <TheProblem />
      <ThePhilosophy />
      <TheVitalsBot />
      <TheVitalsCheck />
      <TheVitalsScore />
      <SurvivalIntelligence />
      <PartnershipModel />
      <DataPlay />
      <ImpactNumbers />
      <TheEcosystem />
      <PartnershipCTA />

      <CoreFooter />
    </main>
  )
}
