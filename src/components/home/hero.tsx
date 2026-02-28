"use client";

import { Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Globe from '../spline';

export function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-center font-sans">

      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0 bg-[#050505]">


        <div className="absolute top-[55%] md:top-1/2 -translate-y-1/2 right-[-25%] md:right-[-35%] lg:right-[-15%] w-[500px] h-[500px] md:w-[1000px] md:h-[1000px] lg:w-[1200px] lg:h-[1200px] z-0 pointer-events-auto opacity-80 mix-blend-screen">
          <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="w-full h-full relative flex items-center justify-center">
            <Globe />
          </div>
        </div>

        {/* --- Gradient Overlays --- */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505] via-40% to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay z-10 pointer-events-none"></div>
      </div>

      {/* --- UI Decorative Elements --- */}
      <div className="absolute top-0 bottom-0 left-6 md:left-11 w-[1px] bg-white/5 z-10 hidden md:block pointer-events-none"></div>
      <div className="absolute top-32 left-4 md:left-8 text-zinc-700 z-20 pointer-events-none">
        <Plus strokeWidth={1} className="w-6 h-6" />
      </div>
      <div className="absolute bottom-12 left-4 md:left-8 text-zinc-700 z-20 pointer-events-none">
        <Plus strokeWidth={1} className="w-6 h-6" />
      </div>

      {/* --- Main Text Content --- */}
      <div className="relative z-30 container mx-auto px-8 md:px-16 pt-8 pointer-events-none">
        <div className="max-w-4xl">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 pointer-events-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold">
              Clinical Growth Engine
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-[1] md:leading-[0.95] mb-8 text-white pointer-events-auto">
            Grow Your Clinic<br />
            on Autopilot
          </h1>

          <p className="text-sm md:text-lg text-zinc-400 font-light max-w-2xl mb-10 leading-relaxed pointer-events-auto">
            <span >AI Powered Systems That Attract, Convert, and Retain Patients,</span>
            <br />
            <span >While You Focus on Care.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-8 pointer-events-auto">
            <Button className="h-12 px-6 w-full sm:w-auto rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all duration-300 text-sm tracking-widest uppercase font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] asChild">
              <Link href="/contact">Apply for Diagnosis</Link>
            </Button>

            <Link href="#how-it-works" className="group flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-500 cursor-pointer hover:text-white transition-colors">
              See How the System Works
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}