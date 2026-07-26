import WalletHeader from "./WalletHeader";
import TonConnectCard from "./TonConnectCard";
import ConvertCard from "./ConvertCard";
import WithdrawCard from "./WithdrawCard";
import DepositCard from "./DepositCard";

interface WalletProps {
  onClose: () => void;
}

export default function Wallet({ onClose }: WalletProps) {
  return (
    <div
      className="
        min-h-screen
        w-full
        bg-gradient-to-b
        from-[#0B1325]
        via-[#08111F]
        to-[#050A16]
        text-white
      "
    >
      <WalletHeader onBack={onClose} />

      <main className="mx-auto max-w-[420px] px-4 pb-6 pt-2">
        <div className="space-y-3">
          <TonConnectCard />

          <ConvertCard />

          <WithdrawCard />

          <DepositCard />
        </div>
      </main>
    </div>
  );
}