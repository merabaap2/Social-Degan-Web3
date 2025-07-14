interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    // Make request required as it's required by Eip1193Provider
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on?: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener?: (eventName: string, callback: (...args: any[]) => void) => void;
    selectedAddress?: string;
    chainId?: string;
    networkVersion?: string;
    isConnected?: () => boolean;
  };
}