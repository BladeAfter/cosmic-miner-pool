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
        <p className="font-bold">⚠ Abra este jogo pelo Telegram</p>

        <p className="mt-2 text-sm text-gray-400">
          Os dados do jogador aparecerão automaticamente quando o jogo for aberto
          como um Telegram Mini App.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-strong flex items-center gap-4 rounded-3xl p-4">
      <img
        src={user.photo_url || "https://placehold.co/80x80"}
        alt={user.first_name}
        className="h-16 w-16 rounded-full border-2 border-cyan-400 object-cover"
      />

      <div className="flex-1">
        <h2 className="text-lg font-black">
          {user.first_name} {user.last_name ?? ""}
        </h2>

        <p className="text-cyan-300">
          @{user.username ?? "sem_username"}
        </p>

        <p className="text-xs text-gray-400">
          ID: {user.id}
        </p>

        <div className="mt-2 flex gap-2">
          {user.is_premium && (
            <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
              ⭐ Premium
            </span>
          )}

          <span className="rounded-full bg-cyan-600 px-2 py-1 text-xs font-bold">
            {user.language_code?.toUpperCase() ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}