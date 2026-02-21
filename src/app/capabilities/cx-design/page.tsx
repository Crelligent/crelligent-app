import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Users, MapPin, Palette, TestTube } from 'lucide-react'

export const metadata = {
    title: 'CX / Service Design | Crelligent',
    description: 'Translate system intent into usable, intuitive human experiences.',
}

const keyQuestions = [
    'How do users experience the system?',
    'Where does friction or value occur?',
    'What moments matter most?',
    'How do we design for adoption?',
]

const approaches = [
    {
        icon: MapPin,
        title: 'Journey Mapping',
        description: 'Understanding the complete experience from the user\'s perspective, not just touchpoints.',
    },
    {
        icon: Palette,
        title: 'Service Blueprinting',
        description: 'Designing the visible and invisible elements that create the experience.',
    },
    {
        icon: TestTube,
        title: 'Prototyping',
        description: 'Testing ideas early and often before committing to build.',
    },
    {
        icon: Users,
        title: 'Iterative Testing',
        description: 'Refining designs based on real user feedback, not assumptions.',
    },
]

export default function CXDesignPage() {
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
                        <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-xs font-bold text-[#8b5cf6]">2</div>
                        <span className="text-xs uppercase tracking-widest text-[#8b5cf6]">Build Phase</span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        CX / Service Design
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
                        Systems are nothing without the humans who use them. We design experiences
                        that people actually adopt—translating system intent into intuitive interactions.
                    </p>

                    <div className="glass-card rounded-lg inline-block">
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Role</div>
                        <p className="text-gray-300">
                            Translate system intent into usable, intuitive human experiences.
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
                                <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-xs text-[#8b5cf6] shrink-0">?</div>
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
                                <item.icon className="w-6 h-6 text-[#8b5cf6] mb-4" />
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#8b5cf6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to design experiences that stick?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s create something people actually want to use.
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
