import Link from 'next/link'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ArrowRight, Activity, Smartphone, Link2, Database, BarChart3, Fingerprint, Coins, TrendingUp } from 'lucide-react'

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

                    <div className="grid md:grid-cols-2 gap-8">
                        {productOfferings.map((product) => (
                            <div key={product.title} className="glass-card rounded-2xl p-8 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
                                <product.icon className="w-8 h-8 text-amber-500 mb-6" />
                                <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">{product.audience}</div>
                                <h3 className="text-2xl font-light mb-4">{product.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{product.description}</p>
                            </div>
                        ))}
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

                    <div className="grid md:grid-cols-3 gap-6">
                        {partnerChannels.map((channel) => (
                            <div key={channel.title} className="bg-[#0a0a0a] rounded-xl p-8 border border-white/5 hover:border-white/10 transition-colors">
                                <div className={`w-12 h-12 rounded-lg ${channel.bg} ${channel.border} border flex items-center justify-center mb-6`}>
                                    <channel.icon className={`w-6 h-6 ${channel.color}`} />
                                </div>
                                <h3 className="text-xl font-medium mb-3">{channel.title}</h3>
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed">{channel.description}</p>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest border-t border-white/10 pt-4 mt-auto">
                                    Target: {channel.target}
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
