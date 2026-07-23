import { useTelegram } from "../../hooks/useTelegram";

export function TelegramProfile() {
  const { user, loading, isTelegram } = useTelegram();

  if (loading) {
    return (
      <div className="glass-strong rounded-3xl p-4 text-center">
        Carregando usuário...
      </div>
    );
  }

  if (!isTelegram || !user) {
    return (
      <div className="glass-strong rounded-3xl p-4 text-center">
        Abra este jogo pelo Telegram.
      </div>
    );
  }

  return (
    <div className="glass-strong flex items-center gap-4 rounded-3xl border border-violet-500/40 p-5">
      <img
        src={user.photo_url || "https://placehold.co/80x80"}
        alt={user.first_name}
        className="h-16 w-16 rounded-full border-2 border-cyan-400 object-cover"
      />

      <div className="flex-1">
        <h2 className="text-xl font-black text-white">
          {user.first_name} {user.last_name ?? ""}
        </h2>

        <p className="mt-1 text-lg font-bold text-white">
          ⚡ NFT Vision ⚡
        </p>

        <p className="mt-1 text-xs text-gray-400">
          ID: {user.id}
        </p>

        <span className="mt-3 inline-block rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">
          {user.language_code?.toUpperCase() ?? "PT-BR"}
        </span>
      </div>
    </div>
  );
}