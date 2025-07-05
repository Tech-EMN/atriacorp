import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

interface EtapaInvestimentoProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaInvestimento({ dados, atualizarDados }: EtapaInvestimentoProps) {
  const [investimentos, setInvestimentos] = useState(dados.investimentos || {});

  useEffect(() => {
    atualizarDados({ investimentos });
  }, [investimentos]);

  const handleSelect = (area: string, nivel: string) => {
    setInvestimentos((prev: any) => ({
      ...prev,
      [area]: nivel
    }));
  };

  const areas = [
    { key: 'crm', label: 'Automação de CRM' },
    { key: 'atendimento', label: 'Atendimento ao Cliente' },
    { key: 'vendas', label: 'Sistemas de Vendas' },
    { key: 'projetos', label: 'Gestão de Projetos' },
    { key: 'informacoes', label: 'Organização das Informações' },
    { key: 'conteudo', label: 'Criação de Conteúdo' }
  ];

  const niveis = [
    { key: 'nenhum', label: 'Nenhum', cor: 'bg-gray-600' },
    { key: 'baixo', label: 'Baixo', cor: 'bg-red-500' },
    { key: 'medio', label: 'Médio', cor: 'bg-yellow-500' },
    { key: 'alto', label: 'Alto', cor: 'bg-green-500' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          Qual é seu investimento atual em tecnologia?
        </h2>
        <p className="text-gray-400">
          Avalie o nível de investimento de sua empresa em cada área
        </p>
      </motion.div>

      {/* Desktop Matrix */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div></div>
            {niveis.map((nivel) => (
              <motion.div
                key={nivel.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className={`w-4 h-4 ${nivel.cor} rounded-full mx-auto mb-2`} />
                <span className="text-white font-medium text-sm">
                  {nivel.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Matrix */}
          {areas.map((area, areaIndex) => (
            <motion.div
              key={area.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: areaIndex * 0.1 }}
              className="grid grid-cols-5 gap-4 mb-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
            >
              {/* Area Label */}
              <div className="flex items-center">
                <span className="text-white font-medium text-sm">
                  {area.label}
                </span>
              </div>

              {/* Radio Options */}
              {niveis.map((nivel) => {
                const isSelected = investimentos[area.key] === nivel.key;
                
                return (
                  <div key={nivel.key} className="flex justify-center">
                    <motion.button
                      onClick={() => handleSelect(area.key, nivel.key)}
                      className={`
                        w-8 h-8 rounded-full border-2 transition-all duration-300
                        flex items-center justify-center
                        ${isSelected 
                          ? 'border-headerButton bg-headerButton shadow-lg shadow-headerButton/30' 
                          : 'border-white/30 hover:border-white/50'
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <IoCheckmarkCircle className="text-white text-lg" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden space-y-6">
        {areas.map((area, areaIndex) => (
          <motion.div
            key={area.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: areaIndex * 0.1 }}
            className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 p-4"
          >
            <h4 className="text-white font-medium mb-4 text-center">
              {area.label}
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {niveis.map((nivel) => {
                const isSelected = investimentos[area.key] === nivel.key;
                
                return (
                  <motion.button
                    key={nivel.key}
                    onClick={() => handleSelect(area.key, nivel.key)}
                    className={`
                      p-3 rounded-lg border-2 transition-all duration-300
                      flex items-center gap-3
                      ${isSelected 
                        ? 'border-headerButton bg-headerButton/20 shadow-lg shadow-headerButton/20' 
                        : 'border-white/20 hover:border-white/40'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-4 h-4 ${nivel.cor} rounded-full flex-shrink-0`} />
                    <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {nivel.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <IoCheckmarkCircle className="text-headerButton text-lg" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-headerButton/10 to-transparent p-4 rounded-xl border-l-4 border-headerButton"
      >
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">
            Progresso: {Object.keys(investimentos).length}/{areas.length} áreas avaliadas
          </span>
          <div className="flex gap-1">
            {areas.map((area) => (
              <div
                key={area.key}
                className={`w-3 h-3 rounded-full transition-colors ${
                  investimentos[area.key] ? 'bg-headerButton' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 