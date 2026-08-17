'use client';

import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const layers = [
  {
    id: 'app-runtime',
    name: 'Application Runtime',
    color: 'from-green-500 to-emerald-700',
    borderColor: 'border-green-500/30',
    role: 'The user-facing execution environment',
    capabilities: 'Product Strategy, Economics, CX, Change'
  },
  {
    id: 'os-systems',
    name: 'OS Systems',
    color: 'from-purple-500 to-violet-700',
    borderColor: 'border-purple-500/30',
    role: 'The management and intelligence interfaces',
    capabilities: 'ESRE OS Dashboard, PRISM, ESRE AI Engine'
  },
  {
    id: 'os-core',
    name: 'OS Core',
    color: 'from-blue-500 to-indigo-700',
    borderColor: 'border-blue-500/30',
    role: 'The foundational enterprise capabilities',
    capabilities: 'L1 Business Design, L2 Operating Model, L3 Technology, L4 Data & Intelligence, L5 Governance',
    isLarge: true
  },
  {
    id: 'physical',
    name: 'Physical Layer',
    color: 'from-amber-500 to-orange-700',
    borderColor: 'border-amber-500/30',
    role: 'The hardware and field operations',
    capabilities: 'CEM Edge Modules'
  }
];

export default function EsreOsIntroduction() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const activeLayer = layers.find(l => l.id === selectedLayer);

  return (
    <section className="bg-[#050505] py-24 px-6 font-['Outfit'] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Introducing ESRE OS</h2>
          <h3 className="text-xl md:text-2xl text-gray-400 mb-8">The enterprise operating system for African mid-market companies</h3>
          
          <div className="space-y-6 text-gray-300 font-light text-lg mb-10">
            <p>
              Just as a computer cannot run applications without an operating system, a growing enterprise cannot execute strategy reliably without an enterprise OS.
            </p>
            <p>
              ESRE OS is a five-layer operating system installed across the critical capabilities of your organisation — business design, operating model, technology, data intelligence, and governance. Once installed, it provides the stable, measurable, continuously monitored foundation that every strategy, product, and initiative runs on.
            </p>
            <p>
              Without ESRE OS, strategies fail not because the ideas are wrong, but because the system beneath them cannot execute reliably. With ESRE OS installed and running, your enterprise performs at full capacity — visible, measurable, and no longer dependent on any one person to function.
            </p>
          </div>

          <div className="pl-6 border-l-4 border-l-transparent bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-border text-2xl md:text-3xl font-medium leading-tight relative">
            <div className="absolute left-[-4px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Strategy does not fail because the idea is wrong. It fails because the operating system beneath it is broken. We fix the OS.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md flex flex-col space-y-2">
            {layers.map((layer, index) => (
              <React.Fragment key={layer.id}>
                <div 
                  onClick={() => setSelectedLayer(layer.id === selectedLayer ? null : layer.id)}
                  className={`
                    relative cursor-pointer rounded-xl backdrop-blur-md bg-white/5 border ${layer.borderColor}
                    transition-all duration-300 hover:scale-[1.02] overflow-hidden group
                    ${layer.isLarge ? 'py-12' : 'py-6'} px-6
                    ${selectedLayer === layer.id ? 'ring-2 ring-white/50' : ''}
                  `}
                >
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${layer.color} group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="font-semibold text-lg tracking-wider uppercase mb-1">{layer.name}</span>
                    <span className="text-sm text-gray-400">{layer.capabilities}</span>
                  </div>
                </div>
                
                {index < layers.length - 1 && (
                  <div className="flex flex-col items-center justify-center py-2 text-gray-500">
                    <ArrowUp size={16} className="mb-1" />
                    <span className="text-xs uppercase tracking-widest text-gray-600">runs on</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className={`mt-8 w-full max-w-md p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 ${activeLayer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none h-0 p-0 overflow-hidden mt-0'}`}>
            {activeLayer && (
              <>
                <h4 className="text-xl font-semibold mb-2">{activeLayer.name}</h4>
                <p className="text-gray-300 text-sm mb-4">{activeLayer.role}</p>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 font-light">
                    <strong className="text-gray-200">Capabilities:</strong> {activeLayer.capabilities}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
