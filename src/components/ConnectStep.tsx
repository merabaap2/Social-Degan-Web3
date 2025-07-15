import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Users, Check, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GradientButton } from "./GradientButton";
import { cn } from "@/lib/utils";

interface ConnectStepProps {
  onComplete: (userData: { username: string; avatarUrl: string; selectedFriends: string[] }) => void;
}

const mockFriends = [
  { id: '1', username: 'vitalik.eth', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', followers: 1200000 },
  { id: '2', username: 'hayden.eth', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', followers: 45000 },
  { id: '3', username: 'crypto_queen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', followers: 23000 },
  { id: '4', username: 'degen_chad', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', followers: 12000 },
  { id: '5', username: 'diamond_hands', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face', followers: 8900 },
];

export function ConnectStep({ onComplete }: ConnectStepProps) {
  const [currentStep, setCurrentStep] = useState<'connect' | 'friends'>('connect');
  const [isConnecting, setIsConnecting] = useState(false);
  const [userData, setUserData] = useState<{ username: string; avatarUrl: string } | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate Farcaster connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUserData = {
      username: 'your_crypto',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
    
    setUserData(mockUserData);
    setIsConnecting(false);
    setCurrentStep('friends');
  };

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleComplete = () => {
    if (userData) {
      onComplete({
        username: userData.username,
        avatarUrl: userData.avatarUrl,
        selectedFriends
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs value={currentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="connect" disabled={currentStep === 'friends'}>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </TabsTrigger>
          <TabsTrigger value="friends" disabled={!userData}>
            <Users className="w-4 h-4 mr-2" />
            Select Friends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connect">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Connect Your Farcaster Account</CardTitle>
                <p className="text-muted-foreground">
                  Connect your Farcaster account to see trades from your social graph
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {!userData ? (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                      <Wallet className="w-10 h-10 text-white" />
                    </div>
                    <GradientButton 
                      onClick={handleConnect}
                      disabled={isConnecting}
                      size="lg"
                      className="w-full max-w-sm mx-auto"
                    >
                      {isConnecting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <>Connect Demo Account</>
                      )}
                    </GradientButton>
                    <p className="text-xs text-muted-foreground">
                      This is a demo connection. No actual Farcaster account required.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Powered by{" "}
                      <a href="#" className="text-primary hover:underline">
                        Reown <ExternalLink className="w-3 h-3 inline ml-1" />
                      </a>
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    <div className="flex items-center justify-center space-x-2 text-gradient-start">
                      <Check className="w-6 h-6" />
                      <span className="font-semibold">Connected Successfully!</span>
                    </div>
                    <div className="flex items-center justify-center space-x-4 p-4 bg-gradient-glow rounded-xl">
                      <Avatar className="w-16 h-16 ring-4 ring-primary/20">
                        <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                        <AvatarFallback className="bg-gradient-primary text-white text-lg">
                          {userData.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-lg">{userData.username}</div>
                        <div className="text-muted-foreground">@{userData.username}</div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setCurrentStep('friends')}
                      className="w-full"
                    >
                      Continue to Friend Selection
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="friends">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Select Friends to Follow</CardTitle>
                <p className="text-muted-foreground">
                  Choose which friends' trading activity you want to see alerts for
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {mockFriends.map((friend, index) => (
                    <motion.div
                      key={friend.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleFriendToggle(friend.id)}
                      className={cn(
                        "flex items-center space-x-4 p-4 rounded-xl border transition-all cursor-pointer",
                        selectedFriends.includes(friend.id)
                          ? "border-primary/50 bg-primary/5"
                          : "border-border/50 hover:border-border"
                      )}
                    >
                      <Checkbox
                        id={friend.id}
                        checked={selectedFriends.includes(friend.id)}
                        onCheckedChange={() => handleFriendToggle(friend.id)}
                        className="data-[state=checked]:bg-gradient-start data-[state=checked]:border-gradient-start"
                      />
                      <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                        <AvatarImage src={friend.avatar} alt={friend.username} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {friend.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{friend.username}</div>
                        <div className="text-sm text-muted-foreground">
                          {friend.followers.toLocaleString()} followers
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {selectedFriends.length} friends selected
                    </span>
                  </div>
                  <GradientButton
                    onClick={handleComplete}
                    disabled={selectedFriends.length === 0}
                    size="lg"
                    className="w-full"
                  >
                    Complete Setup
                  </GradientButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}