import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Compass, Map, Clock, Scale } from 'lucide-react'

export const metadata = {
    title: 'Product Strategy | Crelligent',
    description: 'Engineer deliberate, phased capability growth aligned to business goals.',
}

const keyQuestions = [
    'How must this system evolve over time?',
    'What comes now, next, and later?',
    'What trade-offs matter most?',
    'How do we sequence capability development?',
]

const approaches = [
    {
        icon: Map,
        title: 'Capability Assessment',
        description: 'Mapping current capabilities against strategic needs to identify gaps and opportunities.',
    },
    {
        icon: Compass,
        title: 'Roadmap Design',
        description: 'Sequencing capability development to maximize value while managing risk.',
    },
    {
        icon: Scale,
        title: 'Prioritization',
        description: 'Making hard choices about what to build now, defer, or never build.',
    },
    {
        icon: Clock,
        title: 'Evolution Planning',
        description: 'Designing systems that can grow and adapt as the business evolves.',
    },
]

export default function ProductStrategyPage() {
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
                        <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-xs font-bold text-[#3b82f6]">1</div>
                        <span className="text-xs uppercase tracking-widest text-[#3b82f6]">Define Phase</span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        Product Strategy
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
                        Products don&apos;t exist in isolation—they evolve as capabilities inside a larger system.
                        We engineer deliberate, phased growth aligned to business goals.
                    </p>

                    <div className="glass-card rounded-lg inline-block">
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Role</div>
                        <p className="text-gray-300">
                            Guide deliberate, phased capability growth aligned to business goals.
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
                                <div className="w-6 h-6 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-xs text-[#3b82f6] shrink-0">?</div>
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
                                <item.icon className="w-6 h-6 text-[#3b82f6] mb-4" />
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to plan your product evolution?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s design a roadmap that builds capabilities in the right order.
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
