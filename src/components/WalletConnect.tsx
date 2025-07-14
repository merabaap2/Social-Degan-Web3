import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GradientButton } from './GradientButton';

// Using the ethereum type from ethereum.d.ts

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  buttonText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WalletConnect({ 
  onConnect, 
  buttonText = 'Connect Wallet',
  className = '',
  size = 'md'
}: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
            if (onConnect) onConnect(accounts[0].address);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      }
    };
    
    checkConnection();
  }, [onConnect]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed! Please install MetaMask to continue.');
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        // In ethers v6, we need to get the signer to get the connected address
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        if (onConnect) onConnect(address);
      } else {
        throw new Error('No accounts found');
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  // If already connected, show the connected address
  if (account) {
    const displayAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
    return (
      <GradientButton 
        className={className} 
        size={size}
        disabled
      >
        Connected: {displayAddress}
      </GradientButton>
    );
  }

  return (
    <GradientButton
      onClick={connectWallet}
      disabled={isConnecting}
      className={className}
      size={size}
    >
      {isConnecting ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Connecting...</span>
        </div>
      ) : (
        buttonText
      )}
    </GradientButton>
  );
}