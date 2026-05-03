'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const bannerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cookieChoice = localStorage.getItem('crelligent-cookie-consent')
        if (!cookieChoice) {
            // First render offscreen, then trigger the animation
            setShouldRender(true)
            const timer = setTimeout(() => setIsVisible(true), 1600)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAcceptAll = () => {
        localStorage.setItem('crelligent-cookie-consent', 'accepted')
        setIsVisible(false)
        setTimeout(() => setShouldRender(false), 1200)
    }

    const handleRejectAll = () => {
        localStorage.setItem('crelligent-cookie-consent', 'rejected')
        setIsVisible(false)
        setTimeout(() => setShouldRender(false), 1200)
    }

    const handleManageSettings = () => {
        localStorage.setItem('crelligent-cookie-consent', 'managed')
        setIsVisible(false)
        setTimeout(() => setShouldRender(false), 1200)
    }

    if (!shouldRender) return null

    return (
        <div
            ref={bannerRef}
            className="fixed bottom-0 left-0 right-0 z-[9999]"
            style={{
                transform: isVisible ? 'translateY(0%)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 2.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {/* Subtle top border glow */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="bg-[#fafafa] border-t border-[#e0e0e0]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                        {/* Text Content */}
                        <div className="flex-1 space-y-2">
                            <p className="text-[#1a1a1a] text-sm leading-relaxed font-[300]">
                                To create a seamless experience and for website quality and improvement purposes, we and our trusted business
                                partners may retain or recreate browsing activity and use of interactive features.{' '}
                                <a href="/privacy" className="underline underline-offset-2 text-[#1a1a1a] hover:text-[#3b82f6] transition-colors">
                                    Learn more here
                                </a>.
                            </p>
                            <p className="text-[#1a1a1a] text-sm leading-relaxed font-[300]">
                                We use cookie technologies for verification and quality purposes, to personalize the content presented, and to provide
                                advertising that may be of specific interest to you. To learn more click{' '}
                                <a href="/privacy" className="underline underline-offset-2 text-[#1a1a1a] hover:text-[#3b82f6] transition-colors">
                                    here
                                </a>, or to manage the use of certain cookies, click manage settings.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={handleManageSettings}
                                className="px-6 py-2.5 text-sm font-[400] text-[#1a1a1a] border border-[#1a1a1a] rounded hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 whitespace-nowrap"
                            >
                                Manage settings
                            </button>
                            <button
                                onClick={handleRejectAll}
                                className="px-6 py-2.5 text-sm font-[400] text-white bg-[#1a1a1a] rounded hover:bg-[#333] transition-all duration-300 whitespace-nowrap"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2.5 text-sm font-[400] text-white bg-[#1a1a1a] rounded hover:bg-[#333] transition-all duration-300 whitespace-nowrap"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>

                    {/* Bottom Left: Logo + Crelligent + Divider + Tagline */}
                    <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#e0e0e0]/60">
                        <div className="flex items-center gap-1.5">
                            <Image
                                src="/logo.png"
                                alt="Crelligent"
                                width={36}
                                height={36}
                                className="w-9 h-9"
                            />
                            <span className="text-base font-[300] text-[#1a1a1a] tracking-tight">
                                Crelligent
                            </span>
                        </div>
                        <div className="w-[1px] h-5 bg-[#c0c0c0]" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#888] font-[300]">
                            We Engineer Businesses To Evolve
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
