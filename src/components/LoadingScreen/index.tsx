import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030A0D] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="/logo.svg" 
            alt="ATRIA" 
            className="w-32 h-32"
            style={{
              filter: "drop-shadow(0 0 10px rgba(34, 103, 133, 0.5))"
            }}
          />
        </motion.div>

        {/* Texto principal */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h1 className="text-white text-2xl md:text-3xl font-semibold mb-2">
            Decisões estratégicas.
          </h1>
          <p className="text-[#8B949E] text-lg">
            Impacto real!
          </p>
        </motion.div>

        {/* Loader dots elegante */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-headerButton rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div 
          className="w-64 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-headerButton to-[#D4D298] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
} 