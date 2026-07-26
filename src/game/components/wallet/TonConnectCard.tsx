import { Copy, ChevronRight } from "lucide-react";
import WalletCard from "./WalletCard";

export default function TonConnectCard() {
  const connected = false;
  const walletAddress = "UQCX...8F7A";

  const handleWallet = () => {
    if (connected) {
      // Abrir detalhes da carteira
      return;
    }

    // Conectar carteira
  };

  return (
    <WalletCard>
      <button
        onClick={handleWallet}
        className="flex w-full items-center justify-between gap-4"
      >
        {/* Esquerda */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#21406B] bg-[#132544]">
            <img
              src="/assets/ton.png"
              alt="TON"
              className="h-6 w-6 object-contain"
              draggable={false}
            />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase tracking-wider text-[#7083A7]">
                CONECTAR CARTEIRA
              </p>

              {connected && (
                <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-[#22E36A]">
                  <span className="h-2 w-2 rounded-full bg-[#22E36A]" />
                  CONECTADA
                </span>
              )}
            </div>

            <h2 className="mt-1 text-[20px] font-black leading-none text-white">
              TON CONNECT
            </h2>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[12px] text-[#8EA7D3]">
                {connected ? walletAddress : "Conectar carteira"}
              </span>

              {connected && (
                <Copy
                  size={13}
                  className="text-[#8EA7D3] transition hover:text-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-3">
          {!connected && (
            <span className="text-[12px] font-semibold text-cyan-400">
              Conectar
            </span>
          )}

          <ChevronRight
            size={18}
            strokeWidth={2.5}
            className="text-[#7F95BA]"
          />
        </div>
      </button>
    </WalletCard>
  );
}