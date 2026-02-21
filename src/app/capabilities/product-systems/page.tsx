import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, ArrowLeft, Box, Cog, GitMerge, Layers, CheckCircle } from 'lucide-react'

export const metadata = {
    title: 'Product & Software Systems | Crelligent',
    description: 'Products that evolve as capabilities inside a larger system, not isolated features.',
}

const approaches = [
    {
        icon: Box,
        title: 'System-Aware Development',
        description: 'Building products that understand their role within the larger organizational system.',
    },
    {
        icon: Layers,
        title: 'Capability Architecture',
        description: 'Designing products as extensible capabilities, not feature sets.',
    },
    {
        icon: GitMerge,
        title: 'Integration-First',
        description: 'Every product is designed to connect, share data, and evolve with other systems.',
    },
    {
        icon: Cog,
        title: 'Operational Alignment',
        description: 'Products that support—not complicate—operational workflows.',
    },
]

export default function ProductSystemsPage() {
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

                    <div className="text-xs uppercase tracking-widest text-[#3b82f6] mb-4">
                        Primary Capability
                    </div>

                    <h1 className="heading-xl mb-6">
                        Product & Software
                        <br />
                        <span className="text-gray-500">Systems Engineering</span>
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                        Products that evolve as capabilities inside a larger system—not isolated
                        features fighting for attention.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">Our Approach</div>
                        <h2 className="heading-lg">System-Aware Product Engineering</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {approaches.map((item) => (
                            <div key={item.title} className="glass-card rounded-lg">
                                <item.icon className="w-6 h-6 text-[#3b82f6] mb-4" />
                                <h3 className="text-lg font-light mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-center bg-gradient-to-t from-[#3b82f6]/5 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Build products that belong
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s discuss how your product fits into the larger system.
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
