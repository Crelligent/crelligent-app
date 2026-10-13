'use client';

/**
 * AehiMap: interactive dark Africa map with pulsing city markers and tooltips.
 */

import { useMemo, useState, useRef, useEffect } from 'react';
import { geoMercator, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import topology from 'world-atlas/countries-50m.json';

const W = 900;
const H = 900;

export const AEHI_CITIES = [
  { id: 'cairo', name: 'Cairo', country: 'Egypt', lon: 31.2357, lat: 30.0444, label: { dx: 20, dy: -14, anchor: 'start' } },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', lon: 3.3792, lat: 6.5244, label: { dx: 16, dy: -16, anchor: 'start' }, live: true },
  { id: 'accra', name: 'Accra', country: 'Ghana', lon: -0.187, lat: 5.6037, label: { dx: -16, dy: 28, anchor: 'end' } },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', lon: 36.8219, lat: -1.2921, label: { dx: -20, dy: -16, anchor: 'end' } },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', lon: 28.0473, lat: -26.2041, label: { dx: 20, dy: -12, anchor: 'start' } },
];

/** Countries the index is collecting responses in now. Everything else shows "Not yet covered". No scores: none are published. */
const COVERED = new Set(['Nigeria']);

function countryStatus(name: string) {
  return COVERED.has(name)
    ? { label: 'Inaugural edition', detail: 'Collecting responses for Q4 2026' }
    : { label: 'Not yet covered', detail: 'Not part of the inaugural edition' };
}

export default function AehiMap({
  cities = AEHI_CITIES,
  height = '100vh',
  accent = '#f43f8e',
}: any) {
  const containerRef = useRef<HTMLElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, name: string, data: any } | null>(null);
  const getCountryData = (name: string) => countryStatus(name);

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
    <section ref={containerRef} className="aehi-map" style={{ height, '--map-accent': accent } as any}>
      <style>{CSS}</style>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Map of Africa. The AEHI inaugural edition covers Nigeria; other markets are not yet covered."
        onMouseLeave={() => setTooltip(null)}
      >
        <g>
          {countries.map((c: any) => (
            <path 
              key={c.id ?? c.name} 
              d={c.d as string} 
              className={`aehi-country${COVERED.has(c.name) ? ' is-covered' : ''}`}
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
              className={`aehi-marker${p.live ? ' is-live' : ' is-planned'}`}
              transform={`translate(${x} ${y})`}
              style={{ '--delay': `${i * 0.35}s` } as any}
            >
              <circle className="aehi-hit" r="26" />
              {p.live && <circle className="aehi-pulse" r="14" />}
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

      <ul className="aehi-legend" aria-label="Map legend">
        <li><span className="aehi-key is-live" aria-hidden="true" />Collecting responses (inaugural edition)</li>
        <li><span className="aehi-key is-planned" aria-hidden="true" />Not yet covered</li>
      </ul>

      {tooltip && (
        <div 
          className="absolute z-50 pointer-events-none transition-opacity duration-150"
          style={{ 
            left: Math.min(tooltip.x + 15, (containerRef.current?.offsetWidth || W) - 250), 
            top: tooltip.y + 15 
          }}
        >
          <div className="bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl w-60">
            <h3 className="text-white font-[500] text-lg mb-2 tracking-tight">
              {tooltip.name}
            </h3>
            <p className="text-xs uppercase tracking-widest" style={{ color: tooltip.data.label === 'Inaugural edition' ? accent : '#9ca3af' }}>
              {tooltip.data.label}
            </p>
            <p className="mt-1 text-sm text-gray-300">{tooltip.data.detail}</p>
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
.aehi-country.is-covered{fill:color-mix(in srgb,var(--map-accent) 22%,#141d2e);stroke:color-mix(in srgb,var(--map-accent) 60%,#26364d)}
.aehi-country.is-covered:hover{fill:color-mix(in srgb,var(--map-accent) 32%,#141d2e)}

.aehi-marker{cursor:pointer;outline:none}
.aehi-hit{fill:transparent}
.aehi-ring{fill:none;stroke:color-mix(in srgb,var(--map-accent) 65%,transparent);stroke-width:1.5;transition:r .2s}
.aehi-pulse{fill:color-mix(in srgb,var(--map-accent) 30%,transparent);transform-box:fill-box;transform-origin:center;animation:aehi-map-pulse 2.6s ease-out infinite;animation-delay:var(--delay,0s)}
.aehi-dot{fill:#fff;stroke:var(--map-accent);stroke-width:3;transition:r .2s}
.aehi-marker.is-planned .aehi-ring{stroke:#4b5a73;stroke-dasharray:3 3}
.aehi-marker.is-planned .aehi-dot{fill:#0b1322;stroke:#6b7a93;stroke-width:2}
.aehi-marker.is-planned .aehi-label{fill:#9aa6b8;font-weight:500}
.aehi-label{fill:#fff;font-size:13px;font-weight:700;letter-spacing:.05em;pointer-events:none;paint-order:stroke;stroke:#04070d;stroke-width:3px;stroke-linejoin:round}
.aehi-marker:hover .aehi-ring,.aehi-marker:focus-visible .aehi-ring{r:19}
@keyframes aehi-map-pulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}

.aehi-legend{position:absolute;left:16px;bottom:16px;display:flex;flex-direction:column;gap:6px;margin:0;padding:10px 12px;list-style:none;font-size:12px;color:#c3cad6;background:rgba(4,7,13,.7);border:1px solid rgba(255,255,255,.08);border-radius:10px}
.aehi-legend li{display:flex;align-items:center;gap:8px}
.aehi-key{width:10px;height:10px;border-radius:999px;display:inline-block}
.aehi-key.is-live{background:var(--map-accent)}
.aehi-key.is-planned{border:1.5px dashed #6b7a93}

@media (prefers-reduced-motion:reduce){.aehi-pulse{animation:none;opacity:.35}}
@media (max-width:640px){.aehi-label{font-size:16px}}
`;
