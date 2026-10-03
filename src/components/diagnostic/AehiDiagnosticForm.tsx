'use client';

import { useState } from 'react';
import { ArrowRight, ChevronRight, Activity, ArrowLeft } from 'lucide-react';
import { submitAehiScore } from '@/app/actions/aehi';

const QUESTIONS = [
  { layer: 'L1', title: 'Business Design', q: 'How is your core value proposition and pricing defined?', opts: [{ text: 'Changes frequently based on client demands or competitors.', pts: 0 }, { text: 'Standard offerings, but heavily discounted/customized by sales.', pts: 5 }, { text: 'Rigid, documented product matrix with strict pricing guardrails.', pts: 10 }] },
  { layer: 'L1', title: 'Business Design', q: 'If you stopped all outbound marketing today, what happens to revenue?', opts: [{ text: 'Drops immediately; we survive on hustle.', pts: 0 }, { text: 'Some recurring revenue, but growth stagnates quickly.', pts: 5 }, { text: 'Built-in retention and predictability ensures baseline stability.', pts: 10 }] },
  { layer: 'L1', title: 'Business Design', q: 'How does the executive team spend the majority of its week?', opts: [{ text: 'Fighting fires and resolving client emergencies.', pts: 0 }, { text: 'Mix of operations and planning; strategy gets delayed.', pts: 5 }, { text: 'Capital allocation, foresight, and system performance review.', pts: 10 }] },
  
  { layer: 'L2', title: 'Operating Model', q: 'What happens if your top operational leader is unreachable for 30 days?', opts: [{ text: 'Operations grind to a halt or suffer massive errors.', pts: 0 }, { text: 'Things slow down and balls drop, but we scrape by.', pts: 5 }, { text: 'System runs itself; team follows documented protocols.', pts: 10 }] },
  { layer: 'L2', title: 'Operating Model', q: 'How is daily work allocated and tracked?', opts: [{ text: 'Through emails, WhatsApp, and verbal instructions.', pts: 0 }, { text: 'PM tools used, but adoption is inconsistent and outdated.', pts: 5 }, { text: 'All work flows through a centralized system with SLAs.', pts: 10 }] },
  { layer: 'L2', title: 'Operating Model', q: 'When a critical error occurs, what is the default response?', opts: [{ text: 'Find the person responsible and discipline them.', pts: 0 }, { text: 'Send a memo asking the team to be more careful.', pts: 5 }, { text: 'Analyze the system failure and redesign the process.', pts: 10 }] },
  
  { layer: 'L3', title: 'Technology', q: 'How connected are your core software systems (CRM, ERP, Finance)?', opts: [{ text: 'Completely siloed; manual copy/pasting required.', pts: 0 }, { text: 'Partially integrated (Zapier/APIs), but manual reconciliation needed.', pts: 5 }, { text: 'Fully integrated; data flows seamlessly across architecture.', pts: 10 }] },
  { layer: 'L3', title: 'Technology', q: 'How does technology impact employee onboarding?', opts: [{ text: 'Takes weeks to grant access and teach messy systems.', pts: 0 }, { text: 'Takes a few days, but lots of undocumented quirks to learn.', pts: 5 }, { text: 'Automated provisioning; systems guide workflows by design.', pts: 10 }] },
  { layer: 'L3', title: 'Technology', q: 'Is your infrastructure ready to handle a 5x spike in volume tomorrow?', opts: [{ text: 'No, servers would crash or team would be buried.', pts: 0 }, { text: 'Could handle it, but requires emergency IT intervention.', pts: 5 }, { text: 'Yes, architecture is elastic; scales without headcount spikes.', pts: 10 }] },
  
  { layer: 'L4', title: 'Intelligence', q: 'How long does it take to get a 100% accurate view of financial health?', opts: [{ text: 'Weeks; waiting for end-of-month reconciliation.', pts: 0 }, { text: 'Days; dashboards exist but data is delayed/messy.', pts: 5 }, { text: 'Seconds; real-time telemetry provides a single source of truth.', pts: 10 }] },
  { layer: 'L4', title: 'Intelligence', q: 'How are strategic decisions made regarding new products/markets?', opts: [{ text: 'Gut feeling, founder intuition, or reacting to competitors.', pts: 0 }, { text: 'Looking at historical sales data and basic research.', pts: 5 }, { text: 'Predictive modeling, live telemetry, and economic value engineering.', pts: 10 }] },
  { layer: 'L4', title: 'Intelligence', q: 'Can you instantly identify the exact step causing an operational delay today?', opts: [{ text: 'No, only find out when a client complains.', pts: 0 }, { text: 'Yes, but requires a manager to manually investigate.', pts: 5 }, { text: 'Yes, the sensing layer alerts us to bottlenecks before impact.', pts: 10 }] },
  
  { layer: 'L5', title: 'Governance', q: 'How are financial approvals and access controls managed?', opts: [{ text: 'Founder/CEO personally approves almost everything.', pts: 0 }, { text: 'Written policies exist, but exceptions are frequently made.', pts: 5 }, { text: 'Strict, role-based controls are hardcoded into software.', pts: 10 }] },
  { layer: 'L5', title: 'Governance', q: 'What happens when your business experiences a severe macro shock?', opts: [{ text: 'Panic; operations halt while scrambling for a plan.', pts: 0 }, { text: 'Take a hit, convene an emergency team, adapt over months.', pts: 5 }, { text: 'Execute pre-planned contingency protocols; absorb the shock.', pts: 10 }] },
  { layer: 'L5', title: 'Governance', q: 'How do you ensure compliance with regulations and standards?', opts: [{ text: 'Rely on team memory and hope we pass audits.', pts: 0 }, { text: 'Periodic manual audits and training refreshers.', pts: 5 }, { text: 'Compliance is engineered in; system physically prevents violations.', pts: 10 }] },
];

