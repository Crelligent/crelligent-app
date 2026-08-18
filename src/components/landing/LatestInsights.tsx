'use client'

import React from 'react'
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

                    {/* Left Card - CEO Corner */}
                    <div className="md:col-span-6 relative group min-h-[380px] overflow-hidden rounded-xl p-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col">
                            <div className="absolute inset-0 z-0 bg-[#0a0a0a] transition-transform duration-700" />
                            <Link href="/insights/ceo-corner/issue-1" className="absolute inset-0 z-20 flex flex-col p-8 md:p-10 border-t border-[#8b5cf6]/20 transition-colors duration-300 group-hover:border-[#8b5cf6]/50">
                                <div className="text-[11px] uppercase tracking-[0.2em] text-[#8b5cf6] mb-6 flex items-center gap-3 font-semibold shrink-0">
                                    <div className="w-4 h-[1px] bg-[#8b5cf6]" />
                                    Conversations for tomorrow
                                </div>
                                <h3 className="text-xl md:text-2xl font-[400] tracking-wide text-white leading-tight mb-4">
                                    The Hidden Cost of Your Last Technology Investment
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 font-[300] leading-relaxed line-clamp-4">
                                    Why Nigerian enterprises spend more on systems than they earn from them — and the structural reason it keeps happening.
                                </p>
                                <div className="text-[10px] text-gray-500 font-[400] uppercase tracking-widest mt-auto pt-6 shrink-0">
                                    The CEO Corner — Issue #1
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Card - AEHI */}
                    <div className="md:col-span-6 relative group min-h-[380px] overflow-hidden rounded-xl p-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00C985] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-xl h-full z-10 w-full overflow-hidden flex flex-col">
                            <div className="absolute inset-0 z-0 bg-[#0a0a0a] transition-transform duration-700" />
                            <Link href="https://aehi.crelligent.com/report" target="_blank" className="absolute inset-0 z-20 flex flex-col p-8 md:p-10 border-t border-[#00C985]/20 transition-colors duration-300 group-hover:border-[#00C985]/50">
                                <div className="text-[11px] uppercase tracking-[0.2em] text-[#00C985] mb-6 flex items-center gap-3 font-semibold shrink-0">
                                    <div className="w-4 h-[1px] bg-[#00C985]" />
                                    Crelligent Intelligence
                                </div>
                                <h3 className="text-xl md:text-2xl font-[400] tracking-wide text-white leading-tight mb-4">
                                    The African Enterprise Health Index — Q4 2026
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 font-[300] leading-relaxed line-clamp-4">
                                    The first systematic quarterly benchmark of enterprise operating health across the Nigerian mid-market. Nigerian average: 44/100. L2 is the primary constraint in 91% of enterprises assessed.
                                </p>
                                <div className="text-[10px] text-gray-500 font-[400] uppercase tracking-widest mt-auto pt-6 shrink-0">
                                    Read the Report
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
