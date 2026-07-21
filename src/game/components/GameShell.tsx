import { useEffect, useState } from "react";
import { Home, ShoppingBag, Target } from "lucide-react";
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

type Tab = "home" | "shop" | "missions";

export function GameShell() {
  const [tab, setTab] = useState<Tab>("home");
  const tick = useGame((s) => s.tick);

  useEffect(() => {
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      tick(dt);
    }, 500);
    return () => clearInterval(id);
  }, [tick]);

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Base", icon: Home },
    { id: "shop", label: "Loja", icon: ShoppingBag },
    { id: "missions", label: "Missões", icon: Target },
  ];

  return (
    <div className="relative min-h-screen">
      <Starfield />
      <Header />
      <main className="mx-auto max-w-md space-y-4 px-3 py-4 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {tab === "home" && (
              <>
                <Planet />
                <PoolCard />
                <ProductionCard />
                <SkillsSection />
              </>
            )}
            {tab === "shop" && <Shop />}
            {tab === "missions" && <Missions />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-4">
        <div className="mx-auto max-w-md glass-strong rounded-3xl p-1.5 shadow-neon">
          <div className="grid grid-cols-3 gap-1">
            {tabs.map((t) => {
              const active = tab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex flex-col items-center gap-0.5 rounded-2xl py-2 text-[10px] font-black uppercase transition ${
                    active ? "bg-gradient-primary text-primary-foreground shadow-neon" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
