import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingElement } from "@/components/ui/FloatingElement";

interface CTAProps {
  onOpenDiagnostico?: () => void;
  onOpenIdeia?: () => void;
}

export function CTA({ onOpenDiagnostico, onOpenIdeia }: CTAProps = {}) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-headerButton/10 via-transparent to-[#0B1F28]/10"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(34, 103, 133, 0.1) 0%, transparent 50%, rgba(11, 31, 40, 0.1) 100%)",
              "linear-gradient(135deg, rgba(11, 31, 40, 0.1) 0%, transparent 50%, rgba(34, 103, 133, 0.1) 100%)",
              "linear-gradient(135deg, rgba(34, 103, 133, 0.1) 0%, transparent 50%, rgba(11, 31, 40, 0.1) 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating geometric shapes */}
        <FloatingElement delay={0} amplitude={15} duration={6}>
          <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-headerButton/20 rounded-full" />
        </FloatingElement>
        <FloatingElement delay={1} amplitude={20} duration={8}>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-[#0B1F28]/10 to-headerButton/10 rounded-lg rotate-45" />
        </FloatingElement>
        <FloatingElement delay={2} amplitude={12} duration={7}>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-r from-headerButton/30 to-[#0B1F28]/30 rounded-full" />
        </FloatingElement>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Icon/Logo area */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-headerButton/20 via-[#0B1F28]/10 to-headerButton/10 flex items-center justify-center backdrop-blur-sm border border-headerButton/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-10 h-10 md:w-12 md:h-12 text-headerButton" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-headerButton/30 to-[#0B1F28]/30 blur-lg -z-10"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              <span className="block">Transforme sua empresa</span>
              <span className="block bg-gradient-to-r from-headerButton via-white to-[#0B1F28] bg-clip-text text-transparent">
                com IA estratégica!
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Solicite um diagnóstico e descubra como a ATRIA pode acelerar seus resultados com inteligência
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              {/* Efeito de brilho animado */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-headerButton via-white to-headerButton rounded-full blur-sm opacity-75"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Brilho pulsante */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-headerButton/50 via-white/50 to-headerButton/50 rounded-full blur-lg"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              <MagneticButton 
                size="lg" 
                className="relative text-lg px-8 py-4 bg-gradient-to-r from-headerButton to-headerButton/80 shadow-2xl shadow-headerButton/30"
                onClick={() => {
                  onOpenDiagnostico?.();
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-17727916408/Sx5ZCPKI-8YbEPiSqoVC'
                    });
                  }
                }}
              >
                Fazer Diagnóstico I.A.
                <GoArrowUpRight size={20} />
              </MagneticButton>
            </div>
            
            <MagneticButton 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => {
                onOpenIdeia?.();
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'conversion', {
                    'send_to': 'AW-17727916408/bj5BCO-I-8YbEPiSqoVC'
                  });
                }
              }}
            >
              Tenho uma ideia
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: "Consultoria gratuita", icon: "✓" },
              { label: "Diagnóstico personalizado", icon: "⚡" },
              { label: "Resultados garantidos", icon: "🎯" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-white/60 text-sm"
                whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.9)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-headerButton">{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 