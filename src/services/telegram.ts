export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

export function getTelegramUser(): TelegramUser | null {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    console.log("Telegram WebApp não encontrado");
    return null;
  }

  tg.ready();
  tg.expand();

  return tg.initDataUnsafe.user ?? null;
}