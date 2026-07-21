import { motion } from "framer-motion";

export function Planet() {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[340px] place-items-center">
      {/* outer glow */}
      <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />

      {/* orbit rings */}
      <div className="absolute inset-2 rounded-full border border-primary/20" />
      <div className="absolute inset-8 rounded-full border border-accent/20" />

      {/* orbiting drones */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear" }}
          style={{ animationDelay: `${i}s` }}
        >
          <div
            className="absolute top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-lg glass"
            style={{ left: `${5 + i * 3}%`, boxShadow: "0 0 20px oklch(0.78 0.18 200 / 0.7)" }}
          >
            🛸
          </div>
        </motion.div>
      ))}

      {/* tiny ships */}
      {[0, 1].map((i) => (
        <motion.div
          key={`ship-${i}`}
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 16 + i * 6, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 text-xs"
            style={{ right: `${2 + i * 6}%`, filter: "drop-shadow(0 0 6px #7cf)" }}
          >
            🚀
          </div>
        </motion.div>
      ))}

      {/* planet */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="relative h-[62%] w-[62%] rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.85 0.2 200), oklch(0.55 0.25 275) 45%, oklch(0.2 0.1 275) 90%)",
          boxShadow:
            "inset -20px -30px 60px oklch(0.05 0.05 275 / 0.8), 0 0 50px oklch(0.72 0.2 300 / 0.6)",
        }}
      >
        {/* surface craters */}
        <div className="absolute left-[20%] top-[30%] h-8 w-8 rounded-full bg-black/30 blur-sm" />
        <div className="absolute left-[55%] top-[55%] h-12 w-12 rounded-full bg-black/25 blur-md" />
        <div className="absolute left-[35%] top-[70%] h-6 w-6 rounded-full bg-black/30 blur-sm" />
        {/* neon veins */}
        <div className="absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, oklch(0.85 0.25 320 / 0.5), transparent 40%), radial-gradient(circle at 20% 70%, oklch(0.8 0.22 200 / 0.5), transparent 40%)",
          }}
        />
      </motion.div>

      {/* particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = 42 + Math.random() * 5;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent"
            style={{
              left: `calc(50% + ${Math.cos(angle) * r}%)`,
              top: `calc(50% + ${Math.sin(angle) * r}%)`,
              boxShadow: "0 0 8px oklch(0.85 0.2 200)",
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}
    </div>
  );
}
