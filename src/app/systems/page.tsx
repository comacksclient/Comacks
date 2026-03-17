"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Network, Database, Workflow, ShieldCheck, Terminal, Cpu, Plus } from "lucide-react";


const SYSTEMS_DATA = [
  {
    id: "SYS-01",
    version: "v2.4",
    name: "Inquiry Generation System",
    desc: "Architected exclusively for clinics suffering from empty pipelines. We build the top-of-funnel engine to predictably attract and capture high-intent patients.",
    components: ["PPC (Google Ads) Network", "Meta Ads Distribution", "Local SEO Optimization", "High-Converting Web Architecture", " Follow-up System", "Call Tracking Protocol"],
    icon: Network
  },
  {
    id: "SYS-02",
    version: "v3.1",
    name: "Conversion System",
    desc: "Engineered for clinics generating leads that fail to walk through the door. This system intercepts and nurtures leads until they accept treatment plans.",
    components: ["Consultation Follow-up Automation", "Patient Education Sequences", "Treatment Offer Restructuring", "Sales CRM Integration"],
    icon: Workflow
  },
  {
    id: "SYS-03",
    version: "v1.8",
    name: "Completion System",
    desc: "Stops patients from abandoning active treatments midway through the procedure timeline. Secures the back-end revenue.",
    components: ["Automated Appointment Reminders", "Treatment Progress Tracking", "Procedure Follow-up Check-ins"],
    icon: ShieldCheck
  },
  {
    id: "SYS-04",
    version: "v2.0",
    name: "Recall System",
    desc: "Reactivates your latent database. An automated mining operation to bring past patients back for checkups and new procedures.",
    components: ["Recall Automation Engine", "Targeted SMS Campaigns", "WhatsApp Reactivations", "Email Newsletters"],
    icon: Database
  },
  {
    id: "SYS-05",
    version: "v4.0",
    name: "Analytics System",
    desc: "The core foundational layer standard across all partnered clinics to track real pipeline numbers and map leak points accurately.",
    components: [" Real-Time Dashboard", "Lead Source Tracking", "Revenue Gap Calculation", "Growth Metrics"],
    icon: Layers
  }
];

export default function SystemsPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] pt-32 pb-24 text-white font-sans overflow-hidden selection:bg-red-900/30">

      {/* --- BACKGROUND SYSTEM LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md"
          >
            <Cpu className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">
              Structure
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6 text-white"
          >
            <span className="text-red-500">C</span>oma<span className="text-red-500">c</span>ks <span className="text-zinc-600">Systems.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed text-balance"
          >
            We don’t offer generic marketing ,we fix what’s missing in your clinic and build a system that brings real patients.
          </motion.p>
        </div>

        {/* --- SYSTEMS ARCHITECTURE LIST --- */}
        <div className="relative">

          {/* Central Vertical Data Bus (Desktop) */}
          <div className="hidden lg:block absolute inset-y-0 left-[40px] w-px bg-gradient-to-b from-red-500/50 via-white/10 to-transparent z-0"></div>

          <div className="space-y-8 md:space-y-12">
            {SYSTEMS_DATA.map((sys, idx) => (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-12 group"
              >

                {/* Node Connector (Desktop) */}
                <div className="hidden lg:flex flex-col items-center mt-8 shrink-0 relative">
                  <div className="w-20 h-px bg-white/10 absolute top-4 left-5 -z-10 group-hover:bg-red-500/30 transition-colors duration-500"></div>
                  <div className="w-10 h-10 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-red-500/50 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-500 z-10">
                    <sys.icon className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>

                {/* Main Module Card */}
                <div className="flex-1 bg-[#080808]/90 backdrop-blur-xl border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden relative group-hover:bg-[#0A0A0A]">

                  {/* Subtle Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* Decorative Plus */}
                  <div className="absolute top-6 right-6 text-white/5 group-hover:text-red-500/10 transition-colors duration-500">
                    <Plus className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">

                    {/* Module Info */}
                    <div className="lg:w-[55%]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="lg:hidden w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <sys.icon className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                          {sys.id}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600">
                          Build {sys.version}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight group-hover:text-red-50 transition-colors">
                        {sys.name}
                      </h2>
                      <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                        {sys.desc}
                      </p>
                    </div>

                    {/* Installed Components */}
                    <div className="lg:w-[45%] lg:border-l border-white/5 lg:pl-10 pt-8 lg:pt-0 border-t lg:border-t-0">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-6 flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5" /> Installed Packages
                      </h3>
                      <div className="flex flex-col gap-3">
                        {sys.components.map((comp, i) => (
                          <div key={i} className="flex items-start gap-3 group/item">
                            <div className="text-red-500 font-mono text-sm mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity">[+]</div>
                            <span className="text-sm font-mono text-zinc-300 group-hover/item:text-white transition-colors">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}