import { motion } from "framer-motion";
import { FaSearchengin, FaChartLine } from "react-icons/fa6";
import { FaCog, FaRocket } from "react-icons/fa";
import { ProcessStep } from "./ProcessStep";
import { SectionHeader } from "../Solutions/SectionHeader";

export function HowItWorks() {
  const steps = [
    {
      icon: <FaSearchengin size={28} className="text-headerButton" />,
      title: "Diagnóstico Inteligente",
      description: "Entendemos seu negócio antes de propor tecnologia."
    },
    {
      icon: <FaCog size={28} className="text-headerButton" />,
      title: "Arquitetura e Integração",
      description: "Conectamos sistemas sem fricção."
    },
    {
      icon: <FaRocket size={28} className="text-headerButton" />,
      title: "Personalização Estratégica",
      description: "Cada algoritmo é pensado para o seu contexto."
    },
    {
      icon: <FaChartLine size={28} className="text-headerButton" />,
      title: "Entrega Contínua de Valor",
      description: "Resultados mensuráveis desde os primeiros ciclos."
    }
  ];

  return (
    <section id="como-funciona" className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-headerButton/5 to-transparent"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(34, 103, 133, 0.05) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(212, 210, 152, 0.05) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(34, 103, 133, 0.05) 50%, transparent 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-headerButton/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Como funciona"
          title="Transformamos dados em resultados"
          subtitle="Aplicamos inteligência de dados para gerar impacto real nos resultados do seu negócio."
        />

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              {...step}
              step={index + 1}
              delay={index * 0.15}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Timeline visualization for mobile */}
        <motion.div
          className="flex justify-center mt-12 md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-headerButton to-[#D4D298]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.p
            className="text-white/60 text-lg mb-6"
            animate={{
              color: ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.6)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Pronto para transformar sua empresa?
          </motion.p>
          
          <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-full"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-white font-medium">Vamos começar</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5 text-headerButton" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 