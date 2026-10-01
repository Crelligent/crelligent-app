'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const HUBS = [
 { name: 'LAGOS', lon: 3.3792, lat: 6.5244, region: 'west', desc: 'West African enterprise hub' },
 { name: 'ACCRA', lon: -0.1870, lat: 5.6037, region: 'west', desc: 'West African enterprise hub' },
 { name: 'CAIRO', lon: 31.2357, lat: 30.0444, region: 'north', desc: 'North African enterprise hub' },
 { name: 'NAIROBI', lon: 36.8219, lat: -1.2921, region: 'east', desc: 'East African enterprise hub' },
 { name: 'JOHANNESBURG', lon: 28.0473, lat: -26.2041, region: 'south', desc: 'Southern African enterprise hub' }
];

export function InteractiveAfricaMap() {
  const [geoData, setGeoData] = useState<{ countries: any[], dots: [number, number][], projection: any, path: any } | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [info, setInfo] = useState({ title: 'AEHI — Africa', desc: 'Select a highlighted enterprise hub to explore its AEHI data.' });
  const [scanY, setScanY] = useState<number | null>(null);
  const [pulses, setPulses] = useState<{id: number, x: number, y: number}[]>([]);
  
  const pulseIdRef = useRef(0);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json')
      .then(r => r.json())
      .then(world => {
        // @ts-ignore
        const countries = topojson.feature(world, world.objects.countries).features.filter((f: any) => {
          const c = d3.geoCentroid(f);
          return c[0] >= -20 && c[0] <= 55 && c[1] >= -38 && c[1] <= 38;
        });
        
        const collection = { type: 'FeatureCollection', features: countries } as any;
        const projection = d3.geoNaturalEarth1().fitExtent([[40, 40], [860, 680]], collection);
        const path = d3.geoPath(projection);

        const dots: [number, number][] = [];
        for (let y = 45; y <= 675; y += 8) {
          for (let x = 40; x <= 860; x += 8) {
            const ll = projection.invert!([x, y]);
            if (ll && countries.some((f: any) => d3.geoContains(f, ll))) dots.push([x, y]);
          }
        }
        
        setGeoData({ countries, dots, projection, path });
      });
  }, []);

  const dotsRef = useRef<SVGGElement>(null);
  useEffect(() => {
    if (!geoData) return;
    let frame = 0;
    let af: number;
    const animate = () => {
      frame++;
      if (dotsRef.current) {
        const ds = dotsRef.current.children;
        if (ds.length > 0) {
          for (let k = 0; k < 25; k++) {
            const idx = (frame * 7 + k * 41) % ds.length;
            const d = ds[idx] as SVGElement;
            if (d) {
              const baseOpacity = scanY !== null ? (Math.abs(parseFloat(d.getAttribute('cy')||'0') - scanY) < 18 ? 1 : 0.72) : 0.72;
              d.style.opacity = String(Math.min(1, baseOpacity * (0.42 + 0.42 * Math.sin(frame * 0.035 + k))));
            }
          }
        }
      }
      af = requestAnimationFrame(animate);
    };
    af = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(af);
  }, [geoData, scanY]);

  const triggerPulse = (x: number, y: number) => {
    const id = pulseIdRef.current++;
    setPulses(p => [...p, { id, x, y }]);
    setTimeout(() => {
      setPulses(p => p.filter(pulse => pulse.id !== id));
    }, 1500);
  };

  const runScan = () => {
    if (scanY !== null) return;
    let y = 40;
    const interval = setInterval(() => {
      y += 5;
      setScanY(y);
      if (y > 680) {
        clearInterval(interval);
        setScanY(null);
        setInfo({ title: 'DATA REFRESH COMPLETE', desc: 'AEHI network scan finished. Connect this interaction to your live index dataset.' });
      }
    }, 20);
  };

  const handleFilter = (f: string) => {
    setActiveFilter(f);
    if (f === 'all') {
      setInfo({ title: 'AEHI — Africa', desc: 'Select a highlighted enterprise hub to explore its AEHI data.' });
    } else {
      const names = { west: 'West Africa', east: 'East Africa', north: 'North Africa', south: 'Southern Africa' };
      // @ts-ignore
      setInfo({ title: names[f], desc: 'Highlighted hubs are filtered to this African region.' });
    }
  };

  const filteredHubs = useMemo(() => {
    if (!geoData) return [];
    return HUBS.map(h => ({ ...h, xy: geoData.projection([h.lon, h.lat]) })).filter(h => activeFilter === 'all' || h.region === activeFilter);
  }, [geoData, activeFilter]);

  const links = useMemo(() => {
    if (!geoData) return [];
    const pts = HUBS.map(h => geoData.projection([h.lon, h.lat]));
    const l = [];
    for(let i=0; i<pts.length; i++) {
      for(let j=i+1; j<pts.length; j++) {
        l.push({ x1: pts[i][0], y1: pts[i][1], x2: pts[j][0], y2: pts[j][1] });
      }
    }
    return l;
  }, [geoData]);

  if (!geoData) return <div className="w-full h-full min-h-[500px] flex items-center justify-center text-gray-500">Initializing AEHI Network...</div>;

  return (
    <div className="w-full h-full flex flex-col font-sans">
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {['all', 'west', 'east', 'north', 'south'].map(f => (
          <button 
            key={f}
            onClick={() => handleFilter(f)}
            className={`px-3 py-1.5 border rounded-full text-[11px] uppercase tracking-widest transition-colors ${
              activeFilter === f 
                ? 'bg-[#1a0f2e] border-[#ec4899] text-white' 
                : 'bg-[#0f1d34]/30 border-white/10 text-gray-400 hover:text-white hover:border-[#ec4899]/50'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
        <button 
          onClick={runScan}
          className="px-3 py-1.5 border border-white/10 bg-[#0f1d34]/30 text-gray-400 hover:text-white hover:border-[#3b82f6]/50 rounded-full text-[11px] uppercase tracking-widest transition-colors"
        >
          Run scan
        </button>
      </div>

      <div className="relative overflow-hidden flex-1 rounded-[32px] bg-gradient-to-br from-[#050505] to-[#111] border border-white/5 flex flex-col">
        <svg viewBox="0 0 900 720" className="w-full h-full">
          <defs>
            <linearGradient id="aehi-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="52%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="hub-glow">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <style>{`
              @keyframes pulseAnim {
                0% { r: 6px; opacity: 1; stroke-width: 2px; }
                100% { r: 70px; opacity: 0; stroke-width: 1px; }
              }
              .pulse-circle {
                animation: pulseAnim 1s ease-out forwards;
              }
            `}</style>
          </defs>

          {/* Countries */}
          <g>
            {geoData.countries.map((f, i) => (
              <path key={i} d={geoData.path(f) || ''} fill="rgba(59,130,246,0.02)" stroke="rgba(148,163,184,0.1)" strokeWidth="0.45" />
            ))}
          </g>

          {/* Dots */}
          <g ref={dotsRef}>
            {geoData.dots.map((p, i) => (
              <circle 
                key={i} 
                cx={p[0]} 
                cy={p[1]} 
                r="2.5" 
                fill="url(#aehi-grad)" 
                opacity={scanY !== null && Math.abs(p[1] - scanY) < 18 ? 1 : 0.72} 
                className="transition-opacity duration-75"
              />
            ))}
          </g>

          {/* Links */}
          <g>
            {links.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="url(#aehi-grad)" strokeWidth="1" opacity="0.08" strokeDasharray="4 8" />
            ))}
          </g>

          {/* Pulses */}
          <g>
            {pulses.map(p => (
              <circle key={p.id} cx={p.x} cy={p.y} fill="none" stroke="#ec4899" className="pulse-circle" />
            ))}
          </g>

          {/* Hubs */}
          <g>
            {filteredHubs.map(h => (
              <g 
                key={h.name} 
                className="cursor-pointer outline-none group" 
                onClick={() => {
                  setInfo({ title: h.name, desc: `${h.desc}. AEHI metrics can be connected here.` });
                  triggerPulse(h.xy[0], h.xy[1]);
                }}
              >
                <circle cx={h.xy[0]} cy={h.xy[1]} r="16" fill="none" stroke="#ec4899" strokeOpacity="0.25" filter="url(#hub-glow)" className="group-hover:strokeOpacity-100 transition-all" />
                <circle cx={h.xy[0]} cy={h.xy[1]} r="5" fill="#fff" stroke="#ec4899" strokeWidth="2" />
                <text x={h.xy[0] + 14} y={h.xy[1] - 12} fill="#fff" fontSize="12" fontWeight="700" letterSpacing="0.08em" stroke="#050505" strokeWidth="4" paintOrder="stroke">{h.name}</text>
              </g>
            ))}
          </g>

          {/* Scan Line */}
          {scanY !== null && (
            <line x1="40" y1={scanY} x2="860" y2={scanY} stroke="#ec4899" strokeWidth="2" opacity="0.5" filter="url(#hub-glow)" />
          )}
        </svg>

        {/* Floating Info Panel inside Map */}
        <div className="absolute left-6 bottom-6 max-w-[280px] p-4 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md">
          <strong className="block text-white text-sm mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{info.title}</strong>
          <span className="text-gray-400 text-xs leading-relaxed">{info.desc}</span>
        </div>
      </div>
    </div>
  );
}
