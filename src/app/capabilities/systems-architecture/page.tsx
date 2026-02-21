import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Layers, Target, GitBranch, Shield, Repeat, CheckCircle } from 'lucide-react'

export const metadata = {
    title: 'Systems Architecture & Design | Crelligent',
    description: 'We engineer the foundations organizations rely on—system intent, structure, boundaries, and failure modes.',
}

const principles = [
    {
        icon: Target,
        title: 'System Intent',
        description: 'Defining what the system exists to accomplish—before any implementation decisions.',
    },
    {
        icon: Layers,
        title: 'Structure & Boundaries',
        description: 'Clear demarcation of responsibilities, interfaces, and ownership within the system.',
    },
    {
        icon: GitBranch,
        title: 'Dependency Mapping',
        description: 'Understanding how components interact, influence, and rely on each other.',
    },
    {
        icon: Repeat,
        title: 'Feedback Loops',
        description: 'Building in mechanisms for the system to sense, learn, and adapt over time.',
    },
    {
        icon: Shield,
        title: 'Failure Modes',
        description: 'Designing for degradation—what happens when components fail or behave unexpectedly.',
    },
    {
        icon: CheckCircle,
        title: 'Alignment Checks',
        description: 'Ensuring all parts of the system work toward the same organizational outcomes.',
    },
]

const deliverables = [
    'System Intent Documents',
    'Architecture Blueprints',
    'Boundary & Interface Definitions',
    'Failure Mode Analysis',
    'System Alignment Assessments',
    'Implementation Roadmaps',
]

export default function SystemsArchitecturePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="text-xs uppercase tracking-widest text-[#3b82f6] mb-4">
                        Primary Capability
                    </div>

                    <h1 className="heading-xl mb-6">
                        Systems Architecture
                        <br />
                        <span className="text-gray-500">& Design</span>
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        We engineer the foundations organizations rely on—system intent, structure,
                        boundaries, and failure modes—before scale and complexity expose weakness.
                    </p>
                </div>
            </section>

            {/* The System Role */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-4">The System Role</div>
                    <h2 className="heading-lg mb-8">Why this capability matters</h2>

                    <div className="space-y-6 text-gray-400 leading-relaxed">
                        <p>
                            Most organizations don&apos;t fail because they lack talent or resources.
                            They fail because their systems weren&apos;t designed to handle the complexity
                            that success brings.
                        </p>
                        <p>
                            Systems Architecture is the practice of engineering organizational foundations
                            <em> before</em> they&apos;re tested by scale. It&apos;s about designing for
                            resilience, alignment, and adaptability—not just functionality.
                        </p>
                        <p>
                            This is Crelligent&apos;s flagship capability. Everything else we do
                            connects back to this foundation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Principles */}
            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Our Approach</div>
                        <h2 className="heading-lg">Systems Thinking Principles</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map((principle) => (
                            <div key={principle.title} className="glass-card rounded-lg">
                                <principle.icon className="w-6 h-6 text-[#3b82f6] mb-4" />
                                <h3 className="text-lg font-light mb-2">{principle.title}</h3>
                                <p className="text-sm text-gray-500">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Deliver */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="section-label mb-4">Deliverables</div>
                    <h2 className="heading-lg mb-8">What we deliver</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {deliverables.map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 p-4 border border-white/5 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="heading-lg mb-6">
                        Ready to design your system?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s discuss how we can engineer foundations that scale with your organization.
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
