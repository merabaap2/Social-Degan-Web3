import { useState } from 'react';
import { GradientButton } from './GradientButton';
import { useWallet } from '@/hooks/use-wallet';

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
  const [error, setError] = useState<string | null>(null);
  const { account, connect } = useWallet();

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await connect();
      if (onConnect && account) onConnect(account);
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