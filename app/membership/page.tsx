"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import EmberParticles from "@/components/ui/EmberParticles";

gsap.registerPlugin(ScrollTrigger);

// ── SVG Icons ──────────────────────────────────────────────
const FlameIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M20 4C20 4 11 14 11 22a9 9 0 0018 0c0-6-4-10-4-10s-1.5 3-3.5 3c-2 0-2-2-2-2s2-5 0-9z" fill="#FF6600" opacity="0.85" />
    <path d="M20 13C20 13 16 18 16 22a4 4 0 008 0c0-2.5-1.5-4-2-5s-1 1.5-2 1.5c-1 0 0-5.5 0-5.5z" fill="#FF6600" />
  </svg>
);

const BoltIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M22 4L8 22H18L16 36L32 18H22L22 4z" fill="#FF6600" />
  </svg>
);

const CrownIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M6 30h28v3H6z" fill="#FF6600" opacity="0.7" />
    <path d="M6 30L10 14l8 8L20 10l2 12 8-8 4 16H6z" fill="#FF6600" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="#FF6600" strokeWidth="1.5" />
    <path d="M6 10l3 3 5-5" stroke="#FF6600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="#444" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckSolid = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#FF6600" opacity="0.2" />
    <circle cx="10" cy="10" r="9" stroke="#FF6600" strokeWidth="1.5" />
    <path d="M6 10l3 3 5-5" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────
const TIERS = [
  {
    name: "STARTER",
    icon: <FlameIcon />,
    tagline: "Get your feet in the fire.",
    price: { monthly: 29, annual: Math.floor(29 * 12 * 0.8) },
    cta: "START BURNING",
    features: [
      "Full gym floor access", "Locker room & showers", "1 group class per week",
      "Mobile app access", "Progress tracking", "Basic nutrition guide",
      "Open gym hours", "Community access",
    ],
  },
  {
    name: "PRO",
    icon: <BoltIcon />,
    tagline: "For those who refuse to plateau.",
    price: { monthly: 59, annual: Math.floor(59 * 12 * 0.8) },
    popular: true,
    cta: "CATCH FIRE",
    features: [
      "Everything in Starter", "Unlimited group classes", "Recovery zone access",
      "Sauna & ice bath", "Custom nutrition plan", "Monthly body scan",
      "Priority class booking", "1 PT session / month", "Guest pass (1/mo)",
      "Exclusive member events", "Online workout library", "Coach messaging",
    ],
  },
  {
    name: "ELITE",
    icon: <CrownIcon />,
    tagline: "Absolutely everything. No limits.",
    price: { monthly: 99, annual: Math.floor(99 * 12 * 0.8) },
    cta: "START BURNING",
    features: [
      "Everything in Pro", "4 PT sessions / month", "VIP locker",
      "Unlimited guest passes", "Competition prep coaching", "Quarterly photoshoot",
      "Early event registration", "Branded merch pack", "24/7 priority access",
      "Personalized programming", "Monthly video review", "Direct coach hotline",
      "Recovery therapy sessions", "Supplement discounts (20%)", "Free parking", "Annual retreat invite",
    ],
  },
];

const COMPARISON = [
  { label: "Gym Floor Access", icon: "🏋️", s: true, p: true, e: true },
  { label: "Group Classes", icon: "👥", s: "1 / wk", p: "Unlimited", e: "Unlimited" },
  { label: "Recovery Zone", icon: "🔄", s: false, p: true, e: true },
  { label: "Nutrition Plan", icon: "🥗", s: "Basic", p: "Custom", e: "Custom" },
  { label: "PT Sessions", icon: "💪", s: false, p: "1 / mo", e: "4 / mo" },
  { label: "Guest Passes", icon: "✖️", s: false, p: "1 / mo", e: "Unlimited" },
  { label: "24/7 Access", icon: "⚙️", s: false, p: false, e: true },
  { label: "Competition Prep", icon: "⚙️", s: false, p: false, e: true },
];

