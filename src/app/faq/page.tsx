import { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ClientPortalBanner } from '@/components/ClientPortalBanner'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Crelligent',
  description: 'Common questions about the ESRE OS, enterprise operating systems in Africa, AEHI, and the Crelligent Foundry.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Enterprise Operating Systems (ESRE OS)",
      questions: [
        {
          q: "What exactly is an enterprise operating system?",
          a: "Just as a computer cannot run applications without a foundational OS (like Windows or macOS), a growing enterprise cannot execute strategy reliably without an enterprise OS. It is the connective tissue between strategy, technology, operations, and data. Without it, companies rely on individual heroics rather than systemic processes."
        },
        {
          q: "What are the key capability layers required in an African mid-market digital operating system?",
          a: "An effective African mid-market digital operating system requires a 5-layer core architecture. This includes L1 Business Design (The Kernel) to define structural boundaries, L2 Operating Model (The Scheduler) to manage workflows, L3 Technology & Platform (Infrastructure Layer) to host integrations, L4 Data & Intelligence (Sensing Layer) for feedback loops, and L5 Governance & Risk (Security Layer) to enforce control policies."
        },
        {
          q: "How does an enterprise operating system improve mid-market operational efficiency in Africa?",
          a: "In African markets, mid-market companies often scale through the sheer force of will by founders. An enterprise operating system (like ESRE OS) improves efficiency by institutionalizing the 'Scheduler' layer (L2). It removes the founder as the operational bottleneck, automates resource allocation, establishes clear governance protocols, and provides real-time performance diagnostics—allowing the business to scale predictably and execute strategy autonomously."
        }
      ]
    },
    {
      category: "AEHI & Enterprise Health",
      questions: [
        {
          q: "What is the African Enterprise Health Index (AEHI)?",
          a: "The AEHI is the definitive benchmark for mid-market enterprises across Africa. We evaluate organizations against the 5-layer ESRE OS framework to generate an objective ESRE OS Performance Score (0-100), measuring operational resilience, technology posture, and process maturity."
        },
        {
          q: "How do enterprise operating systems integrate operational telemetry with management dashboards?",
          a: "Our enterprise operating systems utilize PRISM—our proprietary L4 sensing network layer—to ingest raw operational telemetry (such as fleet movements, transaction logs, and energy usage) from Crelligent Edge Modules (CEM). This physical telemetry is securely streamed into the ESRE OS Database and visualized in real-time on the ESRE OS Dashboard, giving executives an objective, unified command layer to detect drift and track the organization's Live Performance Score."
        }
      ]
    },
    {
      category: "Startups & Grassroots",
      questions: [
        {
          q: "What is included in an ESRE OS Lite deployment\?",
          a: "An ESRE OS Lite deployment, delivered through Crelligent Foundry and validated via VeloDesk (our PMF Validation Platform), provides an essential operating system baseline. It includes a validated L1 Business Design blueprint, a lightweight L2 Operating Model mapped to your early team, and pre-configured L3 Technology integrations. This foundational architecture is calibrated specifically for early-stage companies to ensure operational stability while preparing for institutional investment."
        },
        {
          q: "What is the ESRE Vitals Bot?",
          a: "The Vitals Bot is a conversational AI embedded in WhatsApp, designed for the grassroots economy. It allows informal traders to record daily sales, track debtors, generate PDF receipts, and receive low-stock alerts purely via text or voice notes, without needing complex software."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#3b82f6]/30 selection:text-white flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex mb-6">
              <span className="text-[11px] font-[400] uppercase tracking-[0.2em] text-[#3b82f6] border border-[#3b82f6]/20 rounded-full px-4 py-1.5 bg-[#3b82f6]/5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Knowledge Base
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[300] text-white tracking-tight leading-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Common questions about the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">Enterprise OS.</span>
            </h1>
            <p className="text-xl text-gray-400 font-[200] max-w-2xl leading-relaxed">
              Everything you need to know about installing, scoring, and scaling your organization&apos;s operating system.
            </p>
          </div>

          <div className="space-y-16">
            {faqs.map((group, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-2xl font-[300] text-white border-b border-white/10 pb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {group.category}
                </h2>
                <div className="space-y-6">
                  {group.questions.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white-[0.07] transition-colors">
                      <h3 className="text-lg font-[400] text-gray-200 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {faq.q}
                      </h3>
                      <p className="text-gray-400 font-[200] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#3b82f6]/10 to-transparent border border-[#3b82f6]/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-[300] text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Still have questions?</h3>
              <p className="text-gray-400 font-[200]">Our systems architects are ready to evaluate your current setup.</p>
            </div>
            <Link href="/contact" className="shrink-0 px-8 py-4 rounded-full bg-white text-black font-[400] tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center gap-3 text-sm">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* JSON-LD for AI Search Engines & LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.flatMap(group => 
              group.questions.map(q => ({
                "@type": "Question",
                "name": q.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.a
                }
              }))
            )
          })
        }}
      />

      <ClientPortalBanner />
      <Footer />
    </div>
  )
}
