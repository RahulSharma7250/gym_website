"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PageTransition from "@/components/layout/PageTransition";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
const HOURS = ["6:00 AM", "8:00 AM", "12:00 PM", "5:30 PM", "7:00 PM"];

const MOCK_CLASSES = [
  { day: "MON", time: "6:00 AM", name: "HIIT BURN", coach: "SARAH V.", type: "hiit" },
  { day: "MON", time: "5:30 PM", name: "HEAVY LIFTS", coach: "MARCUS K.", type: "strength" },
  { day: "WED", time: "12:00 PM", name: "MMA SPARRING", coach: "TYLER D.", type: "mma" },
  { day: "FRI", time: "7:00 PM", name: "FIGHT NIGHT", coach: "TYLER D.", type: "mma" },
];

export default function SchedulePage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, delay: 0.8 });
      gsap.from(".sched-row", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, delay: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getTypeStyle = (type: string) => {
    if(type === 'strength') return 'bg-[#1a0500] text-fire-orange border-fire-orange';
    if(type === 'hiit') return 'bg-[#1a0000] text-fire-red border-fire-red';
    return 'bg-[#1a1000] text-[#FFAA00] border-[#FFAA00]';
  };

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pb-24">
        
        <div className="pt-40 px-6 text-center relative z-10 hero-text mb-16">
          <h1 className="font-bebas text-7xl md:text-9xl text-white">NEVER MISS A REP</h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
           <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-7 border-b border-fire-orange/50 py-4 font-barlow-condensed font-bold text-gray-500 tracking-widest text-center">
                 <div>TIME</div>
                 {DAYS.map(d => <div key={d} className="text-white">{d}</div>)}
              </div>

              {/* Rows */}
              {HOURS.map((h) => (
                <div key={h} className="sched-row grid grid-cols-7 border-b border-smoke text-center group transition-colors hover:bg-white/5">
                   <div className="py-8 font-barlow text-gray-400 flex items-center justify-center border-r border-smoke">{h}</div>
                   {DAYS.map(d => {
                     const cls = MOCK_CLASSES.find(c => c.day === d && c.time === h);
                     return (
                       <div key={d} className="p-2 border-r border-smoke last:border-0 relative flex items-center justify-center min-h-[100px]">
                         {cls && (
                           <div className={`w-full max-w-[140px] p-2 border ${getTypeStyle(cls.type)} flex flex-col justify-center items-center clip-diagonal hover:scale-105 transition-transform cursor-pointer relative z-10 group/card`}>
                             <span className="font-bebas text-lg leading-tight">{cls.name}</span>
                             <span className="font-barlow text-xs opacity-70 mt-1">{cls.coach}</span>
                             {/* Overlay book button */}
                             <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                                <span className="text-white font-barlow-condensed font-bold text-xs tracking-widest">BOOK NOW</span>
                             </div>
                           </div>
                         )}
                       </div>
                     )
                   })}
                </div>
              ))}
           </div>
        </div>

      </main>
    </PageTransition>
  );
}
