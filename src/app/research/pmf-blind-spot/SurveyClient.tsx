'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Loader2, ExternalLink, Twitter, Linkedin, LinkIcon } from 'lucide-react'
import { surveyQuestions, sectionNames, totalQuestions, totalSections } from './surveyData'
import type { SurveyQuestion } from './surveyData'
import { supabase } from '@/lib/supabase'

type Answers = Record<string, string | string[] | number>

// ─── SKIP LOGIC ──────────────────────────────────────────────
// Maps question IDs to skip conditions
const SKIP_RULES: Record<string, { dependsOn: string; skipWhenAnswer: string[] }> = {
  investor_show_data: {
    dependsOn: 'investor_pmf_question',
    skipWhenAnswer: ["I haven't had investor conversations yet"],
  },
}

function shouldSkipQuestion(questionId: string, answers: Answers): boolean {
  const rule = SKIP_RULES[questionId]
  if (!rule) return false
  const depAnswer = answers[rule.dependsOn] as string
  return rule.skipWhenAnswer.includes(depAnswer)
}

// ─── SECTION TRANSITIONS ────────────────────────────────────
const sectionTransitions: Record<number, { heading: string; subtext: string }> = {
  2: {
    heading: "Great start.",
    subtext: "Now let\u2019s talk about how you currently measure product-market fit.",
  },
  3: {
    heading: "Interesting.",
    subtext: "Let\u2019s talk about what happens when investors ask about your PMF.",
  },
  4: {
    heading: "Almost there.",
    subtext: "Quick questions about the tools and data you work with every day.",
  },
  5: {
    heading: "Last section.",
    subtext: "We want to understand what would actually be useful to you.",
  },
}

// ─── SURVEY URL for sharing ─────────────────────────────────
const SURVEY_URL = 'https://crelligent.com/research/pmf-blind-spot'

