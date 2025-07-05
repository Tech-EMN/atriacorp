import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}

export function FloatingElement({ 
  children, 
  className = "", 
  delay = 0, 
  amplitude = 10,
  duration = 3 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
} 