"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";
import EmberParticles from "@/components/ui/EmberParticles";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["ALL", "STRENGTH", "CARDIO", "MMA", "CROSSFIT"];
const ATHLETES = [
  { name: "ARJUN REDDY", tag: "STRENGTH", stats: { weight: "225KG DL", exp: "8 YRS", wins: "12" }, bg: "from-fire-red to-deep-black" },
  { name: "NEHA SHARMA", tag: "CARDIO", stats: { weight: "MARATHON", exp: "5 YRS", wins: "4" }, bg: "from-fire-orange to-deep-black" },
  { name: "KABIR DASS", tag: "MMA", stats: { weight: "84KG CL", exp: "10 YRS", wins: "24-0" }, bg: "from-fire-amber to-deep-black" },
  { name: "TARA MEHTA", tag: "CROSSFIT", stats: { weight: "TOP 50", exp: "4 YRS", wins: "6" }, bg: "from-fire-red to-[#1A0A00]" },
  { name: "RISHABH JAIN", tag: "STRENGTH", stats: { weight: "270KG SQ", exp: "12 YRS", wins: "18" }, bg: "from-[#1A0A00] to-fire-orange" },
  { name: "AMAN VERMA", tag: "MMA", stats: { weight: "70KG CL", exp: "6 YRS", wins: "15-2" }, bg: "from-[#3D2010] to-fire-red" }
];

export default function Athletes() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero aniamtion
      gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Fiter Re-Animate
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
    );
  }, [activeFilter]);

  const filtered = activeFilter === "ALL" ? ATHLETES : ATHLETES.filter(a => a.tag === activeFilter);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pt-32 pb-24">
        
        {/* Hero */}
        <div className="relative w-full h-[40vh] flex items-center justify-center text-center clip-diagonal bg-[#0a0300] border-y border-fire-orange/20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,102,0,0.3)_0%,transparent_60%)] z-0" />
          <EmberParticles />
          <div className="relative z-10 hero-text">
            <h1 className="font-bebas text-6xl md:text-8xl text-white tracking-wide" style={{ textShadow: "0 0 30px rgba(255,34,0,0.8)" }}>MEET THE BEASTS</h1>
            <p className="font-barlow-condensed font-bold tracking-widest text-fire-orange mt-2">NO WEAKNESS ALLOWED</p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-4">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-barlow-condensed font-bold text-sm tracking-widest px-6 py-2 transition-all clip-angle ${activeFilter === f ? 'bg-fire-orange text-deep-black' : 'bg-transparent text-gray-500 border border-gray-800 hover:text-white hover:border-fire-orange'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1500px" }}>
          {filtered.map((athlete, i) => (
            <div key={`${athlete.name}-${i}`} className="group relative h-[400px] w-full clip-diagonal cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Front side */}
              <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-end p-8 bg-gradient-to-t ${athlete.bg} border border-white/5 transition-transform duration-700 group-hover:[transform:rotateY(180deg)]`}>
                 <span className="mb-auto inline-block bg-white/10 px-3 py-1 font-barlow text-xs text-white clip-diagonal">{athlete.tag}</span>
                 <h2 className="font-bebas text-5xl text-white mix-blend-overlay mt-auto z-[2]">{athlete.name}</h2>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />
              </div>

              {/* Back side */}
              <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] flex flex-col justify-center p-8 bg-[#0a0500] border border-fire-orange transition-transform duration-700 group-hover:[transform:rotateY(360deg)] text-center">
                 <h3 className="font-bebas text-3xl text-fire-orange mb-6">{athlete.name}</h3>
                 <div className="space-y-4 font-barlow-condensed text-xl tracking-wider text-gray-300">
                    <div><span className="block text-sm text-gray-500 mb-1">RECORD/LIFT</span> {athlete.stats.weight}</div>
                    <div><span className="block text-sm text-gray-500 mb-1">EXPERIENCE</span> {athlete.stats.exp}</div>
                    <div><span className="block text-sm text-gray-500 mb-1">WINS/AWARDS</span> {athlete.stats.wins}</div>
                 </div>
              </div>

            </div>
          ))}
        </div>

      </main>
    </PageTransition>
  );
}
