"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "RELENTLESS GRIT",
    desc: "We don't sugarcoat it. Every session is designed to push you past what you thought was possible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-3.5-2-6-2-6s-1 2-2 2c-1 0-1-1-1-1s1-3 0-6z" fill="#FF6600" opacity="0.9" />
        <path d="M12 8C12 8 9.5 11.5 9.5 14a2.5 2.5 0 005 0c0-1.5-.8-2.5-1-3s-.5 1-1.5 1C11 12 12 8 12 8z" fill="#FF6600" />
      </svg>
    ),
  },
  {
    title: "ELITE EQUIPMENT",
    desc: "Rogue rigs, Eleiko plates, Assault bikes — we stock competition-grade gear across every floor.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M12 2L4 6v6c0 4.5 3.5 8.5 8 10 4.5-1.5 8-5.5 8-10V6L12 2z" fill="#FF6600" opacity="0.85" />
        <path d="M12 5L6 8.5v4.5c0 3 2.5 5.5 6 7 3.5-1.5 6-4 6-7V8.5L12 5z" fill="#050505" />
        <path d="M12 7.5L7.5 10v4c0 2.5 2 4.5 4.5 5.5 2.5-1 4.5-3 4.5-5.5v-4L12 7.5z" fill="#FF6600" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "PROVEN RESULTS",
    desc: "Our members don't just show up — they transform. 95% hit their goals within 6 months.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2z" fill="#FF6600" />
      </svg>
    ),
  },
  {
    title: "IRON COMMUNITY",
    desc: "A tribe of lifters, fighters, and runners who hold each other accountable. No egos. Just effort.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
        <path d="M15.5 7.5C16.3 8.9 16 10.7 14.8 11.8L13.2 10.2C13.7 9.7 13.8 8.9 13.4 8.3C12.9 7.5 11.9 7.3 11.1 7.7L9.5 6.1C11.2 4.9 13.6 5.2 15.5 7.5z" fill="#FF6600" />
        <path d="M4 15.5C4.8 14.5 6.2 13.7 7.3 13.5L9 15.2C8.2 15.3 7.4 15.8 6.9 16.5L4 15.5z" fill="#FF6600" />
        <path d="M7.5 7.5C8.3 6.5 9.7 6 11 6.3L9.5 7.7C9 7.5 8.5 7.7 8.1 8.1L7.5 7.5z" fill="#FF6600" />
        <path d="M9.5 9C10.3 8.1 11.6 7.9 12.7 8.4L8.4 12.7C7.9 11.6 8.1 10.3 9 9.5L9.5 9z" fill="#FF6600" opacity="0.6" />
        <path d="M11 13.5C11.8 12.6 13.1 12.4 14.2 12.9L12.1 15L13.5 16.5L15.7 14.3C16.2 15.4 15.9 16.7 15 17.5L12 20.5L11 19.5L10 18.5L9 17.5L11 13.5z" fill="#FF6600" />
        <path d="M5 12.5L8 9.5L9.5 11L11 12.5L9 14.5L8 15.5L6.5 14L5 12.5z" fill="#FF6600" />
      </svg>
    ),
  },
];

