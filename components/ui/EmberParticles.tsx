"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  opacity: number;
}

export default function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = ["#FF2200", "#FF6600", "#FFAA00"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
    });

    const init = () => {
      particles = Array.from({ length: 40 }, createParticle);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        
        // Fading logic: start fading out when in top 30% of screen
        const fadeStart = canvas.height * 0.3;
        if (p.y < fadeStart) {
          p.opacity = Math.max(0, p.opacity - 0.01);
        }

        if (p.opacity <= 0 || p.y < -50) {
          particles[index] = createParticle();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Add subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        
        // Reset properties
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
