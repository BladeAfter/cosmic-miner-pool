import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Coins, Sparkles } from "lucide-react";

import { useGame } from "../store/gameStore";
import type { ShopItem, OwnedItem } from "../store/types";
import { shopItems } from "../data/shop";
const categories = [
  { id: "skins", label: "Skins", icon: "✨" },
  { id: "boosters", label: "Boosters", icon: "⚡" },
  { id: "packs", label: "Pacotes", icon: "📦" },
  { id: "legendary", label: "Lendários", icon: "👑" },
] as const;

const rarityStyle: Record<string, string> = {
  common: "from-slate-500 to-slate-700",
  rare: "from-blue-500 to-indigo-700",
  epic: "from-fuchsia-500 to-purple-700",
  legendary: "from-amber-400 to-orange-600",
};

export function Shop() {
  const [cat, setCat] = useState<(typeof categories)[number]["id"]>("skins");
  const { owned, buyItem, unlockLegendary, ton, gold } = useGame();
  const items = shopItems.filter((i) => i.category === cat);

  return (
    <section className="glass-strong rounded-3xl p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-base font-black text-gradient-gold">Loja Galáctica</h2>
        <Sparkles className="h-4 w-4 text-gold" />
      </div>
      {/* Category tabs */}
      <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-2xl px-3 py-1.5 text-xs font-black transition ${
              cat === c.id
                ? "bg-gradient-primary text-primary-foreground shadow-neon"
                : "glass text-muted-foreground"
            }`}
          >
            <span className="mr-1">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-2"
        >
          {items.map((it) => (
            <ShopCard
              key={it.id}
              item={it}
              owned={owned.find((o) => o.itemId === it.id)}
              ton={ton}
              gold={gold}
              onBuy={() => buyItem(it)}
              onUnlock={() => it.unlockTon && unlockLegendary(it.id, it.unlockTon)}
              rarityClass={rarityStyle[it.rarity]}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function ShopCard({
  item, owned, gold, ton, onBuy, onUnlock, rarityClass,
}: {
  item: ShopItem;
  owned: { itemId: string; activated: boolean } | undefined;
  gold: number;
  ton: number;
  onBuy: () => void;
  onUnlock: () => void;
  rarityClass: string;
}) {
  const isLegendary = item.category === "legendary";
  const isOwned = !!owned;
  const activated = owned?.activated;
  const canBuy =
    item.priceGold != null ? gold >= item.priceGold : item.priceTon != null ? ton >= item.priceTon : false;
  const canUnlock = item.unlockTon != null && ton >= item.unlockTon;

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden rounded-2xl p-2.5 ${
        isLegendary ? "legendary-shine" : ""
      }`}
      style={{
        border: isLegendary
          ? "2px solid oklch(0.85 0.18 90)"
          : "1px solid oklch(0.4 0.1 285 / 0.4)",
        background: isLegendary
          ? "linear-gradient(135deg, oklch(0.3 0.12 60 / 0.6), oklch(0.2 0.08 30 / 0.6))"
          : "color-mix(in oklab, var(--card) 55%, transparent)",
        backdropFilter: "blur(20px)",
        boxShadow: isLegendary
          ? "0 0 30px oklch(0.85 0.18 90 / 0.5)"
          : "0 4px 20px oklch(0.14 0.05 275 / 0.5)",
      }}
    >
      {/* Rarity ribbon */}
      <div className={`absolute right-1.5 top-1.5 rounded-md bg-gradient-to-r ${rarityClass} px-1.5 py-0.5 text-[9px] font-black uppercase text-white`}>
        {item.rarity}
      </div>

      {/* icon */}
      <div className="relative mx-auto my-1 grid h-16 w-16 place-items-center rounded-2xl text-3xl"
        style={{
          background: isLegendary
            ? "var(--gradient-legendary)"
            : "linear-gradient(135deg, oklch(0.3 0.1 275), oklch(0.2 0.08 275))",
          boxShadow: isLegendary
            ? "0 0 25px oklch(0.85 0.18 90 / 0.7)"
            : "0 4px 15px oklch(0.14 0.05 275 / 0.6)",
        }}
      >
        <span className="drop-shadow-lg">{item.image}</span>
      </div>

      <div className="text-center">
        <div className="truncate text-[12px] font-black">{item.name}</div>
        {item.target && <div className="text-[9px] text-muted-foreground">{item.target}</div>}
        <div className="mt-0.5 truncate text-[10px] font-bold text-accent">{item.bonus}</div>
        {item.duration && <div className="text-[9px] text-crystal">⏱ {item.duration}</div>}
        {item.contents && (
          <ul className="mt-1 space-y-0.5 text-[9px] text-muted-foreground">
            {item.contents.slice(0, 3).map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Status / Action */}
      <div className="mt-2">
        {isLegendary && isOwned && !activated ? (
          <div className="space-y-1">
            <div className="rounded-lg bg-black/40 py-1 text-center text-[9px] font-black uppercase text-gold">
              <Lock className="mr-1 inline h-3 w-3" /> Bloqueado
            </div>
            <button
              onClick={onUnlock}
              disabled={!canUnlock}
              className="w-full rounded-lg bg-gradient-ton py-1.5 text-[10px] font-black text-white shadow-neon active:scale-95 disabled:opacity-40"
            >
              Desbloquear • {item.unlockTon} TON
            </button>
          </div>
        ) : isOwned && activated ? (
          <div className="rounded-lg bg-emerald-500/20 border border-emerald-400/40 py-1.5 text-center text-[10px] font-black text-emerald-300">
            <Check className="mr-1 inline h-3 w-3" /> Ativo
          </div>
        ) : (
          <button
            onClick={onBuy}
            disabled={!canBuy}
            className={`w-full rounded-lg py-1.5 text-[10px] font-black text-white shadow-neon transition active:scale-95 disabled:opacity-40 ${
              item.priceTon != null ? "bg-gradient-ton" : "bg-gradient-gold"
            }`}
          >
            {item.priceGold != null ? (
              <span className="inline-flex items-center gap-1">
                <Coins className="h-3 w-3" />
                {item.priceGold.toLocaleString()}
              </span>
            ) : (
              <>{item.priceTon} TON</>
            )}
          </button>
        )}
        {isLegendary && !isOwned && (
          <div className="mt-1 text-center text-[8px] text-gold/70">
            🔒 Requer {item.unlockTon} TON após compra
          </div>
        )}
      </div>
    </motion.div>
  );
}
