"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: "STARTER",
    price: "29",
    features: [
      { label: "Access to gym floor", icon: "dumbbell" },
      { label: "Locker room access", icon: "locker" },
      { label: "1 Group class / mo", icon: "group" },
    ],
  },
  {
    name: "PRO",
    price: "59",
    popular: true,
    features: [
      { label: "Unlimited gym access", icon: "infinity" },
      { label: "All group classes", icon: "group" },
      { label: "Recovery zone access", icon: "heart" },
      { label: "Nutrition plan", icon: "leaf" },
    ],
  },
  {
    name: "ELITE",
    price: "99",
    features: [
      { label: "Everything in Pro", icon: "crown" },
      { label: "2 PT sessions / mo", icon: "calendar" },
      { label: "Priority booking", icon: "star" },
      { label: "Guest passes", icon: "guest" },
    ],
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-side", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        x: (i: number) => (i === 0 ? -150 : 150),
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".pricing-middle", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        y: -80,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.5)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-24 px-6 bg-black"
    >
      {/* Background Image */}
      <img
        src="/images/price.png"
        alt="Gym Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      />

      {/* Subtle Overlay for Readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      {/* Ember sparks */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#ff6a00]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              animation: `sparkFloat ${2 + Math.random() * 4}s ease-in infinite ${Math.random() * 5}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <h2
          className="font-bebas leading-none tracking-wide text-white"
          style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
        >
          CHOOSE{" "}
          <span className="text-[#ff6a00] italic">YOUR PATH</span>
        </h2>
        <p
          className="mt-3 font-barlow-condensed text-[#999] tracking-[5px] text-[13px] uppercase
                     flex items-center justify-center gap-3"
        >
          <span className="h-px w-14 bg-[#ff6a00]" />
          Every journey starts with a choice.
          <span className="h-px w-14 bg-[#ff6a00]" />
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col md:flex-row items-stretch justify-center gap-8 md:gap-4 lg:gap-8">
        {TIERS.map((tier, i) => {
          const isMid = i === 1;
          return (
            <div
              key={tier.name}
              className={`relative flex flex-1 flex-col
                ${isMid
                  ? "pricing-middle z-10 px-9 py-11"
                  : "pricing-side px-8 py-9"
                }`}
            >

              {/* Most Popular badge */}
              {isMid && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20
                             bg-[#ff6a00] font-barlow-condensed font-bold text-[11px]
                             tracking-[3px] text-white px-5 py-[5px] whitespace-nowrap"
                  style={{ clipPath: "polygon(8px 0%,calc(100% - 8px) 0%,100% 100%,0% 100%)" }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Card content */}
              <div className={`relative z-10 flex flex-1 flex-col ${isMid ? "mt-3" : ""}`}>
                {/* Slash prefix */}
                <p
                  className="font-barlow-condensed font-extrabold text-[#ff6a00] text-[18px] mb-1"
                  style={{ letterSpacing: "-2px" }}
                >
                  {"////"}
                </p>

                {/* Tier name */}
                <div className="relative">
                  <h3 className="font-bebas text-[32px] text-white tracking-widest leading-none">
                    {tier.name}
                  </h3>
                  <div className="mt-1.5 h-[2px] w-12 bg-[#ff6a00]" />
                </div>

                {/* Price */}
                <div className="flex items-end gap-0 mt-5 mb-7">
                  <span className="font-bebas text-[32px] text-[#ff6a00] leading-none pb-3">
                    $
                  </span>
                  <span className="font-bebas text-[88px] text-white leading-none">
                    {tier.price}
                  </span>
                  <span className="font-barlow text-[13px] text-[#666] pb-3 ml-1">
                    / mo
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-1 flex-col gap-[18px] mb-9">
                  {tier.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center gap-3 font-barlow text-[15px] text-[#ccc]"
                    >
                      <FeatureIcon icon={f.icon} />
                      {f.label}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isMid ? (
                  <button
                    className="w-full flex items-center justify-between
                               bg-[#ff6a00] text-white font-barlow-condensed font-bold
                               text-[16px] tracking-[3px] uppercase px-6 py-[14px]
                               transition-[filter] duration-200 hover:brightness-110"
                    style={{ clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 100%,14px 100%)" }}
                  >
                    CATCH FIRE <span>→</span>
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-between
                               border border-[#ff6a0088] text-[#ff6a00]
                               font-barlow-condensed font-bold text-[15px] tracking-[3px] uppercase
                               px-5 py-[14px] bg-transparent
                               hover:bg-[#ff6a00]/[0.08] hover:border-[#ff6a00]
                               transition-all duration-200"
                  >
                    START BURNING <span>→</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spark keyframe */}
      <style>{`
        @keyframes sparkFloat {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          20%  { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-120px) scale(0.3); }
        }
      `}</style>
    </section>
  );
}

/* Icon per feature — inline SVG, orange stroked */
function FeatureIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    dumbbell: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <rect x="2" y="10" width="4" height="4" rx="1" /><rect x="18" y="10" width="4" height="4" rx="1" />
        <line x1="6" y1="12" x2="18" y2="12" /><rect x="9" y="8" width="6" height="8" rx="1" />
      </svg>
    ),
    locker: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" />
      </svg>
    ),
    group: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <circle cx="9" cy="8" r="3" /><circle cx="15" cy="8" r="3" />
        <path d="M3 20c0-4 2.7-7 6-7h6c3.3 0 6 3 6 7" />
      </svg>
    ),
    infinity: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z" />
        <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <path d="M12 2C8 2 5 6 5 10c0 5.25 7 12 7 12s7-6.75 7-12c0-4-3-8-7-8z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    crown: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <path d="M5 3l2 5h10l2-5" /><path d="M3 8h18l-2 10H5L3 8z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    guest: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a00" strokeWidth="1.8" className="w-[22px] h-[22px] shrink-0">
        <rect x="3" y="8" width="12" height="8" rx="1" />
        <line x1="15" y1="11" x2="21" y2="9" /><line x1="15" y1="13" x2="21" y2="15" />
      </svg>
    ),
  };
  return icons[icon] ?? null;
}