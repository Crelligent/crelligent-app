import { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {  ArrowRight, Cpu, Radio, Zap, Shield, Microchip, Wifi, Truck, Warehouse, Factory, Building2, LineChart, Store, Stethoscope, ShieldAlert, Leaf , ShoppingBag, CreditCard, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Crelligent Edge | Custom IoT & Embedded Telemetry',
  description: 'We design and deploy custom edge modules (CEM) and embedded systems that extract real-time telemetry from physical assets in low-bandwidth environments.',
}


type StatusType = 'ACTIVE' | '2025-2026' | 'ROADMAP'

const statusStyles: Record<StatusType, string> = {
  ACTIVE: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
  '2025-2026': 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]',
  ROADMAP: 'bg-white/5 border-white/10 text-gray-400',
}

const verticals: {
  num: string
  slug: string
  status: StatusType
  icon: React.ReactNode
  iconColor: string
  name: string
  desc: string
  connect: string[]
  deliver: string[]
  sectors: string
}[] = [
  {
    num: '01',
    slug: 'transport',
    status: 'ACTIVE',
    icon: <Truck className="w-5 h-5" />,
    iconColor: '#f59e0b',
    name: 'Intelligent Transport Systems (ITS)',
    desc: 'Optimize movement of people, vehicles, and transport operations.',
    connect: ['GPS vehicle trackers', 'OBD-II telematics', 'Fuel consumption sensors'],
    deliver: ['Real-time fleet visibility', 'Fuel theft detection', 'Driver behaviour scoring'],
    sectors: 'Logistics · Fuel distributors · FMCGs',
  },
  {
    num: '02',
    slug: 'energy',
    status: 'ACTIVE',
    icon: <Zap className="w-5 h-5" />,
    iconColor: '#3b82f6',
    name: 'Intelligent Energy Systems (IES)',
    desc: 'Monitor, manage, and optimise energy assets across distributed operations.',
    connect: ['Generator telemetry', 'Fuel level sensors', 'Smart energy meters'],
    deliver: ['Uptime dashboards', 'Fuel consumption analytics', 'Predictive maintenance alerts'],
    sectors: 'Telecoms · Banking · Healthcare · Manufacturing',
  },
  {
    num: '03',
    slug: 'logistics',
    status: '2025-2026',
    icon: <Warehouse className="w-5 h-5" />,
    iconColor: '#f59e0b',
    name: 'Intelligent Logistics Systems (ILS)',
    desc: 'End-to-end visibility across warehouses, cold chains, and last-mile delivery.',
    connect: ['RFID / barcode scanners', 'Temperature & humidity sensors', 'Weight sensors'],
    deliver: ['Inventory accuracy', 'Cold-chain compliance', 'Delivery performance metrics'],
    sectors: 'FMCG · Pharma · E-commerce',
  },
  {
    num: '04',
    slug: 'industrial',
    status: '2025-2026',
    icon: <Factory className="w-5 h-5" />,
    iconColor: '#8b5cf6',
    name: 'Intelligent Industrial Systems (IIS)',
    desc: 'Machine-level intelligence for manufacturing and processing facilities.',
    connect: ['Machine vibration sensors', 'Production counters', 'Quality inspection cameras'],
    deliver: ['OEE dashboards', 'Downtime root-cause analysis', 'Predictive maintenance'],
    sectors: 'Manufacturing · Processing · Agro-processing',
  },
  {
    num: '05',
    slug: 'buildings',
    status: 'ROADMAP',
    icon: <Building2 className="w-5 h-5" />,
    iconColor: '#22c55e',
    name: 'Intelligent Building Systems (IBS)',
    desc: 'Smart infrastructure management for commercial and institutional buildings.',
    connect: ['HVAC sensors', 'Access control systems', 'Occupancy detectors'],
    deliver: ['Energy efficiency reports', 'Space utilisation insights', 'Maintenance scheduling'],
    sectors: 'Real estate · Hotels · Government facilities',
  },
  {
    num: '06',
    slug: 'healthcare',
    status: 'ROADMAP',
    icon: <Heart className="w-5 h-5" />,
    iconColor: '#ec4899',
    name: 'Intelligent Health Systems (IHS)',
    desc: 'Remote patient monitoring and medical asset intelligence for African healthcare.',
    connect: ['Patient wearables', 'Medical equipment sensors', 'Cold-chain monitors'],
    deliver: ['Vital sign alerts', 'Equipment uptime tracking', 'Drug storage compliance'],
    sectors: 'Hospitals · Clinics · Pharma distributors',
  },
  {
    num: '07',
    slug: 'agriculture',
    status: 'ROADMAP',
    icon: <Leaf className="w-5 h-5" />,
    iconColor: '#22c55e',
    name: 'Intelligent Agriculture Systems (IAS)',
    desc: 'Data-driven precision farming intelligence for African smallholders and agribusiness.',
    connect: ['Soil moisture sensors', 'Weather stations', 'Irrigation controllers'],
    deliver: ['Irrigation optimisation', 'Yield prediction models', 'Pest risk alerts'],
    sectors: 'Agribusiness · Cooperatives · Development finance',
  },
  {
    num: '08',
    slug: 'security',
    status: 'ROADMAP',
    icon: <Shield className="w-5 h-5" />,
    iconColor: '#3b82f6',
    name: 'Intelligent Security Systems (ISS)',
    desc: 'Integrated physical and cyber security intelligence for critical infrastructure.',
    connect: ['IP cameras', 'Perimeter sensors', 'Access control devices'],
    deliver: ['Unified threat dashboards', 'Intrusion detection alerts', 'Audit trail reporting'],
    sectors: 'Banks · Telecoms · Data centres · Oil & gas',
  },
  {
    num: '09',
    slug: 'retail',
    status: 'ROADMAP',
    icon: <ShoppingBag className="w-5 h-5" />,
    iconColor: '#f59e0b',
    name: 'Intelligent Retail Systems (IRS)',
    desc: 'Store-level intelligence connecting shelf inventory, footfall, and customer behaviour.',
    connect: ['POS transaction feeds', 'Shelf weight sensors', 'People-counting cameras'],
    deliver: ['Sales velocity analytics', 'Stockout prediction', 'Customer flow mapping'],
    sectors: 'Retail chains · FMCG brand owners · Distributors',
  },
  {
    num: '10',
    slug: 'finance',
    status: 'ROADMAP',
    icon: <CreditCard className="w-5 h-5" />,
    iconColor: '#8b5cf6',
    name: 'Intelligent Financial Intelligence Systems (IFIS)',
    desc: 'Transaction intelligence and risk monitoring for African financial services.',
    connect: ['Payment gateway feeds', 'ATM / POS telemetry', 'Core banking APIs'],
    deliver: ['Fraud pattern detection', 'Credit risk scoring', 'Regulatory compliance dashboards'],
    sectors: 'Banks · Fintechs · MFIs · Insurance',
  },
]

