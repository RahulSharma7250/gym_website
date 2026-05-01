"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const COACHES = [
  {
    name: "KAVYA RAO",
    specialty: "HIIT / MOBILITY",
    initials: "KR",
    bio: "Will break you and put you back together.",
    exp: "8 YRS",
    image: "/images/coach5.png",
    side: "left", // text on left, image on right
    desktopClasses: "md:left-[120px] md:top-[50%] md:-translate-y-1/2",
  },
  {
    name: "VIKRAM SINGH",
    specialty: "POWERLIFTING",
    initials: "VS",
    bio: "Former national champ. Built like a tank.",
    exp: "12 YRS",
    image: "/images/coach3.png",
    side: "right",
    desktopClasses: "md:right-[60px] md:top-[30px]",
  },
  {
    name: "KARAN VEER",
    specialty: "MMA COMBAT",
    initials: "KV",
    bio: "Striking specialist. No excuses.",
    exp: "15 YRS",
    image: "/images/coach4.png",
    side: "right",
    desktopClasses: "md:right-[60px] md:bottom-[30px]",
  },
];

export default function CoachesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".coach-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[660px] w-full bg-black overflow-hidden py-10"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg.png"
          alt="Gym Background"
          fill
          className="object-cover opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/85" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-10">
        {/* Section Title */}
        <div className="mb-2">
          <h2
            className="font-bebas text-[72px] font-bold text-white uppercase tracking-wide leading-none"
          >
            MEET THE ELITE
          </h2>
          <div className="w-20 h-[3px] bg-orange-600 my-2" />
          <p
            className="font-bebas text-sm font-semibold tracking-[4px] text-gray-400 uppercase"
          >
            YOUR COACHES
          </p>
        </div>

        {/* Coaches */}
        <div className="relative h-auto md:h-[580px] mt-10 md:mt-2 flex flex-col md:block gap-12 md:gap-0">
          {COACHES.map((coach, i) => (
            <div
              key={i}
              className={`coach-item relative md:absolute flex flex-col md:flex-row items-center gap-6 group ${coach.desktopClasses} ${coach.side === "left" ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Profile Image */}
              <div className="relative w-40 h-40 shrink-0">
                {/* Outer ring */}
                <div className="absolute inset-[-8px] rounded-full border-2 border-orange-600/45 group-hover:border-orange-600/80 group-hover:scale-110 transition-all duration-500" />

                {/* Circle image */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-orange-500 bg-neutral-900 transition-all duration-300">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                    style={{ filter: "grayscale(15%) contrast(1.1)" }}
                  />
                </div>

                {/* Initials Badge */}
                <div className="absolute -top-1 -right-1 w-[50px] h-[50px] rounded-full bg-[#1a0900] border-2 border-orange-600 flex items-center justify-center z-20">
                  <span
                    className="font-bebas text-white font-bold text-lg tracking-wide"
                  >
                    {coach.initials}
                  </span>
                </div>
              </div>

              {/* Coach Info */}
              <div
                className={`flex flex-col max-w-[260px] items-center text-center md:items-start md:text-left ${coach.side === "left" ? "md:items-end md:text-right" : ""
                  }`}
              >
                <h3
                  className="font-bebas text-[38px] font-bold text-white uppercase leading-none tracking-wide group-hover:text-orange-500 transition-colors duration-300"
                >
                  {coach.name}
                  <span className="inline-block w-2 h-2 bg-orange-600 rounded-full ml-1 align-middle" />
                </h3>

                <span
                  className="font-bebas text-orange-500 font-bold text-[13px] tracking-[3px] uppercase mt-1"
                >
                  {coach.specialty}
                </span>

                <span className="text-[11px] text-gray-600 tracking-[1.5px] uppercase mt-1">
                  {coach.exp} EXPERIENCE
                </span>

                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                  {coach.bio}
                </p>

                <Link
                  href="/coaches"
                  className={`font-bebas flex items-center gap-2.5 mt-3.5 text-xs font-bold tracking-[2px] text-white/55 hover:text-white uppercase transition-all group/link ${coach.side === "left" ? "flex-row-reverse" : ""
                    }`}
                >
                  <span className="w-7 h-[1px] bg-white/25 group-hover/link:w-11 group-hover/link:bg-orange-500 transition-all duration-300" />
                  VIEW PROFILE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}