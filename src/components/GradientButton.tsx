import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GradientButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href,
  className,
  onClick,
  disabled,
  type = 'button'
}: GradientButtonProps) {
  const baseClasses = cn(
    "relative overflow-hidden border-0 font-semibold transition-all duration-300",
    "hover:scale-105 active:scale-95",
    variant === 'primary' && [
      "bg-gradient-primary text-white shadow-neon",
      "hover:shadow-[0_0_40px_hsl(var(--gradient-start)_/_0.4)]"
    ],
    variant === 'secondary' && [
      "bg-gradient-to-r from-card to-secondary text-foreground border border-border",
      "hover:from-secondary hover:to-accent"
    ],
    size === 'sm' && "px-4 py-2 text-sm",
    size === 'md' && "px-6 py-3 text-base",
    size === 'lg' && "px-8 py-4 text-lg",
    className
  );

  const MotionButton = motion(Button);

  const buttonContent = (
    <MotionButton
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </MotionButton>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}