import WalletCard from "./WalletCard";
import { useGame } from "../../store/gameStore";

const CRYSTALS_PER_TON = 100000;
const MIN_CONVERT = 10000;

export default function ConvertCard() {
  const crystals = useGame((state) => state.crystals);

  const ton = crystals / CRYSTALS_PER_TON;
  const usd = ton * 5.78;

  const handleConvert = () => {};

  return (
    <WalletCard>
      {/* TOPO */}
      <div className="flex items-center justify-between gap-4">
        {/* Cristais */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#31527E] bg-[#163157]">
            <img
              src="/assets/crystal.png"
              className="h-9 w-9"
              draggable={false}
            />
          </div>

          <div>
            <p className="text-[10px] uppercase text-[#8FA8D3]">
              CRISTAIS
            </p>

            <h2 className="text-[30px] font-black leading-none text-white">
              {crystals.toLocaleString("pt-BR")}
            </h2>
          </div>
        </div>

        {/* TON */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#31527E] bg-[#163157]">
            <img
              src="/assets/ton.png"
              className="h-8 w-8"
              draggable={false}
            />
          </div>

          <div>
            <p className="text-[10px] uppercase text-[#8FA8D3]">
              TON
            </p>

            <h2 className="text-[28px] font-black leading-none text-white">
              {ton.toFixed(4)}
            </h2>

            <p className="mt-1 text-[11px] text-[#9DB4D8]">
              ≈ ${usd.toFixed(2)} USD
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 h-px bg-[#2E4D77]" />

      {/* BAIXO */}
      <div className="flex items-stretch gap-4">
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase text-[#8FA8D3]">
              TAXA DE CONVERSÃO
            </p>

            <p className="mt-2 text-[15px] font-bold text-white">
              {CRYSTALS_PER_TON.toLocaleString("pt-BR")} 💎 = 1 TON
            </p>
          </div>

          <div className="mt-4">
            <p className="text-[10px] uppercase text-[#8FA8D3]">
              MÍNIMO
            </p>

            <p className="mt-2 text-[15px] font-bold text-white">
              {MIN_CONVERT.toLocaleString("pt-BR")} 💎 ={" "}
              {(MIN_CONVERT / CRYSTALS_PER_TON).toFixed(2)} TON
            </p>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="
            w-[130px]
            rounded-2xl
            bg-gradient-to-b
            from-[#A05BFF]
            to-[#6F2FFF]
            px-3
            py-4
            flex
            flex-col
            justify-center
            items-center
            shadow-lg
            shadow-purple-700/25
            transition
            active:scale-95
          "
        >
          <span className="text-[15px] font-extrabold text-white">
            CONVERTER
          </span>

          <span className="mt-2 text-center text-[10px] leading-4 text-white/80">
            Converter seus
            <br />
            cristais em TON
          </span>
        </button>
      </div>
    </WalletCard>
  );
}