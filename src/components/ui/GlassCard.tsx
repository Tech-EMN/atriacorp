import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = "", hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/10 via-white/5 to-white/0
        backdrop-blur-xl border border-white/20
        shadow-2xl shadow-[#0B1F28]/30
        ${className}
      `}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.3, 
        delay: delay * 0.5,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={hover ? { 
        y: -4,
        boxShadow: "0 20px 40px rgba(11, 31, 40, 0.4)",
        transition: { duration: 0.2, ease: "easeOut" }
      } : {}}
    >
      {/* Gradient overlay com azul da empresa */}
      <div className="absolute inset-0 bg-gradient-to-br from-headerButton/5 via-[#0B1F28]/3 to-headerButton/3" />
      
      {/* Border accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#0B1F28]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
} 