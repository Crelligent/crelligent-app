import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Activity, BarChart3, Database, Layers, Shield, Workflow, TrendingUp, Building2, Map as MapIcon, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { createAdminClient } from '@supabase/server/core'
import type { SupabaseEnv } from '@supabase/server'

export const metadata = {
  title: 'African Enterprise Health Index (AEHI) | Crelligent',
  description: 'The definitive operational benchmark for mid-market enterprises across Africa. Compare your ESRE OS performance against sector averages.',
}

function resolveNextEnv(): Partial<SupabaseEnv> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const secretKey = process.env.SUPABASE_SECRET_KEY
  return {
    url: url ?? undefined,
    publishableKeys: publishableKey ? { default: publishableKey } : {},
    secretKeys: secretKey ? { default: secretKey } : {},
  }
}

export default async function AehiPage() {
  const env = resolveNextEnv()
  const supabaseAdmin = createAdminClient({ env })

  // Fetch real benchmark data
  const { data: scores } = await supabaseAdmin
    .from('aehi_os_scores')
    .select(`
      composite_score,
      score_l1_business_design,
      score_l2_operating_model,
      score_l3_technology,
      score_l4_data_intelligence,
      score_l5_governance,
      aehi_enterprises!inner ( sector )
    `)

  // Aggregate by sector
  const sectorMap = new Map<string, any>()
  if (scores) {
    for (const score of scores) {
      const sector = (score.aehi_enterprises as any).sector
      if (!sectorMap.has(sector)) {
        sectorMap.set(sector, { count: 0, score: 0, l1: 0, l2: 0, l3: 0, l4: 0, l5: 0 })
      }
      const s = sectorMap.get(sector)
      s.count++
      s.score += score.composite_score
      s.l1 += score.score_l1_business_design
      s.l2 += score.score_l2_operating_model
      s.l3 += score.score_l3_technology
      s.l4 += score.score_l4_data_intelligence
      s.l5 += score.score_l5_governance
    }
  }

  const sectorData = Array.from(sectorMap.entries()).map(([name, data]) => ({
    name,
    score: Math.round(data.score / data.count),
    l1: Math.round(data.l1 / data.count),
    l2: Math.round(data.l2 / data.count),
    l3: Math.round(data.l3 / data.count),
    l4: Math.round(data.l4 / data.count),
    l5: Math.round(data.l5 / data.count),
  }))

  const totalIndexed = scores ? scores.length : 0
  const averageOsScore = scores && scores.length > 0
    ? (scores.reduce((acc, curr) => acc + curr.composite_score, 0) / scores.length).toFixed(1)
    : '0'

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-blue-500/30">
      <Navigation />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 max-w-7xl mx-auto mb-24">
          <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-blue-400 uppercase mb-8">
              <Activity className="w-3 h-3" />
              Live Benchmark Data
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-8">
              African Enterprise <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Health Index (AEHI)
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
              Financial audits tell you about the past. The AEHI tells you about your capacity to execute the future. 
              The definitive operational benchmark for mid-market enterprises across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://client.crelligent.com" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Calculate Your Score <TrendingUp className="w-4 h-4" />
              </Link>
              <Link href="#methodology" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                Read the Methodology
              </Link>
            </div>
          </div>
        </section>

        {/* Global Stats */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Enterprises Indexed', value: totalIndexed.toString(), icon: Building2, trend: 'Updated live' },
              { label: 'Average OS Score', value: averageOsScore, icon: Activity, trend: 'Out of 100' },
              { label: 'Markets Covered', value: '1', icon: Map, trend: 'Nigeria (Live)' }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100" />
                <stat.icon className="w-6 h-6 text-blue-400 mb-4" />
                <div className="text-4xl font-bold font-heading mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-white/5">{stat.trend}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why the AEHI Exists (The Problem) */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Why we built the Index</h2>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  Most mid-market enterprises in Africa appear healthy on their balance sheets right up until the moment they collapse under the weight of their own complexity.
                </p>
                <p>
                  They suffer from a phenomenon we call the <strong>Adaptation Deficit</strong>. Their strategies are modern, but their underlying operating systems—how they make decisions, flow data, and execute processes—are built for a smaller, simpler version of themselves that no longer exists.
                </p>
                <p>
                  We built the AEHI to expose this invisible risk. By measuring the structural health of an enterprise across the five ESRE OS layers, we can predict operational failures before they hit the P&L.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative space-y-4">
                {[
                  { title: "Standard KPIs measure outputs.", desc: "Revenue, EBITDA, and churn tell you what happened last quarter." },
                  { title: "The AEHI measures capacity.", desc: "The health of your OS layers tells you what you can actually execute tomorrow." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl">
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Findings from the Index */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Latest Insights from the Index</h2>
            <p className="text-gray-400 max-w-2xl">
              Patterns emerging from the top 100 mid-market enterprises across the continent.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <AlertTriangle className="w-8 h-8 text-amber-400 mb-6" />
              <h3 className="text-xl font-semibold mb-3">The L2 Founder Trap</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                68% of indexed companies score below 55 on Operating Model (L2). Their processes are completely undocumented, meaning the founder or CEO is still acting as the system scheduler for day-to-day operations.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <Database className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold mb-3">The L3/L4 Disconnect</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Enterprises overspend on Technology (L3) while scoring poorly on Data Intelligence (L4). They have expensive ERPs, but the systems do not talk to each other, resulting in zero real-time operational sensing.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <Shield className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Reactive Governance (L5)</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Only 12% of indexed companies have proactive L5 Governance. The vast majority rely on "root access" (executive escalation) to solve exceptions, rather than having built-in system constraints and authority matrices.
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#3b82f6]/10 to-[#ec4899]/10 border border-[#3b82f6]/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Are you an informal micro-business?</h3>
              <p className="text-gray-400 text-sm max-w-2xl">
                The AEHI also tracks the grassroots economy through the <strong>AEHI Vitals Score</strong>. We use conversational data from our WhatsApp bot to measure Cash Velocity, Supplier Dependency, and Capital Retention for market traders.
              </p>
            </div>
            <Link href="/core" className="shrink-0 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap">
              Explore Crelligent Core
            </Link>
          </div>
        </section>

        {/* What We Measure: The 5 Layers */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4">How we measure OS Health</h2>
            <p className="text-gray-400">
              The AEHI evaluates enterprises across the five foundational layers of the ESRE OS. A failure in any lower layer compounds as it moves up the stack.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'L1', name: 'Business Design', subtitle: 'The Kernel', desc: 'Is the fundamental business logic sound? Are the boundaries, unit economics, and value propositions clearly codified?' },
              { id: 'L2', name: 'Operating Model & Process', subtitle: 'The Scheduler', desc: 'How does work flow? Is execution dependent on heroic individual effort, or are processes mapped and decoupled from specific people?' },
              { id: 'L3', name: 'Technology & Platform', subtitle: 'Infrastructure Layer', desc: 'Does the technology support the L2 processes? Is the infrastructure scalable, or is it a patched-together legacy system?' },
              { id: 'L4', name: 'Data & Intelligence', subtitle: 'Sensing Layer', desc: 'Can the enterprise see itself? Is there real-time telemetry and feedback loops that detect operational drift before failure?' },
              { id: 'L5', name: 'Governance, Risk & Control', subtitle: 'Security Layer', desc: 'Who has the authority to change the system? Are risks contained, or can a single failure mode bring down the entire enterprise?' },
            ].map((layer, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white/[0.04] transition-colors">
                <div className="w-16 h-16 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">
                  {layer.id}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{layer.name}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded-full text-gray-400">{layer.subtitle}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sector Benchmarks */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">OS Performance by Sector</h2>
            <p className="text-gray-400 max-w-2xl">
              Average health scores across the 5 ESRE OS Core layers. Use this table to benchmark your own organization against your specific industry peers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.01]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-5 px-6 font-medium text-gray-300 text-sm">Sector</th>
                  <th className="py-5 px-4 font-medium text-blue-400 text-sm text-center">AEHI Score</th>
                  <th className="py-5 px-4 font-medium text-gray-400 text-sm text-center">L1</th>
                  <th className="py-5 px-4 font-medium text-gray-400 text-sm text-center">L2</th>
                  <th className="py-5 px-4 font-medium text-gray-400 text-sm text-center">L3</th>
                  <th className="py-5 px-4 font-medium text-gray-400 text-sm text-center">L4</th>
                  <th className="py-5 px-4 font-medium text-gray-400 text-sm text-center">L5</th>
                </tr>
              </thead>
              <tbody>
                {sectorData.map((sector, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="py-6 px-6 font-medium">{sector.name}</td>
                    <td className="py-6 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        {sector.score}
                      </span>
                    </td>
                    <td className="py-6 px-4 text-center text-gray-300">{sector.l1}</td>
                    <td className="py-6 px-4 text-center text-gray-300">
                      <span className={sector.l2 < 60 ? 'text-amber-400 font-medium' : ''}>{sector.l2}</span>
                    </td>
                    <td className="py-6 px-4 text-center text-gray-300">{sector.l3}</td>
                    <td className="py-6 px-4 text-center text-gray-300">
                      <span className={sector.l4 < 60 ? 'text-amber-400 font-medium' : ''}>{sector.l4}</span>
                    </td>
                    <td className="py-6 px-4 text-center text-gray-300">{sector.l5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Diagnostic Engine / Methodology */}
        <section id="methodology" className="px-6 max-w-7xl mx-auto mb-32">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500" />
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">How the Index is calculated</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  The AEHI is powered by the Crelligent ESRE AI Engine. When an enterprise undergoes an ESRE Diagnostic, our models evaluate 45 unique data points across the 5 OS Core layers.
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  These inputs are aggregated, anonymized, and weighted to produce a composite OS Performance Score. We penalize heavily for "weakest link" failures—because a brilliant L1 strategy cannot survive a broken L2 process.
                </p>
                <ul className="space-y-4">
                  {[
                    { text: 'Objective, data-driven layer assessments (45 metrics)', icon: Database },
                    { text: 'Dynamic weighting penalizing lower-layer vulnerabilities', icon: BarChart3 },
                    { text: 'Strictly anonymized sector aggregation', icon: Shield },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                      <item.icon className="w-5 h-5 text-blue-400" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Diagnostic Output Example</div>
                      <div className="font-semibold text-amber-400">L2 Vulnerability Detected</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <Workflow className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[45%]" />
                    </div>
                    <div className="text-sm text-gray-400">
                      Operating Model (L2) score of 45 falls significantly below the sector average of 58. High dependency on founder execution limits scale.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">Find out where your enterprise breaks.</h2>
          <p className="text-xl text-gray-400 mb-10">
            Stop relying on trailing financial indicators. Benchmark your operational execution capacity against the best in Africa.
          </p>
          <Link href="https://client.crelligent.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Run an ESRE Diagnostic <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ArrowRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  )
}
