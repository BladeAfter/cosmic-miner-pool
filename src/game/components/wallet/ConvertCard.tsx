import WalletCard from "./WalletCard";
import { useGame } from "../../store/gameStore";

const CRYSTALS_PER_TON = 100000;
const MIN_CONVERT = 10000;

export default function ConvertCard() {
  const crystals = useGame((state) => state.crystals);

  const ton = crystals / CRYSTALS_PER_TON;
  const usd = ton * 5.78;

  const handleConvert = () => {
    // Abrir modal
  };

  return (
    <WalletCard>
      {/* Topo */}
      <div className="flex items-center">
        {/* Cristais */}
        <div className="flex flex-1 items-center gap-4 pr-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#2A4B77] bg-[#14284A] shadow-inner">
            <img
              src="/assets/crystal.png"
              alt="Cristais"
              className="h-12 w-12 object-contain"
              draggable={false}
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide text-[#7F92B8]">
              CRISTAIS
            </p>

            <h2 className="mt-1 text-[32px] font-black leading-none text-white">
              {crystals.toLocaleString("pt-BR")}
            </h2>
          </div>
        </div>

        {/* Divisor */}
        <div className="mx-3 h-20 w-px bg-[#2D4A73]" />

        {/* TON */}
        <div className="flex flex-1 items-center gap-4 pl-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#2A4B77] bg-[#14284A] shadow-inner">
            <img
              src="/assets/ton.png"
              alt="TON"
              className="h-11 w-11 object-contain"
              draggable={false}
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide text-[#7F92B8]">
              TON
            </p>

            <h2 className="mt-1 text-[30px] font-black leading-none text-white">
              {ton.toFixed(4)}
            </h2>

            <p className="mt-1 text-[12px] text-[#A2B7DA]">
              ≈ ${usd.toFixed(2)} USD
            </p>
          </div>
        </div>
      </div>

      <div className="my-5 h-px bg-[#2D4A73]" />

      {/* Parte inferior */}
      <div className="flex gap-5">
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#7F92B8]">
              TAXA DE CONVERSÃO
            </p>

            <p className="mt-2 text-[16px] font-bold text-white">
              {CRYSTALS_PER_TON.toLocaleString("pt-BR")} 💎 = 1 TON
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-wider text-[#7F92B8]">
              MÍNIMO
            </p>

            <p className="mt-2 text-[16px] font-bold text-white">
              {MIN_CONVERT.toLocaleString("pt-BR")} 💎 ={" "}
              {(MIN_CONVERT / CRYSTALS_PER_TON).toFixed(2)} TON
            </p>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="
            w-[145px]
            rounded-[22px]
            bg-gradient-to-b
            from-[#9756FF]
            to-[#6E2BFF]
            px-4
            py-5
            transition-all
            hover:brightness-110
            active:scale-95
            flex
            flex-col
            items-center
            justify-center
            shadow-lg
            shadow-purple-500/25
          "
        >
          <span className="text-[15px] font-black tracking-wide text-white">
            CONVERTER
          </span>

          <span className="mt-2 text-center text-[11px] leading-4 text-white/85">
            Converter seus
            <br />
            cristais em TON
          </span>
        </button>
      </div>
    </WalletCard>
  );
}