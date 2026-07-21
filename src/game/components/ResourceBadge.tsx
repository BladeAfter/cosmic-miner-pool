import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
  gradient: string;
  glow: string;
};

export function ResourceBadge({ icon, label, value, gradient, glow }: Props) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="glass relative flex min-w-0 flex-1 items-center gap-2 rounded-2xl px-2.5 py-1.5"
      style={{ boxShadow: `0 0 20px ${glow}` }}
    >
      <div
        className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-base"
        style={{ background: gradient, boxShadow: `0 4px 12px ${glow}` }}
      >
        {icon}
      </div>
      <div className="min-w-0 leading-tight">
        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-bold">{value}</div>
      </div>
    </motion.div>
  );
}
