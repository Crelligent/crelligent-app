export function ImpactNumbers() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/5 text-white">
      <div className="max-w-[1200px] mx-auto text-center">
        
        <h2 className="text-3xl sm:text-4xl font-[300] mb-16 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          The scale of survival intelligence.
        </h2>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10" style={{ fontFamily: "'Outfit', sans-serif" }}>
          
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <span className="text-5xl lg:text-7xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] mb-4 tracking-tighter">
              ₦2.4B
            </span>
            <span className="text-lg font-[200] text-gray-400 leading-snug">
              Capital unlocked for micro-businesses
            </span>
          </div>

          <div className="flex flex-col items-center justify-center pt-12 md:pt-0">
            <span className="text-5xl lg:text-7xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] mb-4 tracking-tighter">
              120,000<span className="text-4xl lg:text-6xl text-[#ec4899]">+</span>
            </span>
            <span className="text-lg font-[200] text-gray-400 leading-snug">
              Active traders on the network
            </span>
          </div>

          <div className="flex flex-col items-center justify-center pt-12 md:pt-0">
            <span className="text-5xl lg:text-7xl font-[300] text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#f59e0b] mb-4 tracking-tighter">
              4.8%
            </span>
            <span className="text-lg font-[200] text-gray-400 leading-snug">
              Default rate (compared to industry avg of 18%)
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}
