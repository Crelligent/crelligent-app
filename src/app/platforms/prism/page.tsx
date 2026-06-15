import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ExternalLink, ShieldCheck, Activity, Network, Zap, Cpu } from 'lucide-react'

export const metadata = {
    title: 'PRISM | Operational Intelligence Platform',
    description: 'Enterprise telemetry ingestion, AI-driven anomaly detection, and systems monitoring.',
}

const features = [
    'Real-time telemetry ingestion',
    'Predictive maintenance alerts',
    'Interactive system topology graphs',
    'Cross-border fleet tracking',
    'Enterprise-grade security',
    'Automated mitigation protocols',
]

export default function PrismPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full mb-8">
                        <Activity className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-sm text-[#3b82f6]">Operational Intelligence</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extralight mb-4">
                        <span className="text-[#3b82f6]">PRISM</span> Platform
                    </h1>

                    <div className="text-xl text-gray-400 font-light mb-6">
                        Real-time telemetry, AI-driven anomaly detection, and enterprise systems monitoring.
                    </div>

                    <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
                        The central nervous system for your industrial and enterprise data streams. 
                        Instantly identify operational deviations before they become critical failures.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <a
                            href="https://prism.crelligent.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary !bg-[#3b82f6] hover:!bg-[#2563eb] !border-[#3b82f6]"
                        >
                            Launch PRISM Console
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link href="/enterprise" className="btn-ghost">
                            Explore Enterprise
                        </Link>
                    </div>
                </div>
            </section>

            {/* Role in System */}
            <section className="py-16 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-4">System Role</div>
                    <h2 className="heading-lg mb-8">Where PRISM fits</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <Network className="w-6 h-6 text-[#3b82f6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Telemetry Hub</h3>
                            <p className="text-sm text-gray-500">
                                The central ingestion point for industrial, financial, and operational data streams globally.
                            </p>
                        </div>
                        <div>
                            <Zap className="w-6 h-6 text-[#3b82f6] mb-3" />
                            <h3 className="text-lg font-light mb-2">AI Anomaly Detection</h3>
                            <p className="text-sm text-gray-500">
                                Uncover hidden failure modes and structural bottlenecks with self-learning monitoring agents.
                            </p>
                        </div>
                        <div>
                            <Cpu className="w-6 h-6 text-[#3b82f6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Hardware Integration</h3>
                            <p className="text-sm text-gray-500">
                                Natively connects with the Crelligent Edge Module (CEM) for robust remote asset monitoring.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="section-label mb-4">Platform Features</div>
                        <h2 className="heading-lg">What&apos;s included</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-center gap-3 p-4 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                            >
                                <ShieldCheck className="w-5 h-5 text-[#3b82f6]" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to gain operational clarity?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Deploy PRISM across your enterprise infrastructure today.
                    </p>
                    <a
                        href="https://prism.crelligent.com/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary !bg-[#3b82f6] hover:!bg-[#2563eb] !border-[#3b82f6]"
                    >
                        Deploy PRISM
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    )
}
