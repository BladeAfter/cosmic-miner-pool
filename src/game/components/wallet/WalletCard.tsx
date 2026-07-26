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
        rounded-[22px]
        border
        border-[#27446B]
        bg-gradient-to-b
        from-[#1B3152]
        via-[#172947]
        to-[#13223C]
        p-4
        shadow-[0_8px_24px_rgba(0,0,0,.28)]
        ${className}
      `}
    >
      {/* brilho superior */}
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* brilho suave */}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />

      {/*
        brilho lateral bem discreto
      */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/5 blur-3xl" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}