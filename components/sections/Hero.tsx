"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmberParticles from "@/components/ui/EmberParticles";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleBurnRef = useRef<HTMLDivElement>(null);
  const titleEverythingRef = useRef<HTMLDivElement>(null);
  const athleteRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Dramatic cinematic entrance
      tl.set(heroRef.current, { opacity: 1 })
        // Fire flash
        .fromTo(".fire-flash", { opacity: 1 }, { opacity: 0, duration: 0.6 }, 0)
        // Giant text slides in
        .fromTo(titleBurnRef.current,
          { x: -400, opacity: 0, skewX: -15 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.4 }, 0.3)
        .fromTo(titleEverythingRef.current,
          { x: 400, opacity: 0, skewX: 15 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.4 }, 0.3)
        // Outline text fades in shifted
        .fromTo(outlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, 0.8)
        // Athlete scales up from below
        .fromTo(athleteRef.current,
          { scale: 0.6, y: 120, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 1.8, ease: "power3.out" }, 0.5)
        // Subtitle
        .fromTo(subtitleRef.current,
          { y: 30, opacity: 0, letterSpacing: "0.5em" },
          { y: 0, opacity: 1, letterSpacing: "0.3em", duration: 1 }, 1.2)
        // Bottom cards
        .from(".hero-card", { y: 120, opacity: 0, rotateX: 30, duration: 1, stagger: 0.12, ease: "back.out(1.5)" }, 1.4)
        // Fire columns pulse in
        .fromTo(".fire-col-left", { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "power2.out" }, 0.6)
        .fromTo(".fire-col-right", { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "power2.out" }, 0.7);

      // 3D Scroll Parallax — GSAP fromTo for reliable reverse
      gsap.fromTo(titleBurnRef.current,
        { y: 0, z: 0, rotationX: 0, opacity: 1 },
        {
          y: -200, z: -150, rotationX: 12, opacity: 0,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "80% top", scrub: true }
        }
      );
      gsap.fromTo(titleEverythingRef.current,
        { y: 0, z: 0, rotationX: 0, opacity: 1 },
        {
          y: -200, z: -150, rotationX: 12, opacity: 0,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "80% top", scrub: true }
        }
      );
      gsap.fromTo(outlineRef.current,
        { y: 0, opacity: 1 },
        {
          y: -100, opacity: 0,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "60% top", scrub: true }
        }
      );
      gsap.fromTo(athleteRef.current,
        { y: 0, scale: 1 },
        {
          y: 80, scale: 1.15,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-deep-black opacity-0" style={{ perspective: "1200px" }}>
      {/* ── Initial Fire Flash ── */}
      <div className="fire-flash absolute inset-0 bg-fire-red z-[50] pointer-events-none" />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        src="/bg.mp4"
      />

      {/* ── Background Layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(255,102,0,0.6)_0%,transparent_55%)] fire-flicker" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,34,0,0.35)_0%,transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,34,0,0.35)_0%,transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080400] via-transparent to-[rgba(8,4,0,0.5)] z-[2]" />
      {/* Animated shifting gradient */}
      <div className="absolute inset-0 fire-bg-shift opacity-20 z-[1]" />

      {/* ── Fire Columns ── */}
      <div className="fire-col-left absolute left-[15%] bottom-0 w-[100px] h-[70%] z-[3] origin-bottom"
        style={{
          background: "linear-gradient(to top, rgba(255,102,0,0.5), rgba(255,34,0,0.2), transparent)",
          filter: "blur(30px)",
        }} />
      <div className="fire-col-right absolute right-[15%] bottom-0 w-[100px] h-[60%] z-[3] origin-bottom"
        style={{
          background: "linear-gradient(to top, rgba(255,170,0,0.4), rgba(255,102,0,0.15), transparent)",
          filter: "blur(35px)",
        }} />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 z-[4] pointer-events-none"
        style={{ boxShadow: "inset 0 0 200px 50px rgba(0,0,0,0.8)" }} />

      {/* ── Embers ── */}
      <EmberParticles />

      {/* ── Hero Content ── */}
      <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 z-[10]" style={{ transformStyle: "preserve-3d" }}>

        {/* ── Outline text behind everything ── */}
        <div ref={outlineRef} className="absolute top-[30%] left-1/2 -translate-x-1/2 font-bebas text-[clamp(60px,12vw,180px)] text-stroke-orange whitespace-nowrap select-none pointer-events-none z-[9] opacity-40">
          INFERNO GYM
        </div>

        {/* ── Giant BURN / EVERYTHING ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-full flex flex-col items-center pointer-events-none z-[11] leading-[0.85] select-none">
          <div ref={titleBurnRef} className="font-bebas text-[clamp(90px,16vw,240px)] text-fire-gradient drop-shadow-[0_0_60px_rgba(255,34,0,0.6)]">
            BURN
          </div>
          <div ref={titleEverythingRef} className="font-bebas text-[clamp(70px,12vw,180px)] text-shimmer">
            EVERYTHING
          </div>
        </div>

        {/* ── Subtitle under text ── */}
        <div ref={subtitleRef} className="absolute top-[68%] z-[13] text-center pointer-events-none">
          <p className="font-barlow-condensed font-bold text-sm md:text-lg tracking-[0.3em] text-fire-orange/80 uppercase">
            Where Weakness Comes to Die
          </p>
        </div>

        {/* ── Athlete Image ── */}
        <div ref={athleteRef} className="relative h-[85%] aspect-[3/4] mt-auto z-[12] flex items-end justify-center">
          <img
            src="/body1.png"
            alt="Inferno Gym Athlete"
            className="w-full h-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(255,102,0,0.5)] translate-y-[15%]"
          />
        </div>
      </div>

      {/* ── Bottom Cards ── */}
      <div className="absolute bottom-0 w-full px-6 md:px-16 z-[20] flex flex-col md:flex-row justify-center gap-4 py-8 translate-y-[15%]" style={{ perspective: "800px" }}>
        {[
          { title: "OUR GALLERY", href: "/gallery", sub: "See the Inferno" },
          { title: "MEMBERSHIP", href: "/membership", sub: "Join the Fire" },
          { title: "MEET THE COACHES", href: "/coaches", sub: "Train with Beasts" }
        ].map((card, i) => (
          <Magnetic key={i} strength={0.15}>
            <Link href={card.href} className="hero-card block flex-1 min-w-[200px] max-w-[380px] glass-dark hover:border-fire-orange/50 p-6 clip-diagonal transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,102,0,0.15)]">
              <h3 className="font-barlow-condensed font-bold text-xl text-white group-hover:text-fire-gradient tracking-wider transition-colors">{card.title}</h3>
              <p className="font-barlow text-gray-500 text-sm mt-1 group-hover:text-gray-300 transition-colors">{card.sub}</p>
              <div className="w-10 h-1 bg-fire-orange mt-3 origin-left transition-transform duration-500 group-hover:scale-x-[2]" />
            </Link>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}
