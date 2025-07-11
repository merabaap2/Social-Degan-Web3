import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Eye, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TradeAlert } from "@/data/mockAlerts";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  alert: TradeAlert;
  index: number;
}

export function AlertCard({ alert, index }: AlertCardProps) {
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

  const handleCopyTrade = () => {
    // Mock copy trade functionality
    console.log(`Copy trading ${alert.username}'s ${alert.action} of ${alert.tokenSymbol}`);
  };

  const handleAddToWatchlist = () => {
    // Mock add to watchlist functionality
    console.log(`Added ${alert.tokenSymbol} to watchlist`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className={cn(
        "p-4 bg-card/80 backdrop-blur-sm border-border/50",
        "hover:border-primary/30 hover:shadow-card transition-all duration-300",
        "hover:bg-card/90"
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Avatar className="w-10 h-10 ring-2 ring-primary/20">
              <AvatarImage src={alert.avatarUrl} alt={alert.username} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {alert.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold text-foreground truncate">
                  {alert.username}
                </span>
                <Badge className={cn("text-xs border", getActionColor(alert.action))}>
                  {alert.action}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {alert.timestamp}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={alert.tokenLogo} 
                  alt={alert.tokenSymbol}
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-bold text-lg">
                      {alert.amount} {alert.tokenSymbol}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({alert.value})
                    </span>
                  </div>
                  <a 
                    href={alert.dexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1 mt-1 transition-colors"
                  >
                    <span>Tx: {alert.txHash}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyTrade}
                  className="text-xs border-gradient-start/30 text-gradient-start hover:bg-gradient-start/10"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Trade
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToWatchlist}
                  className="text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Watch
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="text-xs"
                >
                  <a href={alert.dexUrl} target="_blank" rel="noopener noreferrer">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    View DEX
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}