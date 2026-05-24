import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Workplace Policy - Crelligent',
    description: 'Our commitment to a remote-first operating model.',
}

export default function WorkplacePolicy() {
    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="max-w-3xl mx-auto">
                <div className="section-label mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Workplace Policy
                </div>
                
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899]">Remote-First.</span>
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300 font-light leading-relaxed">
                    <p className="text-lg">
                        At Crelligent, we believe that world-class systems design and engineering should not be constrained by geography. Our operating model is designed around distributed talent, asynchronous collaboration, and deep focus.
                    </p>
                    
                    <p>
                        Being <strong>100% remote-first</strong> is a structural choice. It forces us to build resilient internal systems, communicate with precision, and evaluate performance purely based on output and impact—principles we also apply to the systems we design for our clients.
                    </p>

                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 mt-8">
                        <h3 className="text-white font-medium mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Global Talent, Unified Culture</h3>
                        <p className="text-sm">
                            Our team members operate from multiple time zones, united by a shared commitment to engineering excellence. We leverage asynchronous workflows and digital command centers to maintain operational velocity without the overhead of physical offices.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
