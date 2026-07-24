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
    (set) => ({

      // =========================
      // Jogador
      // =========================
      playerId: null,


      // =========================
      // Recursos
      // =========================
      gold: 0,
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


      // Anúncios
      adsWatchedToday: 0,
      lastAdReset: "",


      // Dados
      skills: initialSkills,
      owned: [],
      missions: initialMissions,


      // =========================
      // Banco
      // =========================

      setPlayer: (player) =>
        set({
          playerId: player.id,
          gold: Number(player.coins),
          level: player.level,
          energy: player.energy,
        }),


      addPurchaseToPool: (tonValue) =>
        set((state) => ({
          pool: state.pool + tonValue * 0.5,
        })),


      // =========================
      // Ações
      // =========================

      upgradeSkill: upgradeSkill(set),

      buyItem: buyItem(set),

      unlockLegendary: unlockLegendary(set),

      claimMission: claimMission(set),



      // =========================
      // Anúncio recompensa
      // =========================

      watchAd: async (telegramId: string) => {

        if (!canWatchAd()) return;


        const success = await registerAdWatch(
          telegramId
        );


        if (!success) return;



        const response = await fetch(
          `/api/player?telegramId=${telegramId}`
        );


        const player = await response.json();



        set((state) => ({

          gold: Number(player.coins),


          adsWatchedToday:
            getAdsData().watched,


          lastAdReset:
            getAdsData().date,


          missions: state.missions.map((m) =>
            m.id === "d3"
              ? {
                  ...m,
                  progress: Math.min(
                    m.progress + 1,
                    m.goal
                  ),
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

        playerId: state.playerId,


        // NÃO salva gold
        // vem sempre do Neon

        crystals: state.crystals,

        ton: state.ton,

        pool: state.pool,


        energy: state.energy,

        energyMax: state.energyMax,


        xp: state.xp,

        level: state.level,


        droneCount: state.droneCount,

        droneProgress: state.droneProgress,


        adsWatchedToday:
          state.adsWatchedToday,


        lastAdReset:
          state.lastAdReset,


        skills: state.skills,

        owned: state.owned,

        missions: state.missions,

      }),



      onRehydrateStorage: () => (state) => {

        if (!state) return;


        const ads = getAdsData();


        state.adsWatchedToday =
          ads.watched;


        state.lastAdReset =
          ads.date;

      },

    }

  )
);