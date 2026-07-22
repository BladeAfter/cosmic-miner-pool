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
  reward: {
    gold?: number;
    crystals?: number;
    ton?: number;
  };
  progress: number;
  goal: number;
  type: "daily" | "weekly" | "social";
  cta?: string;
};

export type OwnedItem = {
  itemId: string;
  activated: boolean;
  expiresAt?: number;
};

export type GameState = {
  // Recursos
  gold: number;
  crystals: number;
  ton: number;
  pool: number;

  // Energia
  energy: number;
  energyMax: number;

  // Progressão
  xp: number;
  level: number;

  // Drones
  droneCount: number;
  droneProgress: number;

  // Sistema de anúncios
  adsWatchedToday: number;
  lastAdReset: string;

  // Dados
  skills: Skill[];
  owned: OwnedItem[];
  missions: Mission[];

  // Ações
  addPurchaseToPool: (tonValue: number) => void;

  upgradeSkill: (id: string) => void;

  buyItem: (item: ShopItem) => void;

  unlockLegendary: (
    itemId: string,
    cost: number
  ) => void;

  watchAd: () => void;

  claimMission: (id: string) => void;

  tick: (dt: number) => void;
};