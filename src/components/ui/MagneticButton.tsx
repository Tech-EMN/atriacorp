import { Button } from "@heroui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({ 
  children, 
  className = "", 
  size = "md",
  variant = "primary",
  onClick,
  disabled = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 400, damping: 40 });
  const springY = useSpring(y, { stiffness: 400, damping: 40 });
  
  const rotateX = useTransform(springY, [-50, 50], [10, -10]);
  const rotateY = useTransform(springX, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = variant === "primary"
    ? "bg-gradient-to-r from-headerButton to-headerButton/80 text-textButton hover:from-headerButton/90 hover:to-headerButton/70"
    : "bg-gradient-to-r from-white/10 to-white/5 text-white border border-white/20 hover:from-white/20 hover:to-white/10";

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size={size}
        disabled={disabled}
        className={`
          ${baseClasses}
          font-semibold rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300
          backdrop-blur-sm
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        onPress={disabled ? undefined : onClick}
      >
        {children}
      </Button>
    </motion.div>
  );
} 