import { Metadata } from 'next'
import Link from 'next/link'
import { Linkedin, Link2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'The Hidden Cost of Your Last Technology Investment | CEO Corner Issue #1 | Crelligent',
    description: 'Systems thinking for African enterprise leaders. The CEO Corner by Crelligent.',
    openGraph: {
        images: ['/og-image.jpg'],
    }
}

export default function CEOCornerIssue1() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Header Section */}
            <header className="px-6 mb-16 max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/insights" className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                        Insights
                    </Link>
                    <span className="text-gray-700">/</span>
                    <span className="text-xs text-[#ec4899] uppercase tracking-widest font-semibold">
                        The CEO Corner — Issue #1
                    </span>
                </div>
                
                <div className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-3 font-semibold">
                    <div className="w-4 h-[1px] bg-gray-500" />
                    Systems thinking for African enterprise leaders
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The Hidden Cost of Your Last Technology Investment
                </h1>
            </header>

            {/* Article Content */}
            <article className="px-6 max-w-[680px] mx-auto text-gray-300 font-[300] leading-loose space-y-8 text-lg">
                <p>
                    There is a conversation I have had more times than I can count, in boardrooms across Lagos.
                </p>
                <p>
                    A CEO leans back in their chair and tells me about the ERP system they implemented eighteen months ago. The figure they spent. The months of disruption. The consultant fees. The staff training. The promise of what it would do for the business.
                </p>
                <p>
                    Then they pause.
                </p>
                <p>
                    "The system is running," they say. "But honestly? I am not sure what we got for it."
                </p>
                <p>
                    I always ask the same question: "Before you chose the system — did you document how the business actually works?"
                </p>
                <p>
                    The answer, almost every time, is no.
                </p>
                <p>
                    And that is the hidden cost of your last technology investment. Not the licence fee. Not the implementation. Not even the lost productivity during the transition period. The real cost is the gap between what you paid for and what you actually received — and the reason for that gap has nothing to do with the technology.
                </p>

                <h2 className="text-2xl text-white font-medium mt-12 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The problem is not the system
                </h2>
                <p>
                    Nigerian enterprises are not under-investing in technology. Walk through any serious mid-market operation in Lagos or Abuja and you will find ERP systems, CRM platforms, HR software, accounting tools. The investment is real. The intent is genuine.
                </p>
                <p>
                    What is consistently absent is something far less visible — and far more important.
                </p>
                <p>
                    Call it the operating model. The documented architecture of how the business works: what processes exist, who owns them, in what sequence they run, who decides what, and what happens when something goes wrong. The structural logic of the organisation that any system — human or technological — must conform to before it can add value.
                </p>
                <p>
                    When this architecture does not exist, technology cannot save you. In fact, it makes things worse.
                </p>
                <p>
                    Because technology does not redesign your business. It automates whatever is already happening. If what is already happening is undocumented, inconsistent, and founder-dependent — technology makes those problems faster, more visible, and significantly more expensive.
                </p>

                <h2 className="text-2xl text-white font-medium mt-12 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The Wright Brothers did not need a bigger engine
                </h2>
                <p>
                    In 1903, the most-funded aviation projects in the world were failing. Not for lack of power. They were building larger engines and bolting them onto unstable frames. They kept solving the wrong problem.
                </p>
                <p>
                    The Wright brothers succeeded because they understood that flight was not a power problem. It was a control and integration problem. They designed the three-axis control system before they worried about the engine. The architecture came first.
                </p>
                <p>
                    Most technology implementations in Nigerian enterprise are the bigger engine. More processing power, more modules, more data. Bolted onto a business whose underlying architecture was never designed in the first place.
                </p>
                <p>
                    The result is predictable: the system runs. The business does not improve. The CEO looks at the dashboard and wonders why the numbers still require explanation every Monday morning.
                </p>

                <h2 className="text-2xl text-white font-medium mt-12 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    What I keep finding
                </h2>
                <p>
                    In the diagnostic work Crelligent does across Nigerian mid-market enterprises, one finding recurs with a consistency that no longer surprises me.
                </p>
                <p>
                    The constraint is almost never the market. Rarely the technology. Almost universally, the primary constraint is the operating model — the absence of a deliberate, documented architecture for how the business works.
                </p>
                <p>
                    Processes that exist in the founder's head but nowhere else. Decision rights that are assumed but never written down. New hires who cannot perform not because they lack skill but because there is no system for them to plug into. Meetings that recur because the same decisions are made — and unmade — every week.
                </p>
                <p>
                    Into this environment, an ERP is installed. And the ERP faithfully reflects the chaos it found. It simply does so in a database.
                </p>

                <h2 className="text-2xl text-white font-medium mt-12 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The sequence that actually works
                </h2>
                <p>
                    The enterprises I have seen make technology work share one characteristic: they designed the architecture before they selected the tool.
                </p>
                <p>
                    Not perfectly. Not in some waterfall project management fantasy where everything is documented before anything moves. But deliberately enough to answer the questions that determine whether a system will work: What processes does this technology need to support? Who makes decisions inside this process, at what threshold, and how quickly? What does "working correctly" look like — and how will we know when it isn't?
                </p>
                <p>
                    These are not technology questions. They are architecture questions. And they cannot be answered by a software vendor.
                </p>
                <p>
                    When you answer them first — even partially, even imperfectly — the technology implementation becomes simpler, cheaper, and more likely to deliver what you paid for. The team knows what the system is supposed to do. The system knows what it is supposed to support. The two things fit together because they were designed together.
                </p>
                <p>
                    When you skip this step — when you let the technology vendor define the architecture by the shape of their modules — you inherit their assumptions about how businesses work. And their assumptions were built for someone else's business.
                </p>

                <h2 className="text-2xl text-white font-medium mt-12 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The question worth sitting with
                </h2>
                <p>
                    Before your next technology decision — before the demo, before the proposal, before the shortlist — ask yourself one question honestly.
                </p>
                
                {/* Highlight Box */}
                <div className="my-12 p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-r-xl border-l-4 border-l-[#ec4899] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/5 to-transparent opacity-50" />
                    <div className="relative z-10">
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            If I had to explain, in writing, exactly how this part of the business works today — the full sequence of steps, the decision points, who is responsible for what, what happens when something fails — could I do it?
                        </p>
                        <p className="text-gray-400">
                            Not from memory. In writing. Specific enough that someone who has never met you could pick it up and operate this part of the business correctly.
                        </p>
                    </div>
                </div>

                <p>
                    If the answer is no, the technology investment you are considering will not solve the problem you think it will solve. It will digitise the absence of architecture. And you will have that conversation — the one about what you got for the money — in eighteen months.
                </p>
                <p>
                    The architecture comes first. The system follows. In that sequence, technology performs. In the other sequence, it disappoints.
                </p>
                <p>
                    That is not a technology problem. It is a design problem. And design problems have design solutions.
                </p>

                <hr className="border-white/10 my-16" />

                {/* Conclusion & CTA */}
                <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12 border border-white/5 text-center">
                    <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
                        <strong>CEO Corner</strong> is a weekly newsletter on systems thinking for African enterprise leaders, published by Crelligent & Company. If someone forwarded this to you and you found it useful, you can subscribe at <Link href="/" className="text-[#ec4899] hover:underline">crelligent.com</Link>.
                    </p>
                    <p className="text-white mb-8">
                        If you want to understand how your enterprise&apos;s architecture compares to the market, the ESRE OS Diagnostic is free and takes ten minutes.
                    </p>
                    <Link href="/esre-os/diagnostic" className="inline-flex items-center gap-3 px-8 py-4 bg-[#ec4899] hover:bg-[#db2777] text-white rounded-sm font-medium tracking-wide transition-colors">
                        Take the ESRE OS Diagnostic <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>

            {/* Footer / Sharing */}
            <footer className="mt-24 pt-12 border-t border-white/5 max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Share this briefing:</span>
                    <button className="text-gray-400 hover:text-white transition-colors" title="Share on LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors" title="Copy Link">
                        <Link2 className="w-5 h-5" />
                    </button>
                </div>
            </footer>
        </main>
    )
}
