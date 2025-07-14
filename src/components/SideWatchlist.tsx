import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockWatchlist, WatchlistToken } from "@/data/mockAlerts";
import { CoinDetailView } from "@/components/CoinDetailView";
import { cn } from "@/lib/utils";

export function SideWatchlist() {
  const [selectedToken, setSelectedToken] = useState<WatchlistToken | null>(null);
  const [showCoinDetail, setShowCoinDetail] = useState(false);
  
  const handleTokenClick = (token: WatchlistToken) => {
    setSelectedToken(token);
    setShowCoinDetail(true);
  };
  
  const renderTokenRow = (token: WatchlistToken, index: number) => {
    const isPositive = token.change24h > 0;
    
    return (
      <motion.div
        key={token.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
        onClick={() => handleTokenClick(token)}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img 
            src={token.logo} 
            alt={token.symbol}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">{token.symbol}</span>
              <span className="text-xs text-muted-foreground truncate">
                {token.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Vol: {token.volume}
            </div>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          <div className="font-semibold text-sm">{token.price}</div>
          <div className={cn(
            "flex items-center text-xs",
            isPositive ? "text-gradient-start" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {Math.abs(token.change24h).toFixed(1)}%
          </div>
        </div>
      </motion.div>
    );
  };

  const trendingTokens = [
    { id: 'hype', symbol: 'HYPE', name: 'Hyperliquid', price: '$32.45', change: 156.7, logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop', volume: '$2.1M', change24h: 156.7 },
    { id: 'zerebro', symbol: 'ZEREBRO', name: 'Zerebro', price: '$0.12', change: 89.3, logo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=64&h=64&fit=crop', volume: '$890K', change24h: 89.3 },
    { id: 'ai16z', symbol: 'AI16Z', name: 'AI16Z', price: '$1.45', change: 67.8, logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop', volume: '$1.5M', change24h: 67.8 },
    { id: 'virtual', symbol: 'VIRTUAL', name: 'Virtual', price: '$2.78', change: 45.2, logo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=64&h=64&fit=crop', volume: '$3.2M', change24h: 45.2 },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Watchlist */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Watchlist</CardTitle>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {mockWatchlist.slice(0, 5).map((token, index) => renderTokenRow(token, index))}
          </CardContent>
        </Card>

        {/* Trending */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-gradient-start" />
              Trending on Monad
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {trendingTokens.map((token, index) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleTokenClick(token)}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{token.symbol}</span>
                    <Badge className="bg-gradient-start/20 text-gradient-start border-gradient-start/30 text-xs">
                      Hot
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{token.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{token.price}</div>
                  <div className="flex items-center text-xs text-gradient-start">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{token.change.toFixed(1)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* Coin Detail Dialog */}
      {showCoinDetail && selectedToken && (
        <CoinDetailView
          isOpen={showCoinDetail}
          onClose={() => setShowCoinDetail(false)}
          tokenSymbol={selectedToken.symbol}
          tokenLogo={selectedToken.logo}
        />
      )}
    </>
  );
}