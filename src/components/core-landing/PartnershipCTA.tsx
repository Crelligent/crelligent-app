import Link from 'next/link'
import { ArrowRight, Code } from 'lucide-react'

export function PartnershipCTA() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 via-transparent to-[#ec4899]/10" />
      </div>

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[300] text-white tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
          The grassroots economy is ready.<br/> Are you?
        </h2>
        
        <p className="text-xl text-gray-300 font-[200] mb-12 leading-relaxed">
          Stop relying on guesswork. Partner with Crelligent Core to deploy capital with unprecedented visibility and structured survival intelligence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <Link 
            href="mailto:core@crelligent.com"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] hover:opacity-90 text-white font-[300] rounded-full text-[15px] tracking-widest transition-opacity shadow-md flex items-center justify-center gap-2 group"
          >
            Contact Institutional Sales
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="#api"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-[300] rounded-full text-[15px] tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5" />
            Explore API Documentation
          </Link>
        </div>

      </div>
    </section>
  )
}
