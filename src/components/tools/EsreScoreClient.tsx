"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Activity, ShieldAlert, CheckCircle, RefreshCcw, Layers } from 'lucide-react';

const questions = [
  {
    layer: "L1: Business Design",
    question: "How is your core strategic intent communicated and executed?",
    options: [
      { text: "It lives in the founder's head and changes frequently.", score: 0 },
      { text: "We have an annual strategy, but execution is disconnected.", score: 10 },
      { text: "Strategy is embedded into OKRs and strictly tracked across all teams.", score: 20 },
    ]
  },
  {
    layer: "L2: Operating Model (The Scheduler)",
    question: "What happens when a critical process requires cross-functional collaboration?",
    options: [
      { text: "It requires endless meetings and usually escalates to leadership.", score: 0 },
      { text: "Teams figure it out, but handoffs are messy and undocumented.", score: 10 },
      { text: "We have a defined scheduler that automatically routes cross-functional workflows.", score: 20 },
    ]
  },
  {
    layer: "L3: Technology & Infrastructure",
    question: "How would you describe your current software stack?",
    options: [
      { text: "A fragmented mess of spreadsheets, legacy tools, and manual entry.", score: 0 },
      { text: "We use modern SaaS tools, but they don't integrate well together.", score: 10 },
      { text: "A unified enterprise architecture with seamless API data flow.", score: 20 },
    ]
  },
  {
    layer: "L4: Data & Intelligence (The Sensor)",
    question: "How long does it take leadership to get an accurate view of enterprise health?",
    options: [
      { text: "Weeks. We rely on manual reporting at the end of the month.", score: 0 },
      { text: "A few days. We have dashboards, but data still needs cleaning.", score: 10 },
      { text: "Real-time. Our sensing layer provides immediate operational intelligence.", score: 20 },
    ]
  },
  {
    layer: "L5: Governance & Security",
    question: "How is operational risk and decision-making handled?",
    options: [
      { text: "Reactive firefighting. No clear decision rights.", score: 0 },
      { text: "We have policies, but enforcement is manual and inconsistent.", score: 10 },
      { text: "Automated governance frameworks with strict access controls and audit logs.", score: 20 },
    ]
  }
];

export default function EsreScoreClient() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 is intro
  const [scores, setScores] = useState<number[]>(Array(5).fill(0));
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const totalScore = scores.reduce((a, b) => a + b, 0);

  const handleStart = () => setCurrentStep(0);

  const handleOptionSelect = (score: number) => {
    const newScores = [...scores];
    newScores[currentStep] = score;
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const getDiagnosis = () => {
    if (totalScore < 40) return {
      title: "Critical Structural Fragility",
      color: "text-red-400",
      bg: "bg-red-400/10 border-red-400/20",
      desc: "Your enterprise is entirely dependent on manual intervention and founder heroism. Scaling in this state will multiply chaos and drive up operational costs."
    };
    if (totalScore < 80) return {
      title: "Fragmented Operations",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/20",
      desc: "You have pieces of an operating system, but they are disconnected. You likely suffer from data silos, messy handoffs, and technology debt."
    };
    return {
      title: "Optimized Enterprise System",
      color: "text-[#22c55e]",
      bg: "bg-[#22c55e]/10 border-[#22c55e]/20",
      desc: "Your enterprise is structurally sound and ready for exponential scale. Your 5 layers are integrated, providing real-time intelligence and automated flow."
    };
  };

  const diagnosis = getDiagnosis();

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#22c55e] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <span className="text-5xl font-light text-white">{totalScore}</span>
          </div>
          <h1 className="text-3xl font-light text-white mb-2">Your ESRE OS Score</h1>
          <p className="text-gray-400">Based on the Crelligent 5-Layer Enterprise Capability Model</p>
        </div>

        <div className={`p-8 rounded-xl border mb-8 ${diagnosis.bg}`}>
          <div className="flex items-center gap-3 mb-4">
            <Activity className={`w-6 h-6 ${diagnosis.color}`} />
            <h2 className={`text-2xl font-medium ${diagnosis.color}`}>{diagnosis.title}</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{diagnosis.desc}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#22c55e]" /> Layer Breakdown
          </h3>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                <span className="text-gray-300">{q.layer}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${scores[i] === 20 ? 'bg-[#22c55e]' : scores[i] === 10 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                      style={{ width: `${(scores[i] / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-mono w-8 text-right">{scores[i]}/20</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-black font-medium rounded-lg hover:bg-[#22c55e]/90 transition">
            Schedule an L1 Kernel Diagnostic <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-500">Free 45-minute structural review with a Crelligent Systems Architect.</p>
        </div>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className="max-w-2xl mx-auto px-6 text-center py-20">
        <RefreshCcw className="w-12 h-12 text-[#22c55e] animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-light text-white mb-2">Analyzing Enterprise Structure...</h2>
        <p className="text-gray-400">Calculating your ESRE OS Score against industry benchmarks.</p>
      </div>
    );
  }

  if (currentStep === -1) {
    return (
      <div className="max-w-3xl mx-auto px-6 text-center pt-10">
        <div className="w-16 h-16 bg-[#22c55e]/10 text-[#22c55e] rounded-2xl flex items-center justify-center mx-auto mb-8 border border-[#22c55e]/20">
          <Activity className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
          Enterprise <span className="text-[#22c55e]">Health Assessment</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ESRE OS Score measures the structural integrity of your enterprise across Strategy, Operations, Technology, Data, and Governance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <ShieldAlert className="w-6 h-6 text-red-400 mb-4" />
            <h3 className="text-white font-medium mb-2">Identify Fragility</h3>
            <p className="text-gray-400 text-sm">Locate the exact layer causing operational drag and inefficiency.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <Layers className="w-6 h-6 text-blue-400 mb-4" />
            <h3 className="text-white font-medium mb-2">5-Layer Analysis</h3>
            <p className="text-gray-400 text-sm">Evaluate your operating model against the proprietary ESRE OS framework.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <CheckCircle className="w-6 h-6 text-[#22c55e] mb-4" />
            <h3 className="text-white font-medium mb-2">Get Your Score</h3>
            <p className="text-gray-400 text-sm">Receive a definitive 0-100 score on your enterprise readiness to scale.</p>
          </div>
        </div>

        <button 
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Begin Diagnostic <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-6">
      <div className="mb-12">
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-[#22c55e] font-mono tracking-wider">{q.layer}</span>
          <span className="text-gray-500">Step {currentStep + 1} of 5</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#22c55e] transition-all duration-500"
            style={{ width: `${((currentStep) / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-right-8 duration-500">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-8 leading-tight">
          {q.question}
        </h2>

        <div className="space-y-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(opt.score)}
              className="w-full text-left p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-[#22c55e]/50 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-300 group-hover:text-white transition">{opt.text}</span>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#22c55e] transition transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentStep > 0 && (
        <button 
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-8 text-gray-500 hover:text-white text-sm flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Question
        </button>
      )}
    </div>
  );
}
