import { create } from "zustand";

export type Skill = {
  id: string;
  name: string;
  icon: string;
  desc: string;
  level: number;
  bonusLabel: (lvl: number) => string;
  costFor: (lvl: number) => number;
};

export type ShopItem = {
  id: string;
  name: string;
  category: "skins" | "boosters" | "packs" | "legendary";
  target?: string;
  bonus?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  priceGold?: number;
  priceTon?: number;
  unlockTon?: number;
  duration?: string;
  contents?: string[];
  image: string;
};

export type Mission = {
  id: string;
  title: string;
  desc: string;
  reward: { gold?: number; crystals?: number; ton?: number };
  progress: number;
  goal: number;
  type: "daily" | "weekly" | "social";
  cta?: string;
};

type OwnedItem = {
  itemId: string;
  activated: boolean; // for legendary
  expiresAt?: number; // for boosters
};

type State = {
  gold: number;
  crystals: number;
  ton: number;
  pool: number;
  energy: number;
  energyMax: number;
  xp: number;
  level: number;
  droneCount: number;
  droneProgress: number; // 0..1
  skills: Skill[];
  owned: OwnedItem[];
  missions: Mission[];
  addPurchaseToPool: (tonValue: number) => void;
  upgradeSkill: (id: string) => void;
  buyItem: (item: ShopItem) => void;
  unlockLegendary: (itemId: string, cost: number) => void;
  watchAd: () => void;
  claimMission: (id: string) => void;
  tick: (dt: number) => void;
};

const initialSkills: Skill[] = [
  { id: "mining", name: "Mineração", icon: "⛏️", desc: "Aumenta coins/s dos drones", level: 1, bonusLabel: (l) => `+${l * 15}% Coins/s`, costFor: (l) => 250 * l * l },
  { id: "speed", name: "Velocidade", icon: "⚡", desc: "Drones trabalham mais rápido", level: 1, bonusLabel: (l) => `+${l * 8}% Velocidade`, costFor: (l) => 300 * l * l },
  { id: "energy", name: "Energia", icon: "🔋", desc: "Expande a energia máxima", level: 1, bonusLabel: (l) => `+${l * 20} Energia máx`, costFor: (l) => 200 * l * l },
  { id: "crystals", name: "Cristais", icon: "💎", desc: "Chance de dropar cristais", level: 1, bonusLabel: (l) => `+${l * 12}% Cristais/h`, costFor: (l) => 400 * l * l },
  { id: "luck", name: "Sorte", icon: "🍀", desc: "Chance de recompensas raras", level: 1, bonusLabel: (l) => `+${l * 5}% Sorte`, costFor: (l) => 500 * l * l },
  { id: "xp", name: "Experiência", icon: "📈", desc: "Mais XP por ação", level: 1, bonusLabel: (l) => `+${l * 10}% XP`, costFor: (l) => 350 * l * l },
  { id: "multiplier", name: "Multiplicador", icon: "✨", desc: "Multiplica toda produção", level: 1, bonusLabel: (l) => `x${(1 + l * 0.05).toFixed(2)} Total`, costFor: (l) => 800 * l * l },
];

const initialMissions: Mission[] = [
  { id: "d1", title: "Colete 5.000 Coins", desc: "Minere sem parar", reward: { gold: 500 }, progress: 0, goal: 5000, type: "daily" },
  { id: "d2", title: "Melhore 3 habilidades", desc: "Evolua seu império", reward: { crystals: 200 }, progress: 0, goal: 3, type: "daily" },
  { id: "d3", title: "Assista 1 anúncio", desc: "Apoie a Pool", reward: { gold: 300 }, progress: 0, goal: 1, type: "daily" },
  { id: "w1", title: "Compre 5 itens na loja", desc: "Expanda seu arsenal", reward: { ton: 0.5, crystals: 500 }, progress: 0, goal: 5, type: "weekly" },
  { id: "w2", title: "Ative 1 Booster", desc: "Multiplique produção", reward: { crystals: 1000 }, progress: 0, goal: 1, type: "weekly" },
  { id: "s1", title: "Entrar no Telegram", desc: "Junte-se à comunidade", reward: { gold: 1000, crystals: 100 }, progress: 0, goal: 1, type: "social", cta: "Telegram" },
  { id: "s2", title: "Seguir no X (Twitter)", desc: "Fique por dentro", reward: { gold: 800 }, progress: 0, goal: 1, type: "social", cta: "Seguir" },
  { id: "s3", title: "Entrar no Discord", desc: "Converse com jogadores", reward: { gold: 800 }, progress: 0, goal: 1, type: "social", cta: "Discord" },
  { id: "s4", title: "Convidar um amigo", desc: "Ganhe recompensas juntos", reward: { ton: 0.1 }, progress: 0, goal: 1, type: "social", cta: "Convidar" },
];

