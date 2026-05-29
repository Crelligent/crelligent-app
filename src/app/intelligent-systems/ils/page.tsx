import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  Package,
  Thermometer,
  ScanBarcode,
  MapPin,
  Server,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Clock,
} from 'lucide-react'

export const metadata = {
  title: 'Intelligent Logistics Systems (ILS) | Crelligent',
  description:
    'End-to-end cargo visibility, delivery prediction, and supply chain intelligence for Nigerian warehouses, ports, e-commerce, and distributors.',
}

const hardware = [
  { icon: ScanBarcode, name: 'RFID Scanners', description: 'Real-time asset and cargo identification across warehouses and transit points.' },
  { icon: Thermometer, name: 'Cold-Chain Sensors', description: 'Temperature and humidity monitoring for perishable goods in transit.' },
  { icon: ScanBarcode, name: 'Warehouse Scanners', description: 'Barcode and QR scanning for inventory control and picking accuracy.' },
  { icon: MapPin, name: 'Cargo Trackers', description: 'GPS and BLE trackers for high-value pallets and containers.' },
  { icon: Server, name: 'Edge Gateways', description: 'On-site edge compute nodes for warehouse-level data aggregation.' },
  { icon: Package, name: 'Smart Label Systems', description: 'Electronic labels and IoT tags for dynamic inventory management.' },
]

const capabilities = [
  'End-to-end cargo visibility from origin to delivery',
  'Delivery time prediction with route intelligence',
  'Inventory optimisation and stock level automation',
  'Route intelligence for last-mile delivery',
  'Cold chain integrity monitoring and alerting',
  'Supplier and carrier performance analytics',
]

const customers = [
  'Warehouses & 3PLs',
  'Ports & Terminals',
  'E-commerce Companies',
  'FMCG Distributors',
  'Courier Companies',
  'Manufacturers',
  'Cold Chain Operators',
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] uppercase tracking-widest">
              2025–2026
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Optimize Supply Chain and Goods Movement with Real-Time Intelligence.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            ILS connects warehouses, cargo, cold chains, and last-mile delivery into a unified
            intelligence layer — giving logistics operators complete visibility from origin to
            destination.
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
                ILS is currently in active development. Pilot deployments are available for
                qualifying logistics enterprises. Register your interest to be considered for early
                access.
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
          <h2 className="heading-lg mb-6">Join the ILS Early Access Programme</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Register your organisation to be considered for pilot deployments launching in 2025–2026.
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
