import { X } from "lucide-react";

interface MissionHeaderProps {
  onClose: () => void;
  onWatchAd: () => void;
}

export function MissionHeader({
  onClose,
}: MissionHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#070B17]/95 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-white">
            MISSIONS
          </h1>

          <p className="mt-1 text-xs text-white/50">
            Complete missions and earn rewards
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111827] text-white transition hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>
    </header>
  );
}