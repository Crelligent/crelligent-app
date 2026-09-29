import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { InternalAuthorityGraph } from '../shared/InternalAuthorityGraph';

interface CapabilityLayoutProps {
  title: string;
  definition: string;
  businessProblems: string[];
  methodology: string;
  deliverables: string[];
  esreLayer: string;
  graphProps: any;
}

export function CapabilityLayout({ 
  title, 
  definition, 
  businessProblems, 
  methodology, 
  deliverables, 
  esreLayer,
  graphProps
}: CapabilityLayoutProps) {
  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto font-outfit">
      
      {/* Hero Section */}
      <div className="mb-20">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 font-mono mb-6">
          ESRE OS LAYER: {esreLayer}
        </div>
        <h1 className="text-5xl md:text-6xl font-light text-white mb-8 tracking-tight">{title}</h1>
        <p className="text-2xl text-gray-400 leading-relaxed max-w-3xl border-l-2 border-[#22c55e] pl-6">
          {definition}
        </p>
      </div>

      {/* The Business Problem */}
      <div className="mb-20 bg-red-500/5 border border-red-500/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-6 h-6 text-red-400" />
          <h2 className="text-3xl font-light text-white">When this becomes the constraint</h2>
        </div>
        <p className="text-gray-400 mb-8 text-lg">Enterprises that lack structured design in this area typically experience:</p>
        <div className="grid md:grid-cols-2 gap-4">
          {businessProblems.map((prob, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
              <span className="text-gray-300">{prob}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Crelligent Methodology */}
      <div className="mb-20">
        <h2 className="text-3xl font-light text-white mb-6">Crelligent's Systems Approach</h2>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <div dangerouslySetInnerHTML={{ __html: methodology }} />
        </div>
      </div>

      {/* Deliverables */}
      <div className="mb-20">
        <h2 className="text-3xl font-light text-white mb-8">Tangible Architecture Outputs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((del, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
              <span className="text-gray-200">{del}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Authority Graph */}
      <InternalAuthorityGraph {...graphProps} />

      {/* CTA */}
      <div className="mt-20 text-center bg-white/[0.02] border border-white/5 rounded-2xl p-12">
        <h2 className="text-3xl font-light text-white mb-6">Diagnose your {title.toLowerCase()}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Schedule a free structural diagnostic with a Crelligent Systems Architect to identify bottlenecks in your operating model.
        </p>
        <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-medium rounded-lg hover:bg-[#22c55e]/90 transition">
          Schedule Diagnostic <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
