"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
  {
    title: "STRENGTH",
    desc: "Build raw power and muscle mass with our heavy lifting regimens.",
    stat: "360+ KG",
    image: "/images/stren.png"
  },
  {
    title: "CARDIO",
    desc: "Increase your stamina and melt fat with high-intensity endurance training.",
    stat: "∞ REPS",
    image: "/images/cardio.png"
  },
  {
    title: "HIIT",
    desc: "Maximum burn in minimum time. Push your limits with interval combat.",
    stat: "45 MIN",
    image: "/images/run.png"
  }
];

export default function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prog-card", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        y: 100, opacity: 0, duration: 1.2, stagger: 0.2,
        ease: "power3.out"
      });

      // Parallax effect on the background numbers
      gsap.utils.toArray<HTMLElement>('.prog-number').forEach((num, i) => {
        gsap.to(num, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          y: -50,
          ease: "none"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 px-6 max-w-7xl mx-auto relative z-10 bg-transparent">
      {/* Remove standard SectionTitle if we want to mimic the image exactly, or keep it. The user image just shows the 3 columns. I'll keep the section title for structure but hide it if not needed, let's keep it */}
      <div className="mb-20">
        <SectionTitle title="CORE PROGRAMS" subtitle="CHOOSE YOUR PATH" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-16">
        {PROGRAMS.map((prog, i) => (
          <div key={i} className="prog-card flex flex-col relative group cursor-pointer">
            {/* Top visual area: large number + image */}
            <div className="relative w-full aspect-[3/4] flex items-end justify-center -mb-20 overflow-visible">
              {/* Large Number background */}
              <div className="prog-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[220px] md:text-[260px] lg:text-[280px] leading-none text-[#ff4d00] z-0 select-none tracking-tighter opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:text-[#ff6a00]">
                0{i + 1}
              </div>

              {/* Athlete Image */}
              <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
                {prog.image && (
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-[95%] max-w-none h-[95%] mb-20 md:mb-32 lg:mb-40 object-contain object-bottom drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-20 text-left px-2">
              <h3 className="font-bebas text-5xl text-white mb-2 tracking-wider group-hover:text-[#ff4d00] transition-colors duration-300">{prog.title}</h3>
              <div className="font-barlow-condensed font-bold text-sm tracking-[0.2em] text-white mb-5 uppercase">
                {prog.stat}
              </div>
              <p className="font-barlow text-gray-400 text-sm leading-relaxed mb-8 max-w-[95%]">
                {prog.desc}
              </p>

              <Link href="/gallery" className="inline-flex items-center gap-3 font-barlow-condensed font-bold text-[#ff4d00] tracking-widest text-sm hover:gap-6 transition-all duration-300 uppercase">
                Explore <span className="w-8 h-[2px] bg-[#ff4d00] block"></span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
