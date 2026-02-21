'use client'

import { useEffect, useRef } from 'react'

export function P5Canvas({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        let p5Instance: any

        const initP5 = async () => {
            const p5 = (await import('p5')).default

            const sketch = (p: any) => {
                // Grid configuration
                const cols = 25
                const rows = 15
                let cellWidth: number
                let cellHeight: number

                // Smooth cursor tracking
                let targetX = 0
                let targetY = 0
                let currentX = 0
                let currentY = 0
                const easing = 0.03 // Very slow, graceful following

                // Grid points
                const points: { baseX: number; baseY: number; x: number; y: number }[] = []

                p.setup = () => {
                    const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
                    canvas.style('display', 'block')

                    cellWidth = p.width / (cols - 1)
                    cellHeight = p.height / (rows - 1)

                    // Initialize grid points
                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            const x = col * cellWidth
                            const y = row * cellHeight
                            points.push({ baseX: x, baseY: y, x, y })
                        }
                    }

                    // Start cursor at center
                    currentX = p.width / 2
                    currentY = p.height / 2
                    targetX = currentX
                    targetY = currentY
                }

                p.draw = () => {
                    p.background(5, 5, 5)

                    // Smooth cursor following
                    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                        targetX = p.mouseX
                        targetY = p.mouseY
                    }

                    currentX += (targetX - currentX) * easing
                    currentY += (targetY - currentY) * easing

                    // Update point positions with gravitational pull toward cursor
                    const maxInfluence = 120 // Maximum displacement
                    const influenceRadius = 350 // How far the effect reaches

                    points.forEach(point => {
                        const dx = currentX - point.baseX
                        const dy = currentY - point.baseY
                        const dist = Math.sqrt(dx * dx + dy * dy)

                        // Calculate influence - stronger when closer
                        let influence = 0
                        if (dist < influenceRadius) {
                            // Smooth falloff using cosine
                            const normalizedDist = dist / influenceRadius
                            influence = (1 + Math.cos(normalizedDist * Math.PI)) / 2
                        }

                        // Pull points toward cursor
                        const pullX = dx * influence * 0.15
                        const pullY = dy * influence * 0.12

                        // Smoothly interpolate to target position
                        const targetPointX = point.baseX + pullX
                        const targetPointY = point.baseY + pullY

                        point.x += (targetPointX - point.x) * 0.08
                        point.y += (targetPointY - point.y) * 0.08
                    })

                    // Draw connections
                    p.strokeWeight(0.5)
                    p.noFill()

                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            const idx = row * cols + col
                            const point = points[idx]

                            // Calculate opacity based on distance from cursor
                            const distFromCursor = p.dist(point.x, point.y, currentX, currentY)
                            const baseAlpha = 15
                            const maxAlpha = 50
                            const alpha = baseAlpha + (maxAlpha - baseAlpha) * Math.max(0, 1 - distFromCursor / influenceRadius)

                            // Horizontal connection
                            if (col < cols - 1) {
                                const rightPoint = points[idx + 1]

                                // Gradient stroke based on position
                                const midX = (point.x + rightPoint.x) / 2
                                const gradient = p.map(midX, 0, p.width, 0.6, 1)

                                p.stroke(59 * gradient, 130 * gradient, 246, alpha)
                                p.line(point.x, point.y, rightPoint.x, rightPoint.y)
                            }

                            // Vertical connection
                            if (row < rows - 1) {
                                const bottomPoint = points[idx + cols]

                                const midY = (point.y + bottomPoint.y) / 2
                                const gradient = p.map(midY, 0, p.height, 0.7, 1)

                                p.stroke(59 * gradient, 130 * gradient, 246, alpha)
                                p.line(point.x, point.y, bottomPoint.x, bottomPoint.y)
                            }
                        }
                    }

                    // Draw subtle node points at intersections (only near cursor)
                    p.noStroke()
                    points.forEach(point => {
                        const distFromCursor = p.dist(point.x, point.y, currentX, currentY)

                        if (distFromCursor < influenceRadius) {
                            const pointAlpha = p.map(distFromCursor, 0, influenceRadius, 80, 0)
                            const pointSize = p.map(distFromCursor, 0, influenceRadius, 3, 1)

                            p.fill(100, 160, 246, pointAlpha)
                            p.ellipse(point.x, point.y, pointSize)
                        }
                    })

                    // Central glow at cursor position (very subtle)
                    const glowRadius = 100
                    for (let r = glowRadius; r > 0; r -= 10) {
                        const alpha = p.map(r, glowRadius, 0, 0, 8)
                        p.fill(59, 130, 246, alpha)
                        p.noStroke()
                        p.ellipse(currentX, currentY, r * 2)
                    }
                }

                p.windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight)

                    cellWidth = p.width / (cols - 1)
                    cellHeight = p.height / (rows - 1)

                    // Recalculate base positions
                    let idx = 0
                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            points[idx].baseX = col * cellWidth
                            points[idx].baseY = row * cellHeight
                            idx++
                        }
                    }
                }
            }

            p5Instance = new p5(sketch, containerRef.current!)
        }

        initP5()

        return () => {
            if (p5Instance) {
                p5Instance.remove()
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={`p5-canvas-container ${className || ''}`}
            aria-hidden="true"
        />
    )
}
