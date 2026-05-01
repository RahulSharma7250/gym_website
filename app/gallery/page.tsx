"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import EmberParticles from "@/components/ui/EmberParticles";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["ALL", "GYM FLOOR", "TRAINING", "EVENTS", "COMMUNITY"];

const GALLERY_ITEMS = [
  { id: 1, cat: "GYM FLOOR", title: "THE MAIN FLOOR", desc: "12,000 sq ft of pure iron and determination.", gradient: "from-fire-red/40 via-deep-black to-deep-black", aspect: "aspect-square" },
  { id: 2, cat: "TRAINING", title: "DEADLIFT PLATFORM", desc: "Competition-grade Eleiko plates. No excuses.", gradient: "from-fire-orange/30 via-[#1a0800] to-deep-black", aspect: "aspect-[4/5]" },
  { id: 3, cat: "EVENTS", title: "FIGHT NIGHT 2024", desc: "Our annual MMA showcase — warriors only.", gradient: "from-fire-amber/30 via-deep-black to-deep-black", aspect: "aspect-[3/4]" },
  { id: 4, cat: "COMMUNITY", title: "TEAM WORKOUT", desc: "Saturday morning suffer sessions. Everyone welcome.", gradient: "from-[#3D2010]/60 via-deep-black to-deep-black", aspect: "aspect-square" },
  { id: 5, cat: "GYM FLOOR", title: "RECOVERY ZONE", desc: "Ice baths, saunas, and percussion therapy.", gradient: "from-fire-orange/20 via-[#0d0500] to-deep-black", aspect: "aspect-[4/5]" },
  { id: 6, cat: "TRAINING", title: "MMA CAGE", desc: "Full octagon. Train like you fight.", gradient: "from-fire-red/30 via-deep-black to-[#1a0500]", aspect: "aspect-square" },
  { id: 7, cat: "EVENTS", title: "POWERLIFTING MEET", desc: "Inter-gym competition. PR city.", gradient: "from-fire-amber/40 via-[#1a0a00] to-deep-black", aspect: "aspect-[3/4]" },
  { id: 8, cat: "COMMUNITY", title: "MEMBER BBQ", desc: "We lift together. We eat together.", gradient: "from-fire-orange/30 via-deep-black to-deep-black", aspect: "aspect-square" },
  { id: 9, cat: "GYM FLOOR", title: "CARDIO ZONE", desc: "Assault bikes, rowers, and ski-ergs lined up.", gradient: "from-fire-red/20 via-deep-black to-[#0d0500]", aspect: "aspect-[4/5]" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, delay: 0.8 });

      const texts = gsap.utils.toArray(".section-text-anim");
      texts.forEach((text) => {
        gsap.fromTo(text as HTMLElement,
          { y: 40, autoAlpha: 0 },
          {
            scrollTrigger: { trigger: text as HTMLElement, start: "top 85%" },
            y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out"
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".gallery-card");
    gsap.fromTo(cards,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.3)" }
    );
  }, [activeFilter]);

  const filtered = activeFilter === "ALL" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === activeFilter);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black text-white pb-24">

        {/* ── Hero ── */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden bg-[url('/images/bg.png')] bg-cover bg-center">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.15)_0%,transparent_60%)]" />

          <EmberParticles />

          {/* Subtle background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
            <h2 className="font-bebas text-[25vw] italic leading-none whitespace-nowrap text-white">INFERNO</h2>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35L5 10H35L20 35Z" stroke="#FF6600" strokeWidth="2" fill="rgba(255,102,0,0.2)"/>
                <path d="M12 14L20 28L28 14H12Z" fill="#FF6600"/>
              </svg>
            </div>

            <h1 className="hero-text font-bebas text-7xl md:text-9xl leading-none italic uppercase tracking-wider" style={{ textShadow: "0 0 40px rgba(255,102,0,0.4)" }}>
              THE <span className="text-[#FF6600]">GALLERY</span>
            </h1>

            <div className="mt-8 flex flex-col items-center w-full">
              {/* Divider with triangle */}
              <div className="flex items-center w-full max-w-[600px] gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FF6600]"></div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF6600]"></div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FF6600]"></div>
              </div>
              <p className="font-barlow-condensed font-bold tracking-[8px] text-sm md:text-base text-gray-300">
                SEE WHERE <span className="text-[#FF6600]">LEGENDS</span> ARE FORGED
              </p>
            </div>
          </div>
        </section>

        {/* ── Filters & Grid Section ── */}
        <section className="relative py-24 px-6 max-w-7xl mx-auto bg-[#050505]">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end mb-12 section-text-anim">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-barlow-condensed font-bold tracking-widest text-[#FF6600] text-sm uppercase">OUR FACILITY</h3>
                <div className="h-[1px] w-24 bg-[#FF6600] relative">
                  <div className="absolute right-0 top-[-3px] w-2 h-[1px] bg-[#FF6600] origin-right rotate-45"></div>
                </div>
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl italic leading-none uppercase">INSIDE THE INFERNO</h2>
              <p className="mt-6 text-gray-400 font-barlow text-lg max-w-md">
                Take a look at the equipment, the environment, and the community that makes Inferno Gym unlike any other.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-barlow-condensed font-bold text-sm tracking-widest px-6 py-2.5 transition-all duration-300 border ${
                  activeFilter === f
                    ? "bg-[#FF6600] text-black border-[#FF6600] shadow-[0_0_20px_rgba(255,102,0,0.4)]"
                    : "bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-[#FF6600]/50"
                }`}
                style={activeFilter === f ? { clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" } : {}}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`gallery-card break-inside-avoid group relative overflow-hidden cursor-pointer border border-white/5 hover:border-[#FF6600]/40 transition-all duration-300 ${item.aspect}`}
                style={{
                  clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  background: "#0c0c0c"
                }}
              >
                {/* CSS gradient placeholder for the image */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient}`} />
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,102,0,0.03) 2px, rgba(255,102,0,0.03) 4px)" }} />

                {/* Corner Tick Marks */}
                <div className="absolute top-4 right-5 flex flex-col items-end gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-6 h-[2px] bg-[#FF6600] opacity-80 rotate-[-40deg] origin-right" />
                  <div className="w-4 h-[2px] bg-[#FF6600] opacity-60 rotate-[-40deg] origin-right" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
                  <span className="font-barlow-condensed font-bold tracking-widest text-[#FF6600] mb-2">{item.cat}</span>
                  <h3 className="font-bebas text-3xl italic tracking-wide text-white leading-tight">{item.title}</h3>
                  <div className="w-8 h-[2px] bg-[#FF6600] my-3" />
                  <p className="font-barlow text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Always-visible title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-[5] group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="font-bebas text-2xl italic tracking-wide text-white/90">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Lightbox Modal ── */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-lg"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 40 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0400] border border-fire-orange w-full max-w-3xl clip-diagonal overflow-hidden relative shadow-[0_0_60px_rgba(255,102,0,0.15)]"
              >
                {/* Gradient art area */}
                <div className={`w-full h-[350px] bg-gradient-to-t ${selectedItem.gradient} relative`}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,102,0,0.05) 2px, rgba(255,102,0,0.05) 4px)" }} />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A0400] to-transparent" />
                </div>

                <div className="p-8 -mt-16 relative z-10">
                  <span className="font-barlow-condensed text-xs tracking-widest text-fire-orange">{selectedItem.cat}</span>
                  <h2 className="font-bebas text-5xl text-white mt-2">{selectedItem.title}</h2>
                  <p className="font-barlow text-gray-300 mt-4 text-lg">{selectedItem.desc}</p>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-6 text-white hover:text-fire-orange transition-colors z-20"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </PageTransition>
  );
}
