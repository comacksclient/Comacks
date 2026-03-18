"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { calculateDiagnosis, COUNTRY_CONFIGS, DiagnosisInput, GLOBAL_TARGETS } from "@/lib/diagnosisEngine";
import { Lock, FileText, ArrowRight, X, Calendar, PhoneMissed, Share2, Terminal, Activity, AlertTriangle, ShieldCheck, Cpu, Zap, MoveDown, MoveUp, ScanLine, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ResultDashboard() {
  const router = useRouter();
  const [inputData, setInputData] = useState<DiagnosisInput | null>(null);
  const [result, setResult] = useState<any>(null);
  const [reportId, setReportId] = useState<string>(`SYS-${Math.floor(Math.random() * 1000000)}`);
  const [dbInputId, setDbInputId] = useState<string | null>(null);
  const saveAttempted = useRef(false);

  // Lead form state
  const [form, setForm] = useState({ name: '', phone: '', clinic_name: '', city: '', email: '' });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem('comacks_diagnosis_data');
    if (!raw) {
      router.push('/diagnosis');
      return;
    }
    try {
      const data: DiagnosisInput = JSON.parse(raw);
      setInputData(data);
      setResult(calculateDiagnosis(data));
    } catch (e) {
      router.push('/diagnosis');
    }
  }, [router]);

  useEffect(() => {
    if (inputData && !saveAttempted.current) {
      saveAttempted.current = true;

      // Check if there's already a saved session for this diagnosis run
      const cachedInputId = localStorage.getItem('comacks_input_id');
      const cachedUnlocked = localStorage.getItem('comacks_unlocked') === 'true';

      if (cachedInputId) {
        setDbInputId(cachedInputId);
        setReportId(`SYS-${cachedInputId.split('-')[0].toUpperCase()}`);
        if (cachedUnlocked) setIsUnlocked(true);
        return;
      }

      fetch('/api/diagnosis/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputData })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.inputId) {
            setDbInputId(data.inputId);
            setReportId(`SYS-${data.inputId.split('-')[0].toUpperCase()}`);
            localStorage.setItem('comacks_input_id', data.inputId);
          }
        })
        .catch(err => console.error("Auto-save failed:", err));
    }
  }, [inputData]);

  if (!inputData || !result) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-mono gap-4 selection:bg-red-900/30">
        <Activity className="w-8 h-8 text-red-500 animate-pulse" />
        <span className="text-sm tracking-widest uppercase text-zinc-500">Generating Practice Report...</span>
      </div>
    );
  }

  const { currency } = result.config;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    const countryKey = inputData.country.toLowerCase();
    const phoneDigits = form.phone.replace(/\D/g, ''); // Strip non-numeric characters

    // Country-specific validations
    if (countryKey === 'india' && phoneDigits.length !== 10) {
      setPhoneError("Please enter a valid 10-digit Indian phone number.");
      return;
    } else if (countryKey === 'uk' && (phoneDigits.length < 10 || phoneDigits.length > 11)) {
      setPhoneError("Please enter a valid UK phone number.");
      return;
    } else if (phoneDigits.length < 7) {
      setPhoneError(`Please enter a valid phone number for ${inputData.country}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/diagnosis/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputData, user: form, existingInputId: dbInputId })
      });
      const data = await res.json();
      if (data.success) {
        setIsUnlocked(true);
        const realId = dbInputId || reportId;
        setReportId(`SYS-${realId.split('-')[0].toUpperCase()}`);
        // Persist unlock state so refresh doesn't re-ask for details
        localStorage.setItem('comacks_unlocked', 'true');
        if (dbInputId) localStorage.setItem('comacks_input_id', dbInputId);
        setShowUnlockModal(false);
        // Navigate using real DB UUID so the report page can find the record
        router.push(`/report?id=${dbInputId}`);
      }
    } catch (error) {
      console.error(error);
      // Fallback for UI demonstration if API fails
      setTimeout(() => {
        setIsUnlocked(true);
        setShowUnlockModal(false);
        router.push(`/report?id=${dbInputId || reportId}`);
      }, 1000);
    }
    setIsSubmitting(false);
  };

  const scoreColor = result.score > 80 ? 'text-white' : result.score > 50 ? 'text-zinc-300' : 'text-red-500';
  const scoreRing = result.score > 80 ? 'border-white/20' : result.score > 50 ? 'border-zinc-700' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]';

  return (
    <div className="relative min-h-screen bg-[#050505] pt-24 pb-24 text-white font-sans overflow-hidden selection:bg-red-900/30">


      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-8 relative z-10">


        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          {/* Left Side: Title */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">
                Practice Audit Complete
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-medium tracking-tighter">
              Clinic <span className="text-zinc-600">Analysis.</span>
            </h1>
          </div>

          {/* Right Side (Desktop) / Bottom Left (Mobile): Controls */}
          {/* Changed to items-start on mobile so the button aligns left, items-end on desktop */}
          <div className="flex flex-col items-start md:items-end gap-4 mt-2 md:mt-0">

            <div className="text-left md:text-right flex flex-col items-start md:items-end">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Report ID</div>
              <div className="font-mono text-zinc-300 bg-white/5 px-3 py-1 rounded-md border border-white/10">{reportId}</div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* NEW: Schedule Call Button with Live Indicator */}
              <button
                onClick={() => window.open('https://calendly.com/03arpit04', '_blank')}
                className="group relative px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase font-bold text-white overflow-hidden shadow-[0_5px_15px_rgba(239,68,68,0.3)]"
              >
                {/* Hover Shimmer Sweep */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-12 pointer-events-none"></div>

                <Calendar className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-white transition-colors" />
                <span className="relative z-10">Schedule Call</span>

                {/* Live Status Dot */}
                <div className="relative z-10 flex items-center gap-1.5 ml-1 pl-2 border-l border-white/20 transition-colors">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                </div>
              </button>

              {/* ORIGINAL: PDF Download Button */}
              <button
                onClick={() => isUnlocked ? window.open(`/report?id=${dbInputId || reportId}`, '_blank') : setShowUnlockModal(true)}
                className="px-4 py-2 rounded-lg bg-[#111] border border-white/10 hover:bg-white/5 text-white text-[10px] tracking-widest uppercase font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                <FileText className="w-3.5 h-3.5" />
                {isUnlocked ? "View Full Report" : "Download Full Report"}
              </button>
            </div>

          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">


          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-12 bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center text-center">

            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Practice Performance Score
            </h2>

            <div className={`text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter ${scoreColor} mb-2`}>
              {result.score}
            </div>

            <div className="text-xl font-mono text-zinc-600 mb-8 border-b border-white/10 pb-8 w-full max-w-sm">/ 100</div>

            <p className="text-lg md:text-xl text-zinc-300 font-light max-w-2xl text-balance mb-12">
              {result.scoreText}
            </p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-xl mx-auto mb-10 mt-6 relative group">
              {/* Subtle Red Glow Behind the Banner */}
              <div className="absolute -inset-1 bg-red-500/10 blur-xl rounded-2xl group-hover:bg-red-500/20 transition-all duration-500 -z-10"></div>

              <div className="bg-[#110505] border border-red-500/30 p-6 rounded-2xl relative flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden text-left shadow-[0_0_40px_rgba(239,68,68,0.05)]">
                {/* Decorative Inner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] mix-blend-screen pointer-events-none"></div>

                <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 shadow-inner">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-[10px] text-red-400 uppercase tracking-[0.15em] font-bold mb-1">Monthly Revenue Leak</div>
                    <div className="text-xs text-red-500/60 font-medium">Potential revenue lost in patient flow</div>
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-mono font-medium text-red-500 tracking-tight relative z-10">
                  {currency}{Math.round(result.revenue.monthlyLoss).toLocaleString()}
                </div>
              </div>
            </motion.div>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center items-center gap-4 w-full">
              <p className="text-xs text-zinc-500 italic text-balance w-full mb-2">
                Share your score and see how your clinic compares with others.
              </p>
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/report?id=${dbInputId || reportId}`;
                  navigator.clipboard.writeText(shareUrl).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[10px] uppercase tracking-widest font-bold text-zinc-300"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/report?id=${dbInputId || reportId}`;
                  const formattedLoss = currency === '₹'
                    ? `${currency}${(result.revenue.monthlyLoss / 100000).toFixed(1)}L`
                    : `${currency}${Math.round(result.revenue.monthlyLoss).toLocaleString()}`;

                  const text = `I just ran a clinic growth diagnosis for my clinic with Comacks and scored ${result.score}/100! \n\nIt also showed we may be losing around ${formattedLoss}/month in the patient flow.\n\nYou can test your clinic here:\nhttps://comacks.com/diagnosis\n\nCurious what your clinic score would be.`;

                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors text-[10px] uppercase tracking-widest font-bold text-[#25D366]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Share via WhatsApp
              </button>
            </div>

          </motion.div>
        </div>

        {/* --- PATIENT FLOW BREAKDOWN --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Inquiry → Consultation", rate: result.rates.consultRate, status: result.severities.consult },
            { label: "Consultation → Treatment", rate: result.rates.treatmentRate, status: result.severities.treatment },
            { label: "Treatment Completion", rate: result.rates.completionRate, status: result.severities.completion },
            { label: "Patient Recall", rate: result.rates.recallRate, status: result.severities.recall },
          ].map((metric, idx) => {
            const isCritical = metric.status === "Critical";
            const isModerate = metric.status === "Moderate";

            const statusColor = isCritical ? 'text-red-500 border-red-500/30 bg-red-500/10' :
              isModerate ? 'text-amber-500 border-amber-500/30 bg-amber-500/10' :
                'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';

            return (
              <div key={idx} className="bg-[#080808]/80 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 leading-relaxed mb-4">{metric.label}</h3>

                <div className="flex items-end justify-between mt-auto">
                  <span className={`text-4xl font-mono font-medium ${isCritical ? 'text-red-500' : 'text-white'}`}>
                    {Math.round(metric.rate * 100)}%
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${statusColor}`}>
                    {metric.status}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* --- COMPARATIVE BENCHMARK TABLE --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <ScanLine className="w-4 h-4" /> Success Benchmarks
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                  <th className="p-4 border-b border-white/10 font-medium">Metric</th>
                  <th className="p-4 border-b border-white/10 font-medium">Your Clinic</th>
                  <th className="p-4 border-b border-white/10 font-medium">Top Clinics</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: "Inquiry → Consultation", actual: result.rates.consultRate, target: GLOBAL_TARGETS.consultTarget.label },
                  { name: "Consultation → Treatment", actual: result.rates.treatmentRate, target: GLOBAL_TARGETS.treatmentTarget.label },
                  { name: "Completion Rate", actual: result.rates.completionRate, target: GLOBAL_TARGETS.completionTarget.label },
                  { name: "Recall Rate", actual: result.rates.recallRate, target: GLOBAL_TARGETS.recallTarget.label },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-zinc-300 font-medium">{row.name}</td>
                    <td className="p-4 font-mono text-white">{Math.round(row.actual * 100)}%</td>
                    <td className="p-4 font-mono text-zinc-500">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* --- REVENUE LEAK DETECTION --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" /> Growth Gap Analysis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "New Patient Loss", val: result.leaks.leadLeak, reason: "inquiries lost before booking consultations" },
              { title: "Consultation Gaps", val: result.leaks.conversionLeak, reason: "consultations not moving forward to treatment" },
              { title: "Incomplete Treatment", val: result.leaks.completionLeak, reason: "patients starting but not completing active care" },
              {
                title: "Inactive Patients (Annual)",
                val: result.leaks.recallLeak,
                reason: "past patients who haven't returned this year",
                isEstimated: true
              },
            ].map((l, idx) => {
              const isLeak = l.val > 0;
              return (
                <div key={idx} className={`p-6 rounded-2xl bg-[#110505] border border-red-500/20 relative overflow-hidden group hover:border-red-500/50 transition-colors`}>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><AlertTriangle className="w-16 h-16 text-red-500" /></div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-6">{l.title}</h3>

                  <div className="relative z-10">
                    <div className="text-4xl font-mono font-medium text-red-500 mb-2">{l.val}</div>
                    <div className="text-[10px] text-zinc-400 leading-relaxed uppercase tracking-widest">{l.reason}</div>
                    {"isEstimated" in l && (
                      <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-zinc-500 italic leading-snug">
                        *Projected value based on current clinical throughput volume.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* --- REVENUE RECOVERY POTENTIAL --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#050505] border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl relative overflow-hidden mt-8">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen opacity-50 pointer-events-none" />

          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-12 relative z-10 flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" /> Growth Opportunity
          </h2>

          <div className="space-y-8 relative z-10">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0A0A0A] border border-white/5 p-4 sm:p-6 rounded-xl">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Monthly Growth Potential</div>
                <div className="text-xl xs:text-2xl lg:text-3xl font-mono text-emerald-400 break-words">
                  {result.revenue.recoveryMin === 0 ? (
                    `Up to ${currency}${Math.round(result.revenue.recoveryMax).toLocaleString()}`
                  ) : (
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span>{currency}{Math.round(result.revenue.recoveryMin).toLocaleString()}</span>
                      <span className="text-zinc-600 font-sans text-xs">to</span>
                      <span>{currency}{Math.round(result.revenue.recoveryMax).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 p-4 sm:p-6 rounded-xl">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Annual Growth Potential</div>
                <div className="text-xl xs:text-2xl lg:text-3xl font-mono text-emerald-400 break-words">
                  {result.revenue.recoveryMin === 0 ? (
                    `Up to ${currency}${Math.round(result.revenue.recoveryMax * 12).toLocaleString()}`
                  ) : (
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span>{currency}{Math.round(result.revenue.recoveryMin * 12).toLocaleString()}</span>
                      <span className="text-zinc-600 font-sans text-xs">to</span>
                      <span>{currency}{Math.round(result.revenue.recoveryMax * 12).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* --- ACTION BUTTONS --- */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center p-8 md:p-12 border border-white/10 rounded-3xl bg-[#080808]/90 backdrop-blur-xl mt-12 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_50%)]" />


          <p className="text-md text-zinc-300 font-light mb-8 max-w-xl mx-auto relative z-10 text-balance">
            Your growth roadmap is ready. The next step is a simple strategy call with our growth team.
            <span className="block text-xs mt-2 text-green-500 font-medium tracking-wide">Download your Full Complete 6-page growth Report Below.</span>
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full relative z-10 flex-wrap">
            <button
              onClick={() => window.open('https://calendly.com/03arpit04', '_blank')}
              className="group relative w-full md:w-auto h-14 px-8 rounded-xl bg-red-600 border border-red-500 hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-3 text-xs tracking-[0.1em] uppercase font-bold text-white shadow-[0_5px_20px_rgba(239,68,68,0.3)] overflow-hidden z-10"
            >

              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-12 pointer-events-none"></div>

              {/* Calendar Icon */}
              <Calendar className="w-4 h-4 text-white/80 group-hover:text-white transition-colors relative z-10" />

              {/* Main Text */}
              <span className="relative z-10">Schedule a Call</span>

              {/* Live Availability Indicator (Psychological Trigger) */}
              <div className="relative z-10 flex items-center gap-1.5 ml-1 pl-4 border-l border-white/20 transition-colors">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                <span className="text-[9px] font-mono text-white/80 group-hover:text-emerald-300 transition-colors">Online</span>
              </div>
            </button>

            <button onClick={() => isUnlocked ? window.open(`/report?id=${dbInputId || reportId}`, '_blank') : setShowUnlockModal(true)} className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#111] border border-white/10 text-white text-xs tracking-[0.1em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-colors relative z-10">
              <FileText className="w-4 h-4" /> {isUnlocked ? "View Full Report" : "Download Full Report"}
            </button>
            <Link href="/contact" className="w-full md:w-auto relative z-10">
              <button className="w-full px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs tracking-[0.1em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                <PhoneMissed className="w-4 h-4" /> Contact
              </button>
            </Link>
            <button
              onClick={() => {
                const shareUrl = `${window.location.origin}/report?id=${dbInputId || reportId}`;
                const formattedLoss = currency === '₹'
                  ? `${currency}${(result.revenue.monthlyLoss / 100000).toFixed(1)}L`
                  : `${currency}${Math.round(result.revenue.monthlyLoss).toLocaleString()}`;

                const text = `I just ran a clinic growth diagnosis for my clinic with Comacks and scored ${result.score}/100! \n\nIt also showed we may be losing around ${formattedLoss}/month in the patient flow.\n\nYou can test your clinic here:\nhttps://comacks.com/diagnosis\n\nCurious what your clinic score would be.`;

                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs tracking-[0.1em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-[#25D366]/20 transition-colors relative z-10"
            >
              <MessageCircle className="w-4 h-4" />
              Share via WhatsApp
            </button>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
          Contact: <a href="mailto:arpit@comacks.com" className="text-zinc-400 hover:text-red-500 transition-colors">arpit@comacks.com</a>
        </div>

      </div>

      {/* --- UNLOCK MODAL --- */}
      {showUnlockModal && !isUnlocked && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowUnlockModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-red-500/30 p-8 md:p-10 rounded-2xl relative w-full max-w-2xl shadow-[0_0_50px_rgba(239,68,68,0.1)] z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10">
              <Lock className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">Secure </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tighter">Access Full Growth Report.</h2>
            <p className="text-zinc-400 mb-8 text-sm leading-relaxed font-light">
              The Comacks system has designed a 6-page growth plan for your clinic. Enter your details below to access the full PDF report.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Clinic Name</label>
                  <input required type="text" value={form.clinic_name} onChange={(e) => setForm({ ...form, clinic_name: e.target.value })} className="w-full bg-[#111] border border-white/5 hover:border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500/50 transition-all font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                  <input required type="tel" value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setPhoneError(""); }} className={`w-full bg-[#111] border ${phoneError ? 'border-red-500' : 'border-white/5 hover:border-white/10'} rounded-lg px-4 py-3 text-white outline-none focus:border-red-500/50 transition-all font-mono text-sm`} />
                  {phoneError && <div className="text-red-500 text-xs mt-1.5">{phoneError}</div>}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Email Address (Optional)</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-[#111] border border-white/5 hover:border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500/50 transition-all font-mono text-sm" />
              </div>

              <button disabled={isSubmitting} type="submit" className="w-full mt-4 group relative h-12 rounded-lg bg-white text-black hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase font-bold disabled:opacity-50 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <span className="z-10 relative">{isSubmitting ? "Generating..." : "Unlock PDF"}</span>
                {!isSubmitting && <FileText className="w-4 h-4 z-10 relative" />}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-0"></div>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}