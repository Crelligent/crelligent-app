'use client';

import React from 'react';
import Link from 'next/link';
import { Plug, BarChart, Bell, ArrowRight, AlertTriangle } from 'lucide-react';

const osLayers = [
  { code: 'L5', name: 'Governance, Risk & Control', role: 'The Security Layer', color: '#BA7517' },
  { code: 'L4', name: 'Data & Intelligence', role: 'The Sensing Layer', color: '#1A6B8A' },
  { code: 'L3', name: 'Technology & Platform', role: 'Infrastructure Layer', color: '#534AB7' },
  { code: 'L2', name: 'Operating Model & Process', role: 'The Scheduler', color: '#C0392B', alert: true },
  { code: 'L1', name: 'Business Design', role: 'The Kernel', color: '#0F6E56' },
];

const platformFeatures = [
  {
    icon: Plug,
    title: 'Connect your business',
    desc: 'Departments, processes, financials, and operations'
  },
  {
    icon: BarChart,
    title: 'Get your live score',
    desc: 'OS Performance Score updates as your data changes'
  },
  {
    icon: Bell,
    title: 'Act on weekly',
    desc: 'AI-generated recommendations'
  }
];

const phases = [
  { id: '01', name: 'ESRE OS Diagnostic', duration: '4–6 weeks' },
  { id: '02', name: 'ESRE OS Architecture', duration: '6–10 weeks' },
  { id: '03', name: 'ESRE OS Installation', duration: '12–24 weeks' },
  { id: '04', name: 'ESRE OS Support & Updates', duration: 'Ongoing' }
];

export function ESRESection() {
  return (
    <section className="bg-[#050505] py-24 px-6 text-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div 
            className="text-[#00C985] uppercase tracking-[0.1em] font-medium mb-6" 
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px' }}
          >
            THE PLATFORM
          </div>
          <h2 
            className="text-[32px] md:text-[48px] font-bold text-[#F8FAFC] leading-[1.1] mb-6" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ESRE OS.<br />
            The operating system for African enterprise.
          </h2>
          <p className="text-[16px] text-white/65 leading-[1.6] max-w-[580px]">
            Connect your departments, processes, and financials.<br />
            Receive a live OS Performance Score with AI-driven<br />
            recommendations — updated continuously as your<br />
            enterprise evolves.
          </p>
        </div>

        {/* Layer Stack & Score */}
        <div className="bg-[#0F1D2E] border border-white/[0.08] rounded-[12px] p-8 md:p-12 flex flex-col lg:flex-row gap-12 lg:gap-24 mb-8">
          
          {/* OS Layers */}
          <div className="w-full lg:w-[55%] flex flex-col gap-2">
            {osLayers.map((layer) => (
              <div key={layer.code} className="flex flex-col">
                <div 
                  className="flex items-center h-[48px] px-4 rounded-[6px] relative overflow-hidden"
                  style={{ backgroundColor: layer.alert ? 'rgba(192,57,43,0.08)' : 'transparent' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ backgroundColor: layer.color }} />
                  
                  <div className="flex items-center w-full ml-2">
                    <span 
                      className="w-[32px] shrink-0 font-semibold text-white/90" 
                      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px' }}
                    >
                      {layer.code}
                    </span>
                    <span 
                      className="font-medium text-white/90 tracking-wide truncate mr-3" 
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px' }}
                    >
                      {layer.name}
                    </span>
                    <span className="text-[11px] text-white/40 hidden sm:inline-block truncate">
                      · {layer.role}
                    </span>
                    {layer.alert && (
                      <AlertTriangle className="w-[14px] h-[14px] text-[#C0392B] ml-auto shrink-0" />
                    )}
                  </div>
                </div>
                {layer.alert && (
                  <div className="text-[10px] text-white/40 mt-1 ml-6">
                    Primary constraint in 91% of enterprises — AEHI Q4 2026
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* OS Score Display */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-10 lg:pt-0 lg:pl-16">
            <div className="text-[14px] text-white/60 mb-2 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              OS Performance Score
            </div>
            <div className="flex items-baseline mb-4">
              <span 
                className="text-[72px] font-bold text-[#00C985] leading-none" 
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                63
              </span>
              <span className="text-[24px] text-white/30 font-medium ml-1">/100</span>
            </div>
            <div className="text-[11px] text-white/40 leading-relaxed">
              <span className="text-[#00C985]">↑ +4 this month</span> · Logistics sector · AEHI benchmark: 39
            </div>
          </div>
        </div>

        {/* Platform Description Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {platformFeatures.map((feature, i) => (
            <div key={i} className="bg-[#111111] rounded-[12px] p-6 border border-white/5">
              <feature.icon className="w-6 h-6 text-[#00C985] mb-5" />
              <h4 className="text-[13px] text-white font-medium mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {feature.title}
              </h4>
              <p className="text-[12px] text-white/40 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Lifecycle phases */}
        <div className="mb-20">
          <p className="text-[13px] text-white/40 text-center mb-10">
            For enterprises that need the full installation — Crelligent delivers<br />
            ESRE OS across four structured phases.
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-6 border-t border-white/[0.08] pt-8">
            {phases.map((phase) => (
              <div key={phase.id} className="flex-1">
                <div className="text-[10px] text-white/30 mb-2 font-mono">{phase.duration}</div>
                <div className="text-[13px] font-medium text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-[#00C985] mr-2">{phase.id}</span>
                  {phase.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/esre-os/diagnostic"
            className="w-full sm:w-auto bg-[#00C985] text-black font-semibold rounded-[8px] py-[12px] px-[24px] text-[14px] flex items-center justify-center gap-2 hover:bg-[#00e094] transition-colors"
          >
            Get your free ESRE OS Performance Score
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/contact?intent=discovery"
            className="w-full sm:w-auto bg-transparent border border-white/25 text-white/80 font-medium rounded-[8px] py-[12px] px-[24px] text-[14px] flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            Book a discovery call
          </Link>
        </div>

      </div>
    </section>
  );
}
