"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";
import AngleButton from "@/components/ui/AngleButton";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  { name: "THE CUT", desc: "Strip fat. Maintain muscle.", p: 40, c: 30, f: 30, cals: "1800-2200" },
  { name: "MAINTAIN", desc: "Fuel performance. Stay sharp.", p: 30, c: 40, f: 30, cals: "2400-2800" },
  { name: "THE BULK", desc: "Build mass. Lift heavier.", p: 25, c: 50, f: 25, cals: "3200-3800" }
];

export default function NutritionPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, ease: "power2.out", delay: 0.8 });
      gsap.from(".plan-card", {
        scrollTrigger: { trigger: ".plans-container", start: "top 80%" },
        y: 80, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
      });
      // Animate macro bars
      gsap.from(".macro-bar", {
        scrollTrigger: { trigger: ".plans-container", start: "top 70%" },
        scaleX: 0, duration: 1, stagger: 0.1, ease: "power3.out", transformOrigin: "left"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pb-24 relative overflow-hidden">
        {/* Amber Glow Layer */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(255,170,0,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="pt-40 px-6 text-center relative z-10 hero-text mb-24">
          <h1 className="font-bebas text-7xl md:text-9xl text-white leading-none">FUEL THE <span className="text-fire-amber">FIRE</span></h1>
          <p className="font-barlow-condensed text-xl tracking-widest text-[#FFAA00] mt-4">YOU CANNOT OUT-TRAIN A BAD DIET.</p>
        </div>

        <div className="plans-container max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {PLANS.map((plan, i) => (
            <div key={i} className="plan-card bg-[#0d0700] p-8 border border-[#FFAA00]/20 clip-diagonal hover:border-[#FFAA00]/60 transition-colors">
               <h2 className="font-bebas text-4xl text-white mb-2">{plan.name}</h2>
               <p className="font-barlow text-gray-400 mb-6">{plan.desc}</p>
               <div className="text-fire-amber font-barlow-condensed text-xl mb-6">{plan.cals} CALS</div>
               
               <div className="space-y-4">
                 <div>
                    <div className="flex justify-between font-barlow-condensed text-sm text-gray-300 mb-1">
                      <span>PROTEIN</span><span>{plan.p}%</span>
                    </div>
                    <div className="w-full bg-black h-2"><div className="macro-bar h-full bg-fire-amber" style={{ width: `${plan.p}%` }}></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between font-barlow-condensed text-sm text-gray-300 mb-1">
                      <span>CARBS</span><span>{plan.c}%</span>
                    </div>
                    <div className="w-full bg-black h-2"><div className="macro-bar h-full bg-[#FF6600]" style={{ width: `${plan.c}%` }}></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between font-barlow-condensed text-sm text-gray-300 mb-1">
                      <span>FATS</span><span>{plan.f}%</span>
                    </div>
                    <div className="w-full bg-black h-2"><div className="macro-bar h-full bg-[#FF2200]" style={{ width: `${plan.f}%` }}></div></div>
                 </div>
               </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto mt-32 px-6 text-center">
          <h3 className="font-bebas text-5xl text-white mb-6">GET YOUR CUSTOM PLAN</h3>
          <p className="font-barlow text-gray-400 mb-8">Work with our elite nutritionists to dial in your macros based on your specific training goals.</p>
          <AngleButton label="START NUTRITION ASSESSMENT" />
        </div>

      </main>
    </PageTransition>
  );
}
