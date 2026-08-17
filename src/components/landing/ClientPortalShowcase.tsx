'use client'

import React from 'react'
import { Wallet, ShieldCheck, MapPin, BarChart2, ArrowUpRight, CreditCard, TrendingUp, Activity, AlertTriangle, LayoutDashboard, FlaskConical, Milestone, Rss, Archive, Bell, Settings, KeyRound, CheckSquare, Search } from 'lucide-react'

export function ClientPortalShowcase() {
    return (
        <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#7B61FF]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#38BDF8]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="section-label mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Executive Command Center
                    </div>
                    <h2 className="text-4xl md:text-5xl font-[300] tracking-tight text-white mb-6">
                        ESRE OS Dashboard — Complete OS visibility. <br className="hidden md:block" />
                        Live performance score. Zero procurement friction.
                    </h2>
                    <p className="text-lg text-white/50 font-[200] leading-relaxed">
                        The ESRE OS does not end with an installation. Your ESRE OS Dashboard — accessible at client.crelligent.com — gives your executive team a live view into OS layer health, the OS Performance Score, implementation milestones, embedded operator timelines, telemetry feeds, and market intelligence. The OS runs. The Dashboard shows you exactly how.
                    </p>
                </div>

                {/* Realistic Portal UI */}
                <div className="relative mx-auto max-w-6xl">
                <div className="relative rounded-2xl overflow-hidden p-[1px] group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] via-[#38BDF8] to-[#7B61FF] opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
                <div className="relative rounded-2xl bg-[#050505] shadow-[0_0_80px_rgba(123,97,255,0.08)] overflow-hidden flex flex-col md:flex-row h-auto md:h-[580px] z-10">
                    
                    {/* Sidebar — mirrors the real sidebar */}
                    <div className="w-full md:w-56 bg-[#050505] border-r border-white/10 hidden md:flex flex-col">
                        {/* Header */}
                        <div className="h-12 flex items-center px-4 border-b border-white/10 shrink-0">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#7B61FF] to-[#38BDF8] rounded flex items-center justify-center mr-2">
                                <span className="text-[7px] font-bold text-white">C</span>
                            </div>
                            <span className="text-xs font-semibold tracking-tight text-white">Crelligent</span>
                            <span className="text-[9px] text-[#7B61FF] ml-1.5 font-light">Client</span>
                        </div>

                        {/* Nav Groups */}
                        <div className="flex-1 py-4 px-3 space-y-5 overflow-hidden">
                            {/* Executive Portal */}
                            <div>
                                <div className="px-2 text-[8px] font-mono uppercase tracking-widest text-white/30 mb-2">Executive Portal</div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 text-white text-[11px]">
                                        <LayoutDashboard className="w-3 h-3 text-blue-400" /> Command Center
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <ShieldCheck className="w-3 h-3 text-[#00B67A]/50" /> ESRE OS Scorecard
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <BarChart2 className="w-3 h-3 text-cyan-400/50" /> Blueprints & Assets
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <CreditCard className="w-3 h-3 text-[#7B61FF]/50" /> Service Wallet
                                    </div>
                                </div>
                            </div>

                            {/* Diagnostics */}
                            <div>
                                <div className="px-2 text-[8px] font-mono uppercase tracking-widest text-white/30 mb-2">Diagnostics</div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <AlertTriangle className="w-3 h-3 text-orange-400/50" /> Risk Register
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <Activity className="w-3 h-3 text-red-400/50" /> Bottleneck Tracker
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <FlaskConical className="w-3 h-3 text-amber-400/50" /> Simulation Lab
                                    </div>
                                </div>
                            </div>

                            {/* Implementation */}
                            <div>
                                <div className="px-2 text-[8px] font-mono uppercase tracking-widest text-white/30 mb-2">Implementation</div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <MapPin className="w-3 h-3 text-[#38BDF8]/50" /> Operator Timeline
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <Milestone className="w-3 h-3 text-emerald-400/50" /> Milestone Tracker
                                    </div>
                                </div>
                            </div>

                            {/* Intelligence */}
                            <div>
                                <div className="px-2 text-[8px] font-mono uppercase tracking-widest text-white/30 mb-2">Intelligence</div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <Rss className="w-3 h-3 text-pink-400/50" /> Data Feeds
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40 text-[11px]">
                                        <Archive className="w-3 h-3 text-purple-400/50" /> Reports Archive
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile */}
                        <div className="p-3 border-t border-white/10 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#38BDF8]" />
                                <div>
                                    <div className="text-[10px] font-medium text-white">Apex Logistics</div>
                                    <div className="text-[8px] text-white/30">CEO Account</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        
                        {/* Top Nav Bar */}
                        <div className="h-12 border-b border-white/5 px-5 flex items-center justify-between shrink-0 bg-[#050505]/80">
                            <div className="flex items-center gap-2 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-white/30 text-[11px] w-64">
                                <Search className="w-3 h-3" />
                                <span className="font-light">Search or type a command...</span>
                                <span className="ml-auto text-[8px] font-mono bg-white/10 px-1 rounded">⌘K</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Bell className="w-3.5 h-3.5 text-white/30" />
                                <div className="w-6 h-6 rounded-full bg-white/10" />
                            </div>
                        </div>

                        {/* Alert Banner */}
                        <div className="bg-orange-500/10 border-b border-orange-500/20 px-4 py-1.5 flex items-center justify-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-orange-400" />
                            <span className="text-[9px] text-orange-200">SLA Warning: External ERP integration latency exceeded 200ms at 04:00 AM.</span>
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex-1 p-5 overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-end mb-5">
                                <div>
                                    <div className="text-[8px] font-mono uppercase tracking-widest text-[#7B61FF] mb-1">Executive Command Center</div>
                                    <h3 className="text-lg font-light text-white flex items-center gap-2">
                                        Apex Logistics
                                        <span className="px-1.5 py-0.5 bg-[#00B67A]/10 border border-[#00B67A]/20 rounded text-[#00B67A] text-[7px] font-mono uppercase tracking-widest flex items-center gap-1">
                                            <div className="w-1 h-1 rounded-full bg-[#00B67A] animate-pulse"/> Online
                                        </span>
                                    </h3>
                                    <p className="text-[10px] text-white/40">ESRE OS Diagnostic & Implementation Portal</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-2.5 py-1 bg-white/5 rounded text-[9px] border border-white/10 text-white/70">Export Snapshot</button>
                                    <button className="px-2.5 py-1 bg-gradient-to-r from-[#7B61FF] to-[#38BDF8] rounded text-[9px] text-white shadow-[0_0_12px_rgba(123,97,255,0.25)]">Schedule Review</button>
                                </div>
                            </div>

                            {/* Top Row: 3 Cards */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {/* Service Wallet */}
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 to-transparent opacity-50" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <Wallet className="w-3 h-3 text-[#7B61FF]" />
                                            <span className="text-[8px] font-mono uppercase tracking-widest text-white/50">Service Wallet</span>
                                        </div>
                                        <div className="text-2xl font-light text-white mb-0.5">42,500 <span className="text-xs text-white/30">CRD</span></div>
                                        <div className="text-sm text-white/70 font-mono">₦42,500,000</div>
                                        <div className="text-[8px] text-white/30 mt-2 pt-2 border-t border-white/10 flex justify-between">
                                            <span>1 CRD = ₦1,000</span>
                                            <span className="text-[#FF6B35]">Burn: -2,500/mo</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ESRE Score */}
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-white/50">ESRE OS Performance Score</span>
                                        <ShieldCheck className="w-3 h-3 text-[#00B67A]" />
                                    </div>
                                    <div className="text-3xl font-light text-white mb-0.5">78<span className="text-sm text-white/30">/100</span></div>
                                    <div className="text-[10px] text-[#00B67A] flex items-center gap-1">
                                        <ArrowUpRight className="w-2.5 h-2.5" /> +13 pts since Q1
                                    </div>
                                </div>

                                {/* Projected Value */}
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-bl from-[#00B67A]/10 to-transparent opacity-50" />
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[8px] font-mono uppercase tracking-widest text-white/50">Projected Value</span>
                                            <TrendingUp className="w-3 h-3 text-[#00B67A]" />
                                        </div>
                                        <div className="text-[9px] text-white/40 mb-0.5">Annual Operational Savings</div>
                                        <div className="text-2xl font-light text-[#00B67A]">₦180M</div>
                                        <div className="text-[8px] text-white/30 mt-2 pt-2 border-t border-white/10">Route Optimization Phase 1</div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row: Radar + Bottlenecks + Implementation */}
                            <div className="grid grid-cols-3 gap-3">
                                {/* Radar placeholder */}
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4 col-span-1">
                                    <div className="text-[10px] font-medium text-white mb-1">Diagnostic Capabilities Map</div>
                                    <div className="text-[8px] text-white/30 mb-3">ESRE OS Diagnostic — 5-layer + Application Runtime Assessment</div>
                                    {/* SVG Radar shape */}
                                    <div className="flex items-center justify-center h-[120px]">
                                        <svg viewBox="0 0 100 100" className="w-28 h-28">
                                            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                                            <polygon points="50,25 72,37 72,63 50,75 28,63 28,37" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                                            <polygon points="50,40 60,45 60,55 50,60 40,55 40,45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                                            <polygon points="50,15 80,35 72,68 42,80 18,55 25,30" fill="rgba(123,97,255,0.25)" stroke="#7B61FF" strokeWidth="0.8" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Implementation Arm */}
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <MapPin className="w-3 h-3 text-[#38BDF8]" />
                                        <span className="text-[10px] font-medium text-white">Implementation Arm</span>
                                    </div>
                                    <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[5px] before:w-[1px] before:bg-white/10">
                                        <div className="relative pl-5">
                                            <div className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-[#00B67A]/20 border border-[#00B67A] flex items-center justify-center z-10">
                                                <div className="w-1 h-1 rounded-full bg-[#00B67A]" />
                                            </div>
                                            <div className="text-[10px] text-white">Diagnostic & Blueprint</div>
                                            <div className="text-[8px] text-white/30">Completed</div>
                                        </div>
                                        <div className="relative pl-5">
                                            <div className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8] flex items-center justify-center z-10">
                                                <div className="w-1 h-1 rounded-full bg-[#38BDF8] animate-pulse" />
                                            </div>
                                            <div className="text-[10px] text-white">Routing Algorithm Build</div>
                                            <div className="text-[8px] text-[#38BDF8] font-mono">Wk 4 of 12</div>
                                        </div>
                                        <div className="relative pl-5">
                                            <div className="absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full bg-white/5 border border-white/20 flex items-center justify-center z-10">
                                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                            </div>
                                            <div className="text-[10px] text-white/40">Go-Live Handover</div>
                                            <div className="text-[8px] text-[#FFB020]">Sep 15, 2026</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Client Action Required */}
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <CheckSquare className="w-3 h-3 text-[#7B61FF]" />
                                            <span className="text-[10px] font-medium text-white">Client Action Required</span>
                                        </div>
                                        <span className="text-[8px] font-mono text-white/30">3 Pending</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                                            <input type="checkbox" disabled className="mt-0.5 rounded border-white/20 bg-transparent w-3 h-3" />
                                            <div>
                                                <div className="text-[10px] text-white">Approve Governance Matrix v2.1</div>
                                                <div className="text-[8px] text-white/30">CEO sign-off required</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                                            <input type="checkbox" disabled className="mt-0.5 rounded border-white/20 bg-transparent w-3 h-3" />
                                            <div>
                                                <div className="text-[10px] text-white">Nominate Data Steward</div>
                                                <div className="text-[8px] text-white/30">System Integration feeds</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                                            <input type="checkbox" disabled className="mt-0.5 rounded border-white/20 bg-transparent w-3 h-3" />
                                            <div>
                                                <div className="text-[10px] text-white">Confirm Go-Live Date</div>
                                                <div className="text-[8px] text-white/30">Sep 15 delivery target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                {/* Mirror Reflection */}
                <div className="relative h-[180px] overflow-hidden pointer-events-none mt-0 rounded-b-2xl" aria-hidden="true">
                    <div className="absolute inset-x-0 top-0 h-full" style={{ transform: 'scaleY(-1)' }}>
                        <div className="w-full h-[580px] bg-gradient-to-r from-[#7B61FF]/5 via-[#38BDF8]/5 to-[#7B61FF]/5 rounded-2xl border border-white/5" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />
                    <div className="absolute inset-0 backdrop-blur-[2px]" />
                </div>
                </div>

                {/* Features Grid below mock */}
                <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
                    <div>
                        <h4 className="text-lg font-medium text-white mb-2">Service Credit Wallet</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Pre-fund your operations. Seamlessly burn credits to authorize embedded operator extensions, unlock deep-dive market intelligence, or subscribe to Crelligent data feeds without waiting on new purchase orders.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-white mb-2">Live Milestones</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Stop asking &quot;what&apos;s the status?&quot; Track the exact phase of your ESRE OS installation. See what our on-site engineers are deploying in real-time.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-white mb-2">Managed Telemetry</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Once the system is built, we operate it. Monitor your Crelligent outsourced operations, check SLA uptime, and manage API keys for your intelligence data streams directly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
