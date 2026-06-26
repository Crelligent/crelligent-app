import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
  ArrowRight, Cpu, Radio, Zap, Shield, Cloud, CheckCircle,
  Brain, Battery, Lock, Truck, Factory, Building2, Heart,
  Leaf, Eye, ShoppingBag, CreditCard, Warehouse
} from 'lucide-react'

export const metadata = {
  title: 'Crelligent Intelligent Systems | Operational Intelligence for African Industry',
  description:
    'One reusable operational intelligence architecture deployed across ten African industry verticals. IoT hardware, PRISM platform, and real-time command intelligence — built for African operating conditions.',
  keywords:
    'intelligent systems Nigeria, IoT Africa, fleet intelligence Nigeria, operational intelligence platform, PRISM enterprise, industrial IoT West Africa, fuel monitoring Nigeria, generator monitoring Africa',
}

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
  },
  {
    week: 'Week 3–6',
    title: 'HARDWARE DEPLOYMENT',
    desc: 'CEM devices are installed, commissioned, and verified. Field engineers validate signal quality, sensor calibration, and data flow from every connected point.',
  },
  {
    week: 'Week 7–10',
    title: 'PLATFORM CONFIGURATION',
    desc: 'PRISM is configured to your industry vertical, organizational structure, and KPI framework. Dashboards, alerts, and workflows are built for your team.',
  },
  {
    week: 'Week 11–12',
    title: 'COMMAND HANDOVER',
    desc: 'Your operations team is trained, the command centre goes live, and Crelligent remains on-hand for the first 30 days of full operation.',
  },
]

/* ─────────────── page ─────────────── */