export default function CrelligentEdgePage() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#f59e0b]/30 selection:text-white flex flex-col relative overflow-hidden text-white">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#f59e0b]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        
        {/* Hero Section */}
        <section className="px-6 mb-24 max-w-6xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-full text-xs font-semibold tracking-widest text-[#f59e0b] mb-8 uppercase">
                Hardware & Embedded Systems
            </div>
            
            <h1 className="text-5xl md:text-7xl font-[300] tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                We build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">nervous system</span><br />
                for your physical assets.
            </h1>
            
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-12">
                Digital transformation fails when software cannot talk to the physical world. 
                <strong> Crelligent Edge</strong> is our deep-tech engineering division dedicated to designing, 
                building, and deploying custom hardware, IoT telemetry, and embedded systems 
                in extreme industrial environments.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] inline-flex items-center gap-2">
                    Discuss an Edge Deployment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/case-studies/esn-petroleum" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-medium transition-colors inline-flex items-center gap-2">
                    Read the ESN Petroleum Case Study
                </Link>
            </div>
        </section>

        {/* Three Core Offerings */}
        <section className="px-6 mb-32 max-w-7xl mx-auto">
            <h2 className="text-3xl font-[300] tracking-tight text-center mb-16" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Crelligent Edge Engineering Capabilities
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Offering 1 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#f59e0b]/30 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/10 blur-[50px] rounded-full group-hover:bg-[#f59e0b]/20 transition-colors" />
                    <Radio className="w-10 h-10 text-[#f59e0b] mb-6 relative z-10" />
                    <h3 className="text-xl font-medium mb-4 relative z-10">Custom Edge Telemetry</h3>
                    <p className="text-gray-400 font-[200] leading-relaxed relative z-10">
                        We design and deploy bespoke IoT sensors and Crelligent Edge Modules (CEM) 
                        to extract data from legacy physical assets. Whether it's tanker fleets, factory floors, 
                        or remote agricultural outposts, we build hardware that survives and transmits in low-bandwidth environments.
                    </p>
                </div>
                
                {/* Offering 2 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#f59e0b]/30 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/10 blur-[50px] rounded-full group-hover:bg-[#f59e0b]/20 transition-colors" />
                    <Cpu className="w-10 h-10 text-[#f59e0b] mb-6 relative z-10" />
                    <h3 className="text-xl font-medium mb-4 relative z-10">Firmware & RTOS Engineering</h3>
                    <p className="text-gray-400 font-[200] leading-relaxed relative z-10">
                        We write the low-level, fail-safe code (C, C++, Rust) that runs on microcontrollers. 
                        When timing, battery life, memory constraints, and safety are critical, we engineer 
                        Real-Time Operating Systems (RTOS) that do not crash.
                    </p>
                </div>

                {/* Offering 3 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#f59e0b]/30 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/10 blur-[50px] rounded-full group-hover:bg-[#f59e0b]/20 transition-colors" />
                    <Wifi className="w-10 h-10 text-[#f59e0b] mb-6 relative z-10" />
                    <h3 className="text-xl font-medium mb-4 relative z-10">Hardware-to-Cloud Bridging</h3>
                    <p className="text-gray-400 font-[200] leading-relaxed relative z-10">
                        Data at the edge is useless if it cannot reach the decision-makers. 
                        We build secure API gateways, MQTT brokers, and data pipelines that take raw electrical signals 
                        from physical hardware and stream them directly into your ERP or cloud infrastructure.
                    </p>
                </div>
            </div>
        </section>

        
        {/* Industry Solutions Grid */}
        <section className="px-6 mb-32 max-w-7xl mx-auto">
            <h2 className="text-3xl font-[300] tracking-tight text-center mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Edge Industry Solutions
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                10 domain-specific intelligence systems built on top of the Crelligent Edge Module (CEM).
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verticals.map((v) => (
                <div
                  key={v.slug}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative group hover:border-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      {v.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full border ${statusStyles[v.status]}`}
                    >
                      {v.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{v.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">
                    {v.desc}
                  </p>

                  <Link
                    href={`/edge/${v.slug}`}
                    className="inline-flex items-center justify-center w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors gap-2 group-hover:bg-[#f59e0b] group-hover:text-black mt-auto"
                  >
                    View Architecture
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
        </section>

        {/* ESRE OS Context */}
        <section className="px-6 mb-24 max-w-5xl mx-auto">
            <div className="border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl p-12 text-center">
                <Shield className="w-12 h-12 text-[#f59e0b] mx-auto mb-6" />
                <h2 className="text-3xl font-[300] tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The physical foundation of ESRE OS.
                </h2>
                <p className="text-gray-400 font-[200] text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                    Crelligent Edge operates as a standalone engineering service, but it also forms the "Physical Layer" 
                    of our flagship enterprise operating system (ESRE OS). By deploying Crelligent Edge Modules (CEM), 
                    we feed the ESRE OS L4 Sensing Layer with uncorrupted, real-time ground truth.
                </p>
                <Link href="/esre-os" className="text-[#f59e0b] hover:text-[#fbbf24] font-medium inline-flex items-center gap-1">
                    Explore ESRE OS <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  )
}
