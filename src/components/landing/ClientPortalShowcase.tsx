'use client'

import React from 'react'
import { Wallet, ShieldCheck, MapPin, BarChart2, ArrowRight } from 'lucide-react'

export function ClientPortalShowcase() {
    return (
        <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#7B61FF]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#38BDF8]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-[#7B61FF] mb-6">
                        <Wallet className="w-3 h-3" />
                        Executive Command Center
                    </div>
                    <h2 className="text-4xl md:text-5xl font-[300] tracking-tight text-white mb-6">
                        Complete visibility. <br className="hidden md:block" />
                        Zero procurement friction.
                    </h2>
                    <p className="text-lg text-white/50 font-[200] leading-relaxed">
                        The ESRE™ diagnostic doesn't end with a PDF. Your Client Portal connects directly to our Implementation Arm, giving your executive team a live view into embedded operators, telemetry, and market intelligence.
                    </p>
                </div>

                {/* Abstract Portal UI Representation */}
                <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
                    {/* Sidebar Mock */}
                    <div className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/10 p-6 hidden md:flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#7B61FF] to-[#38BDF8] rounded flex items-center justify-center">
                                <span className="text-[8px] font-bold text-white tracking-tighter">PR</span>
                            </div>
                            <span className="text-sm font-medium tracking-wide text-white">Client Portal</span>
                        </div>
                        <div className="space-y-3">
                            <div className="w-3/4 h-3 bg-white/10 rounded-full" />
                            <div className="w-1/2 h-3 bg-white/5 rounded-full" />
                            <div className="w-2/3 h-3 bg-white/5 rounded-full" />
                            <div className="w-4/5 h-3 bg-white/5 rounded-full" />
                        </div>
                    </div>

                    {/* Main Content Mock */}
                    <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
                        <header className="flex justify-between items-end mb-8">
                            <div>
                                <h3 className="text-2xl font-light text-white mb-1">Apex Logistics</h3>
                                <p className="text-xs text-white/40 font-mono">ESRE™ Implementation Phase</p>
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-white flex items-center gap-2">
                                <Wallet className="w-3 h-3 text-[#00B67A]" /> 42,500 CRD Available
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            {/* Card 1 */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 text-[#7B61FF] mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-xs font-mono uppercase tracking-widest text-white/70">ESRE Score</span>
                                </div>
                                <div>
                                    <div className="text-4xl font-light text-white mb-1">78<span className="text-lg text-white/30">/100</span></div>
                                    <div className="text-xs text-[#00B67A]">Top Quartile Performance</div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 text-[#FFB020] mb-4">
                                    <BarChart2 className="w-5 h-5" />
                                    <span className="text-xs font-mono uppercase tracking-widest text-white/70">Blueprints</span>
                                </div>
                                <div>
                                    <div className="text-lg font-medium text-white mb-1">Target Model v2</div>
                                    <div className="text-xs text-[#00B67A]">Approved by Board</div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 text-[#38BDF8] mb-4">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-xs font-mono uppercase tracking-widest text-white/70">Implementation</span>
                                </div>
                                <div>
                                    <div className="text-lg font-medium text-white mb-1">Route Alg. Build</div>
                                    <div className="text-xs text-white/50">Sarah J. • Wk 4 of 12</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid below mock */}
                <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
                    <div>
                        <h4 className="text-lg font-medium text-white mb-2">Service Credit Wallet</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Pre-fund your operations. Seamlessly burn credits to authorize embedded operator extensions, unlock deep-dive market intelligence, or subscribe to PRISM data feeds without waiting on new purchase orders.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-white mb-2">Live Milestones</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Stop asking "what's the status?" Track the exact phase of your ESRE blueprint implementation. See what our on-site engineers are deploying in real-time.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-white mb-2">Managed Telemetry</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Once the system is built, we operate it. Monitor your PRISM outsourced operations, check SLA uptime, and manage API keys for your intelligence data streams directly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
