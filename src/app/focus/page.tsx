import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import {
    ArrowRight,
    Code2,
    Building2,
    Briefcase,
    ArrowDown,
    XCircle,
    CheckCircle2,
    AlertTriangle,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Focus | Crelligent',
    description:
        'The three system domains Crelligent operates in: Software Systems, IT/Enterprise Systems, and Business Systems.',
}

/* ───────── Domain Data ───────── */

const domains = [
    {
        icon: Code2,
        color: '#3b82f6',
        title: 'Software Systems',
        subtitle: 'Systems where code is the primary medium and logic is explicit.',
        includes: [
            'Applications (web, mobile, desktop)',
            'Platforms & APIs',
            'Data systems & pipelines',
            'AI/ML systems',
            'Embedded software',
            'Integration & middleware',
        ],
        concerns: [
            'Architecture & modularity',
            'Scalability & performance',
            'Reliability & security',
            'Interoperability',
            'Technical debt',
        ],
        failures: [
            'Feature sprawl',
            'Tight coupling',
            'Poor data flow',
            'Architecture drift',
        ],
        focus: [
            'System and solution architecture',
            'Domain-driven design',
            'Interface & contract design',
            'Platform engineering',
            'Observability and control',
        ],
    },
    {
        icon: Building2,
        color: '#8b5cf6',
        title: 'IT / Enterprise Systems',
        subtitle:
            'Systems that run and govern the organization rather than deliver the product directly.',
        includes: [
            'ERP',
            'CRM',
            'HRIS',
            'Finance & accounting systems',
            'Identity & access management',
            'Infrastructure & cloud platforms',
            'Security & compliance systems',
        ],
        concerns: [
            'Integration across vendors',
            'Data consistency',
            'Access control',
            'Reliability & continuity',
            'Cost and vendor lock-in',
        ],
        failures: [
            'Tool sprawl',
            'Broken integrations',
            'Shadow IT',
            'Manual workarounds',
            'Compliance risk',
        ],
        focus: [
            'Enterprise architecture',
            'Systems integration',
            'Data governance',
            'Security architecture',
            'IT operating models',
        ],
    },
    {
        icon: Briefcase,
        color: '#22c55e',
        title: 'Business Systems',
        subtitle:
            'The human, economic, and organizational systems that determine outcomes.',
        includes: [
            'Business models',
            'Operating models',
            'Incentive & compensation systems',
            'Governance & decision systems',
            'Customer journeys',
            'Partner & ecosystem models',
        ],
        concerns: [
            'Alignment between strategy and execution',
            'Incentives vs behavior',
            'Decision speed and quality',
            'Scalability of operations',
            'Institutional memory',
        ],
        failures: [
            'Misaligned incentives',
            'Siloed teams',
            'Slow decision-making',
            'Strategy–execution gap',
        ],
        focus: [
            'Business system architecture',
            'Operating model design',
            'Incentive engineering',
            'Governance frameworks',
            'Performance management systems',
        ],
    },
]

const engagements = [
    'Diagnose a business system → redesign incentives → re-architect enterprise tools → engineer software platforms',
    'Design a platform business → engineer data & APIs → align org & governance',
    'Untangle enterprise chaos → rationalize systems → redesign operating model',
]

const antiList = ['Staff augmentation', 'Tool reselling', 'Feature factories']

/* ───────── Page ───────── */