export default function IntelligentSystemsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />

      {/* ── SECTION 1 — HERO ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 mb-8">
            <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-medium">
              Operational Intelligence Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="heading-xl font-outfit mb-6">
            One Architecture.{' '}
            <span className="text-[#f59e0b]">Ten Industries.</span>{' '}
            The Intelligence Layer African Operations Have Never Had.
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Crelligent Intelligent Systems deploys operational intelligence infrastructure across
            African industry — connecting the physical world of assets, vehicles, energy, and
            transactions to a unified command intelligence layer powered by PRISM.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contact" className="btn-primary">
              Request a Deployment Assessment
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
            <Link href="https://prism.crelligent.com" className="btn-ghost">
              Explore PRISM
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {['10 Industry Verticals', '5-Layer Architecture', '12-Week Deployment'].map((stat) => (
              <div key={stat} className="px-10 py-3 text-sm text-gray-400 tracking-wide">
                {stat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — THE ARCHITECTURE ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">The Architecture</div>
          <h2 className="heading-lg font-outfit mb-6">
            Not Ten Products. One Platform Applied Across Ten Verticals.
          </h2>
          <div className="max-w-3xl space-y-4 text-gray-400 leading-relaxed mb-14">
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
          </div>

          {/* 5-layer stack */}
          <div className="max-w-2xl space-y-0">
            {layers.map((layer, i) => {
              const color = layerColors[layer.id]
              const isLast = i === layers.length - 1
              return (
                <div key={layer.id} className="relative">
                  {/* connector line */}
                  {!isLast && (
                    <div
                      className="absolute left-6 top-full w-0.5 h-6 z-10"
                      style={{
                        background: `linear-gradient(to bottom, ${color}66, transparent)`,
                      }}
                    />
                  )}
                  <div className="flex gap-4 p-6 bg-[#111] border border-white/5 rounded-xl mb-6">
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
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — THE TEN VERTICALS ── */}
      <section className="bg-[#050505] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-4">Industry Verticals</div>
          <h2 className="heading-lg font-outfit mb-4">
            Ten Industries. One Shared Intelligence Architecture.
          </h2>
          <p className="text-gray-400 max-w-2xl mb-12 leading-relaxed">
            We enter each vertical with the same methodology: design the operating model first,
            then deploy the intelligence infrastructure that serves it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verticals.map((v) => (
              <Link
                key={v.slug}
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
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CEM HARDWARE ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-4">The Hardware</div>
          <h2 className="heading-lg font-outfit mb-6">
            Purpose-Built for African Operating Conditions.
          </h2>
          <p className="text-gray-400 max-w-3xl mb-12 leading-relaxed">
            Off-the-shelf industrial IoT hardware is designed for European warehouses and
            American logistics networks. It assumes stable power, reliable connectivity, and
            controlled environments. African operations demand something different — hardware
            that survives generator surges, 45°C heat, intermittent GSM coverage, and the
            physical realities of field deployment. The Crelligent Edge Module (CEM) was
            designed for exactly that.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT — specs card */}
            <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-8">
              <div className="text-xs uppercase tracking-widest text-[#f59e0b] mb-1">
                Crelligent Edge Module (CEM)
              </div>
              <div className="text-sm text-gray-500 mb-8">Gen 1 — Industrial IoT for Africa</div>

              <div className="space-y-6 font-mono text-sm">
                {/* Processors */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                    Core Processors
                  </div>
                  <div className="text-gray-300">Nordic nRF9160</div>
                  <div className="text-xs text-gray-500 mb-1">LTE-M/NB-IoT cellular</div>
                  <div className="text-gray-300">Espressif ESP32-S3</div>
                  <div className="text-xs text-gray-500">Sensor processing &amp; local intelligence</div>
                </div>

                {/* Connectivity */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                    Connectivity
                  </div>
                  {[
                    '4G LTE-M / NB-IoT',
                    'LoRa 868/915 MHz',
                    'Wi-Fi 802.11 b/g/n',
                    'Bluetooth 5.0',
                  ].map((c) => (
                    <div key={c} className="text-gray-300">
                      {c}
                    </div>
                  ))}
                </div>

                {/* Power */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                    Power
                  </div>
                  <div className="text-gray-300">9–36 V DC input</div>
                  <div className="text-gray-300">Li-Po battery backup (8 hr)</div>
                  <div className="text-gray-300">Solar charging input</div>
                </div>

                {/* Operating conditions */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                    Operating Conditions
                  </div>
                  <div className="text-gray-300">−20°C to +75°C</div>
                  <div className="text-gray-300">IP67 rated</div>
                  <div className="text-gray-300">Vibration resistant (IEC 60068)</div>
                </div>

                {/* Security */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                    Security
                  </div>
                  <div className="text-gray-300">ATECC608B hardware encryption</div>
                  <div className="text-gray-300">Secure boot</div>
                  <div className="text-gray-300">OTA firmware updates</div>
                </div>

                {/* Certifications */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                    Certifications (in progress)
                  </div>
                  <div className="text-gray-300">NCC Type Approval (Nigeria)</div>
                  <div className="text-gray-300">CE (Europe)</div>
                </div>
              </div>
            </div>

            {/* RIGHT — differentiators */}
            <div className="space-y-6">
              <h3 className="text-white font-light text-xl mb-2">
                Why CEM Performs Where Others Fail
              </h3>
              {[
                {
                  icon: <Battery className="w-5 h-5 text-[#f59e0b]" />,
                  bold: 'Wide-voltage tolerance.',
                  text: 'Generator surges and unstable grid power won\'t destroy the device. 9–36 V DC input handles the full range of African power realities.',
                },
                {
                  icon: <Cloud className="w-5 h-5 text-[#f59e0b]" />,
                  bold: 'Offline-resilient by design.',
                  text: 'Local data buffering means connectivity drops don\'t create data gaps. Telemetry syncs automatically when network is restored.',
                },
                {
                  icon: <Shield className="w-5 h-5 text-[#f59e0b]" />,
                  bold: 'Built for the African climate.',
                  text: 'IP67 rating and −20°C to +75°C operating range handle coastal humidity, Saharan heat, and everything in between.',
                },
                {
                  icon: <Lock className="w-5 h-5 text-[#f59e0b]" />,
                  bold: 'Hardware-level security.',
                  text: 'ATECC608B cryptographic co-processor ensures data integrity from sensor to cloud — not just in transit, but at the point of capture.',
                },
                {
                  icon: <Cpu className="w-5 h-5 text-[#f59e0b]" />,
                  bold: 'Edge intelligence.',
                  text: 'The ESP32-S3 runs local analytics at the device — reducing latency, lowering data costs, and enabling decision-making even without cloud connectivity.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-[#0d0d0d] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="text-white font-medium">{item.bold}</span> {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — PRISM CONNECTION ── */}
      <section className="bg-[#050505] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">The Intelligence Platform</div>
          <h2 className="heading-lg font-outfit mb-6">
            Every Sensor Feeds PRISM. Every Alert Reaches the Right Person.
          </h2>
          <p className="text-gray-400 max-w-3xl leading-relaxed mb-4">
            Data without intelligence is noise. The CEM hardware is the nervous system;
            PRISM is the brain. Every telemetry point — every GPS coordinate, fuel level
            reading, voltage spike, or transaction record — flows into PRISM, where it is
            structured, analysed, and transformed into operational intelligence.
          </p>
          <p className="text-gray-400 max-w-3xl leading-relaxed mb-8">
            PRISM doesn&apos;t just display data. It answers the questions that operations
            leaders actually need answered:
          </p>

          {/* Questions block */}
          <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-xl space-y-3 mb-12">
            {prismQuestions.map((q) => (
              <div key={q} className="flex items-start gap-3">
                <span className="text-[#22c55e] font-mono mt-0.5">→</span>
                <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
              </div>
            ))}
          </div>

          {/* PRISM cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — PROOF POINT ── */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Live Deployments</div>
          <h2 className="heading-lg font-outfit mb-10">Already Operating in the Field.</h2>

          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden">
            {/* card header */}
            <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#f59e0b]">
                ITS + IES — Fuel &amp; Fleet Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#22c55e]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                Live
              </span>
            </div>

            {/* card body */}
            <div className="p-8 md:p-10">
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">Client</div>
              <h3 className="text-2xl font-light text-white mb-6">
                ESN Petroleum Services Limited
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed max-w-3xl mb-8">
                <p>
                  ESN Petroleum operates a distributed network of fuel assets — tankers,
                  storage tanks, dispensing equipment, and generator sets — across multiple
                  sites in Nigeria. Before Crelligent, fuel reconciliation was manual, theft
                  was difficult to prove, and generator uptime was tracked by phone calls.
                </p>
                <p>
                  Crelligent deployed CEM devices across ESN&apos;s fleet and energy
                  infrastructure, connecting real-time fuel telemetry and vehicle GPS into
                  PRISM. The result: end-to-end fuel accountability from tank to nozzle,
                  live fleet visibility, and generator uptime dashboards — all in one
                  command centre, managed by a single operations team.
                </p>
                <p>
                  ESN now knows exactly where every litre of fuel is, where every vehicle
                  is, and when every generator is at risk of failure — before it happens.
                </p>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm text-[#f59e0b] hover:gap-3 transition-all"
              >
                Read the full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — DEPLOYMENT PROCESS ── */}
      <section className="bg-[#050505] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-4">How It Works</div>
          <h2 className="heading-lg font-outfit mb-14">
            From Assessment to Intelligence in 12 Weeks.
          </h2>

          {/* Steps grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 mb-14">
            {/* horizontal connector — desktop only */}
            <div className="hidden md:block absolute top-4 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] border-t border-dashed border-white/10" />

            {deploymentSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="w-8 h-8 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-sm font-mono text-[#f59e0b] mb-4 relative z-10">
                  {i + 1}
                </div>
                <div className="text-xs uppercase tracking-widest text-[#f59e0b] mb-2">
                  {step.week}
                </div>
                <h4 className="text-white font-light text-lg mb-2 leading-snug">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/contact" className="btn-primary">
              Start Your Deployment Assessment
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — PAGE CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* subtle amber glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f59e0b]/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#f59e0b]/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="heading-lg font-outfit mb-6">
            Your Operations Are Generating Data Right Now.{' '}
            <span className="text-[#f59e0b]">The Question Is Whether Anyone Can Read It.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10 text-lg">
            Every vehicle moving, every generator running, every tank filling — all of it
            is data that currently evaporates. Crelligent Intelligent Systems captures that
            data, structures it, and turns it into the operational intelligence your
            leadership team needs to make decisions with confidence. The infrastructure
            exists. The platform is proven. The only question is when you decide to use it.
          </p>

          <div className="flex flex-col items-center gap-4">
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
