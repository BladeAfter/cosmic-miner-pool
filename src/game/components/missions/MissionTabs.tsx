import { motion } from "framer-motion";
import {
  Sun,
  Send,
  Trophy,
} from "lucide-react";

type Tab = "daily" | "social" | "weekly";

interface MissionTabsProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  counts: {
    daily: number;
    social: number;
    weekly: number;
  };
}

export function MissionTabs({
  active,
  onChange,
  counts,
}: MissionTabsProps) {
  const tabs = [
    {
      id: "daily",
      label: "DAILY",
      icon: Sun,
      color: "text-amber-300",
      count: counts.daily,
    },
    {
      id: "social",
      label: "SOCIAL",
      icon: Send,
      color: "text-sky-400",
      count: counts.social,
    },
    {
      id: "weekly",
      label: "WEEKLY",
      icon: Trophy,
      color: "text-orange-300",
      count: counts.weekly,
    },
  ] as const;

  return (
    <div className="px-4 pb-4">
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const selected = active === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex-1 overflow-hidden rounded-2xl"
            >
              {selected && (
                <motion.div
                  layoutId="mission-tab"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 28,
                  }}
                />
              )}

              <div
                className={`relative z-10 flex h-14 items-center justify-center gap-2 rounded-2xl border transition ${
                  selected
                    ? "border-cyan-400/30 text-white"
                    : "border-white/10 bg-[#111827] text-white/60"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    selected ? "text-white" : tab.color
                  }
                  strokeWidth={2.5}
                />

                <div className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-black tracking-wider">
                    {tab.label}
                  </span>

                  <span
                    className={`text-[10px] ${
                      selected
                        ? "text-white/80"
                        : "text-white/40"
                    }`}
                  >
                    {tab.count} missions
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}