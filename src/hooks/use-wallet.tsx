import { useState, useCallback } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connect = useCallback(async (): Promise<string> => {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed! Please install MetaMask to continue.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    return address;
  }, []);

  return { account, connect };
}
