import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ExternalLink, CheckCircle, Sparkles, Target, LineChart, Users } from 'lucide-react'

export const metadata = {
    title: 'VeloDesk | Early-Stage System Sensing',
    description: 'Product validation and PMF scoring for founders ready to prove traction.',
}

const features = [
    'PMF Score™ generation',
    '20+ tool integrations',
    'AI-powered insights',
    'Investor-ready reports',
    'Real-time dashboards',
    'Growth recommendations',
]

export default function VelodeskPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full mb-8">
                        <Sparkles className="w-4 h-4 text-[#22c55e]" />
                        <span className="text-sm text-[#22c55e]">Systems Intelligence Stack</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extralight mb-4">
                        <span className="text-[#22c55e]">Velo</span>desk
                    </h1>

                    <div className="text-xl text-gray-400 font-light mb-6">
                        Early-Stage System Sensing & Product Validation
                    </div>

                    <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
                        Prove product-market fit with verified data. Generate a PMF Score™
                        backed by your actual metrics from Stripe, Mixpanel, and more.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <a
                            href="https://velodesk.crelligent.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Launch VeloDesk
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link href="/foundry" className="btn-ghost">
                            Part of Foundry
                        </Link>
                    </div>
                </div>
            </section>

            {/* Role in System */}
            <section className="py-16 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-4">System Role</div>
                    <h2 className="heading-lg mb-8">Where VeloDesk fits</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <Target className="w-6 h-6 text-[#22c55e] mb-3" />
                            <h3 className="text-lg font-light mb-2">Validation Layer</h3>
                            <p className="text-sm text-gray-500">
                                The first intelligence layer for early-stage ventures—sensing
                                product-market fit signals.
                            </p>
                        </div>
                        <div>
                            <LineChart className="w-6 h-6 text-[#22c55e] mb-3" />
                            <h3 className="text-lg font-light mb-2">Feeds Foundry</h3>
                            <p className="text-sm text-gray-500">
                                VeloDesk data informs Foundry engagements—we know where you
                                stand before we design.
                            </p>
                        </div>
                        <div>
                            <Users className="w-6 h-6 text-[#22c55e] mb-3" />
                            <h3 className="text-lg font-light mb-2">Investor Translation</h3>
                            <p className="text-sm text-gray-500">
                                Speak the language investors understand—verified metrics,
                                not pitch deck promises.
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
                                className="flex items-center gap-3 p-4 border border-white/5 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#22c55e]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to prove your PMF?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Start free and see where you stand.
                    </p>
                    <a
                        href="https://velodesk.crelligent.com/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        Start Free Trial
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    )
}
