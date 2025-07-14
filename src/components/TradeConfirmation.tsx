import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TradeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  tokenSymbol: string;
  tokenLogo: string;
  action: 'buy' | 'sell';
  suggestedAmount: string;
}

export function TradeConfirmation({ 
  isOpen, 
  onClose, 
  tokenSymbol, 
  tokenLogo, 
  action, 
  suggestedAmount 
}: TradeConfirmationProps) {
  const [amount, setAmount] = useState(suggestedAmount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTxHash('0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6));
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-card/90 backdrop-blur-sm border-border/50">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={tokenLogo} alt={tokenSymbol} className="w-full h-full object-cover" />
              </div>
              <DialogTitle className="text-xl font-bold">
                {action === 'buy' ? 'Buy' : 'Sell'} {tokenSymbol}
              </DialogTitle>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full" disabled={isSubmitting}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="p-6">
          {!isSuccess ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  disabled={isSubmitting}
                  className="bg-background/50"
                />
              </div>
              
              <div className="bg-accent/30 rounded-lg p-3 text-sm">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Demo Mode</p>
                    <p className="text-muted-foreground mt-1">
                      This is a demo. No actual transaction will be executed.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className={cn(
                  "w-full",
                  action === 'buy' ? "bg-gradient-start hover:bg-gradient-start/90" : "bg-destructive hover:bg-destructive/90"
                )}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>Confirm {action === 'buy' ? 'Purchase' : 'Sale'}</>
                )}
              </Button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-gradient-start/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-gradient-start" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {action === 'buy' ? 'Purchase' : 'Sale'} Successful!
              </h3>
              
              <p className="text-muted-foreground mb-4">
                Your {action === 'buy' ? 'purchase' : 'sale'} of {amount} {tokenSymbol} was successful.
              </p>
              
              <div className="bg-accent/30 rounded-lg p-3 text-sm text-left mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transaction Hash:</span>
                  <a 
                    href={`https://monadscan.xyz/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center"
                  >
                    {txHash}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onClose}
              >
                Close
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}