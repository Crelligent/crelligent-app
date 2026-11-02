import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertTriangle,
  BarChart3,
  Bus,
  Camera,
  CloudRain,
  Radar,
  ScanLine,
  Signpost,
  TrafficCone,
} from 'lucide-react'

export const metadata = {
  title: 'Traffic Management Systems (ITS)',
  description:
    'Intelligent traffic management for Nigerian states, traffic agencies, toll road operators, estates, ports and BRT operators: live congestion, adaptive signals and incident response.',
  alternates: { canonical: '/intelligent-systems/its' },
}

const hardware = [
  {
    icon: Camera,
    name: 'Traffic & ANPR Cameras',
    description: 'Vehicle counts, queue lengths and number plate recognition at junctions and corridors.',
  },
  {
    icon: Radar,
    name: 'Vehicle Detectors',
    description: 'Radar and inductive-loop detectors that measure flow and speed lane by lane.',
  },
  {
    icon: TrafficCone,
    name: 'Smart Signal Controllers',
    description: 'Signal controllers that can change timings in response to live traffic.',
  },
  {
    icon: Signpost,
    name: 'Variable Message Signs',
    description: 'Roadside signs that warn drivers of incidents, closures and delays.',
  },
  {
    icon: Bus,
    name: 'Bus & BRT Trackers',
    description: 'Vehicle location for buses and BRT fleets, for schedules and priority at signals.',
  },
  {
    icon: CloudRain,
    name: 'Weather & Flood Sensors',
    description: 'Rain and water-level sensing on roads prone to flooding.',
  },
]

const capabilities = [
  {
    icon: Activity,
    title: 'Live Congestion Picture',
    description: 'See flow, speed and queues across junctions and corridors on one map, updated continuously.',
  },
  {
    icon: TrafficCone,
    title: 'Adaptive Signal Timing',
    description: 'Adjust signal timings to the traffic actually on the road, not fixed plans set years ago.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Detection & Response',
    description: 'Spot crashes, breakdowns and flooding early, and route alerts to the teams who clear them.',
  },
  {
    icon: Bus,
    title: 'Bus & BRT Performance',
    description: 'Track schedule adherence and headways, and give buses priority at signals on key corridors.',
  },
  {
    icon: ScanLine,
    title: 'Toll & Access Analytics',
    description: 'Traffic volumes, peak patterns and plate-based access control for toll roads, estates and ports.',
  },
  {
    icon: BarChart3,
    title: 'Planning Evidence',
    description: 'Historical traffic data that shows where new lanes, signals or enforcement will help most.',
  },
]

const customers = [
  'State Governments',
  'Traffic Management Agencies',
  'Toll & Road Concessionaires',
  'Estates & Campuses',
  'Ports & Terminals',
  'Bus & BRT Operators',
]

export default function ITSPage() {
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
              Intelligent Transport Systems
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-400 uppercase tracking-widest">
              Roadmap
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Traffic Management That Sees the Whole Road Network.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            Cameras, detectors, signals and bus trackers connected to one command view in PRISM, so
            traffic teams can see congestion as it builds, change signal timings and respond to incidents
            faster.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Request an Assessment
            </Link>
            <Link href="https://prism.crelligent.com" className="btn-ghost inline-flex items-center gap-2">
              Explore PRISM <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Connect */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Hardware Layer</p>
          <h2 className="heading-lg mb-4">What We Connect</h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            ITS works with proven, industry-standard traffic equipment, connected into one intelligence
            layer, and with equipment already on the road where possible.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardware.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name} className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl">
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

      {/* What We Deliver */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Intelligence Capabilities</p>
          <h2 className="heading-lg mb-12">What We Deliver</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <div key={cap.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mt-1">
                    <Icon className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{cap.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              )
            })}
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

      {/* Live Deployment */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">How We Would Start</p>
          <h2 className="heading-lg mb-8">One Corridor First</h2>
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl max-w-3xl">
            <p className="text-gray-400 leading-relaxed">
              ITS is on our roadmap. We would begin with one corridor, estate or toll plaza: map the
              traffic problem and the equipment already in place, design the operating model for the team
              that runs it, then connect it to PRISM. The same design then extends across the network.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Planning a Traffic Management Programme?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Talk to us about a corridor, estate or toll road. We start by mapping the problem and the
            equipment you already have.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start a Conversation
            </Link>
            <Link href="https://prism.crelligent.com" className="btn-ghost inline-flex items-center gap-2">
              Explore PRISM Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
