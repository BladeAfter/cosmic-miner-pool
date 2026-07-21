import { motion } from "framer-motion";
import { Waves, TrendingUp } from "lucide-react";
import { useGame } from "../store/gameStore";

export function PoolCard() {
  const { pool } = useGame();
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="relative overflow-hidden rounded-3xl p-4 glass-strong"
      style={{ boxShadow: "0 0 40px oklch(0.78 0.22 330 / 0.35)" }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pool/40 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-pool text-2xl shadow-neon">
          <Waves className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Community Pool</div>
          <div className="text-2xl font-black leading-tight">
            <span className="text-gradient-gold">{pool.toFixed(4)}</span>{" "}
            <span className="text-sm text-muted-foreground">TON</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-accent">
            <TrendingUp className="h-3 w-3" />
            <span>Próxima distribuição em 6d 12h</span>
          </div>
        </div>
      </div>
      <div className="relative mt-3 rounded-xl bg-black/30 p-2 text-[10px] text-muted-foreground">
        50% de cada compra e anúncio alimenta a Pool comunitária.
      </div>
    </motion.div>
  );
}
