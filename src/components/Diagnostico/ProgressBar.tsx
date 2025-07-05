import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          Progresso
        </span>
        <span className="text-sm text-headerButton font-semibold">
          {currentStep}/{totalSteps}
        </span>
      </div>
      
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-headerButton to-headerButton/80 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
        
        {/* Success icon when completed */}
        {currentStep === totalSteps && (
          <motion.div
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <IoCheckmarkCircle className="text-headerButton text-xl" />
          </motion.div>
        )}
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Início</span>
        <span>Conclusão</span>
      </div>
    </div>
  );
} 