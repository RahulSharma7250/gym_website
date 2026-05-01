"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";
import AngleButton from "@/components/ui/AngleButton";
import EmberParticles from "@/components/ui/EmberParticles";

gsap.registerPlugin(ScrollTrigger);

const COACHES = [
  { name: "MARCUS KANE", bio: "Former champion powerlifter finding perfect form.", initials: "MK", exp: "12 YRS" },
  { name: "SARAH VOSS", bio: "Elite mobility and HIIT coach. High energy.", initials: "SV", exp: "8 YRS" },
  { name: "TYLER DURD", bio: "Combat specialist. Muay Thai and BJJ.", initials: "TD", exp: "15 YRS" },
  { name: "ALINA ROST", bio: "Agility and track conditioning.", initials: "AR", exp: "6 YRS" },
  { name: "JIMMY CRANE", bio: "Strength and conditioning for field athletes.", initials: "JC", exp: "9 YRS" },
  { name: "ZARA LEO", bio: "Yoga and post-injury recovery.", initials: "ZL", exp: "10 YRS" },
];

export default function CoachesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, delay: 0.8 });
      
      const texts = gsap.utils.toArray(".section-text-anim");
      texts.forEach((text) => {
        gsap.fromTo(text as HTMLElement,
          { y: 40, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: text as HTMLElement, start: "top 85%" },
            y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out"
          }
        );
      });

      const cards = gsap.utils.toArray(".coach-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card as HTMLElement,
          { y: 60, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: card as HTMLElement, start: "top 85%" },
            y: 0, autoAlpha: 1, duration: 0.8, delay: (i % 3) * 0.15, ease: "power2.out"
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pb-24 text-white">

        {/* ── Hero ── */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden bg-[url('/images/bg.png')] bg-cover bg-center">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.15)_0%,transparent_60%)]" />

          <EmberParticles />

          {/* Subtle background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
            <h2 className="font-bebas text-[25vw] italic leading-none whitespace-nowrap text-white">INFERNO</h2>
          </div>

          <div className="relative z-10 flex flex-col items-center hero-text">
            {/* Logo */}
            <div className="mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35L5 10H35L20 35Z" stroke="#FF6600" strokeWidth="2" fill="rgba(255,102,0,0.2)"/>
                <path d="M12 14L20 28L28 14H12Z" fill="#FF6600"/>
              </svg>
            </div>

            <h1 className="font-bebas text-7xl md:text-9xl leading-none italic uppercase tracking-wider" style={{ textShadow: "0 0 40px rgba(255,102,0,0.4)" }}>
              MEET THE <span className="text-[#FF6600]">COACHES</span>
            </h1>

            <div className="mt-8 flex flex-col items-center w-full">
              {/* Divider with triangle */}
              <div className="flex items-center w-full max-w-[600px] gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FF6600]"></div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF6600]"></div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FF6600]"></div>
              </div>
              <p className="font-barlow-condensed font-bold tracking-[8px] text-sm md:text-base text-gray-300">
                TRAINED BY THE <span className="text-[#FF6600]">BEST</span>. PUSHED TO THE LIMIT.
              </p>
            </div>
          </div>
        </section>


        <section className="relative py-24 px-6 max-w-7xl mx-auto bg-[#050505]">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end mb-16 section-text-anim">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-barlow-condensed font-bold tracking-widest text-[#FF6600] text-sm uppercase">THE TEAM</h3>
                <div className="h-[1px] w-24 bg-[#FF6600] relative">
                  <div className="absolute right-0 top-[-3px] w-2 h-[1px] bg-[#FF6600] origin-right rotate-45"></div>
                </div>
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl italic leading-none uppercase">OUR EXPERT COACHES</h2>
              <p className="mt-6 text-gray-400 font-barlow text-lg max-w-md">
                Our coaches have been through the fire. They are here to guide you, push you, and ensure you reach your maximum potential.
              </p>
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative mt-12">
            {COACHES.map((coach, i) => (
               <div
                  key={i}
                  className="coach-card relative group transition-all duration-300 flex flex-col items-center pt-10 pb-8 px-6 text-center"
                  style={{
                    background: "#0c0c0c",
                    border: "1px solid rgba(255,102,0,0.18)",
                    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  {/* Left orange glow bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6600]/80 via-[#FF6600]/40 to-transparent" />
                  {/* Bottom orange glow bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6600]/60 via-[#FF6600]/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Decorative orange tick marks top-right */}
                  <div className="absolute top-4 right-5 flex flex-col items-end gap-[5px]">
                    <div className="w-6 h-[2px] bg-[#FF6600] opacity-60 rotate-[-40deg] origin-right" />
                    <div className="w-4 h-[2px] bg-[#FF6600] opacity-40 rotate-[-40deg] origin-right" />
                  </div>

                  {/* CSS Avatar Initials */}
                  <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(255,102,0,0.35)] mb-6"
                       style={{
                         background: "#080808",
                         border: "1.5px solid rgba(255,102,0,0.35)",
                         boxShadow: "0 0 0 6px rgba(255,102,0,0.06)",
                       }}
                  >
                     <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a0a00] to-[#FF6600] flex items-center justify-center relative">
                        <span className="font-bebas text-4xl text-white mix-blend-overlay">{coach.initials}</span>
                     </div>
                  </div>

                  <h3 className="font-bebas text-3xl italic tracking-wide text-white mb-1 leading-tight">{coach.name}</h3>
                  <span className="font-barlow-condensed font-bold text-[#FF6600] tracking-widest text-sm mb-4 uppercase">{coach.exp} EXPERIENCE</span>

                  <p className="text-gray-400 text-sm leading-relaxed font-barlow mb-8 flex-1">
                    {coach.bio}
                  </p>

                  <button className="font-barlow-condensed font-bold tracking-widest text-sm py-3 px-6 w-full border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-black transition-colors duration-300 mt-auto">
                    BOOK SESSION
                  </button>
               </div>
            ))}
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
