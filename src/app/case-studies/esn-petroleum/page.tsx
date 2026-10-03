import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Activity, Droplets } from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

// JSON-LD for AI crawlers indexing it as an authoritative case study
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "ESN Petroleum Case Study: Enterprise Operating Systems in Africa",
  "description": "How ESN Petroleum eliminated dispatch bottlenecks and fuel shrinkage with Crelligent ESRE OS and Edge Modules.",
  "author": {
    "@type": "Organization",
    "name": "Crelligent"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Crelligent",
    "logo": {
      "@type": "ImageObject",
      "url": "https://crelligent.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://crelligent.com/case-studies/esn-petroleum"
  }
};

export default function ESNPetroleumCaseStudy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              Case Study
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              ESN Petroleum
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
              Transforming a mid-market downstream energy company in Africa through L5 Governance and PRISM integration.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { label: "AEHI Score", value: "42 → 81", icon: <Activity className="w-6 h-6 text-emerald-400" /> },
              { label: "Fuel Shrinkage", value: "-94%", icon: <Droplets className="w-6 h-6 text-blue-400" /> },
              { label: "Dispatch Approvals", value: "Automated", icon: <ShieldCheck className="w-6 h-6 text-purple-400" /> }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
                <div className="mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold font-outfit mb-2">{stat.value}</div>
                <div className="text-zinc-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Story */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold font-outfit mb-6 text-white/90">The Challenge</h2>
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-lg text-zinc-300 leading-relaxed space-y-6">
                  <p>
                    ESN Petroleum, a prominent mid-market downstream energy company operating in Africa, faced significant operational friction that hindered their growth and eroded margins.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                      <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        "L2 Scheduler" Bottleneck
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        The founder was trapped in daily operations, manually approving every single dispatch. This centralized decision-making created massive delays and prevented scale.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                      <h3 className="text-rose-400 font-medium mb-3 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Lack of "L4 Sensing"
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        Fuel shrinkage (theft) was occurring at an alarming rate, yet happening invisibly due to a lack of real-time telemetry and supply chain visibility.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold font-outfit mb-6 text-white/90">The Solution</h2>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 text-lg text-zinc-300 leading-relaxed backdrop-blur-sm">
                  <p className="mb-6">
                    Crelligent architected a comprehensive digital transformation utilizing the <strong className="text-white">ESRE OS</strong> framework to bring radical transparency and automation to ESN Petroleum.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div>
                        <strong className="text-white block mb-1">Crelligent Edge Modules (CEM)</strong>
                        Deployed across the entire tanker fleet to provide unprecedented L4 Sensing capabilities, tracking fuel levels, location, and flow rates in real-time.
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                      </div>
                      <div>
                        <strong className="text-white block mb-1">PRISM Integration</strong>
                        Connected all edge data directly into the PRISM engine, creating a single source of truth for the entire organization's logistics and telemetry.
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                      </div>
                      <div>
                        <strong className="text-white block mb-1">L5 Governance Automation</strong>
                        Implemented smart routing and automated dispatch rules, entirely removing the founder from day-to-day approval loops.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h3 className="text-xl font-bold font-outfit mb-6">Impact Summary</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Company Type</div>
                    <div className="font-medium">Mid-market Downstream Energy</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Location</div>
                    <div className="font-medium">Africa</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Technologies Used</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['ESRE OS', 'CEM', 'PRISM', 'L5 Governance'].map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                <h3 className="text-xl font-bold font-outfit mb-4 text-emerald-400">Ready to transform your operations?</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Discover how Crelligent can eliminate bottlenecks in your enterprise.
                </p>
                <button className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
