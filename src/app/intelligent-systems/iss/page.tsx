import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  Camera,
  Lock,
  ScanFace,
  Radio,
  Wind,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'Intelligent Security Systems (ISS) | Crelligent',
  description:
    'Threat detection, behavioural analytics, and security operations intelligence for Nigerian estates, campuses, airports, factories, and government facilities.',
}

const hardware = [
  { icon: Camera, name: 'CCTV Systems', description: 'AI-enabled IP cameras with real-time video analytics and cloud archiving.' },
  { icon: Lock, name: 'Biometric Access Control', description: 'Fingerprint, iris, and card-based access management for secure zones.' },
  { icon: ScanFace, name: 'Facial Recognition', description: 'Real-time identity verification and watchlist matching at entry points.' },
  { icon: Radio, name: 'Perimeter Sensors', description: 'Infrared, microwave, and fence vibration sensors for perimeter breach detection.' },
  { icon: Wind, name: 'Drone Surveillance', description: 'Autonomous UAV patrol systems for large perimeters and remote monitoring.' },
  { icon: Camera, name: 'License Plate Recognition', description: 'ANPR cameras for vehicle access control and movement tracking.' },
]

const capabilities = [
  'Threat detection using AI video and sensor analytics',
  'Behavioural anomaly detection for proactive security',
  'Incident prediction based on historical patterns',
  'Security operations intelligence and response coordination',
  'Access audit trails and compliance reporting',
  'Integrated alarm management and escalation workflows',
]

const customers = [
  'Residential Estates',
  'University Campuses',
  'Airports & Ports',
  'Factories & Plants',
  'Government Facilities',
  'Shopping Malls',
  'Banks & Financial Institutions',
]

export default function ISSPage() {
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
              Intelligent Security Systems
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-500 uppercase tracking-widest">
              Roadmap
            </span>
          </div>

          <h1 className="heading-xl mb-6 max-w-4xl">
            Create Integrated Physical Security Intelligence.
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mb-10 leading-relaxed">
            ISS connects CCTV, biometric access, facial recognition, perimeter sensors, and drone
            surveillance into a unified security intelligence layer — enabling proactive threat
            detection and coordinated response.
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
                team will notify you when ISS pilot deployments become available.
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
          <h2 className="heading-lg mb-6">Register Interest in ISS</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Be among the first to know when Intelligent Security Systems launches. Register your
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
