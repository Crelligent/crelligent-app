'use client';

import React, { useEffect, useState } from 'react';

export default function EsreOsPerformanceScore() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const osCoreScore = 78;
  const appRuntimeScore = 85;
  const overallScore = 78;

  // SVG parameters
  const size = 300;
  const strokeWidth = 16;
  const center = size / 2;
  const radiusOuter = center - strokeWidth;
  const radiusInner = radiusOuter - strokeWidth - 10;
  
  const circumferenceOuter = 2 * Math.PI * radiusOuter;
  const circumferenceInner = 2 * Math.PI * radiusInner;
  
  const strokeDashoffsetOuter = mounted ? circumferenceOuter - (osCoreScore / 100) * circumferenceOuter : circumferenceOuter;
  const strokeDashoffsetInner = mounted ? circumferenceInner - (appRuntimeScore / 100) * circumferenceInner : circumferenceInner;

  return (
    <section className="bg-[#050505] py-24 px-6 font-['Outfit'] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Outer Ring Background */}
              <circle
                cx={center}
                cy={center}
                r={radiusOuter}
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={strokeWidth}
              />
              {/* Inner Ring Background */}
              <circle
                cx={center}
                cy={center}
                r={radiusInner}
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={strokeWidth}
              />
              
              {/* Outer Ring - OS Core */}
              <circle
                cx={center}
                cy={center}
                r={radiusOuter}
                fill="transparent"
                stroke="url(#blueGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumferenceOuter}
                strokeDashoffset={strokeDashoffsetOuter}
                strokeLinecap="round"
                className="transition-all duration-[1500ms] ease-out"
              />
              
              {/* Inner Ring - App Runtime */}
              <circle
                cx={center}
                cy={center}
                r={radiusInner}
                fill="transparent"
                stroke="url(#greenGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumferenceInner}
                strokeDashoffset={strokeDashoffsetInner}
                strokeLinecap="round"
                className="transition-all duration-[1500ms] ease-out delay-300"
              />
              
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                {mounted ? overallScore : 0}
                <span className="text-2xl text-gray-500">/100</span>
              </span>
              <span className="text-sm tracking-widest text-gray-400 uppercase mt-2">Composite Score</span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The ESRE OS Performance Score</h2>
          <h3 className="text-xl md:text-2xl text-gray-400 mb-8">
            One number that tells you exactly how well your enterprise OS is running — and which layers need immediate attention.
          </h3>
          
          <div className="space-y-6 text-gray-300 font-light text-lg mb-10">
            <div className="flex items-start">
              <div className="w-4 h-4 mt-1.5 mr-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
              <p>
                <strong className="text-white font-medium">OS Core Score (weighted 70%)</strong> — measures the health of the foundational layers L1-L5, ensuring structural integrity, governance, and operational reality.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-4 h-4 mt-1.5 mr-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex-shrink-0" />
              <p>
                <strong className="text-white font-medium">Application Runtime Score (weighted 30%)</strong> — measures the performance of the 4 runtime capabilities interacting directly with the market.
              </p>
            </div>
            <p className="pt-4 border-t border-white/10 text-gray-400">
              <span className="text-blue-400">The common finding:</span> Most enterprises we evaluate show a strong Application Runtime score (good ideas, good marketing) but weak OS Core scores (poor execution, broken processes). We balance the equation.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="relative z-10 flex items-center">
              <div className="text-5xl md:text-6xl font-bold text-white mr-6 flex items-center">
                48 <span className="text-3xl text-gray-500 mx-3">→</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">78</span>
              </div>
              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                The average ESRE OS Performance Score improvement across completed installations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
