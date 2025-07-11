import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ConnectStep } from "@/components/ConnectStep";
import { PageHeader } from "@/components/PageHeader";

interface UserData {
  username: string;
  avatarUrl: string;
  selectedFriends: string[];
}

export default function Connect() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = (userData: UserData) => {
    console.log('User setup completed:', userData);
    setIsCompleted(true);
    
    // Simulate saving user data
    setTimeout(() => {
      navigate('/app');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Get Started with Social Signals
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your Farcaster account and select friends to start receiving 
            real-time trade alerts from your social graph.
          </p>
        </motion.div>

        {!isCompleted ? (
          <ConnectStep onComplete={handleComplete} />
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}