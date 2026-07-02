import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { WhatsAppSimulator } from '@/components/shared/WhatsAppSimulator'
import { ArrowRight, Activity, Smartphone, Link2, Database, BarChart3, Fingerprint, Coins, TrendingUp, Terminal } from 'lucide-react'

export const metadata = {
    title: 'Crelligent Core | Intelligence for the Real Economy',
    description: 'Translating enterprise systems intelligence into survival and growth tools for the African informal sector.',
}

const productOfferings = [
    {
        icon: Activity,
        title: 'Business Vitals Check',
        description: 'A 45-minute guided diagnostic identifying the exact systemic bottlenecks in informal businesses (Stock, Cashflow, People).',
        audience: 'Micro & Small Enterprises'
    },
    {
        icon: Smartphone,
        title: 'ESRE Vitals Bot',
        description: 'An intelligent WhatsApp and USSD copilot that tracks daily inventory and sales via natural language, delivering weekly actionable insights.',
        audience: 'Daily Wage Earners & Traders'
    }
]

const partnerChannels = [
    {
        icon: Database,
        title: 'Layer 7: The Data Play',
        description: 'The most comprehensive, granular, longitudinal dataset of the African informal economy. Real-time consumption, cash flow, and survival metrics.',
        target: 'Government, DFIs, and Researchers',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20'
    },
    {
        icon: Coins,
        title: 'Financial Inclusion Bridge',
        description: 'Vitals Scores act as alternative credit intelligence. We partner with progressive lenders to underwrite loans for the unbanked based on proven operational health.',
        target: 'Microfinance Banks & Fintechs',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        icon: Link2,
        title: 'Association Gateway',
        description: 'Bulk digitization for market associations and unions. We provide leadership with macro Sector Vitals Reports while upgrading their entire membership base.',
        target: 'Trade Unions & Cooperatives',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
    }
]

export default function CorePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
                        <Activity className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-amber-500">The Informal Economy Engine</span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        Intelligence for the Real Economy
                    </h1>

                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-4">
                        We don't sell watered-down enterprise software. We deliver financial identity and survival intelligence via WhatsApp and USSD to 40 million informal African businesses.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <Link href="#partners" className="btn-primary !bg-amber-600 hover:!bg-amber-700">
                            Partner with Crelligent Core
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Products Segment */}
            <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4 text-amber-500 border-amber-500/30">The Product Ecosystem</div>
                        <h2 className="heading-lg">Zero Friction. Maximum Intelligence.</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            The informal sector doesn't need dashboards. It needs answers. We deliver ESRE methodology through the channels they already use.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {productOfferings.map((product) => (
                            <div key={product.title} className="relative rounded-xl overflow-hidden p-[1px] group h-full block">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-[#050505] rounded-xl p-8 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <div className="w-12 h-12 rounded bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center mb-6 group-hover:bg-[#f59e0b]/20 transition relative z-10">
                                        <product.icon className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-amber-500 mb-2 relative z-10">{product.audience}</div>
                                    <h3 className="text-2xl font-[300] tracking-wide text-white mb-3 relative z-10">{product.title}</h3>
                                    <p className="text-sm text-white font-[200] leading-loose opacity-80 relative z-10 flex-1">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Sandbox Section */}
            <section className="py-24 px-6 relative border-y border-white/5 bg-[#050505]">
                <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-400">
                            <Terminal className="w-4 h-4" />
                            Live Sandbox
                        </div>
                        <h2 className="heading-lg">Experience the Intelligence Engine</h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            Try the ESRE Vitals Bot for yourself. 
                            Type a natural language message in the simulator (e.g., <em>"I just sold 2 bags of cement for ₦10,000"</em>) 
                            and watch how our NLP engine instantly parses it into structured financial ledger data.
                        </p>

                        <div className="relative rounded-xl overflow-hidden p-[1px] group block mt-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-30 transition-opacity duration-500" />
                            <div className="relative bg-[#0a0a0a] rounded-xl p-6 z-10 w-full text-left">
                                <h3 className="text-[#3b82f6] font-medium tracking-wide uppercase text-sm mb-2">How it works</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    When an informal trader sends a WhatsApp message, it hits our NLP layer. 
                                    The engine extracts intent, item classification, quantity, and real-world pricing data—updating their digital ledger in milliseconds.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center relative w-full">
                        <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full" />
                        <WhatsAppSimulator />
                    </div>
                </div>
            </section>

            {/* The Partnership Channels */}
            <section id="partners" className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="section-label mb-4">B2B Integrations</div>
                        <h2 className="heading-lg">The Partnership Gateways</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            We don't acquire users one by one. We partner with the institutions that govern, finance, and study the informal sector.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {partnerChannels.map((channel) => (
                            <div key={channel.title} className="relative rounded-xl overflow-hidden p-[1px] group h-full block">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b] via-[#3b82f6] to-[#22c55e] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-[#050505] rounded-xl p-8 h-full z-10 w-full overflow-hidden text-left flex flex-col items-start justify-start">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <div className={`w-12 h-12 rounded-lg ${channel.bg} ${channel.border} border flex items-center justify-center mb-6 relative z-10`}>
                                        <channel.icon className={`w-6 h-6 ${channel.color}`} />
                                    </div>
                                    <h3 className="text-xl font-[300] tracking-wide text-white mb-3 relative z-10">{channel.title}</h3>
                                    <p className="text-sm text-white font-[200] leading-loose opacity-80 relative z-10 flex-1">{channel.description}</p>
                                    <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest border-t border-white/10 pt-4 mt-6 w-full relative z-10">
                                        Target: {channel.target}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Data Play Visualization */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <Fingerprint className="w-12 h-12 text-amber-500 mx-auto mb-6 opacity-80" />
                    <h2 className="heading-lg mb-6">Structuring the Unstructured</h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Every WhatsApp interaction feeds our intelligence engine. At scale, Crelligent Core holds the deepest, most actionable dataset of the African grassroots economy in existence.
                    </p>
                    
                    <div className="glass-card p-1 rounded-2xl border border-white/10 max-w-3xl mx-auto bg-black/50">
                        <div className="grid grid-cols-3 gap-1">
                            <div className="p-6 text-center border-r border-white/5">
                                <BarChart3 className="w-6 h-6 text-gray-500 mx-auto mb-3" />
                                <div className="text-2xl font-light text-white mb-1">40M+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Target Businesses</div>
                            </div>
                            <div className="p-6 text-center border-r border-white/5">
                                <Activity className="w-6 h-6 text-amber-500 mx-auto mb-3" />
                                <div className="text-2xl font-light text-white mb-1">Real-time</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Consumption Data</div>
                            </div>
                            <div className="p-6 text-center">
                                <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                                <div className="text-2xl font-light text-white mb-1">Verified</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Credit Profiles</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="heading-lg mb-6">
                        Ready to tap into the real economy?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Whether you are a microfinance bank looking for better credit intelligence, or an association looking to digitize your members, let's talk.
                    </p>
                    <Link href="/contact" className="btn-primary !bg-amber-600 hover:!bg-amber-700">
                        Contact Core Partnerships
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
