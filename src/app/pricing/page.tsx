import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Layers, ShieldCheck, Activity, Cpu } from "lucide-react";
import Footer from "@/components/shared/Footer";
import { Navigation } from "@/components/shared/Navigation";

export const metadata = {
  title: "Pricing | ESRE OS",
  description: "Enterprise operating system pricing and installation packages.",
};

const plans = [
  {
    name: "Growth OS",
    target: "Series A / Early Scaling",
    description: "Lay the foundational architecture to survive early scaling complexity.",
    implementation: "$15,000",
    retainer: "$2,500 / mo",
    features: [
      "L1: Business Design & Kernel",
      "L2: Operating Model & Scheduler",
      "Process Architecture Mapping",
      "Incentive System Alignment",
      "Quarterly Strategy Audits",
    ],
    cta: "Book Diagnostic",
    popular: false,
  },
  {
    name: "Mid-Market OS",
    target: "Series B+ / Established SMEs",
    description: "Full OS Core installation for organizations experiencing structural drag.",
    implementation: "$45,000",
    retainer: "$7,500 / mo",
    features: [
      "L1 - L5 Core Installation",
      "Technology & Infrastructure (L3)",
      "Data & Sensing Engine (L4)",
      "Governance & Risk (L5)",
      "Continuous Monitoring via PRISM",
      "Monthly Architecture Reviews",
    ],
    cta: "Book Diagnostic",
    popular: true,
  },
  {
    name: "Enterprise Architecture",
    target: "Large Corporates",
    description: "Custom OS architecture + Application Runtime modules for global scale.",
    implementation: "Custom",
    retainer: "Custom",
    features: [
      "Bespoke OS Core Implementation",
      "Product Strategy Integration",
      "Economics & Value Engineering",
      "CX / Service Design overhaul",
      "Dedicated On-site Engineering Team",
      "Board-level Reporting",
    ],
    cta: "Contact Partners",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit selection:bg-[#22c55e]/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#22c55e]/10 via-[#050505] to-[#050505] opacity-50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-6">
            Install the <span className="text-[#22c55e]">Operating System</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
            ESRE OS is not a software subscription. It is a structural installation. We architect your organization, deploy the systems, and maintain the runtime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 lg:px-8 pb-32 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.popular
                    ? "border-[#22c55e]/50 bg-white/[0.02] shadow-[0_0_40px_rgba(34,197,94,0.1)]"
                    : "border-white/10 bg-black/50"
                } p-8 flex flex-col backdrop-blur-xl transition-all hover:border-white/20`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#22c55e] text-black text-xs font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="text-xs font-mono text-[#22c55e] mb-2 uppercase tracking-wider">{plan.target}</div>
                  <h3 className="text-2xl font-light text-white mb-3">{plan.name}</h3>
                  <p className="text-sm text-gray-400 font-sans h-12">{plan.description}</p>
                </div>

                <div className="mb-8 space-y-4 font-sans">
                  <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-gray-400">Implementation</span>
                    <span className="text-2xl font-light text-white">{plan.implementation}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-400">Managed Retainer</span>
                    <span className="text-2xl font-light text-white">{plan.retainer}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1 font-sans">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? "bg-[#22c55e] text-black hover:bg-[#22c55e]/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Suites Breakdown */}
      <section className="border-t border-white/5 py-32 relative bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-3xl font-light text-white mb-4">What's in the OS Core?</h2>
            <p className="text-gray-400 font-sans max-w-2xl">The five layers of enterprise architecture deployed during the Implementation phase.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            <div className="p-6 rounded-xl border border-white/5 bg-black/50">
              <Layers className="w-6 h-6 text-[#22c55e] mb-4" />
              <h4 className="text-white font-medium mb-2">L1 & L2: The Kernel</h4>
              <p className="text-sm text-gray-400">Business model redesign, value engineering, and operating process blueprints.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-black/50">
              <Cpu className="w-6 h-6 text-[#22c55e] mb-4" />
              <h4 className="text-white font-medium mb-2">L3: Infrastructure</h4>
              <p className="text-sm text-gray-400">Deployment of technical systems, ERPs, CRMs, and unified identity access.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-black/50">
              <Activity className="w-6 h-6 text-[#22c55e] mb-4" />
              <h4 className="text-white font-medium mb-2">L4: Sensing Layer</h4>
              <p className="text-sm text-gray-400">Integration of real-time data pipelines and operational intelligence dashboards.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-black/50">
              <ShieldCheck className="w-6 h-6 text-[#22c55e] mb-4" />
              <h4 className="text-white font-medium mb-2">L5: Security</h4>
              <p className="text-sm text-gray-400">Governance frameworks, compliance protocols, and systemic risk mitigation.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
