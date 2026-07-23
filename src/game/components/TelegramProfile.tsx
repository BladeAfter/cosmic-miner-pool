import { useTelegram } from "../../hooks/useTelegram";

export function TelegramProfile() {
  const { user, loading, isTelegram } = useTelegram();

  if (loading) return null;

  if (!isTelegram || !user) return null;

  return (
    <div className="glass-strong flex items-center gap-3 rounded-2xl border border-violet-500/40 px-4 py-3">
      <img
        src={user.photo_url || "https://placehold.co/64x64"}
        alt={user.first_name}
        className="h-12 w-12 rounded-full border-2 border-cyan-400 object-cover"
      />

      <div className="flex-1 overflow-hidden">
        <h2 className="truncate text-base font-black text-white">
          {user.first_name} {user.last_name ?? ""}
        </h2>

        <p className="text-sm font-bold text-orange-400">
          ⚡ NFT Vision ⚡
        </p>

        <p className="text-[11px] text-gray-400">
          ID: {user.id}
        </p>
      </div>

      <span className="rounded-full bg-cyan-600 px-2 py-1 text-[10px] font-bold text-white">
        {user.language_code?.toUpperCase() ?? "PT-BR"}
      </span>
    </div>
  );
}