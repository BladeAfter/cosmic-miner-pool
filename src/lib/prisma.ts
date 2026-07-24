import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const url = process.env.DATABASE_URL;

    console.log("DATABASE_URL existe:", !!url);

    if (!url) {
      throw new Error("DATABASE_URL não encontrada");
    }

    const adapter = new PrismaPg({
      connectionString: url,
    });

    return new PrismaClient({
      adapter,
    });
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}