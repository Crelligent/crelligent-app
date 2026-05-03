'use client'

import { useState } from 'react'

const phases = [
    {
        id: 1,
        title: "The Diagnostic",
        duration: "4–6 weeks",
        tagline: "Most companies guess. We don't. We map the absolute truth of how your organization behaves—finding the invisible constraints that others miss.",
        color: "#3b82f6",
        gradient: "from-[#3b82f6] to-[#60a5fa]",
        whatWeDo: [
            "Executive interviews",
            "System mapping",
            "Customer & operational signal review",
            "Technology landscape assessment"
        ],
        whatYouReceive: [
            "Enterprise System Map",
            "Constraint & Leverage Point Analysis",
            "Risk & Failure Modes Brief",
            "Clear problem framing"
        ]
    },
    {
        id: 2,
        title: "The Architecture",
        duration: "6–10 weeks",
        tagline: "Design isn't just how it looks. It's how it works. We re-engineer the core of your business to align completely with your intent.",
        color: "#8b5cf6",
        gradient: "from-[#8b5cf6] to-[#a78bfa]",
        whatWeDo: [
            "Business system redesign",
            "Experience & product alignment",
            "Data & decision intelligence design",
            "Governance & operating model definition"
        ],
        whatYouReceive: [
            "Target System Architecture",
            "Experience & Product Blueprint",
            "Decision & Intelligence Model",
            "Engineering & Platform Roadmap"
        ]
    },
    {
        id: 3,
        title: "The Build",
        duration: "12–24 weeks",
        tagline: "Ideas are easy. Execution is everything. We build the platforms, pipelines, and habits that make the new system your reality.",
        color: "#ec4899",
        gradient: "from-[#ec4899] to-[#f472b6]",
        whatWeDo: [
            "Platform & product engineering",
            "Data pipelines & analytics",
            "CX implementation",
            "Change enablement"
        ],
        whatYouReceive: [
            "Working systems",
            "Operational dashboards",
            "Trained internal teams",
            "Transition to operations"
        ]
    },
    {
        id: 4,
        title: "The Evolution",
        duration: "Ongoing",
        tagline: "Static systems die. We install the sensors and feedback loops to ensure you adapt, learn, and stay ahead.",
        color: "#22c55e",
        gradient: "from-[#22c55e] to-[#4ade80]",
        whatWeDo: [
            "Quarterly system health reviews",
            "Feedback loop monitoring",
            "Risk & resilience assessments",
            "Continuous improvement cycles"
        ],
        whatYouReceive: [
            "System Health Reports",
            "Improvement backlog",
            "Executive foresight briefings"
        ]
    }
]

