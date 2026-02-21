import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Palette, Users, Repeat, Eye } from 'lucide-react'

export const metadata = {
    title: 'Design & Experience | Crelligent',
    description: 'Human feedback loops inside systems—experience as system input.',
}

export default function DesignExperiencePage() {
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

                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                        Supporting Capability
                    </div>

                    <h1 className="heading-xl mb-6">
                        Design & Experience
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Human feedback loops inside systems. We don&apos;t design interfaces—we design
                        the sensory layer of organizational systems.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass-card rounded-lg">
                            <Palette className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Experience Design</h3>
                            <p className="text-sm text-gray-500">Interfaces that capture signals and feed them back into intelligent systems.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Users className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">User Research</h3>
                            <p className="text-sm text-gray-500">Understanding human behavior as system input.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Repeat className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Feedback Loops</h3>
                            <p className="text-sm text-gray-500">Designing experiences that improve the system over time.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Eye className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Visibility</h3>
                            <p className="text-sm text-gray-500">Making system state visible and understandable to users.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <Link href="/contact" className="btn-primary">
                        Discuss Your Project
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
