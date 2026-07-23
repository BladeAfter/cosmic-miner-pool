import { Coins, Gem, Zap } from "lucide-react";
import { useGame } from "../store/gameStore";
import { ResourceBadge } from "./ResourceBadge";
import { TelegramProfile } from "./TelegramProfile";

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toFixed(0);
}

export function Header() {
  const gold = useGame((state) => state.gold);
  const crystals = useGame((state) => state.crystals);
  const energy = useGame((state) => state.energy);
  const energyMax = useGame((state) => state.energyMax);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pb-2 bg-background/90 border-b border-primary/20 shadow-lg">

      <TelegramProfile />

      <div className="mt-3 grid grid-cols-3 gap-2">
        <ResourceBadge
          icon={<Coins className="h-4 w-4 text-yellow-950" strokeWidth={2.5} />}
          label="Coins"
          value={fmt(gold)}
          gradient="var(--gradient-gold)"
          glow="transparent"
        />

        <ResourceBadge
          icon={<Gem className="h-4 w-4 text-cyan-950" strokeWidth={2.5} />}
          label="Crystals"
          value={fmt(crystals)}
          gradient="var(--gradient-crystal)"
          glow="transparent"
        />

        <ResourceBadge
          icon={<Zap className="h-4 w-4 text-green-950" strokeWidth={2.5} />}
          label="Energia"
          value={`${Math.floor(energy)}/${energyMax}`}
          gradient="linear-gradient(135deg,#55e68a,#2bb673)"
          glow="transparent"
        />
      </div>

    </header>
  );
}