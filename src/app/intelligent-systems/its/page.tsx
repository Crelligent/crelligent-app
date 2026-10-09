import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  MapPin,
  Cpu,
  Fuel,
  UserCheck,
  Camera,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Truck,
  AlertTriangle,
  BarChart3,
  Route,
  Wrench,
} from 'lucide-react'

export const metadata = {
  title: 'Intelligent Transport Systems (ITS) | Crelligent | Fleet & Fuel Intelligence',
  description:
    'Real-time fleet visibility, fuel anomaly detection, and driver behaviour scoring for Nigerian logistics, transport, and fuel distribution companies.',
}

const hardware = [
  {
    icon: MapPin,
    name: 'GPS Vehicle Trackers',
    description: 'Precise real-time location tracking for every vehicle in the fleet.',
  },
  {
    icon: Cpu,
    name: 'OBD-II Telematics Devices',
    description: 'Engine diagnostics, speed, idling, and fault code data from every vehicle.',
  },
  {
    icon: Fuel,
    name: 'Fuel Consumption Sensors',
    description: 'Inline sensors that measure fuel draw-off to the millilitre.',
  },
  {
    icon: UserCheck,
    name: 'Driver ID Terminals',
    description: 'Biometric and card-based terminals that authenticate drivers at ignition.',
  },
  {
    icon: Camera,
    name: 'Dashcams & ANPR Cameras',
    description: 'Video evidence and automatic number plate recognition for security.',
  },
]

const capabilities = [
  {
    icon: MapPin,
    title: 'Real-Time Fleet Visibility',
    description:
      'See every vehicle on a live map. Monitor location, speed, idle time, and trip history from a single dashboard.',
  },
  {
    icon: AlertTriangle,
    title: 'Fuel Theft Detection',
    description:
      'AI-powered anomaly models flag unexplained fuel drops, siphoning events, and dispenser discrepancies instantly.',
  },
  {
    icon: BarChart3,
    title: 'Driver Behaviour Scoring',
    description:
      'Score every driver on harsh braking, over-speeding, night driving, and idling to reduce risk and fuel waste.',
  },
  {
    icon: Route,
    title: 'Route Optimisation',
    description:
      'Analyse historical routes to recommend faster, cheaper paths and reduce empty-vehicle kilometres.',
  },
  {
    icon: Wrench,
    title: 'Predictive Maintenance Alerts',
    description:
      'OBD-II data triggers maintenance tickets before breakdowns occur, cutting unplanned downtime.',
  },
]

const customers = [
  'Logistics Companies',
  'Fuel Distributors',
  'FMCG Fleets',
  'Courier Companies',
  'Transport Agencies',
  'Bus Operators',
  'Ports & Terminals',
  'Government Fleets',
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] uppercase tracking-widest">
              ● Active
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Real-Time Intelligence for Every Vehicle in Your Fleet.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            From GPS tracking and OBD-II telematics to fuel anomaly detection and driver behaviour
            scoring — ITS connects your entire transport operation to a single intelligence command
            layer.
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
            ITS deploys the Crelligent Edge Module (CEM) to integrate industry-standard transport
            hardware into a unified intelligence layer.
          </p>

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

      {/* CEM Hardware */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">Edge Hardware</p>
              <h2 className="heading-lg mb-6">The Crelligent Edge Module (CEM)</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every ITS deployment is powered by the CEM — a ruggedised edge compute device
                purpose-built for Nigerian transport environments. It processes GPS, OBD-II, and
                sensor data locally before securely transmitting intelligence to the PRISM platform.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                The CEM operates on 2G/3G/4G with offline buffering, ensuring continuous data
                capture even in low-connectivity corridors across Nigeria.
              </p>
              <Link
                href="/intelligent-systems"
                className="btn-ghost inline-flex items-center gap-2 text-sm"
              >
                View Full Hardware Specifications <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="space-y-4">
                {[
                  '4G LTE + 2G fallback connectivity',
                  'GPS + GLONASS dual-mode positioning',
                  'OBD-II / RS232 / CAN bus interfaces',
                  'Local edge processing & offline buffering',
                  'Tamper detection & secure boot',
                  'Operating temp: −20°C to +70°C',
                  'IP67 dust & water resistance',
                ].map((spec) => (
                  <div key={spec} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                    <span className="text-sm text-gray-300">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
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
          <p className="section-label mb-4">Live Deployment</p>
          <h2 className="heading-lg mb-8">ESN Petroleum Services</h2>

          <div className="glass-card p-8 rounded-2xl max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]">
                ITS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b]">
                IES
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]">
                ● Active
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Fleet + Energy Intelligence for a Nigerian Petroleum Distributor
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              ESN Petroleum Services operates a fleet of fuel tankers and a network of generator
              assets across multiple states. Crelligent deployed ITS for real-time tanker tracking
              and fuel theft prevention, alongside IES for generator monitoring and fuel
              reconciliation at distribution hubs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {[
                { label: 'Vehicles Monitored', value: '40+' },
                { label: 'Fuel Anomalies Flagged', value: '200+ / month' },
                { label: 'Generator Sites', value: '12' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Ready to Connect Your Fleet?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our team will assess your fleet size, routes, and fuel infrastructure and design an ITS
            deployment tailored to your operation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Request a Deployment Assessment
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
