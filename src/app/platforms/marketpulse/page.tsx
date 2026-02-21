import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ExternalLink, CheckCircle, TrendingUp, Repeat, Target, Zap } from 'lucide-react'

export const metadata = {
    title: 'MarketPulse | Market Feedback Loops',
    description: 'Consumer intelligence that feeds decision systems, not just dashboards.',
}

const features = [
    'Consumer sentiment analysis',
    'Competitive intelligence',
    'Market trend detection',
    'AI-powered insights',
    'Real-time monitoring',
    'Decision recommendations',
]

export default function MarketpulsePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-full mb-8">
                        <TrendingUp className="w-4 h-4 text-[#8b5cf6]" />
                        <span className="text-sm text-[#8b5cf6]">Systems Intelligence Stack</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extralight mb-4">
                        <span className="text-[#8b5cf6]">Market</span>Pulse
                    </h1>

                    <div className="text-xl text-gray-400 font-light mb-6">
                        Market & Consumer Feedback Loop Engine
                    </div>

                    <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
                        Consumer intelligence that feeds decision systems—not just dashboards.
                        Understand your market in real-time and let it inform your strategy.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <a
                            href="http://localhost:3002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Launch MarketPulse
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link href="/capabilities/data-intelligence" className="btn-ghost">
                            Data & Intelligence
                        </Link>
                    </div>
                </div>
            </section>

            {/* Role in System */}
            <section className="py-16 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-4">System Role</div>
                    <h2 className="heading-lg mb-8">Where MarketPulse fits</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <Repeat className="w-6 h-6 text-[#8b5cf6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Feedback Loops</h3>
                            <p className="text-sm text-gray-500">
                                Continuous market sensing that keeps your strategy aligned with reality.
                            </p>
                        </div>
                        <div>
                            <Target className="w-6 h-6 text-[#8b5cf6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Decision Support</h3>
                            <p className="text-sm text-gray-500">
                                Intelligence at the point of decision—not reports that arrive too late.
                            </p>
                        </div>
                        <div>
                            <Zap className="w-6 h-6 text-[#8b5cf6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Growth Stage Focus</h3>
                            <p className="text-sm text-gray-500">
                                Built for companies scaling their market presence and product reach.
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
                                <CheckCircle className="w-5 h-5 text-[#8b5cf6]" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#8b5cf6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to pulse your market?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Start listening to what your market is telling you.
                    </p>
                    <a
                        href="http://localhost:3002/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    )
}
