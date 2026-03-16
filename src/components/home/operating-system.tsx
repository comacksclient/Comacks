"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, MessageCircle, GitBranch, HeartHandshake, LayoutDashboard, Database, Activity } from "lucide-react";

// --- DATA ---
const MODULES = [
    {
        id: "SYS-01",
        title: "Patient Attraction",
        desc: "Controlled campaigns (SEO + Ads + Local search). Audience targeting refined to clinic.",
        icon: <Target className="w-5 h-5" />,
        status: "Active",
        tags: ["SEO", "Ad Strategy", "Local Search"],
        colSpan: "lg:col-span-1",
    },
    {
        id: "SYS-02",
        title: "Conversion Engine",
        desc: "AI contact response + booking flows. Website conversion optimization.",
        icon: <MessageCircle className="w-5 h-5" />,
        status: "Automated",
        tags: ["Instant Reply", "Booking Flow", "Qualification"],
        colSpan: "lg:col-span-1",
    },
    {
        id: "SYS-03",
        title: "Automation",
        desc: "Reminder + follow-up automation. CRM + WhatsApp workflows.",
        icon: <GitBranch className="w-5 h-5" />,
        status: "Running",
        tags: ["Reminders", "CRM Workflows", "WhatsApp"],
        colSpan: "lg:col-span-1",
    },
    // --- ROW 2 (Wider Cards for Visual Balance) ---
    {
        id: "SYS-04",
        title: "Retention",
        desc: "Review & referral generation. Reactivation sequences.",
        icon: <HeartHandshake className="w-5 h-5" />,
        status: "Monitoring",
        tags: ["Reviews", "Referrals", "Reactivation"],
        colSpan: "lg:col-span-2",
    },
    {
        id: "SYS-05",
        title: "Visibility",
        desc: "One dashboard for appointments + revenue + sources.",
        icon: <LayoutDashboard className="w-5 h-5" />,
        status: "Live Data",
        tags: ["Revenue", "Sources", "Appointments"],
        colSpan: "lg:col-span-1",
    },
];

export function OperatingSystem() {
    return (
        <section id="components" className="relative bg-[#050505] text-white py-32 border-t border-white/5 overflow-hidden">

            {/* --- BACKGROUND LAYER --- */}
            {/* 1. Technical Grid Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* 2. Brand Glow (Red) - Subtle ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* --- HEADER --- */}
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-6 border border-red-900/30 bg-red-900/10 px-3 py-1 rounded text-xs font-mono text-red-200/80"
                    >
                        <Activity className="w-3 h-3 text-red-500" />
                        SYSTEM ARCHITECTURE v3.0
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-medium tracking-tighter mb-6 text-white"
                    >
                        The Full-Stack<br />
                        <span className="text-zinc-600">Operating System.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg font-light leading-relaxed max-w-2xl border-l-2 border-red-900/30 pl-6"
                    >
                        We don't sell disconnected services. We deploy a unified infrastructure stack designed to mechanically generate patient revenue.
                    </motion.p>
                </div>

                {/* --- MODULE GRID (Bento Layout) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {MODULES.map((module, i) => (
                        <SystemCard key={module.id} module={module} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function SystemCard({ module, index }: { module: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-[#080808] border border-white/5 overflow-hidden hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.15)] ${module.colSpan}`}
        >
            {/* Background Texture on Hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.05),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Hover Gradient Effect (Red Tone) */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Shine */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/50 transition-all duration-700 opacity-0 group-hover:opacity-100" />

            {/* Header: Icon + ID + Status */}
            <div className="relative z-10 flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-red-500/30 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:bg-red-500/5 transition-all duration-300">
                    {module.icon}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 group-hover:text-red-400/80 transition-colors">
                        {module.id}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm group-hover:border-red-500/20 group-hover:bg-red-500/5 transition-colors">
                        <div className="relative w-1.5 h-1.5">
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-1.5 h-1.5 bg-red-500 rounded-full group-hover:shadow-[0_0_8px_rgba(239,68,68,1)] transition-shadow"></div>
                        </div>
                        <span className="text-[9px] font-medium text-zinc-300 uppercase tracking-wider">{module.status}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mb-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-medium text-zinc-100 mb-3 group-hover:text-white transition-colors">
                    {module.title}
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {module.desc}
                </p>
            </div>

            {/* Footer: Tech Tags */}
            <div className="relative z-10 pt-6 border-t border-white/5 flex flex-wrap gap-2 mt-auto">
                {module.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-mono text-zinc-500 bg-[#0A0A0A] px-2.5 py-1.5 rounded-md border border-white/[0.05] group-hover:border-red-500/20 group-hover:text-zinc-300 group-hover:bg-red-500/[0.02] transition-colors duration-300">
                        {tag}
                    </span>
                ))}
            </div>

        </motion.div>
    );
}