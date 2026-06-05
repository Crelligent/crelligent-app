'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'survey_teaser_dismissed'
const SUPPRESS_DAYS = 7
const SHOW_DELAY_MS = 3000

export function SurveyTeaser() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check localStorage for suppression
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) {
      const dismissedAt = new Date(dismissed).getTime()
      const now = Date.now()
      const daysSince = (now - dismissedAt) / (1000 * 60 * 60 * 24)
      if (daysSince < SUPPRESS_DAYS) return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    }, SHOW_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
      document.body.style.overflow = ''
      localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={handleDismiss}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-[520px] transition-all duration-500 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 survey-modal-enter'}`}
      >
        {/* Gradient border wrapper */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#22c55e] opacity-60" />

        <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden m-[1px]">
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#3b82f6]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#22c55e]/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-20 p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10">
            {/* Section label */}
            <div className="section-label mb-6" style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}>
              Founder Research — 2026
            </div>

            {/* Headline */}
            <h2
              className="text-3xl md:text-4xl font-[200] tracking-tight text-white mb-3 leading-tight"
              style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
            >
              The PMF{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#22c55e]">
                Blind Spot
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              3 minutes. Anonymous. We&apos;ll share the full findings with every participant.
            </p>

            {/* Stat callout */}
            <div className="relative rounded-xl overflow-hidden p-[1px] mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/40 to-[#3b82f6]/40" />
              <div className="relative bg-[#111111] rounded-xl p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-4xl font-[200] text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#3b82f6]"
                    style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
                  >
                    42%
                  </span>
                  <span className="text-sm text-gray-400">of startups</span>
                </div>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  fail because they never found product-market fit. We&apos;re researching how founders
                  actually measure it — and what gets in the way.
                </p>
              </div>
            </div>

            {/* Intro copy */}
            <p className="text-[13px] text-gray-500 mb-8 leading-relaxed">
              We&apos;re surveying 100+ founders globally. Once complete, we&apos;ll publish the full
              findings — no gated report. Your answers shape the research.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/research/pmf-blind-spot"
                onClick={() => {
                  document.body.style.overflow = ''
                  localStorage.setItem(STORAGE_KEY, new Date().toISOString())
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-black text-sm font-medium tracking-wide rounded-lg hover:opacity-90 transition-all group"
              >
                Take the Survey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={handleDismiss}
                className="px-6 py-3.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
