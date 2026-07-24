import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "../lib/prisma";

export const Route = createFileRoute("/api/player")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const user = await request.json();

          console.log("Telegram user:", user);

          if (!user?.id) {
            return Response.json(
              {
                error: "Usuário Telegram inválido",
              },
              {
                status: 400,
              }
            );
          }

          const telegramId = BigInt(user.id);

          const player = await prisma.player.upsert({
            where: {
              telegramId,
            },

            update: {
              username: user.username ?? null,
              firstName: user.first_name ?? null,
            },

            create: {
              telegramId,

              username: user.username ?? null,

              firstName: user.first_name ?? null,

              coins: BigInt(1250),

              level: 1,

              energy: 100,
            },
          });

          return Response.json({
            id: player.telegramId.toString(),

            name: player.firstName,

            coins: player.coins.toString(),

            level: player.level,

            energy: player.energy,
          });

        } catch (error) {
          console.error("PLAYER API ERROR:", error);

          return Response.json(
            {
              error: "Erro interno do servidor",
              details:
                error instanceof Error
                  ? error.message
                  : String(error),
            },
            {
              status: 500,
            }
          );
        }
      },
    },
  },
});