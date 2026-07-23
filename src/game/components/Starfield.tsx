import { useMemo } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

export function Starfield({ count = 30 }: { count?: number }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.5 + 1,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle opacity-80"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Glow leve para celulares */}
      <div
        className="absolute -top-52 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,.5) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 h-72 w-72 opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,.4) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}