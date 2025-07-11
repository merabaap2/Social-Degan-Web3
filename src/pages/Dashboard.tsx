import { motion } from "framer-motion";
import { Bell, Filter, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AlertCard } from "@/components/AlertCard";
import { SideWatchlist } from "@/components/SideWatchlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAlerts } from "@/data/mockAlerts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr,320px] gap-6 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Dashboard Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-3xl font-bold mb-2">Trade Alerts</h1>
                <p className="text-muted-foreground">
                  Real-time trading activity from your Farcaster network
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input 
                placeholder="Search by username, token, or transaction..." 
                className="flex-1"
              />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  All Actions
                </Button>
                <Button variant="outline" size="sm" className="text-gradient-start border-gradient-start/30">
                  Buys
                </Button>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/30">
                  Sells
                </Button>
                <Button variant="outline" size="sm" className="text-gradient-end border-gradient-end/30">
                  Mints
                </Button>
              </div>
            </motion.div>

            {/* Alerts Feed */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-gradient-start rounded-full animate-pulse" />
                  <span>Live feed</span>
                </div>
              </motion.div>
              
              <div className="space-y-4">
                {mockAlerts.map((alert, index) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert} 
                    index={index}
                  />
                ))}
              </div>
              
              {/* Load More */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-6"
              >
                <Button variant="outline" className="min-w-32">
                  Load More
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SideWatchlist />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}