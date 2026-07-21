import { motion } from "framer-motion";
import { Check, Send, X, MessageCircle, Users, Play } from "lucide-react";
import { useGame } from "../store/gameStore";
import { showRewardedAd } from "../services/gigapub";

const socialIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Telegram: Send,
  Seguir: X,
  Discord: MessageCircle,
  Convidar: Users,
};

export function Missions() {
  const { missions, claimMission, watchAd } = useGame();

  const handleWatchAd = async () => {
    const rewarded = await showRewardedAd();

    if (rewarded) {
      watchAd();
    }
  };

  const groups = [
    { id: "daily", label: "Diárias", color: "text-accent" },
    { id: "weekly", label: "Semanais", color: "text-primary" },
    { id: "social", label: "Sociais", color: "text-gold" },
  ] as const;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-black text-gradient-primary">
          Missões
        </h2>

        <button
          onClick={handleWatchAd}
          className="flex items-center gap-1 rounded-xl bg-gradient-accent px-2.5 py-1.5 text-[10px] font-black text-white shadow-neon transition active:scale-95 hover:scale-105"
        >
          <Play className="h-3 w-3" fill="currentColor" />
          Assistir Anúncio
        </button>
      </div>

      {groups.map((g) => {
        const list = missions.filter((m) => m.type === g.id);

        if (!list.length) return null;

        return (
          <div key={g.id}>
            <h3
              className={`mb-1.5 px-1 text-[10px] font-black uppercase tracking-widest ${g.color}`}
            >
              {g.label}
            </h3>

            <div className="space-y-1.5">
              {list.map((m) => {
                const complete = m.progress >= m.goal;
                const Icon = m.cta ? socialIcon[m.cta] : null;

                return (
                  <motion.div
                    key={m.id}
                    whileTap={{ scale: 0.98 }}
                    className="glass flex items-center gap-2.5 rounded-2xl p-2.5"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-lg shadow-neon">
                      {Icon ? (
                        <Icon className="h-5 w-5 text-white" />
                      ) : (
                        "🎯"
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-black">
                        {m.title}
                      </div>

                      <div className="truncate text-[10px] text-muted-foreground">
                        {m.desc}
                      </div>

                      <div className="mt-1 flex items-center gap-1.5">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/40">
                          <div
                            className="h-full bg-gradient-accent"
                            style={{
                              width: `${Math.min(
                                100,
                                (m.progress / m.goal) * 100
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="text-[9px] font-bold text-muted-foreground">
                          {Math.floor(m.progress)}/{m.goal}
                        </span>
                      </div>

                      <div className="mt-0.5 flex gap-2 text-[9px] font-bold">
                        {m.reward.gold && (
                          <span className="text-gold">
                            +{m.reward.gold} 🪙
                          </span>
                        )}

                        {m.reward.crystals && (
                          <span className="text-crystal">
                            +{m.reward.crystals} 💎
                          </span>
                        )}

                        {m.reward.ton && (
                          <span className="text-ton">
                            +{m.reward.ton} TON
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => claimMission(m.id)}
                      disabled={!complete}
                      className="shrink-0 rounded-xl bg-gradient-gold px-2.5 py-2 text-[10px] font-black text-yellow-950 shadow-neon transition active:scale-95 disabled:opacity-40"
                    >
                      {complete ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : (
                        "..."
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}