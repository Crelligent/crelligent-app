import React from 'react';

export interface EsreOsBadgeProps {
  type: 'os-core' | 'app-runtime';
  layer?: string;
  name: string;
  intro: string;
  critical?: boolean;
}

export default function EsreOsBadge({ type, layer, name, intro, critical }: EsreOsBadgeProps) {
  const isCore = type === 'os-core';
  
  const badgeTitle = isCore 
    ? `ESRE OS · ${layer} · ${name}`
    : `ESRE OS · Application Runtime`;
    
  const borderGradient = isCore 
    ? 'from-blue-500/50 to-purple-500/50' 
    : 'from-green-500/50 to-emerald-500/50';
    
  const textGradient = isCore
    ? 'from-blue-400 to-purple-400'
    : 'from-green-400 to-emerald-400';

  return (
    <div className="flex flex-col items-start font-['Outfit']">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-[1px] rounded-full bg-gradient-to-r ${borderGradient}`}>
          <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5">
            <span className={`text-xs md:text-sm font-semibold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${textGradient}`}>
              {badgeTitle}
            </span>
          </div>
        </div>
        
        {critical && (
          <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
              Critical Layer
            </span>
          </div>
        )}
      </div>
      
      {intro && (
        <p className="text-sm text-gray-400 font-[200] leading-relaxed max-w-2xl">
          {intro}
        </p>
      )}
    </div>
  );
}
