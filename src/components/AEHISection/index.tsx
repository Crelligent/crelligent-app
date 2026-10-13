'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AEHI_HOMEPAGE_DATA as data } from './data';
import { ArrowRight } from 'lucide-react';

export function AEHISection() {
  return (
    <section className="bg-[#060E1C] py-12 lg:py-20 px-6 border-y border-white/5 relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-12">
          
          {/* Left Column */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            {/* Label */}
            <div className="mb-6">
              <div
                className="text-[#00C985] uppercase tracking-[0.1em] font-medium"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px' }}
              >
                INTELLIGENCE · INAUGURAL EDITION {data.edition}
              </div>
              <div className="text-[11px] text-white/35 mt-1 font-normal">African Enterprise Health Index · by Crelligent</div>
            </div>

            {/* Headline */}
            <h2 className="text-[32px] lg:text-[48px] font-light leading-[1.1] mb-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How healthy is the operating system of the Nigerian mid-market? We&apos;re measuring it.
            </h2>

            {/* Sub-headline */}
            <p className="text-[15px] text-white/60 leading-[1.65] max-w-[620px] mb-8 font-normal">
              The AEHI is a quarterly benchmark of enterprise operating health across Nigeria and West Africa,
              scored across the five layers of the ESRE OS. The first edition is being built now from enterprise
              diagnostics. Contribute your company&apos;s data and get your own benchmark report when it publishes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={data.contributeUrl}
               
                className="w-full sm:w-auto bg-[#00C985] text-black font-semibold rounded-[8px] py-[12px] px-[22px] text-[14px] flex items-center justify-center gap-2 hover:bg-[#00e094] transition-colors"
              >
                Contribute your enterprise
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={data.micrositeUrl}
               
                className="w-full sm:w-auto bg-transparent border border-white/20 text-white/75 font-medium rounded-[8px] py-[12px] px-[22px] text-[14px] flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
              >
                Explore the AEHI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: what the index measures */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-[10px] p-[16px] md:p-[20px] w-full">
              <div className="text-[10px] uppercase tracking-[0.1em] text-white/40 mb-4">What the index measures</div>
              <ul className="flex flex-col gap-4">
                {data.layers.map((layer) => (
                  <li key={layer.code} className="flex items-baseline gap-3">
                    <span
                      className="w-[30px] text-[13px] font-semibold shrink-0"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#00C985' }}
                    >
                      {layer.code}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-medium text-white/85">{layer.name}</span>
                      <span className="block text-[12px] text-white/45">{layer.measures}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] text-white/25 font-normal pt-4 mt-5 border-t border-white/[0.08]">
                Inaugural edition {data.edition} ·{' '}
                <Link href={data.micrositeUrl} className="text-white/45 hover:underline">
                  crelligent.com/aehi &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

