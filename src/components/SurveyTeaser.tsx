'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { FormEngine } from '@/components/forms/FormEngine'
import { pmfSurveySchema } from '@/components/forms/pmfSurveySchema'

const STORAGE_KEY = 'velodesk_teaser_dismissed'
const SUPPRESS_DAYS = 7
const SHOW_DELAY_MS = 3000

export function SurveyTeaser() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Generate telemetry session
    setSessionId(Math.random().toString(36).substring(2, 15))

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

  const handleFormSubmit = async (answers: Record<string, any>) => {
    // 1. Submit to Form Engine API
    await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            form_id: pmfSurveySchema.id,
            session_id: sessionId,
            answers: answers
        })
    })

    // 2. Show success state for the survey
    setSuccess(true)
    
    // Provide a short delay to read success message before closing automatically
    setTimeout(() => {
        handleDismiss()
    }, 3500)
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
          <div className="relative z-10 p-8 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
            {/* Section label */}
            <div className="section-label mb-2" style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}>
              Founder Research — 2026
            </div>

            {success ? (
                <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-[#22c55e]/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">📊</span>
                    </div>
                    <h3 className="text-2xl font-light text-white mb-2">Thank you!</h3>
                    <p className="text-gray-400">Your answers shape the research. We will send you the full report.</p>
                </div>
            ) : (
                <div className="mt-6">
                    {sessionId && (
                        <FormEngine 
                            schema={pmfSurveySchema}
                            sessionId={sessionId}
                            onSubmit={handleFormSubmit}
                        />
                    )}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

