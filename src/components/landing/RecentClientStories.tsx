'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Array of stories to power the slider
const stories = [
    {
        id: 1,
        title: "How Crelligent Re-Engineered the System Behind ESN Petroleum Services Limited",
        description: "ESN Petroleum Services Limited had built strong capabilities in fuel cards, fleet telemetry, and reporting. Crelligent's role was not to optimize individual tools, but to engineer the entire operating systems integrating payments, data, technology, operations, and control into one coordinated platform. The result was a structurally unified fleet intelligence system designed to scale, detect risk in real time, and embed operational control directly into the architecture.",
        image: "/jean-christophe-gougeon-t8bDFvkhNQY-unsplash.jpg",
        bgGradient: "from-[#1e3a8a]/20 to-[#0f172a]",
        accentGradient: "from-[#3b82f6] to-[#ec4899]",
        link: "#"
    },
    {
        id: 2,
        title: "How Crelligent Engineered Geo-Roam's Transition from Physical Games to a Digital Platform",
        description: "Geo-Roam had built an engaging board game designed to educate Nigerians about the country's tourist attractions. Crelligent engineered the transition into a scalable digital platform designing the product architecture, engagement model, and technology foundation required to transform a physical game into a mobile experience capable of reaching millions while preserving its educational and cultural mission.",
        image: "/ChatGPT Image Feb 28, 2026, 02_07_26 PM.png",
        bgGradient: "from-[#14532d]/20 to-[#052e16]",
        accentGradient: "from-[#22c55e] to-[#3b82f6]",
        link: "#"
    },
    {
        id: 4,
        title: "How Crelligent Engineered the System Architecture Behind CallMed Technologies",
        description: "CallMed Technologies was founded with the ambition to build the digital infrastructure, applications, and hardware powering the future of healthcare. Crelligent engineered the core system architecture aligning platform design, data flows, and operational structure-to enable CallMed to function as a unified healthcare infrastructure capable of scaling across providers, patients, and devices.",
        image: "/ChatGPT Image Mar 1, 2026, 07_18_56 AM.png",
        bgGradient: "from-[#0f766e]/20 to-[#134e4a]",
        accentGradient: "from-[#14b8a6] to-[#3b82f6]",
        link: "#"
    },
    {
        id: 5,
        title: "How Crelligent Engineered ESN's Biometric Identity Platform into a Secure, Scalable Digital Infrastructure",
        description: "ESN's biometric enrollment process relied on fragmented tools, manual photo editing, and non-standardized device workflows creating operational friction and security exposure. Crelligent redesigned the entire identity lifecycle into a unified, multi-institution biometric platform, integrating Android enrollment devices, centralized identity management, and automated SecureID transmission to transform manual enrollment operations into a secure, scalable digital identity infrastructure.",
        image: "/logo.png",
        bgGradient: "from-[#9f1239]/20 to-[#4c0519]",
        accentGradient: "from-[#f43f5e] to-[#f59e0b]",
        link: "#"
    }
]

export function RecentClientStories() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % stories.length)
    }

    const handlePrev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
    }

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentIndex) return
        setIsAnimating(true)
        setCurrentIndex(index)
    }

    // Reset animation flag after transition completes
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 500) // matches duration-500
            return () => clearTimeout(timer)
        }
    }, [isAnimating, currentIndex])

    const currentStory = stories[currentIndex]

    return (
        <section className="py-24 relative overflow-hidden bg-[#050505]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
                <h2 className="heading-lg text-center md:text-left">
                    Recent client stories
                </h2>
            </div>

            <div className="w-full relative h-[450px] md:h-[500px]">
                {/* Background Image/Gradient with smooth transition */}
                <div className="absolute inset-0 z-0 bg-[#050505]">
                    {/* The main image */}
                    <div
                        className="absolute inset-0 transition-opacity duration-1000 bg-contain bg-no-repeat bg-right md:bg-right"
                        style={{ backgroundImage: `url('${currentStory.image}')` }}
                    />
                    {/* Subtle dark gradient overlay just to ensure text/border readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content Box Overlay */}
                <div className="absolute inset-0 z-10 flex items-center max-w-7xl mx-auto px-6">
                    <div className="w-full md:w-[45%] rounded-xl p-[1px] relative shadow-2xl overflow-hidden mt-8 md:mt-0 group">

                        {/* Glowing Border Wrap */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${currentStory.accentGradient} opacity-30 group-hover:opacity-100 transition-all duration-1000 ease-in-out`} />

                        {/* Inner Glass Box */}
                        <div className="relative bg-[#050505]/95 backdrop-blur-md rounded-xl p-8 md:p-12 h-full min-h-[380px] md:min-h-[400px] z-10 flex flex-col pt-8 pb-32">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                            {/* Sliding Content Wrapper */}
                            <div
                                className={`relative transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                            >
                                <h3 className="text-xl md:text-2xl font-[300] tracking-wide text-white leading-tight mb-6">
                                    {currentStory.title}
                                </h3>

                                <p className="text-sm text-gray-400 font-[200] leading-relaxed mb-8 hidden md:block">
                                    {currentStory.description}
                                </p>

                                {/* Mobile truncated text for shorter vertical real estate */}
                                <p className="text-sm text-gray-400 font-[200] leading-relaxed mb-6 block md:hidden line-clamp-3">
                                    {currentStory.description}
                                </p>

                                <Link
                                    href={currentStory.link}
                                    className="inline-flex pl-6 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white font-[300] text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/30 transition-all items-center gap-3 group/btn"
                                >
                                    Read more
                                    <ArrowRight className="w-4 h-4 text-white opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                </Link>
                            </div>

                            {/* Slider Navigation Controls fixed to bottom of internal card */}
                            <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 bg-black/80 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4 z-20">
                                <button
                                    onClick={handlePrev}
                                    disabled={isAnimating}
                                    className="text-gray-500 hover:text-white disabled:opacity-50 transition-colors"
                                    title="Previous Story"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>

                                <div className="flex gap-2">
                                    {stories.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goToSlide(idx)}
                                            disabled={isAnimating}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                                ? `bg-blue-500 w-4`
                                                : `border border-gray-600 bg-transparent hover:border-gray-400`
                                                }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={isAnimating}
                                    className="text-gray-500 hover:text-white disabled:opacity-50 transition-colors"
                                    title="Next Story"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
