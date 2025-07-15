import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "./WalletConnect";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigation = [
    { name: 'Dashboard', href: '/app', current: currentPath === '/app' },
    { name: 'Settings', href: '/settings', current: currentPath === '/settings' },
    { name: 'About', href: '/about', current: currentPath === '/about' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-sm">SS</span>
            </motion.div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              Social Signals
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  item.current
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gradient-start text-black text-xs">
                3
              </Badge>
            </Button>

            <WalletConnect size="sm" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}