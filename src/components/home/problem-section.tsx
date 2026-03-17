"use client";

import React from "react";
import { PhoneMissed, Handshake, Users, RefreshCcw, ArrowRight, Search, Activity } from "lucide-react";
import { motion, Variants } from "framer-motion";

const REVENUE_LEAKS = [
  {
    id: 0,
    icon: <Search className="w-5 h-5" />,
    title: "Low Online Visibility",
    description: "Patients searching for treatments in your area are unable to find your clinic online.",
    highlight: "Acquisition Leak",
  },
  {
    id: 1,
    icon: <PhoneMissed className="w-5 h-5" />,
    title: "Missed Patient Inquiries",
    description: "Patients try to call or message your clinic but don't get a timely response.",
    highlight: "Acquisition Leak",
  },
  {
    id: 2,
    icon: <Handshake className="w-5 h-5" />,
    title: "Low Consultation Conversion",
    description: "Patients visit for consultation but do not proceed with the suggested treatment.",
    highlight: "Sales Leak",
  },
  {
    id: 3,
    icon: <Users className="w-5 h-5" />,
    title: "Incomplete Treatments",
    description: "Patients begin treatment but do not complete their full plan.",
    highlight: "Fulfillment Leak",
  },
  {
    id: 4,
    icon: <RefreshCcw className="w-5 h-5" />,
    title: "Patients Not Returning",
    description: "Patients do not come back for follow-ups or future treatments.",
    highlight: "Retention Leak",
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ProblemSection() {
  return (
    <section className="relative bg-[#050505] text-white py-24 md:py-32 overflow-hidden selection:bg-red-900/30">

      {/* --- PRESERVED BACKGROUND EXACTLY AS REQUESTED --- */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">

        {/* --- PRESERVED HEADER EXACTLY AS REQUESTED --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.02)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
              Clinic Performance Insights
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-medium tracking-tighter mb-6 text-white"
          >
            Why Clinics <span className="text-zinc-500">Lose Revenue.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto text-balance"
          >
            Without clear performance insights, these 5 gaps quietly reduce your clinic’s monthly revenue.
          </motion.p>
        </div>

        {/* --- UPGRADED ASYMMETRICAL BENTO GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          {REVENUE_LEAKS.map((leak, idx) => {
            // Intelligent 5-item layout: Top 3 items span 2 cols, Bottom 2 items span 3 cols.
            const spanClass = idx < 3 ? "md:col-span-2" : "md:col-span-3";

            return (
              <motion.div
                key={leak.id}
                variants={itemVariants}
                className={`group relative flex flex-col justify-between h-full p-8 rounded-3xl border border-white/5 bg-[#080808]/80 backdrop-blur-xl hover:border-red-500/30 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${spanClass}`}
              >
                {/* Advanced Hover Glows */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08)_0,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Simulated Radar Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

                <div className="flex-1 relative z-10">
                  <div className="flex items-start justify-between mb-8">

                    {/* Hardware Icon Module */}
                    <div className="w-12 h-12 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-red-500 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all duration-500 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                      {leak.icon}
                    </div>

                    {/* Technical ID Tag */}
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-500 bg-[#050505] px-2.5 py-1 rounded-md border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] group-hover:border-red-500/20 group-hover:text-red-400 transition-colors duration-300 flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-zinc-600 group-hover:text-red-500" />
                      SYS.ERR.0{idx + 1}
                    </span>
                  </div>

                  {/* Highlight Label */}
                  <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-red-500/80 mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {leak.highlight}
                  </div>

                  <h3 className="text-xl md:text-2xl font-medium text-white mb-3 tracking-tight group-hover:text-zinc-200 transition-colors">
                    {leak.title}
                  </h3>

                  <p className="text-sm text-zinc-500 leading-relaxed font-light group-hover:text-zinc-400 transition-colors">
                    {leak.description}
                  </p>
                </div>

                {/* Animated Bottom Action Bar */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 relative z-10">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                    Plug this leak
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Hover progress line indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}