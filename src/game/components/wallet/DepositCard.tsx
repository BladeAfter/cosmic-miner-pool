import WalletCard from "./WalletCard";

export default function DepositCard() {
  const handleDeposit = () => {
    // Abrir Ton Connect
  };

  return (
    <WalletCard>
      <div className="flex items-center justify-between gap-4">
        {/* Esquerda */}
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#2C4D79] bg-[#173157]">
            <img
              src="/assets/deposit.png"
              alt="Depositar TON"
              className="h-7 w-7 object-contain"
              draggable={false}
            />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-[#8FA8D3]">
              DEPÓSITO DE TON
            </p>

            <p className="mt-1 text-[15px] font-bold text-white">
              Deposite TON na sua carteira
            </p>

            <p className="mt-1 text-[11px] leading-4 text-[#9DB4D8]">
              e aumente seu saldo.
            </p>
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={handleDeposit}
          className="
            h-[82px]
            w-[120px]
            shrink-0
            rounded-[18px]
            bg-gradient-to-b
            from-[#2EE77B]
            to-[#16B85A]
            flex
            flex-col
            items-center
            justify-center
            shadow-lg
            shadow-green-600/20
            transition
            hover:brightness-110
            active:scale-95
          "
        >
          <span className="text-[14px] font-black text-[#06141F]">
            DEPOSITAR
          </span>

          <span className="mt-1 text-center text-[10px] leading-4 text-[#06141F]/75">
            Ver endereço
            <br />
            da carteira
          </span>
        </button>
      </div>
    </WalletCard>
  );
}