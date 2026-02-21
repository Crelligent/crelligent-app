import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, Sparkles, Layers, Rocket, Target, CheckCircle, Zap, Brain, Users, Shield, TrendingUp, Repeat } from 'lucide-react'

export const metadata = {
    title: 'Crelligent Foundry | Startup-as-a-Service',
    description: 'We engineer startups as adaptive business systems — not just products — so they validate faster, scale smarter, and survive longer.',
}

const systemComponents = [
    {
        icon: Layers,
        title: 'System Architecture',
        description: 'Business model, product strategy, and operating model designed as one integrated system.',
    },
    {
        icon: Zap,
        title: 'Execution Engine',
        description: 'Processes, technology, and data infrastructure that actually runs your startup.',
    },
    {
        icon: Repeat,
        title: 'Learning Loops',
        description: 'Customer feedback, analytics, and iteration cycles built into how you operate.',
    },
    {
        icon: Shield,
        title: 'Control Mechanisms',
        description: 'Governance, economics, and risk frameworks that keep you stable as you grow.',
    },
    {
        icon: Users,
        title: 'Activation Layer',
        description: 'Adoption, behavior, and culture that turns systems into living organizations.',
    },
]

const packages = [
    {
        name: 'Starter',
        stage: 'Idea / Concept',
        price: 'From $5,000',
        description: 'Validate your startup\'s system intent and market fit.',
        features: [
            'Business Design & Problem Definition',
            'Product-Market Fit Assessment',
            'System Intent Mapping',
            'MVP Blueprint',
            'Core Architecture Blueprint',
            'Early Customer Feedback Loops',
            'Basic Tech Stack Recommendation',
            'Initial Metrics / KPIs',
            'VeloDesk Integration',
            '4-week engagement',
        ],
        cta: 'Start Validating',
        highlight: false,
    },
    {
        name: 'Growth',
        stage: 'Early Traction / Seed Stage',
        price: 'From $15,000',
        description: 'Strengthen your operating model and user experience.',
        features: [
            'Everything in Starter',
            'Full Product Strategy Roadmap',
            'Full System Architecture',
            'Technical Stack Selection',
            'CX / Service Design (User Journeys & Feedback)',
            'Data & Intelligence Setup',
            'Operating Model & Process Design',
            'Team & Process Design',
            'Governance & Risk Framework',
            'Implementation Roadmap',
            'Early Go-to-Market Plan',
            '8-week engagement',
        ],
        cta: 'Accelerate Growth',
        highlight: true,
    },
    {
        name: 'Scale',
        stage: 'Post-Seed / Series A+',
        price: 'From $30,000',
        description: 'Optimize for system-wide growth and investor readiness.',
        features: [
            'Everything in Growth',
            'Technology & Platform Architecture',
            'Scale Architecture Review',
            'Advanced Analytics & ML Insights',
            'Failure Mode Analysis',
            'Governance, Risk & Control Enhancement',
            'Economics & Value Engineering',
            'Operational Playbooks',
            'Change & Adoption Mechanisms',
            'Funding / Investor Readiness Support',
            'BI Suite Integration',
            '12-week engagement',
        ],
        cta: 'Prepare for Scale',
        highlight: false,
    },
]

const differentiators = [
    { traditional: 'Incubators & accelerators', foundry: 'Systems engineering' },
    { traditional: 'Mentorship-heavy', foundry: 'Design & build-heavy' },
    { traditional: 'Advice and frameworks', foundry: 'Executable systems' },
    { traditional: 'Focus on pitch decks', foundry: 'Focus on operating reality' },
    { traditional: 'Fragmented vendors', foundry: 'Integrated system' },
]

const targetFounders = [
    'Founders who want structure without bureaucracy',
    'Technical or non-technical founders who need a full startup system',
    'Startups preparing for serious scale or investment',
    'Corporates spinning out new ventures',
]

export default function FoundryPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full mb-8">
                        <Sparkles className="w-4 h-4 text-[#22c55e]" />
                        <span className="text-sm text-[#22c55e]">Startup-as-a-Service</span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        Crelligent Foundry
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-4">
                        We engineer startups as adaptive business systems — not just products — so they validate faster, scale smarter, and survive longer.
                    </p>

                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
                        We don&apos;t just support startups. We co-engineer them.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="#packages" className="btn-primary">
                            View Startup Kit
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/contact" className="btn-ghost">
                            Talk to Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* What We Provide */}
            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">What We Provide</div>
                        <h2 className="heading-lg">A Complete Startup System</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Instead of assembling fragmented services, get an integrated system engineered to validate, scale, and learn.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {systemComponents.map((item) => (
                            <div key={item.title} className="glass-card rounded-lg">
                                <item.icon className="w-6 h-6 text-[#22c55e] mb-4" />
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="section-label mb-4">The Difference</div>
                        <h2 className="heading-lg">Not Another Accelerator</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 text-sm text-gray-500 font-normal">Typical Startup Support</th>
                                    <th className="py-4 text-sm text-[#22c55e] font-normal">Crelligent Foundry</th>
                                </tr>
                            </thead>
                            <tbody>
                                {differentiators.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-4 text-gray-400">{row.traditional}</td>
                                        <td className="py-4 text-white">{row.foundry}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Startup Kit */}
            <section id="packages" className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Startup Kit</div>
                        <h2 className="heading-lg">Stage-Appropriate Systems</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Each startup receives what it needs for its stage — not unnecessary complexity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`rounded-lg p-8 ${pkg.highlight
                                    ? 'bg-[#22c55e]/5 border-2 border-[#22c55e]/30'
                                    : 'glass-card'
                                    }`}
                            >
                                {pkg.highlight && (
                                    <div className="text-xs uppercase tracking-widest text-[#22c55e] mb-4">
                                        Most Popular
                                    </div>
                                )}
                                <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                    {pkg.stage}
                                </div>
                                <h3 className="text-2xl font-light mb-2">{pkg.name}</h3>
                                <div className="text-lg text-[#22c55e] mb-4">{pkg.price}</div>
                                <p className="text-sm text-gray-500 mb-6">{pkg.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {pkg.features.slice(0, 6).map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
                                            <CheckCircle className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                    {pkg.features.length > 6 && (
                                        <li className="text-sm text-gray-500">+ {pkg.features.length - 6} more</li>
                                    )}
                                </ul>

                                <Link
                                    href="/contact"
                                    className={`block text-center py-3 rounded transition ${pkg.highlight
                                        ? 'bg-[#22c55e] text-black hover:bg-[#16a34a]'
                                        : 'border border-white/10 text-gray-300 hover:bg-white/5'
                                        }`}
                                >
                                    {pkg.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="section-label mb-4">For Founders</div>
                        <h2 className="heading-lg">Is Foundry Right for You?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {targetFounders.map((founder) => (
                            <div
                                key={founder}
                                className="flex items-center gap-3 p-5 border border-white/5 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                                <span className="text-gray-300">{founder}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center bg-gradient-to-t from-[#22c55e]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to engineer your startup?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s build a system that validates faster, scales smarter, and survives longer.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Start the Conversation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
