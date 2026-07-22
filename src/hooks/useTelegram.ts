import { useEffect, useState } from "react";
import { getTelegramUser, TelegramUser } from "../services/telegram";

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    setUser(getTelegramUser());
  }, []);

  return user;
}