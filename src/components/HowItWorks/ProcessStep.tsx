import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { FloatingElement } from "@/components/ui/FloatingElement";

interface ProcessStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  step: number;
  delay?: number;
  isLast?: boolean;
}

export function ProcessStep({ icon, title, description, step, delay = 0, isLast = false }: ProcessStepProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Connection line */}
      {!isLast && (
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-px h-16 md:hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
        >
          <div className="h-full bg-gradient-to-b from-headerButton/50 to-[#D4D298]/30" />
        </motion.div>
      )}

      {/* Horizontal connection for desktop */}
      {!isLast && (
        <motion.div
          className="absolute top-10 left-full w-full h-px hidden md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
        >
          <div className="h-full bg-gradient-to-r from-headerButton/50 to-[#D4D298]/30" />
        </motion.div>
      )}

      <motion.div
        className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 h-full shadow-2xl"
        whileHover={{ 
          y: -5, 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)" 
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-headerButton/5 to-[#D4D298]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Step number */}
          <motion.div
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-headerButton to-[#D4D298] flex items-center justify-center text-white text-sm font-bold shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
          >
            {step}
          </motion.div>

          {/* Icon */}
          <FloatingElement delay={step * 0.2} amplitude={6} duration={3}>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-headerButton/20 to-[#D4D298]/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg">
                <motion.div
                  animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.div>
              </div>
              
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-headerButton/30 to-[#D4D298]/30 blur-lg -z-10"
                animate={{ 
                  scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                  opacity: isHovered ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </FloatingElement>

          {/* Content */}
          <div className="space-y-3">
            <motion.h3
              className="text-lg md:text-xl font-bold text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.4 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-white/70 text-sm md:text-base leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.5 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: delay + 0.6, duration: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-headerButton to-[#D4D298] rounded-full"
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              transition={{ delay: delay + 0.8, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
} 