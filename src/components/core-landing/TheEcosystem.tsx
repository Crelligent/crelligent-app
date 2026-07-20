import { Store, Landmark, Truck } from 'lucide-react'

export function TheEcosystem() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-[40px] font-[300] text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            An ecosystem of resilience.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Market Trader */}
          <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/5 shadow-sm hover:border-[#3b82f6]/30 transition-colors">
            <div className="w-12 h-12 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-6">
              <Store className="w-6 h-6 text-[#3b82f6]" />
            </div>
            <h3 className="text-[22px] font-[300] text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              For the Market Trader
            </h3>
            <ul className="space-y-3 text-gray-400 font-[200] text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6] mt-1">•</span>
                Free WhatsApp business management.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6] mt-1">•</span>
                Digital receipts and automated invoices.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6] mt-1">•</span>
                Automatic debtor tracking & nudges.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6] mt-1">•</span>
                A verifiable financial identity to unlock capital.
              </li>
            </ul>
          </div>

          {/* Microfinance & Banks */}
          <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#ec4899]/50 shadow-[0_0_30px_rgba(236,72,153,0.1)] transform md:-translate-y-4">
            <div className="w-12 h-12 bg-[#ec4899]/10 border border-[#ec4899]/20 rounded-xl flex items-center justify-center mb-6">
              <Landmark className="w-6 h-6 text-[#ec4899]" />
            </div>
            <h3 className="text-[22px] font-[300] text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              For Microfinance & Banks
            </h3>
            <ul className="space-y-3 text-gray-400 font-[200] text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-[#ec4899] mt-1">•</span>
                Pre-scored, hyper-localized borrower cohorts.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ec4899] mt-1">•</span>
                API integration directly to the Vitals Score.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ec4899] mt-1">•</span>
                Lower acquisition and underwriting costs.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ec4899] mt-1">•</span>
                Drastically lower NPLs (Non-Performing Loans).
              </li>
            </ul>
          </div>

          {/* FMCGs & Distributors */}
          <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/5 shadow-sm hover:border-[#8b5cf6]/30 transition-colors">
            <div className="w-12 h-12 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl flex items-center justify-center mb-6">
              <Truck className="w-6 h-6 text-[#8b5cf6]" />
            </div>
            <h3 className="text-[22px] font-[300] text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              For FMCGs & Distributors
            </h3>
            <ul className="space-y-3 text-gray-400 font-[200] text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-1">•</span>
                Real-time visibility into secondary and tertiary sales.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-1">•</span>
                Predictive stock depletion and route optimization.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-1">•</span>
                Direct-to-retailer micro-credit facilitation.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-1">•</span>
                Data-driven product launch planning.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
