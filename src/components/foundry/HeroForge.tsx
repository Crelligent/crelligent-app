'use client'

/**
 * Foundry hero animation (p5.js, instance mode). Decorative; the story it tells:
 *   01 Prove:   scattered market signals; the cursor (or an auto probe) validates them.
 *   02 Install: validated signals lock into the operating system: L1, L2 (primary constraint), L3.
 *   03 Scale:   the installed system becomes a rising growth curve.
 * Hover pulls and lights signals. Click/tap moves to the next stage. Cycles automatically.
 * Respects prefers-reduced-motion (static frame) and pauses when off screen.
 */
import { useEffect, useRef, useState } from 'react'

type Stage = 0 | 1 | 2
const STAGES = ['Prove', 'Install', 'Scale'] as const
const STAGE_MS = 5200

const C = {
  grey: [107, 114, 128] as const,
  accent: [0, 201, 133] as const,
  l2: [229, 83, 75] as const,
  text: [156, 163, 175] as const,
}

export function HeroForge({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const advanceRef = useRef<() => void>(() => {})
  const goRef = useRef<(s: Stage) => void>(() => {})
  const [stage, setStage] = useState<Stage>(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let instance: { remove: () => void; loop: () => void; noLoop: () => void } | null = null
    let observer: IntersectionObserver | null = null
    let cancelled = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    import('p5').then(({ default: P5 }) => {
      if (cancelled || !host) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sketch = (p: any) => {
        type Pt = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; lit: number; row: number; seed: number }
        let pts: Pt[] = []
        let current: Stage = 0
        let stageStart = 0
        let morph = 0 // 0..1 progress into the current stage
        let probe = { x: 0, y: 0 }
        let hovering = false

        const count = () => Math.round(Math.min(150, Math.max(60, (p.width * p.height) / 900)))

        const setStageLocal = (s: Stage) => {
          current = s
          stageStart = p.millis()
          morph = 0
          setStage(s)
        }
        advanceRef.current = () => setStageLocal(((current + 1) % 3) as Stage)
        goRef.current = (s: Stage) => setStageLocal(s)

        const latticeTarget = (i: number, n: number) => {
          const rows = 3
          const cols = Math.ceil(n / rows)
          const row = i % rows
          const col = Math.floor(i / rows)
          const left = p.width * 0.16
          const right = p.width * 0.92
          const top = p.height * 0.24
          const gap = p.height * 0.24
          return { x: left + (col / Math.max(1, cols - 1)) * (right - left), y: top + row * gap, row }
        }

        const curveTarget = (i: number, n: number) => {
          const t = i / (n - 1)
          const x = p.width * 0.08 + t * p.width * 0.86
          const base = p.height * 0.86
          const rise = p.height * 0.72
          const y = base - rise * Math.pow(t, 2.4) + Math.sin(t * 9 + i) * 3
          return { x, y }
        }

        const build = () => {
          const n = count()
          pts = Array.from({ length: n }, (_, i) => {
            const t = latticeTarget(i, n)
            return {
              x: p.random(p.width),
              y: p.random(p.height),
              vx: p.random(-0.3, 0.3),
              vy: p.random(-0.3, 0.3),
              hx: p.random(p.width),
              hy: p.random(p.height),
              lit: 0,
              row: t.row,
              seed: p.random(1000),
            }
          })
        }

        p.setup = () => {
          const c = p.createCanvas(host.clientWidth, host.clientHeight)
          c.elt.setAttribute('aria-hidden', 'true')
          c.elt.style.display = 'block'
          p.pixelDensity(Math.min(2, window.devicePixelRatio || 1))
          build()
          stageStart = p.millis()
          if (reduced) {
            current = 1
            morph = 1
            pts.forEach((pt, i) => {
              const t = latticeTarget(i, pts.length)
              pt.x = t.x
              pt.y = t.y
              pt.lit = 1
            })
            setStage(1)
            p.noLoop()
            p.redraw()
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(host.clientWidth, host.clientHeight)
          build()
          if (reduced) p.redraw()
        }

        p.mouseMoved = () => {
          hovering = p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height
        }

        const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

        p.draw = () => {
          p.clear()
          const now = p.millis()
          if (!reduced && now - stageStart > STAGE_MS) setStageLocal(((current + 1) % 3) as Stage)
          morph = ease((now - stageStart) / 1400)

          // The cursor, or an automatic probe when the cursor is away
          const tt = now / 1000
          probe = hovering
            ? { x: p.mouseX, y: p.mouseY }
            : { x: p.width * (0.5 + 0.38 * Math.sin(tt * 0.6)), y: p.height * (0.5 + 0.3 * Math.sin(tt * 0.9 + 1)) }

          const n = pts.length
          if (n < 2) return

          // Connections when the system is installed
          if (current === 1) {
            p.strokeWeight(1)
            for (let i = 0; i < n; i++) {
              const a = pts[i]
              for (const j of [i + 1, i + 3]) {
                if (j >= n) continue
                const b = pts[j]
                if (j === i + 1 && b.row !== a.row + 1) continue
                const alpha = 70 * morph
                const col = a.row === 1 || b.row === 1 ? C.l2 : C.accent
                p.stroke(col[0], col[1], col[2], alpha)
                p.line(a.x, a.y, b.x, b.y)
              }
            }
            // OS layer labels
            p.noStroke()
            p.textFont('monospace')
            p.textSize(11)
            ;['L1', 'L2', 'L3'].forEach((label, r) => {
              const y = latticeTarget(r, n).y
              const col = r === 1 ? C.l2 : C.text
              p.fill(col[0], col[1], col[2], 255 * morph)
              p.text(label, p.width * 0.04, y + 4)
            })
          }

          // Growth curve
          if (current === 2) {
            p.noFill()
            p.strokeWeight(2)
            p.stroke(C.accent[0], C.accent[1], C.accent[2], 140 * morph)
            p.beginShape()
            for (let i = 0; i < n; i++) p.vertex(pts[i].x, pts[i].y)
            p.endShape()
            // a pulse travelling up the curve
            const k = Math.floor(Math.max(0, now - stageStart) / 25) % Math.max(1, n)
            const head = pts[k]
            if (head) {
              p.noStroke()
              p.fill(C.accent[0], C.accent[1], C.accent[2], 60)
              p.circle(head.x, head.y, 22)
            }
          }

          for (let i = 0; i < n; i++) {
            const pt = pts[i]
            if (current === 0) {
              // wander
              pt.vx += (p.noise(pt.seed, tt * 0.3) - 0.5) * 0.08
              pt.vy += (p.noise(pt.seed + 50, tt * 0.3) - 0.5) * 0.08
              const dx = probe.x - pt.x
              const dy = probe.y - pt.y
              const d = Math.hypot(dx, dy)
              if (d < 90) {
                pt.lit = Math.min(1, pt.lit + 0.08)
                pt.vx += (dx / (d + 1)) * 0.06
                pt.vy += (dy / (d + 1)) * 0.06
              } else {
                pt.lit = Math.max(0, pt.lit - 0.004)
              }
              pt.vx *= 0.96
              pt.vy *= 0.96
              pt.x += pt.vx
              pt.y += pt.vy
              if (pt.x < 0 || pt.x > p.width) pt.vx *= -1
              if (pt.y < 0 || pt.y > p.height) pt.vy *= -1
              pt.x = Math.min(p.width, Math.max(0, pt.x))
              pt.y = Math.min(p.height, Math.max(0, pt.y))
            } else {
              const t = current === 1 ? latticeTarget(i, n) : curveTarget(i, n)
              let tx = t.x
              let ty = t.y
              // hover nudges the structure without breaking it
              const dx = pt.x - probe.x
              const dy = pt.y - probe.y
              const d = Math.hypot(dx, dy)
              if (hovering && d < 70) {
                tx += (dx / (d + 1)) * 10
                ty += (dy / (d + 1)) * 10
              }
              pt.x += (tx - pt.x) * 0.08
              pt.y += (ty - pt.y) * 0.08
              pt.lit = Math.min(1, pt.lit + 0.03)
            }

            // draw node
            const isL2 = current === 1 && pt.row === 1
            const target = isL2 ? C.l2 : C.accent
            const r = C.grey[0] + (target[0] - C.grey[0]) * pt.lit
            const g = C.grey[1] + (target[1] - C.grey[1]) * pt.lit
            const b = C.grey[2] + (target[2] - C.grey[2]) * pt.lit
            const size = current === 1 ? (isL2 ? 5.5 : 4.5) : 3 + pt.lit * 2
            if (pt.lit > 0.6 && current !== 2) {
              p.noStroke()
              p.fill(r, g, b, 40)
              p.circle(pt.x, pt.y, size * 3.2)
            }
            p.noStroke()
            p.fill(r, g, b, 120 + 135 * pt.lit)
            p.circle(pt.x, pt.y, size)
          }

          // cursor ring
          if (hovering && current === 0) {
            p.noFill()
            p.stroke(C.accent[0], C.accent[1], C.accent[2], 90)
            p.strokeWeight(1)
            p.circle(probe.x, probe.y, 180)
          }
        }
      }

      instance = new P5(sketch, host)

      observer = new IntersectionObserver(
        ([entry]) => {
          if (reduced || !instance) return
          if (entry.isIntersecting) instance.loop()
          else instance.noLoop()
        },
        { threshold: 0.05 },
      )
      observer.observe(host)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      instance?.remove()
    }
  }, [])

  return (
    <div className={className}>
      <div className="relative rounded-lg border border-(--cr-border) bg-(--cr-bg) overflow-hidden">
        <div
          ref={hostRef}
          role="presentation"
          onClick={() => advanceRef.current()}
          className="h-56 sm:h-64 w-full cursor-pointer select-none touch-pan-y"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3 text-[0.7rem] font-mono uppercase tracking-[0.14em]">
          <span className="text-(--cr-text-muted)">Foundry, live</span>
          <span className="text-(--cr-text-muted)">Tap to advance</span>
        </div>
      </div>
      <ol className="mt-3 grid grid-cols-3 gap-2" aria-label="Foundry stages">
        {STAGES.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => goRef.current(i as Stage)}
              aria-current={stage === i ? 'step' : undefined}
              className={`w-full min-h-11 rounded-md border px-3 py-2 text-left text-xs transition-colors ${
                stage === i
                  ? 'border-(--cr-accent) text-(--cr-text) bg-(--cr-accent-tint)'
                  : 'border-(--cr-border) text-(--cr-text-muted) hover:border-(--cr-border-strong)'
              }`}
            >
              <span className="font-mono">0{i + 1}</span> {label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
