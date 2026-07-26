import { ChevronRight, Copy } from "lucide-react";
import WalletCard from "./WalletCard";

export default function TonConnectCard() {
  const connected = false;
  const walletAddress = "UQCX...8F7A";

  const handleWallet = () => {
    if (connected) {
      return;
    }

    // Ton Connect
  };

  return (
    <WalletCard>
      <button
        onClick={handleWallet}
        className="flex w-full items-center justify-between"
      >
        {/* ESQUERDA */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#31527E] bg-[#173157]">
            <img
              src="/assets/ton.png"
              alt="TON"
              className="h-7 w-7 object-contain"
              draggable={false}
            />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase tracking-wide text-[#8FA8D3]">
                CONECTAR CARTEIRA
              </p>

              {connected && (
                <span className="flex items-center gap-1 text-[9px] font-bold text-[#22E36A]">
                  <span className="h-2 w-2 rounded-full bg-[#22E36A]" />
                  CONECTADA
                </span>
              )}
            </div>

            <h2 className="mt-1 text-[16px] font-black text-white">
              TON CONNECT
            </h2>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-[11px] text-[#9DB4D8]">
                {connected ? walletAddress : "Conectar carteira"}
              </span>

              {connected && (
                <Copy
                  size={12}
                  className="text-[#9DB4D8] hover:text-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-3">
          {!connected && (
            <span className="text-[12px] font-semibold text-[#15C8FF]">
              Conectar
            </span>
          )}

          <ChevronRight
            size={18}
            strokeWidth={2.4}
            className="text-[#7C94BB]"
          />
        </div>
      </button>
    </WalletCard>
  );
}