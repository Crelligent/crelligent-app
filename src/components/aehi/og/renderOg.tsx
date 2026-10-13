import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

/** Shared Open Graph image (DESIGN.md 8.3). No numbers except the quarter and the weights. */

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'
export const ogAlt =
  'African Enterprise Health Index: five-layer model of enterprise operating health, inaugural edition Q4 2026'

const C = {
  bg: '#08111F',
  line: '#22324F',
  surface2: '#162440',
  text: '#F8FAFC',
  muted: '#A9B4C6',
  subtle: '#8592A8',
  accent: '#00C985',
}

// Heights scaled ×1.6 from the explorer; top (L5) to bottom (L1).
const SLABS = [
  { code: 'L5', w: '0.6×', h: 70 },
  { code: 'L4', w: '1.0×', h: 90 },
  { code: 'L3', w: '1.0×', h: 90 },
  { code: 'L2', w: '1.4×', h: 109 },
  { code: 'L1', w: '1.0×', h: 90 },
]

async function font(file: string) {
  return readFile(join(process.cwd(), 'src/app/aehi/og-fonts', file))
}

export async function renderOg(title: string) {
  const [grotesk, mono, inter] = await Promise.all([
    font('SpaceGrotesk-500.woff'),
    font('IBMPlexMono-500.woff'),
    font('Inter-500.woff'),
  ])
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: C.bg, padding: 64, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 24, left: 24, right: 24, bottom: 24, border: `1px solid ${C.line}`, display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', width: 640, justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Plex Mono', fontSize: 22, color: C.subtle, letterSpacing: '0.08em', display: 'flex' }}>
            AFRICAN ENTERPRISE HEALTH INDEX
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: title.length > 34 ? 54 : 64,
                lineHeight: title.length > 34 ? '62px' : '70px',
                color: C.text,
                display: 'flex',
              }}
            >
              {title}
            </div>
            <div style={{ fontFamily: 'Plex Mono', fontSize: 22, color: C.accent, marginTop: 28, display: 'flex' }}>
              EDITION 01 · Q4 2026 · IN PREPARATION
            </div>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 22, color: C.muted, display: 'flex' }}>
            crelligent.com/aehi · Crelligent &amp; Company, Lagos
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 760,
            width: 376,
            top: 64,
            bottom: 64,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          {SLABS.map((s) => (
            <div
              key={s.code}
              style={{
                height: s.h,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: C.surface2,
                border: `1px solid ${C.line}`,
                borderLeft: s.code === 'L2' ? `4px solid ${C.accent}` : `1px solid ${C.line}`,
                padding: '0 20px',
                fontFamily: 'Plex Mono',
                fontSize: 20,
              }}
            >
              <span style={{ color: s.code === 'L2' ? C.accent : C.muted }}>{s.code}</span>
              <span style={{ color: C.muted }}>{s.w}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, weight: 500, style: 'normal' },
        { name: 'Plex Mono', data: mono, weight: 500, style: 'normal' },
        { name: 'Inter', data: inter, weight: 500, style: 'normal' },
      ],
    },
  )
}
