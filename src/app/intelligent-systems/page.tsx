'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { motion } from 'framer-motion'
import {
  ArrowRight, Cpu, Radio, Zap, Shield, Cloud, CheckCircle,
  Brain, Battery, Lock, Truck, Factory, Building2, Heart,
  Leaf, Eye, ShoppingBag, CreditCard, Warehouse
} from 'lucide-react'

/* ─────────────── animation variants ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

/* ─────────────── hardware products ─────────────── */

const hardwareProducts = [
  {
    id: 'cen',
    name: 'Crelligent Edge Node',
    abbr: 'CEN',
    tagline: 'Industrial Edge Intelligence Hub',
    description:
      'Connects legacy industrial machines and modern sensors into a unified data system. Aggregates, processes, stores, and transmits data from multiple sources.',
    image: '/images/Crelligent Edge Node (CEN).png',
    specs: ['ESP32-S3 + nRF9160', 'RS-485 · Modbus · 4–20mA · Ethernet', '12–24V DC + Battery Backup', 'LoRa SX1262'],
    color: '#f59e0b',
  },
  {
    id: 'esa',
    name: 'Environmental Sensor Array',
    abbr: 'ESA',
    tagline: 'Multi-Parameter Environmental Intelligence',
    description:
      'Real-time environmental monitoring — air quality, climate, and compliance. Pharmaceutical cold chains, cleanrooms, and food storage.',
    image: '/images/Environmental Sensor Array.png',
    specs: ['STM32 + LoRa SX1262', '7 Environmental Sensors', '1–3 Year Battery Life', 'NAFDAC / HACCP Ready'],
    color: '#22c55e',
  },
  {
    id: 'sem',
    name: 'Smart Energy Monitor',
    abbr: 'SEM',
    tagline: 'Circuit-Level Energy Intelligence',
    description:
      'Non-invasive energy monitoring via CT clamps. Per-tenant billing, generator optimization, and ESG carbon tracking without rewiring.',
    image: '/images/Smart Energy Monitor.png',
    specs: ['STM32 + Precision AFE', 'Multi-Channel CT Clamps', 'WiFi / Cellular', 'Spike & Anomaly Detection'],
    color: '#3b82f6',
  },
  {
    id: 'tlm',
    name: 'Tank Level Monitor',
    abbr: 'TLM',
    tagline: 'Non-Contact Liquid Intelligence',
    description:
      'Ultrasonic or pressure-based tank monitoring with real-time fuel theft detection and automated replenishment triggers.',
    image: '/images/Tank Level Monitor.png',
    specs: ['STM32 + nRF9160', 'Ultrasonic / Pressure Sensor', 'Cellular Connectivity', 'Anomaly Detection'],
    color: '#8b5cf6',
  },
  {
    id: 'cep',
    name: 'Crelligent Edge Panel',
    abbr: 'CEP',
    tagline: 'Industrial Touch Interface',
    description:
      'Rugged touchscreen for on-site monitoring and operator control. Factory floors, warehouses, and depot stations.',
    image: '/images/Crelligent Edge Panel (CEP).png',
    specs: ['7″ / 10″ Touchscreen', 'Qualcomm Snapdragon', 'Android Edge UI', '12V DC / Mains Powered'],
    color: '#ec4899',
  },
  {
    id: 'ocd',
    name: 'Operations Command Display',
    abbr: 'OCD',
    tagline: 'Enterprise Operations Intelligence',
    description:
      'Large-format display for centralized command visibility — fleet operations, manufacturing control rooms, and executive dashboards.',
    image: '/images/operations command display.png',
    specs: ['43″–65″ Display', 'Snapdragon Compute Module', 'Multi-Feed Visualization', 'Real-time Data Sync'],
    color: '#f59e0b',
  },
]

/* ─────────────── helpers ─────────────── */

const layerColors: Record<string, string> = {
  L1: '#f59e0b',
  L2: '#3b82f6',
  L3: '#8b5cf6',
  L4: '#22c55e',
  L5: '#ec4899',
}

