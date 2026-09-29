import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldAlert, Zap, Lock } from 'lucide-react';

export function AgenticComparison() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto font-outfit border-t border-white/10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Run your ESRE OS, with Agentic AI</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Crelligent engineers the operating system. You choose who executes the actions on it—your human team, or Crelligent, with Agentic AI. We deploy our proprietary ESRE AI Engine as governed agents to actively manage, route, and monitor your enterprise architecture.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Base ESRE OS Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition">
          <h3 className="text-3xl font-light text-white mb-4">ESRE OS</h3>
          <p className="text-gray-400 mb-8 min-h-[80px]">
            The enterprise operating system, diagnosed, architected, installed, and monitored. Get a live OS Performance Score and weekly AI recommendations. Your team acts on them.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /><span className="text-gray-300">Live OS Performance Score</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /><span className="text-gray-300">Weekly AI recommendations</span></div>
            <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /><span className="text-gray-300">Human execution</span></div>
          </div>
          <Link href="/onboarding" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
            Get your free OS Performance Score <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Agentic ESRE OS Card */}
        <div className="bg-white/5 border border-[#22c55e]/50 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#22c55e] text-black text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg z-10">
            Launching
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-50 pointer-events-none" />
          
          <h3 className="text-3xl font-light text-[#22c55e] mb-4 flex items-center gap-3">
            <Zap className="w-6 h-6" /> ESRE OS, with Agentic AI
          </h3>
          <p className="text-gray-400 mb-6 min-h-[80px]">
            Crelligent deploys Agentic AI directly into your ESRE OS. Our agents actively monitor the Sensing Layer (L4), draft remediation tasks when drift occurs, and automate workflows in your L2 Scheduler. The ESRE AI Engine proposes actions; you approve them within the limits of your Governance Matrix.
          </p>
          
          <div className="bg-black/30 border border-white/5 rounded-xl p-5 mb-8">
            <h4 className="text-sm text-white font-medium mb-3 flex items-center gap-2"><Lock className="w-4 h-4 text-amber-400" /> Autonomy you control</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><strong className="text-gray-300">Assist:</strong> agents analyse and draft. You do the rest.</li>
              <li><strong className="text-gray-300">Act with approval:</strong> agents propose. A named approver signs off.</li>
              <li><strong className="text-gray-300">Act within policy:</strong> low-risk actions you have pre-approved run automatically. Everything is still logged.</li>
            </ul>
          </div>

          <Link href="/onboarding" className="inline-flex items-center gap-2 text-[#22c55e] hover:text-[#22c55e]/80 font-medium">
            See if you're ready for agents <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-500 mt-4 italic">Available to enterprises that meet the ESRE OS readiness threshold. Requires ESRE OS.</p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-black/40">
              <th className="p-4 text-white font-medium">Capability</th>
              <th className="p-4 text-white font-medium">ESRE OS</th>
              <th className="p-4 text-[#22c55e] font-medium">Agentic ESRE OS</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-300">
            <tr className="border-b border-white/5">
              <td className="p-4">Diagnose and score your enterprise</td>
              <td className="p-4">Yes</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">Live OS Performance Score</td>
              <td className="p-4">Yes</td>
              <td className="p-4">Yes</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">Recommendations</td>
              <td className="p-4">Weekly, AI-generated</td>
              <td className="p-4">Weekly, AI-generated</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">Executes approved actions</td>
              <td className="p-4 text-gray-500">No</td>
              <td className="p-4 text-[#22c55e]">Yes</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">Human approval</td>
              <td className="p-4">You act on every recommendation</td>
              <td className="p-4">You approve, or pre-approve within policy</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="p-4">Governance and audit trail</td>
              <td className="p-4">Governance Matrix</td>
              <td className="p-4">Governance Matrix plus full agent action log</td>
            </tr>
            <tr>
              <td className="p-4">Pricing</td>
              <td className="p-4">Contact us</td>
              <td className="p-4">Contact us. Agent actions use Service Credits</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


