import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProgressBar } from "./ProgressBar";
import { StepCounter } from "./StepCounter";
import { EtapaBasica } from "./EtapaBasica";
import { EtapaObjetivos } from "./EtapaObjetivos";
import { EtapaInvestimento } from "./EtapaInvestimento";
import { EtapaFerramentas } from "./EtapaFerramentas";
import { EtapaDesafios } from "./EtapaDesafios";
import { EtapaGargalos } from "./EtapaGargalos";
import { EtapaMetas } from "./EtapaMetas";
import { EtapaAtualizacao } from "./EtapaAtualizacao";
import { EtapaSucesso } from "./EtapaSucesso";
import { ResultadoDiagnostico } from "./ResultadoDiagnostico";
import { GradientText } from "@/components/ui/GradientText";
import { IoSparkles, IoArrowBack, IoArrowForward } from "react-icons/io5";

const TOTAL_ETAPAS = 9;

interface DiagnosticoProps {
  onVoltar?: () => void;
}

export function Diagnostico({ onVoltar }: DiagnosticoProps = {}) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [dados, setDados] = useState({});
  const [concluido, setConcluido] = useState(false);

  const etapas = [
    { titulo: "Informações Básicas", componente: EtapaBasica },
    { titulo: "Objetivos de Negócio", componente: EtapaObjetivos },
    { titulo: "Investimento Atual", componente: EtapaInvestimento },
    { titulo: "Ferramentas Utilizadas", componente: EtapaFerramentas },
    { titulo: "Desafios Tecnológicos", componente: EtapaDesafios },
    { titulo: "Processos com Gargalos", componente: EtapaGargalos },
    { titulo: "Metas da Empresa", componente: EtapaMetas },
    { titulo: "Manter-se Atualizado", componente: EtapaAtualizacao },
    { titulo: "Definição de Sucesso", componente: EtapaSucesso }
  ];

  const proximaEtapa = () => {
    if (etapaAtual < TOTAL_ETAPAS - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      setConcluido(true);
    }
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const etapaAnterior = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const atualizarDados = (novoDados: any) => {
    setDados({ ...dados, ...novoDados });
  };

  if (concluido) {
    return <ResultadoDiagnostico dados={dados} onVoltar={onVoltar} />;
  }

  const EtapaAtualComponent = etapas[etapaAtual].componente;

  return (
    <div className="w-full min-h-screen bg-[#030A0D] py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-headerButton/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#226785]/20 via-transparent to-transparent blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Botão Voltar */}
        {onVoltar && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <MagneticButton
              variant="secondary"
              onClick={onVoltar}
              className="flex items-center gap-2"
            >
              <IoArrowBack />
              Voltar ao Site
            </MagneticButton>
          </motion.div>
        )}

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoSparkles className="text-headerButton text-3xl" />
            <GradientText className="text-4xl md:text-5xl font-bold">
              Diagnóstico I.A.
            </GradientText>
            <IoSparkles className="text-headerButton text-3xl" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubra o potencial da Inteligência Artificial para sua empresa
          </p>
        </motion.div>

        {/* Progress and Step Counter */}
        <div className="mb-8 space-y-6">
          <ProgressBar 
            currentStep={etapaAtual + 1} 
            totalSteps={TOTAL_ETAPAS} 
          />
          <StepCounter 
            currentStep={etapaAtual + 1} 
            totalSteps={TOTAL_ETAPAS}
            stepTitle={etapas[etapaAtual].titulo}
          />
        </div>

        {/* Main Content */}
        <GlassCard className="p-8 mb-8" hover={false}>
          <AnimatePresence mode="wait">
            <motion.div
              key={etapaAtual}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EtapaAtualComponent 
                dados={dados}
                atualizarDados={atualizarDados}
              />
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <MagneticButton
            variant="secondary"
            onClick={etapaAnterior}
            className={`flex items-center gap-2 ${etapaAtual === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <IoArrowBack />
            Anterior
          </MagneticButton>

          <div className="text-gray-400 text-sm">
            {etapaAtual + 1} de {TOTAL_ETAPAS}
          </div>

          <MagneticButton
            onClick={proximaEtapa}
            className="flex items-center gap-2"
          >
            {etapaAtual === TOTAL_ETAPAS - 1 ? 'Finalizar' : 'Próximo'}
            <IoArrowForward />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
} 