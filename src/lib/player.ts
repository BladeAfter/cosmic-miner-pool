import { prisma } from "./prisma";

export async function getOrCreatePlayer(user: {
  id: number;
  first_name: string;
  username?: string;
}) {
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
      coins: 0,
      level: 1,
      energy: 100,
    },
  });

  return player;
}