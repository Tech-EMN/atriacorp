import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GoArrowUpRight } from "react-icons/go";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  isMobile?: boolean;
}

export function SectionHeader({ 
  badge, 
  title, 
  subtitle, 
  showButton = false, 
  buttonText = "Fazer diagnóstico",
  onButtonClick,
  isMobile = false
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
      <motion.div
        className="flex-1 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Badge com azul da empresa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-headerButton bg-gradient-to-r from-headerButton/10 via-[#0B1F28]/10 to-headerButton/10 rounded-full border border-headerButton/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-headerButton to-[#0B1F28] animate-pulse" />
            {badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
            <GradientText className="block">
              {title}
            </GradientText>
          </h2>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-white/70 text-lg leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      {/* Button */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex-shrink-0"
        >
          <MagneticButton
            size={isMobile ? "sm" : "md"}
            onClick={onButtonClick}
          >
            {buttonText}
            <GoArrowUpRight size={18} />
          </MagneticButton>
        </motion.div>
      )}
    </div>
  );
} 