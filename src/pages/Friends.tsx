import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, UserPlus, Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FriendProfile {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  isFollowing: boolean;
}

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendProfiles, setFriendProfiles] = useState<FriendProfile[]>([
    { id: '1', username: 'vitalik.eth', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', followers: 1200000, isFollowing: true },
    { id: '2', username: 'hayden.eth', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', followers: 45000, isFollowing: false },
    { id: '3', username: 'crypto_queen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', followers: 23000, isFollowing: true },
    { id: '4', username: 'degen_chad', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', followers: 12000, isFollowing: false },
    { id: '5', username: 'diamond_hands', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=32&h=32&fit=crop&crop=face', followers: 8900, isFollowing: true },
    { id: '6', username: 'moon_boy', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=face', followers: 7500, isFollowing: false },
    { id: '7', username: 'nft_collector', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face', followers: 6200, isFollowing: false },
  ]);

  const filteredProfiles = searchQuery
    ? friendProfiles.filter(profile =>
        profile.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friendProfiles;

  const toggleFollow = (id: string) => {
    setFriendProfiles(profiles =>
      profiles.map(profile =>
        profile.id === id
          ? { ...profile, isFollowing: !profile.isFollowing }
          : profile
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Friends</h1>
              <p className="text-muted-foreground">
                Discover and follow traders in your Farcaster network
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-glow border-primary/30 text-primary">
                <Users className="w-3 h-3 mr-1" />
                {friendProfiles.filter(p => p.isFollowing).length} Following
              </Badge>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-4">
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "p-4 flex items-center justify-between",
                  "bg-card/80 backdrop-blur-sm border-border/50",
                  "hover:border-primary/30 hover:shadow-card transition-all duration-300"
                )}>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                      <AvatarImage src={profile.avatar} alt={profile.username} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {profile.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-semibold">{profile.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {profile.followers.toLocaleString()} followers
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant={profile.isFollowing ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFollow(profile.id)}
                    className={profile.isFollowing ? "bg-gradient-primary" : ""}
                  >
                    {profile.isFollowing ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-1" />
                        Follow
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}