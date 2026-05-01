"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_ITEMS = [
  { title: "THE FORGE", sub: "12,000 sq ft of iron", image: "/images/facility_forge.png", num: "01" },
  { title: "MMA CAGE", sub: "Full octagon combat zone", image: "/images/facility_mma.png", num: "02" },
  { title: "CARDIO BAY", sub: "Assault bikes & rowers", image: "/images/facility_cardio.png", num: "03" },
  { title: "RECOVERY", sub: "Ice baths & saunas", image: "/images/facility_recovery.png", num: "04" },
  { title: "THE PIT", sub: "Powerlifting platforms", image: "/images/facility_pit.png", num: "05" },
];

// HUD Corner bracket SVG
function HudBracket({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M0 15 L0 0 L15 0" stroke="#ff4d00" strokeWidth="2.5" />
    </svg>
  );
}

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const totalScroll = trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "#111111" }}>

      {/* Subtle grid/texture overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,77,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* HUD decorative lines — top right */}
      <div className="absolute top-0 right-0 w-48 h-48 z-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 180 180" fill="none">
          <line x1="60" y1="8" x2="180" y2="8" stroke="#ff4d00" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
          <line x1="172" y1="8" x2="172" y2="80" stroke="#ff4d00" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
          <line x1="90" y1="24" x2="180" y2="24" stroke="#ff4d00" strokeWidth="0.5" opacity="0.25" />
        </svg>
      </div>

      {/* Section Header — top left */}
      <div className="absolute top-8 left-10 z-20 pointer-events-none">
        <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wider" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>
          THE FACILITY
        </h2>
        <p className="font-barlow-condensed text-[#ff4d00] tracking-[0.3em] text-xs mt-2 uppercase">
          SCROLL TO EXPLORE →
        </p>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen gap-8 px-6 md:px-10 pl-[10vw] md:pl-[28vw] pt-20 md:pt-32"
        style={{ willChange: "transform" }}
      >
        {SHOWCASE_ITEMS.map((item, i) => (
          <div
            key={i}
            className="hscroll-card flex-shrink-0 relative group w-[85vw] md:w-[45vw] lg:w-[38vw] h-[50vh] md:h-[62vh]"
          >
            {/* Large number — floating above each card */}
            <div
              className="absolute -top-14 right-4 font-bebas text-[clamp(60px,8vw,120px)] text-[#FF6600] leading-none select-none z-20 pointer-events-none"
            >
              {item.num}
            </div>

            {/* Card image */}
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                />
              )}
              {/* Dark overlay when no image */}
              {!item.image && (
                <div className="w-full h-full bg-[#1a1a1a]" />
              )}
              {/* Bottom gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* HUD corner brackets */}
            <HudBracket className="absolute top-2 left-2 z-10" />
            <HudBracket className="absolute top-2 right-2 z-10 rotate-90" />
            <HudBracket className="absolute bottom-2 left-2 z-10 -rotate-90" />
            <HudBracket className="absolute bottom-2 right-2 z-10 rotate-180" />

            {/* Orange border glow on hover */}
            <div className="absolute inset-0 rounded-sm border border-[#ff4d00]/0 group-hover:border-[#ff4d00]/60 transition-all duration-500 z-10" />

            {/* Card content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <h3 className="font-bebas text-4xl md:text-5xl text-[#ff4d00] tracking-wider leading-none">
                {item.title}
              </h3>
              <p className="font-barlow text-white/70 text-sm mt-2 tracking-wide">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
