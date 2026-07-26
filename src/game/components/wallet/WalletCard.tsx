import { ReactNode } from "react";

interface WalletCardProps {
  children: ReactNode;
  className?: string;
}

export default function WalletCard({
  children,
  className = "",
}: WalletCardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-white/10
        bg-[#162C4C]
        px-4
        py-3.5
        shadow-[0_2px_10px_rgba(0,0,0,.18)]
        ${className}
      `}
    >
      {/* brilho superior */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/10" />

      {/* leve brilho azul */}
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-400/5 blur-2xl" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}