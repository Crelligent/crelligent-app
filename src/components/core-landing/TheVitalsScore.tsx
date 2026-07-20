import { Activity, RefreshCcw, Vault } from 'lucide-react'

export function TheVitalsScore() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div>
            <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#3b82f6] mb-4 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The Vitals Score
            </span>
            <h2 className="text-4xl sm:text-[40px] leading-[1.15] font-[300] text-white tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The new standard for informal creditworthiness.
            </h2>
            <p className="text-lg text-gray-300 font-[200] leading-relaxed mb-10">
              Traditional credit bureaus look for fixed salaries and formal collateral. The grassroots economy doesn't work that way. The Vitals Score evaluates the true health of an informal business across three critical pillars:
            </p>

            <div className="space-y-8">
              {/* Pillar 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center shrink-0">
                  <RefreshCcw className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <div>
                  <h4 className="text-[17px] font-[300] text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Cash Velocity</h4>
                  <p className="text-gray-400 font-[200] text-[15px] leading-relaxed">How fast money moves through the business. Measures inventory turnover against account receivables.</p>
                </div>
              </div>
              {/* Pillar 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-[#ec4899]" />
                </div>
                <div>
                  <h4 className="text-[17px] font-[300] text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Supplier Dependency</h4>
                  <p className="text-gray-400 font-[200] text-[15px] leading-relaxed">Risk of supply chain collapse. Measures diversification of stock sources and reorder lag times.</p>
                </div>
              </div>
              {/* Pillar 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0">
                  <Vault className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <h4 className="text-[17px] font-[300] text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Capital Retention</h4>
                  <p className="text-gray-400 font-[200] text-[15px] leading-relaxed">How much profit actually stays. Evaluates the ratio of revenue against daily operational leakage and dead stock.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Gauge Visual */}
          <div className="relative flex justify-center items-center p-8 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(59,130,246,0.05)]">
            <div className="relative w-full max-w-[400px] aspect-square flex flex-col items-center justify-center">
              
              {/* SVG Gauge */}
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                {/* Background Track */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#1f2937" strokeWidth="12" strokeDasharray="377 125" />
                
                {/* Score Fill (742 / 850 = ~87%) -> 0.87 * 377 = 328 */}
                <circle 
                  cx="100" cy="100" r="80" 
                  fill="none" 
                  stroke="url(#gradientScore)" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeDasharray="328 174" 
                  className="drop-shadow-sm transition-all duration-1000 ease-out" 
                />
                
                <defs>
                  <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="text-sm font-[300] text-gray-500 uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Vitals Score</span>
                <div className="flex items-baseline gap-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <span className="text-6xl font-[300] text-white tracking-tighter">742</span>
                  <span className="text-xl text-gray-500 font-[200]">/850</span>
                </div>
                <div className="mt-4 px-4 py-1.5 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-full text-[11px] font-[400] uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  RESILIENT
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
