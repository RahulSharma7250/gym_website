"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import FireGlow from "@/components/ui/FireGlow";
import AngleButton from "@/components/ui/AngleButton";

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
  { id: "01", name: "STRENGTH TRAINING", duration: "12 WEEKS", level: "INTERMEDIATE", cals: "400-600", desc: "Build base level power and heavy lifts." },
  { id: "02", name: "HIIT CARDIO", duration: "8 WEEKS", level: "ALL LEVELS", cals: "600-900", desc: "Max heart rate. Max burn." },
  { id: "03", name: "MMA COMBAT", duration: "16 WEEKS", level: "ADVANCED", cals: "800-1200", desc: "Learn to strike. Build fighting endurance." },
  { id: "04", name: "CROSSFIT", duration: "ONGOING", level: "ADVANCED", cals: "700-1000", desc: "WODs designed to break you." },
  { id: "05", name: "YOGA & MOBILITY", duration: "ONGOING", level: "ALL LEVELS", cals: "200-400", desc: "Recover and stretch. Essential." },
  { id: "06", name: "POWERLIFTING", duration: "24 WEEKS", level: "ELITE", cals: "500", desc: "Focus purely on Squat, Bench, Deadlift." }
];

export default function ProgramsPage() {
  const [selectedProg, setSelectedProg] = useState<{ id: string; name: string; duration: string; level: string; cals: string; desc: string } | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { y: -50, opacity: 0, duration: 1, ease: "power2.out", delay: 0.8 });
      
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pb-24 relative overflow-hidden">
        
        {/* Full bg fire blur */}
        <FireGlow intensity="low" position="top" className="h-[80vh]" />

        <div className="pt-40 px-6 text-center relative z-10 hero-title mb-24">
          <h1 className="font-bebas text-7xl md:text-9xl text-white leading-none">FORGE YOUR<br/><span className="text-fire-orange">BODY</span></h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {PROGRAMS.map((prog, i) => (
             <div 
               key={prog.id}
               ref={el => { cardsRef.current[i] = el; }}
               className="group relative h-[350px] bg-[#050200] border border-white/5 clip-diagonal overflow-hidden cursor-pointer hover:border-fire-orange transition-colors"
               onClick={() => setSelectedProg(prog)}
             >
               {/* Huge BG Number */}
               <div className="absolute -bottom-10 right-0 font-bebas text-[200px] text-white opacity-5 select-none leading-none z-0 group-hover:scale-110 transition-transform duration-700">
                 {prog.id}
               </div>

               {/* Content front */}
               <div className="relative z-10 p-8 h-full flex flex-col">
                  <h2 className="font-bebas text-4xl text-white mb-4">{prog.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-auto">
                    <span className="bg-[#1a0500] text-fire-orange font-barlow-condensed text-xs px-2 py-1 tracking-widest">{prog.duration}</span>
                    <span className="bg-[#1a0500] text-fire-orange font-barlow-condensed text-xs px-2 py-1 tracking-widest">{prog.level}</span>
                    <span className="bg-[#1a0500] text-fire-orange font-barlow-condensed text-xs px-2 py-1 tracking-widest">{prog.cals} CALS</span>
                  </div>
                  
                  {/* Overlay content revealing on hover */}
                  <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4">
                     <p className="font-barlow text-gray-400 mb-4">{prog.desc}</p>
                     <span className="text-fire-orange font-barlow-condensed font-bold tracking-widest text-sm">VIEW DETAILS &rarr;</span>
                  </div>
               </div>
             </div>
          ))}
        </div>

        {/* Modal via Framer Motion AnimatePresence */}
        <AnimatePresence>
          {selectedProg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 50 }}
                className="bg-[#0A0400] border border-fire-orange w-full max-w-2xl clip-diagonal p-10 relative shadow-[0_0_50px_rgba(255,102,0,0.2)]"
              >
                <button 
                  onClick={() => setSelectedProg(null)}
                  className="absolute top-6 right-6 text-white hover:text-fire-orange transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                </button>
                <div className="font-bebas text-7xl text-fire-orange/10 absolute top-4 left-6 pointer-events-none">{selectedProg.id}</div>
                <h2 className="font-bebas text-5xl text-white mb-6 relative z-10">{selectedProg.name}</h2>
                <div className="font-barlow text-gray-300 space-y-4 mb-8 text-lg">
                  <p>{selectedProg.desc}</p>
                  <p>In this program you will be tested. It runs for {selectedProg.duration} and expects a {selectedProg.level} dedication. Average burn is {selectedProg.cals} per session.</p>
                </div>
                <div className="flex gap-4 border-t border-smoke pt-8">
                  <AngleButton label="ENROLL NOW" variant="primary" />
                  <AngleButton label="VIEW SCHEDULE" variant="outline" onClick={() => setSelectedProg(null)} href="/schedule" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </PageTransition>
  );
}
