import { Button } from "@heroui/button";
import { IoEllipse } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface HeroProps {
  isMobile: boolean;
  scrollToSection: (sectionId: string) => void;
  onOpenDiagnostico?: () => void;
  onOpenIdeia?: () => void;
}

export function Hero({ isMobile, onOpenDiagnostico, onOpenIdeia }: HeroProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayComponents: 0.2
      }
    }
  };

  return (
    <section id="inicio" className="flex flex-col gap-24">
      {!isMobile && (
        <motion.div
          className="absolute top-28 right-0 z-40"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <img src="/icon.svg" alt="Background" className="w-full h-full object-cover" />
        </motion.div>
      )}

      <motion.div
        className="flex flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainer}
        >
          <motion.span
            className="flex items-center gap-2 text-white font-semibold uppercase text-xs p-2 border w-fit rounded-full border-white/10"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 103, 133, 0.5)" }}
          >
            <IoEllipse className="text-headerButton" size={10} />
            decisões mais inteligentes!
          </motion.span>

          <motion.span
            className="text-white font-semibold text-4xl md:text-6xl max-w-96"
            variants={fadeInUp}
          >
            Decisões estratégicas.
            Impacto real!
          </motion.span>

          <motion.span
            className="text-white/70 text-sm md:text-lg font-normal w-1/2"
            variants={fadeInUp}
          >
            Potencialize sua performance com soluções inteligentes, desenvolvidas para gerar impacto.
          </motion.span>
        </motion.div>

        <motion.div
          className="flex items-center gap-4"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size={`${isMobile ? "sm" : "md"}`} 
              className="flex items-center gap-2 bg-headerButton text-textButton font-semibold text-sm rounded-full"
              onPress={() => onOpenDiagnostico?.()}
            >
              Fazer Diagnóstico
              <GoArrowUpRight size={18} className="text-textButton" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MagneticButton
              size="md"
              variant="secondary"
              className="text-sm"
              onClick={() => onOpenIdeia?.()}
            >
              Tenho uma ideia
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center gap-10 w-full md:w-fit justify-center md:justify-start"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <motion.img
          src="/img1.svg"
          alt="Logo Company"
          className="w-24 h-24 md:w-full md:h-full"
          variants={fadeInUp}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.img
          src="/img2.svg"
          alt="Logo Company"
          className="w-24 h-24 md:w-full md:h-full"
          variants={fadeInUp}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.img
          src="/img3.svg"
          alt="Logo Company"
          className="w-24 h-24 md:w-full md:h-full"
          variants={fadeInUp}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.div>
    </section>
  );
} 