export const useGame = create<State>((set, get) => ({
  gold: 1250,
  crystals: 340,
  ton: 2.35,
  pool: 0,
  energy: 85,
  energyMax: 100,
  xp: 240,
  level: 7,
  droneCount: 3,
  droneProgress: 0.42,
  skills: initialSkills,
  owned: [],
  missions: initialMissions,

  addPurchaseToPool: (tonValue) => set((s) => ({ pool: s.pool + tonValue * 0.5 })),

  upgradeSkill: (id) =>
    set((s) => {
      const skill = s.skills.find((sk) => sk.id === id);
      if (!skill) return s;
      const cost = skill.costFor(skill.level);
      if (s.gold < cost) return s;
      return {
        gold: s.gold - cost,
        skills: s.skills.map((sk) => (sk.id === id ? { ...sk, level: sk.level + 1 } : sk)),
        missions: s.missions.map((m) =>
          m.id === "d2" ? { ...m, progress: Math.min(m.progress + 1, m.goal) } : m
        ),
      };
    }),

  buyItem: (item) =>
    set((s) => {
      if (item.priceGold != null) {
        if (s.gold < item.priceGold) return s;
        const tonEquivalent = item.priceGold / 100000; // 100k crystals = 1 TON -> approx conv
        return {
          gold: s.gold - item.priceGold,
          pool: s.pool + tonEquivalent * 0.5,
          owned: [...s.owned, { itemId: item.id, activated: item.category !== "legendary" }],
          missions: s.missions.map((m) =>
            m.id === "w1" ? { ...m, progress: Math.min(m.progress + 1, m.goal) } :
            m.id === "w2" && item.category === "boosters" ? { ...m, progress: Math.min(m.progress + 1, m.goal) } : m
          ),
        };
      }
      if (item.priceTon != null) {
        if (s.ton < item.priceTon) return s;
        return {
          ton: s.ton - item.priceTon,
          pool: s.pool + item.priceTon * 0.5,
          owned: [...s.owned, { itemId: item.id, activated: item.category !== "legendary" }],
          missions: s.missions.map((m) =>
            m.id === "w1" ? { ...m, progress: Math.min(m.progress + 1, m.goal) } :
            m.id === "w2" && item.category === "boosters" ? { ...m, progress: Math.min(m.progress + 1, m.goal) } : m
          ),
        };
      }
      return s;
    }),

  unlockLegendary: (itemId, cost) =>
    set((s) => {
      if (s.ton < cost) return s;
      return {
        ton: s.ton - cost,
        pool: s.pool + cost * 0.5,
        owned: s.owned.map((o) => (o.itemId === itemId ? { ...o, activated: true } : o)),
      };
    }),

  watchAd: () =>
    set((s) => ({
      gold: s.gold + 500,
      crystals: s.crystals + 25,
      pool: s.pool + 0.02, // 50% of ~0.04 TON ad revenue
      energy: Math.min(s.energyMax, s.energy + 20),
      missions: s.missions.map((m) =>
        m.id === "d3" ? { ...m, progress: Math.min(m.progress + 1, m.goal) } : m
      ),
    })),

  claimMission: (id) =>
    set((s) => {
      const m = s.missions.find((mm) => mm.id === id);
      if (!m || m.progress < m.goal) return s;
      return {
        gold: s.gold + (m.reward.gold ?? 0),
        crystals: s.crystals + (m.reward.crystals ?? 0),
        ton: s.ton + (m.reward.ton ?? 0),
        missions: s.missions.filter((mm) => mm.id !== id),
      };
    }),

  tick: (dt) =>
    set((s) => {
      const mult = s.skills.find((k) => k.id === "multiplier")!.level;
      const mine = s.skills.find((k) => k.id === "mining")!.level;
      const cps = s.droneCount * (2 + mine * 0.3) * (1 + mult * 0.05);
      const cph = s.droneCount * 20 * (1 + s.skills.find((k) => k.id === "crystals")!.level * 0.12);
      const newProgress = s.droneProgress + dt * 0.02;
      const droneReady = newProgress >= 1;
      return {
        gold: s.gold + cps * dt,
        crystals: s.crystals + (cph / 3600) * dt,
        droneProgress: droneReady ? 0 : newProgress,
        droneCount: droneReady ? s.droneCount + 1 : s.droneCount,
        missions: s.missions.map((m) =>
          m.id === "d1" ? { ...m, progress: Math.min(m.progress + cps * dt, m.goal) } : m
        ),
      };
    }),
}));

