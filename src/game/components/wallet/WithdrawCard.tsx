import WalletCard from "./WalletCard";

const MIN_WITHDRAW = 0.5;
const FEE_PERCENT = 10;

export default function WithdrawCard() {
  // Futuramente virá da API
  const tonBalance = 0;

  const handleWithdraw = () => {
    // TODO: Abrir modal de saque
  };

  return (
    <WalletCard>
      {/* Topo */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#132544] border border-[#21406B]">
          <img
            src="/assets/wallet.png"
            alt="Wallet"
            className="h-7 w-7 object-contain select-none"
            draggable={false}
          />
        </div>

        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-wider text-[#7083A7]">
            Saque TON
          </p>

          <h2 className="mt-0.5 text-[28px] font-black leading-none text-white">
            {tonBalance.toFixed(4)}
          </h2>

          <p className="mt-1 text-[12px] font-medium text-cyan-400">
            TON disponível
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          className="
            h-11
            min-w-[92px]
            rounded-2xl
            bg-gradient-to-b
            from-[#8A4DFF]
            to-[#6A28F7]
            px-5
            text-[13px]
            font-bold
            text-white
            transition-all
            hover:brightness-110
            active:scale-95
          "
        >
          Sacar
        </button>
      </div>

      {/* Linha */}
      <div className="my-4 h-px bg-[#22395E]" />

      {/* Saque mínimo */}
      <div className="flex items-center justify-between rounded-xl bg-[#101B31] px-4 py-2.5">
        <span className="text-[12px] text-[#9AB0D6]">
          Saque mínimo
        </span>

        <span className="text-[13px] font-bold text-white">
          {MIN_WITHDRAW.toFixed(2)} TON
        </span>
      </div>

      {/* Taxa */}
      <div className="mt-2 flex items-center justify-between rounded-xl bg-[#101B31] px-4 py-2.5">
        <span className="text-[12px] text-[#9AB0D6]">
          Taxa
        </span>

        <span className="text-[13px] font-bold text-[#18F97A]">
          {FEE_PERCENT}%
        </span>
      </div>
    </WalletCard>
  );
}