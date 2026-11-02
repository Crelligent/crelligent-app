import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  MapPin,
  Cpu,
  Fuel,
  UserCheck,
  Camera,
  ArrowLeft,
  ArrowRight,
  Truck,
  AlertTriangle,
  BarChart3,
  Route,
  Wrench,
  Thermometer,
  Package,
} from 'lucide-react'

export const metadata = {
  title: 'Fleet, Fuel & Logistics Intelligence (ILS)',
  description:
    'Fleet visibility, fuel anomaly detection, driver behaviour scoring and cargo visibility for Nigerian logistics, fuel distribution, FMCG and courier companies.',
  alternates: { canonical: '/intelligent-systems/ils' },
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
    description: 'Fuel level and consumption sensors for tanks and vehicles.',
  },
  {
    icon: UserCheck,
    name: 'Driver ID Terminals',
    description: 'Biometric and card-based terminals that authenticate drivers at ignition.',
  },
  {
    icon: Camera,
    name: 'Dashcams',
    description: 'Video evidence of incidents and driver behaviour.',
  },
  {
    icon: Thermometer,
    name: 'Cold-Chain Sensors',
    description: 'Temperature and humidity monitoring for perishable goods in transit.',
  },
  {
    icon: Package,
    name: 'Cargo Trackers',
    description: 'GPS and BLE trackers for high-value pallets and containers.',
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
      'Anomaly rules flag unexplained fuel drops, siphoning events, and dispenser discrepancies as they happen.',
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
    icon: Package,
    title: 'Cargo and Cold-Chain Visibility',
    description:
      'Track high-value goods and temperature-sensitive loads from origin to delivery, with alerts when conditions slip.',
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
  'FMCG Fleets & Distributors',
  'Courier & E-commerce',
  'Warehouses & 3PLs',
  'Cold Chain Operators',
  'Government Fleets',
]

export default function ILSPage() {
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
              Intelligent Logistics Systems
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] uppercase tracking-widest">
              Architecture designed
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Real-Time Intelligence for Every Vehicle, Litre and Load.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            From GPS tracking and fuel monitoring to driver scoring and cargo visibility, ILS connects
            your fleet and the goods it carries to one command view in PRISM.
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
            ILS works with proven, industry-standard trackers and sensors, connected into one
            intelligence layer. Crelligent's own edge hardware is in development.
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
          <p className="section-label mb-4">Where It Comes From</p>
          <h2 className="heading-lg mb-8">Fleet Intelligence Designed for a Nigerian Fleet Operator</h2>

          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]">
                ILS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]">
                Architecture designed
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              The design PRISM is built on
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Crelligent designed the architecture of a fleet intelligence system for a Nigerian fleet operator:
              vehicle tracking, fuel monitoring, fuel cards and driver training recommendations in one command
              view. The operator runs it on third-party GPS trackers. PRISM takes that design and makes it
              available to any fleet. Results will be published here once the client has confirmed them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Ready to See Your Fleet and Loads in One View?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We assess your fleet, routes, fuel infrastructure and goods flows, then design an ILS
            deployment for your operation.
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
