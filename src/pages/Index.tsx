import { motion } from "framer-motion";
import { Rocket, Users, TrendingUp, Zap, ArrowRight, ExternalLink, Bell, Eye, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GradientButton } from "@/components/GradientButton";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Alerts",
      description: "Get instant notifications when wallets in your Farcaster social graph make trades on Monad Testnet."
    },
    {
      icon: Users,
      title: "Social Graph",
      description: "Leverage your existing Farcaster network to discover profitable trading opportunities from trusted sources."
    },
    {
      icon: TrendingUp,
      title: "One-click Copy Trade",
      description: "Mirror successful trades from smart money in your network with a single click. No more FOMO."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                Social Signals
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <GradientButton href="/connect" size="sm">
                Launch App
              </GradientButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-gradient-glow border-primary/30 text-primary">
              Now live on Monad Testnet 🚀
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Social Signals for Degens
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              The first social trading intelligence platform. Get real-time alerts when your 
              <span className="text-gradient-start font-semibold"> Farcaster friends </span>
              make moves on Monad Testnet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GradientButton href="/connect" size="lg" className="text-lg px-8 py-4 flex items-center justify-center">
              <Rocket className="w-5 h-5 mr-2" />
              Launch App
            </GradientButton>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-4">
              <a href="#demo">
                <Eye className="w-5 h-5 mr-2" />
                View Demo
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            Bloomberg × Warpcast • No signup required • Connect with Farcaster
          </motion.p>
        </div>
      </section>

      {/* Animated Mockup */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container mx-auto px-4 pb-20"
        id="demo"
      >
        <div className="max-w-6xl mx-auto">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-8 shadow-card">
            <div className="grid lg:grid-cols-[1fr,300px] gap-6">
              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Trade Alerts</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-gradient-start rounded-full animate-pulse" />
                    <span>Live feed</span>
                  </div>
                </div>
                
                {/* Mock Alert Cards */}
                {[
                  {
                    user: "vitalik.eth",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
                    action: "Bought",
                    amount: "10,000 MONA",
                    value: "$2,340",
                    time: "2m ago"
                  },
                  {
                    user: "hayden.eth", 
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                    action: "Minted",
                    amount: "500 DEGEN",
                    value: "$125",
                    time: "5m ago"
                  },
                  {
                    user: "crypto_queen",
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face", 
                    action: "Sold",
                    amount: "1M PEPE",
                    value: "$4,200",
                    time: "12m ago"
                  }
                ].map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="p-4 bg-card/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                          <AvatarImage src={alert.avatar} alt={alert.user} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {alert.user.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{alert.user}</span>
                            <Badge className={`text-xs ${
                              alert.action === 'Bought' ? 'bg-gradient-start/20 text-gradient-start border-gradient-start/30' :
                              alert.action === 'Sold' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                              'bg-gradient-end/20 text-gradient-end border-gradient-end/30'
                            }`}>
                              {alert.action}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">{alert.amount}</span>
                            <span className="text-muted-foreground ml-2">({alert.value})</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Mock Sidebar */}
              <div className="space-y-4">
                <Card className="bg-card/30 border-border/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Trending</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["HYPE +156%", "ZEREBRO +89%", "AI16Z +67%"].map((token, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex justify-between text-sm"
                      >
                        <span>{token.split(' ')[0]}</span>
                        <span className="text-gradient-start">{token.split(' ')[1]}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Social Signals?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop missing profitable trades. Start following smart money in your network.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full hover:border-primary/30 transition-all duration-300 hover:shadow-card">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-glow-pulse">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <Card className="bg-gradient-glow border-primary/30 p-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Follow Smart Money?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the beta and start getting alerts from your Farcaster network today.
            </p>
            <GradientButton href="/connect" size="lg" className="text-lg px-12 py-4 flex items-center justify-center">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </GradientButton>
            <p className="text-sm text-muted-foreground mt-4">
              Free during beta • Monad Testnet only
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">SS</span>
              </div>
              <span className="font-semibold">Social Signals</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Warpcast
              </a>
              <span>Not financial advice • © 2025 Social Signals Inc.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
