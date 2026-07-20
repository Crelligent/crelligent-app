import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function TheVitalsCheck() {
  return (
    <section className="relative py-32 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden flex items-center justify-center text-center border-y border-white/5">
      {/* Background Graphic - Translucent Ambient Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-[#3b82f6]/20 to-[#ec4899]/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[800px] mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[300] text-white tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          How healthy is your business? Let's check.
        </h2>
        <p className="text-xl text-gray-300 font-[200] mb-12 max-w-2xl mx-auto leading-relaxed">
          A free, 3-minute diagnostic tool that tells you exactly where your cash is leaking and how to fix it before it becomes a crisis.
        </p>
        <Link 
          href="/vitals-check"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] hover:opacity-90 text-white font-[300] rounded-full text-[15px] tracking-widest transition-opacity shadow-md group"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Take the Free Vitals Check
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
