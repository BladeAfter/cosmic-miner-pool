import { getTelegramUser } from "../../lib/telegram";
import { useGame } from "./gameStore";

export async function loadPlayer() {
  const user = getTelegramUser();

  if (!user) {
    console.log("Usuário Telegram não encontrado");
    return;
  }

  const response = await fetch("/api/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    console.error("Erro ao carregar jogador");
    return;
  }

  const player = await response.json();

  console.log("Jogador carregado:", player);

  useGame.getState().setPlayer(player);
}