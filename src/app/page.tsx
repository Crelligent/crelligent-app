import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { HeroSlider } from '@/components/landing/HeroSlider'
import { ESRESection } from '@/components/landing/ESRESection'
import { ClientPortalShowcase } from '@/components/landing/ClientPortalShowcase'
import { EsreIntelligenceShowcase } from '@/components/landing/EsreIntelligenceShowcase'
import { AEHISection } from '@/components/AEHISection'
import { LatestInsights } from '@/components/landing/LatestInsights'
import { RecentClientStories } from '@/components/landing/RecentClientStories'
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

// ESRE OS Core — The five capability layers (L1–L5)
const osCoreCapabilities = [
  {
    icon: Layers,
    layer: 'L1',
    title: 'Business Design',
    subtitle: 'The Kernel',
    description: 'Defines system purpose, structural logic, and operational boundaries. The contract every other layer must conform to. Installed first.',
    href: '/capabilities/business-design',
  },
  {
    icon: Workflow,
    layer: 'L2',
    title: 'Operating Model & Process',
    subtitle: 'The Scheduler',
    description: 'Determines how work flows, who does what, in what sequence, with what resources. When this layer is absent, the founder becomes the scheduler — and the enterprise cannot operate without them.',
    href: '/capabilities/operating-model',
    critical: true,
  },
  {
    icon: Server,
    layer: 'L3',
    title: 'Technology & Platform',
    subtitle: 'Infrastructure Layer',
    description: 'Makes the underlying systems (ERP, CRM, APIs, IoT) invisible to the business processes above them. Operations should not manage infrastructure directly.',
    href: '/capabilities/technology-platform',
  },
  {
    icon: Brain,
    layer: 'L4',
    title: 'Data & Intelligence',
    subtitle: 'Sensing Layer',
    description: 'Instruments the OS. Generates real-time feedback loops so the enterprise can see itself, detect drift, and adapt. Feeds the ESRE AI Engine.',
    href: '/capabilities/data-intelligence',
  },
  {
    icon: Shield,
    layer: 'L5',
    title: 'Governance, Risk & Control',
    subtitle: 'Security Layer',
    description: 'Controls who can authorise what, how processes are isolated from each other, and what maintains system stability when the enterprise is under pressure.',
    href: '/capabilities/governance',
  },
]

// Application Runtime — Capabilities that run ON TOP of the OS
const appRuntimeCapabilities = [
  {
    icon: Compass,
    title: 'Product Strategy',
    subtitle: 'Growth Application',
    description: 'Expands what the enterprise offers and to whom. Runs on the L1 kernel and L2 scheduler.',
    href: '/capabilities/product-strategy',
  },
  {
    icon: TrendingUp,
    title: 'Economics & Value Engineering',
    subtitle: 'Performance Application',
    description: 'Connects OS activity to measurable value creation. Runs on L4 data signals.',
    href: '/capabilities/economics',
  },
  {
    icon: Users,
    title: 'CX / Service Design',
    subtitle: 'Interface Application',
    description: 'Translates OS performance into customer experience. Poor CX is almost always an L2 or L3 failure at the customer touchpoint.',
    href: '/capabilities/cx-design',
  },
  {
    icon: Repeat,
    title: 'Change, Adoption & Behavior',
    subtitle: 'Activation Application',
    description: "Ensures the installed OS is actually used. Change management activates the applications — you don't adopt an OS, you adopt what runs on it.",
    href: '/capabilities/change-adoption',
  },
]

