import { motion } from "framer-motion";
import { FooterItem } from "@/components/FooterItem";
import { FooterSocials } from "@/components/FooterSocials";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingElement } from "@/components/ui/FloatingElement";

interface FooterProps {
  isMobile: boolean;
  scrollToSection: (sectionId: string) => void;
  onOpenDiagnostico?: () => void;
}

export function Footer({ isMobile, scrollToSection, onOpenDiagnostico }: FooterProps) {
  const navigationItems = [
    { label: "Início", section: "inicio" },
    { label: "Soluções", section: "solucoes" },
    { label: "Como funciona", section: "como-funciona" },
    { label: "Benefícios", section: "beneficios" },
    { label: "Sobre nós", section: "sobre-nos" }
  ];

  const socialLinks = [
    { icon: <FaXTwitter color="white" />, label: "Twitter" },
    { icon: <FaLinkedin color="white" />, label: "LinkedIn" },
    { icon: <FaFacebook color="white" />, label: "Facebook" },
    { icon: <FaGithub color="white" />, label: "GitHub" },
    { icon: <PiInstagramLogoFill color="white" />, label: "Instagram" }
  ];

  return (
    <footer className="relative py-20 md:py-24 overflow-hidden border-t border-white/5">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-headerButton/5 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingElement
            key={i}
            delay={i * 0.5}
            amplitude={8}
            duration={4 + (i % 3)}
          >
            <div 
              className="absolute w-1 h-1 bg-headerButton/40 rounded-full"
              style={{
                left: `${15 + (i * 10)}%`,
                bottom: `${20 + (i % 3) * 15}%`,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Main footer content */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo and tagline */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="/logo.svg" 
                  alt="Logo ATRIA"
                  className="h-12 md:h-16 w-auto"
                />
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  Decisões estratégicas.
                  <br />
                  <span className="bg-gradient-to-r from-headerButton to-[#D4D298] bg-clip-text text-transparent">
                    Impacto real!
                  </span>
                </h3>
                
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                  Transformamos dados em inteligência estratégica para impulsionar o crescimento do seu negócio.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <MagneticButton
                  size={isMobile ? "sm" : "md"}
                  onClick={() => onOpenDiagnostico?.()}
                  className="mt-4"
                >
                  Fazer diagnóstico
                </MagneticButton>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-4 space-y-6">
              <motion.h4
                className="text-lg font-semibold text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Navegação
              </motion.h4>
              
              <motion.nav
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <FooterItem 
                      item={item.label} 
                      onClick={() => scrollToSection(item.section)} 
                    />
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-3 space-y-6">
              <motion.h4
                className="text-lg font-semibold text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Contato
              </motion.h4>

              <motion.div
                className="space-y-4 text-white/60 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="space-y-2">
                  <p className="text-white font-medium">Email</p>
                  <p>contato@atria.com.br</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-white font-medium">Telefone</p>
                  <p>+55 11 9999-9999</p>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-white font-medium text-sm">Siga-nos</p>
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                      whileHover={{ scale: 1.2, y: -2 }}
                    >
                      <FooterSocials icon={social.icon} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                className="text-white/40 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                © 2025 Atria. Todos os direitos reservados.
              </motion.p>

              <motion.div
                className="flex items-center space-x-6 text-sm text-white/60"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Política de Privacidade
                </motion.a>
                <span className="text-white/20">•</span>
                <motion.a
                  href="/termos-de-uso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Termos de Uso
                </motion.a>
                <span className="text-white/20">•</span>
                <motion.a
                  href="https://drive.google.com/file/d/1YvxBFPQ3oJFjUjKUTuhYdGHkpX1PiTHb/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Políticas de Cookie
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-headerButton to-[#D4D298]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 