const layers = [
  {
    id: 'L1',
    label: 'FIELD LAYER',
    name: 'Crelligent Edge Module (CEM)',
    desc: 'Purpose-built IoT hardware deployed at the point of operation — vehicles, generators, tanks, machines, buildings, soil, retail counters.',
  },
  {
    id: 'L2',
    label: 'CONNECTIVITY LAYER',
    name: '4G/LTE | LoRa | Wi-Fi | GPRS',
    desc: 'Designed for Nigerian and African network conditions. Offline-resilient with local data buffering when connectivity drops.',
  },
  {
    id: 'L3',
    label: 'DATA PLATFORM LAYER',
    name: 'CEIP — Crelligent Edge Intelligence Platform',
    desc: 'Real-time telemetry ingestion, normalisation, and event processing. Every data point structured for intelligence, not just storage.',
  },
  {
    id: 'L4',
    label: 'INTELLIGENCE LAYER',
    name: 'PRISM — Enterprise Intelligence Operating System',
    desc: 'Anomaly detection. Pattern recognition. Predictive analytics. AI-powered conversational queries. The command centre for operations.',
  },
  {
    id: 'L5',
    label: 'COMMAND LAYER',
    name: 'Executive Command Centre',
    desc: 'One screen. Real-time operational state of the entire organization. Configurable per industry and per role.',
  },
]

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
    slug: 'its',
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
    slug: 'ies',
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
    slug: 'ils',
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
    slug: 'iis',
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
    slug: 'ibs',
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
    slug: 'ihs',
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
    slug: 'ias',
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
    slug: 'iss',
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
    slug: 'irs',
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
    slug: 'ifis',
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

const prismQuestions = [
  'What is happening right now across every site, vehicle, and asset in our operation?',
  'Where are we losing money — fuel, time, inventory, or downtime — and why?',
  'What will fail next, and when should we act before it does?',
  'Who needs to know what, right now, to make the right call?',
]

const deploymentSteps = [
  {
    week: 'Week 1–2',
    title: 'OPERATIONAL ASSESSMENT',
    desc: 'We map your existing operations, asset inventory, connectivity landscape, and data gaps. No assumptions — we understand your business first.',
    activities: [
      'Site surveys and physical infrastructure mapping',
      'Integration requirements for legacy systems',
      'Definition of operational KPIs and alert thresholds',
      'Connectivity strength testing (GSM/LoRa)'
    ]
  },
  {
    week: 'Week 3–6',
    title: 'HARDWARE DEPLOYMENT',
    desc: 'CEM devices are installed, commissioned, and verified. Field engineers validate signal quality, sensor calibration, and data flow from every connected point.',
    activities: [
      'Physical installation of edge nodes and sensors',
      'Power integration (Mains/Generator/Solar/Battery)',
      'Signal calibration and baseline data testing',
      'Security encryption keys provisioning'
    ]
  },
  {
    week: 'Week 7–10',
    title: 'PLATFORM CONFIGURATION',
    desc: 'PRISM is configured to your industry vertical, organizational structure, and KPI framework. Dashboards, alerts, and workflows are built for your team.',
    activities: [
      'Custom dashboard creation per user role',
      'Alerting thresholds and escalation workflows',
      'Historical data migration (if applicable)',
      'AI conversational model fine-tuning'
    ]
  },
  {
    week: 'Week 11–12',
    title: 'COMMAND HANDOVER',
    desc: 'Your operations team is trained, the command centre goes live, and Crelligent remains on-hand for the first 30 days of full operation.',
    activities: [
      'Executive and operator platform training sessions',
      'Command centre physical display setup',
      'User acceptance testing (UAT)',
      'Transition to 24/7 SLA support phase'
    ]
  },
]

/* ─────────────── page ─────────────── */