const FAQS = [
  { q: "DO I NEED EXPERIENCE TO JOIN?", a: "Absolutely not. We have programs for every level — from first-timers to competitive athletes. Our coaches will meet you where you are." },
  { q: "CAN I FREEZE MY MEMBERSHIP?", a: "Yes. You can freeze your membership for up to 2 months per year at no charge. Just let us know 7 days in advance." },
  { q: "IS THERE A CONTRACT?", a: "No long-term contracts. All plans are month-to-month (or annual if you choose). Cancel anytime before your next billing cycle." },
  { q: "WHAT ARE YOUR HOURS?", a: "We are open 24/7 for Pro and Elite members. Starter members have access during staffed hours: 5 AM – 11 PM daily." },
  { q: "DO YOU OFFER CORPORATE PLANS?", a: "Yes. Contact us for group rates and corporate wellness packages. We offer discounts for teams of 10+." },
  { q: "WHAT'S INCLUDED IN PT SESSIONS?", a: "Personal Training sessions are 60 minutes of one-on-one coaching, including warm-up, programming, form correction, and recovery guidance." },
];

// ── Cell renderer ──────────────────────────────────────────
function Cell({ val, highlight }: { val: boolean | string; highlight?: boolean }) {
  if (val === true) return <div className="flex justify-center"><CheckSolid /></div>;
  if (val === false) return <div className="flex justify-center"><CrossIcon /></div>;
  return (
    <span className={`font-barlow-condensed text-sm font-bold ${highlight ? "text-[#FF6600]" : "text-gray-300"}`}>
      {val}
    </span>
  );
}

