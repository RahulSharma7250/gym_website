"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-left", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        x: -200, opacity: 0, duration: 1, ease: "power3.out"
      });
      gsap.from(".about-right", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        x: 200, opacity: 0, duration: 1, ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full min-h-[700px] flex bg-[#0d0d0d] overflow-hidden my-20"
    >
      {/* Orange line background */}
      <div className="absolute inset-0 w-full md:w-[55%] bg-[#ff4d00] z-10 hidden md:block" style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}></div>

      {/* Left Image Section */}
      <div className="absolute inset-0 w-full md:w-[55%] bg-black z-20 about-left" style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, calc(85% - 6px) 100%, 0 100%)" }}>
        <img src="/images/about_weightlifter.png" alt="Weightlifter" className="absolute inset-0 w-full h-full object-cover object-top opacity-70 mix-blend-lighten" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

        {/* Text */}
        <div className="absolute inset-y-0 left-0 p-8 lg:pl-[10%] xl:pl-[15%] flex flex-col justify-center">
          <div className="font-bebas text-[140px] md:text-[180px] leading-[0.8] flex items-end">
            <span className="text-transparent font-bold tracking-tighter" style={{ WebkitTextStroke: "3px #ff4d00" }}>
              <CountUp end={10} duration={2.5} />
            </span>
            <span className="text-[#ff4d00] text-[100px] md:text-[140px] leading-[0.8] ml-2 mb-2 md:mb-4">+</span>
          </div>
          <div className="font-bebas text-4xl md:text-5xl text-white mt-2 tracking-wider">YEARS</div>
          <div className="font-bebas text-lg md:text-xl text-white mt-6 tracking-widest uppercase">
            Forging Champions Since 2014
          </div>
        </div>
      </div>

      {/* Right Side Content Container */}
      <div className="w-full md:w-[55%] ml-auto py-16 px-8 lg:pr-[10%] xl:pr-[15%] flex flex-col justify-center relative z-10 about-right">

        {/* Top Slanted Images Collage */}
        <div className="absolute top-0 right-0 w-[90%] md:w-[85%] h-48 md:h-56 hidden md:flex gap-2">
          <div className="flex-1 transform -skew-x-[15deg] overflow-hidden bg-black shadow-2xl z-10">
            <img src="/images/about_boxer.png" className="w-full h-full object-cover transform skew-x-[15deg] scale-125 object-top opacity-80" />
          </div>
          <div className="flex-1 transform -skew-x-[15deg] overflow-hidden bg-black shadow-2xl z-20">
            <img src="/images/about_female.png" className="w-full h-full object-cover transform skew-x-[15deg] scale-125 object-top opacity-80" />
          </div>
          <div className="flex-1 transform -skew-x-[15deg] overflow-hidden bg-black shadow-2xl z-30 mr-[-5%]">
            <img src="/images/about_bodybuilder.png" className="w-full h-full object-cover transform skew-x-[15deg] scale-125 object-top opacity-80" />
          </div>
        </div>

        <div className="mt-0 md:mt-48 md:pl-16 relative z-30">
          <h2 className="font-bebas text-5xl md:text-6xl italic leading-[1.1] mb-6 tracking-wide">
            <span className="text-white block">NOT JUST A GYM.</span>
            <span className="text-[#ff4d00] block">A PROVING GROUND.</span>
          </h2>

          <div className="space-y-6">
            <p className="font-barlow text-gray-300 text-sm leading-relaxed max-w-[95%]">
              We don't believe in quick fixes or comfortable routines. At Inferno, we provide the elite equipment, the hardcore atmosphere, and the uncompromising community you need to shatter your limits.
            </p>
            <p className="font-barlow text-[#888] text-xs leading-relaxed max-w-[95%]">
              Whether you're stepping onto the platform for the first time or preparing for your next professional bout, our walls are built to handle your intensity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
