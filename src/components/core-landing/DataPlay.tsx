import { Layers, Database, Banknote } from 'lucide-react'

export function DataPlay() {
  return (
    <section id="data" className="py-24 px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div>
            <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#3b82f6] mb-4 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The Layer 7 Data Play
            </span>
            <h2 className="text-4xl sm:text-[40px] font-[300] text-white tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Beyond the transaction. <br/> Understanding the intent.
            </h2>
            <p className="text-lg text-gray-300 font-[200] leading-relaxed mb-6">
              Standard payment gateways only see Layer 1: the transaction amount. They know money moved, but they don't know why.
            </p>
            <p className="text-lg text-gray-300 font-[200] leading-relaxed">
              Crelligent Core operates at Layer 7: the intent layer. We don't just know a trader received ₦40,000. We know it was for 5 bags of rice, sold to Mama Nkechi, and that she still owes ₦80,000. This is the difference between a simple ledger and true business intelligence.
            </p>
          </div>

          {/* Right Visual Stack */}
          <div className="relative pt-12 lg:pt-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className="relative w-full max-w-md mx-auto space-y-4">
              
              {/* Top Layer (Crelligent Core) */}
              <div className="bg-[#050505] border border-[#ec4899]/50 rounded-xl p-6 shadow-[0_10px_30px_rgba(236,72,153,0.1)] relative transform transition-transform hover:-translate-y-2 z-30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#ec4899]/20 text-[#ec4899] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Layer 7</div>
                  <h4 className="font-[300] text-white text-lg">Crelligent Core (Intent)</h4>
                </div>
                <div className="flex items-start gap-4">
                  <Layers className="w-8 h-8 text-[#ec4899] shrink-0 mt-1" />
                  <div className="font-sans font-[200] text-sm text-gray-400 space-y-1">
                    <p><span className="font-medium text-white">Item:</span> 5 Bags Rice</p>
                    <p><span className="font-medium text-white">Buyer:</span> Mama Nkechi</p>
                    <p><span className="font-medium text-white">Status:</span> ₦40k Paid, ₦80k Debt remaining</p>
                    <p><span className="font-medium text-[#ec4899]">Action:</span> Triggered restock alert for rice.</p>
                  </div>
                </div>
              </div>

              {/* Middle Layer (Bank) */}
              <div className="bg-[#050505] border border-[#3b82f6]/30 rounded-xl p-6 shadow-md relative transform transition-transform hover:-translate-y-1 z-20 mx-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#3b82f6]/20 text-[#3b82f6] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Layer 4</div>
                  <h4 className="font-[300] text-white text-lg">Bank Ledger (Movement)</h4>
                </div>
                <div className="flex items-center gap-4">
                  <Banknote className="w-6 h-6 text-[#3b82f6] shrink-0" />
                  <div className="font-sans font-[200] text-sm text-gray-400">
                    <p>Transfer received from Opay account: ₦40,000</p>
                  </div>
                </div>
              </div>

              {/* Bottom Layer (Payment Gateway) */}
              <div className="bg-[#050505] border border-white/10 rounded-xl p-6 shadow-sm relative z-10 mx-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/10 text-gray-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Layer 1</div>
                  <h4 className="font-[300] text-gray-400 text-lg">Payment Gateway (Raw)</h4>
                </div>
                <div className="flex items-center gap-4">
                  <Database className="w-6 h-6 text-gray-500 shrink-0" />
                  <div className="font-sans font-[200] text-sm text-gray-500 font-mono">
                    TXN_SUCCESS: +₦40,000
                  </div>
                </div>
              </div>

              {/* Connecting vertical dash line */}
              <div className="absolute top-8 left-[3.25rem] bottom-8 w-px border-l border-dashed border-white/20 -z-10 hidden sm:block"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
