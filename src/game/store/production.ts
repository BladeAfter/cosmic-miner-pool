import { GameState } from './types';

export const productionTick =
  (set: any) =>
  (dt: number) =>
    set((s: GameState) => {
      // Habilidades
      const mining = s.skills.find((k) => k.id === 'mining')?.level ?? 1;
      const crystalsSkill =
        s.skills.find((k) => k.id === 'crystals')?.level ?? 1;
      const multiplier =
        s.skills.find((k) => k.id === 'multiplier')?.level ?? 1;

      // Produção de coins por segundo
      const coinsPerSecond =
        s.droneCount *
        (2 + mining * 0.3) *
        (1 + multiplier * 0.05);

      // Produção de cristais por hora
      const crystalsPerHour =
        s.droneCount *
        20 *
        (1 + crystalsSkill * 0.12);

      // Progresso do drone
      const progress = s.droneProgress + dt * 0.02;
      const droneReady = progress >= 1;

      return {
        ...s,

        // Recursos
        gold: s.gold + coinsPerSecond * dt,

        crystals:
          s.crystals + (crystalsPerHour / 3600) * dt,

        // Drone
        droneProgress: droneReady ? 0 : progress,

        droneCount: droneReady
          ? s.droneCount + 1
          : s.droneCount,

        // Missão diária
        missions: s.missions.map((m) =>
          m.id === 'd1'
            ? {
                ...m,
                progress: Math.min(
                  m.progress + coinsPerSecond * dt,
                  m.goal
                ),
              }
            : m
        ),
      };
    });