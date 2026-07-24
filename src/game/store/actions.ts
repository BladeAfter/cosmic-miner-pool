import { State, ShopItem } from "./types";

async function saveCoins(playerId: number | null, coins: number) {
  if (!playerId) return;

  await fetch("/api/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: playerId,
      coins,
    }),
  });
}


export const upgradeSkill =
  (set: any) =>
  (id: string) =>
    set((s: State) => {
      const skill = s.skills.find((sk) => sk.id === id);

      if (!skill) return s;

      const cost = skill.costFor(skill.level);

      if (s.gold < cost) return s;

      const newGold = s.gold - cost;

      saveCoins(s.playerId, newGold);

      return {
        gold: newGold,

        skills: s.skills.map((sk) =>
          sk.id === id
            ? {
                ...sk,
                level: sk.level + 1,
              }
            : sk
        ),

        missions: s.missions.map((m) =>
          m.id === "d2"
            ? {
                ...m,
                progress: Math.min(m.progress + 1, m.goal),
              }
            : m
        ),
      };
    });


export const buyItem =
  (set: any) =>
  (item: ShopItem) =>
    set((s: State) => {

      if (item.priceGold != null) {

        if (s.gold < item.priceGold) return s;

        const newGold = s.gold - item.priceGold;

        saveCoins(s.playerId, newGold);

        const tonEquivalent = item.priceGold / 100000;

        return {
          gold: newGold,

          pool: s.pool + tonEquivalent * 0.5,

          owned: [
            ...s.owned,
            {
              itemId: item.id,
              activated: item.category !== "legendary",
            },
          ],

          missions: s.missions.map((m) =>
            m.id === "w1"
              ? {
                  ...m,
                  progress: Math.min(m.progress + 1, m.goal),
                }
              : m
          ),
        };
      }


      if (item.priceTon != null) {

        if (s.ton < item.priceTon) return s;

        return {

          ton: s.ton - item.priceTon,

          pool: s.pool + item.priceTon * 0.5,

          owned: [
            ...s.owned,
            {
              itemId: item.id,
              activated: item.category !== "legendary",
            },
          ],

        };
      }


      return s;
    });



export const unlockLegendary =
  (set: any) =>
  (itemId: string, cost: number) =>
    set((s: State) => {

      if (s.ton < cost) return s;

      return {

        ton: s.ton - cost,

        pool: s.pool + cost * 0.5,

        owned: s.owned.map((o) =>
          o.itemId === itemId
            ? {
                ...o,
                activated: true,
              }
            : o
        ),

      };
    });



export const claimMission =
  (set: any) =>
  (id: string) =>
    set((s: State) => {

      const mission = s.missions.find(
        (m) => m.id === id
      );

      if (!mission) return s;

      if (mission.progress < mission.goal)
        return s;


      const reward =
        mission.reward.gold ?? 0;


      const newGold =
        s.gold + reward;


      saveCoins(
        s.playerId,
        newGold
      );


      return {

        gold: newGold,

        crystals:
          s.crystals +
          (mission.reward.crystals ?? 0),

        ton:
          s.ton +
          (mission.reward.ton ?? 0),

        missions:
          s.missions.filter(
            (m) => m.id !== id
          ),

      };

    });