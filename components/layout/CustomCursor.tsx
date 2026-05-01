"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail particle
      trailId++;
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: trailId }]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        !!target.closest("a") ||
        !!target.closest("button")
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Clean up old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-6));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-screen"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            x: point.x - 3,
            y: point.y - 3,
            width: 6,
            height: 6,
            background: `rgba(255, ${102 + i * 20}, 0, 0.8)`,
          }}
        />
      ))}

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10001] mix-blend-screen"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicking ? 0.5 : isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "#FFAA00" : "#FF6600",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ width: 10, height: 10 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-screen"
        animate={{
          x: mousePosition.x - 22,
          y: mousePosition.y - 22,
          scale: isClicking ? 0.6 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(255,170,0,0.8)" : "rgba(255,102,0,0.5)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
        style={{
          width: 44,
          height: 44,
          border: "1.5px solid rgba(255,102,0,0.5)",
          boxShadow: isHovered ? "0 0 20px rgba(255,170,0,0.3)" : "none",
        }}
      />
    </>
  );
}
