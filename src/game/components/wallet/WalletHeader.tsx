import { ArrowLeft, CircleHelp } from "lucide-react";

type Props = {
  onBack: () => void;
};

export default function WalletHeader({ onBack }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1B3355] bg-[#0A1324]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] max-w-[420px] items-center justify-between px-4">
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
            border-[#27446B]
            bg-[#132544]
            text-white
            transition-all
            duration-200
            hover:border-[#3A6BA8]
            hover:bg-[#18304F]
            active:scale-95
          "
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>

        {/* Título */}
        <h1 className="text-[20px] font-extrabold tracking-wide text-white">
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
            border-[#27446B]
            bg-[#132544]
            text-[#79D7FF]
            transition-all
            duration-200
            hover:border-[#3A6BA8]
            hover:bg-[#18304F]
            active:scale-95
          "
        >
          <CircleHelp size={18} strokeWidth={2.3} />
        </button>
      </div>
    </header>
  );
}