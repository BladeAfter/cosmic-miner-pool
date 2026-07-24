import { getTelegramUser } from "../../lib/telegram";

export async function loadPlayerFromDatabase() {
  const user = getTelegramUser();

  if (!user) return null;

  const response = await fetch("/api/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Erro ao carregar jogador");
  }

  return await response.json();
}