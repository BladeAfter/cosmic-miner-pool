import { motion } from "framer-motion";
import {
  ShoppingCart,
  Waves,
  Target,
  Wallet,
} from "lucide-react";
import { ReactNode } from "react";

type Tab = "shop" | "pool" | "missions" | "wallet";

interface PlanetProps {
  onNavigate: (tab: Tab) => void;
}

export function Planet({ onNavigate }: PlanetProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">

      {/* Glow animado */}
      <motion.div
        className="absolute inset-10 rounded-full"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(70,170,255,.45) 0%, transparent 70%)",
        }}
      />

      {/* Órbita externa */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-2 rounded-full border border-cyan-400/15"
      />

      {/* Órbita interna */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-8 rounded-full border border-white/10"
      />

   {/* Drones Mineradores */}
{[0, 1, 2].map((i) => (
  <motion.div
    key={i}
    className="absolute inset-0 z-20"
    animate={{ rotate: 360 }}
    transition={{
      duration: 20 + i * 6,
      repeat: Infinity,
      ease: "linear",
      delay: i * 2,
    }}
  >
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={{
        transform: `rotate(${i * 120}deg) translateX(-110px)`,
        transformOrigin: "center center",
      }}
      animate={{
        rotate: -360,
      }}
      transition={{
        duration: 20 + i * 6,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Drone */}
      <motion.img
        src="/drone.png"
        alt="Drone"
        draggable={false}
        className="relative z-20 h-8 w-8 select-none drop-shadow-[0_0_12px_rgba(0,220,255,.8)]"
        animate={{
          scale: [1, 1.08, 1],
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

  
{/* Laser */}
<motion.div
  className="absolute left-1/2 top-1/2"
  style={{
    width: "2px",
    height: "92px",
    background:
      "linear-gradient(to bottom, rgba(0,255,255,1), rgba(0,180,255,.5), transparent)",
    transform: "translate(-50%, 12px)",
    transformOrigin: "top center",
    boxShadow: "0 0 10px cyan",
    borderRadius: "999px",
  }}
  animate={{
    opacity: [0.2, 1, 0.2],
    scaleY: [0.8, 1.1, 0.8],
  }}
  transition={{
    duration: 1,
    repeat: Infinity,
  }}
/>

</motion.div>
</motion.div>
))}


      {/* Planeta */}
      <motion.img
        src="/planet-mining.png"
        alt="Mining Planet"
        draggable={false}
        className="absolute left-1/2 top-1/2 z-10 w-[62%] -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_0_35px_rgba(0,180,255,.45)]"
        animate={{
          rotate: 360,
          y: [-5, 5, -5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: {
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* Partículas */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 38;

        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        );
      })}

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
        onClick={() => onNavigate("wallet")}
      />
    </div>
  );
}

interface OrbitButtonProps {
  icon: ReactNode;
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