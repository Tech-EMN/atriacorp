import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className = "", animate = true }: GradientTextProps) {
  return (
    <motion.span
      className={`
        bg-gradient-to-r from-headerButton via-white to-headerButton
        bg-clip-text text-transparent
        ${className}
      `}
      initial={animate ? { opacity: 0, y: 10 } : {}}
      whileInView={animate ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
} 