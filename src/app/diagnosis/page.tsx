"use client";

import { useState, } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { calculateDiagnosis, COUNTRY_CONFIGS, DiagnosisInput, GLOBAL_TARGETS } from "@/lib/diagnosisEngine";
import { Terminal, ArrowRight, DollarSign, Target, Activity, ScanLine, AlertTriangle, Cpu, BarChart2, ShieldCheck, Repeat, Pointer, EqualApproximatelyIcon } from "lucide-react";

export default function DiagnosisPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<DiagnosisInput>({
    country: "India", // Default
    monthlyInquiries: 100,
    monthlyConsultations: 50,
    treatmentsStarted: 35,
    treatmentsCompleted: 33,
    averageCaseValue: undefined,
    patientsLastYear: 0,
    patientsReturned: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "country" ? value : Number(value) || 0,
    }));
  };

  const currentResult = calculateDiagnosis(formData);
  const currency = currentResult.config.currency;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { ...formData };
    localStorage.setItem('comacks_diagnosis_data', JSON.stringify(payload));

    // Simulate system processing time for UX
    setTimeout(() => {
      router.push('/diagnosis/result');
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] pt-24 pb-12 overflow-hidden font-sans selection:bg-red-900/30">

      {/* --- BACKGROUND SYSTEM LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">

        {/* --- HEADER --- */}
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <ScanLine className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                Live Audit Engine
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tighter">
              <span> Clinic  Diagnosis.</span>
            </h1>
            <p className="text-zinc-300 mt-3 max-w-xl font-light">Input your monthly metrics below. The <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks system will map your patient flow and identify immediate revenue leaks in real-time.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* --- LEFT: DATA INPUT TERMINAL --- */}
          <div className="lg:col-span-5 bg-[#080808]/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">

            {/* Background pattern */}
            <div className="absolute top-6 right-6 text-white/5 pointer-events-none"><Cpu className="w-20 h-20" /></div>

            {/* Dynamic visual flair */}
            <div className="absolute bottom-[-10px] left-[-10px] w-20 h-20 rounded-full bg-red-900/10 blur-[50px] opacity-30 pointer-events-none" />

            <h2 className="text-sm font-bold text-zinc-300 mb-8 uppercase tracking-widest flex items-center gap-2 relative z-10">
              <Terminal className="w-4 h-4 text-zinc-500" />
              Clinic Performance Check
            </h2>

            {/* FIX: Removed h-full and flex column from form, letting it flow naturally */}
            <form onSubmit={handleSubmit} className="relative z-10">

              {/* Core Funnel Inputs */}
              <div className="flex flex-col gap-5">

                {/* Currency */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Currency</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-white/5 hover:border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500/50 focus:bg-[#151515] transition-all font-mono text-sm"
                  >
                    {Object.values(COUNTRY_CONFIGS).map(c => (
                      <option key={c.country} value={c.country}>{c.country}</option>
                    ))}
                  </select>
                </div>

                <InputField label="Average Patient Enquiries (Per Month)" name="monthlyInquiries" value={formData.monthlyInquiries} onChange={handleInputChange} />
                <InputField label="Average Consultations (Per Month)" name="monthlyConsultations" value={formData.monthlyConsultations} onChange={handleInputChange} />
                <InputField label="Average Patients Starting Treatment" name="treatmentsStarted" value={formData.treatmentsStarted} onChange={handleInputChange} />
                <InputField label="Average Patients Finishing Treatment" name="treatmentsCompleted" value={formData.treatmentsCompleted} onChange={handleInputChange} />

                {/* Average Treatment Value */}
                <div className="relative">
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Average Treatment Value ({currency})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">{currency}</span>
                    <input
                      type="number"
                      name="averageCaseValue"
                      placeholder={currentResult?.config?.caseValueDefault?.toString() || "0"}
                      value={formData.averageCaseValue || ''}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] border border-white/5 hover:border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-red-500/50 focus:bg-[#151515] transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* FIX: Changed mt-auto back to mt-8 so it sits directly under the last input without overflowing */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 group relative h-14 rounded-lg bg-white text-black hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase font-bold disabled:opacity-50 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] shrink-0"
              >
                <span className="z-10 relative">{isLoading ? "Analyzing..." : "Start Practice Audit"}</span>
                <ArrowRight className="w-4 h-4 z-10 relative group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-0"></div>
              </button>

            </form>
          </div>
          {/* --- CENTER: PIPELINE ARCHITECTURE --- */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 relative">
            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-white/10 via-red-500/30 to-white/10 -translate-x-1/2 z-0"></div>

            <div className="w-full max-w-[200px] space-y-8 z-10">
              {[
                { label: "Enquiries", val: formData.monthlyInquiries, active: formData.monthlyInquiries > 0 },
                { label: "Consultations", val: formData.monthlyConsultations, active: formData.monthlyConsultations > 0 },
                { label: "Starting", val: formData.treatmentsStarted, active: formData.treatmentsStarted > 0 },
                { label: "Finished", val: formData.treatmentsCompleted, active: formData.treatmentsCompleted > 0 },
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className={`w-full p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-md
                      ${step.active ? 'bg-[#111] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-[#0a0a0a] border-white/5 opacity-50'}`}
                  >
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">{step.label}</span>
                    <span className="text-white font-mono text-xl">{step.val || 0}</span>
                  </div>
                  {/* Data flow dot */}
                  {idx < 3 && step.active && (
                    <motion.div
                      className="absolute -bottom-5 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                      animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: LIVE TELEMETRY (DYNAMIC DUAL-LAYER FUNNEL) --- */}
          <div className="lg:col-span-4 bg-[#080808]/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group space-y-6">

            {/* Re-enhance blurred background glows */}
            <div className="absolute top-0 right-[-50px] w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full mix-blend-screen opacity-50 pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full mix-blend-screen opacity-50 pointer-events-none" />

            {/* Top integrated panel: Score & Dynamic Badge */}
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col gap-3 relative p-4 bg-[#111] rounded-lg border border-white/5 group-hover:border-white/10 transition-all overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-zinc-500" />
                  Audit Results
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1 relative z-10">
                      <span className="text-6xl font-medium tracking-tighter text-white">{currentResult.score}</span>
                      <span className="text-lg text-zinc-600 font-mono">/100</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Practice Health Score</div>
                  </div>
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center relative transition-colors
                            ${currentResult.score >= 80 ? 'border-white/20 text-white' : currentResult.score >= 50 ? 'border-zinc-700 text-zinc-400' : 'border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'}`}
                  >
                    <Activity className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* The Dynamic, Constricted Pipeline Funnel */}
            <div className="relative z-10 flex flex-col gap-6">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-red-500 animate-pulse" /> Growth Analysis
              </h3>

              {/* --- The Funnel Stack --- */}
              <div className="space-y-4">

                {/* Funnel Line Overlays with dash-mask and point particle glow motion */}
                <div className="absolute inset-x-0 top-[20%] bottom-[20%] hidden md:block z-0 pointer-events-none overflow-hidden h-[400px]">
                  {[
                    { offset: 0, delay: 0 },
                    { offset: 15, delay: 0.2 },
                    { offset: -15, delay: 0.1 },
                    { offset: 30, delay: 0.3 },
                    { offset: -30, delay: 0.4 },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className="absolute inset-y-0 h-[400px] border-l border-dashed border-red-500/30 blur-[0.5px] scale-x-50 z-0 origin-top overflow-hidden"
                      style={{
                        left: `50%`,
                        transform: `translateX(calc(-50% + ${line.offset}px)) rotate(${i % 2 === 0 ? '-15deg' : '15deg'})`,
                        maskImage: 'linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
                      }}
                    >
                      <div className="absolute inset-0 h-[400px] w-px bg-white/10" style={{ transform: 'scaleX(0.1)' }}></div>
                      {/* Dash-mask effect with repeating-linear-gradient */}
                      <div
                        className="absolute inset-0 h-[400px] z-10"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(to bottom, #000, #000 5px, transparent 5px, transparent 10px)',
                          maskImage: 'linear-gradient(to bottom, #000 10%, transparent 90%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, #000 10%, transparent 90%)',
                        }}
                      />
                      {/* Blurred glow particle flow with motion background-position-y */}
                      <div
                        className="absolute top-0 inset-x-0 h-[400px] z-20 animate-particle-flow opacity-70 blur-[1.5px]"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(to bottom, #fff, transparent 2px, transparent 10px)',
                          animationDelay: `${line.delay}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* The 3 Rate blocks: Causal flow. Motion casual linkage: low rate -> narrow constriction */}
                {[
                  { label: "Consult Rate", target: GLOBAL_TARGETS.consultTarget.min, actual: currentResult.rates.consultRate, input: "Inquiries", output: "Consults", icon: EqualApproximatelyIcon },
                  { label: "Treatment Rate", target: GLOBAL_TARGETS.treatmentTarget.min, actual: currentResult.rates.treatmentRate, input: "Consults", output: "Treatments Started", icon: BarChart2 },
                  { label: "Completion Rate", target: GLOBAL_TARGETS.completionTarget.min, actual: currentResult.rates.completionRate, input: "Treatments Started", output: "Completed", icon: ShieldCheck },
                ].map((step, idx) => {
                  const isLeak = step.actual < step.target;
                  const percentage = Math.round(step.actual * 100);

                  // Dynamic width for neck constriction based on percentage.
                  const widthFactor = step.actual * 100 * 0.9; // Base scale on percentage
                  const clampedWidth = Math.max(0.5, Math.min(widthFactor, 100)); // Clamp for visual sanity

                  return (
                    <div key={idx} className="relative group transition-all duration-300">

                      {/* Causal linking labels (Web viewer only for demonstration) */}
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-700 uppercase tracking-widest -rotate-90 origin-center pointer-events-none hidden md:block">
                        {step.input}
                      </div>
                      <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-700 uppercase tracking-widest rotate-90 origin-center pointer-events-none hidden md:block">
                        {step.output}
                      </div>

                      {/* Nested dynamic div stack for converging shape and constricted path using mask */}
                      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-500 backdrop-blur-md overflow-hidden relative
                            ${isLeak ? 'bg-[#110505] border-red-500/20 group-hover:border-red-500/50 group-hover:bg-[#1a0505]' : 'bg-[#111] border-white/5 hover:border-white/10 hover:bg-[#1a1a1a]'}`}
                      >
                        {/* Inner funnel lines/mask effect. The dash-mask line pattern from image is integrated. Motion is applied to the repeating linear gradient. */}
                        <div className="absolute inset-0 z-0 pointer-events-none group-hover:opacity-10 transition-opacity" style={{ maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, #000 40%, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, #000 40%, transparent)' }}>
                          <div className="absolute inset-0 h-[300px] w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
                          <div className="absolute inset-0 h-[300px] bg-gradient-to-b from-transparent via-red-500/3 to-transparent z-10" />

                          {/* Dashed lines / points with dash-offset motion */}
                          {[40, 60, 80, 100, 120].map((width, i) => (
                            <div
                              key={i}
                              className="absolute inset-y-0 h-[300px] z-20 origin-top overflow-hidden opacity-30 blur-[0.3px]"
                              style={{
                                width: `${width}%`,
                                left: `50%`,
                                transform: `translateX(-50%)`,
                                maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
                              }}
                            >
                              <div
                                className="absolute inset-y-0 h-[300px] z-10 animate-dash-flow opacity-60"
                                style={{
                                  backgroundImage: 'repeating-linear-gradient(to bottom, #000, #000 4px, transparent 4px, transparent 8px)',
                                  maskImage: 'linear-gradient(to bottom, #000 20%, transparent 80%)',
                                  WebkitMaskImage: 'linear-gradient(to bottom, #000 20%, transparent 80%)',
                                }}
                              />
                              {/* Point particle flow blurring with moving background-position-y */}
                              <div
                                className="absolute top-0 inset-x-0 h-[300px] z-20 animate-particle-glow opacity-80 blur-[1px]"
                                style={{
                                  backgroundImage: 'repeating-linear-gradient(to bottom, #fff, transparent 1px, transparent 10px)',
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="relative z-10 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                    ${isLeak ? 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20' : 'bg-white/5 text-zinc-600 group-hover:text-zinc-300'}`}
                          >

                          </div>
                          <span className="text-sm text-zinc-300 block font-medium group-hover:text-white transition-colors">{step.label}</span>
                        </div>

                        {/* Dynamic constriction path: Framer Motion animate width caused by percentage */}
                        <div className="relative flex items-center gap-2.5 z-10">
                          <motion.div
                            className={`h-2 rounded-full transition-colors relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]
                                        ${isLeak ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-zinc-800'}`}
                            animate={{ width: `${clampedWidth}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                          <div className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors
                                    ${isLeak ? 'bg-red-500/20 text-red-500 group-hover:bg-red-500/30' : 'bg-white/10 text-zinc-400 group-hover:text-zinc-200'}`}>
                            {isLeak ? 'Leak' : 'Optimal'} {percentage}%
                          </div>
                        </div>
                      </div>
                      {idx < 2 && <div className="h-6 w-px bg-white/10 mx-auto" />}
                    </div>
                  );
                })}

              </div>

              {/* Final Spill Panel below with dynamic causal drip animation. Causal linked: Final output. Enhanced style. */}
              <div className="bg-[#110505] p-6 rounded-2xl border border-red-500/30 transition-all duration-300 group overflow-hidden relative shadow-[0_10px_40px_rgba(239,68,68,0.1)]">

                {/* Pulsing red causal flow core background */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1),transparent_70%)] pointer-events-none group-hover:opacity-60 transition-opacity"
                />

                {/* Causal flow drip particle motion animation trail from bottom */}
                <div className="absolute inset-x-0 bottom-[-50px] h-[100px] hidden md:block z-0 pointer-events-none overflow-hidden h-[400px]" style={{ transform: 'translateX(-50%)' }}>
                  {[
                    { offset: 0, delay: 0 },
                    { offset: 15, delay: 0.2 },
                    { offset: -15, delay: 0.1 },
                    { offset: 30, delay: 0.3 },
                    { offset: -30, delay: 0.4 },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className="absolute inset-y-0 h-[400px] border-l border-dashed border-red-500/10 scale-x-50 z-0 origin-bottom overflow-hidden h-[400px]"
                      style={{
                        left: `50%`,
                        transform: `translateX(calc(-50% + ${line.offset}px)) rotate(${i % 2 === 0 ? '-15deg' : '15deg'})`,
                        maskImage: 'linear-gradient(to bottom, transparent 20%, #000 80%, #000)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, #000 80%, #000)',
                      }}
                    >
                      <div className="absolute inset-0 h-[400px] w-px bg-white/5" style={{ transform: 'scaleX(0.05)' }}></div>
                      <div
                        className="absolute inset-0 h-[400px] z-10"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(to bottom, #000, #000 3px, transparent 3px, transparent 6px)',
                          maskImage: 'linear-gradient(to bottom, transparent 30%, #000)',
                          WebkitMaskImage: 'linear-gradient(to bottom, transparent 30%, #000)',
                        }}
                      />
                      {/* Spill glowing particles motion from causal causal final output drip trail */}
                      <div
                        className="absolute bottom-0 inset-x-0 h-[100px] z-20 animate-drip-flow opacity-50 blur-[2px]"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, transparent 10px, #fff)',
                          animationDelay: `${line.delay}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <h3 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Active Revenue Leak</h3>
                  </div>
                  <div className="text-zinc-400 text-xs font-medium">Estimated Lost Capital (Monthly)</div>
                  <div className="text-4xl font-medium tracking-tighter text-red-500 font-mono flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl text-red-500/50">{currency}</span>
                    {currentResult.revenue.monthlyLoss.toLocaleString()}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}



function InputField({ label, name, value, onChange }: { label: string, name: string, value: any, onChange: any }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 transition-colors">{label}</label>
      <input
        type="number"
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full bg-[#111] border border-white/5 hover:border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500/50 focus:bg-[#151515] transition-all font-mono text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
      />
    </div>
  );
}