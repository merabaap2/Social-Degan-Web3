import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface WalletContextValue {
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const WalletProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed! Please install MetaMask to continue.');
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    if (accounts.length > 0) {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      throw new Error('No accounts found');
    }
  };

  const disconnect = () => setAccount(null);

  return (
    <WalletContext.Provider value={{ account, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
