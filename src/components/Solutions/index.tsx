import { motion } from "framer-motion";
import { MdLightbulb } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { PiBrainFill } from "react-icons/pi";
import { CgInsights } from "react-icons/cg";
import { SolutionItem } from "./SolutionItem";
import { SectionHeader } from "./SectionHeader";

interface SolutionsProps {
  isMobile: boolean;
  onOpenDiagnostico?: () => void;
}

export function Solutions({ isMobile, onOpenDiagnostico }: SolutionsProps) {
  const solutions = [
    {
      icon: <MdLightbulb size={20} className="text-headerButton" />,
      intro: "Automações",
      title: "Tome decisões com mais velocidade e precisão.",
      description: "Conecte dados dispersos da sua empresa e transforme-os em insights acionáveis, prontos para orientar a liderança em tempo real."
    },
    {
      icon: <AiFillThunderbolt size={20} className="text-headerButton" />,
      intro: "Vendas automatizadas",
      title: "Acelere vendas e ganhe escala comercial.",
      description: "Otimize o funil com inteligência: qualifique leads automaticamente, reduza o ciclo de vendas e aumente conversão."
    },
    {
      icon: <PiBrainFill size={20} className="text-headerButton" />,
      intro: "Automação feita para você",
      title: "Transforme seu conhecimento em vantagem competitiva.",
      description: "Desenvolvemos soluções sob medida que automatizam processos estratégicos e possibilitam a criação de novos produtos."
    },
    {
      icon: <CgInsights size={20} className="text-headerButton" />,
      intro: "Insights que geram ação",
      title: "Mais clareza para decisões de alto impacto",
      description: "Identifique padrões, preveja cenários e tenha relatórios executivos gerados automaticamente com foco em resultados."
    }
  ];

  return (
    <section id="solucoes" className="relative py-20 md:py-32">
      {/* Background simples */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-headerButton/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Nossas soluções"
          title="Soluções corporativas"
          subtitle="Automações, análises e inteligência estratégica focadas nos indicadores que movem sua empresa."
          showButton
          onButtonClick={onOpenDiagnostico}
          isMobile={isMobile}
        />

        {/* Solutions Grid simplificado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <SolutionItem
              key={index}
              {...solution}
              index={index}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 