const TIMELINE = [
  { year: "2014", event: "Founded in a 200 sq ft garage with 3 members and a dream." },
  { year: "2016", event: "Moved into our first commercial space. 80 members strong." },
  { year: "2019", event: "Expanded to 12,000 sq ft. Added MMA cage and recovery zone." },
  { year: "2022", event: "Launched online coaching. Reached 500+ active members." },
  { year: "2024", event: "Named Top 10 Hardcore Gym in the country. Still burning." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations for Hero
      gsap.fromTo(".hero-title-main", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 });
      gsap.fromTo(".hero-sub", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });

      // Core Values
      const cards = gsap.utils.toArray(".value-card");
      cards.forEach((card, index) => {
        gsap.fromTo(card as HTMLElement,
          { y: 50, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: card as HTMLElement, start: "top 85%", toggleActions: "play none none none" },
            y: 0, autoAlpha: 1, duration: 0.8, delay: index * 0.15, ease: "power2.out"
          }
        );
      });

      // Mission
      const missionText = gsap.utils.toArray(".mission-text-anim");
      missionText.forEach((text, index) => {
        gsap.fromTo(text as HTMLElement,
          { x: -50, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: text as HTMLElement, start: "top 80%", toggleActions: "play none none none" },
            x: 0, autoAlpha: 1, duration: 0.8, delay: index * 0.2
          }
        );
      });

      const missionItems = gsap.utils.toArray(".mission-item");
      missionItems.forEach((item, index) => {
        gsap.fromTo(item as HTMLElement,
          { y: 30, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: item as HTMLElement, start: "top 85%", toggleActions: "play none none none" },
            y: 0, autoAlpha: 1, duration: 0.6, delay: index * 0.1
          }
        );
      });

      // Timeline
      const timelineItems = gsap.utils.toArray(".timeline-item");
      timelineItems.forEach((item, index) => {
        gsap.fromTo(item as HTMLElement,
          { x: index % 2 === 0 ? -50 : 50, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: item as HTMLElement, start: "top 75%", toggleActions: "play none none none" },
            x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out"
          }
        );
      });

      // Force refresh ScrollTrigger after all initial calculations
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-barlow">

        {/* ── HERO SECTION ── */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden bg-[url('/images/bg.png')] bg-cover bg-center">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.15)_0%,transparent_60%)]" />

          {/* Subtle background text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
            <h1 className="font-bebas text-[25vw] italic leading-none whitespace-nowrap text-white">INFERNO</h1>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo placeholder */}
            <div className="mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35L5 10H35L20 35Z" stroke="#FF6600" strokeWidth="2" fill="rgba(255,102,0,0.2)" />
                <path d="M12 14L20 28L28 14H12Z" fill="#FF6600" />
              </svg>
            </div>

            <h1 className="hero-title-main font-bebas text-7xl md:text-9xl leading-none  uppercase tracking-wider" style={{ textShadow: "0 0 40px rgba(255,102,0,0.4)" }}>
              ABOUT <span className="text-[#FF6600]">US</span>
            </h1>


            <div className="hero-sub mt-8 flex flex-col items-center w-full">
              {/* Divider with triangle */}
              <div className="flex items-center w-full max-w-[600px] gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FF6600]"></div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF6600]"></div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FF6600]"></div>
              </div>
              <p className="font-barlow-condensed font-bold tracking-[8px] text-sm md:text-base text-gray-300">
                FORGED IN <span className="text-[#FF6600]">FIRE</span>. BUILT TO LAST.
              </p>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES SECTION ── */}
        <section className="relative py-24 px-6 max-w-7xl mx-auto bg-[#050505]">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end mb-16">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-barlow-condensed font-bold tracking-widest text-[#FF6600] text-sm uppercase">WHAT WE STAND FOR</h3>
                <div className="h-[1px] w-24 bg-[#FF6600] relative">
                  <div className="absolute right-0 top-[-3px] w-2 h-[1px] bg-[#FF6600] origin-right rotate-45"></div>
                </div>
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl leading-none">OUR CORE VALUES</h2>
              <p className="mt-6 text-gray-400 font-barlow text-lg max-w-md">
                Everything we do is built on the foundation of these values. They define us, guide us, and drive us to be better every day.
              </p>
              {/* Pointing SVG */}
              <div className="mt-10 mb-4 hidden lg:block">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5L20 25L35 5" stroke="#FF6600" strokeWidth="2" />
                  <path d="M12 5L20 16L28 5" stroke="#FF6600" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative mt-12">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="value-card relative group transition-all duration-300"
                style={{
                  background: "#0c0c0c",
                  border: "1px solid rgba(255,102,0,0.18)",
                  clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  padding: "28px 24px 28px 24px",
                }}
              >
                {/* Left orange glow bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6600]/80 via-[#FF6600]/40 to-transparent" />
                {/* Bottom orange glow bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6600]/60 via-[#FF6600]/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Number badge top-left */}
                <span className="font-bebas text-xl text-[#FF6600] tracking-widest mb-2 block" style={{ lineHeight: 1 }}>
                  0{i + 1}
                </span>

                {/* Decorative orange tick marks top-right */}
                <div className="absolute top-4 right-5 flex flex-col items-end gap-[5px]">
                  <div className="w-6 h-[2px] bg-[#FF6600] opacity-60 rotate-[-40deg] origin-right" />
                  <div className="w-4 h-[2px] bg-[#FF6600] opacity-40 rotate-[-40deg] origin-right" />
                </div>

                {/* Icon circle */}
                <div className="flex justify-center my-6">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(255,102,0,0.35)]"
                    style={{
                      background: "#080808",
                      border: "1.5px solid rgba(255,102,0,0.35)",
                      boxShadow: "0 0 0 6px rgba(255,102,0,0.06)",
                    }}
                  >
                    {v.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bebas text-[22px] italic tracking-wide text-center mb-3 text-white leading-tight">
                  {v.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm text-center leading-relaxed font-barlow">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MISSION SECTION ── */}
        <section className="mission-section relative py-24 bg-[#080808] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="mission-text-anim lg:w-1/2 relative">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-barlow-condensed font-bold tracking-widest text-[#FF6600] text-sm uppercase">OUR PURPOSE</h3>
                  <div className="h-[1px] w-12 bg-[#FF6600] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#FF6600] rounded-full shadow-[0_0_10px_#FF6600]"></div>
                  </div>
                </div>
                <h2 className="font-bebas text-7xl md:text-[140px]  uppercase leading-[0.85] tracking-tight">
                  <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">OUR</span><br />
                  <span className="text-[#FF6600]  drop-shadow-[0_0_20px_rgba(255,102,0,0.3)]">MISSION</span>
                </h2>

                {/* Slanted bars decoration */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 flex gap-4 opacity-20 hidden md:flex">
                  <div className="w-6 h-[200px] bg-white skew-x-[30deg]"></div>
                  <div className="w-6 h-[200px] bg-white skew-x-[30deg]"></div>
                </div>
              </div>

              <div className="mission-text-anim lg:w-1/2 z-10 relative">
                <div className="pl-6 border-l-2 border-[#FF6600]">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Inferno Gym exists for one reason — to strip away every excuse and reveal the strongest version of you. We combine brutal training methods with a supportive community that refuses to let you quit.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    This is not a fitness trend. This is a lifestyle<br />
                    <strong className="text-[#FF6600] font-bold">forged in iron and fire.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Glowing line divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF6600]/40 to-transparent my-16 relative">
              <div className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20L4 8H20L12 20Z" stroke="#FF6600" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="mission-items flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0 mt-8 text-center w-full max-w-5xl mx-auto px-4">

              {/* Item 1 */}
              <div className="mission-item flex flex-col items-center">
                <div className="mb-6 drop-shadow-[0_0_10px_rgba(255,102,0,0.15)] text-gray-300">
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#aaa" />
                    <path d="M9 10h6l-3 5-3-5z" stroke="#FF6600" strokeWidth="1.5" />
                    <path d="M10.5 11h3l-1.5 2.5-1.5-2.5z" fill="#FF6600" stroke="none" />
                  </svg>
                </div>
                <h4 className="font-bebas text-2xl tracking-widest text-white">
                  BUILT ON <br /><span className="text-[#FF6600] italic">DISCIPLINE</span>
                </h4>
              </div>

              <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[#FF6600] to-transparent shadow-[0_0_15px_#FF6600]"></div>

              {/* Item 2 */}
              <div className="mission-item flex flex-col items-center">
                <div className="mb-6 drop-shadow-[0_0_10px_rgba(255,102,0,0.15)] text-gray-300">
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                    <path d="M8 12h8" />
                    <rect x="7" y="8" width="2" height="8" rx="0.5" />
                    <rect x="15" y="8" width="2" height="8" rx="0.5" />
                    <rect x="4" y="9" width="2" height="6" rx="0.5" />
                    <rect x="18" y="9" width="2" height="6" rx="0.5" />
                    <path d="M3 10v4M21 10v4" />
                  </svg>
                </div>
                <h4 className="font-bebas text-2xl tracking-widest text-white">
                  TRAINED FOR <br /><span className="text-[#FF6600] italic">STRENGTH</span>
                </h4>
              </div>

              <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[#FF6600] to-transparent shadow-[0_0_15px_#FF6600]"></div>

              {/* Item 3 */}
              <div className="mission-item flex flex-col items-center">
                <div className="mb-6 drop-shadow-[0_0_10px_rgba(255,102,0,0.15)] text-gray-300">
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M18 21v-2a6 6 0 0 0-12 0v2" />
                    <circle cx="6" cy="10" r="3" />
                    <path d="M2.5 21v-2a4 4 0 0 1 4-4" />
                    <circle cx="18" cy="10" r="3" />
                    <path d="M21.5 21v-2a4 4 0 0 0-4-4" />
                  </svg>
                </div>
                <h4 className="font-bebas text-2xl tracking-widest text-white">
                  UNITED BY <br /><span className="text-[#FF6600] italic">COMMUNITY</span>
                </h4>
              </div>

              <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[#FF6600] to-transparent shadow-[0_0_15px_#FF6600]"></div>

              {/* Item 4 */}
              <div className="mission-item flex flex-col items-center">
                <div className="mb-6 drop-shadow-[0_0_10px_rgba(255,102,0,0.15)] text-gray-300">
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.2">
                    <path d="M8 20L12 6l4 14" />
                    <path d="M3 20l4.5-8 2 3.5" />
                    <path d="M21 20l-4.5-8-2 3.5" />
                    <path d="M12 6l2 7H10L12 6z" stroke="#FF6600" />
                    <path d="M12 6l2 7-4-2L12 6z" fill="#FF6600" stroke="none" />
                  </svg>
                </div>
                <h4 className="font-bebas text-2xl tracking-widest text-white">
                  DRIVEN BY <br /><span className="text-[#FF6600] italic">PURPOSE</span>
                </h4>
              </div>

            </div>
          </div>
        </section>

        {/* ── TIMELINE SECTION ── */}
        <section className="timeline-section relative py-24 bg-[#050505]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-barlow-condensed font-bold tracking-widest text-[#FF6600] text-sm uppercase">OUR STORY</h3>
                <div className="h-[1px] w-24 bg-[#FF6600] relative">
                  <div className="absolute right-0 top-[-3px] w-2 h-[1px] bg-[#FF6600] origin-right rotate-45"></div>
                </div>
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl  leading-none uppercase">A DECADE OF FIRE</h2>
              <p className="mt-4 text-gray-400 font-barlow text-lg max-w-sm">
                From a small idea to a movement that transformed thousands of lives.
              </p>
              <div className="w-16 h-[2px] bg-[#FF6600] mt-6"></div>
            </div>

            <div className="relative mt-10">
              {/* Vertical Center Line */}
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6600]/80 to-transparent md:-translate-x-1/2"></div>

              <div className="space-y-16 md:space-y-12">
                {TIMELINE.map((t, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={i} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 pl-[60px] md:pl-0`}>

                      {/* Timeline Dot */}
                      <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-[#FF6600] md:-translate-x-1/2 mt-[24px] md:mt-0 z-10 shadow-[0_0_15px_#FF6600]">
                        <div className="absolute inset-0 bg-[#FF6600] rounded-full scale-50"></div>
                      </div>

                      {/* Content Box */}
                      <div className={`w-full md:w-[calc(50%-40px)] relative group`}>
                        {/* Year title position based on left or right */}
                        <h4 className={`absolute -top-10 md:-top-14 ${isLeft ? 'md:right-0' : 'md:left-0'} font-bebas text-4xl text-[#FF6600]`}>{t.year}</h4>

                        <div className="bg-[#0a0a0a] border border-[#FF6600]/50 p-6 relative transition-colors duration-300 hover:border-[#FF6600]/40"
                          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>

                          {/* Triangle pointer to center line */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[8px] border-y-transparent ${isLeft ? 'right-[-8px] border-l-[8px] border-l-[#FF6600]' : 'left-[-8px] border-r-[8px] border-r-[#FF6600]'}`}></div>

                          {/* Mobile Triangle pointer */}
                          <div className="md:hidden absolute top-[24px] left-[-8px] w-0 h-0 border-y-[8px] border-y-transparent border-r-[8px] border-r-[#FF6600]"></div>

                          {/* Glowing corner borders on hover */}
                          <div className="absolute top-0 left-0 w-8 h-[2px] bg-gradient-to-r from-[#FF6600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute top-0 left-0 h-8 w-[2px] bg-gradient-to-b from-[#FF6600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                          <p className="text-gray-300 font-barlow text-base leading-relaxed">{t.event}</p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Bottom Triangle Logo indicator */}
              <div className="absolute left-[13px] md:left-1/2 bottom-[-40px] -translate-x-[6px] md:-translate-x-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20L4 8H20L12 20Z" stroke="#FF6600" strokeWidth="2" />
                  <path d="M12 16L8 10H16L12 16Z" fill="#FF6600" />
                </svg>
              </div>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
