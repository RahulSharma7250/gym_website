interface FireGlowProps {
  intensity?: "low" | "medium" | "high";
  position?: "center" | "bottom" | "top";
  className?: string;
}

export default function FireGlow({
  intensity = "medium",
  position = "center",
  className = "",
}: FireGlowProps) {
  const intensityMap = {
    low: "rgba(255, 102, 0, 0.15)",
    medium: "rgba(255, 102, 0, 0.3)",
    high: "rgba(255, 34, 0, 0.5)",
  };

  const posMap = {
    center: "50% 50%",
    bottom: "50% 100%",
    top: "50% 0%",
  };

  // Convert var to rgba for gradient transparency
  const rawColor = intensityMap[intensity];

  return (
    <div
      className={`absolute inset-0 pointer-events-none mix-blend-screen z-0 ${className}`}
      style={{
        background: `radial-gradient(ellipse at ${posMap[position]}, ${rawColor} 0%, transparent 60%)`,
      }}
    />
  );
}
