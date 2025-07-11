import { motion } from "framer-motion";
import { ExternalLink, Twitter, Github, MessageCircle, Shield, Zap, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Alerts",
      description: "Get instant notifications when your Farcaster friends make trades on Monad Testnet."
    },
    {
      icon: Users,
      title: "Social Graph Integration",
      description: "Leverage your existing Farcaster network to discover trading opportunities."
    },
    {
      icon: Shield,
      title: "Privacy-First",
      description: "We only access public on-chain data and Farcaster profiles. Your privacy is protected."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      bio: "Former DeFi researcher, building the future of social trading."
    },
    {
      name: "Sarah Kim",
      role: "CTO",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=64&h=64&fit=crop&crop=face",
      bio: "Full-stack engineer with expertise in blockchain infrastructure."
    },
    {
      name: "Marcus Johnson",
      role: "Head of Product",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      bio: "Product designer focused on creating intuitive crypto experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-8">
              <span className="text-white font-bold text-2xl">SS</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Social Signals for Degens
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The first social trading intelligence platform that surfaces real-time trade alerts 
              from your Farcaster network on Monad Testnet. Think Bloomberg meets Warpcast.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-gradient-start/20 text-gradient-start border-gradient-start/30">
                Beta Version
              </Badge>
              <Badge className="bg-gradient-end/20 text-gradient-end border-gradient-end/30">
                Monad Testnet
              </Badge>
            </div>
          </div>

          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
                  We believe that the best trading insights come from your trusted network. 
                  Social Signals democratizes access to smart money moves by making your friends' 
                  on-chain activity visible and actionable. No more missing out on opportunities 
                  because information was siloed.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Team */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-center">Meet the Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
                    <CardContent className="p-6">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-primary/20"
                      />
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Disclaimers */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center">Important Disclaimers</h2>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 space-y-4">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Not Financial Advice:</strong> Social Signals provides information tools only. 
                    All trading decisions are your own responsibility. Past performance does not guarantee future results.
                  </p>
                  <p>
                    <strong className="text-foreground">Testnet Only:</strong> This platform currently operates on Monad Testnet. 
                    All tokens and transactions are for testing purposes only and have no real-world value.
                  </p>
                  <p>
                    <strong className="text-foreground">Beta Software:</strong> This is experimental software. Use at your own risk. 
                    We are not responsible for any losses or damages.
                  </p>
                  <p>
                    <strong className="text-foreground">Privacy:</strong> We only access public blockchain data and Farcaster profiles. 
                    Your private keys and personal information are never accessed or stored.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to collaborate? We'd love to hear from you.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" asChild>
                <a href="https://twitter.com/socialsignals" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/socialsignals" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://warpcast.com/socialsignals" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Warpcast
                </a>
              </Button>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center pt-12 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground">
              © 2025 Social Signals Inc. • Not financial advice • Built with ❤️ for the degen community
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </div>
  );
}