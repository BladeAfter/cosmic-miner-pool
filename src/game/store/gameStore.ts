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
} from "./ads";

import { productionTick } from "./production";

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      playerId: null,

      // Recursos
      gold: 0,
      crystals: 0,
      ton: 0,
      pool: 0,

      // Energia
      energy: 100,
      energyMax: 100,

      // Progressão
      xp: 0,
      level: 1,

      // Drones
      droneCount: 3,
      droneProgress: 0,

      // Ads
      adsWatchedToday: 0,
      lastAdReset: "",

      // Dados
      skills: initialSkills,
      owned: [],
      missions: initialMissions,

      setPlayer: (player) => {
        set({
          playerId: player.id,

          gold: Number(player.coins ?? 0),
          crystals: Number(player.crystals ?? 0),
          ton: Number(player.ton ?? 0),
          pool: Number(player.pool ?? 0),

          level: Number(player.level ?? 1),

          energy: Number(player.energy ?? 100),

          skills: player.skills ?? initialSkills,
          owned: player.owned ?? [],
          missions: player.missions ?? initialMissions,
        });
      },

      savePlayer: async () => {
        const state = get();

        if (!state.playerId) return;

        try {
          const response = await fetch("/api/player/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: state.playerId,

              coins: Math.floor(state.gold),
              crystals: Math.floor(state.crystals),

              ton: state.ton,
              pool: state.pool,

              level: state.level,
              energy: state.energy,

              skills: state.skills,
              owned: state.owned,
              missions: state.missions,
            }),
          });

          if (!response.ok) {
            throw new Error("Erro ao salvar jogador");
          }

          console.log("Player salvo com sucesso");
        } catch (err) {
          console.error(err);
        }
      },

      addPurchaseToPool: (tonValue) => {
        set((state) => ({
          pool: state.pool + tonValue * 0.5,
        }));

        get().savePlayer();
      },

      upgradeSkill: (id) => {
        upgradeSkill(set)(id);

        setTimeout(() => {
          get().savePlayer();
        }, 300);
      },

      buyItem: (item) => {
        buyItem(set)(item);

        setTimeout(() => {
          get().savePlayer();
        }, 300);
      },

      unlockLegendary: (id, cost) => {
        unlockLegendary(set)(id, cost);

        setTimeout(() => {
          get().savePlayer();
        }, 300);
      },

      claimMission: (id) => {
        claimMission(set)(id);

        setTimeout(() => {
          get().savePlayer();
        }, 300);
      },

       watchAd: async (telegramId: string) => {
        if (!canWatchAd()) return;

        try {
          const ok = await registerAdWatch(telegramId);

          if (!ok) return;

          const response = await fetch(
            `/api/player?telegramId=${telegramId}`
          );

          if (!response.ok) {
            throw new Error("Erro ao buscar jogador");
          }

          const player = await response.json();

          const ads = getAdsData();

          set((state) => ({
            gold: Number(player.coins ?? 0),
            crystals: Number(player.crystals ?? state.crystals),
            ton: Number(player.ton ?? state.ton),
            pool: Number(player.pool ?? state.pool),

            adsWatchedToday: ads.watched,
            lastAdReset: ads.date,

            missions: state.missions.map((m) =>
              m.id === "d3"
                ? {
                    ...m,
                    progress: ads.watched,
                  }
                : m
            ),
          }));

          get().savePlayer();
        } catch (err) {
          console.error(err);
        }
      },

      tick: productionTick(set),
    }),
    {
      name: "space-miner-save",

      skipHydration: true,

      partialize: (state) => ({
        playerId: state.playerId,

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