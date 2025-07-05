import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaCog, FaShieldAlt } from "react-icons/fa";
import { SectionHeader } from "../Solutions/SectionHeader";
import { SectorGrid } from "./SectorGrid";

interface BenefitsProps {
  isMobile: boolean;
  onOpenDiagnostico?: () => void;
}

export function Benefits({ isMobile, onOpenDiagnostico }: BenefitsProps) {
  const sectors = [
    {
      title: "Marketing e Vendas",
      description: "Qualificação automatizada de leads, funis inteligentes, insights para campanhas de alta performance.",
      icon: <FaChartLine size={20} className="text-headerButton" />,
      gradient: "bg-gradient-to-br from-headerButton/20 via-[#0B1F28]/10 to-headerButton/10",
      features: [
        "Lead scoring automatizado",
        "Funis de conversão inteligentes",
        "Análise preditiva de comportamento",
        "ROI em tempo real"
      ]
    },
    {
      title: "Financeiro e Gestão",
      description: "Relatórios executivos, previsões com base em dados históricos e integração com ERPs.",
      icon: <FaCog size={20} className="text-headerButton" />,
      gradient: "bg-gradient-to-br from-[#0B1F28]/15 via-headerButton/10 to-[#0B1F28]/5",
      features: [
        "Dashboard executivo unificado",
        "Previsões financeiras precisas",
        "Integração ERP automatizada",
        "Indicadores KPI personalizados"
      ]
    },
    {
      title: "Inovação e Produto",
      description: "Algoritmos personalizados para spin-offs, novos produtos ou otimização de processos.",
      icon: <FaUsers size={20} className="text-headerButton" />,
      gradient: "bg-gradient-to-br from-headerButton/20 via-[#0B1F28]/10 to-headerButton/10",
      features: [
        "MVP data-driven",
        "Validação automatizada",
        "Otimização de processos",
        "Algoritmos proprietários"
      ]
    },
    {
      title: "RH e Jurídico",
      description: "Análises de desempenho, inteligência documental e automação de fluxos internos.",
      icon: <FaShieldAlt size={20} className="text-headerButton" />,
      gradient: "bg-gradient-to-br from-[#0B1F28]/15 via-headerButton/10 to-[#0B1F28]/5",
      features: [
        "Análise de performance",
        "Gestão documental IA",
        "Compliance automatizado",
        "Workflows inteligentes"
      ]
    }
  ];

  return (
    <section id="beneficios" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background com azul da empresa */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "radial-gradient(circle at 30% 40%, rgba(34, 103, 133, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(11, 31, 40, 0.05) 0%, transparent 50%)"
          }}
          animate={{
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
          badge="Benefícios"
          title="Aplicações por setor"
          subtitle="Soluções sob medida para cada área do seu negócio, com resultados mensuráveis e impacto direto no crescimento."
          showButton
          buttonText="Fazer diagnóstico"
          onButtonClick={onOpenDiagnostico}
          isMobile={isMobile}
        />

        {/* Sectors Grid */}
        <SectorGrid sectors={sectors} />

        {/* Bottom statistics com azul */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {[
            { number: "4+", label: "Setores" },
            { number: "20+", label: "Recursos" },
            { number: "99.5%", label: "Uptime" },
            { number: "24/7", label: "Suporte" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-[#0B1F28]/10 to-headerButton/5 border border-[#0B1F28]/20"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-headerButton to-[#0B1F28] bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 