export default function FocusPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3b82f6]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="section-label mb-4">Chosen System Domains</div>
                    <h1 className="heading-xl mb-6">
                        Three layers.
                        <br />
                        <span className="text-gray-500">One integrated system.</span>
                    </h1>
                    <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                        We operate across three interconnected system domains. Most firms
                        pick one. We engineer across all three—because that&apos;s where
                        real leverage lives.
                    </p>
                </div>
            </section>

            {/* The Three Domains */}
            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto space-y-8">
                    {domains.map((domain) => (
                        <div
                            key={domain.title}
                            className="glass-card rounded-lg p-0 overflow-hidden"
                            style={{ borderColor: `${domain.color}20` }}
                        >
                            {/* Domain Header */}
                            <div
                                className="px-8 py-6 flex items-center gap-4"
                                style={{ background: `${domain.color}08` }}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                        background: `${domain.color}15`,
                                        border: `1px solid ${domain.color}30`,
                                    }}
                                >
                                    <domain.icon
                                        className="w-5 h-5"
                                        style={{ color: domain.color }}
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-light">{domain.title}</h2>
                                    <p className="text-sm text-gray-500">{domain.subtitle}</p>
                                </div>
                            </div>

                            {/* Domain Body — 4-Column Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
                                {/* Includes */}
                                <div className="p-6">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                                        Includes
                                    </div>
                                    <ul className="space-y-2">
                                        {domain.includes.map((item) => (
                                            <li
                                                key={item}
                                                className="text-sm text-gray-300 flex items-start gap-2"
                                            >
                                                <div
                                                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                                    style={{ background: domain.color }}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Core Concerns */}
                                <div className="p-6">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                                        Core Concerns
                                    </div>
                                    <ul className="space-y-2">
                                        {domain.concerns.map((item) => (
                                            <li
                                                key={item}
                                                className="text-sm text-gray-400 flex items-start gap-2"
                                            >
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Typical Failures */}
                                <div className="p-6">
                                    <div className="text-[10px] uppercase tracking-widest text-red-400/70 mb-3 font-semibold">
                                        Typical Failures
                                    </div>
                                    <ul className="space-y-2">
                                        {domain.failures.map((item) => (
                                            <li
                                                key={item}
                                                className="text-sm text-gray-500 flex items-start gap-2"
                                            >
                                                <AlertTriangle className="w-3 h-3 mt-1 text-red-500/50 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Design & Engineering Focus */}
                                <div className="p-6">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                                        Our Design Focus
                                    </div>
                                    <ul className="space-y-2">
                                        {domain.focus.map((item) => (
                                            <li
                                                key={item}
                                                className="text-sm text-gray-300 flex items-start gap-2"
                                            >
                                                <CheckCircle2
                                                    className="w-3 h-3 mt-1 shrink-0"
                                                    style={{ color: domain.color }}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How They Stack */}
            <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">The Insight</div>
                        <h2 className="heading-lg mb-4">How these three stack</h2>
                        <p className="text-gray-500">
                            Each layer depends on the one below it. Failures happen when
                            layers are built in isolation.
                        </p>
                    </div>

                    {/* Stack Diagram */}
                    <div className="space-y-4 max-w-lg mx-auto">
                        {/* Business Layer */}
                        <div className="p-6 rounded-lg border border-[#22c55e]/20 bg-[#22c55e]/5 text-center">
                            <div className="text-xs uppercase tracking-widest text-[#22c55e] mb-1 font-semibold">
                                Business Systems
                            </div>
                            <p className="text-sm text-gray-400">
                                Decide what should happen
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <ArrowDown className="w-4 h-4 text-gray-600" />
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest">
                                define intent, rules, incentives
                            </span>
                        </div>

                        {/* Enterprise Layer */}
                        <div className="p-6 rounded-lg border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 text-center">
                            <div className="text-xs uppercase tracking-widest text-[#8b5cf6] mb-1 font-semibold">
                                IT / Enterprise Systems
                            </div>
                            <p className="text-sm text-gray-400">
                                Coordinate and control
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <ArrowDown className="w-4 h-4 text-gray-600" />
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest">
                                operationalize and govern
                            </span>
                        </div>

                        {/* Software Layer */}
                        <div className="p-6 rounded-lg border border-[#3b82f6]/20 bg-[#3b82f6]/5 text-center">
                            <div className="text-xs uppercase tracking-widest text-[#3b82f6] mb-1 font-semibold">
                                Software Systems
                            </div>
                            <p className="text-sm text-gray-400">
                                Make it executable at scale
                            </p>
                        </div>
                    </div>

                    {/* Failure Conditions */}
                    <div className="mt-16 space-y-4">
                        <div className="text-center mb-8">
                            <h3 className="heading-md text-gray-300">
                                Failures usually happen when:
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-5 rounded-lg border border-red-500/10 bg-red-500/5">
                                <p className="text-sm text-gray-400">
                                    Software is built{' '}
                                    <span className="text-white font-medium">
                                        without business system clarity
                                    </span>
                                </p>
                            </div>
                            <div className="p-5 rounded-lg border border-red-500/10 bg-red-500/5">
                                <p className="text-sm text-gray-400">
                                    Enterprise tools are implemented{' '}
                                    <span className="text-white font-medium">
                                        without architecture
                                    </span>
                                </p>
                            </div>
                            <div className="p-5 rounded-lg border border-red-500/10 bg-red-500/5">
                                <p className="text-sm text-gray-400">
                                    Business systems assume behavior{' '}
                                    <span className="text-white font-medium">
                                        without engineering it
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Positioning */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">
                            What This Positioning Signals
                        </div>
                        <h2 className="heading-lg mb-4">
                            We own the system spine of organizations
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="p-6 border border-white/5 rounded-lg">
                            <div className="text-[#3b82f6] text-sm font-medium mb-2">
                                Above commoditization
                            </div>
                            <p className="text-sm text-gray-500">
                                We avoid pure IT service commoditization
                            </p>
                        </div>
                        <div className="p-6 border border-white/5 rounded-lg">
                            <div className="text-[#8b5cf6] text-sm font-medium mb-2">
                                Above dev shops
                            </div>
                            <p className="text-sm text-gray-500">
                                We stay above code-for-hire execution
                            </p>
                        </div>
                        <div className="p-6 border border-white/5 rounded-lg">
                            <div className="text-[#22c55e] text-sm font-medium mb-2">
                                Beyond strategy decks
                            </div>
                            <p className="text-sm text-gray-500">
                                We stay grounded in implementation reality
                            </p>
                        </div>
                        <div className="p-6 border border-white/5 rounded-lg">
                            <div className="text-white text-sm font-medium mb-2">
                                High-leverage work
                            </div>
                            <p className="text-sm text-gray-500">
                                This is where high-trust, high-impact engagements live
                            </p>
                        </div>
                    </div>

                    {/* Typical Engagements */}
                    <div className="mb-16">
                        <h3 className="heading-md mb-6 text-gray-300">
                            Typical Engagements
                        </h3>
                        <div className="space-y-4">
                            {engagements.map((eng, i) => (
                                <div
                                    key={i}
                                    className="glass-card rounded-lg p-5 flex items-start gap-4"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-xs font-bold text-[#3b82f6] shrink-0 mt-0.5">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {eng}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What We Don't Do */}
                    <div>
                        <h3 className="heading-md mb-6 text-gray-300">
                            What we explicitly don&apos;t do
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {antiList.map((item) => (
                                <div
                                    key={item}
                                    className="p-5 rounded-lg border border-white/5 flex items-center gap-3"
                                >
                                    <XCircle className="w-4 h-4 text-red-500/60 shrink-0" />
                                    <span className="text-sm text-gray-500">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to align all three layers?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s diagnose where your system spine is weakest—and
                        engineer it right.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start a Conversation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
