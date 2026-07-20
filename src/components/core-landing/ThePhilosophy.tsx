import { MessageSquareText, ShieldCheck, Zap } from 'lucide-react'

export function ThePhilosophy() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#050505] border-y border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-[40px] font-[300] text-white tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Zero Friction. Not Zero Effort.
          </h2>
          <p className="text-lg text-gray-400 font-[200] max-w-2xl mx-auto">
            You cannot force a market trader to learn complex accounting software. 
            You have to meet them exactly where they already are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
          
          {/* Pillar 1 */}
          <div className="relative rounded-xl overflow-hidden p-[1px] group flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#3b82f6] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#0a0a0a] rounded-xl p-8 flex flex-col flex-1 h-full z-10 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="w-12 h-12 rounded bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center mb-6 group-hover:bg-[#ec4899]/20 transition relative z-10">
                <MessageSquareText className="w-6 h-6 text-[#ec4899]" />
              </div>
              
              <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white relative z-10">
                The UI is Conversation
              </h3>
              <p className="text-base text-gray-300 font-[200] leading-loose opacity-80 flex-1 relative z-10">
                There are no forms, no menus, and no dashboards for the trader to navigate. They just chat with the bot on WhatsApp the same way they chat with their suppliers.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative rounded-xl overflow-hidden p-[1px] group flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#22c55e] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#0a0a0a] rounded-xl p-8 flex flex-col flex-1 h-full z-10 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="w-12 h-12 rounded bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6 group-hover:bg-[#8b5cf6]/20 transition relative z-10">
                <Zap className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              
              <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white relative z-10">
                Instant Utility
              </h3>
              <p className="text-base text-gray-300 font-[200] leading-loose opacity-80 flex-1 relative z-10">
                The bot doesn't ask for a 10-year business plan. It asks what was sold today. It immediately generates a professional digital receipt the trader can forward to their customer.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="relative rounded-xl overflow-hidden p-[1px] group flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#22c55e] to-[#ec4899] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#0a0a0a] rounded-xl p-8 flex flex-col flex-1 h-full z-10 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="w-12 h-12 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-6 group-hover:bg-[#3b82f6]/20 transition relative z-10">
                <ShieldCheck className="w-6 h-6 text-[#3b82f6]" />
              </div>
              
              <h3 className="text-2xl font-[300] tracking-wide mb-4 text-white relative z-10">
                Silent Structuring
              </h3>
              <p className="text-base text-gray-300 font-[200] leading-loose opacity-80 flex-1 relative z-10">
                While the trader is just chatting, Crelligent Core is working silently in the background, structuring that conversational data into formal financial ledgers and credit scores.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
