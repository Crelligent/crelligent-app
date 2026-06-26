import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { HeroSlider } from '@/components/landing/HeroSlider'
import { EsreTimeline } from '@/components/landing/EsreTimeline'
import { ClientPortalShowcase } from '@/components/landing/ClientPortalShowcase'
import { LatestInsights } from '@/components/landing/LatestInsights'
import { RecentClientStories } from '@/components/landing/RecentClientStories'
import { InsideStories } from '@/components/landing/InsideStories'
import { ValueProposition } from '@/components/landing/ValueProposition'
import { SurveyTeaser } from '@/components/SurveyTeaser'
import { ClientPortalBanner } from '@/components/ClientPortalBanner'
import {
  Layers,
  Compass,
  Users,
  Brain,
  Workflow,
  Server,
  Shield,
  TrendingUp,
  Repeat,
  ArrowRight,
  Target,
  Globe2
} from 'lucide-react'

// The 9 Capabilities - Grouped by Phase
const defineCapabilities = [
  {
    icon: Layers,
    title: 'Business Design',
    description: 'Define system intent, boundaries, and structural logic before execution begins.',
    href: '/capabilities/business-design',
  },
  {
    icon: Compass,
    title: 'Product Strategy',
    description: 'Engineer deliberate, phased capability growth aligned to business goals.',
    href: '/capabilities/product-strategy',
  },
]

const buildCapabilities = [
  {
    icon: Users,
    title: 'CX / Service Design',
    description: 'Translate system intent into usable, intuitive human experiences.',
    href: '/capabilities/cx-design',
  },
  {
    icon: Brain,
    title: 'Data & Intelligence',
    description: 'Enable system sensing, learning, and insight generation for decision-making.',
    href: '/capabilities/data-intelligence',
  },
  {
    icon: Workflow,
    title: 'Operating Model & Process',
    description: 'Design how work flows end-to-end with reliability and scalability.',
    href: '/capabilities/operating-model',
  },
  {
    icon: Server,
    title: 'Technology & Platform',
    description: 'Architect technical foundations that support scalability and evolution.',
    href: '/capabilities/technology-platform',
  },
]

const sustainCapabilities = [
  {
    icon: Shield,
    title: 'Governance, Risk & Control',
    description: 'Maintain system stability while preserving adaptability.',
    href: '/capabilities/governance',
  },
  {
    icon: TrendingUp,
    title: 'Economics & Value Engineering',
    description: 'Connect system design to measurable value creation.',
    href: '/capabilities/economics',
  },
  {
    icon: Repeat,
    title: 'Change, Adoption & Behavior',
    description: 'Activate the system and embed it into daily behavior.',
    href: '/capabilities/change-adoption',
  },
]

