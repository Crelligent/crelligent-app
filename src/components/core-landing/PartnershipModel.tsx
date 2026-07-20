import { Building2, Store, Network } from 'lucide-react'

export function PartnershipModel() {
  return (
    <section id="partners" className="py-32 px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto text-center">
        
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-[300] text-white tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
            We do not compete with banks.<br/>
            We give them eyes.
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 font-[200] max-w-4xl mx-auto leading-relaxed">
            Crelligent Core operates a B2B2C model. We provide the intelligence layer for free to the grassroots economy. We monetize by providing de-risked, pre-qualified cohorts to institutional partners who want to deploy capital but lack the ground-level data to do so safely.
          </p>
        </div>

        {/* Diagram */}
        <div className="relative max-w-5xl mx-auto mt-20 hidden md:block" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#3b82f6]/20 via-[#ec4899] to-[#3b82f6]/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-3 gap-8 relative z-10">
            
            {/* Left: The Trader */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-2xl relative">
              <div className="w-16 h-16 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-2xl flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <h3 className="text-xl font-[300] text-white mb-2">The Trader</h3>
              <p className="text-sm text-gray-400 font-[200] leading-relaxed">
                Uses Vitals Bot for free via WhatsApp. Logs daily sales, manages debtors, and builds an organic financial history simply by chatting.
              </p>
              
              {/* Output arrow badge */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#3b82f6] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Raw Data
              </div>
            </div>

            {/* Middle: Crelligent Core */}
            <div className="bg-[#0a0a0a] border border-[#ec4899] rounded-2xl p-8 flex flex-col items-center shadow-[0_0_40px_rgba(236,72,153,0.15)] transform scale-110 z-20">
              <div className="w-16 h-16 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-2xl flex items-center justify-center mb-6">
                <Network className="w-8 h-8 text-[#ec4899]" />
              </div>
              <h3 className="text-xl font-[300] text-white mb-2">Crelligent Core</h3>
              <p className="text-sm text-gray-400 font-[200] leading-relaxed">
                Our intelligence layer ingests the raw conversational data, structures it, and continually calculates the business Vitals Score.
              </p>
              
              {/* Output arrow badge */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#ec4899] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                Vitals Score
              </div>
            </div>

            {/* Right: The Partner */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-2xl relative">
              <div className="w-16 h-16 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-[#8b5cf6]" />
              </div>
              <h3 className="text-xl font-[300] text-white mb-2">The Partner</h3>
              <p className="text-sm text-gray-400 font-[200] leading-relaxed">
                Microfinance Banks, FMCGs, and DFIs access pre-qualified, de-risked cohorts. They deploy capital exactly where it will yield returns.
              </p>
            </div>

          </div>
        </div>

        {/* Mobile View Diagram */}
        <div className="md:hidden space-y-6 mt-12 relative" style={{ fontFamily: "'Outfit', sans-serif" }}>
           <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#3b82f6]/30 via-[#ec4899]/30 to-[#8b5cf6]/30 z-0"></div>
           
           <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-left relative z-10 ml-4 flex gap-4">
              <div className="w-10 h-10 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-xl flex items-center justify-center shrink-0">
                <Store className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-lg font-[300] text-white mb-1">The Trader</h3>
                <p className="text-sm text-gray-400 font-[200]">Provides raw operational data via WhatsApp.</p>
              </div>
           </div>

           <div className="bg-[#0a0a0a] border border-[#ec4899]/50 rounded-2xl p-6 text-left relative z-10 ml-4 flex gap-4 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
              <div className="w-10 h-10 bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-xl flex items-center justify-center shrink-0">
                <Network className="w-5 h-5 text-[#ec4899]" />
              </div>
              <div>
                <h3 className="text-lg font-[300] text-white mb-1">Crelligent Core</h3>
                <p className="text-sm text-gray-400 font-[200]">Structures data and generates Vitals Score.</p>
              </div>
           </div>

           <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-left relative z-10 ml-4 flex gap-4">
              <div className="w-10 h-10 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div>
                <h3 className="text-lg font-[300] text-white mb-1">The Partner</h3>
                <p className="text-sm text-gray-400 font-[200]">Deploys capital to de-risked cohorts safely.</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}
