'use client'

import { ScrollRevealText } from '@/components/ScrollRevealText'

export function ValueProposition() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#3b82f6]/[.04] blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <div className="section-label mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Systems Design &amp; Engineering
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8 tracking-tight">
                        We don&apos;t fix parts.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                            We install the operating system.
                        </span>
                    </h2>

                    {/* First paragraph - reveals early (82% → 45% of viewport) */}
                    <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
                        <ScrollRevealText
                            text="Enterprises break when strategy, technology, operations, and data are designed in isolation — without an operating system coordinating them. Crelligent installs ESRE OS: a five-layer enterprise operating system that runs your organisation, monitors its own performance, and improves continuously. We build the connective tissue between every critical capability. That connective tissue is the OS."
                            baseColor="rgb(107, 114, 128)"
                            revealColor="rgb(229, 231, 235)"
                            startThreshold={0.78}
                            endThreshold={0.45}
                        />
                    </p>

                    {/* Accent Visual & Positioning Copy — reveals later (55% → 22% of viewport) */}
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 mb-6">
                        <div className="shrink-0 w-12 md:w-1 bg-gradient-to-b from-[#3b82f6] to-[#8b5cf6] rounded-full h-1 md:h-auto" />
                        <p className="text-base md:text-lg leading-relaxed font-[300] text-justify font-outfit">
                            <ScrollRevealText
                                text="Most firms deliver outputs. Crelligent delivers outcomes engineered into the system itself. We build the connective tissue between strategy, operations, technology, data, economics, and human behavior — and that connective tissue is exactly where most startups fail."
                                baseColor="rgb(156, 163, 175)"
                                revealColor="rgb(255, 255, 255)"
                                startThreshold={0.55}
                                endThreshold={0.22}
                            />
                        </p>
                    </div>

                    <p className="text-2xl md:text-4xl font-[400] tracking-tight mt-12 text-center font-outfit">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">
                            That&apos;s The Difference. The Crelligent Way.
                        </span>
                    </p>

                    {/* Thought Provoking Question — reveals last (45% → 12% of viewport) */}
                    <div className="mt-16 max-w-3xl mx-auto border-t border-white/5 pt-12 text-center flex flex-col items-center">
                        <div className="w-10 h-1 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full mb-6" />
                        <p className="text-lg md:text-xl font-[300] italic leading-relaxed font-outfit">
                            <ScrollRevealText
                                text={`"If everything stays exactly as it is today — same systems, same processes, same assumptions — where does your business end up in three years?"`}
                                baseColor="rgb(156, 163, 175)"
                                revealColor="rgb(255, 255, 255)"
                                startThreshold={0.45}
                                endThreshold={0.12}
                            />
                        </p>
                    </div>

                </div>

                {/* Three Value Pillars */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16 font-outfit">
                    <div className="relative rounded-2xl overflow-hidden p-[1px] group h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-2xl p-8 h-full z-10 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="text-5xl font-[200] text-[#3b82f6] mb-4 relative z-10">01</div>
                            <h3 className="text-xl font-[400] text-white mb-3 tracking-wide relative z-10">Diagnose First</h3>
                            <p className="text-sm font-[200] text-gray-400 leading-relaxed tracking-wide relative z-10">
                                We map the invisible constraints, dependencies, and failure modes in your organization — before proposing any solution.
                            </p>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden p-[1px] group h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-2xl p-8 h-full z-10 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="text-5xl font-[200] text-[#8b5cf6] mb-4 relative z-10">02</div>
                            <h3 className="text-xl font-[400] text-white mb-3 tracking-wide relative z-10">Architect Holistically</h3>
                            <p className="text-sm font-[200] text-gray-400 leading-relaxed tracking-wide relative z-10">
                                Strategy, technology, operating model, data layer — designed as one coherent system, not piecemeal workstreams.
                            </p>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden p-[1px] group h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#050505] rounded-2xl p-8 h-full z-10 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="text-5xl font-[200] text-[#22c55e] mb-4 relative z-10">03</div>
                            <h3 className="text-xl font-[400] text-white mb-3 tracking-wide relative z-10">Build to Evolve</h3>
                            <p className="text-sm font-[200] text-gray-400 leading-relaxed tracking-wide relative z-10">
                                We don&apos;t just deliver a plan. We engineer the platforms, processes, and feedback loops that keep your system adapting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
