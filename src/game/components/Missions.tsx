import { useState } from "react";
import { useGame } from "../store/gameStore";
import { showRewardedAd } from "../../services/gigapub";

import { MissionHeader } from "./missions/MissionHeader";
import { MissionTabs } from "./missions/MissionTabs";
import { MissionCard } from "./missions/MissionCard";

import {
  AD_REWARD,
  getAdsRemaining,
  MAX_DAILY_ADS,
} from "../store/ads";

import { Play } from "lucide-react";

interface MissionsProps {
  onClose: () => void;
}

export function Missions({ onClose }: MissionsProps) {
  const { missions, claimMission, watchAd, playerId } = useGame();

  const [tab, setTab] = useState<"daily" | "social" | "weekly">("daily");
  const [remaining, setRemaining] = useState(getAdsRemaining());

  const handleWatchAd = async () => {
    const rewarded = await showRewardedAd();

    if (!rewarded || !playerId) return;

    await watchAd(playerId);

    setRemaining(getAdsRemaining());
  };

  const filtered = missions.filter((m) => m.type === tab);

  return (
    <div className="min-h-screen bg-[#070B17] text-white">
      <div className="mx-auto w-full max-w-md">

        <MissionHeader
          onClose={onClose}
          onWatchAd={handleWatchAd}
        />

        <MissionTabs
          active={tab}
          onChange={setTab}
          counts={{
            daily: missions.filter((m) => m.type === "daily").length,
            social: missions.filter((m) => m.type === "social").length,
            weekly: missions.filter((m) => m.type === "weekly").length,
          }}
        />

        <div className="px-4 pt-3">
          <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 p-4">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/20">
                  <Play
                    size={22}
                    fill="currentColor"
                    className="text-black"
                  />
                </div>

                <div>
                  <div className="text-xs font-black tracking-wider text-black/70">
                    DAILY BONUS
                  </div>

                  <div className="text-lg font-black text-black">
                    +{AD_REWARD.toLocaleString()} COINS
                  </div>

                  <div className="text-xs text-black/70">
                    {remaining}/{MAX_DAILY_ADS} vídeos restantes
                  </div>
                </div>

              </div>

              <button
                onClick={handleWatchAd}
                disabled={remaining === 0}
                className="rounded-xl bg-black px-5 py-2 text-sm font-black text-yellow-400 transition hover:scale-105 active:scale-95 disabled:opacity-40"
              >
                WATCH
              </button>

            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pt-3">

          {filtered.length ? (
            filtered.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onClaim={() => claimMission(mission.id)}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 text-center">
              <p className="text-sm text-white/60">
                No missions available.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}