"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_TESTIMONIALS = [
  {
    name: "RAHUL K.",
    quote: "I thought I knew what training was until I came here. It's brutal, and it works.",
  },
];

const RIGHT_TESTIMONIALS = [
  {
    name: "PRIYA M.",
    quote: "The community pushes you past your limits. You can't hide in the back here.",
  },
  {
    name: "SUNIL R.",
    quote: "Lost 18kg, gained a family. Inferno changed everything.",
  },
];

function TestimonialCard({
  name,
  quote,
  cardRef,
}: {
  name: string;
  quote: string;
  cardRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={cardRef} className="flex flex-col gap-3">
      {/* Orange double-quote mark */}
      <span className="font-bebas text-5xl text-fire-orange leading-none">&ldquo;&ldquo;</span>
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, idx) => (
          <span key={idx} className="text-fire-orange text-base">★</span>
        ))}
      </div>
      {/* Quote */}
      <p className="font-barlow text-white/90 italic text-lg leading-snug">{quote}</p>
      {/* Divider */}
      <div className="w-8 h-[2px] bg-white/60 my-1" />
      {/* Name */}
      <h4 className="font-bebas text-white tracking-widest text-xl">{name}</h4>
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        x: -60,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(leftCardRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        x: -40,
        opacity: 0,
        duration: 0.7,
        delay: 0.25,
        ease: "power2.out",
      });

      gsap.from(rightCardsRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.25,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden min-h-[750px]"
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/images/test.png" // 🔁 Replace with your actual image path
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain object-center"
        />

        {/* Dark overlay across entire section for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Stronger dark fade on LEFT side — behind text */}
        <div className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        {/* Stronger dark fade on RIGHT side — behind text */}
        <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-black/90 via-black/60 to-transparent" />

        {/* Fire/ember glow at bottom corners */}
        <div className="absolute bottom-0 left-0 w-72 h-40 bg-fire-orange/15 blur-[60px]" />
        <div className="absolute bottom-0 right-0 w-72 h-40 bg-fire-orange/15 blur-[60px]" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-0 items-center min-h-[600px]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-between gap-12 lg:gap-20 pr-0 lg:pr-6 py-8 lg:py-4 h-full">
            {/* Title block */}
            <div ref={titleRef}>
              <h2 className="font-bebas text-6xl md:text-7xl text-white leading-none tracking-tight mb-3">
                MEMBER STORIES
              </h2>
              <div className="w-16 h-[3px] bg-fire-orange mb-4" />
              <p className="font-bebas text-lg tracking-widest text-white/80">
                NO LIES.{" "}
                <span className="text-fire-orange">JUST RESULTS.</span>
              </p>
            </div>

            {/* Left testimonial — sits at the bottom of the column */}
            <TestimonialCard
              name={LEFT_TESTIMONIALS[0].name}
              quote={LEFT_TESTIMONIALS[0].quote}
              cardRef={leftCardRef}
            />
          </div>

          {/* ── CENTER COLUMN: intentionally empty — shows the athlete through ── */}
          <div className="hidden lg:block" />

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col justify-center gap-12 lg:gap-14 pl-0 lg:pl-6 py-8 lg:py-4">
            {RIGHT_TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={i}
                name={t.name}
                quote={t.quote}
                cardRef={(el) => { rightCardsRef.current[i] = el; }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}