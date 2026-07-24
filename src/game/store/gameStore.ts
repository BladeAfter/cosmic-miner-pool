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


      gold: 0,
      crystals: 340,
      ton: 0,
      pool: 0,


      energy: 100,
      energyMax: 100,


      xp: 0,
      level: 1,


      droneCount: 3,
      droneProgress: 0,


      adsWatchedToday: 0,
      lastAdReset: "",


      skills: initialSkills,
      owned: [],
      missions: initialMissions,


setPlayer: (player) => {

  set({

    playerId: player.id,


    gold:
      Number(player.coins ?? 0),


    level:
      Number(player.level ?? 1),


    energy:
      Number(player.energy ?? 100),



    skills:
      player.skills
        ? player.skills
        : initialSkills,



    owned:
      player.owned
        ? player.owned
        : [],



    missions:
      player.missions
        ? player.missions
        : initialMissions,

  });

},

      savePlayer: async () => {


        const state = get();


        if(!state.playerId) {
          console.log("Sem playerId");
          return;
        }



        await fetch("/api/player/save", {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            id:
              state.playerId,


            coins:
              Math.floor(state.gold),


            level:
              state.level,


            energy:
              state.energy,


            skills:
              state.skills,


            owned:
              state.owned,


            missions:
              state.missions,


          }),


        });


        console.log(
          "PLAYER SALVO",
          state.gold,
          state.level
        );

      },




      addPurchaseToPool:(tonValue)=>{

        set((state)=>({

          pool:
            state.pool +
            tonValue * 0.5

        }));

        get().savePlayer();

      },




      upgradeSkill:(id)=>{

        upgradeSkill(set)(id);

        setTimeout(()=>{

          get().savePlayer();

        },300);

      },




      buyItem:(item)=>{

        buyItem(set)(item);

        setTimeout(()=>{

          get().savePlayer();

        },300);

      },




      unlockLegendary:(id,cost)=>{

        unlockLegendary(set)(
          id,
          cost
        );


        setTimeout(()=>{

          get().savePlayer();

        },300);


      },




      claimMission:(id)=>{


        claimMission(set)(id);


        setTimeout(()=>{

          get().savePlayer();

        },300);


      },




      watchAd:async(telegramId:string)=>{


        if(!canWatchAd())
          return;


        const ok =
          await registerAdWatch(
            telegramId
          );


        if(!ok)
          return;



        const response =
          await fetch(
            `/api/player?telegramId=${telegramId}`
          );


        const player =
          await response.json();



        set((state)=>({


          gold:
            Number(player.coins),



          adsWatchedToday:
            getAdsData().watched,


          lastAdReset:
            getAdsData().date,


          missions:
            state.missions.map((m)=>

              m.id==="d3"

              ?

              {
                ...m,

                progress:
                  Math.min(
                    m.progress+1,
                    m.goal
                  )
              }

              :

              m

            )

        }));



      },



      tick:
        productionTick(set),


    }),



    {

      name:
        "space-miner-save",


      skipHydration:true,



      partialize:(state)=>({


        playerId:
          state.playerId,


        crystals:
          state.crystals,


        ton:
          state.ton,


        pool:
          state.pool,


        energy:
          state.energy,


        energyMax:
          state.energyMax,


        xp:
          state.xp,


        level:
          state.level,


        droneCount:
          state.droneCount,


        droneProgress:
          state.droneProgress,


        adsWatchedToday:
          state.adsWatchedToday,


        lastAdReset:
          state.lastAdReset,


        skills:
          state.skills,


        owned:
          state.owned,


        missions:
          state.missions,


      }),




      onRehydrateStorage:()=>(
        state
      )=>{


        if(!state)
          return;


        const ads =
          getAdsData();


        state.adsWatchedToday =
          ads.watched;


        state.lastAdReset =
          ads.date;


      },


    }


  )
);