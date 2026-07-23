import { useEffect, useState } from "react";
import { getTelegramUser, TelegramUser } from "../lib/telegram";

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const telegramUser = getTelegramUser();

    setUser(telegramUser);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    isTelegram: user !== null,
  };
}