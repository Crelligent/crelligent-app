import Link from 'next/link'
import EsreOsBadge from '@/components/shared/EsreOsBadge'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Shield, Scale, Eye, AlertTriangle } from 'lucide-react'

export const metadata = {
    title: 'Governance, Risk & Control | Crelligent',
    description: 'Maintain system stability while preserving adaptability.',
}

const keyQuestions = [
    'How are decisions made?',
    'What risks must be controlled?',
    'How do we maintain stability without rigidity?',
    'Who is accountable for what?',
]

const approaches = [
    {
        icon: Scale,
        title: 'Governance Model Design',
        description: 'Defining decision rights, escalation paths, and accountability structures.',
    },
    {
        icon: AlertTriangle,
        title: 'Risk Assessment',
        description: 'Identifying and prioritizing risks before they become crises.',
    },
    {
        icon: Shield,
        title: 'Control Mechanisms',
        description: 'Designing controls that protect without paralyzing.',
    },
    {
        icon: Eye,
        title: 'Monitoring',
        description: 'Building visibility into system health and compliance.',
    },
]

export default function GovernancePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-xs font-bold text-[#22c55e]">3</div>
                        <span className="text-xs uppercase tracking-widest text-[#22c55e]">Sustain Phase</span>
                    </div>

                    <div className="mb-8">
                        <EsreOsBadge type='os-core' layer='L5' name='Security Layer' intro='Governance, Risk & Control is Layer 5 of the ESRE OS — the security layer that controls permissions, enforces process isolation, and maintains system stability under load. Without L5, every decision escalates to the CEO as the default root user.' />
                    </div>

                    <h1 className="heading-xl mb-6">
                        Governance, Risk & Control
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
                        Control that enables, not constrains. We design governance structures
                        that maintain system stability while preserving the adaptability you need.
                    </p>

                    <div className="glass-card rounded-lg inline-block">
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Role</div>
                        <p className="text-gray-300">
                            Define rules, controls, and decision structures that maintain stability.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-6">Key Questions We Answer</div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {keyQuestions.map((question, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 border border-white/5 rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center text-xs text-[#22c55e] shrink-0">?</div>
                                <span className="text-gray-400">{question}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Our Process</div>
                        <h2 className="heading-lg">How We Work</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {approaches.map((item) => (
                            <div key={item.title} className="glass-card rounded-lg">
                                <item.icon className="w-6 h-6 text-[#22c55e] mb-4" />
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#22c55e]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to design governance that works?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s build controls that enable, not block.
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
