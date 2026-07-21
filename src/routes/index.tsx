import { createFileRoute } from "@tanstack/react-router";
import { GameShell } from "../game/components/GameShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Space Miner — Idle Space Mining" },
      { name: "description", content: "Comande drones, minere planetas e cresça seu império espacial. Skins, boosters, itens lendários e Pool comunitária em TON." },
      { property: "og:title", content: "Space Miner — Idle Space Mining" },
      { property: "og:description", content: "Comande drones, minere planetas e cresça seu império espacial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <GameShell />;
}
