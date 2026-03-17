"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText, Handshake, Stethoscope, CheckCircle2, Rewind, DollarSign, Terminal, Plus, Cpu } from "lucide-react";

// --- EXPANDED DATA STRUCTURE ---
const PIPELINE_STEPS = [
  { id: 1, name: "Inquiry Capture", icon: <MessageSquareText className="w-5 h-5" />, leakText: "Unanswered Leads", desc: "Patient discovers clinic. AI intercepts and captures data." },
  { id: 2, name: "Consult Booking", icon: <Handshake className="w-5 h-5" />, leakText: "No-Shows", desc: "Automated scheduling and pre-arrival nurturing." },
  { id: 3, name: "Treatment", icon: <Stethoscope className="w-5 h-5" />, leakText: "Drop-offs", desc: "Execution of the agreed medical procedures." },
  { id: 4, name: "Post-Care", icon: <CheckCircle2 className="w-5 h-5" />, leakText: "No Reviews", desc: "Automated review generation and feedback loops." },
  { id: 5, name: "Reactivation", icon: <Rewind className="w-5 h-5" />, leakText: "Lost Patients", desc: "Database mining to bring back old patients." },
];

export function PipelineModel() {
  return (
    <section className="relative bg-[#050505] text-white py-24 md:py-32 overflow-hidden font-sans selection:bg-red-900/30">

      {/* --- COMACKS BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Red Glows */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full mix-blend-screen -translate-y-1/2 translate-x-1/3"></div>

        {/* Technical Grid Pattern from AboutUs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-28 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
              Comacks System
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 text-white"
          >
            Patient Follow-up System.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto text-balance"
          >
            We don’t just bring enquiries ,we build a system that turns them into OPD visits, procedures, and predictable monthly revenue.

          </motion.p>
        </div>

        {/* --- DESKTOP VIEW (Alternating Blueprint Track) --- */}
        <div className="hidden lg:flex relative max-w-7xl mx-auto items-center h-[400px]">

          {/* Main Glass Track */}
          <div className="absolute top-1/2 left-0 right-32 h-1.5 bg-zinc-900 rounded-full -translate-y-1/2 overflow-hidden z-0 border border-white/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            {/* Red Comacks Energy Pulse traveling through the track */}
            <motion.div
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-red-500/80 to-transparent blur-[2px]"
            />
          </div>

          <div className="flex items-center justify-between w-full relative z-10 pr-8">
            {PIPELINE_STEPS.map((step, idx) => {
              const isTop = idx % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative flex flex-col items-center justify-center w-full group cursor-crosshair"
                >
                  {/* Floating Content Card (Matched to AboutUs ValueCards) */}
                  <div className={`absolute w-56 p-6 rounded-lg bg-[#050505]/95 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-[#080808] group-hover:border-red-500/30 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] ${isTop ? 'bottom-24' : 'top-24'}`}>

                    {/* Decorative Plus Icon from AboutUs */}
                    <div className="absolute top-3 right-3 text-red-900/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus strokeWidth={1} className="w-4 h-4" />
                    </div>

                    <h4 className="text-lg text-white font-medium mb-2 group-hover:text-red-100 transition-colors">{step.name}</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{step.desc}</p>

                    {/* Hidden Leak Data (Reveals on Hover in Comacks Red) */}
                    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-500/0 max-h-0 overflow-hidden group-hover:max-h-10 group-hover:text-red-500 group-hover:mt-4 transition-all duration-500 font-bold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>System Fix: {step.leakText}</span>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className={`absolute w-px transition-colors duration-500 bg-gradient-to-b group-hover:from-red-500 group-hover:to-red-500/0 ${isTop ? 'bottom-14 h-10 from-white/10 to-transparent' : 'top-14 h-10 from-transparent to-white/10'}`} />

                  {/* On-Track Node Icon */}
                  <div className="w-14 h-14 bg-zinc-900/80 border border-white/10 rounded-lg flex items-center justify-center z-20 group-hover:border-red-500/50 group-hover:bg-[#080808] transition-all duration-500 relative shadow-[0_0_0_4px_#050505]">
                    <div className="text-zinc-400 group-hover:text-red-500 transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Final Revenue Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="relative z-20 flex-shrink-0 ml-4 group"
            >
              {/* Massive Red Glow */}
              <div className="absolute inset-0 bg-red-600/30 blur-[40px] rounded-full group-hover:bg-red-500/50 transition-all duration-700" />

              <div className="w-28 h-28 bg-[#050505] border border-red-500/30 rounded-full flex flex-col items-center justify-center text-white relative z-20 shadow-[0_0_40px_rgba(239,68,68,0.2)] group-hover:border-red-500 group-hover:scale-105 transition-all duration-500">
                <DollarSign className="w-8 h-8 mb-1 text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">Revenue</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* --- MOBILE VIEW (High-End Vertical Journey) --- */}
        <div className="block lg:hidden relative max-w-md mx-auto">
          {/* Vertical Glowing Track */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-zinc-900 rounded-full overflow-hidden z-0 border border-white/5">
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1/4 bg-gradient-to-b from-transparent via-red-500/80 to-transparent blur-[1px]"
            />
          </div>

          <div className="flex flex-col gap-10 relative z-10">
            {PIPELINE_STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 group"
              >
                {/* Node Icon */}
                <div className="w-16 h-16 bg-zinc-900/80 border border-white/10 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_0_6px_#050505] relative z-10 mt-2 transition-colors group-hover:border-red-500/30">
                  <div className="text-zinc-400 group-hover:text-red-500 transition-colors">
                    {step.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 p-5 rounded-lg border border-white/10 bg-[#050505]/95 backdrop-blur-sm group-hover:border-red-500/20 group-hover:bg-[#080808] transition-all">
                  <h4 className="text-lg font-medium text-white mb-1 group-hover:text-red-100">{step.name}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{step.desc}</p>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400">
                    <Cpu className="w-3 h-3" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">
                      System Fix: {step.leakText}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Mobile Revenue Node */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mt-4"
            >
              <div className="w-16 h-16 bg-[#050505] border border-red-500/50 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(239,68,68,0.3)] relative z-10">
                <DollarSign className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <span className="text-2xl font-medium tracking-tight text-white block">Maximized</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500">Revenue Output</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}