export function TheProblem() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-[40px] leading-[1.15] font-[300] text-white tracking-tight mb-10" style={{ fontFamily: "'Outfit', sans-serif" }}>
              65% of informal businesses collapse within three years. Not because the owner lacked ambition. Because they lacked a system.
            </h2>
            
            <div className="space-y-6 text-lg sm:text-[19px] leading-relaxed text-gray-300 font-[200]">
              <p>
                The market trader runs their entire business in their head. Stock levels, what customers owe, what suppliers are owed, how much was made last Tuesday — all of it stored in memory and notebooks that can be lost, stolen, or forgotten. When something goes wrong — illness, a bad month, a supplier who disappears — there is no system to fall back on.
              </p>
              
              <p>
                Formal institutions know this market exists. They know it generates over 58% of Nigeria's GDP. But they cannot serve it because they cannot see it. No credit history. No financial records. No structured data. The informal economy is invisible to the systems designed to support it.
              </p>
              
              <p className="font-[400] text-white">
                Crelligent Core was built to solve both problems simultaneously. Give the trader a system they will actually use. Give the institution the data it needs to serve them. Create the bridge that turns Nigeria's largest economic layer into a structured, intelligent, and financeable ecosystem.
              </p>
            </div>
          </div>
          
          {/* Accent Graphic Area */}
          <div className="hidden lg:block lg:col-span-4 relative">
             <div className="absolute top-10 left-0 w-full h-full border-l-4 border-[#3b82f6]/50 pl-8 flex flex-col justify-center opacity-30">
                <div className="w-32 h-32 rounded-full border border-[#3b82f6]/40 mb-4 animate-[spin_60s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
                <div className="w-24 h-24 rounded-full border border-[#ec4899]/40 absolute top-1/2 -translate-y-1/2 left-16 animate-[spin_40s_linear_infinite_reverse]" style={{ borderStyle: 'dotted' }} />
             </div>
          </div>
        </div>

        {/* Four Large Stat Callouts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-5xl lg:text-6xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] mb-2 tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>58%</span>
            <span className="text-sm font-[300] text-gray-400 uppercase tracking-wide leading-snug">Of Nigeria's GDP from the informal sector</span>
          </div>
          <div className="flex flex-col">
            <span className="text-5xl lg:text-6xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] mb-2 tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>40M</span>
            <span className="text-sm font-[300] text-gray-400 uppercase tracking-wide leading-snug">Micro-enterprises with no structured business intelligence</span>
          </div>
          <div className="flex flex-col">
            <span className="text-5xl lg:text-6xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#f59e0b] mb-2 tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>65%</span>
            <span className="text-sm font-[300] text-gray-400 uppercase tracking-wide leading-snug">Of informal businesses fail within 3 years without a system</span>
          </div>
          <div className="flex flex-col">
            <span className="text-5xl lg:text-6xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#22c55e] mb-2 tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>₦0</span>
            <span className="text-sm font-[300] text-gray-400 uppercase tracking-wide leading-snug">Average credit available to informal traders without formal records</span>
          </div>
        </div>
        
      </div>
    </section>
  )
}
