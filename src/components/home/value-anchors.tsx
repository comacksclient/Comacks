"use client";

import React from "react";
import { AlertTriangle, Clock, MessageSquare, UserX, Activity, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// --- DATA: Separated for clean maintenance ---
const DIAGNOSIS_ITEMS = [
    {
        id: 1,
        icon: <Clock className="w-5 h-5" />,
        title: "Enquiries slipping after hours",
        description: "50% of patient interest happens when your reception is closed. Without automation, these leads are lost forever.",
        highlight: "Severe Revenue Risk",
        colSpan: "lg:col-span-2",
    },
    {
        id: 2,
        icon: <MessageSquare className="w-5 h-5" />,
        title: "WhatsApp chaos",
        description: "Patient chats scattered across personal phones mean zero accountability and lost booking history.",
        highlight: "Operational Risk",
        colSpan: "lg:col-span-2",
    },
    {
        id: 3,
        icon: <UserX className="w-5 h-5" />,
        title: "No-shows without structured follow-up",
        description: "Manual follow-ups are inconsistent. Patients forget, the chair stays empty, and revenue vanishes.",
        highlight: "Efficiency Drain",
        colSpan: "lg:col-span-2",
    },
    {
        id: 4,
        icon: <Activity className="w-5 h-5" />,
        title: "Lost walk-in patients",
        description: "Walk-ins who don't book immediately often leave without data capture. We turn 'just asking' into a nurtured lead.",
        highlight: "Missed Opportunity",
        colSpan: "lg:col-span-3", // Wide card on bottom row
    },
    {
        id: 5,
        icon: <AlertTriangle className="w-5 h-5" />,
        title: "Old patients not returning",
        description: "Thousands of past records sit gathering dust. We reactivate them automatically without lifting a finger.",
        highlight: "Hidden Goldmine",
        colSpan: "lg:col-span-3", // Wide card on bottom row
    },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export function ValueAnchors() {
    return (
        <section className="relative bg-[#050505] text-white py-24 md:py-32 overflow-hidden">

            {/* Background Texture (Noise) - Matches Hero */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* --- HEADER SECTION --- */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">System Diagnosis</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-medium tracking-tighter mb-6 text-white"
                    >
                        Invisible Leaks in Your<br />
                        <span className="text-zinc-500">Clinic Operations.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 font-light leading-relaxed text-balance"
                    >
                        Revenue leakage rarely happens all at once. It happens in the gaps between tools,
                        missed calls, and forgotten follow-ups.
                    </motion.p>
                </div>

                {/* --- BENTO GRID LAYOUT --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
                >
                    {DIAGNOSIS_ITEMS.map((item) => (
                        <ProblemCard key={item.id} item={item} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

function ProblemCard({ item }: { item: typeof DIAGNOSIS_ITEMS[0] }) {
    return (
        <motion.div

            className={`group relative flex flex-col justify-between h-full p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:from-white/[0.05] hover:to-white/[0.01] transition-all duration-500 overflow-hidden ${item.colSpan}`}
        >
            {/* Hover Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent group-hover:ring-white/10 transition-all duration-500" />

            {/* Subtle Top Glow inside card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex-1">
                <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/20 group-hover:bg-zinc-800 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        {item.icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/10 backdrop-blur-sm">
                        {item.highlight}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-medium text-white mb-3 group-hover:text-zinc-100 transition-colors">
                    {item.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light group-hover:text-zinc-300 transition-colors">
                    {item.description}
                </p>
            </div>

            {/* Decorative 'Fix' Arrow that appears on hover */}
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-white/0 group-hover:text-red-400 transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <span>System Fix Available</span>
                <ArrowRight className="w-4 h-4" />
            </div>
        </motion.div>
    );
}