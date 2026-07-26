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
    <div className="min-h-screen w-full bg-[#08101D] text-white overflow-x-hidden">
      <WalletHeader onBack={onClose} />

      <main className="mx-auto w-full max-w-md px-3 py-3">
        <div className="space-y-2.5">
          <TonConnectCard />

          <ConvertCard />

          <WithdrawCard />

          <DepositCard />
        </div>
      </main>
    </div>
  );
}