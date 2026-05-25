import { Metadata } from 'next'
import Link from 'next/link'
import { Linkedin, Link2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'The Hidden Cost of Your Last Technology Investment | CEO Corner Issue #1 | Crelligent',
    description: 'Why Nigerian enterprises spend more on systems than they earn from them — and the structural reason it keeps happening. The CEO Corner by Crelligent.',
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
                    Conversations for tomorrow
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The Hidden Cost of Your Last Technology Investment
                </h1>
                
                <p className="text-xl text-gray-300 font-light leading-relaxed border-l-2 border-white/10 pl-6">
                    Why Nigerian enterprises spend more on systems than they earn from them — and the structural reason it keeps happening.
                </p>
            </header>

            {/* Article Content */}
            <article className="px-6 max-w-[680px] mx-auto text-gray-300 font-[300] leading-loose space-y-8 text-lg">
                <p>
                    Between 2020 and 2025, Nigerian mid-to-large enterprises collectively spent an estimated ₦800 billion on technology transformation — ERP implementations, digital platforms, data warehouses, mobile applications, and the consultants who specified them.
                </p>
                <p>
                    Less than 30% of those investments are performing at the outcome level they were purchased to produce.
                </p>
                <p className="text-white font-medium text-xl">
                    This is not a technology problem.
                </p>
                <p>
                    The ERP works. The platform is live. The application processes transactions. The system does what it was built to do.
                </p>
                <p>
                    The problem is that the system was built before the operating model that should govern it was designed. The data schema was specified before anyone drew the architecture of the decisions the data should support. The software was built for the features the project team wanted — not the processes the business actually runs on.
                </p>
                <p className="text-white font-medium text-xl">
                    The technology is correct. The foundation beneath it was never laid.
                </p>
                <p>
                    This is what we call <strong>Gate Sequencing Failure</strong> — and it is the most expensive pattern in Nigerian enterprise technology investment. An organization spends ₦120M on an ERP and then spends the next two years explaining to the board why the ₦120M system requires manual reconciliation in Excel every month.
                </p>
                <p>
                    The reconciliation is not a technology failure. It is a systems design failure that happened before the first line of code was written.
                </p>

                {/* Diagnostic Question Box */}
                <div className="my-16 p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-r-xl border-l-4 border-l-[#ec4899] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/5 to-transparent opacity-50" />
                    <div className="relative z-10">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-[#ec4899] mb-4 font-bold">
                            The Diagnostic Question
                        </div>
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            If you removed your most significant technology investment of the last three years — the platform, the system, the application — how much of your operational capability would actually disappear?
                        </p>
                        <p className="text-gray-400">
                            If the honest answer is "less than we paid for," the investment was applied to the wrong layer of the problem.
                        </p>
                    </div>
                </div>

                <p className="text-xl md:text-2xl text-white font-light text-center my-16 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    The technology is the last thing to build.<br />
                    <span className="text-gray-500">It is almost always the first thing bought.</span>
                </p>

                <hr className="border-white/10 my-12" />

                {/* Conclusion & CTA */}
                <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12 border border-white/5 text-center">
                    <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
                        <strong>The CEO Corner</strong> is Crelligent&apos;s executive briefing series — published for Nigerian and African business leaders navigating the systems challenges that strategy documents do not address.
                    </p>
                    <p className="text-white mb-8">
                        If this issue raised a question about your organization, we offer a complimentary 90-minute diagnostic session. No sales agenda. One question: where is the gap?
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-[#ec4899] hover:bg-[#db2777] text-white rounded-sm font-medium tracking-wide transition-colors">
                        Request a Diagnostic Session <ArrowRight className="w-4 h-4" />
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

                <div>
                    <Link href="#" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <span className="text-xs uppercase tracking-widest font-semibold">Next issue</span>
                        <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </footer>
        </main>
    )
}
