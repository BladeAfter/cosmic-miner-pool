import WalletCard from "./WalletCard";

export default function DepositCard() {
  const handleDeposit = () => {
    // Abrir Ton Connect para realizar o depósito
  };

  return (
    <WalletCard>
      <div className="flex items-stretch gap-4">
        {/* Conteúdo */}
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#21406B] bg-[#132544]">
            <img
              src="/assets/deposit.png"
              alt="Depositar TON"
              className="h-7 w-7 object-contain"
              draggable={false}
            />
          </div>

          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider text-[#7083A7]">
              DEPÓSITO DE TON
            </p>

            <h2 className="mt-1 text-[20px] font-black leading-none text-white">
              DEPOSITAR TON
            </h2>

            <p className="mt-2 text-[12px] leading-5 text-[#8EA7D3]">
              Deposite TON na sua carteira
              <br />
              e aumente seu saldo.
            </p>
          </div>
        </div>

        {/* Botão */}
        <button
          type="button"
          onClick={handleDeposit}
          className="
            w-[120px]
            rounded-2xl
            bg-gradient-to-b
            from-[#2CE173]
            to-[#18B85A]
            px-3
            py-4
            transition-all
            hover:brightness-110
            active:scale-95
            flex
            flex-col
            items-center
            justify-center
            shadow-lg
            shadow-green-500/20
          "
        >
          <span className="text-[14px] font-extrabold text-[#06131F]">
            DEPOSITAR
          </span>

          <span className="mt-2 text-center text-[10px] leading-4 text-[#06131F]/80">
            Ver endereço
            <br />
            da carteira
          </span>
        </button>
      </div>
    </WalletCard>
  );
}