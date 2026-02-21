import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, TrendingUp, DollarSign, Target, BarChart3 } from 'lucide-react'

export const metadata = {
    title: 'Economics & Value Engineering | Crelligent',
    description: 'Connect system design to measurable value creation.',
}

const keyQuestions = [
    'How does the system create and capture value?',
    'What metrics actually matter?',
    'Is this financially viable?',
    'How do we measure real impact?',
]

const approaches = [
    {
        icon: DollarSign,
        title: 'Value Modeling',
        description: 'Mapping where and how the system creates economic value.',
    },
    {
        icon: BarChart3,
        title: 'Unit Economics',
        description: 'Understanding the cost and revenue dynamics at granular level.',
    },
    {
        icon: Target,
        title: 'KPI Definition',
        description: 'Defining metrics that drive behavior and measure what matters.',
    },
    {
        icon: TrendingUp,
        title: 'Performance Tracking',
        description: 'Building systems to monitor, analyze, and improve value creation.',
    },
]

export default function EconomicsPage() {
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

                    <h1 className="heading-xl mb-6">
                        Economics & Value Engineering
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
                        Every system must pay for itself. We connect system design to
                        measurable value creation—ensuring outcomes, not just outputs.
                    </p>

                    <div className="glass-card rounded-lg inline-block">
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Role</div>
                        <p className="text-gray-300">
                            Ensure the system is financially viable and outcome-driven.
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
                        Ready to measure what matters?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s design for value, not just activity.
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
