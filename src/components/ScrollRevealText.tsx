'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealTextProps {
    text: string
    className?: string
    baseColor?: string
    revealColor?: string
    /** Where in the viewport (0=top, 1=bottom) the reveal STARTS. Default 0.82 */
    startThreshold?: number
    /** Where in the viewport (0=top, 1=bottom) the reveal is COMPLETE. Default 0.28 */
    endThreshold?: number
}

export function ScrollRevealText({
    text,
    className = '',
    baseColor = 'rgb(75, 85, 99)',
    revealColor = 'rgb(255, 255, 255)',
    startThreshold = 0.82,
    endThreshold = 0.28,
}: ScrollRevealTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null)
    const [progress, setProgress] = useState(0)

    // Pre-parse colors once
    const baseRgb = baseColor.match(/\d+/g)?.map(Number) || [75, 85, 99]
    const revealRgb = revealColor.match(/\d+/g)?.map(Number) || [255, 255, 255]

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            const rect = container.getBoundingClientRect()
            const windowHeight = window.innerHeight

            const startPoint = windowHeight * startThreshold
            const endPoint = windowHeight * endThreshold

            if (rect.top >= startPoint) {
                setProgress(0)
            } else if (rect.top <= endPoint) {
                setProgress(1)
            } else {
                const p = (startPoint - rect.top) / (startPoint - endPoint)
                setProgress(Math.max(0, Math.min(1, p)))
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [startThreshold, endThreshold])

    const words = text.split(' ')
    const totalWords = words.length

    return (
        <span ref={containerRef} className={className}>
            {words.map((word, i) => {
                const wordStart = i / totalWords
                const wordEnd = (i + 1) / totalWords

                let wordProgress = 0
                if (progress >= wordEnd) {
                    wordProgress = 1
                } else if (progress > wordStart) {
                    wordProgress = (progress - wordStart) / (wordEnd - wordStart)
                }

                const r = Math.round(baseRgb[0] + (revealRgb[0] - baseRgb[0]) * wordProgress)
                const g = Math.round(baseRgb[1] + (revealRgb[1] - baseRgb[1]) * wordProgress)
                const b = Math.round(baseRgb[2] + (revealRgb[2] - baseRgb[2]) * wordProgress)

                return (
                    <span
                        key={i}
                        style={{
                            color: `rgb(${r}, ${g}, ${b})`,
                            transition: 'color 0.35s ease',
                        }}
                    >
                        {word}{i < totalWords - 1 ? ' ' : ''}
                    </span>
                )
            })}
        </span>
    )
}
