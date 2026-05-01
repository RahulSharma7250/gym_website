"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import AngleButton from "@/components/ui/AngleButton";
import Magnetic from "@/components/ui/Magnetic";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "GALLERY", href: "/gallery" },
  { label: "MEMBERSHIP", href: "/membership" },
  { label: "CONTACT US", href: "/contact" },
  { label: "COACHES", href: "/coaches" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(linkRefs.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? "bg-[rgba(8,4,0,0.85)] backdrop-blur-xl border-b border-fire-orange/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 z-50">
            <span className="font-bebas text-white text-3xl tracking-wide">INFERNO</span>
            <span className="font-bebas text-fire-orange text-3xl tracking-wide">GYM</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={link.label}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    className="relative group"
                  >
                    <Magnetic strength={0.3}>
                      <Link
                        href={link.href}
                        className="font-barlow-condensed font-bold text-[12px] tracking-[3px] uppercase text-white hover:text-fire-orange transition-colors py-2 px-1"
                      >
                        {link.label}
                      </Link>
                    </Magnetic>
                    {/* Active Underline */}
                    <div
                      className={`absolute -bottom-2 left-0 h-[2px] bg-fire-orange transition-all duration-300 ${
                        isActive ? "w-full shadow-[0_0_8px_rgba(255,102,0,0.5)]" : "w-0 group-hover:w-full"
                      }`}
                      style={{ transformOrigin: "left" }}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action */}
          <div className="hidden lg:block" ref={(el) => { linkRefs.current[NAV_LINKS.length] = el as HTMLElement; }}>
            <AngleButton label="JOIN NOW" href="/membership" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-[2px] w-full bg-current transform transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
              <span className={`block h-[2px] w-full bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-full bg-current transform transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0A0300] z-[90] flex flex-col items-center justify-center"
            style={{
              background: "radial-gradient(circle at center, rgba(34,10,0,1) 0%, rgba(8,4,0,1) 100%)"
            }}
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bebas text-5xl text-white hover:text-fire-orange transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8">
                 <AngleButton label="JOIN NOW" href="/membership" onClick={() => setMobileMenuOpen(false)} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
