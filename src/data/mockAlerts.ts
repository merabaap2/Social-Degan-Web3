export interface TradeAlert {
  id: string;
  avatarUrl: string;
  username: string;
  action: 'Bought' | 'Sold' | 'Minted';
  tokenSymbol: string;
  tokenLogo: string;
  amount: string;
  value: string;
  txHash: string;
  timestamp: string;
  dexUrl: string;
}

export const mockAlerts: TradeAlert[] = [
  {
    id: '1',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    username: 'vitalik.eth',
    action: 'Bought',
    tokenSymbol: 'MONA',
    tokenLogo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
    amount: '10,000',
    value: '$2,340',
    txHash: '0x1234...5678',
    timestamp: '2m ago',
    dexUrl: 'https://monadscan.xyz/tx/0x1234567890abcdef'
  },
  {
    id: '2',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face',
    username: 'hayden.eth',
    action: 'Minted',
    tokenSymbol: 'DEGEN',
    tokenLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=24&h=24&fit=crop',
    amount: '500',
    value: '$125',
    txHash: '0xabcd...efgh',
    timestamp: '5m ago',
    dexUrl: 'https://monadscan.xyz/tx/0xabcdefgh12345678'
  },
  {
    id: '3',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    username: 'degen_chad',
    action: 'Sold',
    tokenSymbol: 'PEPE',
    tokenLogo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=24&h=24&fit=crop',
    amount: '1,000,000',
    value: '$4,200',
    txHash: '0x9876...5432',
    timestamp: '12m ago',
    dexUrl: 'https://monadscan.xyz/tx/0x987654321abcdef'
  },
  {
    id: '4',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    username: 'crypto_queen',
    action: 'Bought',
    tokenSymbol: 'WOJAK',
    tokenLogo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
    amount: '25,000',
    value: '$890',
    txHash: '0xfedc...ba98',
    timestamp: '18m ago',
    dexUrl: 'https://monadscan.xyz/tx/0xfedcba9876543210'
  },
  {
    id: '5',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    username: 'moonboi',
    action: 'Minted',
    tokenSymbol: 'MOON',
    tokenLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=24&h=24&fit=crop',
    amount: '100',
    value: '$1,500',
    txHash: '0x1111...2222',
    timestamp: '25m ago',
    dexUrl: 'https://monadscan.xyz/tx/0x111122223333'
  },
  {
    id: '6',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
    username: 'nft_collector',
    action: 'Bought',
    tokenSymbol: 'RARE',
    tokenLogo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
    amount: '750',
    value: '$320',
    txHash: '0x3333...4444',
    timestamp: '32m ago',
    dexUrl: 'https://monadscan.xyz/tx/0x333344445555'
  },
  {
    id: '7',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=face',
    username: 'whale_alert',
    action: 'Sold',
    tokenSymbol: 'SHIB',
    tokenLogo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=24&h=24&fit=crop',
    amount: '10,000,000',
    value: '$15,600',
    txHash: '0x5555...6666',
    timestamp: '45m ago',
    dexUrl: 'https://monadscan.xyz/tx/0x555566667777'
  },
  {
    id: '8',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    username: 'diamond_hands',
    action: 'Bought',
    tokenSymbol: 'DIAMOND',
    tokenLogo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
    amount: '50',
    value: '$2,800',
    txHash: '0x7777...8888',
    timestamp: '1h ago',
    dexUrl: 'https://monadscan.xyz/tx/0x777788889999'
  },
  {
    id: '9',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face',
    username: 'defi_degen',
    action: 'Minted',
    tokenSymbol: 'YIELD',
    tokenLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=24&h=24&fit=crop',
    amount: '200',
    value: '$450',
    txHash: '0x9999...aaaa',
    timestamp: '1h ago',
    dexUrl: 'https://monadscan.xyz/tx/0x9999aaaabbbb'
  },
  {
    id: '10',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    username: 'smart_money',
    action: 'Sold',
    tokenSymbol: 'SMART',
    tokenLogo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=24&h=24&fit=crop',
    amount: '5,000',
    value: '$1,230',
    txHash: '0xbbbb...cccc',
    timestamp: '2h ago',
    dexUrl: 'https://monadscan.xyz/tx/0xbbbbccccdddd'
  }
];

export interface WatchlistToken {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: string;
  change24h: number;
  volume: string;
}

export const mockWatchlist: WatchlistToken[] = [
  {
    id: '1',
    symbol: 'MONA',
    name: 'Monad',
    logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
    price: '$0.234',
    change24h: 12.5,
    volume: '$2.1M'
  },
  {
    id: '2',
    symbol: 'DEGEN',
    name: 'Degen',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=24&h=24&fit=crop',
    price: '$0.025',
    change24h: -5.2,
    volume: '$890K'
  },
  {
    id: '3',
    symbol: 'WOJAK',
    name: 'Wojak',
    logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
    price: '$0.00356',
    change24h: 24.8,
    volume: '$1.5M'
  },
  {
    id: '4',
    symbol: 'PEPE',
    name: 'Pepe',
    logo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=24&h=24&fit=crop',
    price: '$0.0000042',
    change24h: -8.1,
    volume: '$5.2M'
  },
  {
    id: '5',
    symbol: 'MOON',
    name: 'MoonCoin',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=24&h=24&fit=crop',
    price: '$15.00',
    change24h: 45.2,
    volume: '$3.8M'
  }
];