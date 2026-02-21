import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { P5Canvas } from '@/components/landing/P5Canvas'
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
  Sparkles
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
    href: '/platforms/velodesk',
    color: '#22c55e',
  },
  {
    name: 'BI Suite',
    role: 'Organizational Intelligence',
    description: 'Enterprise-level system governance with System Alignment Index (SAI).',
    stage: 'Growth & Enterprise',
    href: '/platforms/bisuite',
    color: '#3b82f6',
  },
  {
    name: 'MarketPulse',
    role: 'Market Feedback Loops',
    description: 'Consumer intelligence that feeds decision systems, not just dashboards.',
    stage: 'Growth Stage',
    href: '/platforms/marketpulse',
    color: '#8b5cf6',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />

      {/* Hero Section with p5.js Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* p5.js Interactive Background */}
        <P5Canvas className="absolute inset-0 z-0" />

        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <div className="section-label mb-6 animate-fade-in-up opacity-0 stagger-1">Systems Design & Engineering</div>
          <h1 className="heading-xl mb-6 animate-fade-in-up opacity-0 stagger-2">
            We don&apos;t fix parts.
            <br />
            <span className="text-gray-500">We redesign the whole system.</span>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto mb-12 animate-fade-in-up opacity-0 stagger-3">
            Most consultants solve isolated problems. We engineer the system as a whole—integrating strategy, operations, technology, and people so your organization can adapt, learn, and evolve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4">
            <Link href="/foundry" className="btn-primary">
              For Startups
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/enterprise" className="btn-ghost">
              For Enterprise
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in opacity-0 stagger-5">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* Why Systems Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-light mb-2">Problem-Led</h3>
              <p className="text-sm text-gray-500">
                Not service-led. We start with the problem, not the solution we want to sell.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-light mb-2">Foundation-Focused</h3>
              <p className="text-sm text-gray-500">
                We build what you&apos;ll rely on—not just what ships fastest.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-light mb-2">Pre-Scale Ready</h3>
              <p className="text-sm text-gray-500">
                Designed before complexity exposes weakness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="px-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-1">

            {/* Large Left Card - Systems Architecture (Image + Text) */}
            <Link
              href="/capabilities/systems-architecture"
              className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2 relative h-[560px] overflow-hidden group"
            >
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1628] to-[#1a1a2e]" />

              {/* Decorative Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-[#3b82f6]/40 rounded-full" />
                <div className="absolute top-1/3 left-1/3 w-56 h-56 border border-[#3b82f6]/20 rounded-full" />
                <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#3b82f6]/30 rounded-full" />
              </div>

              {/* Content at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-3xl md:text-4xl font-light mb-2 text-white leading-tight">
                  SYSTEMS<br />ARCHITECTURE
                </h3>
                <div className="w-6 h-0.5 bg-[#3b82f6] mb-4" />
                <p className="text-sm text-gray-300 mb-4 max-w-sm">
                  Engineer the foundations organizations rely on—structure, boundaries, and failure modes.
                </p>
                <div className="flex items-center gap-2 text-white text-sm group-hover:gap-4 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Top Right - Text Only Card (White/Light) */}
            <Link
              href="/capabilities/data-intelligence"
              className="col-span-12 md:col-span-6 lg:col-span-4 relative h-[280px] bg-white overflow-hidden group"
            >
              {/* Decorative Accent */}
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#3b82f6]/20" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-light text-[#0a0a0a] leading-tight mb-2">
                  DATA<br />INTELLIGENCE
                </h3>
                <div className="w-6 h-0.5 bg-[#3b82f6] mb-4" />
                <p className="text-sm text-gray-600 mb-4">
                  System sensing and adaptive decision intelligence.
                </p>
                <div className="flex items-center gap-2 text-[#0a0a0a] text-sm group-hover:gap-4 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Top Far Right - Image Only Strip */}
            <div
              className="hidden lg:block col-span-3 relative h-[280px] overflow-hidden"
            >
              {/* Abstract Visual */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#0f1628] to-[#0a0a15]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="w-20 h-20 rounded-full border-2 border-[#3b82f6]" />
                <div className="absolute w-32 h-32 rounded-full border border-[#3b82f6]/50" />
                <div className="absolute w-48 h-48 rounded-full border border-[#3b82f6]/20" />
              </div>
            </div>

            {/* Bottom Middle - Image + Text Card */}
            <Link
              href="/capabilities/product-systems"
              className="col-span-12 md:col-span-6 lg:col-span-4 relative h-[280px] overflow-hidden group"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f0f1f] via-[#2e1a2e] to-[#150a15]" />

              {/* Decorative - Globe/World */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-50">
                <div className="w-32 h-32 rounded-full border-2 border-[#a855f7]/40 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-[#a855f7]/30" />
                  <div className="absolute w-20 h-20 rounded-full border border-[#a855f7]/20" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-light text-white mb-2">
                  PRODUCT SYSTEMS
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Products that evolve as system capabilities.
                </p>
                <div className="flex items-center gap-2 text-[#a855f7] text-sm group-hover:gap-4 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Bottom Right - Text Only Card (White/Light) */}
            <Link
              href="/capabilities/integration-infrastructure"
              className="col-span-12 md:col-span-6 lg:col-span-3 relative h-[280px] bg-[#f5f5f5] overflow-hidden group"
            >
              {/* Decorative Accent */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#f59e0b]/30" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-light text-[#0a0a0a] mb-2">
                  INTEGRATION
                </h3>
                <div className="w-4 h-0.5 bg-[#f59e0b] mb-3" />
                <p className="text-xs text-gray-600 mb-3">
                  The operational execution layer for system stability.
                </p>
                <div className="flex items-center gap-2 text-[#0a0a0a] text-sm group-hover:gap-3 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Capabilities: The Nine Disciplines */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Nine Integrated Capabilities</div>
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
            <div className="grid md:grid-cols-2 gap-6">
              {defineCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="glass-card group rounded-lg hover:border-[#3b82f6]/30"
                >
                  <div className="w-10 h-10 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-4 group-hover:bg-[#3b82f6]/20 transition">
                    <cap.icon className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <h3 className="text-lg font-light mb-3">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                  <div className="mt-4 text-sm text-[#3b82f6] opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buildCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="p-6 border border-white/5 rounded-lg hover:border-[#8b5cf6]/30 transition group"
                >
                  <cap.icon className="w-5 h-5 text-[#8b5cf6] mb-3" />
                  <h3 className="text-base font-light mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-600">{cap.description}</p>
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
            <div className="grid md:grid-cols-3 gap-6">
              {sustainCapabilities.map((cap) => (
                <Link
                  key={cap.href}
                  href={cap.href}
                  className="p-6 border border-white/5 rounded-lg hover:border-[#22c55e]/30 transition group"
                >
                  <cap.icon className="w-5 h-5 text-[#22c55e] mb-3" />
                  <h3 className="text-base font-light mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-600">{cap.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Systems Intelligence Stack */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Systems Intelligence Stack</div>
            <h2 className="heading-lg mb-4">
              Applied systems tools
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Platforms that operationalize systems thinking—from validation to enterprise governance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <Link
                key={platform.href}
                href={platform.href}
                className="glass-card rounded-lg group hover:border-white/10"
              >
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: platform.color }}>
                  {platform.stage}
                </div>
                <h3 className="text-xl font-light mb-2">{platform.name}</h3>
                <div className="text-sm text-gray-400 mb-3">{platform.role}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{platform.description}</p>
                <div className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition flex items-center gap-1" style={{ color: platform.color }}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Engagement: ESRE */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3b82f6]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Crelligent&apos;s Flagship Engagement</div>
            <h2 className="heading-lg mb-6">
              The Enterprise System Redesign Engagement (ESRE)™
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A disciplined, end-to-end partnership that transforms strategic intent into operational reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phase 1 */}
            <div className="glass-card p-8 rounded-lg !border-[#3b82f6] hover:!border-[#3b82f6] transition-colors">
              <div className="text-xs font-bold text-[#3b82f6] mb-2 uppercase tracking-widest">Phase 1 (4–6 weeks)</div>
              <h3 className="text-xl font-light mb-4">The Diagnostic</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed font-medium">
                Most companies guess. We don&apos;t. We map the absolute truth of how your organization behaves—finding the invisible constraints that others miss.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What we do</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Executive interviews</li>
                    <li>System mapping</li>
                    <li>Customer & operational signal review</li>
                    <li>Technology landscape assessment</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What you receive</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Enterprise System Map</li>
                    <li>Constraint & Leverage Point Analysis</li>
                    <li>Risk & Failure Modes Brief</li>
                    <li>Clear problem framing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="glass-card p-8 rounded-lg !border-[#8b5cf6] hover:!border-[#8b5cf6] transition-colors">
              <div className="text-xs font-bold text-[#8b5cf6] mb-2 uppercase tracking-widest">Phase 2 (6–10 weeks)</div>
              <h3 className="text-xl font-light mb-4">The Architecture</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed font-medium">
                Design isn&apos;t just how it looks. It&apos;s how it works. We re-engineer the core of your business to align completely with your intent.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What we do</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Business system redesign</li>
                    <li>Experience & product alignment</li>
                    <li>Data & decision intelligence design</li>
                    <li>Governance & operating model definition</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What you receive</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Target System Architecture</li>
                    <li>Experience & Product Blueprint</li>
                    <li>Decision & Intelligence Model</li>
                    <li>Engineering & Platform Roadmap</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="glass-card p-8 rounded-lg !border-[#ec4899] hover:!border-[#ec4899] transition-colors">
              <div className="text-xs font-bold text-[#ec4899] mb-2 uppercase tracking-widest">Phase 3 (12–24 weeks)</div>
              <h3 className="text-xl font-light mb-4">The Build</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed font-medium">
                Ideas are easy. Execution is everything. We build the platforms, pipelines, and habits that make the new system your reality.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What we do</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Platform & product engineering</li>
                    <li>Data pipelines & analytics</li>
                    <li>CX implementation</li>
                    <li>Change enablement</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What you receive</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Working systems</li>
                    <li>Operational dashboards</li>
                    <li>Trained internal teams</li>
                    <li>Transition to operations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="glass-card p-8 rounded-lg !border-[#22c55e] hover:!border-[#22c55e] transition-colors">
              <div className="text-xs font-bold text-[#22c55e] mb-2 uppercase tracking-widest">Phase 4 (Ongoing)</div>
              <h3 className="text-xl font-light mb-4">The Evolution</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed font-medium">
                Static systems die. We install the sensors and feedback loops to ensure you adapt, learn, and stay ahead.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What we do</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>Quarterly system health reviews</li>
                    <li>Feedback loop monitoring</li>
                    <li>Risk & resilience assessments</li>
                    <li>Continuous improvement cycles</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">What you receive</div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>System Health Reports</li>
                    <li>Improvement backlog</li>
                    <li>Executive foresight briefings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case: The Shift */}
      <section className="py-24 px-6 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch lg:min-h-[500px]">

            {/* The Solution (Large Square) - Rendered first in DOM but visually on right */}
            <div className="w-full lg:w-[65%] lg:ml-auto bg-[#3b82f6] rounded-lg p-12 lg:p-20 flex flex-col justify-center items-center text-center text-white order-2 lg:order-2">
              <div className="text-xs font-bold uppercase tracking-widest mb-6 opacity-80">The Crelligent Approach</div>
              <h3 className="heading-md mb-6 leading-tight">
                We design early-warning decision systems.
              </h3>
              <p className="text-lg opacity-90 leading-relaxed max-w-xl">
                We shift you from lagging reports to leading indicators—giving you the predictive foresight to act before impact.
              </p>
            </div>

            {/* The Problem (Small Square) - Overlaps the Solution */}
            <div className="w-full lg:w-[45%] bg-[#111827] rounded-lg p-10 lg:p-14 text-white shadow-2xl z-10 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 order-1 lg:order-1 mb-8 lg:mb-0">
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-6">The Reality</div>
              <h3 className="heading-md mb-8">
                &ldquo;We have data but can&apos;t see what&apos;s coming.&rdquo;
              </h3>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-gray-300 text-sm">Lagging indicators</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-gray-300 text-sm">Late surprises</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-gray-300 text-sm">Reactive leadership</span>
                </li>
              </ul>

              <div className="border-l-2 border-red-500 pl-4 py-1">
                <div className="text-xs text-red-400 uppercase font-bold mb-1">Example</div>
                <p className="text-sm text-gray-400 italic">
                  A telco sees churn only after customers leave.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Engagement Paths */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-4">Two Paths</div>
            <h2 className="heading-lg">Where are you in your journey?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Foundry */}
            <div className="glass-card rounded-lg p-8">
              <div className="text-xs uppercase tracking-widest text-[#22c55e] mb-4">For Startups</div>
              <h3 className="heading-md mb-4">Crelligent Foundry</h3>
              <p className="text-gray-500 mb-6">
                You&apos;re building something new. We help you design foundations that scale—before complexity exposes weakness. From validation to architecture.
              </p>
              <Link href="/foundry" className="btn-primary">
                Explore Foundry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Enterprise */}
            <div className="glass-card rounded-lg p-8">
              <div className="text-xs uppercase tracking-widest text-[#3b82f6] mb-4">For Enterprise</div>
              <h3 className="heading-md mb-4">System Re-Architecture</h3>
              <p className="text-gray-500 mb-6">
                Your organization has grown, but the foundations haven&apos;t kept pace. We redesign operating models, platforms, and decision systems.
              </p>
              <Link href="/enterprise" className="btn-primary">
                Enterprise Engagement
                <ArrowRight className="w-4 h-4" />
              </Link>
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

      <Footer />
    </div>
  )
}
