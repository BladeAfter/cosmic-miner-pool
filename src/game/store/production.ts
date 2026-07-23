import { GameState } from "./types";

export const productionTick =
  (set: any) =>
  (dt: number) =>
    set((s: GameState) => {
      const mining =
        s.skills.find((k) => k.id === "mining")?.level ?? 1;

      const crystalsSkill =
        s.skills.find((k) => k.id === "crystals")?.level ?? 1;

      const multiplier =
        s.skills.find((k) => k.id === "multiplier")?.level ?? 1;

      // Produção
      const coinsPerSecond =
        s.droneCount *
        (2 + mining * 0.3) *
        (1 + multiplier * 0.05);

      const crystalsPerHour =
        s.droneCount *
        20 *
        (1 + crystalsSkill * 0.12);

      // Drone
      const progress = s.droneProgress + dt * 0.02;
      const droneReady = progress >= 1;

      const nextDroneProgress = droneReady ? 0 : progress;
      const nextDroneCount = droneReady
        ? s.droneCount + 1
        : s.droneCount;

      // Atualiza somente a missão necessária
      const missions = s.missions.map((mission) => {
        if (mission.id !== "d1") return mission;

        return {
          ...mission,
          progress: Math.min(
            mission.progress + coinsPerSecond * dt,
            mission.goal
          ),
        };
      });

      return {
        gold: s.gold + coinsPerSecond * dt,

        crystals:
          s.crystals +
          (crystalsPerHour / 3600) * dt,

        droneProgress: nextDroneProgress,

        droneCount: nextDroneCount,

        missions,
      };
    });