import { createFileRoute } from "@tanstack/react-router";
import { prisma } from "../lib/prisma";

export const Route = createFileRoute("/api/player")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const user = await request.json();

          if (!user?.id) {
            return Response.json(
              { error: "Usuário Telegram inválido" },
              { status: 400 }
            );
          }

          const player = await prisma.player.upsert({
            where: {
              telegramId: BigInt(user.id),
            },

            update: {
              username: user.username,
              firstName: user.first_name,
            },

            create: {
              telegramId: BigInt(user.id),
              username: user.username,
              firstName: user.first_name,
              coins: 1250,
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
          console.error(error);

          return Response.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
          );
        }
      },
    },
  },
});