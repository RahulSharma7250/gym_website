"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AngleButtonProps {
  label: string;
  href?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  className?: string;
}

export default function AngleButton({
  label,
  href,
  variant = "primary",
  onClick,
  className = "",
}: AngleButtonProps) {
  const variants = {
    primary: "bg-fire-orange text-deep-black hover:bg-fire-amber",
    outline: "bg-transparent text-fire-orange border border-fire-orange hover:bg-fire-orange/10",
  };

  const Inner = (
    <motion.span
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 clip-angle font-barlow-condensed font-bold tracking-widest text-sm px-8 py-3.5 transition-all duration-300 relative overflow-hidden group ${variants[variant]} ${className}`}
    >
      {/* Shimmer sweep on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      <span className="relative z-10 uppercase">{label}</span>
      <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
    </motion.span>
  );

  if (href) {
    return <Link href={href} onClick={onClick}>{Inner}</Link>;
  }
  return <button onClick={onClick} type="submit">{Inner}</button>;
}
