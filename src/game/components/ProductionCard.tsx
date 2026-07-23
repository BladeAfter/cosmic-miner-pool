import { useMemo } from "react";
import { useGame } from "../store/gameStore";

export function ProductionCard() {
  const droneCount = useGame((s) => s.droneCount);
  const droneProgress = useGame((s) => s.droneProgress);
  const skills = useGame((s) => s.skills);

  const mine = skills.find((k) => k.id === "mining")?.level ?? 1;
  const mult = skills.find((k) => k.id === "multiplier")?.level ?? 1;
  const crystalLvl = skills.find((k) => k.id === "crystals")?.level ?? 1;

  const { cps, cph, totalMin, offline } = useMemo(() => {
    const cps = droneCount * (2 + mine * 0.3) * (1 + mult * 0.05);
    const cph = droneCount * 20 * (1 + crystalLvl * 0.12);

    return {
      cps,
      cph,
      totalMin: cps * 60,
      offline: cps * 7200,
    };
  }, [droneCount, mine, mult, crystalLvl]);

  const stats = [
    {
      label: "Coins/seg",
      value: cps.toFixed(1),
      color: "text-gold",
    },
    {
      label: "Cristais/h",
      value: cph.toFixed(0),
      color: "text-crystal",
    },
    {
      label: "Produção Total",
      value: totalMin.toFixed(0) + "/min",
      color: "text-accent",
    },
    {
      label: "Offline (2h)",
      value: offline.toFixed(0),
      color: "text-primary",
    },
  ];

  return (
    <div className="glass rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Produção
          </div>

          <div className="text-lg font-black">
            Setor Alpha-7
          </div>
        </div>

        <div className="rounded-full border border-accent/40 bg-accent/20 px-2.5 py-1 text-[10px] font-bold text-accent">
          {droneCount} DRONES
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-primary/20 bg-black/30 p-2.5"
          >
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>

            <div className={`text-base font-black ${s.color}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">
            Próximo Drone
          </span>

          <span className="font-bold text-accent">
            {Math.floor(droneProgress * 100)}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full border border-primary/20 bg-black/50">
          <div
            className="h-full rounded-full bg-gradient-accent transition-all duration-500"
            style={{
              width: `${droneProgress * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}