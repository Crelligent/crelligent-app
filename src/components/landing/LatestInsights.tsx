import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LatestInsights() {
    return (
        <section className="py-24 px-6 relative overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-[300] tracking-wide text-white">Latest insights</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Top Massive Card (Spans full width) */}
                    <div className="md:col-span-12 relative group h-[400px] overflow-hidden rounded-xl p-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col justify-end text-left">
                            <div className="absolute inset-0 z-0">
                                <img src="/alexander-barrett-xJua_bjKlI0-unsplash.jpg" alt="Telecom Infrastructure" className="w-full h-full object-cover transition-all duration-700" />
                            </div>

                            <Link href="#" className="absolute inset-0 z-20 flex flex-col justify-center items-end p-8 md:p-16">
                                <div className="w-full md:w-[50%] bg-[#080808]/80 backdrop-blur-sm p-8 md:p-12 shrink-0 border border-white/5 shadow-2xl transition-transform duration-300 rounded-xl">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#3b82f6] mb-4 flex items-center gap-3 font-semibold">
                                        <div className="w-4 h-[1px] bg-[#3b82f6]" />
                                        Crelligent Research
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-[300] tracking-wide text-white leading-tight mb-4">
                                        From Connectivity to Intelligence: Re-Engineering the Telecom Operator
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-300 font-[200] leading-relaxed mt-auto mb-4">
                                        An examination of how telecom operators must redesign their architecture, operating model, and data capabilities to evolve from commodity connectivity providers into intelligence-driven digital infrastructure platforms.
                                    </p>
                                    <div className="text-[10px] text-gray-500 font-[400] uppercase tracking-widest mt-auto">
                                        Global Report
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Left Card (Spans 4 cols) */}
                    <div className="md:col-span-4 relative group h-[380px] overflow-hidden rounded-xl p-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col">
                            <div className="absolute inset-0 z-0 bg-[#0a0a0a] transition-transform duration-700" />
                            <Link href="#" className="absolute inset-0 z-20 flex flex-col p-8 md:p-10 border-t border-[#8b5cf6]/20 transition-colors duration-300 group-hover:border-[#8b5cf6]/50">
                                <div className="text-[11px] uppercase tracking-[0.2em] text-[#8b5cf6] mb-6 flex items-center gap-3 font-semibold">
                                    <div className="w-4 h-[1px] bg-[#8b5cf6]" />
                                    Conversations for tomorrow
                                </div>
                                <h3 className="text-2xl font-[300] tracking-wide text-white leading-tight mb-4">
                                    The CEO Corner: Issue #10
                                </h3>
                                <div className="text-[10px] text-gray-500 font-[400] uppercase tracking-widest mt-auto">
                                    Executive Briefing
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Right Card (Spans 8 cols) */}
                    <div className="md:col-span-8 relative group h-[380px] overflow-hidden rounded-xl p-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col justify-center text-left">
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/50 to-[#334155]/20 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-10" />
                            </div>

                            <Link href="#" className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-10">
                                <div className="w-full md:w-[65%] bg-[#080808]/80 backdrop-blur-sm p-8 md:p-10 shrink-0 border border-white/5 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2 rounded-xl">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#22c55e] mb-6 flex items-center gap-3 font-semibold">
                                        <div className="w-4 h-[1px] bg-[#22c55e]" />
                                        Strategy Report
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-[300] tracking-wide text-white leading-tight mb-8">
                                        The multi-year AI advantage: Building the enterprise of tomorrow
                                    </h3>
                                    <div className="text-[10px] text-gray-500 font-[400] uppercase tracking-widest mt-auto">
                                        Data & Intelligence
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* More Button */}
                <div className="mt-12 flex justify-start">
                    <Link
                        href="#"
                        className="pl-6 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-3 group"
                    >
                        More Insights
                        <ArrowRight className="w-4 h-4 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
