/**
 * DexScreener API Service
 * 
 * This service handles communication with the DexScreener API
 * Documentation: https://docs.dexscreener.com/api/reference
 */

interface TokenProfile {
  name: string;
  symbol: string;
  address: string;
  chainId: string;
  decimals: number;
  logoUrl: string | null;
  price: number;
  priceChange: {
    h1: number;
    h6: number;
    h24: number;
  };
  volume: number;
  liquidity: number;
  fdv: number;
  pairAddress: string;
}

interface TokenTrade {
  type: 'buy' | 'sell';
  amount: string;
  amountInUsd: string;
  timestamp: string;
  txHash: string;
  walletAddress: string;
}

interface ChartDataPoint {
  time: string;
  price: number;
}

/**
 * Fetch token profile data from DexScreener API
 */
export const fetchTokenProfile = async (tokenAddress: string, chainId: string): Promise<TokenProfile | null> => {
  try {
    const response = await fetch(`https://api.dexscreener.com/token-profiles/latest/v1?address=${tokenAddress}&chainId=${chainId}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process and transform the API response to our interface
    // This is a simplified example - actual implementation would depend on the API response structure
    if (data && data.pairs && data.pairs.length > 0) {
      const pair = data.pairs[0];
      return {
        name: pair.baseToken.name,
        symbol: pair.baseToken.symbol,
        address: pair.baseToken.address,
        chainId: pair.chainId,
        decimals: pair.baseToken.decimals,
        logoUrl: pair.baseToken.logoUrl,
        price: parseFloat(pair.priceUsd),
        priceChange: {
          h1: parseFloat(pair.priceChange.h1),
          h6: parseFloat(pair.priceChange.h6),
          h24: parseFloat(pair.priceChange.h24),
        },
        volume: parseFloat(pair.volume.h24),
        liquidity: parseFloat(pair.liquidity.usd),
        fdv: parseFloat(pair.fdv),
        pairAddress: pair.pairAddress,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching token profile:', error);
    return null;
  }
};

/**
 * Fetch recent trades for a token
 * Note: This is a mock function as DexScreener API might not provide this directly
 */
export const fetchTokenTrades = async (pairAddress: string, chainId: string): Promise<TokenTrade[]> => {
  // In a real implementation, you would fetch this data from an API
  // For demo purposes, we'll return mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock trades
  return [
    { 
      type: 'buy', 
      amount: '1,000', 
      amountInUsd: '$250', 
      timestamp: '5m ago', 
      txHash: '0xabc...123',
      walletAddress: '0xdef...456'
    },
    { 
      type: 'sell', 
      amount: '500', 
      amountInUsd: '$120', 
      timestamp: '15m ago', 
      txHash: '0xghi...789',
      walletAddress: '0xjkl...012'
    },
    { 
      type: 'buy', 
      amount: '2,500', 
      amountInUsd: '$575', 
      timestamp: '30m ago', 
      txHash: '0xmno...345',
      walletAddress: '0xpqr...678'
    },
    { 
      type: 'buy', 
      amount: '750', 
      amountInUsd: '$165', 
      timestamp: '1h ago', 
      txHash: '0xstu...901',
      walletAddress: '0xvwx...234'
    },
    { 
      type: 'sell', 
      amount: '1,200', 
      amountInUsd: '$288', 
      timestamp: '2h ago', 
      txHash: '0xyzA...567',
      walletAddress: '0xBCD...890'
    },
  ];
};

/**
 * Fetch chart data for a token
 */
export const fetchChartData = async (pairAddress: string, chainId: string, timeframe: '1h' | '24h' | '7d' = '24h'): Promise<ChartDataPoint[]> => {
  try {
    // In a real implementation, you would fetch this data from the DexScreener API
    // For demo purposes, we'll return mock data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock chart data based on the token and timeframe
    let mockChartData: ChartDataPoint[] = [];
    
    // Different data patterns based on timeframe
    if (timeframe === '1h') {
      // Hourly data points (12 points for 5-minute intervals)
      for (let i = 0; i < 12; i++) {
        const minute = i * 5;
        const timeStr = `${Math.floor(minute / 60)}:${(minute % 60).toString().padStart(2, '0')}`;
        
        // Base price varies by token
        let basePrice = 0;
        if (pairAddress.includes('1234567890abcdef1234')) { // MONA
          basePrice = 0.234;
        } else if (pairAddress.includes('abcdef1234567890ab')) { // DEGEN
          basePrice = 0.025;
        } else if (pairAddress.includes('7890abcdef12345678')) { // WOJAK
          basePrice = 0.00356;
        } else if (pairAddress.includes('ef1234567890abcdef')) { // PEPE
          basePrice = 0.0000042;
        } else {
          basePrice = 0.1;
        }
        
        // Add some random variation
        const variation = (Math.random() - 0.5) * 0.02 * basePrice;
        mockChartData.push({
          time: timeStr,
          price: basePrice + variation
        });
      }
    } else if (timeframe === '24h') {
      // 24-hour data (7 points for 4-hour intervals)
      for (let i = 0; i < 7; i++) {
        const hour = i * 4;
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        
        // Base price varies by token
        let basePrice = 0;
        if (pairAddress.includes('1234567890abcdef1234')) { // MONA
          basePrice = 0.234;
        } else if (pairAddress.includes('abcdef1234567890ab')) { // DEGEN
          basePrice = 0.025;
        } else if (pairAddress.includes('7890abcdef12345678')) { // WOJAK
          basePrice = 0.00356;
        } else if (pairAddress.includes('ef1234567890abcdef')) { // PEPE
          basePrice = 0.0000042;
        } else {
          basePrice = 0.1;
        }
        
        // Add some random variation
        const variation = (Math.random() - 0.5) * 0.05 * basePrice;
        mockChartData.push({
          time: timeStr,
          price: basePrice + variation
        });
      }
    } else { // 7d
      // 7-day data (7 points for daily intervals)
      for (let i = 0; i < 7; i++) {
        const day = 6 - i; // Most recent day first
        const timeStr = day === 0 ? 'Today' : `${day}d ago`;
        
        // Base price varies by token
        let basePrice = 0;
        if (pairAddress.includes('1234567890abcdef1234')) { // MONA
          basePrice = 0.234;
        } else if (pairAddress.includes('abcdef1234567890ab')) { // DEGEN
          basePrice = 0.025;
        } else if (pairAddress.includes('7890abcdef12345678')) { // WOJAK
          basePrice = 0.00356;
        } else if (pairAddress.includes('ef1234567890abcdef')) { // PEPE
          basePrice = 0.0000042;
        } else {
          basePrice = 0.1;
        }
        
        // Add some random variation with a trend
        const trend = (i / 7) * 0.1 * basePrice; // Slight upward trend over time
        const variation = (Math.random() - 0.5) * 0.08 * basePrice;
        mockChartData.push({
          time: timeStr,
          price: basePrice - trend + variation
        });
      }
    }
    
    return mockChartData;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return [];
  }
};

/**
 * Search for tokens by name or symbol
 */
export const searchTokens = async (query: string): Promise<TokenProfile[]> => {
  try {
    // In a real implementation, you would call the DexScreener search API
    // For demo purposes, we'll return mock data based on the query
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock token data
    const mockTokens: TokenProfile[] = [
      {
        name: 'Monad',
        symbol: 'MONA',
        address: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 'monad',
        decimals: 18,
        logoUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
        price: 0.234,
        priceChange: { h1: 0.5, h6: 3.2, h24: 12.5 },
        volume: 2100000,
        liquidity: 1500000,
        fdv: 25000000,
        pairAddress: '0x1234567890abcdef1234567890abcdef12345678',
      },
      {
        name: 'Degen',
        symbol: 'DEGEN',
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        chainId: 'monad',
        decimals: 18,
        logoUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=24&h=24&fit=crop',
        price: 0.025,
        priceChange: { h1: -0.2, h6: -2.1, h24: -5.2 },
        volume: 890000,
        liquidity: 750000,
        fdv: 12000000,
        pairAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      },
      {
        name: 'Wojak',
        symbol: 'WOJAK',
        address: '0x7890abcdef1234567890abcdef1234567890abcd',
        chainId: 'monad',
        decimals: 18,
        logoUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=24&h=24&fit=crop',
        price: 0.00356,
        priceChange: { h1: 1.2, h6: 8.5, h24: 24.8 },
        volume: 1500000,
        liquidity: 950000,
        fdv: 8000000,
        pairAddress: '0x7890abcdef1234567890abcdef1234567890abcd',
      },
      {
        name: 'Pepe',
        symbol: 'PEPE',
        address: '0xef1234567890abcdef1234567890abcdef123456',
        chainId: 'monad',
        decimals: 18,
        logoUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=24&h=24&fit=crop',
        price: 0.0000042,
        priceChange: { h1: -0.8, h6: -3.5, h24: -8.1 },
        volume: 5200000,
        liquidity: 2800000,
        fdv: 42000000,
        pairAddress: '0xef1234567890abcdef1234567890abcdef123456',
      },
    ];
    
    // Filter tokens based on query
    if (!query) return mockTokens;
    
    const lowerQuery = query.toLowerCase();
    return mockTokens.filter(token => 
      token.name.toLowerCase().includes(lowerQuery) || 
      token.symbol.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
};