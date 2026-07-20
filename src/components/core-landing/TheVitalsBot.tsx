'use client'

import React, { useEffect, useState } from 'react'

export function TheVitalsBot() {
  const [activeBlock, setActiveBlock] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const blocks = document.querySelectorAll('.scroll-block');
      let current = 0;
      blocks.forEach((block, index) => {
        const rect = block.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = index;
        }
      });
      setActiveBlock(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#3b82f6] mb-4 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
            The ESRE Vitals Bot
          </span>
          <h2 className="text-4xl sm:text-5xl font-[300] text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Manage your business. Just by chatting.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left: Sticky Phone Mockup */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="sticky top-32 w-full max-w-[320px] h-[640px] bg-[#0B141A] rounded-[3rem] border-[8px] border-[#1A1A1A] shadow-[0_20px_50px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col relative">
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#1A1A1A] rounded-b-3xl w-40 mx-auto z-20"></div>
              
              {/* WhatsApp Header (Dark Mode) */}
              <div className="bg-[#1F2C34] text-white p-4 pt-10 flex items-center gap-3 z-10 shadow-md">
                <div className="w-10 h-10 bg-[#00A884] text-black rounded-full flex items-center justify-center font-bold text-lg">CB</div>
                <div>
                  <div className="font-semibold text-[15px]">Crelligent Bot</div>
                  <div className="text-xs text-[#00A884]">online</div>
                </div>
              </div>

              {/* Chat Body (Dark Mode) */}
              <div className="flex-1 bg-[#0B141A] p-4 flex flex-col gap-4 overflow-y-auto font-sans text-sm pb-20 relative">
                {/* Chat Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
                
                {/* Message 1 */}
                <div className={`transition-opacity duration-500 ${activeBlock >= 0 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="bg-[#005C4B] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] ml-auto text-white">
                    I just sell 5 bags of rice, 40k each. But Mama Nkechi still owe me for the 2 bags from yesterday.
                    <div className="text-[10px] text-right text-gray-400 mt-1">10:42 AM</div>
                  </div>
                </div>
                
                {/* Message 2 */}
                <div className={`transition-opacity duration-500 delay-300 ${activeBlock >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-[#202C33] p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-white">
                    Recorded! ✅ ₦200,000 in sales today.<br/><br/>
                    I've noted Mama Nkechi's debt of ₦80,000. Your total cash expected this week is now ₦280,000.
                    <div className="text-[10px] text-right text-gray-400 mt-1">10:43 AM</div>
                  </div>
                </div>

                {/* Message 3 */}
                <div className={`transition-opacity duration-500 ${activeBlock >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-[#202C33] p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-white border-l-4 border-[#ef4444]">
                    ⚠️ <b className="text-[#ef4444]">Stock Alert</b><br/>
                    You only have 3 bags of rice left. You usually sell 10 bags by Friday. You need to restock soon.
                    <div className="text-[10px] text-right text-gray-400 mt-1">11:15 AM</div>
                  </div>
                </div>

                {/* Message 4 */}
                <div className={`transition-opacity duration-500 ${activeBlock >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-[#005C4B] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] ml-auto text-white">
                    Send receipt to customer 08012345678 for the 5 bags.
                    <div className="text-[10px] text-right text-gray-400 mt-1">11:20 AM</div>
                  </div>
                </div>
                <div className={`transition-opacity duration-500 delay-300 ${activeBlock >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-[#202C33] p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-white">
                    📄 Receipt generated and sent.<br/>
                    <span className="text-[#3b82f6] underline">View Receipt.pdf</span>
                    <div className="text-[10px] text-right text-gray-400 mt-1">11:21 AM</div>
                  </div>
                </div>
              </div>

              {/* Chat Input (Dark Mode) */}
              <div className="absolute bottom-0 w-full bg-[#1F2C34] p-3 flex items-center gap-2">
                <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 text-sm text-gray-400">Message</div>
                <div className="w-10 h-10 bg-[#00A884] rounded-full flex items-center justify-center text-[#1A1A1A]">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-1.998z"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Scroll Spy Text Blocks */}
          <div className="lg:w-1/2 py-[30vh]">
            <div className="space-y-[30vh]">
              
              <div className={`scroll-block transition-opacity duration-500 ${activeBlock === 0 ? 'opacity-100' : 'opacity-30'}`}>
                <h3 className="text-3xl font-[300] text-white tracking-wide mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Record sales via voice or text.</h3>
                <p className="text-lg text-gray-300 font-[200] leading-relaxed">
                  No complex ledgers. Just tell the bot what you sold, just like you're texting a friend. The system automatically categorizes it, updates your inventory, and logs the cash.
                </p>
              </div>

              <div className={`scroll-block transition-opacity duration-500 ${activeBlock === 1 ? 'opacity-100' : 'opacity-30'}`}>
                <h3 className="text-3xl font-[300] text-white tracking-wide mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Track debtors without the drama.</h3>
                <p className="text-lg text-gray-300 font-[200] leading-relaxed">
                  "Mama Nkechi owes me 80k." That's all it takes. The bot tracks who owes you, how much, and can even send polite automated reminders via SMS when payment is due.
                </p>
              </div>

              <div className={`scroll-block transition-opacity duration-500 ${activeBlock === 2 ? 'opacity-100' : 'opacity-30'}`}>
                <h3 className="text-3xl font-[300] text-white tracking-wide mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Real-time stock alerts.</h3>
                <p className="text-lg text-gray-300 font-[200] leading-relaxed">
                  Stop losing sales because you didn't realize you were out of stock. The bot calculates your average sales rate and warns you before you run out of your fastest-moving goods.
                </p>
              </div>

              <div className={`scroll-block transition-opacity duration-500 ${activeBlock === 3 ? 'opacity-100' : 'opacity-30'}`}>
                <h3 className="text-3xl font-[300] text-white tracking-wide mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Generate instant PDF receipts.</h3>
                <p className="text-lg text-gray-300 font-[200] leading-relaxed">
                  Give your business a formal edge. Instantly generate professional PDF receipts and invoices with your business name, and send them directly to customers via WhatsApp.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
