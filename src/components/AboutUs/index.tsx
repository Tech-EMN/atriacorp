import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GradientText } from "@/components/ui/GradientText";
import { FloatingElement } from "@/components/ui/FloatingElement";

export function AboutUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-20%" });

  const ScrollRevealText = ({ children, className, delay = 0 }: { 
    children: React.ReactNode, 
    className?: string,
    delay?: number 
  }) => {
    const ref = useRef(null);
    const textInView = useInView(ref, { 
      amount: 0.5,
      margin: "-20% 0px -20% 0px"
    });
    
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ 
          opacity: 0.4,
          y: 20,
          filter: "blur(4px)"
        }}
        animate={{
          opacity: textInView ? 1 : 0.4,
          y: textInView ? 0 : 20,
          filter: textInView ? "blur(0px)" : "blur(4px)"
        }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="sobre-nos" 
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={isInView ? {
            background: [
              "radial-gradient(circle, rgba(34, 103, 133, 0.05) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(212, 210, 152, 0.08) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(34, 103, 133, 0.05) 0%, transparent 70%)"
            ],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Particle system */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-headerButton/30 to-[#D4D298]/30 rounded-full"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + ((i % 4) * 20)}%`,
            }}
            animate={isInView ? {
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            } : {}}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 md:space-y-24">
          {/* First statement */}
          <ScrollRevealText 
            className="text-center space-y-6"
            delay={0.1}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white/80">Nosso propósito é </span>
              <GradientText className="inline">empoderar empresas</GradientText>
              <span className="text-white/80"> com inteligência real, aplicável e de alto impacto — </span>
              <span className="text-[#D4D298]">convertendo complexidade em crescimento mensurável.</span>
            </motion.h2>
          </ScrollRevealText>

          {/* Eduardo section with enhanced design */}
          <ScrollRevealText 
            className="text-center space-y-8"
            delay={0.2}
          >
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Eduardo photo with enhanced effects */}
              <FloatingElement amplitude={8} duration={4}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-headerButton/30 to-[#D4D298]/30 blur-xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <img
                      src="/edu.jpg"
                      alt="Eduardo Nunes"
                      className="relative z-10 w-full h-full rounded-full object-cover border-2 border-white/20 shadow-2xl"
                    />
                    
                    {/* Decorative elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-headerButton to-[#D4D298] rounded-full shadow-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-2 w-4 h-4 bg-gradient-to-br from-[#D4D298] to-headerButton rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </FloatingElement>

              {/* Text content */}
              <div className="flex-1 text-center md:text-left">
                <motion.h3 
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-white/80">Liderada por </span>
                  <GradientText className="inline">Eduardo Nunes</GradientText>
                </motion.h3>
                
                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Unimos algoritmos personalizados, visão estratégica e conhecimento profundo de negócios para transformar dados em 
                  <span className="text-[#D4D298] font-semibold"> decisões rápidas, eficazes e escaláveis.</span>
                </motion.p>
              </div>
            </motion.div>
          </ScrollRevealText>

          {/* Company description */}
          <ScrollRevealText 
            className="text-center"
            delay={0.3}
          >
            <motion.h4 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-white/80">A </span>
              <GradientText className="inline">ATRIA</GradientText>
              <span className="text-white/80"> é uma consultoria especializada em </span>
              <span className="text-[#D4D298]">inteligência artificial aplicada à gestão corporativa.</span>
            </motion.h4>
          </ScrollRevealText>

          {/* Values grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { title: "Inteligência", desc: "Aplicada" },
              { title: "Impacto", desc: "Real" },
              { title: "Crescimento", desc: "Mensurável" }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h5 className="text-xl font-bold text-white mb-2">{value.title}</h5>
                <p className="text-headerButton font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 