export default function AehiDiagnosticForm() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'lead' | 'results'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(0));
  
  // Lead form state
  const [formData, setFormData] = useState({ email: '', company: '', country: 'Nigeria', industry: 'Financial Services' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Results calculation
  const getScores = () => {
    let l1 = answers[0] + answers[1] + answers[2];
    let l2 = answers[3] + answers[4] + answers[5];
    let l3 = answers[6] + answers[7] + answers[8];
    let l4 = answers[9] + answers[10] + answers[11];
    let l5 = answers[12] + answers[13] + answers[14];
    
    // Total raw is out of 150. Scale to 100.
    const rawTotal = l1 + l2 + l3 + l4 + l5;
    const finalScore = Math.round((rawTotal / 150) * 100);
    
    return { l1, l2, l3, l4, l5, total: finalScore };
  };

  const handleSelect = (points: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = points;
    setAnswers(newAnswers);
    
    if (currentQ < 14) {
      setCurrentQ(prev => prev + 1);
    } else {
      setStep('lead');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const scores = getScores();

    const res = await submitAehiScore({
      email: formData.email,
      company_name: formData.company,
      country: formData.country,
      industry: formData.industry,
      total_score: scores.total,
      l1_score: scores.l1,
      l2_score: scores.l2,
      l3_score: scores.l3,
      l4_score: scores.l4,
      l5_score: scores.l5,
    });

    setIsSubmitting(false);

    if (res.success) {
      setStep('results');
    } else {
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[500px] flex flex-col justify-center">
      
      {/* INTRO */}
      {step === 'intro' && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14 text-center shadow-2xl backdrop-blur-xl">
          <Activity className="w-12 h-12 text-[#ec4899] mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-[300] text-white tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            The AEHI Diagnostic
          </h2>
          <p className="text-gray-400 font-[200] leading-relaxed mb-8 max-w-lg mx-auto">
            Evaluate your enterprise across the 5 layers of the ESRE OS framework. 15 questions. 3 minutes. Discover exactly where your operations are vulnerable.
          </p>
          <button 
            onClick={() => setStep('quiz')}
            className="px-8 py-4 bg-white text-black rounded-full font-[500] uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors inline-flex items-center gap-3"
          >
            Start Diagnostic <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* QUIZ */}
      {step === 'quiz' && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-[11px] font-[400] uppercase tracking-widest text-[#3b82f6] border border-[#3b82f6]/20 rounded-full px-3 py-1 bg-[#3b82f6]/10 mr-3">
                {QUESTIONS[currentQ].layer}
              </span>
              <span className="text-sm text-gray-400 uppercase tracking-widest">{QUESTIONS[currentQ].title}</span>
            </div>
            <div className="text-gray-500 text-sm font-mono">{currentQ + 1} / 15</div>
          </div>
          
          <div className="w-full h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] transition-all duration-300" style={{ width: `${((currentQ) / 15) * 100}%` }} />
          </div>

          <h3 className="text-2xl font-[300] text-white mb-8 leading-snug" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {QUESTIONS[currentQ].q}
          </h3>

          <div className="space-y-4">
            {QUESTIONS[currentQ].opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt.pts)}
                className="w-full text-left p-5 rounded-2xl border border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/20 transition-all text-gray-300 font-[300] flex items-start gap-4 group"
              >
                <div className="w-6 h-6 rounded-full border border-white/20 flex-shrink-0 flex items-center justify-center mt-0.5 group-hover:border-[#ec4899]">
                  <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#ec4899] transition-colors" />
                </div>
                {opt.text}
              </button>
            ))}
          </div>
          
          {currentQ > 0 && (
             <button onClick={() => setCurrentQ(prev => prev - 1)} className="mt-8 text-gray-500 hover:text-white text-sm flex items-center gap-2 transition-colors">
               <ArrowLeft className="w-4 h-4" /> Previous Question
             </button>
          )}
        </div>
      )}

      {/* LEAD CAPTURE */}
      {step === 'lead' && (
        <div className="bg-gradient-to-br from-[#0a101a] to-[#050505] border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ec4899]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl font-[300] text-white tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Diagnostic Complete
          </h2>
          <p className="text-gray-400 font-[200] leading-relaxed mb-8">
            Your ESRE OS Performance Score has been calculated. Where should we send your results and benchmark comparison?
          </p>

          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Company Name</label>
                <input 
                  required type="text" 
                  value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ec4899]/50 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Work Email</label>
                <input 
                  required type="email" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ec4899]/50 transition-colors" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Country</label>
                <select 
                  value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ec4899]/50 transition-colors appearance-none"
                >
                  <option>Nigeria</option>
                  <option>South Africa</option>
                  <option>Kenya</option>
                  <option>Ghana</option>
                  <option>Egypt</option>
                  <option>Rwanda</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Industry</label>
                <select 
                  value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ec4899]/50 transition-colors appearance-none"
                >
                  <option>Financial Services</option>
                  <option>Logistics & Supply Chain</option>
                  <option>Energy & Utilities</option>
                  <option>Manufacturing</option>
                  <option>Retail & FMCG</option>
                  <option>Technology / SaaS</option>
                  <option>Healthcare</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            
            <button 
              disabled={isSubmitting}
              className="w-full mt-4 px-8 py-4 bg-[#ec4899] text-white rounded-xl font-[500] uppercase tracking-widest text-sm hover:bg-[#d9468c] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Calculating...' : 'Reveal My Score'}
            </button>
          </form>
        </div>
      )}

      {/* RESULTS */}
      {step === 'results' && (
        <div className="bg-[#0a101a] border border-[#3b82f6]/30 rounded-3xl p-10 md:p-14 shadow-2xl backdrop-blur-xl text-center">
          <p className="text-[#3b82f6] text-sm uppercase tracking-widest font-[500] mb-4">ESRE OS Performance Score</p>
          <div className="text-7xl font-[200] text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {getScores().total}<span className="text-3xl text-gray-500">/100</span>
          </div>
          
          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="text-left space-y-6">
            <h4 className="text-white font-[400] text-lg">Layer Breakdown</h4>
            {[
              { label: 'L1 · Business Design', score: getScores().l1, max: 30 },
              { label: 'L2 · Operating Model', score: getScores().l2, max: 30 },
              { label: 'L3 · Technology', score: getScores().l3, max: 30 },
              { label: 'L4 · Intelligence', score: getScores().l4, max: 30 },
              { label: 'L5 · Governance', score: getScores().l5, max: 30 },
            ].map((layer, i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="text-gray-400 tracking-wide">{layer.label}</span>
                   <span className="text-white">{layer.score}/30</span>
                 </div>
                 <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                   <div 
                     className={`h-full rounded-full ${layer.score <= 10 ? 'bg-red-500' : layer.score <= 20 ? 'bg-amber-400' : 'bg-green-500'}`} 
                     style={{ width: `${(layer.score / layer.max) * 100}%` }} 
                   />
                 </div>
               </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-2xl text-left">
            <h5 className="text-white font-[500] mb-2">Next Steps</h5>
            <p className="text-gray-400 font-[200] text-sm leading-relaxed mb-4">
              Your results have been sent to your email. A systems architect from Crelligent will review your lowest performing layers and reach out with a blueprint for restructuring.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