export default function MembershipPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { y: 60, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-sub", { opacity: 0, duration: 1, delay: 0.9 });
      gsap.from(".pricing-card", {
        scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" },
        y: 80, opacity: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.1)",
      });
      gsap.from(".comp-row", {
        scrollTrigger: { trigger: ".comparison-table", start: "top 85%" },
        x: -40, opacity: 0, duration: 0.4, stagger: 0.05,
      });
      setTimeout(() => ScrollTrigger.refresh(), 400);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-barlow pb-24">

        {/* ── HERO ── */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden bg-[url('/images/bg.png')] bg-cover bg-center">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.15)_0%,transparent_60%)]" />

          {/* Subtle background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
            <h2 className="font-bebas text-[25vw] italic leading-none whitespace-nowrap text-white">INFERNO</h2>
          </div>

          <div className="relative z-10 hero-title flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35L5 10H35L20 35Z" stroke="#FF6600" strokeWidth="2" fill="rgba(255,102,0,0.2)" />
                <path d="M12 14L20 28L28 14H12Z" fill="#FF6600" />
              </svg>
            </div>

            <h1 className="font-bebas text-7xl md:text-9xl leading-none uppercase tracking-wider" style={{ textShadow: "0 0 40px rgba(255,102,0,0.4)" }}>
              MEMBER<span className="text-[#FF6600]">SHIP</span>
            </h1>

            <div className="hero-sub mt-8 flex flex-col items-center w-full">
              {/* Divider with triangle */}
              <div className="flex items-center w-full max-w-[600px] gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FF6600]"></div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF6600]"></div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FF6600]"></div>
              </div>
              <p className="font-barlow-condensed font-bold tracking-[8px] text-sm md:text-base text-gray-300">
                INVEST IN THE <span className="text-[#FF6600]">STRONGEST</span> VERSION OF YOU
              </p>
            </div>
          </div>
        </section>


        {/* ── TOGGLE ── */}
        <div className="flex justify-center items-center gap-5 mt-16 mb-14 relative z-10">
          <span className={`font-barlow-condensed font-bold tracking-widest text-sm transition-colors ${!annual ? "text-white" : "text-gray-500"}`}>
            MONTHLY
          </span>
          <button
            id="billing-toggle"
            onClick={() => setAnnual(!annual)}
            className="relative w-14 h-7 rounded-full border border-[#FF6600] bg-black transition-all"
            aria-label="Toggle billing period"
          >
            <div
              className={`absolute top-[3px] w-5 h-5 rounded-full bg-[#FF6600] transition-all duration-300 shadow-[0_0_10px_rgba(255,102,0,0.6)] ${annual ? "left-[30px]" : "left-[3px]"}`}
            />
          </button>
          <span className={`font-barlow-condensed font-bold tracking-widest text-sm transition-colors ${annual ? "text-white" : "text-gray-500"}`}>
            ANNUAL{" "}
            <span className="text-[#FF6600] text-xs ml-1">SAVE 20%</span>
          </span>
        </div>

        {/* ── PRICING CARDS ── */}
        <div className="pricing-grid max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {TIERS.map((tier) => {
            const price = annual ? tier.price.annual : tier.price.monthly;
            const isPro = tier.popular;
            return (
              <div
                key={tier.name}
                className="pricing-card relative flex flex-col"
                style={{
                  background: isPro ? "#0e0900" : "#0a0a0a",
                  border: isPro ? "1.5px solid #FF6600" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  boxShadow: isPro ? "0 0 50px rgba(255,102,0,0.15), inset 0 0 30px rgba(255,102,0,0.03)" : "none",
                  padding: isPro ? "0 28px 32px" : "24px 24px 28px",
                  marginTop: isPro ? "0" : "0",
                }}
              >
                {/* MOST POPULAR badge */}
                {isPro && (
                  <div
                    className="text-center py-2 mb-6"
                    style={{
                      background: "#FF6600",
                      margin: "0 -28px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    }}
                  >
                    <span className="font-barlow-condensed font-bold text-black text-xs tracking-widest flex items-center justify-center gap-2">
                      ☆ MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-4 mt-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "#0a0a0a",
                      border: "1.5px solid rgba(255,102,0,0.4)",
                      boxShadow: "0 0 0 5px rgba(255,102,0,0.06)",
                    }}
                  >
                    {tier.icon}
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-bebas text-3xl text-center tracking-wider text-white mb-1">{tier.name}</h2>
                <p className="text-gray-500 text-sm text-center font-barlow mb-1">{tier.tagline}</p>

                {/* Divider */}
                <div className="w-12 h-[1px] bg-[#FF6600] mx-auto mt-3 mb-5 opacity-60" />

                {/* Price */}
                <div className="flex items-end justify-center gap-1 mb-6 leading-none">
                  <span className="font-bebas text-2xl text-[#FF6600] mb-1">$</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={price}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-bebas text-7xl text-white"
                    >
                      {price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-barlow text-sm text-gray-500 mb-2 ml-1">/{annual ? "yr" : "mo"}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300 font-barlow">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="w-full font-barlow-condensed font-bold tracking-widest text-sm py-4 flex items-center justify-center gap-3 transition-all duration-300"
                  style={{
                    background: isPro ? "#FF6600" : "transparent",
                    border: isPro ? "none" : "1px solid #FF6600",
                    color: isPro ? "#000" : "#FF6600",
                  }}
                  onMouseEnter={e => {
                    if (!isPro) {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,102,0,0.1)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isPro) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }
                  }}
                >
                  {tier.cta} →
                </button>
              </div>
            );
          })}
        </div>

        {/* ── PLAN COMPARISON ── */}
        <section className="max-w-5xl mx-auto px-6 mt-32">
          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="font-bebas" style={{ fontSize: "clamp(52px, 8vw, 90px)", lineHeight: 1 }}>
              PLAN <span className="text-[#FF6600]">COMPARISON</span>
            </h2>
          </div>
          {/* Logo divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-16 bg-[#FF6600]/50" />
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M20 35L5 10H35L20 35Z" stroke="#FF6600" strokeWidth="2" fill="rgba(255,102,0,0.15)" />
              <path d="M12 14L20 28L28 14H12Z" fill="#FF6600" />
            </svg>
            <div className="h-[1px] w-16 bg-[#FF6600]/50" />
          </div>
          <p className="text-center font-barlow-condensed tracking-[4px] text-gray-400 text-sm mb-12 uppercase">
            Choose the plan that fuels your fire
          </p>

          <div className="comparison-table overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  {/* Features label col */}
                  <td className="pb-6 pr-4 align-bottom" style={{ width: "30%" }}>
                    <div
                      className="bg-[#0d0d0d] border border-white/8 px-5 py-4 rounded-sm"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="font-bebas text-xl italic text-[#FF6600] tracking-wider">FEATURES</span>
                    </div>
                  </td>
                  {/* Starter */}
                  <td className="pb-6 px-2 text-center align-bottom">
                    <div className="bg-[#0d0d0d] border border-white/8 px-5 py-5 rounded-sm" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(255,102,0,0.3)" }}>
                          <FlameIcon size={24} />
                        </div>
                      </div>
                      <div className="font-bebas text-xl tracking-wider text-white">STARTER</div>
                      <div className="text-gray-500 text-xs mt-1 font-barlow">Get started. Build the habit.</div>
                    </div>
                  </td>
                  {/* PRO – highlighted */}
                  <td className="pb-6 px-2 text-center align-bottom">
                    <div className="rounded-sm relative" style={{ background: "#0e0900", border: "1.5px solid #FF6600", padding: "20px 20px 20px" }}>
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "1px solid #FF6600", boxShadow: "0 0 10px rgba(255,102,0,0.3)" }}>
                          <BoltIcon size={24} />
                        </div>
                      </div>
                      <div className="font-bebas text-xl tracking-wider text-[#FF6600]">PRO</div>
                      <div className="text-gray-500 text-xs mt-1 font-barlow">Level up. Push your limits.</div>
                    </div>
                  </td>
                  {/* Elite */}
                  <td className="pb-6 px-2 text-center align-bottom">
                    <div className="bg-[#0d0d0d] border border-white/8 px-5 py-5 rounded-sm" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(255,102,0,0.3)" }}>
                          <CrownIcon size={24} />
                        </div>
                      </div>
                      <div className="font-bebas text-xl tracking-wider text-white">ELITE</div>
                      <div className="text-gray-500 text-xs mt-1 font-barlow">No limits. Only results.</div>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="comp-row" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3 text-gray-300 font-barlow text-sm">
                        <span className="text-[#FF6600] text-base w-5 text-center opacity-80">{row.icon}</span>
                        {row.label}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center"><Cell val={row.s} /></td>
                    <td className="py-4 px-2 text-center" style={{ background: "rgba(255,102,0,0.03)" }}>
                      <Cell val={row.p} highlight />
                    </td>
                    <td className="py-4 px-2 text-center"><Cell val={row.e} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="h-[1px] w-12 bg-[#FF6600]/30" />
            <div className="flex items-center gap-2 text-gray-500 text-xs font-barlow-condensed tracking-widest">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 6v5c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6L10 2z" stroke="#FF6600" strokeWidth="1.2" fill="none" />
              </svg>
              UPGRADE ANYTIME. CANCEL ANYTIME.
            </div>
            <div className="h-[1px] w-12 bg-[#FF6600]/30" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-6 mt-28">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-5xl md:text-6xl">FREQUENTLY ASKED <span className="text-[#FF6600]">QUESTIONS</span></h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border transition-colors duration-200"
                style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}
              >
                <button
                  className="w-full text-left font-bebas text-xl px-6 py-5 flex justify-between items-center gap-4 hover:text-[#FF6600] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className={`text-[#FF6600] text-2xl transition-transform duration-300 flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-barlow text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative mt-28 py-28 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,80,0,0.35)_0%,rgba(5,5,5,1)_65%)]" />
          <EmberParticles />
          <div className="relative z-10 px-6">
            <h2 className="font-bebas text-6xl md:text-8xl text-white" style={{ textShadow: "0 0 40px rgba(255,80,0,0.7)" }}>
              START BURNING TODAY
            </h2>
            <p className="font-barlow text-gray-400 mt-4 mb-10 text-lg">Your transformation begins the moment you decide.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 font-barlow-condensed font-bold tracking-widest text-sm px-10 py-4 bg-[#FF6600] text-black hover:bg-[#FF8800] transition-colors"
            >
              JOIN INFERNO →
            </a>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
