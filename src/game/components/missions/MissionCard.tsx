import { motion } from "framer-motion";
import {
  Check,
  Send,
  Newspaper,
  CreditCard,
  Coins,
  Diamond,
  Trophy,
  Pickaxe,
  BatteryCharging,
  Package,
} from "lucide-react";

interface MissionCardProps {
  mission: {
    id: string;
    title: string;
    desc: string;
    progress: number;
    goal: number;
    cta?: string;
    reward: {
      gold?: number;
      crystals?: number;
    };
  };

  onClaim: () => void;
}

const icons: Record<
  string,
  {
    icon: React.ElementType;
    bg: string;
  }
> = {
  Telegram: {
    icon: Send,
    bg: "from-sky-500 to-blue-600",
  },

  News: {
    icon: Newspaper,
    bg: "from-violet-500 to-fuchsia-600",
  },

  Payments: {
    icon: CreditCard,
    bg: "from-emerald-500 to-green-600",
  },

  Mine: {
    icon: Pickaxe,
    bg: "from-orange-500 to-yellow-500",
  },

  Energy: {
    icon: BatteryCharging,
    bg: "from-lime-500 to-green-500",
  },

  Box: {
    icon: Package,
    bg: "from-amber-500 to-orange-500",
  },

  Default: {
    icon: Trophy,
    bg: "from-cyan-500 to-blue-600",
  },
};

export function MissionCard({
  mission,
  onClaim,
}: MissionCardProps) {
  const complete = mission.progress >= mission.goal;

  const percent = Math.min(
    100,
    (mission.progress / mission.goal) * 100
  );

  const style =
    mission.cta && icons[mission.cta]
      ? icons[mission.cta]
      : icons.Default;

  const Icon = style.icon;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl border border-cyan-500/15 bg-[#111827] p-3 shadow-lg transition hover:border-cyan-400/30"
    >
      <div className="flex items-center gap-3">

        {/* Ícone */}

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.bg}`}
        >
          <Icon
            className="h-6 w-6 text-white"
            strokeWidth={2.5}
          />
        </div>

        {/* Conteúdo */}

        <div className="flex-1 min-w-0">

          <div className="flex items-center justify-between">

            <h3 className="truncate text-sm font-black text-white">
              {mission.title}
            </h3>

            <span className="text-[10px] font-bold text-cyan-300">
              {mission.progress}/{mission.goal}
            </span>

          </div>

          {/* Barra */}

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">

            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={{
                width: `${percent}%`,
              }}
            />

          </div>

          {/* Rodapé */}

          <div className="mt-3 flex items-center justify-between">

            <div className="flex items-center gap-3 text-[11px] font-bold">

              {mission.reward.gold && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Coins size={14} />
                  {mission.reward.gold}
                </div>
              )}

              {mission.reward.crystals && (
                <div className="flex items-center gap-1 text-cyan-300">
                  <Diamond size={14} />
                  {mission.reward.crystals}
                </div>
              )}

            </div>

            <button
              onClick={onClaim}
              disabled={!complete}
              className={`min-w-[70px] rounded-xl px-3 py-2 text-[11px] font-black transition ${
                complete
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105 active:scale-95"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {complete ? (
                "CLAIM"
              ) : (
                "GO"
              )}
            </button>

          </div>

        </div>

      </div>
    </motion.div>
  );
}