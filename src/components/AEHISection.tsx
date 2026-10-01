import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InteractiveAfricaMap } from '@/components/InteractiveAfricaMap'

export function AEHISection() {
  return (
    <section className="py-32 px-6 relative bg-[#050505] border-t border-white/5 overflow-hidden">
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

        {/* Right Content - Interactive Africa Map */}
        <div className="relative flex justify-center items-center h-[550px] lg:h-[700px] w-full">
          <InteractiveAfricaMap />
        </div>
      </div>
    </section>
  )
}