export default function SurveyClient() {
  const [currentIndex, setCurrentIndex] = useState(-1) // -1 = intro screen
  const [answers, setAnswers] = useState<Answers>({})
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [animating, setAnimating] = useState(false)
  const [responseCount, setResponseCount] = useState(0)
  const [showTransition, setShowTransition] = useState<number | null>(null) // section number
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentQuestion: SurveyQuestion | null = currentIndex >= 0 ? surveyQuestions[currentIndex] : null
  const currentSection = currentQuestion?.section ?? 0

  // Fetch approximate response count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { count } = await supabase
          .from('survey_responses')
          .select('*', { count: 'exact', head: true })
        if (count !== null) setResponseCount(count)
      } catch {
        // Silently fail — count is cosmetic
      }
    }
    fetchCount()
  }, [])

  // Cleanup auto-advance timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    }
  }, [])

  const animateTransition = useCallback((dir: 'forward' | 'backward', callback: () => void) => {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      callback()
      setAnimating(false)
    }, 200)
  }, [])

  // Find next valid question index (skipping questions that should be skipped)
  const findNextIndex = useCallback((fromIndex: number, answersSnapshot: Answers): number => {
    let next = fromIndex + 1
    while (next < totalQuestions && shouldSkipQuestion(surveyQuestions[next].id, answersSnapshot)) {
      next++
    }
    return next
  }, [])

  // Find previous valid question index
  const findPrevIndex = useCallback((fromIndex: number, answersSnapshot: Answers): number => {
    let prev = fromIndex - 1
    while (prev >= 0 && shouldSkipQuestion(surveyQuestions[prev].id, answersSnapshot)) {
      prev--
    }
    return prev
  }, [])

  const advanceToNext = useCallback(() => {
    const nextIdx = findNextIndex(currentIndex, answers)
    if (nextIdx >= totalQuestions) return // at end

    const currentQ = surveyQuestions[currentIndex]
    const nextQ = surveyQuestions[nextIdx]

    // Check if we're crossing into a new section → show transition
    if (currentQ && nextQ && currentQ.section !== nextQ.section) {
      setShowTransition(nextQ.section)
      return
    }

    animateTransition('forward', () => setCurrentIndex(nextIdx))
  }, [currentIndex, answers, findNextIndex, animateTransition])

  const handleNext = useCallback(() => {
    advanceToNext()
  }, [advanceToNext])

  const handleBack = useCallback(() => {
    if (showTransition) {
      setShowTransition(null)
      return
    }
    if (currentIndex > 0) {
      const prevIdx = findPrevIndex(currentIndex, answers)
      if (prevIdx >= 0) {
        animateTransition('backward', () => setCurrentIndex(prevIdx))
      } else {
        animateTransition('backward', () => setCurrentIndex(-1))
      }
    } else if (currentIndex === 0) {
      animateTransition('backward', () => setCurrentIndex(-1))
    }
  }, [currentIndex, showTransition, answers, findPrevIndex, animateTransition])

  const handleStart = useCallback(() => {
    animateTransition('forward', () => setCurrentIndex(0))
  }, [animateTransition])

  const handleTransitionContinue = useCallback(() => {
    if (showTransition === null) return
    const nextIdx = findNextIndex(currentIndex, answers)
    setShowTransition(null)
    animateTransition('forward', () => setCurrentIndex(nextIdx))
  }, [showTransition, currentIndex, answers, findNextIndex, animateTransition])

  const setAnswer = useCallback((questionId: string, value: string | string[] | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  const toggleMultiOption = useCallback((questionId: string, option: string) => {
    setAnswers(prev => {
      const current = (prev[questionId] as string[]) || []
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
      return { ...prev, [questionId]: updated }
    })
  }, [])

  // Auto-advance for single-select questions
  const handleSingleSelectAnswer = useCallback((questionId: string, value: string) => {
    setAnswer(questionId, value)

    // Clear any existing auto-advance timer
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)

    // Don't auto-advance on the last question or conditional-email type
    const qIndex = surveyQuestions.findIndex(q => q.id === questionId)
    const q = surveyQuestions[qIndex]
    if (q?.type === 'conditional-email') return
    if (qIndex >= totalQuestions - 1) return

    autoAdvanceTimer.current = setTimeout(() => {
      // Need to use the latest state
      const nextIdx = findNextIndex(qIndex, { ...answers, [questionId]: value } as Answers)
      if (nextIdx >= totalQuestions) return

      const currentQ = surveyQuestions[qIndex]
      const nextQ = surveyQuestions[nextIdx]

      if (currentQ && nextQ && currentQ.section !== nextQ.section) {
        setShowTransition(nextQ.section)
      } else {
        setDirection('forward')
        setAnimating(true)
        setTimeout(() => {
          setCurrentIndex(nextIdx)
          setAnimating(false)
        }, 200)
      }
    }, 450)
  }, [setAnswer, findNextIndex, answers])

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined

  const isCurrentValid = useCallback(() => {
    if (!currentQuestion) return true
    if (!currentQuestion.required) return true
    if (currentQuestion.type === 'text') return true // text is optional
    if (currentQuestion.type === 'multi') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    if (currentQuestion.type === 'conditional-email') {
      if (!currentAnswer) return false
      const needsEmail = currentQuestion.conditionalTriggers?.includes(currentAnswer as string)
      if (needsEmail && !email.trim()) return false
      return true
    }
    return currentAnswer !== undefined && currentAnswer !== ''
  }, [currentQuestion, currentAnswer, email])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const payload = {
        startup_stage: answers.startup_stage as string || null,
        location: answers.location as string || null,
        sector: answers.sector as string || null,
        time_building: answers.time_building as string || null,
        funding_status: answers.funding_status as string || null,
        pmf_confidence: answers.pmf_confidence as number || null,
        pmf_methods: answers.pmf_methods as string[] || null,
        tracks_retention_cohorts: answers.tracks_retention_cohorts as string || null,
        knows_d30_retention: answers.knows_d30_retention as string || null,
        pmf_data_locations: answers.pmf_data_locations as string[] || null,
        time_to_pmf_proof: answers.time_to_pmf_proof as string || null,
        sean_ellis_usage: answers.sean_ellis_usage as string || null,
        investor_pmf_question: answers.investor_pmf_question as string || null,
        investor_show_data: answers.investor_show_data as string || null,
        unclear_pmf_cost: answers.unclear_pmf_cost as string || null,
        runway_wasted: answers.runway_wasted as string || null,
        tools_used: answers.tools_used as string[] || null,
        has_unified_dashboard: answers.has_unified_dashboard as string || null,
        metrics_known_offhand: answers.metrics_known_offhand as string[] || null,
        pmf_score_usefulness: answers.pmf_score_usefulness as number || null,
        pmf_score_use_cases: answers.pmf_score_use_cases as string[] || null,
        biggest_pmf_frustration: answers.biggest_pmf_frustration as string || null,
        pricing_tier: answers.pricing_tier as string || null,
        would_recommend: answers.would_recommend as string || null,
        trust_requirements: answers.trust_requirements as string || null,
        follow_up_consent: answers.follow_up_consent as string || null,
        follow_up_email: email.trim() || null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      }

      const { error } = await supabase.from('survey_responses').insert(payload)

      if (error) {
        console.error('Supabase error:', error)
        setSubmitError('Something went wrong. Please try again.')
      } else {
        setIsComplete(true)
        setResponseCount(c => c + 1)
      }
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [answers, email])

  // Calculate effective question index (accounting for skipped questions)
  const getEffectiveProgress = useCallback(() => {
    let answered = 0
    let total = 0
    for (let i = 0; i < totalQuestions; i++) {
      if (!shouldSkipQuestion(surveyQuestions[i].id, answers)) {
        total++
        if (i < currentIndex) answered++
      }
    }
    return { answered, total }
  }, [currentIndex, answers])

  // Estimate time remaining
  const getTimeRemaining = useCallback(() => {
    const { answered, total } = getEffectiveProgress()
    const remaining = total - answered
    const secondsPerQuestion = 7
    const totalSeconds = remaining * secondsPerQuestion
    if (totalSeconds < 60) return '< 1 min left'
    const mins = Math.ceil(totalSeconds / 60)
    return `~${mins} min left`
  }, [getEffectiveProgress])

  const isLastQuestion = useCallback(() => {
    if (currentIndex < 0) return false
    const nextIdx = findNextIndex(currentIndex, answers)
    return nextIdx >= totalQuestions
  }, [currentIndex, answers, findNextIndex])

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && !isComplete) {
        e.preventDefault()
        if (showTransition) {
          handleTransitionContinue()
        } else if (currentIndex >= 0 && isLastQuestion() && isCurrentValid()) {
          handleSubmit()
        } else if (currentIndex >= 0 && isCurrentValid()) {
          handleNext()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isComplete, showTransition, isLastQuestion, isCurrentValid, handleNext, handleSubmit, handleTransitionContinue])

  // ─── RENDER ────────────────────────────────────────────────

  if (isComplete) {
    return <ThankYouScreen responseCount={responseCount} />
  }

  if (currentIndex === -1) {
    return <IntroScreen onStart={handleStart} responseCount={responseCount} />
  }

  // Section transition screen
  if (showTransition !== null) {
    const transition = sectionTransitions[showTransition]
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 noise-bg">
        <div className="w-full max-w-xl text-center survey-modal-enter">
          {/* Section number */}
          <div className="mb-6">
            <span
              className="text-6xl font-[100] text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#22c55e]"
              style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
            >
              {showTransition}
            </span>
            <span className="text-lg text-gray-600 ml-2">/ {totalSections}</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-[200] tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
          >
            {transition?.heading}
          </h2>

          <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-md mx-auto">
            {transition?.subtext}
          </p>

          <button
            onClick={handleTransitionContinue}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-black text-sm font-medium rounded-xl hover:opacity-90 transition-all group"
          >
            Continue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="mt-6">
            <span className="text-[11px] text-gray-700">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 font-mono text-[10px]">Enter ↵</kbd> to continue
            </span>
          </div>
        </div>
      </div>
    )
  }

  const { answered, total } = getEffectiveProgress()

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise-bg">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-6 py-4">
          {/* Section segments */}
          <div className="flex gap-1.5 mb-3">
            {Array.from({ length: totalSections }, (_, i) => {
              const sectionNum = i + 1
              const isActive = currentSection === sectionNum
              const isCompleted = currentSection > sectionNum
              return (
                <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isCompleted
                        ? 'w-full bg-gradient-to-r from-[#3b82f6] to-[#22c55e]'
                        : isActive
                          ? 'bg-gradient-to-r from-[#3b82f6] to-[#22c55e]'
                          : 'w-0'
                      }`}
                    style={isActive ? {
                      width: `${((currentIndex - surveyQuestions.findIndex(q => q.section === sectionNum)) /
                        surveyQuestions.filter(q => q.section === sectionNum).length) * 100}%`
                    } : undefined}
                  />
                </div>
              )
            })}
          </div>

          {/* Labels */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              {currentQuestion?.sectionName}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600">
                {getTimeRemaining()}
              </span>
              <span className="text-[10px] text-gray-700">•</span>
              <span className="text-xs text-gray-600">
                {answered + 1} of {total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-32">
        <div
          className={`w-full max-w-2xl transition-all duration-200 ${animating
              ? direction === 'forward'
                ? 'opacity-0 translate-x-8'
                : 'opacity-0 -translate-x-8'
              : 'opacity-100 translate-x-0'
            }`}
        >
          {/* Question number */}
          <div className="mb-4">
            <span className="text-xs text-gray-600 font-medium uppercase tracking-widest">
              Q{answered + 1}
            </span>
          </div>

          {/* Question text */}
          <h2
            className="text-2xl md:text-3xl font-[200] text-white mb-10 leading-relaxed tracking-tight"
            style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
          >
            {currentQuestion?.question}
          </h2>

          {/* Input area */}
          {currentQuestion && (
            <QuestionInput
              question={currentQuestion}
              answer={currentAnswer}
              email={email}
              onAnswer={(val) => {
                if (currentQuestion.type === 'single') {
                  handleSingleSelectAnswer(currentQuestion.id, val as string)
                } else {
                  setAnswer(currentQuestion.id, val)
                }
              }}
              onToggle={(opt) => toggleMultiOption(currentQuestion.id, opt)}
              onEmailChange={setEmail}
            />
          )}

          {submitError && (
            <div className="mt-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {submitError}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-gray-500 hover:text-white border border-white/5 hover:border-white/15 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {isLastQuestion() ? (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentValid() || isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-black text-sm font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isCurrentValid()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-black text-sm font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="text-center pb-3">
          <span className="text-[11px] text-gray-700">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 font-mono text-[10px]">Enter ↵</kbd> to continue
          </span>
        </div>
      </div>
    </div>
  )
}


// ─── QUESTION INPUT COMPONENT ────────────────────────────────

function QuestionInput({
  question,
  answer,
  email,
  onAnswer,
  onToggle,
  onEmailChange,
}: {
  question: SurveyQuestion
  answer: string | string[] | number | undefined
  email: string
  onAnswer: (val: string | number) => void
  onToggle: (opt: string) => void
  onEmailChange: (val: string) => void
}) {
  switch (question.type) {
    case 'single':
      return (
        <div className="space-y-2.5">
          {question.options?.map((option, i) => {
            const isSelected = answer === option
            return (
              <button
                key={i}
                onClick={() => onAnswer(option)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 group ${isSelected
                    ? 'bg-[#3b82f6]/10 border-[#3b82f6]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/15 hover:text-gray-200 hover:bg-white/[0.04]'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected
                      ? 'border-[#3b82f6] bg-[#3b82f6]'
                      : 'border-white/20 group-hover:border-white/30'
                    }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                  </div>
                  <span className="text-sm leading-relaxed">{option}</span>
                </div>
              </button>
            )
          })}
        </div>
      )

    case 'multi':
      return (
        <div className="space-y-2.5">
          {question.options?.map((option, i) => {
            const selected = Array.isArray(answer) && answer.includes(option)
            return (
              <button
                key={i}
                onClick={() => onToggle(option)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 group ${selected
                    ? 'bg-[#22c55e]/10 border-[#22c55e]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/15 hover:text-gray-200 hover:bg-white/[0.04]'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${selected
                      ? 'border-[#22c55e] bg-[#22c55e]'
                      : 'border-white/20 group-hover:border-white/30'
                    }`}>
                    {selected && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <span className="text-sm leading-relaxed">{option}</span>
                </div>
              </button>
            )
          })}
        </div>
      )

    case 'scale':
      return (
        <div>
          <div className="flex gap-2 flex-wrap">
            {Array.from(
              { length: (question.scaleMax ?? 10) - (question.scaleMin ?? 1) + 1 },
              (_, i) => (question.scaleMin ?? 1) + i
            ).map((val) => {
              const isSelected = answer === val
              return (
                <button
                  key={val}
                  onClick={() => onAnswer(val)}
                  className={`w-12 h-12 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${isSelected
                      ? 'bg-[#3b82f6] border-[#3b82f6] text-black scale-110 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                      : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/25 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {val}
                </button>
              )
            })}
          </div>
          <div className="flex justify-between mt-4 px-1">
            <span className="text-xs text-gray-600">{question.scaleMinLabel}</span>
            <span className="text-xs text-gray-600">{question.scaleMaxLabel}</span>
          </div>
        </div>
      )

    case 'text':
      return (
        <textarea
          value={(answer as string) || ''}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/20 transition-all resize-none leading-relaxed"
        />
      )

    case 'conditional-email':
      return (
        <div className="space-y-2.5">
          {question.options?.map((option, i) => {
            const isSelected = answer === option
            const showEmail = isSelected && question.conditionalTriggers?.includes(option)
            return (
              <div key={i}>
                <button
                  onClick={() => onAnswer(option)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 group ${isSelected
                      ? 'bg-[#3b82f6]/10 border-[#3b82f6]/40 text-white'
                      : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/15 hover:text-gray-200 hover:bg-white/[0.04]'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected
                        ? 'border-[#3b82f6] bg-[#3b82f6]'
                        : 'border-white/20 group-hover:border-white/30'
                      }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <span className="text-sm leading-relaxed">{option}</span>
                  </div>
                </button>
                {showEmail && (
                  <div className="mt-3 ml-9 survey-modal-enter">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => onEmailChange(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/20 transition-all"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )

    default:
      return null
  }
}


// ─── INTRO SCREEN ────────────────────────────────────────────

function IntroScreen({ onStart, responseCount }: { onStart: () => void; responseCount: number }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 noise-bg">
      {/* Ambient glows */}
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-[#3b82f6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 survey-modal-enter">
        {/* Section label */}
        <div className="section-label mb-8" style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}>
          Founder Research — 2026
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-[100] tracking-tight text-white mb-4 leading-tight"
          style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
        >
          The PMF{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22c55e]">
            Blind Spot
          </span>
        </h1>

        <p
          className="text-lg text-gray-400 font-[200] mb-8"
          style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
        >
          2026 Founder Research Study
        </p>

        {/* Intro copy */}
        <div className="space-y-4 mb-10 text-sm text-gray-400 leading-relaxed">
          <p>
            We&apos;re researching how early-stage founders measure product-market fit — and what
            gets in the way.
          </p>
          <p>
            This takes <span className="text-white font-medium">3 minutes</span>. Your answers are{' '}
            <span className="text-white font-medium">anonymous</span>. Once we&apos;ve surveyed 100+
            founders, we&apos;ll publish the full findings and share them with everyone who participated.
          </p>
          <p className="text-gray-500">
            No sales pitch. Just honest research — and results you can actually use.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { num: '26', label: 'Questions' },
            { num: '~3', label: 'Minutes' },
            { num: '5', label: 'Sections' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div
                className="text-2xl font-[200] text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#22c55e] mb-1"
                style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
              >
                {stat.num}
              </div>
              <div className="text-[11px] text-gray-600 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-black text-sm font-medium tracking-wide rounded-xl hover:opacity-90 transition-all group"
        >
          Begin the Survey
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Social proof */}
        {responseCount > 0 && (
          <p className="mt-6 text-[13px] text-gray-600">
            Join <span className="text-gray-400 font-medium">{responseCount}</span> founder{responseCount !== 1 ? 's' : ''} who&apos;ve already contributed
          </p>
        )}

        {/* Byline */}
        <p className="mt-4 text-[11px] text-gray-700">
          A research initiative by{' '}
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">
            Crelligent & Company
          </Link>
        </p>
      </div>
    </div>
  )
}


// ─── ANIMATED COUNTER HOOK ───────────────────────────────────

function useAnimatedCount(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    if (target === 0) return

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration])

  return count
}


// ─── THANK YOU SCREEN ────────────────────────────────────────

function ThankYouScreen({ responseCount }: { responseCount: number }) {
  const animatedCount = useAnimatedCount(responseCount)
  const [copied, setCopied] = useState(false)

  const shareText = `I just took the PMF Blind Spot survey — anonymous research on how founders actually measure product-market fit. Takes 3 minutes. ${SURVEY_URL}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SURVEY_URL)}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SURVEY_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden noise-bg">
      {/* Celebration glows */}
      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-[#3b82f6]/8 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#22c55e]/8 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 text-center survey-modal-enter">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#22c55e] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
          <Check className="w-10 h-10 text-black" />
        </div>

        <h1
          className="text-3xl md:text-4xl font-[200] tracking-tight text-white mb-4"
          style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
        >
          Thank you.
        </h1>

        <p className="text-gray-400 mb-2 text-sm leading-relaxed">
          You&apos;re one of <span className="text-white font-medium tabular-nums">{animatedCount}</span> founders
          who&apos;ve contributed to this research.
        </p>

        <p className="text-gray-500 mb-10 text-sm leading-relaxed">
          We&apos;ll email you the full findings as soon as the report is ready.
        </p>

        {/* Share section */}
        <div className="mb-10">
          <p className="text-[13px] text-gray-500 mb-4">Know another founder? Share the survey.</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[#22c55e]">Copied</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  Copy link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-gradient-to-r from-[#3b82f6] to-[#22c55e] mx-auto mb-10" />

        {/* VeloDesk CTA */}
        <div className="relative rounded-2xl overflow-hidden p-[1px] mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22c55e] opacity-60" />
          <div className="relative bg-[#0a0a0a] rounded-2xl p-8">
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              In the meantime — if you&apos;d like early access to <span className="text-white font-medium">VeloDesk</span>,
              the PMF validation platform we&apos;re building based on this research, you can join the waitlist.
            </p>
            <a
              href="https://velodesk.crelligent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-black text-sm font-medium rounded-xl hover:opacity-90 transition-all group"
            >
              <div className="flex flex-col text-left">
                <span>Join the VeloDesk Waitlist — Get Early Access + 14-Day Free Trial</span>
                <span className="text-[11px] text-black/60 font-normal mt-0.5">(No credit card required to join waitlist)</span>
              </div>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Return link */}
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-400 transition-colors"
        >
          Return to Crelligent
        </Link>
      </div>
    </div>
  )
}
