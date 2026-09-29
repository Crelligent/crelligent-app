"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Activity, ShieldAlert, CheckCircle, RefreshCcw, Layers } from 'lucide-react';

const questions = [
  {
    "layer": "Decision Rights",
    "question": "Who makes the final call on cross-functional initiatives?",
    "options": [
      {
        "text": "The founder/CEO has to step in every time.",
        "score": 0
      },
      {
        "text": "Committees that take weeks to align.",
        "score": 10
      },
      {
        "text": "Clear, documented decision owners at the edge.",
        "score": 20
      }
    ]
  },
  {
    "layer": "Workflow",
    "question": "How does work move between departments?",
    "options": [
      {
        "text": "Through endless Slack messages and meetings.",
        "score": 0
      },
      {
        "text": "Using project management tools, but with friction.",
        "score": 10
      },
      {
        "text": "Automated handoffs with clear SLAs.",
        "score": 20
      }
    ]
  },
  {
    "layer": "Accountability",
    "question": "How is performance measured against strategic goals?",
    "options": [
      {
        "text": "We don't have clear metrics for most teams.",
        "score": 0
      },
      {
        "text": "Annual reviews and lagging indicators.",
        "score": 10
      },
      {
        "text": "Real-time leading indicators tied to OKRs.",
        "score": 20
      }
    ]
  }
];

export default function OperatingModelClient() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [scores, setScores] = useState<number[]>(Array(3).fill(0));
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 20;

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
    if (totalScore < (maxScore * 0.4)) return {"title": "Structural Gridlock", "desc": "Your operating model is highly dependent on individual heroes. Decision-making is bottlenecked, and cross-functional work is painful.", "color": "text-red-400", "bg": "bg-red-400/10 border-red-400/20"};
    if (totalScore < (maxScore * 0.8)) return {"title": "Friction at Scale", "desc": "You have basic structures in place, but handoffs between departments are creating significant drag on your growth.", "color": "text-yellow-400", "bg": "bg-yellow-400/10 border-yellow-400/20"};
    return {"title": "High-Flow Architecture", "desc": "Your operating model is optimized. Decision rights are clear, handoffs are seamless, and accountability is tracked in real-time.", "color": "text-[#22c55e]", "bg": "bg-[#22c55e]/10 border-[#22c55e]/20"};
  };

  const diagnosis = getDiagnosis();

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#22c55e] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <span className="text-5xl font-light text-white">{Math.round((totalScore / maxScore) * 100)}</span>
          </div>
          <h1 className="text-3xl font-light text-white mb-2">Your Readiness Score</h1>
          <p className="text-gray-400">Based on the Crelligent Enterprise Capability Model</p>
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
            <Layers className="w-5 h-5 text-[#22c55e]" /> Assessment Breakdown
          </h3>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                <span className="text-gray-300">{q.layer}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${scores[i] === 20 ? 'bg-[#22c55e]' : scores[i] === 10 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                      style={{ width: `${((scores[i]) / 20) * 100}%` }}
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
            Schedule an Expert Diagnostic <ArrowRight className="w-5 h-5" />
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
        <h2 className="text-2xl font-light text-white mb-2">Analyzing Data...</h2>
        <p className="text-gray-400">Calculating your readiness score.</p>
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
          Operating Model Assessment
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Diagnose the flow of work, decision rights, and structural bottlenecks in your organization.
        </p>
        
        <button 
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Begin Assessment <ArrowRight className="w-5 h-5" />
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
          <span className="text-gray-500">Step {currentStep + 1} of {questions.length}</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#22c55e] transition-all duration-500"
            style={{ width: `${((currentStep) / questions.length) * 100}%` }}
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
