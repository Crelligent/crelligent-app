import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { 
  ArrowRight, 
  Layers, 
  Workflow, 
  Server, 
  Brain, 
  Shield, 
  Compass, 
  TrendingUp, 
  Users, 
  Repeat,
  CheckCircle,
  Clock,
  ArrowUp,
  Info,
  Box
} from 'lucide-react'
import EsreOsIntroduction from '@/components/landing/EsreOsIntroduction'
import EsreOsPerformanceScore from '@/components/landing/EsreOsPerformanceScore'
import { GlobalNetworkGlobe } from '@/components/landing/GlobalNetworkGlobe'

export const metadata: Metadata = {
  title: 'ESRE OS — The Enterprise Operating System',
  description: 'ESRE OS is a five-layer enterprise operating system installed across the critical capabilities of your organisation. Learn about the OS Core, Application Runtime, and the ESRE OS Lifecycle.',
}

export default function EsreOsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#3b82f6]/30 font-['Outfit']">
      <Navigation />
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505]/0 to-[#050505]/0" />
        </div>
        
        {/* Interactive Globe Background */}
        <div className="absolute right-[-20%] md:right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-30 md:opacity-60 mix-blend-screen pointer-events-auto z-0">
          <GlobalNetworkGlobe />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-gray-300">The Canonical Product</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-[300] tracking-tight mb-6">
            ESRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899] font-[500]">OS</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-400 font-light mb-12 max-w-3xl leading-relaxed">
            The Enterprise Operating System for African Mid-Market Companies.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="https://client.crelligent.com" 
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Run the ESRE OS Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="https://velodesk.crelligent.com" 
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm"
            >
              Install ESRE OS Lite
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE STACK ═══ */}
      <EsreOsIntroduction />

      {/* ═══ OS CORE LAYERS (L1-L5) ═══ */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">The <span className="font-medium">OS Core</span></h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl">
              The foundational layers of your enterprise. These five capabilities form the structural integrity of the system, allowing the application runtime to function effectively.
            </p>
          </div>

          <div className="space-y-6">
            <svg width="0" height="0" className="absolute">
              <linearGradient id="esre-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#3b82f6" offset="0%" />
                <stop stopColor="#a855f7" offset="50%" />
                <stop stopColor="#ec4899" offset="100%" />
              </linearGradient>
            </svg>
            {[
              { level: 'L1', name: 'Business Design', analogy: 'The Kernel', icon: Layers, desc: 'The fundamental intent and structural logic of the business.', role: 'Defines the core boundaries, market positioning, and value architecture.' },
              { level: 'L2', name: 'Operating Model & Process', analogy: 'The Scheduler', icon: Workflow, desc: 'How work flows end-to-end through the organization.', role: 'Coordinates resources, processes, and people to execute the L1 design reliably.' },
              { level: 'L3', name: 'Technology & Platform', analogy: 'Infrastructure Layer', icon: Server, desc: 'The technical foundations that support operations.', role: 'Provides the digital tools, networks, and computational power to scale L2 processes.' },
              { level: 'L4', name: 'Data & Intelligence', analogy: 'Sensing Layer', icon: Brain, desc: 'System sensing, learning, and insight generation.', role: 'Collects telemetry across L1-L3 to inform decisions and adapt to changes.' },
              { level: 'L5', name: 'Governance, Risk & Control', analogy: 'Security Layer', icon: Shield, desc: 'Maintaining system stability while preserving adaptability.', role: 'Protects the enterprise, manages permissions, and ensures compliance.' }
            ].map((layer, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-8 md:gap-16 py-12 md:py-20 items-center">
                {/* Icon Column */}
                <div className={`flex justify-center ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <layer.icon 
                    className="w-32 h-32 md:w-56 md:h-56 drop-shadow-2xl opacity-90" 
                    stroke="url(#esre-gradient)" 
                    strokeWidth={1}
                  />
                </div>

                {/* Text Column */}
                <div className={`flex flex-col ${idx % 2 === 1 ? 'md:order-1 md:items-end md:text-right' : 'md:order-2 md:items-start md:text-left'}`}>
                  <div className={`flex flex-wrap items-baseline gap-4 mb-4 ${idx % 2 === 1 ? 'md:justify-end' : ''}`}>
                    <span className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold tracking-widest">{layer.level}</span>
                    <h3 className="text-3xl md:text-4xl font-light">{layer.name}</h3>
                    <span className="text-sm px-4 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 whitespace-nowrap">{layer.analogy}</span>
                  </div>
                  <p className="text-xl text-gray-400 font-light leading-relaxed mb-6 max-w-lg">{layer.desc}</p>
                  <p className="text-base text-gray-500 max-w-lg"><span className="text-gray-300">OS Role:</span> {layer.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ APPLICATION RUNTIME ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">The <span className="font-medium">Application Runtime</span></h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl">
              The four capabilities that interact directly with the market. They run on top of the OS Core. If the Core is weak, these applications crash.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Compass, title: 'Product Strategy', desc: 'Engineering deliberate, phased capability growth aligned to business goals.', color: 'from-[#3b82f6] to-[#8b5cf6]' },
              { icon: TrendingUp, title: 'Economics', desc: 'Connecting system design to measurable value creation and pricing structures.', color: 'from-[#8b5cf6] to-[#ec4899]' },
              { icon: Users, title: 'CX / Service Design', desc: 'Translating system intent into usable, intuitive human experiences.', color: 'from-[#22c55e] to-[#3b82f6]' },
              { icon: Repeat, title: 'Change & Adoption', desc: 'Activating the system and embedding it into daily human behavior.', color: 'from-[#f59e0b] to-[#ef4444]' }
            ].map((app, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden p-[1px] group h-full">
                <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-[#050505] rounded-xl p-8 h-full z-10 flex flex-col items-start">
                  <div className={`w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6`}>
                    <app.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-light tracking-wide mb-3">{app.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ESRE OS LIFECYCLE ═══ */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-light mb-6">The ESRE OS Lifecycle</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              How we deploy the operating system into your enterprise.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0" />

            {[
              { phase: '1', title: 'Diagnostic', duration: '2-4 Weeks', desc: 'Mapping invisible constraints and assessing current OS health.', deliverables: 'Diagnostic Report, Capability Heatmap' },
              { phase: '2', title: 'Architecture', duration: '4-8 Weeks', desc: 'Designing the target state L1-L5 foundations.', deliverables: 'System Blueprint, Integration Plan' },
              { phase: '3', title: 'Installation', duration: '3-6 Months', desc: 'Building and deploying the engineered components.', deliverables: 'Live Platforms, Operating Manuals' },
              { phase: '4', title: 'Support & Updates', duration: 'Ongoing', desc: 'Continuous monitoring, telemetry via PRISM, and lifecycle updates.', deliverables: 'PRISM Dashboard, Quarterly Reviews' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 bg-[#111] border border-white/10 rounded-2xl p-6 hover:bg-[#151515] transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-6 border border-blue-500/30">
                  {step.phase}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-4">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </div>
                <p className="text-sm text-gray-400 mb-6 font-light">{step.desc}</p>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Deliverables:</span>
                  <span className="text-sm text-gray-300">{step.deliverables}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PERFORMANCE SCORE ═══ */}
      <EsreOsPerformanceScore />

      {/* ═══ BEFORE/AFTER COMPARISON ═══ */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">The Impact of Installation</h2>
            <p className="text-xl text-gray-400 font-light">Client Example: ESN Petroleum</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-[#111] border border-red-500/20 rounded-2xl p-8 lg:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-3xl rounded-full" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8">
                Before ESRE OS
              </div>
              <p className="text-lg text-gray-300 font-light leading-relaxed mb-8">
                Fragmented capabilities operating in isolation. No scheduler (L2). No sensing layer (L4). No governance (L5). Everything depended on the founder.
              </p>
              <ul className="space-y-4">
                {['Unpredictable execution', 'Siloed data & zero visibility', 'Founder as the bottleneck'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-gradient-to-b from-[#111] to-[#0a1510] border border-green-500/30 rounded-2xl p-8 lg:p-10 relative overflow-hidden group shadow-[0_0_40px_rgba(34,197,94,0.05)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-3xl rounded-full" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium mb-8">
                <CheckCircle className="w-4 h-4" />
                After Installation
              </div>
              <p className="text-lg text-white font-light leading-relaxed mb-8 relative z-10">
                L1 through L5 installed and operating. PRISM providing real-time network layer. ESRE OS Dashboard showing live Performance Score. Enterprise runs, scales, and self-monitors.
              </p>
              <ul className="space-y-4 relative z-10">
                {['Predictable, automated execution', 'Real-time telemetry & monitoring', 'Founder elevated to strategic design'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING & DEPLOYMENT MODELS ═══ */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8">
              Installation & Licensing
            </div>
            <h2 className="text-3xl md:text-5xl font-light mb-6">Deploy your enterprise OS.</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              Choose the deployment model that fits your operational scale. From standard startup templates to full-scale enterprise intelligence networks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-32">
            
            {/* TIER 1: ESRE OS Core */}

            <div className="bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-blue-500/30 rounded-2xl p-8 flex flex-col relative overflow-hidden group shadow-[0_0_40px_rgba(59,130,246,0.05)] transform md:-translate-y-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-b-lg">
                Most Popular
              </div>
              <div className="mb-8 mt-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-medium mb-2 text-white">ESRE OS Core</h3>
                <p className="text-sm text-gray-400">For African Mid-Market companies that need predictable execution at scale.</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-light text-white">Custom Pricing</span>
                </div>
                <p className="text-xs text-blue-400 uppercase tracking-wider">Installation Fee + Monthly Licensing</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  'Full L1-L5 OS Core installation',
                  'Application Runtime integration',
                  'Custom System Blueprint & Architecture',
                  'Active scheduler & governance logic',
                  'ESRE OS Dashboard access',
                  'Monthly Performance Scoring'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="https://client.crelligent.com" className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white text-center text-sm font-medium hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Book OS Diagnostic
              </Link>
            </div>

            {/* TIER 2: Intelligent Systems */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full" />
              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                  <Server className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Intelligent Systems</h3>
                <p className="text-sm text-gray-400">For heavy operations, manufacturing, and asset-heavy enterprises.</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-light">Enterprise</span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Custom Deployment</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  'Everything in ESRE OS Core',
                  'L4 Sensing Layer via PRISM integration',
                  'CEM hardware deployment',
                  'Real-time automated telemetry',
                  'AI drift detection & prediction',
                  'Automated network response'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/intelligent-systems" className="w-full py-3 px-4 rounded-lg border border-white/20 text-center text-sm font-medium hover:bg-white/5 transition-colors">
                Contact Sales
              </Link>
            </div>

          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h3 className="text-2xl md:text-4xl font-light mb-4">Installation & Licensing Explained</h3>
              <p className="text-gray-400 font-light">How the ESRE OS deployment model works.</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#111] border border-white/5 p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  Why is there an Installation Fee and a Licensing Fee?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  An enterprise operating system is not a standard SaaS tool you just log into. It requires a foundational build phase where we map your constraints, design the target state, and configure the L1-L5 layers to your specific operational reality. This is the <strong>Installation Fee</strong>. Once installed, the OS requires continuous monitoring, AI drift detection, and executive dashboarding to ensure performance. This is the ongoing <strong>Licensing & Maintenance Fee</strong>.
                </p>
              </div>

              <div className="bg-[#111] border border-white/5 p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  Why do I need to book a Diagnostic first?
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We cannot price the installation of an OS without understanding the complexity of the enterprise. The Diagnostic phase gives us a complete map of your existing broken systems, bottlenecks, and the precise scope of work required to install the L1-L5 layers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-light mb-8">Ready to install?</h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            Stop bolting engines onto gliders. Engineer your enterprise operating system.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="https://client.crelligent.com" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              Run the ESRE OS Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="https://client.crelligent.com" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Install ESRE OS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
