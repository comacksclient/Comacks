"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- TYPES & DATA ---
interface DiagnosticQuestion {
    id: number;
    label: string;
    question: string;
    leakDescription: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
    {
        id: 1,
        label: "After-Hours Coverage",
        question: "Is your phone line answered by a human 24/7?",
        leakDescription: "Missed calls after 5PM result in an average 30% revenue loss.",
    },
    {
        id: 2,
        label: "Lead Capture",
        question: "Do walk-ins automatically enter a CRM database?",
        leakDescription: "Paper records mean zero retargeting and lost patient lifetime value.",
    },
    {
        id: 3,
        label: "Recall Automation",
        question: "Does software auto-book 6-month checkups?",
        leakDescription: "Manual recall relies on staff memory, causing empty chairs.",
    },
];

export function Diagnostics() {
    // State: Default to 'false' (Problems exist) to encourage interaction
    const [answers, setAnswers] = useState<Record<number, boolean>>({
        1: false,
        2: false,
        3: false,
    });
    const [score, setScore] = useState(0);

    // Calculate "Health Score" (0-3)
    useEffect(() => {
        const yesCount = Object.values(answers).filter(Boolean).length;
        setScore(yesCount);
    }, [answers]);

    const isCritical = score < 3;

    const toggleAnswer = (id: number) => {
        setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section id="diagnostics" className="relative bg-[#050505] py-24 md:py-32 overflow-hidden">
            {/* --- AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                {/* Dynamic Glow based on overall score */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] blur-[150px] opacity-10 rounded-full transition-colors duration-1000 ${isCritical ? "bg-red-600" : "bg-emerald-500"
                        }`}
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* --- HEADER --- */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.div
                            layout
                            className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border mb-8 transition-colors duration-700 backdrop-blur-md ${isCritical
                                    ? "border-red-900/30 bg-red-900/10 text-red-300"
                                    : "border-emerald-900/30 bg-emerald-900/10 text-emerald-300"
                                }`}
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritical ? "bg-red-500" : "bg-emerald-500"}`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isCritical ? "bg-red-500" : "bg-emerald-500"}`}></span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                                {isCritical ? "System Vulnerability Detected" : "System Secure"}
                            </span>
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">
                            Clinic Flow <span className="text-zinc-500">Assessment.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg font-light max-w-xl mx-auto text-balance">
                            Tap the toggles below to reflect your current operations. Instantly reveal where your revenue is leaking.
                        </p>
                    </div>

                    {/* --- INTERACTIVE GRID --- */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {DIAGNOSTIC_QUESTIONS.map((q) => (
                            <DiagnosticCard
                                key={q.id}
                                data={q}
                                isActive={answers[q.id]}
                                onToggle={() => toggleAnswer(q.id)}
                            />
                        ))}
                    </div>

                    {/* --- RESULTS DASHBOARD --- */}
                    <motion.div
                        layout
                        className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Subtle inner dashboard glow */}
                        <div className={`absolute -inset-x-20 -top-20 h-40 opacity-20 blur-[60px] transition-colors duration-1000 ${isCritical ? 'bg-red-500' : 'bg-emerald-500'}`} />

                        <div className="flex-1 w-full space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl transition-colors duration-700 ${isCritical ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {isCritical ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                                    {isCritical ? "Revenue Leakage Detected" : "Systems Optimized"}
                                </h3>
                            </div>

                            <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(score / 3) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                    className={`h-full rounded-full transition-colors duration-700 ${isCritical ? "bg-red-500" : "bg-emerald-500"}`}
                                />
                            </div>

                            <p className="text-zinc-400 font-light text-base h-6">
                                {score === 0 && "Your clinic is operating blindly. High risk of immediate revenue loss."}
                                {score === 1 && "Critical gaps exist in your patient capture and retention systems."}
                                {score === 2 && "Performing well, but missing one key automation layer for scale."}
                                {score === 3 && "Your operational systems are tight. You are ready for aggressive scaling."}
                            </p>
                        </div>

                        <div className="flex-shrink-0 w-full lg:w-auto relative z-10">
                            <Button
                                className={`w-full lg:w-auto h-14 px-8 rounded-full text-black font-bold tracking-widest uppercase text-xs transition-all duration-300 hover:scale-105 ${isCritical
                                        ? "bg-white hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                                        : "bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.2)]"
                                    }`}
                                asChild
                            >
                                <Link href="/contact" className="flex items-center justify-center">
                                    {isCritical ? "Get Rescue Plan" : "Scale Your Clinic"}
                                    <ArrowRight className="w-4 h-4 ml-3" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

// --- SUB-COMPONENT: The Interactive Card ---
interface DiagnosticCardProps {
    data: DiagnosticQuestion;
    isActive: boolean;
    onToggle: () => void;
}

function DiagnosticCard({ data, isActive, onToggle }: DiagnosticCardProps) {
    return (
        <div
            onClick={onToggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle();
                }
            }}
            role="switch"
            aria-checked={isActive}
            tabIndex={0}
            className={`cursor-pointer group relative flex flex-col p-8 rounded-3xl border transition-all duration-500 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-h-[280px] ${isActive
                    ? "bg-emerald-950/10 border-emerald-500/30 hover:border-emerald-500/50"
                    : "bg-white/[0.02] border-white/10 hover:border-red-500/30"
                }`}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 opacity-20 transition-opacity duration-700 bg-gradient-to-br ${isActive ? "from-emerald-500/10 to-transparent" : "from-white/5 group-hover:from-red-500/10 to-transparent"
                }`} />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header & Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        0{data.id} // {data.label}
                    </span>

                    {/* Animated Toggle Switch */}
                    <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-500 ${isActive ? "bg-emerald-500 justify-end" : "bg-zinc-800 justify-start"}`}>
                        <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 40 }}
                            className="w-4 h-4 rounded-full bg-white shadow-sm"
                        />
                    </div>
                </div>

                {/* Question */}
                <h4 className={`text-xl md:text-lg lg:text-xl font-medium mb-6 transition-colors duration-500 ${isActive ? "text-emerald-50" : "text-white group-hover:text-zinc-200"}`}>
                    {data.question}
                </h4>

                {/* Status Indicator - Fixed height container to prevent jumping */}
                <div className="mt-auto pt-6 border-t border-white/5 h-[80px] flex items-end">
                    <AnimatePresence mode="wait">
                        {isActive ? (
                            <motion.div
                                key="safe"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-2 text-emerald-400 w-full"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">System Active</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="danger"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-2 w-full"
                            >
                                <div className="flex items-center gap-2 text-red-400/90">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Leak Detected</span>
                                </div>
                                <p className="text-sm text-zinc-500 leading-relaxed font-light">
                                    {data.leakDescription}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}