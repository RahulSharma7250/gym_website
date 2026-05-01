"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
  "500+ MEMBERS", "12 ELITE COACHES", "24/7 OPEN", "EST. 2019",
  "TRAIN HARDER", "NO EXCUSES", "BURN EVERYTHING", "FORGED IN FIRE",
  "ZERO LIMITS", "PURE INTENSITY"
];

export default function StatsTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tickerRef.current, {
        scrollTrigger: { trigger: tickerRef.current, start: "top 95%" },
        y: 80, opacity: 0, duration: 0.8, ease: "power3.out"
      });
    }, tickerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={tickerRef} className="w-full h-[60px] bg-[#0D0500] border-y border-fire-orange/10 overflow-hidden flex items-center relative z-[30] group">
      <div className="flex w-fit group-hover:[animation-play-state:paused]"
        style={{ animation: "marquee 30s linear infinite" }}>
        {[1, 2].map((listIdx) => (
          <div key={listIdx} className="flex items-center shrink-0">
            {TICKER_ITEMS.map((item, i) => (
              <div key={`${listIdx}-${i}`} className="flex items-center">
                <span className="font-barlow-condensed font-bold text-[13px] tracking-[4px] text-white/80 whitespace-nowrap px-8 hover:text-fire-orange transition-colors">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-fire-orange fire-pulse"
                  style={{ boxShadow: "0 0 8px #FF6600, 0 0 20px rgba(255,102,0,0.3)" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
