import { WhatsAppSimulator } from '@/components/shared/WhatsAppSimulator'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-[#050505] overflow-hidden flex items-center border-b border-white/5">
      {/* Subtle Premium Gradients */}
      <div className="absolute bottom-0 left-0 w-full max-w-2xl h-full max-h-[800px] bg-gradient-to-tr from-[#3b82f6]/10 to-transparent blur-3xl pointer-events-none rounded-full transform -translate-x-1/2 translate-y-1/3" />
      <div className="absolute top-0 right-0 w-full max-w-2xl h-full max-h-[800px] bg-gradient-to-bl from-[#ec4899]/5 to-transparent blur-3xl pointer-events-none rounded-full transform translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex">
            <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#3b82f6] border border-[#3b82f6]/20 rounded-full px-4 py-1.5 bg-[#3b82f6]/5" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Crelligent Core · Survival Intelligence for the Grassroots Economy
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] font-[300] text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Your business runs on memory.<br />
            We give it a brain.
          </h1>
          
          <p className="text-xl sm:text-[22px] leading-relaxed text-gray-300 font-[200] max-w-xl">
            Crelligent Core is the intelligence copilot for market traders, artisans, and micro-enterprises across Nigeria. Track your stock, understand your cash, and build the financial identity your business deserves — entirely on WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Link 
              href="#traders" 
              className="px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] hover:opacity-90 text-white font-[300] rounded-full text-[15px] tracking-widest transition-opacity shadow-md flex items-center justify-center min-w-[200px]"
            >
              Start on WhatsApp
            </Link>
            <Link 
              href="#partners" 
              className="px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-[300] rounded-full text-[15px] tracking-widest transition-all flex items-center justify-center min-w-[200px]"
            >
              Partner with us
            </Link>
          </div>
          
          <div className="pt-2">
            <p className="text-gray-500 text-sm font-[300] tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Works on any phone <span className="text-[#3b82f6] mx-2">•</span> No app download <span className="text-[#3b82f6] mx-2">•</span> Available in local languages
            </p>
          </div>
        </div>

        {/* Right Content - WhatsApp Simulator Mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-[#ec4899]/5 rounded-3xl transform rotate-3 scale-105" />
          <div className="relative w-full max-w-md transform -rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-3xl border border-white/10">
            <WhatsAppSimulator />
          </div>
        </div>

      </div>
    </section>
  )
}
