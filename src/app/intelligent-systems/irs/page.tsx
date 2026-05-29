import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  ShoppingCart,
  BarChart3,
  Users,
  Monitor,
  ScanBarcode,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'Intelligent Retail Systems (IRS) | Crelligent',
  description:
    'Demand forecasting, customer analytics, and inventory optimisation for Nigerian restaurants, supermarkets, retail chains, and QSR brands.',
}

const hardware = [
  { icon: Monitor, name: 'POS Terminals', description: 'Smart point-of-sale systems with real-time transaction intelligence.' },
  { icon: ShoppingCart, name: 'Smart Shelves', description: 'Weight-sensing shelves that track stock levels and trigger replenishment.' },
  { icon: Users, name: 'Customer Counters', description: 'People counting and footfall analytics at entrances and zones.' },
  { icon: Monitor, name: 'Kitchen Display Systems', description: 'Digital order management for restaurant and QSR operations.' },
  { icon: ScanBarcode, name: 'RFID Inventory', description: 'Real-time inventory tracking with RFID tags and readers.' },
  { icon: BarChart3, name: 'Digital Signage', description: 'Dynamic price and promotion displays driven by demand intelligence.' },
]

const capabilities = [
  'Demand forecasting to reduce stockouts and overstocking',
  'Customer behaviour analytics and journey mapping',
  'Inventory optimisation with automated replenishment',
  'Dynamic pricing intelligence based on demand signals',
  'Staff scheduling optimisation using footfall data',
  'Shrinkage detection and loss prevention analytics',
]

const customers = [
  'Restaurants & QSR Brands',
  'Supermarkets',
  'Retail Chains',
  'Convenience Stores',
  'Pharmacies',
  'Electronics Retailers',
  'Fashion Retail',
]

export default function IRSPage() {
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-400 uppercase tracking-widest">
              Intelligent Retail Systems
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-500 uppercase tracking-widest">
              Roadmap
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Optimize Retail Operations and Customer Experience.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            IRS connects POS terminals, smart shelves, customer counters, and inventory systems
            into a retail intelligence layer that forecasts demand, optimises stock, and drives
            better customer experiences.
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

      {/* Roadmap Note */}
      <section className="py-8 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/3 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-gray-500 flex-shrink-0 mt-2" />
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">Development Roadmap</p>
              <p className="text-sm text-gray-500">
                This vertical is on our development roadmap. Register your interest below and our
                team will notify you when IRS pilot deployments become available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-4">Hardware Stack</p>
          <h2 className="heading-lg mb-12">Planned Hardware Integrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardware.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name} className="glass-card p-6 rounded-2xl opacity-80">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-200 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
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
          <h2 className="heading-lg mb-8">Planned Intelligence Capabilities</h2>
          <div className="space-y-4 max-w-2xl">
            {capabilities.map((cap) => (
              <div key={cap} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{cap}</span>
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
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-400"
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
          <h2 className="heading-lg mb-6">Register Interest in IRS</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Be among the first to know when Intelligent Retail Systems launches. Register your
            organisation below.
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
