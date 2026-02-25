"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Magnet, Zap, Workflow, RefreshCw, BarChart3, CheckCircle2 } from "lucide-react";


const STEPS = [
    {
        id: "01",
        title: "Controlled Patient Attraction",
        desc: "We attract the right patients only when your system is ready — so leads don’t just arrive and leak.",
        icon: <Magnet className="w-5 h-5" />,
    },
    {
        id: "02",
        title: "Instant Response & Booking",
        desc: "Every enquiry gets an instant response — no waiting, no lost patients. This directly connects to revenue health.",
        icon: <Zap className="w-5 h-5" />,
    },
    {
        id: "03",
        title: "Automation & Follow-Up",
        desc: "Automated reminders, follow-ups, and review requests mean no-shows stop costing money.",
        icon: <Workflow className="w-5 h-5" />,
    },
    {
        id: "04",
        title: "Retention & Reactivation",
        desc: "Old patients don’t disappear — the system brings them back automatically.",
        icon: <RefreshCw className="w-5 h-5" />,
    },
    {
        id: "05",
        title: "Visibility & Control",
        desc: "A single view of truth — know appointments, sources, revenue, and patient behavior in one place.",
        icon: <BarChart3 className="w-5 h-5" />,
    },
];

export function SystemNarrative() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress relative to this specific section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    // Smooth out the scroll progress for the filling line
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section
            ref={containerRef}
            id="how-it-works"
            className="relative bg-[#050505] text-white py-32 overflow-hidden"
        >

            {/* Background Decorators */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                            Workflow Architecture
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 text-white">
                        From Chaos to <span className="text-zinc-500">Clockwork.</span>
                    </h2>
                    <p className="text-zinc-400 font-light leading-relaxed max-w-xl mx-auto text-balance">
                        We don't just "do marketing". We install a controlled patient flow infrastructure that operates 24/7.
                    </p>
                </div>

                {/* --- TIMELINE CONTAINER --- */}
                <div className="relative max-w-5xl mx-auto">

                    {/* THE SPINE (Vertical Line) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
                        {/* The Active Filling Line (Red) */}
                        <motion.div
                            style={{ scaleY, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-500 via-red-900 to-transparent h-full"
                        />
                    </div>

                    <div className="space-y-24 relative">
                        {STEPS.map((step, index) => (
                            <TimelineItem
                                key={step.id}
                                item={step}
                                index={index}
                                isLast={index === STEPS.length - 1}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index, isLast }: { item: typeof STEPS[0], index: number, isLast: boolean }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>

            {/* --- CENTER NODE (The Dot) --- */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border border-white/20 z-20 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>

            {/* --- CONNECTOR LINE (Horizontal) --- */}
            <div className={`hidden md:block absolute top-1/2 w-[calc(50%-2rem)] h-px bg-gradient-to-r from-white/10 to-transparent ${isEven ? "right-1/2 origin-right" : "left-1/2 origin-left"}`} />

            {/* Mobile Connector */}
            <div className="md:hidden absolute left-8 top-8 bottom-[-4rem] w-px border-l border-dashed border-white/10 ml-[1px]" />


            {/* --- CONTENT CARD --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
            >

                {/* Step Number & Icon Header */}
                <div className={`flex items-center gap-4 mb-4 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white shadow-inner">
                        {item.icon}
                    </div>
                    {/* FIXED: Changed text-white/5 to text-zinc-800 for visibility and added group-hover */}
                    <span className="text-4xl font-mono font-bold text-zinc-800 tracking-tighter select-none transition-colors duration-500 group-hover:text-red-500/20">
                        {item.id}
                    </span>
                </div>

                {/* Text Content */}
                <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                    {item.title}
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                    {item.desc}
                </p>

                {/* Decorative corner bracket */}
                <div className={`absolute top-0 w-8 h-8 border-t border-white/10 ${isEven ? "md:right-0 md:border-r rounded-tr-xl" : "md:left-0 md:border-l rounded-tl-xl"} hidden md:block`} />

            </motion.div>

            {/* Spacer for symmetry */}
            <div className="w-full md:w-[45%]" />

        </div>
    );
}