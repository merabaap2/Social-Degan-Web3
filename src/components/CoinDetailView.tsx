import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, TrendingUp, TrendingDown, DollarSign, BarChart3, Clock, Activity } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { fetchChartData } from '@/services/dexScreenerApi';

interface CoinDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  tokenSymbol: string;
  tokenLogo: string;
  showTradePoint?: boolean;
  tradeTimestamp?: string;
  tradeType?: 'buy' | 'sell';
}

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
  };
  volume: number;
  liquidity: number;
  fdv: number;
  pairAddress: string;
  chainId: string;
}

export function CoinDetailView({ isOpen, onClose, tokenSymbol, tokenLogo, showTradePoint = false, tradeTimestamp, tradeType }: CoinDetailViewProps) {
  const [activeTab, setActiveTab] = useState(showTradePoint ? 'chart' : 'overview');
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [chartData, setChartData] = useState<Array<{time: string, price: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartError, setChartError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');

  // Mock trades for the token
  const mockTrades = [
    { type: 'buy', amount: '1,000', price: '$0.25', time: '5m ago', wallet: '0xabc...123' },
    { type: 'sell', amount: '500', price: '$0.24', time: '15m ago', wallet: '0xdef...456' },
    { type: 'buy', amount: '2,500', price: '$0.23', time: '30m ago', wallet: '0xghi...789' },
    { type: 'buy', amount: '750', price: '$0.22', time: '1h ago', wallet: '0xjkl...012' },
    { type: 'sell', amount: '1,200', price: '$0.24', time: '2h ago', wallet: '0xmno...345' },
  ];

  useEffect(() => {
    if (isOpen) {
      // In a real implementation, this would fetch data from the DexScreener API
      // For now, we'll simulate a fetch with mock data
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          // Mock successful response
          const mockTokenData: TokenData = {
            name: tokenSymbol === 'MONA' ? 'Monad' : 
                  tokenSymbol === 'DEGEN' ? 'Degen' : 
                  tokenSymbol === 'WOJAK' ? 'Wojak' : 
                  tokenSymbol === 'PEPE' ? 'Pepe' : 'Unknown Token',
            symbol: tokenSymbol,
            price: tokenSymbol === 'MONA' ? 0.234 : 
                   tokenSymbol === 'DEGEN' ? 0.025 : 
                   tokenSymbol === 'WOJAK' ? 0.00356 : 
                   tokenSymbol === 'PEPE' ? 0.0000042 : 0.1,
            priceChange: {
              h24: tokenSymbol === 'MONA' ? 12.5 : 
                    tokenSymbol === 'DEGEN' ? -5.2 : 
                    tokenSymbol === 'WOJAK' ? 24.8 : 
                    tokenSymbol === 'PEPE' ? -8.1 : 0,
              h6: 3.2,
              h1: 0.5,
            },
            volume: tokenSymbol === 'MONA' ? 2100000 : 
                    tokenSymbol === 'DEGEN' ? 890000 : 
                    tokenSymbol === 'WOJAK' ? 1500000 : 
                    tokenSymbol === 'PEPE' ? 5200000 : 1000000,
            liquidity: 1500000,
            fdv: 25000000,
            pairAddress: '0x1234567890abcdef1234567890abcdef12345678',
            chainId: 'monad',
          };
          
          setTokenData(mockTokenData);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to fetch token data');
          setIsLoading(false);
        }
      }, 1000);
    }
  }, [isOpen, tokenSymbol]);
  
  // Fetch chart data when component is opened or timeframe changes
  useEffect(() => {
    if (isOpen && tokenData) {
      setChartLoading(true);
      setChartError(null);
      
      // Fetch chart data using the API service
      fetchChartData(tokenData.pairAddress, tokenData.chainId, timeframe)
        .then(data => {
          setChartData(data);
          setChartLoading(false);
        })
        .catch(err => {
          console.error('Error fetching chart data:', err);
          setChartError('Failed to load chart data');
          setChartLoading(false);
        });
    }
  }, [isOpen, tokenData, timeframe]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.00001) {
      return price.toExponential(2);
    } else if (price < 0.001) {
      return price.toFixed(6);
    } else if (price < 0.1) {
      return price.toFixed(4);
    } else {
      return price.toFixed(2);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-card/90 backdrop-blur-sm border-border/50">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={tokenLogo} alt={tokenSymbol} className="w-full h-full object-cover" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{tokenSymbol}</DialogTitle>
                {tokenData && (
                  <div className="text-sm text-muted-foreground">{tokenData.name}</div>
                )}
              </div>
              {tokenData && (
                <div className="ml-4">
                  <div className="text-2xl font-bold">${formatPrice(tokenData.price)}</div>
                  <div className={cn(
                    "text-sm flex items-center",
                    tokenData.priceChange.h24 >= 0 ? "text-gradient-start" : "text-destructive"
                  )}>
                    {tokenData.priceChange.h24 >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(tokenData.priceChange.h24).toFixed(1)}% (24h)
                  </div>
                </div>
              )}
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading token data...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={() => onClose()}>Close</Button>
          </div>
        ) : tokenData && (
          <Tabs defaultValue={showTradePoint ? 'chart' : 'overview'} className="w-full" onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="chart" className="flex-1">Chart</TabsTrigger>
                <TabsTrigger value="trades" className="flex-1">Recent Trades</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 pt-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-1 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>24h Volume</span>
                  </div>
                  <div className="text-xl font-bold">{formatCurrency(tokenData.volume)}</div>
                </Card>
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-1 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4" />
                    <span>Liquidity</span>
                  </div>
                  <div className="text-xl font-bold">{formatCurrency(tokenData.liquidity)}</div>
                </Card>
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-1 text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4" />
                    <span>Fully Diluted Value</span>
                  </div>
                  <div className="text-xl font-bold">{formatCurrency(tokenData.fdv)}</div>
                </Card>
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Price Change (1h)</span>
                  </div>
                  <div className={cn(
                    "text-xl font-bold flex items-center",
                    tokenData.priceChange.h1 >= 0 ? "text-gradient-start" : "text-destructive"
                  )}>
                    {tokenData.priceChange.h1 >= 0 ? "+" : ""}{tokenData.priceChange.h1}%
                  </div>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Token Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Chain</span>
                    <span className="font-medium">Monad</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Contract</span>
                    <a 
                      href={`https://monadscan.xyz/address/${tokenData.pairAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:text-primary/80 flex items-center"
                    >
                      {`${tokenData.pairAddress.substring(0, 6)}...${tokenData.pairAddress.substring(tokenData.pairAddress.length - 4)}`}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Pair</span>
                    <span className="font-medium">{tokenSymbol}/USDC</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chart" className="p-6 pt-4">
              <div className="flex justify-center space-x-2 mb-4">
                <Button 
                  variant={timeframe === '1h' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setTimeframe('1h')}
                  className={timeframe === '1h' ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white" : ""}
                >
                  1H
                </Button>
                <Button 
                  variant={timeframe === '24h' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setTimeframe('24h')}
                  className={timeframe === '24h' ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white" : ""}
                >
                  24H
                </Button>
                <Button 
                  variant={timeframe === '7d' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setTimeframe('7d')}
                  className={timeframe === '7d' ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white" : ""}
                >
                  7D
                </Button>
              </div>
              
              {chartLoading ? (
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                </div>
              ) : chartError ? (
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-destructive mb-4">{chartError}</p>
                    <Button variant="outline" size="sm" onClick={() => {
                      setChartLoading(true);
                      setChartError(null);
                      fetchChartData(tokenData.pairAddress, tokenData.chainId, timeframe)
                        .then(data => {
                          setChartData(data);
                          setChartLoading(false);
                        })
                        .catch(err => {
                          setChartError('Failed to load chart data');
                          setChartLoading(false);
                        });
                    }}>
                      Retry
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 h-[300px] flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Chart visualization */}
                    <div className="absolute inset-0 flex items-end">
                      {chartData.map((point, index) => {
                        // Find max price to scale properly
                        const maxPrice = Math.max(...chartData.map(p => p.price));
                        const height = (point.price / (maxPrice * 1.1)) * 100; // Scale to fit in container with 10% padding
                        
                        // Determine if this is the trade point to highlight
                        const isTradePoint = showTradePoint && 
                          ((tradeTimestamp === '5m ago' && index === chartData.length - 2) ||
                           (tradeTimestamp === '15m ago' && index === chartData.length - 3) ||
                           (tradeTimestamp === '30m ago' && index === Math.floor(chartData.length / 2)) ||
                           (tradeTimestamp === '1h ago' && index === Math.floor(chartData.length / 3)) ||
                           (tradeTimestamp === '2h ago' && index === 1));
                        
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className={cn(
                                "w-full mx-1 relative", 
                                index > 0 && chartData[index-1].price < point.price ? "bg-gradient-start/70" : "bg-destructive/70"
                              )}
                              style={{ height: `${height}%` }}
                            >
                              {isTradePoint && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <div className={cn(
                                    "w-4 h-4 rounded-full animate-pulse",
                                    tradeType === 'buy' ? "bg-gradient-start" : "bg-destructive"
                                  )}></div>
                                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-background/90 text-xs px-2 py-1 rounded whitespace-nowrap">
                                    {tradeType === 'buy' ? 'Entry' : 'Exit'} Point
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">{point.time}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="absolute top-2 left-2 text-sm font-medium">
                      Price: ${formatPrice(tokenData.price)}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 text-center text-sm text-muted-foreground">
                For detailed charts, view on <a 
                  href={`https://dexscreener.com/monad/${tokenData.pairAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >DexScreener</a>
              </div>
            </TabsContent>

            <TabsContent value="trades" className="p-6 pt-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {mockTrades.map((trade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={cn(
                            "text-xs border",
                            trade.type === 'buy' ? "bg-gradient-start/20 text-gradient-start border-gradient-start/30" : "bg-destructive/20 text-destructive border-destructive/30"
                          )}>
                            {trade.type === 'buy' ? 'Buy' : 'Sell'}
                          </Badge>
                          <span className="font-medium">{trade.amount} {tokenSymbol}</span>
                          <span className="text-muted-foreground">{trade.price}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-muted-foreground">{trade.time}</span>
                          <a 
                            href={`https://monadscan.xyz/address/${trade.wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 flex items-center"
                          >
                            {trade.wallet}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}