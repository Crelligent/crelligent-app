import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Cpu, Zap, Shield, Radio } from 'lucide-react'

export const metadata = {
    title: 'Embedded Systems | Crelligent',
    description: 'Mission-critical contexts requiring engineering depth and precision.',
}

export default function EmbeddedSystemsPage() {
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
                        Specialized Capability
                    </div>

                    <h1 className="heading-xl mb-6">
                        Embedded Systems
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Mission-critical contexts requiring engineering depth and precision.
                        Selective engagements where the stakes are highest.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass-card rounded-lg">
                            <Cpu className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Hardware-Software Integration</h3>
                            <p className="text-sm text-gray-500">Systems where physical and digital converge.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Zap className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Real-Time Systems</h3>
                            <p className="text-sm text-gray-500">When timing and reliability are non-negotiable.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Shield className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">Safety-Critical</h3>
                            <p className="text-sm text-gray-500">Systems where failure is not an option.</p>
                        </div>
                        <div className="glass-card rounded-lg">
                            <Radio className="w-6 h-6 text-gray-400 mb-4" />
                            <h3 className="text-lg font-light mb-2">IoT & Connected Devices</h3>
                            <p className="text-sm text-gray-500">Distributed systems at the edge.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <Link href="/contact" className="btn-primary">
                        Discuss Your Requirements
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
