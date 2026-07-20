import { TrendingUp, MessageCircleWarning, FileSignature } from 'lucide-react'

export function SurvivalIntelligence() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-[40px] font-[300] text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            It's not just data. It's survival intelligence.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Box 1 */}
          <div className="border border-white/5 rounded-2xl p-8 hover:border-[#3b82f6]/30 hover:bg-white/[0.02] transition-all duration-300 bg-[#050505] group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3b82f6]/10 group-hover:border-[#3b82f6]/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
            </div>
            <h3 className="text-[20px] font-[300] text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Predictive Restocking
            </h3>
            <p className="text-gray-400 font-[200] leading-relaxed text-[15px]">
              The system analyzes sales velocity to predict exactly when capital will be trapped in slow-moving goods versus when fast-moving goods will run out.
            </p>
          </div>

          {/* Box 2 */}
          <div className="border border-white/5 rounded-2xl p-8 hover:border-[#8b5cf6]/30 hover:bg-white/[0.02] transition-all duration-300 bg-[#050505] group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b5cf6]/10 group-hover:border-[#8b5cf6]/20 transition-colors">
              <MessageCircleWarning className="w-6 h-6 text-gray-400 group-hover:text-[#8b5cf6] transition-colors" />
            </div>
            <h3 className="text-[20px] font-[300] text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Micro-Debt Orchestration
            </h3>
            <p className="text-gray-400 font-[200] leading-relaxed text-[15px]">
              Instead of bad debt piling up silently, the system tracks credit lines extended to customers and orchestrates automated, culturally-aware recovery nudges.
            </p>
          </div>

          {/* Box 3 */}
          <div className="border border-white/5 rounded-2xl p-8 hover:border-[#ec4899]/30 hover:bg-white/[0.02] transition-all duration-300 bg-[#050505] group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ec4899]/10 group-hover:border-[#ec4899]/20 transition-colors">
              <FileSignature className="w-6 h-6 text-gray-400 group-hover:text-[#ec4899] transition-colors" />
            </div>
            <h3 className="text-[20px] font-[300] text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Digital Identity Bridging
            </h3>
            <p className="text-gray-400 font-[200] leading-relaxed text-[15px]">
              Core translates raw WhatsApp chat logs into structured, verifiable financial statements that formal institutions can actually underwrite.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
