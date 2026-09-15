"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building, Target, FileUp, Check, ArrowRight, ArrowLeft, Loader2, UploadCloud, ShieldCheck } from "lucide-react";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    employees: "",
    contactName: "",
    email: "",
    mission: "",
    vision: "",
    objectives: "",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for now
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 2000);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col font-outfit selection:bg-[#22c55e]/30">
      <Navigation />

      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
              ESRE OS <span className="text-[#22c55e]">Diagnostic Intake</span>
            </h1>
            <p className="text-gray-400 font-sans">
              Initialize your Business Design parameters. Your dedicated systems architect will use this data to construct the L1 Kernel.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#22c55e] transition-all duration-500 -z-10" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            
            {[
              { num: 1, icon: Building, label: "Profile" },
              { num: 2, icon: Target, label: "Strategy" },
              { num: 3, icon: FileUp, label: "Uploads" },
              { num: 4, icon: Check, label: "Complete" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-3 bg-[#050505] px-4">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    step >= s.num 
                      ? "bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
                      : "bg-white/5 border-white/10 text-gray-500"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                </div>
                <span className={`text-xs uppercase tracking-widest font-mono ${step >= s.num ? "text-[#22c55e]" : "text-gray-600"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-light text-white mb-8 border-b border-white/5 pb-4">Enterprise Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-sans">Company Name</label>
                    <input 
                      type="text" 
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-sans">Industry</label>
                    <input 
                      type="text" 
                      value={formData.industry}
                      onChange={(e) => updateField('industry', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans"
                      placeholder="e.g. Financial Services"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-sans">Headcount</label>
                    <select 
                      value={formData.employees}
                      onChange={(e) => updateField('employees', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans appearance-none"
                    >
                      <option value="">Select size...</option>
                      <option value="1-50">1 - 50</option>
                      <option value="51-200">51 - 200</option>
                      <option value="201-1000">201 - 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-sans">Primary Contact Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans"
                      placeholder="executive@company.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-light text-white mb-8 border-b border-white/5 pb-4">Strategic Foundation</h2>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-sans">Mission Statement</label>
                  <textarea 
                    value={formData.mission}
                    onChange={(e) => updateField('mission', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans min-h-[100px]"
                    placeholder="What is the core purpose of the organization?"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-sans">Vision Statement</label>
                  <textarea 
                    value={formData.vision}
                    onChange={(e) => updateField('vision', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans min-h-[100px]"
                    placeholder="Where is the organization heading in the next 5-10 years?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-sans">Primary Business Objectives (1-3 Years)</label>
                  <textarea 
                    value={formData.objectives}
                    onChange={(e) => updateField('objectives', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 font-sans min-h-[100px]"
                    placeholder="List your top 3 strategic priorities..."
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-light text-white mb-2">Structural Uploads</h2>
                <p className="text-sm text-gray-400 font-sans mb-8 pb-4 border-b border-white/5">
                  Upload current documentation. This forms the baseline for our L1 & L2 structural audits.
                </p>

                <div className="space-y-4">
                  {[
                    "Current OKRs / KPIs (PDF or Excel)",
                    "Organizational Chart (PDF)",
                    "Core Process Maps / SOPs (Optional)",
                  ].map((docType, i) => (
                    <div key={i} className="border border-white/10 border-dashed rounded-xl p-6 bg-black/30 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#22c55e]/10 group-hover:text-[#22c55e] transition-colors">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">{docType}</div>
                          <div className="text-xs text-gray-500 font-sans mt-1">Click to browse or drag and drop</div>
                        </div>
                      </div>
                      <button className="text-[#22c55e] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Upload
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 mt-6 bg-[#22c55e]/5 border border-[#22c55e]/20 p-4 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-[#22c55e]" />
                  <p className="text-xs text-gray-400 font-sans">
                    All uploads are heavily encrypted and protected under our standard Mutual NDA.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-[#22c55e]" />
                </div>
                <h2 className="text-3xl font-light text-white mb-4">Diagnostic Initialized</h2>
                <p className="text-gray-400 font-sans max-w-md mx-auto mb-8">
                  Your structural parameters have been securely transmitted to the Crelligent Business Design team. We will analyze your baseline and reach out within 24 hours to schedule the L1 Kernel review.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
                >
                  Return to Dashboard
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    step === 1 ? "opacity-0 pointer-events-none" : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#22c55e] text-black hover:bg-[#22c55e]/90 rounded-lg font-medium text-sm transition-all"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-2.5 bg-[#22c55e] text-black hover:bg-[#22c55e]/90 rounded-lg font-medium text-sm transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</>
                    ) : (
                      <><ShieldCheck className="w-4 h-4" /> Submit Diagnostic</>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
