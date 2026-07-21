import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useGame } from "../store/gameStore";

export function SkillsSection() {
  const { skills, gold, upgradeSkill } = useGame();
  return (
    <section>
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-base font-black">
          <span className="text-gradient-primary">Habilidades Ativas</span>
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {skills.length} skills
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {skills.map((s) => {
          const cost = s.costFor(s.level);
          const canAfford = gold >= cost;
          return (
            <motion.div
              key={s.id}
              whileTap={{ scale: 0.98 }}
              className="glass relative overflow-hidden rounded-2xl p-3"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-2xl shadow-neon">
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-sm font-black">{s.name}</h3>
                    <span className="shrink-0 rounded-md bg-accent/25 border border-accent/40 px-1.5 text-[10px] font-black text-accent">
                      LV {s.level}
                    </span>
                  </div>
                  <p className="truncate text-[10px] text-muted-foreground">{s.desc}</p>
                  <p className="truncate text-[11px] font-bold text-gold">{s.bonusLabel(s.level)}</p>
                </div>
                <button
                  onClick={() => upgradeSkill(s.id)}
                  disabled={!canAfford}
                  className="group grid shrink-0 place-items-center rounded-xl bg-gradient-primary px-2.5 py-2 text-primary-foreground shadow-neon transition disabled:opacity-40 active:scale-95"
                >
                  <ChevronUp className="h-4 w-4" strokeWidth={3} />
                  <span className="text-[9px] font-black">{cost.toLocaleString()}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
