'use client'

import React from 'react'
import { BrainCircuit, FileSearch, Library, Activity, Sparkles, Zap, Network, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function EsreIntelligenceShowcase() {
    return (
        <section className="py-24 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#ec4899]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#3b82f6]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row gap-12 items-end justify-between mb-16"
                >
                    <div className="max-w-3xl">
                        <div className="section-label mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Proprietary Intelligence Engine
                        </div>
                        <h2 className="text-4xl md:text-5xl font-[300] tracking-tight text-white mb-6">
                            Not just consulting. <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#3b82f6]">Structural acceleration.</span>
                        </h2>
                        <p className="text-lg text-white/50 font-[200] leading-relaxed max-w-2xl">
                            The era of 10-week manual diagnostics is over. Crelligent's proprietary ESRE™ AI Engine ingests your ERP telemetry, policy manuals, and operational data—delivering a structural diagnosis in 3 weeks, not 5.
                        </p>
                    </div>
                    
                    <div className="shrink-0 pb-2">
                        <Link href="https://client.crelligent.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            Run ESRE Diagnostic
                        </Link>
                    </div>
                </motion.div>

                {/* The 4 Modules Visualization */}
                <div className="grid lg:grid-cols-12 gap-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    
                    {/* Left Column: Data Ingestion (Lens & Doc Intelligence) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Module 1: ESRE Lens */}
                        <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-6">
                                    <Network className="w-5 h-5 text-[#3b82f6]" />
                                </div>
                                <h3 className="text-xl font-[300] text-white mb-3">01. ESRE Lens Engine</h3>
                                <p className="text-sm text-white/40 font-[200] leading-relaxed flex-1">
                                    Secure API connectors plug directly into your ERP, CRM, and HR systems to ingest live organizational telemetry and map latency bottlenecks before we even arrive on site.
                                </p>
                                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#3b82f6]">
                                    <span>API Integration Layer</span>
                                    <Zap className="w-3 h-3" />
                                </div>
                            </div>
                        </div>

                        {/* Module 2: Document Intelligence */}
                        <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6">
                                    <FileSearch className="w-5 h-5 text-[#8b5cf6]" />
                                </div>
                                <h3 className="text-xl font-[300] text-white mb-3">02. Document Intelligence</h3>
                                <p className="text-sm text-white/40 font-[200] leading-relaxed flex-1">
                                    Advanced language models parse thousands of pages of policy manuals, org charts, and board minutes instantly, mapping discrepancies between written governance and operational reality.
                                </p>
                                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#8b5cf6]">
                                    <span>Unstructured Data Pipeline</span>
                                    <Zap className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Column: The Core Engine Visualization */}
                    <div className="lg:col-span-4 relative rounded-2xl bg-[#050505] border border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                        
                        {/* Animated Core */}
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            {/* Outer rotating ring */}
                            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#ec4899]/30 animate-spin" style={{ animationDuration: '8s' }} />
                            <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#3b82f6]/30 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                            
                            {/* Inner Core */}
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#050505] to-[#111] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] flex flex-col items-center justify-center z-10">
                                <BrainCircuit className="w-8 h-8 text-white/80 mb-2" />
                                <span className="text-[10px] font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899] uppercase">ESRE Core</span>
                            </div>
                            
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: '3s' }} />
                        </div>
                        
                        <div className="mt-12 text-center relative z-10 px-8">
                            <h4 className="text-sm font-medium text-white mb-2">The Intelligence Nexus</h4>
                            <p className="text-xs text-white/40 leading-relaxed">
                                Raw enterprise data is synthesized through the 9-dimensional ESRE Capability Framework to generate high-fidelity architectural blueprints.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Outputs (Prescription & Monitor) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Module 3: Prescription Library */}
                        <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-bl from-[#ec4899]/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-10 h-10 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center mb-6">
                                    <Library className="w-5 h-5 text-[#ec4899]" />
                                </div>
                                <h3 className="text-xl font-[300] text-white mb-3">03. Blueprint Generator</h3>
                                <p className="text-sm text-white/40 font-[200] leading-relaxed flex-1">
                                    The engine queries our proprietary Prescription Library of structural interventions, automatically generating the optimal target operating model and phased deployment roadmap.
                                </p>
                                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#ec4899]">
                                    <span>Structural Outputs</span>
                                    <ShieldCheck className="w-3 h-3" />
                                </div>
                            </div>
                        </div>

                        {/* Module 4: ESRE Monitor */}
                        <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex-1 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-bl from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-500" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-6">
                                    <Activity className="w-5 h-5 text-[#10b981]" />
                                </div>
                                <h3 className="text-xl font-[300] text-white mb-3">04. ESRE Monitor</h3>
                                <p className="text-sm text-white/40 font-[200] leading-relaxed flex-1">
                                    Post-deployment, the engine shifts into continuous telemetry mode—monitoring system performance against the blueprint and alerting leadership to drift before it impacts revenue.
                                </p>
                                <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#10b981]">
                                    <span>Continuous Surveillance</span>
                                    <ShieldCheck className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