const platforms = [
  {
    name: 'VeloDesk',
    role: 'Early-Stage System Sensing',
    description: 'Product validation and PMF scoring for founders ready to prove traction.',
    stage: 'Startups & Founders',
    href: 'https://velodesk.crelligent.com',
    color: '#22c55e',
    logo: '/velodesk (2).png',
  },
  {
    name: 'PRISM',
    role: 'Operational Intelligence Platform',
    description: 'Real-time telemetry ingestion, AI-driven anomaly detection, and systems monitoring.',
    stage: 'Enterprise Operations',
    href: 'https://prism.crelligent.com',
    color: '#3b82f6',
    logo: '/PRISM-logo.png',
  },
  {
    name: 'Crelligent Edge Module (CEM)',
    role: 'Industrial IoT Hardware for Africa',
    description: 'Purpose-built IoT hardware designed for African operating conditions. Connects vehicles, generators, tanks, and industrial assets to the PRISM intelligence platform via 4G/LTE and LoRa.',
    stage: 'Industry Operations',
    href: '/intelligent-systems/hardware',
    color: '#f59e0b',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />
      <SurveyTeaser />

      {/* Dynamic Video Slider Hero */}
      <HeroSlider />

      {/* ═══ VALUE PROPOSITION ═══ */}
      <ValueProposition />

      {/* ═══ HIGHLIGHTS ═══ */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5" >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="section-label mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Why Crelligent</div>
              <h2 className="heading-lg m-0">
                Engineered different
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Card 1 */}
            <div className="relative rounded-xl overflow-hidden p-[1px] group flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#050505] rounded-xl flex flex-col overflow-hidden h-full z-10 w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="h-[220px] relative overflow-hidden bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-1 relative z-20">
                  <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white">Problem-Led Diagnosis</h3>
                  <p className="text-base text-white font-[200] leading-loose opacity-80 mb-8 flex-1">
                    We start with the problem — not the solution we want to sell. Every engagement begins with deep organizational diagnosis to map invisible constraints.
                  </p>
                  <Link href="/about" className="flex items-center justify-between text-sm font-[300] tracking-widest uppercase text-white group-hover:text-[#ec4899] w-full transition-colors mt-auto">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-xl overflow-hidden p-[1px] group flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#22c55e] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#050505] rounded-xl flex flex-col overflow-hidden h-full z-10 w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="h-[220px] relative overflow-hidden bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-1 relative z-20">
                  <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white">9 Capability Architecture</h3>
                  <p className="text-base text-white font-[200] leading-loose opacity-80 mb-8 flex-1">
                    We assess and design across 9 integrated capabilities — from business design to data intelligence and behaviour change — as one unified system.
                  </p>
                  <Link href="/about" className="flex items-center justify-between text-sm font-[300] tracking-widest uppercase text-white group-hover:text-[#3b82f6] w-full transition-colors mt-auto">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-xl overflow-hidden p-[1px] group flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#22c55e] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#050505] rounded-xl flex flex-col overflow-hidden h-full z-10 w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="h-[220px] relative overflow-hidden bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-1 relative z-20">
                  <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white">End-to-End Engineering</h3>
                  <p className="text-base text-white font-[200] leading-loose opacity-80 mb-8 flex-1">
                    Unlike pure consultants, we engineer the platforms, pipelines, and operating models we architect. We build what we design to ensure it evolves.
                  </p>
                  <Link href="/about" className="flex items-center justify-between text-sm font-[300] tracking-widest uppercase text-white group-hover:text-[#22c55e] w-full transition-colors mt-auto">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Bento Grid Showcase */}
      < section className="px-0" >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-1">

            {/* Large Left Card - Systems Architecture (Image + Text) */}
            <Link
              href="/capabilities/systems-architecture"
              className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2 relative h-[560px] overflow-hidden group rounded-xl p-[1px]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#050505] rounded-xl h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/40 via-[#0f1628]/40 to-[#1a1a2e]/40 z-0" />

                {/* Optional Image Background */}
                <div className="absolute inset-0 z-10">
                  <img src="/Business Design II.png" alt="Systems Architecture" className="w-full h-full object-contain object-top pt-8 group-hover:scale-105 transition-all duration-700" />
                </div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-20 z-20">
                  <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-[#3b82f6]/40 rounded-full" />
                  <div className="absolute top-1/3 left-1/3 w-56 h-56 border border-[#3b82f6]/20 rounded-full" />
                  <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#3b82f6]/30 rounded-full" />
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-30">
                  <h3 className="text-3xl md:text-4xl font-[300] tracking-wide mb-2 text-white leading-tight mt-12">
                    SYSTEMS<br />ARCHITECTURE
                  </h3>
                  <div className="w-6 h-0.5 bg-[#3b82f6] mb-4" />
                  <p className="text-sm text-gray-300 mb-4 max-w-sm font-[200] leading-loose">
                    Engineer the foundations organizations rely on—structure, boundaries, and failure modes.
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm group-hover:gap-4 transition-all">
                    <ArrowRight className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Top Right - Text Only Card */}
            <Link
              href="/capabilities/data-intelligence"
              className="col-span-12 md:col-span-6 lg:col-span-4 relative h-[280px] overflow-hidden group rounded-xl p-[1px]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#050505] rounded-xl h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Decorative Accent */}
                <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#3b82f6]/20" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-[300] tracking-wide text-white leading-tight mb-2">
                    DATA<br />INTELLIGENCE
                  </h3>
                  <div className="w-6 h-0.5 bg-[#3b82f6] mb-4" />
                  <p className="text-sm text-gray-300 font-[200] leading-relaxed mb-4">
                    System sensing and adaptive decision intelligence.
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm group-hover:gap-4 transition-all">
                    <ArrowRight className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Top Far Right - Image Only Strip */}
            <div
              className="hidden lg:block col-span-3 relative h-[280px] overflow-hidden rounded-xl group"
            >
              <div className="absolute inset-0 z-0">
                <img src="/ChatGPT Image Feb 27, 2026, 05_31_44 PM.png" alt="Data Intelligence Visual" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/20 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Bottom Middle - Integration Card (Now spanning 4 cols mathematically by position and aesthetic) */}
            <Link
              href="/capabilities/integration-infrastructure"
              className="col-span-12 md:col-span-6 lg:col-span-4 relative h-[280px] overflow-hidden group rounded-xl p-[1px]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b] to-[#ef4444] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#050505] rounded-xl h-full w-full overflow-hidden">

                {/* Image Background only */}
                <div className="absolute inset-0 z-0">
                  <img src="/ChatGPT Image Feb 27, 2026, 06_50_34 PM.png" alt="Integration Infrastructure" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                </div>
              </div>
            </Link>

            {/* Bottom Right - Integration Card (Moved from Product Systems) */}
            <Link
              href="/capabilities/integration-infrastructure"
              className="col-span-12 md:col-span-6 lg:col-span-3 relative h-[280px] overflow-hidden group rounded-xl p-[1px]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#050505] rounded-xl h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f0f1f]/80 via-[#2e1a2e]/80 to-[#150a15]/80 z-10" />

                {/* Decorative - Globe/World */}
                <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-30 z-0">
                  <div className="w-32 h-32 rounded-full border-2 border-[#a855f7]/40 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-[#a855f7]/30" />
                    <div className="absolute w-20 h-20 rounded-full border border-[#a855f7]/20" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-[300] tracking-wide text-white mb-2">
                    INTEGRATION
                  </h3>
                  <p className="text-sm text-gray-300 font-[200] leading-relaxed mb-3">
                    The operational execution layer for system stability.
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm group-hover:gap-4 transition-all">
                    <ArrowRight className="w-4 h-4 text-[#a855f7]" />
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section >

      {/* Capabilities: The Nine Disciplines */}
      < section className="py-24 px-6" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Nine Integrated Capabilities - Our Framework</div>
            <h2 className="heading-lg mb-4">
              We design the system as a whole
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every capability works together. Strategy informs technology. Data informs decisions. People adopt what's designed for them.
            </p>
          </div>

          {/* Define Phase */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-xs font-bold text-[#3b82f6]">1</div>
              <h3 className="text-sm uppercase tracking-widest text-[#3b82f6] font-semibold">Define</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid md:grid-cols-2 gap-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {defineCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="relative rounded-xl overflow-hidden p-[1px] group h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] rounded-xl p-8 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="w-10 h-10 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-6 group-hover:bg-[#3b82f6]/20 transition relative z-10">
                      <cap.icon className="w-5 h-5 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-2xl font-[300] tracking-wide text-white mb-3 relative z-10">{cap.title}</h3>
                    <p className="text-sm text-white font-[200] leading-loose opacity-80 relative z-10 flex-1">{cap.description}</p>
                    <div className="mt-6 text-sm text-[#3b82f6] font-[300] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition flex items-center gap-2 relative z-10">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Build Phase */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-xs font-bold text-[#8b5cf6]">2</div>
              <h3 className="text-sm uppercase tracking-widest text-[#8b5cf6] font-semibold">Build</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {buildCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="relative rounded-xl overflow-hidden p-[1px] group h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] rounded-xl p-6 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <cap.icon className="w-6 h-6 text-[#8b5cf6] mb-4 relative z-10" />
                    <h3 className="text-xl font-[300] tracking-wide text-white mb-2 relative z-10">{cap.title}</h3>
                    <p className="text-sm text-white font-[200] leading-loose opacity-80 relative z-10">{cap.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sustain Phase */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-xs font-bold text-[#22c55e]">3</div>
              <h3 className="text-sm uppercase tracking-widest text-[#22c55e] font-semibold">Sustain</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid md:grid-cols-3 gap-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {sustainCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="relative rounded-xl overflow-hidden p-[1px] group h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] rounded-xl p-6 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <cap.icon className="w-6 h-6 text-[#22c55e] mb-4 relative z-10" />
                    <h3 className="text-xl font-[300] tracking-wide text-white mb-2 relative z-10">{cap.title}</h3>
                    <p className="text-sm text-white font-[200] leading-loose opacity-80 relative z-10">{cap.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Systems Intelligence Stack */}
      < section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Systems Intelligence Stack</div>
            <h2 className="heading-lg mb-4">
              Applied systems tools
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Platforms that operationalize systems thinking—from validation to enterprise governance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {platforms.map((platform) => (
              <Link
                key={platform.href}
                href={platform.href}
                className="relative rounded-xl overflow-hidden p-[1px] group h-full block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30 opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${platform.color}40, ${platform.color}80)` }} />
                <div className="relative bg-[#050505] rounded-xl p-8 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, ${platform.color}15, transparent)` }} />
                  
                  {platform.logo && (
                    <div className="absolute -bottom-12 -right-12 w-[300px] h-[300px] opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 z-0 pointer-events-none">
                      <Image src={platform.logo} alt={`${platform.name} logo`} fill className="object-contain" />
                    </div>
                  )}

                  <div className="text-[11px] font-[400] uppercase tracking-[0.2em] mb-4 relative z-10" style={{ color: platform.color }}>
                    {platform.stage}
                  </div>
                  <h3 className="text-2xl font-[300] tracking-wide text-white mb-2 relative z-10">{platform.name}</h3>
                  <div className="text-sm text-gray-400 font-[200] opacity-80 mb-4 relative z-10">{platform.role}</div>
                  <p className="text-sm text-white font-[200] leading-loose opacity-80 relative z-10">{platform.description}</p>
                  <div className="mt-8 text-sm font-[300] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition flex items-center gap-2 relative z-10" style={{ color: platform.color }}>
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section >

      {/* Flagship Engagement: ESRE */}
      {/* Flagship Engagement: ESRE (Interactive Timeline) */}
      <EsreTimeline />

      {/* Client Portal Showcase */}
      <ClientPortalShowcase />

      {/* New Capgemini-Style Sections */}
      <LatestInsights />
      <RecentClientStories />
      <InsideStories />

      {/* Use Case: The Wright Principle */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ec4899]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left: Image Container */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative group border border-white/10 bg-[#111111]">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 duration-700" />

                <img
                  src="/images/wikiimages-plane-74020_1280.jpg"
                  alt="Wright Brothers First Flight"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-[50%] group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                {/* Decorative frame elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#ec4899] shadow-[0_0_10px_rgba(236,72,153,0.3)] z-20 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.3)] z-20 transition-all group-hover:translate-x-1 group-hover:translate-y-1" />
              </div>
            </div>

            {/* Right: Copy */}
            <div className="w-full lg:w-1/2">
              <div className="section-label mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Historical Precedent
              </div>

              <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8 text-white">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#3b82f6]">Wright</span> Principle.
              </h2>

              <div className="space-y-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {/* The Old Way */}
                <div className="relative rounded-xl overflow-hidden p-[1px] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#3b82f6] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] shadow-2xl p-6 md:p-8 rounded-xl h-full w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <h4 className="text-xs text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3 opacity-80 font-[300] relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899] shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                      The Old Way: Brute Force
                    </h4>
                    <p className="text-base md:text-lg text-white font-[200] leading-loose tracking-wide opacity-90 relative z-10">
                      In 1903, highly-funded competitors tried to achieve flight by bolting bigger engines onto unstable gliders—solving for raw power, but failing entirely at control and integration.
                    </p>
                  </div>
                </div>

                {/* The Systems Approach */}
                <div className="relative rounded-xl overflow-hidden p-[1px] group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] shadow-2xl p-6 md:p-8 rounded-xl h-full w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <h4 className="text-xs text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-3 opacity-80 font-[300] relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                      The Systems Approach
                    </h4>
                    <p className="text-base md:text-lg text-white font-[200] leading-loose tracking-wide opacity-90 relative z-10">
                      The Wright brothers succeeded because they designed the <span className="font-[400]">control system first</span> (3-axis control). They understood that flight wasn&apos;t a power problem; it was an integration problem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  We bring this exact systems-first engineering discipline to modern enterprises. We don&apos;t just build bigger engines; we design the structural balance that allows you to fly without crashing.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CORPORATE ADHERENCE / SYSTEMS IMPACT ═══ */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#3b82f6]/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">

            {/* Left Side: Copy */}
            <div className="w-full md:w-5/12">
              <div className="section-label mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Corporate Responsibility
              </div>
              <h2 className="text-3xl md:text-4xl font-light leading-tight mb-6">
                Structural Integrity &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899]">Adherence</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 font-light">
                As systems engineers, we know that monolithic structures without diverse inputs are inherently fragile.
                We don&apos;t practice Corporate Social Responsibility as an afterthought; we embed global standards as
                hard constraints within our operating model and the architectures we design for our clients.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
                    <Globe2 className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Aligned to UN SDGs</h4>
                    <p className="text-xs text-gray-500">Adhering to global thresholds for sustainable industrialization, innovation, and reduced inequalities.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#ec4899]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Gender Equality &amp; DEI</h4>
                    <p className="text-xs text-gray-500">Enforcing systemic parity and inclusive representation across our firm, our venture foundry, and our supplier networks.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Side: Visual/Stats Grid */}
            <div className="w-full md:w-7/12 grid grid-cols-2 gap-4 relative" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {/* Card 1 - Gender Equality */}
              <div className="relative rounded-xl overflow-hidden p-[1px] group h-full flex flex-col justify-end min-h-[250px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col justify-end">

                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img src="/Gender Equality.jpg" alt="Gender Equality" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

                  <div className="p-6 lg:p-8 relative z-20">
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center mb-4">
                      <span className="text-xs font-[400] text-gray-300">05</span>
                    </div>
                    <h3 className="text-lg font-[300] tracking-wide text-white mb-2">Gender Equality</h3>
                    <p className="text-[13px] text-white font-[200] leading-loose opacity-80">
                      We actively design against systemic biases, ensuring equal access, representation, and leadership opportunities within all organizational structures we deploy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Industry & Innovation */}
              <div className="relative rounded-xl overflow-hidden p-[1px] group h-full mt-8 flex flex-col justify-end min-h-[250px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col justify-end">

                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img src="/industry-innovation.jpg" alt="Industry & Innovation" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

                  <div className="p-6 lg:p-8 relative z-20">
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center mb-4">
                      <span className="text-xs font-[400] text-gray-300">09</span>
                    </div>
                    <h3 className="text-lg font-[300] tracking-wide text-white mb-2">Industry &amp; Innovation</h3>
                    <p className="text-[13px] text-white font-[200] leading-loose opacity-80">
                      Building resilient infrastructure and fostering innovation. We engineer systems that scale responsibly without depleting human or environmental capital.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Reduced Inequalities */}
              <div className="relative rounded-xl overflow-hidden p-[1px] group h-full flex flex-col justify-end min-h-[250px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col justify-end">

                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img src="/Reduced Inequalities.jpg" alt="Reduced Inequalities" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

                  <div className="p-6 lg:p-8 relative z-20">
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center mb-4">
                      <span className="text-xs font-[400] text-gray-300">10</span>
                    </div>
                    <h3 className="text-lg font-[300] tracking-wide text-white mb-2">Reduced Inequalities</h3>
                    <p className="text-[13px] text-white font-[200] leading-loose opacity-80">
                      Our structural designs prioritize equitable distribution of resources, addressing root-cause imbalances rather than surface-level symptoms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative block */}
              <div className="bg-gradient-to-br from-[#3b82f6]/10 to-[#ec4899]/10 border border-white/5 rounded-2xl p-6 lg:p-8 flex items-center justify-center mt-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                <div className="text-center">
                  <div className="text-3xl font-light text-white tracking-widest mb-1">UN SDG</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Adherence Model</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Engagement Paths */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Three Paths</div>
            <h2 className="heading-lg">Where are you in your journey?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Foundry */}
            <div className="relative rounded-xl overflow-hidden p-[1px] group h-full block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#8b5cf6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#050505] rounded-xl p-10 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#22c55e] mb-4 relative z-10">For Startups</div>
                <h3 className="text-3xl font-[300] tracking-wide text-white mb-4 relative z-10">Crelligent Foundry</h3>
                <p className="text-[15px] text-white font-[200] leading-loose opacity-80 mb-8 relative z-10">
                  You&apos;re building something new. We help you design foundations that scale—before complexity exposes weakness. From validation to architecture.
                </p>
                <Link href="/foundry" className="mt-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] text-sm tracking-widest uppercase hover:bg-white/10 hover:border-[#22c55e]/50 transition-all flex items-center gap-3 relative z-10">
                  Explore Foundry
                  <ArrowRight className="w-4 h-4 text-[#22c55e]" />
                </Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="relative rounded-xl overflow-hidden p-[1px] group h-full block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#050505] rounded-xl p-10 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#3b82f6] mb-4 relative z-10">For Enterprise</div>
                <h3 className="text-3xl font-[300] tracking-wide text-white mb-4 relative z-10">System Re-Architecture</h3>
                <p className="text-[15px] text-white font-[200] leading-loose opacity-80 mb-8 relative z-10">
                  Your organization has grown, but the foundations haven&apos;t kept pace. We redesign operating models, platforms, and decision systems.
                </p>
                <Link href="/enterprise" className="mt-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] text-sm tracking-widest uppercase hover:bg-white/10 hover:border-[#3b82f6]/50 transition-all flex items-center gap-3 relative z-10">
                  Enterprise Engagement
                  <ArrowRight className="w-4 h-4 text-[#3b82f6]" />
                </Link>
              </div>
            </div>

            {/* Intelligent Systems */}
            <div className="relative rounded-xl overflow-hidden p-[1px] group h-full block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#050505] rounded-xl p-10 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] mb-4 relative z-10">For Industry</div>
                <h3 className="text-3xl font-[300] tracking-wide text-white mb-4 relative z-10">Crelligent Intelligent Systems</h3>
                <p className="text-[15px] text-white font-[200] leading-loose opacity-80 mb-8 relative z-10">
                  Your operations generate data every second — fleet movements, fuel consumption, energy usage, transactions. We connect Africa&apos;s industrial operations to a unified intelligence command layer built on PRISM and the Crelligent Edge Module.
                </p>
                <Link href="/intelligent-systems" className="mt-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] text-sm tracking-widest uppercase hover:bg-white/10 hover:border-[#f59e0b]/50 transition-all flex items-center gap-3 relative z-10">
                  Explore Intelligent Systems
                  <ArrowRight className="w-4 h-4 text-[#f59e0b]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
        <div className="max-w-2xl mx-auto">
          <h2 className="heading-lg mb-6">
            Ready to stop fixing parts?
          </h2>
          <p className="text-gray-500 mb-8">
            Let&apos;s talk about redesigning the whole system—together.
          </p>
          <Link href="/contact" className="btn-primary">
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ClientPortalBanner />
      <Footer />
    </div >
  )
}
