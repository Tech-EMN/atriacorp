import { motion } from "framer-motion";
import { IoPlay } from "react-icons/io5";

interface StepCounterProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export function StepCounter({ currentStep, totalSteps, stepTitle }: StepCounterProps) {
  return (
    <motion.div 
      className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl backdrop-blur-sm border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Step Number */}
      <motion.div 
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-headerButton to-headerButton/80 rounded-full text-white font-bold text-lg shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentStep}
      </motion.div>
      
      {/* Play Icon */}
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <IoPlay className="text-headerButton text-xl" />
      </motion.div>
      
      {/* Step Info */}
      <div className="text-center">
        <h3 className="text-white font-semibold text-lg">
          {stepTitle}
        </h3>
        <p className="text-gray-400 text-sm">
          Etapa {currentStep} de {totalSteps}
        </p>
      </div>
      
      {/* Decorative dots */}
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-headerButton/60 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
} 