import { ArrowLeft, CircleHelp } from "lucide-react";

type Props = {
  onBack: () => void;
};

export default function WalletHeader({ onBack }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#08101D]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-3">
        {/* Voltar */}
        <button
          onClick={onBack}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-[#152846]
            transition
            hover:bg-[#1A3155]
            active:scale-95
          "
        >
          <ArrowLeft
            size={18}
            strokeWidth={2.4}
            className="text-white"
          />
        </button>

        {/* Título */}
        <h1 className="text-[18px] font-black tracking-wide text-white">
          WALLET
        </h1>

        {/* Ajuda */}
        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-[#152846]
            transition
            hover:bg-[#1A3155]
            active:scale-95
          "
        >
          <CircleHelp
            size={18}
            strokeWidth={2.3}
            className="text-[#19C8FF]"
          />
        </button>
      </div>
    </header>
  );
}