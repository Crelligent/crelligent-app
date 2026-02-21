import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ExternalLink, CheckCircle, BarChart3, Layers, Target, Eye } from 'lucide-react'

export const metadata = {
    title: 'BI Suite | Organizational Intelligence Platform',
    description: 'Enterprise-level system governance with System Alignment Index (SAI).',
}

const features = [
    'System Alignment Index (SAI)',
    'Executive dashboards',
    'Department analytics',
    'Real-time KPI tracking',
    'Custom report builder',
    'Integration ecosystem',
]

export default function BISuitePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full mb-8">
                        <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-sm text-[#3b82f6]">Systems Intelligence Stack</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extralight mb-4">
                        <span className="text-[#3b82f6]">BI</span> Suite
                    </h1>

                    <div className="text-xl text-gray-400 font-light mb-6">
                        Organizational Intelligence Platform
                    </div>

                    <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
                        Enterprise-level system governance and visibility. Measure what matters
                        with the System Alignment Index (SAI) and actionable intelligence.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <a
                            href="http://localhost:3003"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Launch BI Suite
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link href="/enterprise" className="btn-ghost">
                            Enterprise Offering
                        </Link>
                    </div>
                </div>
            </section>

            {/* Role in System */}
            <section className="py-16 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-4">System Role</div>
                    <h2 className="heading-lg mb-8">Where BI Suite fits</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <Target className="w-6 h-6 text-[#3b82f6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Alignment Measurement</h3>
                            <p className="text-sm text-gray-500">
                                The SAI measures how well your systems support organizational goals.
                            </p>
                        </div>
                        <div>
                            <Layers className="w-6 h-6 text-[#3b82f6] mb-3" />
                            <h3 className="text-lg font-light mb-2">System Visibility</h3>
                            <p className="text-sm text-gray-500">
                                See across departments, platforms, and processes—one unified view.
                            </p>
                        </div>
                        <div>
                            <Eye className="w-6 h-6 text-[#3b82f6] mb-3" />
                            <h3 className="text-lg font-light mb-2">Decision Support</h3>
                            <p className="text-sm text-gray-500">
                                Intelligence that informs decisions at every level of the organization.
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
                                <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
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
                        Ready for organizational intelligence?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        See how BI Suite can transform your visibility and alignment.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Request a Demo
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
