"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";

gsap.registerPlugin(ScrollTrigger);

/* ─── tiny inline SVG icons ─── */
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M20 12L12 4H4v8l8 8 8-8z" /><circle cx="8" cy="8" r="1.5" fill="currentColor" />
  </svg>
);
const IconPen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const IconHeadset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" /><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const IconCar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1l3-4h10l3 4h1a2 2 0 012 2v6a2 2 0 01-2 2h-2" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    <rect x="7" y="14" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="11" y="14" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="15" y="14" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="7" y="18" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="11" y="18" width="2" height="2" fill="currentColor" stroke="none" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FF6600" width="20" height="20">
    <path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-2-1-4-2-5 0 2-1 3-2 3-1 0-2-1-1-3C11 5 12 2 12 2z" />
  </svg>
);
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);
const IconCheckShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconFlameCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 17c2.21 0 4-1.79 4-4s-2.5-5-4-8c-1.5 3-4 5.79-4 8s1.79 4 4 4z" fill="currentColor" stroke="none" />
  </svg>
);

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, delay: 0.8 });
      gsap.from(".contact-feature-card", {
        scrollTrigger: { trigger: ".contact-feature-card", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
      });
      gsap.from(".feature-icon", {
        scrollTrigger: { trigger: ".contact-feature-card", start: "top 80%" },
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "back.out(2)",
      });
      gsap.from(".form-section", {
        scrollTrigger: { trigger: ".form-section", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.8,
      });
      gsap.from(".map-section", {
        scrollTrigger: { trigger: ".map-section", start: "top 85%" },
        y: 50, opacity: 0, duration: 0.8,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageTransition>

      <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-barlow pb-32">

        {/* ── Hero ── */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden bg-[url('/images/bg.png')] bg-cover bg-center">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.15)_0%,transparent_60%)]" />

          {/* Subtle background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
            <h2 className="font-bebas text-[25vw] italic leading-none whitespace-nowrap text-white">INFERNO</h2>
          </div>

          <div className="relative z-10 flex flex-col items-center hero-text">
            {/* Logo */}
            <div className="mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35L5 10H35L20 35Z" stroke="#FF6600" strokeWidth="2" fill="rgba(255,102,0,0.2)" />
                <path d="M12 14L20 28L28 14H12Z" fill="#FF6600" />
              </svg>
            </div>

            <h1 className="font-bebas text-7xl md:text-9xl leading-none italic uppercase tracking-wider" style={{ textShadow: "0 0 40px rgba(255,102,0,0.4)" }}>
              CONTACT <span className="text-[#FF6600]">US</span>
            </h1>

            <div className="mt-8 flex flex-col items-center w-full">
              {/* Divider with triangle */}
              <div className="flex items-center w-full max-w-[600px] gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FF6600]"></div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF6600]"></div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FF6600]"></div>
              </div>
              <p className="font-barlow-condensed font-bold tracking-[8px] text-sm md:text-base text-gray-300">
                WE&apos;RE HERE TO <span className="text-[#FF6600]">FEED THE FIRE</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact Info Cards ── */}
        <section className="relative max-w-6xl mx-auto px-6 mt-20 z-20">

          {/* Top Divider */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <div className="h-[1px] w-full max-w-[300px] bg-gradient-to-r from-transparent to-[#FF6600]/60"></div>
            <div className="text-[#FF6600]">
              <FlameIcon />
            </div>
            <div className="h-[1px] w-full max-w-[300px] bg-gradient-to-l from-transparent to-[#FF6600]/60"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">

            {/* VISIT US CARD */}
            <div className="contact-feature-card relative bg-[#0a0a0a] border border-[#FF6600]/30 rounded-xl p-8 pt-14 flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,102,0,0.05)] hover:shadow-[0_0_40px_rgba(255,102,0,0.1)] transition-shadow">
              {/* Dot Pattern (Top Left) */}
              <div className="absolute top-5 left-5 opacity-20 pointer-events-none">
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => <div key={i} className="w-[3px] h-[3px] bg-[#FF6600] rounded-full"></div>)}
                </div>
              </div>

              {/* Floating Icon */}
              <div className="feature-icon absolute -top-10 w-20 h-20 rounded-full bg-[#111] border border-[#FF6600] flex items-center justify-center shadow-[0_0_20px_rgba(255,102,0,0.4)] text-[#FF6600]">
                <IconPin />
              </div>

              <h3 className="font-bebas text-[32px] tracking-widest text-white mt-2">VISIT US</h3>
              <div className="w-10 h-[2px] bg-[#FF6600] my-4"></div>

              <div className="flex flex-col items-center gap-2 mt-1 font-barlow text-gray-300 text-sm">
                <div className="flex items-start gap-4">
                  <span className="text-[#FF6600] mt-1"><IconPin /></span>
                  <div className="text-left">
                    <p>123 Ember Street</p>
                    <p className="mt-1">Downtown, Fire City</p>
                    <p className="mt-1 text-gray-500">FC 90210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CALL US CARD */}
            <div className="contact-feature-card relative bg-[#0a0a0a] border border-[#FF6600]/30 rounded-xl p-8 pt-14 flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,102,0,0.05)] hover:shadow-[0_0_40px_rgba(255,102,0,0.1)] transition-shadow">
              {/* Dot Pattern (Top Left) */}
              <div className="absolute top-5 left-5 opacity-20 pointer-events-none">
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => <div key={i} className="w-[3px] h-[3px] bg-[#FF6600] rounded-full"></div>)}
                </div>
              </div>

              {/* Floating Icon */}
              <div className="feature-icon absolute -top-10 w-20 h-20 rounded-full bg-[#111] border border-[#FF6600] flex items-center justify-center shadow-[0_0_20px_rgba(255,102,0,0.4)] text-[#FF6600]">
                <IconPhone />
              </div>

              <h3 className="font-bebas text-[32px] tracking-widest text-white mt-2">CALL US</h3>
              <div className="w-10 h-[2px] bg-[#FF6600] my-4"></div>

              <div className="flex flex-col items-start gap-5 mt-1 font-barlow text-gray-300 text-sm w-full px-2">
                <div className="flex items-center gap-4 w-full border-b border-white/10 pb-4">
                  <span className="text-[#FF6600]"><IconPhone /></span>
                  <span>+1 (555) 420-BURN</span>
                </div>
                <div className="flex items-start gap-4 w-full">
                  <span className="text-[#FF6600] mt-1"><IconClock /></span>
                  <div className="text-left">
                    <p>Mon-Fri: 5AM - 11PM</p>
                    <p className="mt-1 text-gray-500">Sat-Sun: 7AM - 9PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* EMAIL US CARD */}
            <div className="contact-feature-card relative bg-[#0a0a0a] border border-[#FF6600]/30 rounded-xl p-8 pt-14 flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,102,0,0.05)] hover:shadow-[0_0_40px_rgba(255,102,0,0.1)] transition-shadow">
              {/* Dot Pattern (Top Left) */}
              <div className="absolute top-5 left-5 opacity-20 pointer-events-none">
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => <div key={i} className="w-[3px] h-[3px] bg-[#FF6600] rounded-full"></div>)}
                </div>
              </div>

              {/* Floating Icon */}
              <div className="feature-icon absolute -top-10 w-20 h-20 rounded-full bg-[#111] border border-[#FF6600] flex items-center justify-center shadow-[0_0_20px_rgba(255,102,0,0.4)] text-[#FF6600]">
                <IconMail />
              </div>

              <h3 className="font-bebas text-[32px] tracking-widest text-white mt-2">EMAIL US</h3>
              <div className="w-10 h-[2px] bg-[#FF6600] my-4"></div>

              <div className="flex flex-col items-start gap-5 mt-1 font-barlow text-gray-300 text-sm w-full px-2">
                <div className="flex items-start gap-4 w-full border-b border-white/10 pb-4">
                  <span className="text-[#FF6600] mt-1"><IconMail /></span>
                  <div className="text-left">
                    <p>info@infernogym.com</p>
                    <p className="mt-1 text-gray-500">coaching@infernogym.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full">
                  <span className="text-[#FF6600]"><IconBell /></span>
                  <span>Response within 24 hrs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Features Bottom Row */}
          <div className="contact-feature-card mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
            {/* Feature 1 */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-[#FF6600]"><IconCheckShield /></div>
              <div>
                <h4 className="font-barlow-condensed font-bold tracking-wider text-white text-[13px] leading-tight mb-1">FAST RESPONSE</h4>
                <p className="font-barlow text-gray-500 text-[13px] leading-tight">We reply within 24h</p>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/10"></div>
            {/* Feature 2 */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-[#FF6600]"><IconHeadset /></div>
              <div>
                <h4 className="font-barlow-condensed font-bold tracking-wider text-white text-[13px] leading-tight mb-1">EXPERT SUPPORT</h4>
                <p className="font-barlow text-gray-500 text-[13px] leading-tight">We're here to help</p>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/10"></div>
            {/* Feature 3 */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-[#FF6600]"><IconLock /></div>
              <div>
                <h4 className="font-barlow-condensed font-bold tracking-wider text-white text-[13px] leading-tight mb-1">TRUSTED & SECURE</h4>
                <p className="font-barlow text-gray-500 text-[13px] leading-tight">Your information is safe</p>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/10"></div>
            {/* Feature 4 */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-[#FF6600]"><IconFlameCircle /></div>
              <div>
                <h4 className="font-barlow-condensed font-bold tracking-wider text-white text-[13px] leading-tight mb-1">BUILT FOR YOU</h4>
                <p className="font-barlow text-gray-500 text-[13px] leading-tight">Let's achieve more together</p>
              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════
            SECTION 1 — SEND A MESSAGE  (Image 1)
        ══════════════════════════════════════════ */}
        <section className="form-section" style={{ padding: "160px 24px 0", maxWidth: 1200, margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
            {/* Watermark */}
            {/* <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(80px,18vw,200px)", color: "rgba(255,255,255,0.03)", lineHeight: 1, whiteSpace: "nowrap" }}>SEND</span>
            </div> */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="font-bebas text-5xl md:text-7xl italic leading-none uppercase">
                SEND A <span className="text-[#FF6600]">MESSAGE</span>
              </h2>
              {/* divider */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
                <div className="divider-line" style={{ maxWidth: 160 }} />
                <FlameIcon />
                <div className="divider-line rev" style={{ maxWidth: 160 }} />
              </div>
              <p className="section-sub">WE RESPOND <span style={{ color: "#FF6600" }}>FAST.</span> LIKE OUR HIIT SETS.</p>
            </div>
          </div>

          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, alignItems: "start" }} className="md:grid-cols-[1fr_2fr] grid-cols-1">

            {/* LEFT — info panel */}
            <div className="glow-card" style={{ padding: "32px 24px" }}>
              {[
                { Icon: IconUser, label: "FULL NAME", value: "John Blaze" },
                { Icon: IconMail, label: "EMAIL", value: "john@example.com" },
                { Icon: IconBolt, label: "RESPONSE TIME", value: "Within 24 Hours" },
                { Icon: IconHeadset, label: "WE'RE HERE TO HELP", value: "Hit us up. We got you." },
              ].map(({ Icon, label, value }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div className="hex-badge"><Icon /></div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: "#FF6600", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "'Barlow'", fontSize: 15, color: "#ddd" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — form */}
            <div className="glow-card" style={{ padding: "36px 32px" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Row 1 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="md:grid-cols-2 grid-cols-1">
                  <div>
                    <label className="field-label">FULL NAME</label>
                    <div className="input-wrap">
                      <span className="input-icon"><IconUser /></span>
                      <input className="inferno-input" type="text" placeholder="Enter your full name" required />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">EMAIL</label>
                    <div className="input-wrap">
                      <span className="input-icon"><IconMail /></span>
                      <input className="inferno-input" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>
                </div>

                {/* Row 2 — subject */}
                <div>
                  <label className="field-label">SUBJECT</label>
                  <div className="input-wrap">
                    <span className="input-icon"><IconTag /></span>
                    <select className="inferno-input">
                      <option value="">Select a topic...</option>
                      <option>Membership Inquiry</option>
                      <option>Personal Training</option>
                      <option>Corporate Plans</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                    {/* custom chevron */}
                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#FF6600", pointerEvents: "none" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                </div>

                {/* Row 3 — message */}
                <div>
                  <label className="field-label">MESSAGE</label>
                  <div className="input-wrap">
                    <span className="input-icon-top"><IconPen /></span>
                    <textarea className="inferno-input" rows={5} placeholder="Tell us what's on your mind..." required style={{ paddingLeft: 44 }} />
                  </div>
                </div>

                {/* Submit */}
                {submitted ? (
                  <div style={{ background: "rgba(255,102,0,0.1)", border: "1px solid #FF6600", borderRadius: 6, padding: "24px", textAlign: "center" }}>
                    <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 28, color: "#FF6600" }}>MESSAGE SENT 🔥</p>
                    <p style={{ fontFamily: "'Barlow'", color: "#aaa", marginTop: 8 }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", paddingTop: 8 }}>
                    <button type="submit" className="send-btn">
                      SEND MESSAGE <IconArrow />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — FIND US / MAP  (Image 3)
        ══════════════════════════════════════════ */}
        <section className="map-section" style={{ maxWidth: 1200, margin: "160px auto 0", padding: "0 24px" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 11, letterSpacing: 5, color: "#FF6600", marginBottom: 4 }}>
              — — &nbsp; LET'S TRAIN TOGETHER &nbsp; — —
            </p>
            <h2 className="font-bebas text-5xl md:text-7xl italic leading-none uppercase">
              FIND <span style={{ color: "#FF6600" }}>US</span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
              <div className="divider-line" style={{ maxWidth: 140 }} />
              <FlameIcon />
              <div className="divider-line rev" style={{ maxWidth: 140 }} />
            </div>
            <p className="section-sub">STRONGER LOCATION. STRONGER <span style={{ color: "#FF6600" }}>YOU.</span></p>
          </div>

          {/* Two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }} className="md:grid-cols-2 grid-cols-1">

            {/* LEFT — contact info rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { Icon: IconPin, label: "ADDRESS", lines: ["123 Ember Street", "Downtown, Fire City, FC 90210"] },
                { Icon: IconPhone, label: "PHONE", lines: ["+1 (555) 420-BURN", "Mon–Fri: 5AM – 11PM  |  Sat–Sun: 7AM – 9PM"] },
                { Icon: IconMail, label: "EMAIL", lines: ["info@infernogym.com", "coaching@infernogym.com"] },
                { Icon: IconClock, label: "HOURS", lines: ["Mon–Fri: 5AM – 11PM", "Sat–Sun: 7AM – 9PM"] },
              ].map(({ Icon, label, lines }, i) => (
                <div key={i} className="contact-row">
                  <div className="hex-badge"><Icon /></div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: "#999", marginBottom: 4 }}>{label}</div>
                    {lines.map((l, j) => (
                      <div key={j} style={{ fontFamily: "'Barlow'", fontSize: j === 0 ? 15 : 13, color: j === 0 ? "#ddd" : "#777" }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — map + parking */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Map */}
              <div style={{ position: "relative", height: 320, background: "#0d0d0d", border: "1.5px solid rgba(255,102,0,0.25)", borderRadius: 8, overflow: "hidden" }}>
                {/* dark map texture */}
                <div className="map-grid" style={{ position: "absolute", inset: 0 }} />
                {/* radial glow */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 50%, rgba(255,102,0,0.12) 0%, transparent 55%)" }} />
                {/* Radar rings */}
                <div className="radar-ring" style={{ width: 80, height: 80, animationDelay: "0s" }} />
                <div className="radar-ring" style={{ width: 120, height: 120, animationDelay: "1s" }} />
                <div className="radar-ring" style={{ width: 160, height: 160, animationDelay: "2s" }} />
                {/* map road lines */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 600 320" preserveAspectRatio="none">
                  <line x1="0" y1="160" x2="600" y2="160" stroke="#FF6600" strokeWidth="1" />
                  <line x1="360" y1="0" x2="360" y2="320" stroke="#FF6600" strokeWidth="1" />
                  <line x1="0" y1="80" x2="600" y2="200" stroke="#FF6600" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="500" y2="320" stroke="#FF6600" strokeWidth="0.5" />
                  <line x1="0" y1="240" x2="600" y2="100" stroke="#FF6600" strokeWidth="0.5" />
                </svg>
                {/* Pin */}
                <div className="map-pin" style={{ position: "absolute", top: "50%", left: "60%", transform: "translate(-50%,-60%)", textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, background: "radial-gradient(circle, #ff6600 0%, #cc4400 100%)", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", margin: "0 auto", boxShadow: "0 0 24px rgba(255,102,0,0.7)" }}>
                    <div style={{ transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                      <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22"><path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-2-1-4-2-5 0 2-1 3-2 3-1 0-2-1-1-3C11 5 12 2 12 2z" /></svg>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, background: "rgba(0,0,0,0.85)", border: "1px solid #FF6600", borderRadius: 4, padding: "4px 12px" }}>
                    <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 13, color: "#FF6600", letterSpacing: 2 }}>INFERNO GYM</span>
                  </div>
                </div>
              </div>

              {/* Parking card */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#0d0d0d", border: "1.5px solid rgba(255,102,0,0.3)", borderRadius: 8, padding: "20px 24px" }}>
                <div className="hex-badge"><IconCar /></div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: 1 }}>FREE PARKING AVAILABLE</div>
                  <div style={{ fontFamily: "'Barlow'", fontSize: 13, color: "#777", marginTop: 3 }}>Just steps away from the entrance.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ height: 1, width: 80, background: "linear-gradient(to right, transparent, #FF6600)" }} />
              <FlameIcon />
              <div style={{ height: 1, width: 80, background: "linear-gradient(to left, transparent, #FF6600)" }} />
            </div>
            <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 600, fontSize: 12, letterSpacing: 5, color: "#666" }}>
              COME FIND US. LET'S FUEL YOUR <span style={{ color: "#FF6600" }}>FIRE.</span>
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — GYM HOURS  (Image 2)
        ══════════════════════════════════════════ */}
        <section style={{ maxWidth: 1000, margin: "160px auto 160px", padding: "0 24px" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
              <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(80px,20vw,220px)", color: "rgba(255,255,255,0.025)", lineHeight: 1, whiteSpace: "nowrap" }}>HOURS</span>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* clock icon + lines */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, #FF6600)" }} />
                <IconClock />
                <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, #FF6600)" }} />
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl italic leading-none uppercase">
                GYM <span style={{ color: "#FF6600" }}>HOURS</span>
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 6, marginBottom: 10 }}>
                <div style={{ height: 1, width: 120, background: "linear-gradient(to right, transparent, rgba(255,102,0,0.4))" }} />
                <div style={{ height: 1, width: 120, background: "linear-gradient(to left, transparent, rgba(255,102,0,0.4))" }} />
              </div>
              <p className="section-sub">FLEXIBLE HOURS. <span style={{ color: "#FF6600" }}>REAL RESULTS.</span></p>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="md:grid-cols-2 grid-cols-1">
            {[
              { day: "WEEKDAYS", time: "5:00 AM — 11:00 PM" },
              { day: "WEEKENDS", time: "7:00 AM — 9:00 PM" },
            ].map(({ day, time }) => (
              <div key={day} className="hours-card">
                <div className="icon-circle">
                  <IconCalendar />
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 28, letterSpacing: 3, color: "#fff" }}>{day}</h3>
                <div className="time-pill">
                  <IconClock />
                  {time}
                </div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#777" }}>
                  <IconCheck />
                  <span style={{ fontFamily: "'Barlow'", fontSize: 13 }}>Staffed hours. 24/7 for <span style={{ color: "#FF6600", fontWeight: 600 }}>Elite</span> members.</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
