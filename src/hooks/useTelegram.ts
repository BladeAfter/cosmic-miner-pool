import { useEffect, useState } from "react";
import { getTelegramUser, TelegramUser } from "../lib/telegram";

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // Logs para depuração
    console.log("Telegram WebApp:", tg);
    console.log("initData:", tg?.initData);
    console.log("initDataUnsafe:", tg?.initDataUnsafe);
    console.log("User:", tg?.initDataUnsafe?.user);

    if (tg) {
      tg.ready();
      tg.expand();
      setIsTelegram(true);
    }

    const telegramUser = getTelegramUser();
    setUser(telegramUser);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    isTelegram,
  };
}