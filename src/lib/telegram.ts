import { retrieveLaunchParams } from "@telegram-apps/sdk";

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
  try {
    const { tgWebAppData } = retrieveLaunchParams();

    console.log("Launch Params:", tgWebAppData);
    console.log("User:", tgWebAppData?.user);

    return (tgWebAppData?.user as TelegramUser) ?? null;
  } catch (err) {
    console.warn("Aplicação não está rodando dentro do Telegram.", err);
    return null;
  }
}