export default function IntelligentSystemsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />

      {/* ── SECTION 1 — HERO ── */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#f59e0b]/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* LEFT — Text content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-medium">
                  Operational Intelligence Infrastructure
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="heading-xl font-outfit mb-6"
              >
                One Architecture.{' '}
                <span className="text-[#f59e0b]">Ten Industries.</span>{' '}
                The Intelligence Layer African Operations Have Never Had.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-xl text-gray-400 max-w-xl leading-relaxed mb-10"
              >
                Crelligent Intelligent Systems deploys operational intelligence infrastructure across
                African industry — connecting the physical world of assets, vehicles, energy, and
                transactions to a unified command intelligence layer powered by PRISM.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link href="/contact" className="btn-primary">
                  Request a Deployment Assessment
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Link>
                <Link href="https://prism.crelligent.com" className="btn-ghost">
                  Explore PRISM
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-start gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
              >
                {['10 Industry Verticals', '5-Layer Architecture', '12-Week Deployment'].map((stat) => (
                  <div key={stat} className="px-6 first:pl-0 py-3 text-sm text-gray-400 tracking-wide">
                    {stat}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — CEP Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex items-center justify-center lg:justify-end lg:-mt-12"
            >
              <div className="relative w-full">
                <div className="hero-product-glow animate-pulse-glow" />
                <div className="animate-float">
                  <Image
                    src="/images/Crelligent Edge Panel (CEP).png"
                    alt="Crelligent Edge Panel — Industrial Touch Interface"
                    width={850}
                    height={700}
                    className="w-full max-w-[700px] xl:max-w-[850px] h-auto drop-shadow-[0_20px_60px_rgba(245,158,11,0.15)]"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT STRIP ── */}
      <section className="bg-[#080808] border-y border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <h2 className="text-[15px] font-medium text-white mb-8 tracking-wide">
              Our <span className="font-semibold">Products</span>
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-6">
              {hardwareProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`group flex flex-col items-center px-3 py-4 cursor-default transition-all duration-300 hover:bg-white/[0.03] rounded-lg ${
                    i < hardwareProducts.length - 1 ? 'md:border-r md:border-white/[0.06] md:rounded-none' : ''
                  }`}
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-500 text-center leading-tight group-hover:text-white transition-colors duration-300">
                    {product.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2 — THE ARCHITECTURE ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">The Architecture</motion.div>
            <motion.h2 variants={fadeUp} className="heading-lg font-outfit mb-6">
              Not Ten Products. One Platform Applied Across Ten Verticals.
            </motion.h2>
            <motion.div variants={fadeUp} className="max-w-3xl space-y-4 text-gray-400 leading-relaxed mb-14">
              <p>
                Most technology companies build a separate product for each industry — a fleet
                solution here, an energy monitoring tool there. The result is fragmented data,
                duplicated costs, and no single view of the business.
              </p>
              <p>
                Crelligent Intelligent Systems is built differently. We designed one architecture —
                five layers from hardware to executive command — and we apply that same architecture
                across every industry we enter. The hardware changes. The platform stays the same.
              </p>
              <p>
                This means an organisation operating across logistics, energy, and retail gets one
                command centre, one intelligence layer, and one team. Not three vendors, three
                dashboards, and three contracts.
              </p>
            </motion.div>
          </motion.div>

          {/* 5-layer stack */}
          <motion.div
            className="max-w-2xl space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {layers.map((layer, i) => {
              const color = layerColors[layer.id]
              const isLast = i === layers.length - 1
              return (
                <motion.div key={layer.id} className="relative" variants={fadeUp}>
                  {/* connector line */}
                  {!isLast && (
                    <div
                      className="absolute left-6 top-full w-0.5 h-6 z-10"
                      style={{
                        background: `linear-gradient(to bottom, ${color}66, transparent)`,
                      }}
                    />
                  )}
                  <div className="flex gap-4 p-6 bg-[#111] border border-white/5 rounded-xl mb-6 hover:border-white/10 transition-colors duration-300">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-semibold"
                      style={{
                        background: `${color}1a`,
                        border: `1px solid ${color}33`,
                        color,
                      }}
                    >
                      {layer.id}
                    </div>
                    <div>
                      <div
                        className="text-xs uppercase tracking-widest mb-1"
                        style={{ color }}
                      >
                        {layer.label}
                      </div>
                      <h4 className="text-white font-light mb-1">{layer.name}</h4>
                      <p className="text-sm text-gray-500">{layer.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3 — THE TEN VERTICALS ── */}
      <section className="bg-[#050505] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Industry Verticals</motion.div>
            <motion.h2 variants={fadeUp} className="heading-lg font-outfit mb-4">
              Ten Industries. One Shared Intelligence Architecture.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mb-12 leading-relaxed">
              We enter each vertical with the same methodology: design the operating model first,
              then deploy the intelligence infrastructure that serves it.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {verticals.map((v) => (
              <motion.div key={v.slug} variants={fadeUp}>
                <Link
                  href={`/intelligent-systems/${v.slug}`}
                  className="group relative rounded-xl border border-white/5 bg-[#0a0a0a] p-8 hover:border-white/10 hover:bg-[#0f0f0f] transition-all block"
                >
                  {/* top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-mono font-light text-white/20">{v.num}</span>
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `${v.iconColor}1a`,
                          border: `1px solid ${v.iconColor}33`,
                          color: v.iconColor,
                        }}
                      >
                        {v.icon}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${statusStyles[v.status]}`}
                    >
                      {v.status}
                    </span>
                  </div>

                  {/* name + desc */}
                  <h3 className="text-lg font-light text-white mb-1">{v.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{v.desc}</p>

                  {/* connect / deliver */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div
                        className="uppercase tracking-widest mb-2 text-[10px]"
                        style={{ color: v.iconColor }}
                      >
                        What we connect
                      </div>
                      <ul className="space-y-1 text-gray-400">
                        {v.connect.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[#22c55e] uppercase tracking-widest mb-2 text-[10px]">
                        What we deliver
                      </div>
                      <ul className="space-y-1 text-gray-400">
                        {v.deliver.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* footer row */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-gray-600">{v.sectors}</span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3.5 — HARDWARE PRODUCT SUITE ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#f59e0b]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">The Hardware Suite</motion.div>
            <motion.h2 variants={fadeUp} className="heading-lg font-outfit mb-6">
              Six Devices. One Unified Intelligence Ecosystem.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-3xl mb-16 leading-relaxed">
              Purpose-built hardware designed for African operating conditions — from edge nodes
              that survive generator surges to command displays that visualise your entire
              operation. Every device feeds data into PRISM for real-time operational intelligence.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {hardwareProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleUp}
                className="group relative rounded-2xl border border-white/[0.06] bg-[#0d0d0d] overflow-hidden hover:border-white/[0.15] transition-all duration-500"
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Glow beneath product */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 rounded-full blur-[60px] opacity-[0.12] group-hover:opacity-[0.28] transition-opacity duration-700"
                    style={{ background: product.color }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 border-t border-white/[0.04]">
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium"
                    style={{ color: product.color }}
                  >
                    {product.tagline}
                  </div>
                  <h3 className="text-lg font-light text-white mb-1.5">
                    {product.name}{' '}
                    <span className="text-sm text-gray-600">({product.abbr})</span>
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{product.description}</p>

                  {/* Key specs */}
                  <div className="space-y-2">
                    {product.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2.5 text-xs text-gray-400">
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: product.color }}
                        />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── SECTION 5 — PRISM CONNECTION ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">The Intelligence Platform</motion.div>
            <motion.h2 variants={fadeUp} className="heading-lg font-outfit mb-6">
              Every Sensor Feeds PRISM. Every Alert Reaches the Right Person.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-3xl leading-relaxed mb-4">
              Data without intelligence is noise. The CEM hardware is the nervous system;
              PRISM is the brain. Every telemetry point — every GPS coordinate, fuel level
              reading, voltage spike, or transaction record — flows into PRISM, where it is
              structured, analysed, and transformed into operational intelligence.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-3xl leading-relaxed mb-8">
              PRISM doesn&apos;t just display data. It answers the questions that operations
              leaders actually need answered:
            </motion.p>
          </motion.div>

          {/* Questions block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-[#111] border border-white/5 rounded-xl space-y-3 mb-12"
          >
            {prismQuestions.map((q) => (
              <div key={q} className="flex items-start gap-3">
                <span className="text-[#22c55e] font-mono mt-0.5">→</span>
                <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
              </div>
            ))}
          </motion.div>

          {/* PRISM cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={scaleUp}>
              <Link
                href="https://prism.crelligent.com"
                className="group glass-card rounded-xl p-8 hover:border-white/10 transition-all block"
              >
                <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center mb-4">
                  <Radio className="w-5 h-5 text-[#22c55e]" />
                </div>
                <h3 className="text-white font-light text-lg mb-2">PRISM Core</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  The enterprise intelligence operating system that unifies telemetry, alerts,
                  dashboards, and workflows across every connected operation.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#22c55e] group-hover:gap-3 transition-all">
                  Explore PRISM Core <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>

            <motion.div variants={scaleUp}>
              <Link
                href="https://prism.crelligent.com#ai"
                className="group glass-card rounded-xl p-8 hover:border-white/10 transition-all block"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <h3 className="text-white font-light text-lg mb-2">PRISM AI</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Conversational intelligence layer. Ask PRISM questions in plain language.
                  Get structured answers from your operational data — no SQL, no BI tools required.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#3b82f6] group-hover:gap-3 transition-all">
                  Explore PRISM AI <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* ── SECTION 7 — DEPLOYMENT PROCESS ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">How It Works</motion.div>
            <motion.h2 variants={fadeUp} className="heading-lg font-outfit mb-14">
              From Assessment to Intelligence in 12 Weeks.
            </motion.h2>
          </motion.div>

          {/* Detailed vertical timeline */}
          <motion.div
            className="relative max-w-4xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {/* Vertical connector line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            {deploymentSteps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16 last:mb-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 top-0 w-12 h-12 rounded-full bg-[#0a0a0a] border border-[#f59e0b]/40 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <span className="text-[#f59e0b] font-mono text-sm">{i + 1}</span>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content card */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="text-xs uppercase tracking-widest text-[#f59e0b] mb-2 font-medium">
                      {step.week}
                    </div>
                    <h4 className="text-xl text-white font-medium mb-3">{step.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {step.desc}
                    </p>
                    
                    {/* Detailed activities list */}
                    <ul className={`space-y-3 ${isEven ? 'md:items-end' : 'items-start'} flex flex-col`}>
                      {step.activities.map((activity, actIdx) => (
                        <li key={actIdx} className={`flex items-start gap-3 text-sm text-gray-300 ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
                          <CheckCircle className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link href="/contact" className="btn-primary">
              Start Your Deployment Assessment
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 8 — PAGE CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* subtle amber glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f59e0b]/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#f59e0b]/5 blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.h2 variants={fadeUp} className="heading-lg font-outfit mb-6">
            Your Operations Are Generating Data Right Now.{' '}
            <span className="text-[#f59e0b]">The Question Is Whether Anyone Can Read It.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-10 text-lg">
            Every vehicle moving, every generator running, every tank filling — all of it
            is data that currently evaporates. Crelligent Intelligent Systems captures that
            data, structures it, and turns it into the operational intelligence your
            leadership team needs to make decisions with confidence. The infrastructure
            exists. The platform is proven. The only question is when you decide to use it.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
            <Link href="/contact" className="btn-primary">
              Request an Assessment
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4"
            >
              Download the CEM Hardware Spec Sheet →
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
