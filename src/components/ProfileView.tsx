import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TradeAlert } from '@/data/mockAlerts';
import { cn } from '@/lib/utils';

interface ProfileViewProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  avatarUrl: string;
  trades: TradeAlert[];
}

export function ProfileView({ isOpen, onClose, username, avatarUrl, trades }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('trades');

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Bought':
        return 'bg-gradient-start/20 text-gradient-start border-gradient-start/30';
      case 'Sold':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Minted':
        return 'bg-gradient-end/20 text-gradient-end border-gradient-end/30';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card/90 backdrop-blur-sm border-border/50">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <DialogTitle className="text-2xl font-bold">{username}</DialogTitle>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <Tabs defaultValue="trades" className="w-full" onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="w-full">
              <TabsTrigger value="trades" className="flex-1">Trade History</TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">Stats</TabsTrigger>
              <TabsTrigger value="watchlist" className="flex-1">Watchlist</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trades" className="p-6 pt-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              {trades.length > 0 ? (
                trades.map((trade, index) => (
                  <motion.div
                    key={trade.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={cn("text-xs border", getActionColor(trade.action))}>
                          {trade.action}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {trade.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <img 
                          src={trade.tokenLogo} 
                          alt={trade.tokenSymbol}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline space-x-2">
                            <span className="font-bold text-lg">
                              {trade.amount} {trade.tokenSymbol}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              ({trade.value})
                            </span>
                          </div>
                          <a 
                            href={trade.dexUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1 transition-colors"
                          >
                            <span>View on Explorer</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No trade history available
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="p-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Total Trades</div>
                <div className="text-2xl font-bold">{trades.length}</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Favorite Token</div>
                <div className="text-2xl font-bold">
                  {trades.length > 0 ? trades[0].tokenSymbol : 'N/A'}
                </div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Buy/Sell Ratio</div>
                <div className="text-2xl font-bold">
                  {trades.filter(t => t.action === 'Bought').length} : {trades.filter(t => t.action === 'Sold').length}
                </div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Last Active</div>
                <div className="text-2xl font-bold">
                  {trades.length > 0 ? trades[0].timestamp : 'N/A'}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="p-6 pt-4">
            <div className="text-center py-8 text-muted-foreground">
              Watchlist feature coming soon
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}