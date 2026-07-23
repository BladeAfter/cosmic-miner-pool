import { motion } from "framer-motion";
import {
  ShoppingCart,
  Waves,
  Target,
  Wallet,
} from "lucide-react";

type Tab = "home" | "shop" | "pool" | "missions";

interface PlanetProps {
  onNavigate: (tab: Tab) => void;
}

export function Planet({ onNavigate }: PlanetProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">

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
            duration: 22 + i * 8,
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
      <motion.button
        onClick={() => onNavigate("home")}
        animate={{ rotate: 360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #70d6ff, #3454d1 45%, #111827 95%)",
        }}
      >
        <div className="absolute left-[22%] top-[28%] h-6 w-6 rounded-full bg-black/20" />
        <div className="absolute left-[60%] top-[58%] h-10 w-10 rounded-full bg-black/20" />
      </motion.button>

      {/* Botões */}

      <OrbitButton
        icon={<ShoppingCart size={28} />}
        label="Loja"
        className="left-0 top-10"
        onClick={() => onNavigate("shop")}
      />

      <OrbitButton
        icon={<Waves size={28} />}
        label="Pool"
        className="right-0 top-10"
        onClick={() => onNavigate("pool")}
      />

      <OrbitButton
        icon={<Target size={28} />}
        label="Missões"
        className="left-2 bottom-10"
        onClick={() => onNavigate("missions")}
      />

      <OrbitButton
        icon={<Wallet size={28} />}
        label="Wallet"
        className="right-2 bottom-10"
        onClick={() => alert("Wallet em desenvolvimento")}
      />

      {/* Partículas */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
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
              opacity: [0.2, 1, 0.2],
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

interface OrbitButtonProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

function OrbitButton({
  icon,
  label,
  className,
  onClick,
}: OrbitButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-violet-400/40 bg-slate-900/70 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,.35)] ${className}`}
    >
      <div className="text-cyan-300">{icon}</div>

      <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white">
        {label}
      </span>
    </motion.button>
  );
}