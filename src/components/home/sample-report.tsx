"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, ScanLine, Lock, Activity } from "lucide-react";
import Link from 'next/link';

export function SampleReport() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden font-sans border-t border-white/5 selection:bg-red-900/30">

      {/* --- BACKGROUND SYSTEM LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen -translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">

          {/* --- RIGHT: COPY & CTAS --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <Lock className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">
                Classified Output
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter mb-6 text-balance leading-[1.05]">
              The 6-Page <br />
              <span className="text-zinc-600">Practice Health Report.</span>
            </h2>

            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-10 max-w-xl text-balance">
              When you run a practice audit, the system creates a detailed PDF report. It shows your growth opportunities, success benchmarks, and the exact systems you need to scale your clinic.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/report" className="w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto h-14 px-8 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 text-xs tracking-[0.1em] uppercase font-bold overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  <FileText className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="z-10 relative">View Sample Report</span>
                  <ArrowRight className="w-4 h-4 z-10 relative group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* --- LEFT: 3D DOSSIER PREVIEW --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full perspective-[1200px]"
          >
            {/* Wrapper for 3D floating effect */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotateY: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative max-w-sm mx-auto w-full aspect-[1/1.4] transform-style-3d scale-[0.8] xs:scale-[0.9] sm:scale-100"
            >

              {/* BACKGROUND DOCUMENT (Gives a stacked dossier look) */}
              <div className="absolute inset-0 bg-[#080808] border border-white/5 rounded-xl shadow-2xl transform translate-x-6 translate-y-6 -rotate-3 scale-95 opacity-60 flex flex-col p-6">
                <div className="w-1/2 h-3 bg-white/10 rounded mb-4"></div>
                <div className="w-full h-px bg-white/5 mb-8"></div>
                <div className="flex-1 border border-white/5 rounded-lg bg-white/[0.02]"></div>
              </div>

              {/* MAIN FOREGROUND DOCUMENT */}
              <div className="absolute inset-0 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] p-6 md:p-8 flex flex-col relative overflow-hidden group">

                {/* Subtle sweep glare */}
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-20"></div>

                {/* Document Header */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-6">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Activity className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-[10px] font-black uppercase text-white whitespace-nowrap">
                        <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks OS
                      </span>
                    </div>
                    <div className="text-[6px] font-mono text-zinc-500 uppercase">Practice Audit</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[6px] font-mono text-zinc-400">ID: SYS-0894</div>
                    <div className="text-[6px] font-mono text-zinc-600 mt-1">CONFIDENTIAL</div>
                  </div>
                </div>

                {/* Document Body - Fake UI */}
                <div className="flex-1 flex flex-col">

                  {/* Fake Score Section */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 rounded-full border-[3px] border-red-500/50 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <span className="text-xl font-black text-white leading-none">58</span>
                      <span className="text-[6px] font-mono text-zinc-500">/100</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-20 bg-zinc-700 rounded mb-2"></div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded mb-1.5"></div>
                      <div className="h-1.5 w-3/4 bg-zinc-800 rounded"></div>
                    </div>
                  </div>

                  {/* Fake Red Loss Box */}
                  <div className="w-full bg-[#110505] border border-red-500/20 rounded-lg p-4 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1)_0,transparent_60%)]" />
                    <div className="h-1.5 w-24 bg-red-500/50 rounded mb-3 relative z-10"></div>
                    <div className="text-2xl font-black text-red-500 font-mono leading-none mb-2 relative z-10">₹3,52,000</div>
                    <div className="h-1.5 w-16 bg-red-900/50 rounded relative z-10"></div>
                  </div>

                  {/* Fake Bar Charts */}
                  <div className="flex-1 flex flex-col gap-3 mt-auto border-t border-white/5 pt-4">
                    {[40, 75, 60].map((width, i) => (
                      <div key={i} className="w-full">
                        <div className="flex justify-between mb-1.5">
                          <div className="h-1.5 w-12 bg-zinc-700 rounded"></div>
                          <div className="h-1.5 w-6 bg-zinc-800 rounded"></div>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${i === 0 ? 'bg-red-500' : 'bg-zinc-500'}`} style={{ width: `${width}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[4rem] font-black text-white/[0.02] tracking-tighter pointer-events-none select-none">
                  SAMPLE
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}