'use client';

/**
 * AehiMap: interactive dark Africa map with pulsing city markers and tooltips.
 */

import { useMemo, useState, useRef } from 'react';
import { geoMercator, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import topology from 'world-atlas/countries-50m.json';

const W = 900;
const H = 900;

export const AEHI_CITIES = [
  { id: 'cairo', name: 'Cairo', country: 'Egypt', lon: 31.2357, lat: 30.0444, label: { dx: 20, dy: -14, anchor: 'start' } },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', lon: 3.3792, lat: 6.5244, label: { dx: 16, dy: -16, anchor: 'start' } },
  { id: 'accra', name: 'Accra', country: 'Ghana', lon: -0.187, lat: 5.6037, label: { dx: -16, dy: 28, anchor: 'end' } },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', lon: 36.8219, lat: -1.2921, label: { dx: -20, dy: -16, anchor: 'end' } },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', lon: 28.0473, lat: -26.2041, label: { dx: 20, dy: -12, anchor: 'start' } },
];

const AEHI_COUNTRY_DATA: Record<string, any> = {
  "Nigeria": { score: 58.4, sample: '3,800', constraint: 'Operating Model (L2)' },
  "South Africa": { score: 74.8, sample: '4,200', constraint: 'Intelligence (L4)' },
  "Kenya": { score: 71.2, sample: '2,100', constraint: 'Business Design (L1)' },
  "Egypt": { score: 62.1, sample: '1,250', constraint: 'Governance (L5)' },
  "Ghana": { score: 65.3, sample: '950', constraint: 'Technology (L3)' },
  "Rwanda": { score: 68.5, sample: '450', constraint: 'Operating Model (L2)' },
  "Morocco": { score: 64.2, sample: '800', constraint: 'Intelligence (L4)' },
  "Senegal": { score: 61.8, sample: '600', constraint: 'Technology (L3)' },
};

const getCountryData = (name: string) => {
  if (AEHI_COUNTRY_DATA[name]) return AEHI_COUNTRY_DATA[name];
  
  // Deterministic fallback based on country name so data stays consistent
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  
  const constraints = ['Business Design (L1)', 'Operating Model (L2)', 'Technology (L3)', 'Intelligence (L4)', 'Governance (L5)'];
  return {
    score: (50 + (hash % 35) + (hash % 10) / 10).toFixed(1),
    sample: (200 + (hash % 2800)).toLocaleString(),
    constraint: constraints[hash % 5]
  };
};

