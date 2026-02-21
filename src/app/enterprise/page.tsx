import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, Building2, Layers, RefreshCw, Shield, CheckCircle } from 'lucide-react'

export const metadata = {
    title: 'Enterprise Systems | Crelligent',
    description: 'System re-architecture, platform redesign, and pre-scale stabilization for organizations rebuilding their foundations.',
}

const services = [
    {
        icon: RefreshCw,
        title: 'System Re-Architecture',
        description: 'Redesigning organizational systems that have outgrown their original design or accumulated technical and operational debt.',
    },
    {
        icon: Layers,
        title: 'Platform & Operating Model Redesign',
        description: 'Aligning technology platforms with business operating models—not the other way around.',
    },
    {
        icon: Shield,
        title: 'Pre-Scale Stabilization',
        description: 'Preparing systems for growth before complexity exposes their weaknesses.',
    },
    {
        icon: Building2,
        title: 'System Alignment Assessment',
        description: 'Evaluating how well your current systems support organizational goals and where gaps exist.',
    },
]

const outcomes = [
    'Systems that scale with your organization',
    'Reduced operational friction',
    'Clear ownership and accountability structures',
    'Resilience built into every layer',
    'Measurable system alignment (SAI)',
    'Roadmap for ongoing evolution',
]

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full mb-8">
                        <Building2 className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-sm text-[#3b82f6]">For Enterprise</span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        Rebuilding Foundations
                        <br />
                        <span className="text-gray-500">at Scale</span>
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
                        For organizations that have outgrown their systems—or never had the right
                        ones to begin with. We help you redesign what&apos;s underneath.
                    </p>

                    <Link href="/contact" className="btn-primary">
                        Discuss Your Needs
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Enterprise Engagements</div>
                        <h2 className="heading-lg">How we help</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {services.map((service) => (
                            <div key={service.title} className="glass-card rounded-lg p-8">
                                <service.icon className="w-8 h-8 text-[#3b82f6] mb-4" />
                                <h3 className="text-xl font-light mb-3">{service.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outcomes */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Expected Outcomes</div>
                        <h2 className="heading-lg">What you gain</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {outcomes.map((outcome) => (
                            <div
                                key={outcome}
                                className="flex items-center gap-3 p-5 border border-white/5 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
                                <span className="text-gray-300">{outcome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Our Process</div>
                        <h2 className="heading-lg">How we work together</h2>
                    </div>

                    <div className="space-y-8">
                        {[
                            { step: '01', title: 'Discovery', desc: 'Understanding your current systems, pain points, and organizational goals.' },
                            { step: '02', title: 'Assessment', desc: 'Mapping existing systems, identifying gaps, and measuring alignment.' },
                            { step: '03', title: 'Architecture', desc: 'Designing the target state—what your systems should look like.' },
                            { step: '04', title: 'Roadmap', desc: 'Creating a phased implementation plan with clear milestones.' },
                            { step: '05', title: 'Implementation', desc: 'Working alongside your team to bring the new systems to life.' },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="text-2xl font-light text-[#3b82f6] w-12 shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-lg font-light mb-1">{item.title}</h3>
                                    <p className="text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to rebuild your foundations?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s discuss how Crelligent can help your organization design systems that last.
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