const platforms = [
  {
    name: 'VeloDesk',
    role: 'Early-Stage System Sensing',
    description: 'Product validation and PMF scoring for founders ready to prove traction.',
    stage: 'Startups & Founders',
    href: '/platforms/velodesk',
    color: '#22c55e',
    logo: '/velodesk (2).png',
  },
  {
    name: 'PRISM',
    role: 'ESRE OS Network Layer — Operational Intelligence Platform',
    description: 'Real-time telemetry ingestion, AI-driven anomaly detection, and systems monitoring. PRISM is the L4 sensing layer of the ESRE OS for operational assets — connecting CEM hardware telemetry to the Data & Intelligence layer and feeding the ESRE AI Engine in real time.',
    stage: 'Enterprise Operations',
    href: 'https://prism.crelligent.com',
    color: '#3b82f6',
    logo: '/PRISM-logo.png',
  },
  {
    name: 'Crelligent Edge Module (CEM)',
    role: 'Industrial IoT Hardware for Africa',
    description: 'Purpose-built IoT hardware designed for African operating conditions. Connects vehicles, generators, tanks, and industrial assets to the PRISM intelligence platform via 4G/LTE and LoRa. CEM is the physical infrastructure layer of the ESRE OS — the hardware that the operational sensing layer (L4) and PRISM network depend on.',
    stage: 'Industry Operations',
    href: '/intelligent-systems/hardware',
    color: '#f59e0b',
  }
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
                  <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white">5 + 4 OS Architecture</h3>
                  <p className="text-base text-white font-[200] leading-loose opacity-80 mb-8 flex-1">
                    Five OS Core layers form the enterprise operating system (L1–L5). Four Application Runtime capabilities execute strategy on top of it. Nine total — designed as one unified system, not piecemeal workstreams.
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


      {/* Capabilities: ESRE OS Architecture */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>The ESRE OS Architecture</div>
            <h2 className="heading-lg mb-4">
              Five capability layers form the OS. Four run on top of it.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The OS Core handles the foundation. The Application Runtime executes strategy on top of it. When the OS is strong, the applications perform at full capacity.
            </p>
          </div>

          {/* Group 1 — ESRE OS Core */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-sm font-bold text-[#3b82f6]">OS</div>
              <div>
                <h3 className="text-sm uppercase tracking-widest text-[#3b82f6] font-semibold">ESRE OS Core — L1 to L5</h3>
                <p className="text-xs text-gray-500 mt-1">The five capability layers that form the enterprise operating system</p>
              </div>
              <div className="flex-1 h-px bg-white/5 ml-4" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {osCoreCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="relative rounded-xl overflow-hidden p-[1px] group h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] rounded-xl p-6 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="flex items-center justify-between w-full mb-6 relative z-10">
                      <div className="w-10 h-10 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center group-hover:bg-[#3b82f6]/20 transition">
                        <cap.icon className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <div className="px-2 py-1 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[10px] font-bold text-[#3b82f6] tracking-wider">
                        {cap.layer}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-[300] tracking-wide text-white mb-1 relative z-10">{cap.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <div className="text-xs text-[#3b82f6] font-medium tracking-wide uppercase">{cap.subtitle}</div>
                      {cap.critical && (
                        <div className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                          Critical
                        </div>
                      )}
                    </div>
                    
                    <p className="text-[13px] text-white font-[200] leading-relaxed opacity-70 relative z-10 flex-1">{cap.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Group 2 — Application Runtime */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center">
                <Workflow className="w-4 h-4 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest text-[#22c55e] font-semibold">Application Runtime</h3>
                <p className="text-xs text-gray-500 mt-1">Four capabilities that execute on top of the installed OS</p>
              </div>
              <div className="flex-1 h-px bg-white/5 ml-4" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {appRuntimeCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="relative rounded-xl overflow-hidden p-[1px] group h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#050505] rounded-xl p-6 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="w-10 h-10 rounded bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center mb-6 group-hover:bg-[#22c55e]/20 transition relative z-10">
                      <cap.icon className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    
                    <h3 className="text-lg font-[300] tracking-wide text-white mb-1 relative z-10">{cap.title}</h3>
                    <div className="text-xs text-[#22c55e] font-medium tracking-wide uppercase mb-3 relative z-10">{cap.subtitle}</div>
                    
                    <p className="text-[13px] text-white font-[200] leading-relaxed opacity-70 relative z-10 flex-1">{cap.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* Flagship Engagement: ESRE (Platform) */}
      <ESRESection />

      {/* Client Portal Showcase */}
      <ClientPortalShowcase />

      {/* ESRE AI Intelligence Engine Showcase */}
      <EsreIntelligenceShowcase />

      {/* AEHI Section */}
      <AEHISection />

      {/* New Capgemini-Style Sections */}
      <LatestInsights />
      <RecentClientStories />

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
