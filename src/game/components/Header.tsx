import { Coins, Gem, Zap } from "lucide-react";
import { useGame } from "../store/gameStore";
import { ResourceBadge } from "./ResourceBadge";

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toFixed(0);
}

export function Header() {
  const { gold, crystals, energy, energyMax, level } = useGame();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pb-2 backdrop-blur-xl bg-background/60 border-b border-primary/20">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-sm font-black shadow-neon">
            {level}
          </div>

          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Comandante
            </div>

            <div className="text-sm font-bold">
              Astro Elite
            </div>
          </div>
        </div>

        <span className="rounded-full bg-primary/20 border border-primary/40 px-2 py-0.5 text-[10px] font-bold text-primary">
          LVL {level}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">

        <ResourceBadge
          icon={<Coins className="h-4 w-4 text-yellow-950" strokeWidth={2.5} />}
          label="Coins"
          value={fmt(gold)}
          gradient="var(--gradient-gold)"
          glow="oklch(0.85 0.18 90 / 0.4)"
        />

        <ResourceBadge
          icon={<Gem className="h-4 w-4 text-cyan-950" strokeWidth={2.5} />}
          label="Crystals"
          value={fmt(crystals)}
          gradient="var(--gradient-crystal)"
          glow="oklch(0.8 0.2 200 / 0.4)"
        />

        <ResourceBadge
          icon={<Zap className="h-4 w-4 text-green-950" strokeWidth={2.5} />}
          label="Energia"
          value={`${Math.floor(energy)}/${energyMax}`}
          gradient="linear-gradient(135deg, oklch(0.85 0.2 140), oklch(0.65 0.22 160))"
          glow="oklch(0.85 0.2 140 / 0.4)"
        />

      </div>
    </header>
  );
}