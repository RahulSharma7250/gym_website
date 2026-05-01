"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmberParticles from "@/components/ui/EmberParticles";
import AngleButton from "@/components/ui/AngleButton";
import Magnetic from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function JoinCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const textTitle = "ARE YOU READY?";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-char", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: -150, opacity: 0, scale: 2, rotateX: 90,
        duration: 0.8, stagger: 0.04, ease: "back.out(2)"
      });

      gsap.from(".cta-sub", {
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        y: 40, opacity: 0, duration: 1, delay: 0.6
      });

      gsap.from(".cta-form", {
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        y: 60, opacity: 0, scale: 0.95, duration: 0.8, delay: 0.8
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-48 bg-deep-black overflow-hidden flex flex-col items-center justify-center text-center clip-diagonal">
      {/* Intense fire bg layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,34,0,0.5)_0%,rgba(8,4,0,1)_60%)] fire-flicker" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,102,0,0.3)_0%,transparent_50%)]" />
      <div className="absolute inset-0 fire-bg-shift opacity-15" />
      <div className="absolute inset-0 z-0">
        <EmberParticles />
      </div>

      <div className="relative z-10 px-6 max-w-3xl flex flex-col items-center" style={{ perspective: "800px" }}>
        <h2 className="font-bebas text-6xl md:text-[120px] leading-none mb-4 flex flex-wrap justify-center">
          {textTitle.split("").map((char, i) => (
            <span key={i} className="cta-char inline-block text-fire-gradient drop-shadow-[0_0_40px_rgba(255,34,0,0.8)]"
              style={{ minWidth: char === " " ? "0.3em" : "auto" }}>{char}</span>
          ))}
        </h2>

        <p className="cta-sub font-barlow text-xl text-white/60 mb-14 max-w-lg">
          Your potential is waiting on the other side of pain. Step into the Inferno and never look back.
        </p>

        <form className="cta-form w-full max-w-md flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 glass-dark text-white font-barlow px-6 py-4 outline-none focus:border-fire-orange focus:shadow-[0_0_20px_rgba(255,102,0,0.15)] transition-all"
          />
          <Magnetic>
            <AngleButton label="IGNITE" />
          </Magnetic>
        </form>
      </div>
    </section>
  );
}