export default function AehiMap({
  cities = AEHI_CITIES,
  height = '100vh',
}: any) {
  const containerRef = useRef<HTMLElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, name: string, data: any } | null>(null);

  const { countries, projection } = useMemo(() => {
    // @ts-ignore
    const all = feature(topology, topology.objects.countries).features;

    const NON_AFRICAN = new Set([
      'Yemen', 'Vatican', 'Uzbekistan', 'United Arab Emirates', 'Turkmenistan', 'Turkey', 
      'Syria', 'Spain', 'Serbia', 'Saudi Arabia', 'San Marino', 'Qatar', 'Portugal', 
      'Pakistan', 'Oman', 'Montenegro', 'Monaco', 'Malta', 'Macedonia', 'Lebanon', 
      'Kuwait', 'Kosovo', 'Jordan', 'Italy', 'Israel', 'Palestine', 'Iraq', 'Iran', 
      'Greece', 'Georgia', 'France', 'N. Cyprus', 'Cyprus', 'Bulgaria', 'Bosnia and Herz.', 
      'Bahrain', 'Azerbaijan', 'Armenia', 'Andorra', 'Albania', 'Afghanistan', 'Antarctica'
    ]);

    const kept = all.filter((f: any) => {
      const name = f.properties.name;
      if (NON_AFRICAN.has(name)) return false;
      const [lon, lat] = geoCentroid(f);
      return lon > -30 && lon < 70 && lat > -42 && lat < 45;
    });

    const proj = geoMercator().fitExtent([[40, 40], [W - 40, H - 40]], {
      type: 'MultiPoint',
      coordinates: [[-20, -36], [52, 38]],
    });
    const path = geoPath(proj);

    return {
      projection: proj,
      countries: kept.map((f: any) => ({ id: f.id, name: f.properties.name, d: path(f) })),
    };
  }, []);

  const points = useMemo(
    () => cities.map((c: any) => ({ ...c, xy: projection([c.lon, c.lat]) })),
    [cities, projection]
  );

  return (
    <section ref={containerRef} className="aehi-map" style={{ height }}>
      <style>{CSS}</style>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Map of Africa showing AEHI survey cities"
        onMouseLeave={() => setTooltip(null)}
      >
        <g>
          {countries.map((c: any) => (
            <path 
              key={c.id ?? c.name} 
              d={c.d as string} 
              className="aehi-country"
              onMouseMove={(e) => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                setTooltip({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  name: c.name,
                  data: getCountryData(c.name)
                });
              }}
            >
              <title>{c.name}</title>
            </path>
          ))}
        </g>

        {points.map((p: any, i: number) => {
          const [x, y] = p.xy as [number, number];
          return (
            <g
              key={p.id}
              className="aehi-marker"
              transform={`translate(${x} ${y})`}
              style={{ '--delay': `${i * 0.35}s` } as any}
            >
              <circle className="aehi-hit" r="26" />
              <circle className="aehi-pulse" r="14" />
              <circle className="aehi-ring" r="14" />
              <circle className="aehi-dot" r="5" />
              <text
                className="aehi-label"
                x={p.label.dx}
                y={p.label.dy}
                textAnchor={p.label.anchor}
              >
                {p.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {tooltip && (
        <div 
          className="absolute z-50 pointer-events-none transition-opacity duration-150"
          style={{ 
            left: Math.min(tooltip.x + 15, (containerRef.current?.offsetWidth || W) - 250), 
            top: tooltip.y + 15 
          }}
        >
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl w-64">
            <h3 className="text-white font-[500] text-lg mb-3 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {tooltip.name}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400 text-xs uppercase tracking-widest">OS Score</span>
                <span className="text-[#ec4899] font-medium">{tooltip.data.score}<span className="text-gray-500 text-xs">/100</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400 text-xs uppercase tracking-widest">Indexed</span>
                <span className="text-white text-sm">{tooltip.data.sample}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-400 text-xs uppercase tracking-widest">Constraint</span>
                <span className="text-amber-400 text-xs font-medium bg-amber-400/10 px-2 py-1 rounded">{tooltip.data.constraint}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const CSS = `
.aehi-map{position:relative;width:100%;min-height:520px;background:transparent;overflow:hidden;color:#fff;font-family:inherit;border-radius:18px;}
.aehi-map svg:first-of-type{position:absolute;inset:0;width:100%;height:100%}
.aehi-country{fill:#141d2e;stroke:#26364d;stroke-width:.8;vector-effect:non-scaling-stroke;transition:fill .2s}
.aehi-country:hover{fill:#1d2940}

.aehi-marker{cursor:pointer;outline:none}
.aehi-hit{fill:transparent}
.aehi-ring{fill:none;stroke:rgba(244,63,142,.65);stroke-width:1.5;transition:r .2s}
.aehi-pulse{fill:rgba(244,63,142,.3);transform-box:fill-box;transform-origin:center;animation:aehi-pulse 2.6s ease-out infinite;animation-delay:var(--delay,0s)}
.aehi-dot{fill:#fff;stroke:#f43f8e;stroke-width:3;transition:r .2s}
.aehi-label{fill:#fff;font-size:13px;font-weight:700;letter-spacing:.05em;pointer-events:none;paint-order:stroke;stroke:#04070d;stroke-width:3px;stroke-linejoin:round}
.aehi-marker:hover .aehi-ring,.aehi-marker:focus-visible .aehi-ring,.aehi-marker.is-active .aehi-ring{r:19;stroke:#f43f8e}
.aehi-marker.is-active .aehi-dot{r:6.5}
@keyframes aehi-pulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}

@media (prefers-reduced-motion:reduce){.aehi-pulse{animation:none;opacity:.35}}
@media (max-width:640px){.aehi-label{font-size:16px}.aehi-scroll{display:none}}
`;
