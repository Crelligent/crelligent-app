import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  Cpu,
  Activity,
  Settings,
  Thermometer,
  Server,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Clock,
} from 'lucide-react'

export const metadata = {
  title: 'Intelligent Industrial Systems (IIS) | Crelligent',
  description:
    'Production monitoring, downtime analytics, and predictive maintenance intelligence for Nigerian factories, breweries, cement plants, and industrial facilities.',
}

const hardware = [
  { icon: Activity, name: 'Machine Telemetry', description: 'Vibration, speed, and power sensors attached directly to production machinery.' },
  { icon: Thermometer, name: 'Industrial Sensors', description: 'Temperature, pressure, and flow sensors for process monitoring.' },
  { icon: Settings, name: 'PLC Integrations', description: 'Direct integration with Siemens, Allen-Bradley, and other PLC systems.' },
  { icon: Thermometer, name: 'Environmental Monitors', description: 'Air quality, humidity, and particulate monitoring on the factory floor.' },
  { icon: Server, name: 'Edge Nodes', description: 'On-premises edge compute for real-time data processing without cloud latency.' },
  { icon: Cpu, name: 'SCADA Connectors', description: 'Bidirectional integration with existing SCADA and MES systems.' },
]

const capabilities = [
  'Real-time production monitoring and output tracking',
  'Downtime analytics with root cause identification',
  'Predictive maintenance to prevent unplanned stoppages',
  'Equipment failure prediction using ML models',
  'Quality analytics and defect rate monitoring',
  'Energy consumption per production unit reporting',
]

const customers = [
  'Factories & Plants',
  'Breweries',
  'Cement Plants',
  'Food Processing Facilities',
  'Oil & Gas Operations',
  'Pharmaceutical Manufacturers',
  'Textile & Packaging Plants',
]

export default function IISPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-28 pb-0 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/intelligent-systems"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligent Systems
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3b82f6]/10 border border-[#3b82f6]/30 text-[#3b82f6] uppercase tracking-widest">
              Intelligent Industrial Systems
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] uppercase tracking-widest">
              2025–2026
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Digitize Industrial Operations and Manufacturing Systems.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            IIS connects machine telemetry, PLCs, and industrial sensors to an intelligence layer
            that monitors production, predicts failures, and eliminates unplanned downtime.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Register Interest
            </Link>
            <Link href="/intelligent-systems" className="btn-ghost inline-flex items-center gap-2">
              All Verticals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Note */}
      <section className="py-8 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#f59e0b]/5 border border-[#f59e0b]/20">
            <Clock className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#f59e0b] mb-1">Full Deployment Guide Launching 2025–2026</p>
              <p className="text-sm text-gray-400">
                IIS is in active development with pilot engagements underway. Register your interest
                to be considered for early access deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Hardware Stack</p>
          <h2 className="heading-lg mb-12">What We Connect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardware.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name} className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Intelligence Capabilities</p>
          <h2 className="heading-lg mb-8">What We Deliver</h2>
          <div className="space-y-4 max-w-2xl">
            {capabilities.map((cap) => (
              <div key={cap} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Customers */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Who It's For</p>
          <h2 className="heading-lg mb-8">Ideal Customers</h2>
          <div className="flex flex-wrap gap-3">
            {customers.map((c) => (
              <span
                key={c}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-[#3b82f6]/40 hover:text-white transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Join the IIS Early Access Programme</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Register your facility for consideration in our 2025–2026 pilot deployment programme.
          </p>
          <Link href="/contact" className="btn-primary">
            Register Interest
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
