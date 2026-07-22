import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState } from "./types";

import { initialSkills } from "../data/skills";
import { initialMissions } from "../data/mission";

import {
  upgradeSkill,
  buyItem,
  unlockLegendary,
  claimMission,
} from "./actions";

import {
  canWatchAd,
  registerAdWatch,
  getAdsData,
  AD_REWARD,
} from "./ads";

import { productionTick } from "./production";

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      // =========================
      // Recursos
      // =========================
      gold: 1250,
      crystals: 340,
      ton: 2.35,
      pool: 0,

      // Energia
      energy: 85,
      energyMax: 100,

      // Progressão
      xp: 240,
      level: 7,

      // Drones
      droneCount: 3,
      droneProgress: 0.42,

      // Sistema de anúncios
      adsWatchedToday: 0,
      lastAdReset: "",

      // Dados
      skills: initialSkills,
      owned: [],
      missions: initialMissions,

      // =========================
      // Ações
      // =========================

      addPurchaseToPool: (tonValue) =>
        set((state) => ({
          pool: state.pool + tonValue * 0.5,
        })),

      upgradeSkill: upgradeSkill(set),

      buyItem: buyItem(set),

      unlockLegendary: unlockLegendary(set),

      claimMission: claimMission(set),

      watchAd: () => {
        if (!canWatchAd()) return;
        if (!registerAdWatch()) return;

        set((state) => ({
          gold: state.gold + AD_REWARD,

          adsWatchedToday: getAdsData().watched,
          lastAdReset: getAdsData().date,

          missions: state.missions.map((m) =>
            m.id === "d3"
              ? {
                  ...m,
                  progress: Math.min(m.progress + 1, m.goal),
                }
              : m
          ),
        }));
      },

      tick: productionTick(set),
    }),
    {
      name: "space-miner-save",

      skipHydration: true,

      partialize: (state) => ({
        gold: state.gold,
        crystals: state.crystals,
        ton: state.ton,
        pool: state.pool,

        energy: state.energy,
        energyMax: state.energyMax,

        xp: state.xp,
        level: state.level,

        droneCount: state.droneCount,
        droneProgress: state.droneProgress,

        adsWatchedToday: state.adsWatchedToday,
        lastAdReset: state.lastAdReset,

        skills: state.skills,
        owned: state.owned,
        missions: state.missions,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const ads = getAdsData();

        state.adsWatchedToday = ads.watched;
        state.lastAdReset = ads.date;
      },
    }
  )
);