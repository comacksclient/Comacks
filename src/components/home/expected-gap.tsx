"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoveDown, MoveUp, AlertTriangle, CheckCircle2, ScanSearch } from "lucide-react";

// --- DIAGNOSTIC DATA ---
const VARIANCE_DATA = [
  { id: "cns", metric: "Consultation Rate", actual: 41, target: 50, suffix: "%" },
  { id: "trt", metric: "Treatment Acceptance", actual: 55, target: 70, suffix: "%" },
  { id: "cmp", metric: "Plan Completion", actual: 85, target: 95, suffix: "%" },
  { id: "rcl", metric: "Patient Reactivation", actual: 45, target: 40, suffix: "%" },
];

export function ExpectedGap() {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden font-sans border-y border-white/5 selection:bg-red-900/30">

      {/* Background System Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <ScanSearch className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
              Diagnostics
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 text-white"
          >
            Expected <span className="text-zinc-600">vs. Actual.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            The difference between ideal conversion rates and your current numbers shows exactly how much revenue you’re losing|

          </motion.p>
        </div>

        {/* --- NODE CONNECTION UI --- */}
        <div className="space-y-4 md:space-y-6">
          {VARIANCE_DATA.map((item, idx) => {
            const gap = item.actual - item.target;
            const isLeak = gap < 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#080808]/80 border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12"
              >
                {/* Hover Background Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isLeak ? 'bg-gradient-to-r from-red-500/5 to-transparent' : 'bg-gradient-to-r from-white/[0.02] to-transparent'}`} />

                {/* Left: Metric Title */}
                <div className="md:w-1/3 relative z-10 flex items-start gap-4">
                  <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${isLeak ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                    {isLeak ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-zinc-200 group-hover:text-white transition-colors">
                      {item.metric}
                    </h3>
                    <p className={`text-xs mt-1 uppercase tracking-wider font-bold ${isLeak ? 'text-red-500/80' : 'text-zinc-500'}`}>
                      {isLeak ? 'System Leak Detected' : 'Optimal Variance'}
                    </p>
                  </div>
                </div>

                {/* Right: The Node Connector */}
                <div className="flex-1 flex items-center justify-between relative z-10">

                  {/* Actual Node */}
                  <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">Actual</span>
                    <div className="px-3 py-1.5 rounded-md bg-[#111] border border-white/5 text-white font-mono text-lg md:text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                      {item.actual}{item.suffix}
                    </div>
                  </div>

                  {/* The Gap Line & Pill */}
                  <div className="flex-1 mx-4 md:mx-8 relative flex items-center justify-center">
                    {/* Dashed Line */}
                    <div className={`absolute inset-x-0 h-[1px] border-t border-dashed ${isLeak ? 'border-red-500/30' : 'border-white/10'}`}></div>

                    {/* The Gap Pill */}
                    <div className={`relative z-10 flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-mono font-bold border transition-all duration-300 shadow-xl
                      ${isLeak
                        ? 'bg-[#1a0505] text-red-400 border-red-500/30 group-hover:border-red-500/60 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:-translate-y-0.5'
                        : 'bg-[#111] text-zinc-300 border-white/10 group-hover:border-white/30 group-hover:-translate-y-0.5'
                      }`}
                    >
                      {gap > 0 ? '+' : ''}{gap}{item.suffix}
                      {isLeak ? <MoveDown className="w-3.5 h-3.5" /> : <MoveUp className="w-3.5 h-3.5 text-zinc-400" />}
                    </div>
                  </div>

                  {/* Target Node */}
                  <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">Target</span>
                    <div className="px-3 py-1.5 rounded-md bg-transparent border border-transparent text-zinc-500 font-mono text-lg md:text-xl">
                      {item.target}{item.suffix}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}