export function EsreTimeline() {
    const [activePhase, setActivePhase] = useState(phases[0])

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Abstract Background Element */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: `${activePhase.color}15` }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <div className="section-label mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Our Methodology</div>
                    <h2 className="heading-lg mb-6">
                        The Enterprise System Redesign Engagement (ESRE)™
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        A disciplined, end-to-end partnership that transforms strategic intent into operational reality.
                    </p>
                </div>

                {/* Timeline Interactive Component */}
                <div className="relative mb-20" style={{ fontFamily: "'Outfit', sans-serif" }}>

                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 hidden md:block" />

                    {/* Active progress line connecting up to the active phase */}
                    <div
                        className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 transition-all duration-700 hidden md:block"
                        style={{
                            width: `${((activePhase.id - 1) / (phases.length - 1)) * 100}%`,
                            background: `linear-gradient(to right, transparent, ${activePhase.color})`
                        }}
                    />

                    <div className="grid grid-cols-1 md:flex md:justify-between gap-8 md:gap-0 relative z-10">
                        {phases.map((phase) => {
                            const isActive = activePhase.id === phase.id
                            return (
                                <div
                                    key={phase.id}
                                    className="flex flex-row md:flex-col items-center gap-4 cursor-pointer group group-hover:opacity-100 transition-opacity"
                                    onMouseEnter={() => setActivePhase(phase)}
                                    onClick={() => setActivePhase(phase)}
                                >
                                    {/* Node */}
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#050505]' : 'bg-[#111111] group-hover:bg-[#151515]'} border-2 z-10`} style={{ borderColor: isActive ? phase.color : 'rgba(255,255,255,0.1)' }}>
                                            <span className={`text-sm font-[300] transition-colors duration-500`} style={{ color: isActive ? phase.color : '#666' }}>0{phase.id}</span>
                                        </div>
                                        {/* Glow effect when active */}
                                        <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${isActive ? 'opacity-50' : 'opacity-0'}`} style={{ backgroundColor: phase.color }} />
                                    </div>

                                    {/* Title */}
                                    <div className="md:text-center text-left">
                                        <div className={`text-[11px] uppercase tracking-[0.2em] mb-1 transition-colors duration-500 font-[400]`} style={{ color: isActive ? phase.color : '#555' }}>
                                            {phase.duration}
                                        </div>
                                        <div className={`text-lg font-[300] tracking-wide transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                            {phase.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Content Display Area (Dynamic) */}
                <div className="relative w-full rounded-2xl p-[1px] overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <div
                        className="absolute inset-0 opacity-40 transition-colors duration-700"
                        style={{ background: `linear-gradient(to bottom right, ${activePhase.color}, transparent)` }}
                    />

                    <div className="relative bg-[#080808] rounded-2xl p-8 md:p-16 w-full flex flex-col items-center text-center overflow-hidden border border-white/5 min-h-[440px]">
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] rounded-full opacity-10 transition-colors duration-1000 pointer-events-none"
                            style={{ backgroundColor: activePhase.color }}
                        />

                        <h3 className="text-3xl md:text-4xl font-[300] tracking-wide text-white mb-6 transition-all duration-500 relative z-10">
                            {activePhase.title}
                        </h3>

                        <p className="text-base md:text-lg text-gray-300 font-[200] leading-loose max-w-3xl mx-auto mb-16 relative z-10 transition-all duration-500" key={activePhase.id}>
                            {activePhase.tagline}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto text-left relative z-10">
                            <div className="bg-[#111111]/80 backdrop-blur-sm p-8 rounded-xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, ${activePhase.color}, transparent)` }} />
                                <div className="text-[11px] uppercase text-gray-400 tracking-[0.2em] mb-6 font-[400] opacity-80 flex items-center gap-3 relative z-10">
                                    <div className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: activePhase.color }} />
                                    What we do
                                </div>
                                <ul className="space-y-4 relative z-10">
                                    {activePhase.whatWeDo.map((item, i) => (
                                        <li key={`${activePhase.id}-do-${i}`} className="text-sm text-gray-300 font-[200] leading-relaxed flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 100}ms`, animationDuration: '500ms' }}>
                                            <span className="text-gray-600 mt-1.5 opacity-50 block w-1 h-1 rounded-full shrink-0 bg-current" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-[#111111]/80 backdrop-blur-sm p-8 rounded-xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, ${activePhase.color}, transparent)` }} />
                                <div className="text-[11px] uppercase text-gray-400 tracking-[0.2em] mb-6 font-[400] opacity-80 flex items-center gap-3 relative z-10">
                                    <div className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: activePhase.color }} />
                                    What you receive
                                </div>
                                <ul className="space-y-4 relative z-10">
                                    {activePhase.whatYouReceive.map((item, i) => (
                                        <li key={`${activePhase.id}-receive-${i}`} className="text-sm text-gray-300 font-[200] leading-relaxed flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${(i + activePhase.whatWeDo.length) * 100}ms`, animationDuration: '500ms' }}>
                                            <span className="text-gray-600 mt-1.5 opacity-50 block w-1 h-1 rounded-full shrink-0 bg-current" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
