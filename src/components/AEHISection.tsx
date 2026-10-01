import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AEHISection() {
  return (
    <section className="py-32 px-6 relative bg-gradient-to-br from-[#050505] to-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex">
            <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#ec4899] border border-[#ec4899]/20 rounded-full px-4 py-1.5 bg-[#ec4899]/5" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Enterprise Intelligence
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-[300] text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            The African Enterprise Health Index.
          </h2>
          
          <p className="text-lg leading-relaxed text-gray-400 font-[200]">
            The AEHI is the definitive benchmark for mid-market enterprises across Africa. We evaluate organizations against a rigorous 5-layer framework to generate the ESRE OS Performance Score—an objective measure of your operational resilience, technology posture, and process maturity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link 
              href="/aehi" 
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] tracking-widest uppercase hover:bg-white/10 hover:border-[#ec4899]/50 transition-all flex items-center gap-3 text-sm"
            >
              Explore The Benchmark
              <ArrowRight className="w-4 h-4 text-[#ec4899]" />
            </Link>
          </div>
        </div>

        {/* Right Content - Abstract visual */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-[#ec4899]/10 rounded-3xl transform rotate-3 scale-105" />
          <div className="relative w-full max-w-lg bg-[#050505] rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col gap-8">
             <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <div className="text-gray-400 text-sm uppercase tracking-widest font-[300]">Avg Market Score</div>
                <div className="text-white text-2xl font-[300] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>64.6<span className="text-sm text-gray-500 ml-1">/100</span></div>
             </div>
             
             <div className="space-y-6">
               {[
                 { layer: 'L1', name: 'Business Design', score: 85 },
                 { layer: 'L2', name: 'Operating Model', score: 65, alert: true },
                 { layer: 'L3', name: 'Technology & Platform', score: 78 },
                 { layer: 'L4', name: 'Data & Intelligence', score: 60, alert: true },
                 { layer: 'L5', name: 'Governance & Risk', score: 72 }
               ].map((l) => (
                  <div key={l.layer} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                       <span className="text-[#ec4899] text-xs font-[400] uppercase tracking-widest bg-[#ec4899]/10 px-2 py-1 rounded">{l.layer}</span>
                       <span className="text-gray-300 text-[15px] font-[300] tracking-wide">{l.name}</span>
                    </div>
                    <div className="flex items-center gap-4 w-40">
                       <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-1000 ${l.alert ? 'bg-amber-400' : 'bg-[#3b82f6]'}`} style={{ width: `${l.score}%` }} />
                       </div>
                       <span className={`text-sm w-6 text-right ${l.alert ? 'text-amber-400' : 'text-gray-400'}`}>{l.score}</span>
                    </div>
                  </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
