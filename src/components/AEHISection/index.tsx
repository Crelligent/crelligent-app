'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AEHI_HOMEPAGE_DATA as data } from './data';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export function AEHISection() {
  const getScoreColor = (score: number) => {
    if (score >= 55) return '#00C985';
    if (score >= 40) return '#F59E0B';
    return '#F87171';
  };

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
                INTELLIGENCE · {data.edition}
              </div>
              <div className="text-[11px] text-white/35 mt-1 font-normal">
                African Enterprise Health Index · by Crelligent · In partnership with {data.partner}
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-[32px] lg:text-[48px] font-light leading-[1.1] mb-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Nigerian mid-market scores <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#00C985', fontWeight: 700 }}>{data.overallScore}/100</span> on enterprise operating health.
            </h2>

            {/* Sub-headline */}
            <p className="text-[15px] text-white/60 leading-[1.65] max-w-[620px] mb-8 font-normal">
              {data.constraintPercent}% of enterprises assessed are constrained by their Operating Model —
              not their market, their technology, or their competition. The AEHI is
              the first quarterly benchmark of enterprise OS health across Nigeria
              and West Africa.
            </p>

            {/* Primary constraint callout */}
            <div className="bg-[#c0392b]/10 border border-[#c0392b]/25 rounded-[7px] py-[10px] px-[14px] flex items-center gap-3 mb-10 w-fit max-w-full">
              <AlertTriangle className="w-[14px] h-[14px] text-[#F87171] shrink-0" />
              <span className="text-[12px] text-white/75 font-medium leading-snug">
                {data.primaryConstraint} is the primary OS constraint in {data.constraintPercent}% of enterprises assessed
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href={data.reportUrl}
                target="_blank"
                className="w-full sm:w-auto bg-[#00C985] text-black font-semibold rounded-[8px] py-[12px] px-[22px] text-[14px] flex items-center justify-center gap-2 hover:bg-[#00e094] transition-colors"
              >
                Download the {data.edition} Report (Free)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href={data.micrositeUrl}
                target="_blank"
                className="w-full sm:w-auto bg-transparent border border-white/20 text-white/75 font-medium rounded-[8px] py-[12px] px-[22px] text-[14px] flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
              >
                Explore the AEHI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-[10px] p-[16px] md:p-[20px] w-full">
              
              <div className="flex flex-col gap-4 mb-5">
                {data.sectors.map((sector, idx) => {
                  const color = getScoreColor(sector.score);
                  return (
                    <div key={sector.name} className="flex items-center gap-3 w-full">
                      {/* Sector Name */}
                      <div className="w-[120px] md:w-[160px] text-[12px] font-medium text-white/80 truncate shrink-0">
                        {sector.name}
                      </div>

                      {/* Bar Track */}
                      <div className="flex-1 h-[6px] bg-white/[0.08] rounded-[3px] overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${sector.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 + (idx * 0.06), ease: "easeOut" }}
                          className="h-full rounded-r-[3px]"
                          style={{ backgroundColor: color }}
                        />
                      </div>

                      {/* Score */}
                      <div 
                        className="w-[30px] text-[13px] font-semibold text-right shrink-0" 
                        style={{ fontFamily: "'IBM Plex Mono', monospace", color }}
                      >
                        {sector.score}
                      </div>

                      {/* Trend */}
                      <div className="w-[50px] md:w-[80px] text-[11px] font-normal text-right shrink-0">
                        {sector.trend > 0 ? (
                          <span className="text-[#00C985]">↑ +{sector.trend}</span>
                        ) : sector.trend < 0 ? (
                          <span className="text-[#F87171]">↓ {sector.trend}</span>
                        ) : (
                          <span className="text-white/30">→ flat</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] text-white/25 font-normal pt-4 border-t border-white/[0.08]">
                Based on N={data.sampleSize} enterprise diagnostics · {data.sectors.length} sectors · {data.edition} ·{' '}
                <Link href={data.micrositeUrl} target="_blank" className="text-white/45 hover:underline">
                  Full data at aehi.crelligent.com &rarr;
                </Link>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
