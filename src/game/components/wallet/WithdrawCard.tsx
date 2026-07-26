import WalletCard from "./WalletCard";

const MIN_WITHDRAW = 0.5;
const FEE_PERCENT = 10;

export default function WithdrawCard() {
  const tonBalance = 0;

  const handleWithdraw = () => {
    // Abrir modal de saque
  };

  return (
    <WalletCard>
      {/* Topo */}
      <div className="flex items-center justify-between gap-4">
        {/* Informações */}
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#31527E] bg-[#173157]">
            <img
              src="/assets/wallet.png"
              alt="Wallet"
              className="h-7 w-7 object-contain"
              draggable={false}
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#8FA8D3]">
              SAQUE TON
            </p>

            <h2 className="mt-1 text-[26px] font-black leading-none text-white">
              {tonBalance.toFixed(4)}
            </h2>

            <p className="mt-1 text-[11px] text-[#19C8FF]">
              TON disponível
            </p>
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={handleWithdraw}
          className="
            h-[82px]
            w-[120px]
            shrink-0
            rounded-[18px]
            bg-gradient-to-b
            from-[#A05BFF]
            to-[#6F2FFF]
            flex
            flex-col
            items-center
            justify-center
            shadow-lg
            shadow-purple-600/20
            transition
            hover:brightness-110
            active:scale-95
          "
        >
          <span className="text-[15px] font-black text-white">
            SACAR
          </span>

          <span className="mt-1 text-center text-[10px] leading-4 text-white/80">
            Enviar para
            <br />
            sua carteira
          </span>
        </button>
      </div>

      {/* Divisor */}
      <div className="my-4 h-px bg-[#2D4A73]" />

      {/* Informações */}
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-[#11203A] px-3 py-2">
          <span className="text-[11px] text-[#9DB4D8]">
            Saque mínimo
          </span>

          <span className="text-[12px] font-bold text-white">
            {MIN_WITHDRAW.toFixed(2)} TON
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#11203A] px-3 py-2">
          <span className="text-[11px] text-[#9DB4D8]">
            Taxa de saque
          </span>

          <span className="text-[12px] font-bold text-[#22E36A]">
            {FEE_PERCENT}%
          </span>
        </div>
      </div>
    </WalletCard>
  );
}