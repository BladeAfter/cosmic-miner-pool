import { loadPlayer } from "../store/playerLoader";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { useGame } from "../store/gameStore";

import { Starfield } from "./Starfield";
import { Header } from "./Header";
import { Planet } from "./Planet";
import { ProductionCard } from "./ProductionCard";
import { SkillsSection } from "./SkillsSection";
import { PoolCard } from "./PoolCard";
import { Shop } from "./Shop";
import { Missions } from "./Missions";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import Wallet from "./wallet/Wallet";

export type Modal = "shop" | "pool" | "missions" | "wallet" | null;

export function GameShell() {
  const [modal, setModal] = useState<Modal>(null);
  const [loading, setLoading] = useState(true);

  const tick = useGame((state) => state.tick);

  useEffect(() => {
    loadPlayer();
  }, []);

  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;

      last = now;

      tick(dt);
    }, 500);

    return () => clearInterval(interval);
  }, [tick]);

  if (loading) {
    return (
      <LoadingScreen
        onComplete={() => setLoading(false)}
      />
    );
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#070B17]">
      <Starfield />

      {/* Tela principal */}
      {modal !== "wallet" && (
        <>
          <Header />

          <main className="mx-auto flex-1 w-full max-w-md overflow-y-auto px-3 py-2 pb-24">
            <Planet onNavigate={setModal} />

            <ProductionCard />

            <SkillsSection />
          </main>
        </>
      )}

      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            key={modal}
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-[9999] bg-[#070B17]"
          >
            <div className="h-full overflow-y-auto">
              {modal !== "missions" && modal !== "wallet" && (
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#070B17]/95 p-5 backdrop-blur-xl">
                  <h1 className="text-2xl font-black text-white">
                    {modal === "shop" && "🛒 Shop"}
                    {modal === "pool" && "🌊 Pool"}
                  </h1>

                  <button
                    onClick={() => setModal(null)}
                    className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 active:scale-95"
                  >
                    <X size={28} />
                  </button>
                </div>
              )}

              <div
                className={
                  modal === "missions" || modal === "wallet"
                    ? "h-full"
                    : "mx-auto w-full max-w-md p-5 pb-24"
                }
              >
                {modal === "shop" && <Shop />}

                {modal === "pool" && (
                  <>
                    <PoolCard />

                    <div className="glass-strong mt-5 space-y-4 rounded-3xl p-5">
                      <h2 className="text-xl font-black text-white">
                        🌌 Pool Comunitária
                      </h2>

                      <p className="text-sm text-white/70">
                        A Pool Comunitária recebe 50% das compras em TON e
                        50% da receita dos anúncios.
                      </p>

                      <div className="rounded-2xl bg-primary/10 p-4">
                        <div className="font-bold text-white">
                          Próxima distribuição
                        </div>

                        <div className="mt-2 text-2xl font-black text-primary">
                          6 dias
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {modal === "missions" && (
                  <Missions onClose={() => setModal(null)} />
                )}

                {modal === "wallet" && (
                  <Wallet onClose={() => setModal(null)} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameShell;