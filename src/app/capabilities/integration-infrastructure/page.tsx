import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Server, Cloud, Link2, Shield } from 'lucide-react'

export const metadata = {
    title: 'Integration & Infrastructure | Crelligent',
    description: 'The execution layer—where systems become operational reality.',
}

export default function IntegrationInfrastructurePage() {
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
                        Integration &
                        <br />
                        <span className="text-gray-500">Infrastructure</span>
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        The execution layer—where systems become operational reality.
                        Essential, but not our identity.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass-card rounded-lg">
                            <Cloud className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Cloud Architecture</h3>
                            <p className="text-sm text-gray-500">Infrastructure designed as a system component, not a standalone decision.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Link2 className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">System Integration</h3>
                            <p className="text-sm text-gray-500">Connecting systems in ways that preserve intent and enable evolution.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Server className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Platform Operations</h3>
                            <p className="text-sm text-gray-500">Running systems reliably at scale.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Shield className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Security & Compliance</h3>
                            <p className="text-sm text-gray-500">Protection as a property of well-designed systems.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <Link href="/contact" className="btn-primary">
                        Discuss Your Infrastructure
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