export const shopItems: ShopItem[] = [
  // Skins
  { id: "skin-drone-1", name: "Drone Nebulosa", category: "skins", target: "Drone", bonus: "+5% produção", rarity: "rare", priceGold: 5000, image: "🛸" },
  { id: "skin-planet-1", name: "Planeta Aurora", category: "skins", target: "Planeta", bonus: "+8% cristais", rarity: "epic", priceGold: 12000, image: "🪐" },
  { id: "skin-base-1", name: "Base Quantum", category: "skins", target: "Base", bonus: "+3% velocidade", rarity: "rare", priceGold: 6000, image: "🏗️" },
  { id: "skin-sat-1", name: "Satélite Stellar", category: "skins", target: "Satélite", bonus: "+6% produção", rarity: "epic", priceTon: 1.5, image: "📡" },
  { id: "skin-laser-1", name: "Laser Prisma", category: "skins", target: "Laser", bonus: "+10% cristais", rarity: "epic", priceGold: 15000, image: "🔫" },
  { id: "skin-refinery-1", name: "Refinaria Fusion", category: "skins", target: "Refinaria", bonus: "+7% produção", rarity: "rare", priceGold: 8000, image: "🏭" },
  // Boosters
  { id: "boost-2x", name: "2x Produção", category: "boosters", bonus: "Dobra produção", rarity: "common", priceGold: 2000, duration: "1h", image: "⚡" },
  { id: "boost-3x", name: "3x Produção", category: "boosters", bonus: "Triplica produção", rarity: "rare", priceGold: 5000, duration: "1h", image: "🚀" },
  { id: "boost-energy", name: "Energia Infinita", category: "boosters", bonus: "Sem limite de energia", rarity: "epic", priceTon: 0.5, duration: "30min", image: "🔋" },
  { id: "boost-offline", name: "Offline 24h", category: "boosters", bonus: "Renda offline extendida", rarity: "epic", priceTon: 0.8, duration: "24h", image: "🌙" },
  { id: "boost-crystals", name: "Cristais Dobrados", category: "boosters", bonus: "2x cristais", rarity: "rare", priceGold: 4000, duration: "1h", image: "💎" },
  { id: "boost-luck", name: "Sorte Suprema", category: "boosters", bonus: "+50% sorte", rarity: "epic", priceGold: 6000, duration: "45min", image: "🍀" },
  { id: "boost-xp", name: "XP Turbo", category: "boosters", bonus: "3x XP", rarity: "rare", priceGold: 3500, duration: "1h", image: "📈" },
  // Packs
  { id: "pack-starter", name: "Pacote Iniciante", category: "packs", bonus: "Perfeito para começar", rarity: "common", priceGold: 3000, contents: ["5.000 Coins", "100 Cristais", "50 Energia", "1 Booster 2x"], image: "📦" },
  { id: "pack-pro", name: "Pacote Pro", category: "packs", bonus: "Impulsione seu império", rarity: "epic", priceTon: 2, contents: ["50.000 Coins", "1.000 Cristais", "Energia Full", "3x Boosters", "0.2 TON"], image: "🎁" },
  { id: "pack-mega", name: "Mega Pacote", category: "packs", bonus: "O melhor custo/benefício", rarity: "legendary", priceTon: 5, contents: ["200.000 Coins", "5.000 Cristais", "Energia Infinita 24h", "Todos os Boosters", "1 TON"], image: "💰" },
  // Legendary
  { id: "leg-1", name: "Núcleo Estelar", category: "legendary", bonus: "+25% produção permanente", rarity: "legendary", priceGold: 25000, unlockTon: 3, image: "⭐" },
  { id: "leg-2", name: "Cristal Cósmico", category: "legendary", bonus: "+50% cristais permanente", rarity: "legendary", priceGold: 30000, unlockTon: 4, image: "💠" },
  { id: "leg-3", name: "Motor de Wormhole", category: "legendary", bonus: "x2 velocidade drones", rarity: "legendary", priceGold: 40000, unlockTon: 5, image: "🌀" },
];
