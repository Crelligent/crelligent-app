'use client';

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const AehiMap = dynamic(() => import('./landing/AehiMap'), { ssr: false })

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
            A quarterly benchmark of how mid-market enterprises are run, scored on the five layers of the ESRE OS, from business design to governance. The inaugural edition covers Nigeria and is collecting responses now for Q4 2026.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <Link 
              href="/aehi" 
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] tracking-widest uppercase hover:bg-white/10 hover:border-[#ec4899]/50 transition-all flex items-center gap-3 text-sm"
            >
              Explore the index
              <ArrowRight className="w-4 h-4 text-[#ec4899]" />
            </Link>
          </div>
        </div>

        {/* Right Content - Interactive Map */}
        <div className="relative flex justify-center items-center h-[500px] lg:h-[600px] w-full mt-8 lg:mt-0">
          
          <div className="absolute inset-0 z-0">
            <AehiMap height="100%" />
          </div>

          {/* Edition status card: no scores until an edition is published */}
          <div className="relative z-20 w-full max-w-sm bg-black/30 backdrop-blur-md rounded-3xl p-6 border border-white/5 shadow-2xl mt-auto lg:ml-auto pointer-events-none">
             <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="text-gray-300 text-xs uppercase tracking-widest font-[300]">Inaugural edition</div>
                <div className="text-white text-sm font-[400] tracking-wide">Q4 2026</div>
             </div>
             <div className="pt-4 space-y-2 text-sm text-gray-300 font-[300]">
               <p><span className="text-[#ec4899]">●</span> Collecting responses in Nigeria</p>
               <p className="text-gray-400">Five layers scored: Business Design, Operating Model, Technology, Data &amp; Intelligence, Governance.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
