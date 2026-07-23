import { motion } from "framer-motion";

export function Planet() {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[320px] overflow-hidden place-items-center">

      {/* Glow */}
      <div
        className="absolute inset-10 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(90,140,255,.35) 0%, transparent 70%)",
        }}
      />

      {/* Órbitas */}
      <div className="absolute inset-2 rounded-full border border-white/10" />
      <div className="absolute inset-8 rounded-full border border-cyan-400/10" />

      {/* Drones */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20 + i * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 text-xl"
            style={{
              left: `${10 + i * 8}%`,
            }}
          >
            🛸
          </div>
        </motion.div>
      ))}

      {/* Planeta */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative h-[62%] w-[62%] overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #70d6ff, #3454d1 45%, #111827 95%)",
        }}
      >
        <div className="absolute left-[22%] top-[28%] h-6 w-6 rounded-full bg-black/20" />
        <div className="absolute left-[60%] top-[58%] h-10 w-10 rounded-full bg-black/20" />
      </motion.div>

      {/* Partículas */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 34;

        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-300"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}