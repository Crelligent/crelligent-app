import { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ClientPortalBanner } from '@/components/ClientPortalBanner'
import { ArrowRight, Activity, Database, Server, Workflow } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Public Telemetry Benchmarks | Crelligent',
  description: 'Live performance metrics and telemetry benchmarks from ESRE OS installations across the African mid-market.',
}

export default function TelemetryPage() {
  const benchmarks = [
    {
      sector: "Energy & Petroleum Downstream",
      metrics: [
        { label: "Fleet IoT Uptime (PRISM/CEM)", value: "99.8%", context: "Sustained across low-bandwidth environments" },
        { label: "L2 Process Automation Rate", value: "84%", context: "Reduction in manual scheduler interventions" },
        { label: "Avg. ESRE OS Performance Score", value: "76/100", context: "Post-installation L1-L5 health metric" },
      ]
    },
    {
      sector: "Financial Services & Fintech",
      metrics: [
        { label: "L5 Governance Compliance", value: "100%", context: "Automated isolation and permission enforcement" },
        { label: "API Mesh Latency", value: "< 45ms", context: "L3 Infrastructure layer performance" },
        { label: "Avg. ESRE OS Performance Score", value: "82/100", context: "Post-installation L1-L5 health metric" },
      ]
    },
    {
      sector: "Logistics & Supply Chain",
      metrics: [
        { label: "Asset Telemetry Frequency", value: "1Hz", context: "Real-time edge module (CEM) ingestion" },
        { label: "Drift Detection Speed", value: "< 2 mins", context: "Time from operational anomaly to ESRE AI alert" },
        { label: "Avg. ESRE OS Performance Score", value: "71/100", context: "Post-installation L1-L5 health metric" },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#ec4899]/30 selection:text-white flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex mb-6">
              <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#ec4899] border border-[#ec4899]/20 rounded-full px-4 py-1.5 bg-[#ec4899]/5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ESRE AI Engine
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[300] text-white tracking-tight leading-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Public Telemetry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]">Benchmarks.</span>
            </h1>
            <p className="text-xl text-gray-400 font-[200] max-w-2xl leading-relaxed">
              Aggregated, anonymized telemetry benchmarks ingested from live ESRE OS installations. These metrics train the ESRE AI Engine to detect operational drift before it impacts strategy.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Activity className="w-8 h-8 text-[#ec4899] mb-4" />
                <h3 className="text-lg text-white font-[300] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>PRISM Network Ingestion</h3>
                <p className="text-sm text-gray-400 font-[200]">Physical telemetry from Crelligent Edge Modules (CEM) is processed in real-time, regardless of bandwidth constraints in African terrains.</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Workflow className="w-8 h-8 text-[#3b82f6] mb-4" />
                <h3 className="text-lg text-white font-[300] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>L2 Process Optimization</h3>
                <p className="text-sm text-gray-400 font-[200]">The Scheduler layer eliminates founder bottlenecks by automating resource allocation and providing clear operational pathways.</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Database className="w-8 h-8 text-[#8b5cf6] mb-4" />
                <h3 className="text-lg text-white font-[300] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>ESRE AI Intelligence</h3>
                <p className="text-sm text-gray-400 font-[200]">Every installation generates structured data that improves blueprint precision and diagnostic accuracy for future deployments.</p>
             </div>
          </div>

          <div className="space-y-16">
            <h2 className="text-3xl font-[300] text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Sector Telemetry Standards
            </h2>
            
            <div className="space-y-8">
              {benchmarks.map((sector, idx) => (
                <div key={idx} className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 rounded-3xl p-8 lg:p-10">
                  <h3 className="text-2xl font-[300] text-white mb-8 border-b border-white/5 pb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {sector.sector}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {sector.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                         <div className="text-3xl md:text-4xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                           {metric.value}
                         </div>
                         <div className="text-sm text-white uppercase tracking-widest font-[400] mb-2">
                           {metric.label}
                         </div>
                         <div className="text-xs text-gray-500 font-[200] leading-relaxed">
                           {metric.context}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#ec4899]/10 to-transparent border border-[#ec4899]/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-[300] text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Is your OS running blind?</h3>
              <p className="text-gray-400 font-[200]">Install the sensing layer. See your performance in real time.</p>
            </div>
            <Link href="https://prism.crelligent.com" className="shrink-0 px-8 py-4 rounded-full bg-white text-black font-[400] tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center gap-3 text-sm">
              Discover PRISM
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <ClientPortalBanner />
      <Footer />
    </div>
  )
}
