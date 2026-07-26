import {
  useTonWallet,
  useTonConnectUI,
} from "@tonconnect/ui-react";

export function useTonConnect() {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const connect = async () => {
    await tonConnectUI.openModal();
  };

  const disconnect = async () => {
    await tonConnectUI.disconnect();
  };

  const sendTransaction = async (transaction: {
    validUntil: number;
    messages: {
      address: string;
      amount: string;
      payload?: string;
    }[];
  }) => {
    return await tonConnectUI.sendTransaction(transaction);
  };

  return {
    wallet,
    connected: wallet !== null,
    connect,
    disconnect,
    sendTransaction,
  };
}