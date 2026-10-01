'use client'

import React, { useEffect, useState } from 'react'
import { WhatsAppSimulator } from '@/components/shared/WhatsAppSimulator'

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
            <div className="sticky top-32 w-full max-w-[350px] relative z-20">
              <WhatsAppSimulator />
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
