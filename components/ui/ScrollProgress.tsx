"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[10001] pointer-events-none">
      <div
        className="h-full transition-[width] duration-100 ease-out relative"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #FF2200, #FF6600, #FFAA00)",
          boxShadow: "0 0 15px #FF6600, 0 0 30px rgba(255,102,0,0.4)",
        }}
      >
        {/* Glowing tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-fire-amber"
          style={{ boxShadow: "0 0 12px #FFAA00, 0 0 25px #FF6600" }} />
      </div>
    </div>
  );
}
