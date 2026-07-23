import { useEffect, useState } from "react";
import { Home, ShoppingBag, Target, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useGame } from "../store/gameStore";

import { Starfield } from "./Starfield";
import { Header } from "./Header";
import { Planet } from "./Planet";
import { ProductionCard } from "./ProductionCard";
import { SkillsSection } from "./SkillsSection";
import { PoolCard } from "./PoolCard";
import { Shop } from "./Shop";
import { Missions } from "./Missions";

type Tab = "home" | "shop" | "pool" | "missions";

export function GameShell() {
  const [tab, setTab] = useState<Tab>("home");

  const tick = useGame((state) => state.tick);

  useEffect(() => {
    let last = performance.now();

    const timer = setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;

      tick(dt);
    }, 500);

    return () => clearInterval(timer);
  }, [tick]);

  const tabs = [
    {
      id: "home" as const,
      label: "Base",
      icon: Home,
    },
    {
      id: "shop" as const,
      label: "Loja",
      icon: ShoppingBag,
    },
    {
      id: "pool" as const,
      label: "Pool",
      icon: Waves,
    },
    {
      id: "missions" as const,
      label: "Missões",
      icon: Target,
    },
  ];

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <Starfield />

      <Header />

      <main className="mx-auto w-full max-w-md flex-1 overflow-y-auto px-3 py-4 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {tab === "home" && (
              <>
                <Planet />
                <ProductionCard />
                <SkillsSection />
              </>
            )}

            {tab === "shop" && <Shop />}

            {tab === "pool" && (
              <>
                <PoolCard />

                <div className="glass-strong rounded-3xl p-5 space-y-4">
                  <h2 className="text-xl font-black">
                    🌌 Pool Comunitária
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    A Pool Comunitária recebe 50% das compras em TON e
                    50% da receita dos anúncios.
                  </p>

                  <div className="rounded-2xl bg-primary/10 p-4">
                    <div className="text-sm font-bold">
                      Próxima distribuição
                    </div>

                    <div className="mt-2 text-2xl font-black text-primary">
                      6 dias
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/20 p-4">
                    <div className="font-bold mb-2">
                      Como participar
                    </div>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✅ Fazer login.</li>
                      <li>✅ Completar missões.</li>
                      <li>✅ Comprar itens com TON.</li>
                      <li>✅ Assistir anúncios.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-primary/10 p-4">
                    <p className="text-sm">
                      Os jogadores elegíveis recebem automaticamente sua
                      parte da Pool quando o ciclo termina.
                    </p>
                  </div>
                </div>
              </>
            )}

            {tab === "missions" && <Missions />}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav
        className="sticky bottom-0 z-50 w-full bg-transparent"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom),12px)",
        }}
      >
        <div className="mx-auto max-w-md px-3">
          <div className="glass-strong rounded-3xl p-1.5 shadow-neon">
            <div className="grid grid-cols-4 gap-1">
              {tabs.map((tabItem) => {
                const active = tab === tabItem.id;
                const Icon = tabItem.icon;

                return (
                  <button
                    key={tabItem.id}
                    onClick={() => setTab(tabItem.id)}
                    className={`relative flex flex-col items-center gap-0.5 rounded-2xl py-2 text-[10px] font-black uppercase transition ${
                      active
                        ? "bg-gradient-primary text-primary-foreground shadow-neon"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                    {tabItem.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}