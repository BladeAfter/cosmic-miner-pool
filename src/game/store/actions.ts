import { State, ShopItem } from "./types";


async function savePlayer(state: any) {

  if (!state.playerId) return;


  try {

    await fetch("/api/player", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },


      body: JSON.stringify({

        id: state.playerId,

        coins: state.gold,

        level: state.level,

        energy: state.energy,

        skills: state.skills,

        owned: state.owned,

        missions: state.missions,

      }),

    });


  } catch (error) {

    console.error(
      "ERRO AO SALVAR PLAYER:",
      error
    );

  }

}





export const upgradeSkill =
  (set: any) =>
  (id: string) =>
    set((s: State) => {


      const skill =
        s.skills.find(
          (sk) => sk.id === id
        );


      if (!skill) return s;



      const cost =
        skill.costFor(skill.level);



      if (s.gold < cost)
        return s;



      const newSkills =
        s.skills.map((sk) =>
          sk.id === id
            ? {
                ...sk,
                level: sk.level + 1,
              }
            : sk
        );



      const newMissions =
        s.missions.map((m) =>
          m.id === "d2"
            ? {
                ...m,
                progress: Math.min(
                  m.progress + 1,
                  m.goal
                ),
              }
            : m
        );



      const newState = {

        ...s,

        gold:
          s.gold - cost,

        skills:
          newSkills,

        missions:
          newMissions,

      };



      savePlayer(newState);



      return {

        gold:
          newState.gold,


        skills:
          newSkills,


        missions:
          newMissions,

      };

    });







export const buyItem =
  (set: any) =>
  (item: ShopItem) =>
    set((s: State) => {


      if (item.priceGold != null) {


        if (s.gold < item.priceGold)
          return s;



        const newOwned = [

          ...s.owned,

          {
            itemId:item.id,

            activated:
              item.category !== "legendary",
          },

        ];



        const newMissions =
          s.missions.map((m) =>
            m.id === "w1"
              ? {
                  ...m,

                  progress:
                    Math.min(
                      m.progress + 1,
                      m.goal
                    ),
                }

              : m.id === "w2" &&
                item.category === "boosters"

              ? {
                  ...m,

                  progress:
                    Math.min(
                      m.progress + 1,
                      m.goal
                    ),
                }

              : m
          );



        const newState = {


          ...s,


          gold:
            s.gold - item.priceGold,


          pool:
            s.pool +
            (item.priceGold / 100000) * 0.5,


          owned:
            newOwned,


          missions:
            newMissions,

        };



        savePlayer(newState);



        return {


          gold:
            newState.gold,


          pool:
            newState.pool,


          owned:
            newOwned,


          missions:
            newMissions,

        };

      }







      if (item.priceTon != null) {


        if (s.ton < item.priceTon)
          return s;



        const newState = {


          ...s,


          ton:
            s.ton - item.priceTon,


          pool:
            s.pool +
            item.priceTon * 0.5,


          owned:[

            ...s.owned,

            {

              itemId:item.id,

              activated:
                item.category !== "legendary",

            },

          ],


        };



        savePlayer(newState);



        return {


          ton:
            newState.ton,


          pool:
            newState.pool,


          owned:
            newState.owned,

        };

      }



      return s;

    });









export const unlockLegendary =
  (set:any) =>
  (itemId:string, cost:number) =>
    set((s:State)=>{


      if(s.ton < cost)
        return s;



      const newOwned =
        s.owned.map((o)=>

          o.itemId === itemId

          ? {
              ...o,
              activated:true,
            }

          : o

        );



      const newState = {


        ...s,


        ton:
          s.ton - cost,


        pool:
          s.pool + cost * 0.5,


        owned:
          newOwned,


      };



      savePlayer(newState);



      return {


        ton:
          newState.ton,


        pool:
          newState.pool,


        owned:
          newOwned,


      };


    });









export const claimMission =
  (set:any) =>
  (id:string) =>
    set((s:State)=>{


      const mission =
        s.missions.find(
          (m)=>m.id===id
        );



      if(!mission)
        return s;



      if(
        mission.progress <
        mission.goal
      )
        return s;



      const newState = {


        ...s,


        gold:
          s.gold +
          (mission.reward.gold ?? 0),


        crystals:
          s.crystals +
          (mission.reward.crystals ?? 0),


        ton:
          s.ton +
          (mission.reward.ton ?? 0),


        missions:
          s.missions.filter(
            (m)=>m.id !== id
          ),

      };



      savePlayer(newState);



      return {


        gold:
          newState.gold,


        crystals:
          newState.crystals,


        ton:
          newState.ton,


        missions:
          newState.missions,


      };


    });