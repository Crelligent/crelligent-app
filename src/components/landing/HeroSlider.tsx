'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX, Play, Pause, SkipBack } from 'lucide-react';
import { P5Canvas } from './P5Canvas';

const slides = [
    {
        id: 1, // Business Design
        video: '/8200869-uhd_3840_2160_30fps.mp4',
        duration: 18000, // 00:18
        text: (
            <>
                BUSINESS DESIGN IS THE ARCHITECTURE OF INTENT. IT DEFINES THE SYSTEM'S PURPOSE, BOUNDARIES, AND STRUCTURAL LOGIC BEFORE ANYTHING IS BUILT.
            </>
        ),
    },
    {
        id: 2, // Product Strategy
        video: '/20690716-uhd_3840_2160_25fps.mp4',
        duration: 27000, // 00:27
        text: (
            <>
                FROM THAT ARCHITECTURE, PRODUCT STRATEGY EMERGES. NOT AS A FEATURE LIST, BUT AS THE DELIBERATE DESIGN OF ADVANTAGE WITHIN A DEFINED MARKET REALITY.
            </>
        ),
    },
    {
        id: 3, // Economics & Value Engineering
        video: '/273487_medium.mp4',
        duration: 18000, // 00:18
        text: (
            <>
                ADVANTAGE ONLY ENDURES WHEN THE ECONOMICS SUSTAIN IT. WE ENGINEER VALUE CREATION, COST STRUCTURES, AND REVENUE LOGIC SO SCALE STRENGTHENS THE SYSTEM RATHER THAN DESTABILIZES IT.
            </>
        ),
    },
    {
        id: 4, // CX/Service Design
        video: '/210213_medium.mp4',
        duration: 28000, // 00:28
        text: (
            <>
                BUT VALUE MUST BE EXPERIENCED. CUSTOMER AND SERVICE DESIGN TRANSLATE STRATEGY AND ECONOMICS INTO INTERACTIONS ENGINEERED FROM THE CORE — NOT APPLIED AT THE SURFACE.
            </>
        ),
    },
    {
        id: 5, // Operating model/process
        video: '/4824781-uhd_3840_2160_30fps.mp4',
        duration: 9000, // 00:09
        text: (
            <>
                EXPERIENCE DEPENDS ON STRUCTURE. THE OPERATING MODEL AND PROCESSES DETERMINE WHETHER GROWTH CREATES MOMENTUM OR FRICTION. STRUCTURE DICTATES VELOCITY.
            </>
        ),
    },
    {
        id: 6, // Technology & platform
        video: '/21116-315137080_medium.mp4',
        duration: 6000, // 00:06
        text: (
            <>
                TECHNOLOGY AND PLATFORMS BECOME THE NERVOUS SYSTEM. ENABLING COORDINATION, AUTOMATION, AND SCALABLE EXECUTION ACROSS THE ENTIRE ARCHITECTURE.
            </>
        ),
    },
    {
        id: 7, // Data & Intelligence
        video: '/13141784_1920_1080_60fps.mp4',
        duration: 17000, // 00:17
        text: (
            <>
                DATA AND INTELLIGENCE INSTRUMENT THAT SYSTEM. NOT TO REPORT THE PAST, BUT TO SENSE, PREDICT, AND ADAPT IN REAL TIME.
            </>
        ),
    },
    {
        id: 8, // Governance, Risk & Control
        video: '/9193308-hd_1280_720_31fps.mp4',
        duration: 50000, // 00:50
        text: (
            <>
                GOVERNANCE, RISK, AND CONTROL CREATE RESILIENCE. DISCIPLINE IS NOT THE OPPOSITE OF SPEED — IT IS WHAT MAKES SUSTAINABLE VELOCITY POSSIBLE.
            </>
        ),
    },
    {
        id: 9, // Change, Adoption & Behaviour
        video: '/4457089-hd_1920_1080_30fps.mp4',
        duration: 20000, // 00:20
        text: (
            <>
                AND YET SYSTEMS DO NOT TRANSFORM THEMSELVES. CHANGE, ADOPTION, AND BEHAVIOR DETERMINE WHETHER ARCHITECTURE BECOMES REALITY.
            </>
        ),
    },
    {
        id: 10, // Conclusion
        video: '/videos/slide10.mp4',
        duration: 10000, // placeholder
        text: (
            <>
                WHEN ALL NINE CAPABILITIES MOVE AS ONE SYSTEM, PERFORMANCE COMPOUNDS. THIS IS CRELLIGENT. WE ENGINEER BUSINESSES TO EVOLVE.
            </>
        ),
        isConclusion: true,
    }
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Control video playback based on active slide
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === currentSlide) {
                video.currentTime = 0;
                if (isPlaying) {
                    video.play().catch(() => { });
                }
            } else {
                video.pause();
            }
        });
    }, [currentSlide, isPlaying]);

    // Toggle Audio (unmute/mute the active video + narration track)
    const toggleAudio = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);

        // Toggle mute on all video elements
        videoRefs.current.forEach((video) => {
            if (video) video.muted = newMuted;
        });

        // Also control the narration audio track if present
        if (audioRef.current) {
            if (!newMuted && isPlaying) {
                audioRef.current.currentTime = currentSlide * 6;
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    };

    // Play/Pause Controls
    const togglePlayPause = () => {
        const newPlaying = !isPlaying;
        setIsPlaying(newPlaying);

        // Directly control the current video
        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo) {
            if (newPlaying) {
                currentVideo.play().catch(() => { });
            } else {
                currentVideo.pause();
            }
        }

        // Also control the narration audio track if present
        if (audioRef.current && !isMuted) {
            if (newPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    };

    // Skip Backwards
    const skipBack = () => {
        setCurrentSlide((prev) => {
            const newIndex = prev === 0 ? slides.length - 1 : prev - 1;

            // Re-sync audio if it's currently playing
            if (audioRef.current && !isMuted) {
                audioRef.current.currentTime = newIndex * 6;
            }

            return newIndex;
        });
    };

    // Auto-advance slides based on each video's duration
    useEffect(() => {
        if (!isPlaying) return;

        const currentDuration = slides[currentSlide].duration;
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, currentDuration);

        return () => clearTimeout(timer);
    }, [isPlaying, currentSlide]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
            {/* Backgrounds */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                        }`}
                >
                    <>
                        {/* Fallback dark background while video loads or if missing */}
                        <div className="absolute inset-0 bg-[#0a0a0a]" />
                        <video
                            ref={(el) => { videoRefs.current[index] = el; }}
                            src={slide.video}
                            muted
                            playsInline
                            preload={index === 0 ? "auto" : "none"}
                            className="w-full h-full object-cover opacity-75"
                        />
                    </>
                </div>
            ))}

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050505]/80 via-[#050505]/20 to-[#050505]/50 pointer-events-none" />

            {/* Floating Particle Texture Overlay (Optional, adds premium feel) */}
            <div className="absolute inset-0 z-[2] bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Narrative Text */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
                {slides.map((slide, index) => (
                    <div
                        key={`text-${slide.id}`}
                        className={`absolute flex flex-col items-center justify-center w-full px-4 transition-all duration-1000 transform ${index === currentSlide
                            ? 'opacity-100 translate-y-0 pointer-events-auto delay-300'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                            }`}
                    >
                        <h1 className={`max-w-3xl mx-auto ${slide.isConclusion ? 'text-lg md:text-2xl font-light text-white tracking-[0.15em]' : 'text-base md:text-xl font-thin text-white tracking-[0.15em]'} leading-[1.8] md:leading-[1.8] text-justify [text-align-last:center]`}>
                            {slide.text}
                        </h1>

                        {/* Show Action Buttons only on the Conclusion slide */}
                        {slide.isConclusion && (
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards pointer-events-auto">
                                <Link href="/foundry" className="btn-primary">
                                    For Startups
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="/enterprise" className="btn-ghost">
                                    For Enterprise
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Control Strip */}
            <div className="absolute bottom-10 right-10 z-50 flex items-center gap-3">
                {/* Back Button */}
                <button
                    onClick={skipBack}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
                    aria-label="Previous slide"
                >
                    <SkipBack className="w-5 h-5" />
                </button>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
                    aria-label={isPlaying ? "Pause sequence" : "Play sequence"}
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <div className="w-[1px] h-8 bg-white/10 mx-1" />

                {/* Sound Toggle */}
                <button
                    onClick={toggleAudio}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
                    aria-label={isMuted ? "Unmute narration" : "Mute narration"}
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </div>
            {/* Progress Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-8 bg-[#3b82f6]' : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 opacity-50">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>
        </section>
    );
}
