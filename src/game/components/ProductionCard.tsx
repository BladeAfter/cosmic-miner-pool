import { motion } from "framer-motion";
import { useGame } from "../store/gameStore";

export function ProductionCard() {
  const { droneCount, droneProgress, skills } = useGame();
  const mine = skills.find((k) => k.id === "mining")!.level;
  const mult = skills.find((k) => k.id === "multiplier")!.level;
  const crystalLvl = skills.find((k) => k.id === "crystals")!.level;
  const cps = droneCount * (2 + mine * 0.3) * (1 + mult * 0.05);
  const cph = droneCount * 20 * (1 + crystalLvl * 0.12);

  const stats = [
    { label: "Coins/seg", value: cps.toFixed(1), color: "text-gold" },
    { label: "Cristais/h", value: cph.toFixed(0), color: "text-crystal" },
    { label: "Produção Total", value: (cps * 60).toFixed(0) + "/min", color: "text-accent" },
    { label: "Offline (2h)", value: (cps * 7200).toFixed(0), color: "text-primary" },
  ];

  return (
    <div className="glass rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Produção</div>
          <div className="text-lg font-black">Setor Alpha-7</div>
        </div>
        <div className="rounded-full bg-accent/20 border border-accent/40 px-2.5 py-1 text-[10px] font-bold text-accent">
          {droneCount} DRONES
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-black/30 border border-primary/20 p-2.5">
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className={`text-base font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Próximo Drone</span>
          <span className="font-bold text-accent">{Math.floor(droneProgress * 100)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-black/50 border border-primary/20">
          <motion.div
            className="h-full bg-gradient-accent"
            animate={{ width: `${droneProgress * 100}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
            style={{ boxShadow: "0 0 12px oklch(0.8 0.2 200)" }}
          />
        </div>
      </div>
    </div>
  );
}
