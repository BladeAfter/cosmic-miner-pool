export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export function getTelegramUser(): TelegramUser | null {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    console.warn("Telegram WebApp não encontrado.");
    return null;
  }

  tg.ready();
  tg.expand();

  return tg.initDataUnsafe?.user ?? null;
}