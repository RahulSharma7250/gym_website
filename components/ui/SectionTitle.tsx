"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".char");
      
      gsap.from(chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
      });

      if (subtitle) {
        gsap.from(".subtitle", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 20,
          duration: 1,
          delay: 0.4,
        });
      }
      
      // Animated line
      gsap.from(".line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        scaleX: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [title, subtitle]);

  return (
    <div ref={containerRef} className={`relative inline-block mb-12 ${className}`}>
      <h2 className="font-bebas text-5xl md:text-7xl overflow-hidden leading-tight flex flex-wrap">
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="char inline-block translate-y-0"
            style={{ minWidth: char === " " ? "0.3em" : "auto" }}
          >
            {char}
          </span>
        ))}
      </h2>
      <div className="line h-1 w-2/3 bg-fire-orange mt-2 transform origin-left" />
      {subtitle && (
        <p className="subtitle mt-4 font-barlow-condensed font-bold tracking-widest text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
