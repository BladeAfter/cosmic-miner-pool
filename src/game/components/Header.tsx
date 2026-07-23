import { Coins, Gem, Zap } from "lucide-react";
import { useGame } from "../store/gameStore";
import { ResourceBadge } from "./ResourceBadge";
import { useTelegram } from "../../hooks/useTelegram";

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
  const level = useGame((state) => state.level);

  const { user } = useTelegram();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pb-2 bg-background/90 border-b border-primary/20 shadow-lg">
      
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-primary text-sm font-black">
            {user?.photo_url ? (
              <img
                src={user.photo_url}
                alt={user.first_name}
                className="h-full w-full object-cover"
              />
            ) : (
              level
            )}
          </div>

          {/* Nome Telegram */}
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Comandante
            </div>

            <div className="text-sm font-bold">
              {user
                ? `${user.first_name} ${user.last_name ?? ""}`
                : "Astro Elite"}
            </div>

            {user && (
              <div className="text-[10px] text-cyan-400">
                ID: {user.id}
              </div>
            )}
          </div>

        </div>

        <span className="rounded-full border border-primary/40 bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
          LVL {level}
        </span>
      </div>


      <div className="grid grid-cols-3 gap-2">

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