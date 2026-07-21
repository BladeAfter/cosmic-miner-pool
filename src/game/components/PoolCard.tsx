import { motion } from "framer-motion";
import {
  Waves,
  Clock3,
  Users,
  Trophy,
  CircleDollarSign,
} from "lucide-react";
import { useGame } from "../store/gameStore";

export function PoolCard() {
  const { pool } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl glass-strong p-5"
      style={{
        boxShadow: "0 0 45px oklch(0.78 0.22 330 / .35)",
      }}
    >
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-pool/40 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative">

        <div className="flex items-center gap-3">

          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-pool shadow-neon">
            <Waves className="h-8 w-8 text-white" />
          </div>

          <div>

            <p className="text-xs uppercase tracking-[4px] text-muted-foreground">
              Community Pool
            </p>

            <h2 className="text-3xl font-black text-gradient-gold">
              {pool.toFixed(4)} TON
            </h2>

          </div>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl bg-black/20 p-3">

            <div className="flex items-center gap-2">

              <Clock3 className="h-4 w-4 text-primary" />

              <span className="text-xs text-muted-foreground">
                Distribuição
              </span>

            </div>

            <p className="mt-2 text-lg font-bold">
              6 Dias
            </p>

          </div>

          <div className="rounded-2xl bg-black/20 p-3">

            <div className="flex items-center gap-2">

              <Users className="h-4 w-4 text-primary" />

              <span className="text-xs text-muted-foreground">
                Elegíveis
              </span>

            </div>

            <p className="mt-2 text-lg font-bold">
              0
            </p>

          </div>

          <div className="rounded-2xl bg-black/20 p-3">

            <div className="flex items-center gap-2">

              <CircleDollarSign className="h-4 w-4 text-primary" />

              <span className="text-xs text-muted-foreground">
                Sua contribuição
              </span>

            </div>

            <p className="mt-2 text-lg font-bold">
              0 TON
            </p>

          </div>

          <div className="rounded-2xl bg-black/20 p-3">

            <div className="flex items-center gap-2">

              <Trophy className="h-4 w-4 text-primary" />

              <span className="text-xs text-muted-foreground">
                Estimativa
              </span>

            </div>

            <p className="mt-2 text-lg font-bold">
              --
            </p>

          </div>

        </div>

        <div className="mt-6 rounded-2xl bg-primary/10 border border-primary/20 p-4">

          <h3 className="font-bold mb-2">
            Como funciona?
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">

            <li>
              • 50% das compras realizadas com TON entram na Pool.
            </li>

            <li>
              • 50% da receita dos anúncios também alimenta a Pool.
            </li>

            <li>
              • A distribuição acontece automaticamente a cada 6 dias.
            </li>

            <li>
              • Apenas jogadores qualificados recebem uma parte da recompensa.
            </li>

          </ul>

        </div>

      </div>
    </motion.div>
  );
}