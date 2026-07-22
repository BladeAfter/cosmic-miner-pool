import { getTelegramUser } from "./telegram";

export async function login() {
  const user = getTelegramUser();

  if (!user) return null;

  return {
    telegramId: user.id,
    username: user.username,
    firstName: user.first_name,
  };
}