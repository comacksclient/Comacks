"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radar, HeartHandshake, ShieldCheck, Repeat, Activity, Cpu, Layers } from "lucide-react";


const SYSTEM_LAYERS = [
  {
    id: "L-01",
    title: "Get More Patients",
    desc: "We help people in your area find your clinic and easily reach out or book an appointment.",
    icon: Radar
  },
  {
    id: "L-02",
    title: "Turn Visits into Treatments",
    desc: "We guide patients so they feel confident and say yes to the treatment they need.",
    icon: HeartHandshake
  },
  {
    id: "L-03",
    title: "Keep Patients on Track",
    desc: "We make sure patients don’t drop off and complete their full treatment plan.",
    icon: ShieldCheck
  },
  {
    id: "L-04",
    title: "Bring Patients Back",
    desc: "We reconnect with past patients and remind them to return for checkups or more care.",
    icon: Repeat
  },
  {
    id: "L-05",
    title: "Know How Your Clinic is Growing",
    desc: "You can clearly see what’s working in your clinic without confusion or guesswork.",
    icon: Activity
  },
];

export function SystemLayers() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden font-sans border-y border-white/5 selection:bg-red-900/30">

      {/* --- BACKGROUND SYSTEM AMBIENCE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen opacity-40"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]"
          >
            <Layers className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">
              How the System Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 text-white text-balance"
          >
            Patient Growth  <span className="text-zinc-600">System.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed text-balance"
          >
            We don't sell ads. We architect and install specialized operational layers engineered specifically for the growth bottlenecks identified in your practice.
          </motion.p>
        </div>

        {/* --- SYSTEM LAYERS STACK --- */}
        <div className="relative">

          {/* Main Vertical Data Bus */}
          <div className="absolute top-8 bottom-8 left-[31px] md:left-[39px] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-0 hidden sm:block"></div>

          <div className="flex flex-col gap-6 relative z-10">
            {SYSTEM_LAYERS.map((sys, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col sm:flex-row items-start gap-6 md:gap-8 bg-[#080808]/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 hover:bg-[#0A0A0A] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Subtle Hover Glow inside card */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Left side: Node / Icon */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center relative z-10 group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-500 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                    <sys.icon className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 group-hover:text-red-500 transition-colors duration-500" />
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="flex-1 pt-1 md:pt-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 gap-4">
                    <h3 className="text-2xl md:text-3xl font-medium text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                      {sys.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 group-hover:border-red-500/20 transition-all shrink-0 w-max">
                      <Cpu className="w-3 h-3" /> Layer {sys.id}
                    </span>
                  </div>

                  <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base group-hover:text-zinc-400 transition-colors">
                    {sys.desc}
                  </p>
                </div>

                {/* Active Installation Status (Appears on Hover) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}