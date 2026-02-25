import React from 'react';
import { Star, Plus, ArrowUpRight } from 'lucide-react';

export function Testimonials() {
  return (
    <div className="relative bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-white/5">

      {/* --- Background Atmospherics --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.04]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- Centered Header --- */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-red-400 font-bold">Client Intelligence</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight">
            What Our <span className="text-zinc-500 italic font-light">Clients Say</span>
          </h2>

          <p className="max-w-xl text-zinc-500 text-sm md:text-lg leading-relaxed">
            Hear directly from healthcare providers who've transformed their practices with our solutions.
          </p>
        </div>

        {/* --- Testimonials Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <TestimonialCard
            quote="The AI automation transformed our intake. It's like having a 24/7 digital concierge that never misses a lead."
            delay="0"
          />
          <TestimonialCard
            quote="Our website conversion rate has tripled since working with Comacks. Their understanding of the healthcare space is unmatched."
            delay="100"
          />
          <TestimonialCard
            quote="The 'No Results, No Pay' guarantee made this a no-brainer for us. They delivered beyond our expectations."
            delay="200"
          />
        </div>

      </div>
    </div>
  );
}

function TestimonialCard({ quote, delay }: { quote: string, delay: string }) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className="group relative bg-[#080808] border border-white/5 p-8 md:p-10 rounded-2xl transition-all duration-500 hover:border-red-500/30 hover:-translate-y-2 flex flex-col justify-between"
    >
      {/* Subtle Card Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-100 rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            ))}
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-800 group-hover:text-red-500 transition-colors duration-300" />
        </div>

        <p className="text-zinc-300 font-normal text-lg md:text-xl leading-relaxed mb-4">
          <span className="text-red-500/40 text-4xl leading-[0] font-serif inline-block translate-y-2 mr-1">"</span>
          {quote}
        </p>
      </div>

      {/* Decorative Corner (Classy Touch) */}
      <div className="relative z-10 mt-8 flex items-center gap-2">
        <div className="h-px flex-grow bg-white/5 group-hover:bg-red-500/20 transition-colors"></div>
        <Plus className="w-3 h-3 text-zinc-800 group-hover:text-red-500 transition-all rotate-45" />
      </div>

      {/* Hover Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}