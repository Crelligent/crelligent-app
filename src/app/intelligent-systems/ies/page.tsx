import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  Zap,
  Gauge,
  Droplets,
  Thermometer,
  Activity,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Settings,
  TrendingDown,
  Wrench,
} from 'lucide-react'

export const metadata = {
  title: 'Intelligent Energy Systems (IES) | Crelligent | Generator & Energy Intelligence',
  description:
    'Generator monitoring, fuel reconciliation, and energy optimisation intelligence for Nigerian enterprises — telecom towers, banks, hospitals, and factories.',
}

const hardware = [
  {
    icon: Gauge,
    name: 'Smart Energy Meters',
    description: 'Measure consumption at the load level — per circuit, per machine, per facility.',
  },
  {
    icon: Settings,
    name: 'Generator Controllers',
    description:
      'Interface with genset control panels to capture runtime, load, and fault data in real time.',
  },
  {
    icon: Droplets,
    name: 'Tank Level Sensors',
    description: 'Ultrasonic and probe sensors that track diesel tank volumes to within 1%.',
  },
  {
    icon: Activity,
    name: 'Clamp Sensors',
    description:
      'Non-invasive current clamp sensors for monitoring electrical load without interrupting circuits.',
  },
  {
    icon: Thermometer,
    name: 'Environmental Monitors',
    description: 'Temperature, humidity, and air quality sensors for genset room conditions.',
  },
]

const capabilities = [
  {
    icon: BarChart3,
    title: 'Energy Consumption Monitoring',
    description:
      'Real-time dashboards showing kWh usage by asset, building, and time period — with cost attribution.',
  },
  {
    icon: Settings,
    title: 'Generator Runtime Optimisation',
    description:
      'Intelligently schedule generator cycles to reduce unnecessary runtime and extend equipment lifespan.',
  },
  {
    icon: AlertTriangle,
    title: 'Fuel Anomaly Detection',
    description:
      'Cross-reference generator runtime with tank drawdown to flag theft, leaks, or metering errors.',
  },
  {
    icon: TrendingDown,
    title: 'Load Balancing Intelligence',
    description:
      'Identify overloaded circuits and underutilised capacity to reduce energy waste and equipment stress.',
  },
  {
    icon: Wrench,
    title: 'Predictive Maintenance',
    description:
      'Vibration, temperature, and runtime data trigger maintenance alerts before costly breakdowns occur.',
  },
]

const customers = [
  'Telecom Tower Operators',
  'Banks & Financial Institutions',
  'Factories & Plants',
  'Hospitals & Clinics',
  'Residential Estates',
  'Fuel Stations',
  'Data Centres',
  'Universities & Schools',
]

export default function IESPage() {
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] uppercase tracking-widest">
              Intelligent Energy Systems
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] uppercase tracking-widest">
              ● Active
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Monitor Every Watt. Detect Every Fuel Anomaly. Optimise Every Generator.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            From smart energy meters and generator controllers to tank level sensors and
            environmental monitors — IES connects your energy infrastructure to a real-time
            intelligence command layer.
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
            IES deploys the Crelligent Edge Module (CEM) to unify energy hardware from diverse
            manufacturers into a single intelligence platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardware.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name} className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#f59e0b]" />
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
              <h2 className="heading-lg mb-6">The Crelligent Edge Module (CEM) for Energy</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every IES deployment is powered by the CEM, configured for energy monitoring. It
                aggregates data from meters, sensors, and generator controllers, processes anomalies
                locally, and transmits intelligence to PRISM in real time.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                With support for Modbus, RS485, and 4–20mA interfaces, the CEM integrates with
                virtually every energy device on the market — no proprietary lock-in.
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
                  'Modbus RTU / Modbus TCP support',
                  'RS485 & 4–20mA sensor inputs',
                  'Pulse counter for energy meter integration',
                  '4G LTE with offline buffering',
                  'Local anomaly processing at the edge',
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

      {/* The Nigerian Energy Problem */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Context</p>
          <h2 className="heading-lg mb-6">Built for the Nigerian Energy Reality</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: '4,000+',
                label: 'Hours of annual grid downtime in some Nigerian states',
                color: '#f59e0b',
              },
              {
                stat: '40–60%',
                label: 'Of operational costs attributed to diesel generation for enterprises',
                color: '#3b82f6',
              },
              {
                stat: '₦billions',
                label: 'Lost annually to diesel theft and fuel metering fraud',
                color: '#22c55e',
              },
            ].map((item) => (
              <div key={item.label} className="glass-card p-6 rounded-2xl">
                <div
                  className="text-3xl font-bold mb-3"
                  style={{ color: item.color }}
                >
                  {item.stat}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Customers */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Who It's For</p>
          <h2 className="heading-lg mb-8">Ideal Customers</h2>
          <div className="flex flex-wrap gap-3">
            {customers.map((c) => (
              <span
                key={c}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-[#f59e0b]/40 hover:text-white transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-8">
            <Zap className="w-8 h-8 text-[#f59e0b]" />
          </div>
          <h2 className="heading-lg mb-6">Start Monitoring Your Energy Infrastructure</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our team will audit your generator assets, fuel procurement process, and energy
            consumption patterns to design an IES deployment that pays for itself.
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
