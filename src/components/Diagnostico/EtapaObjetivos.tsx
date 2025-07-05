import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoCheckbox, IoSquareOutline, IoTrendingUp, IoHappy, IoExpand, IoChatbubbles, IoSpeedometer, IoAnalytics, IoAdd } from "react-icons/io5";

interface EtapaObjetivosProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaObjetivos({ dados, atualizarDados }: EtapaObjetivosProps) {
  const [objetivos, setObjetivos] = useState<string[]>(dados.objetivos || []);

  useEffect(() => {
    atualizarDados({ objetivos });
  }, [objetivos]);

  const toggleObjetivo = (objetivo: string) => {
    if (objetivos.includes(objetivo)) {
      setObjetivos(objetivos.filter(o => o !== objetivo));
    } else if (objetivos.length < 2) {
      setObjetivos([...objetivos, objetivo]);
    }
  };

  const opcoes = [
    {
      id: 'reduzir-custos',
      titulo: 'Reduzir custos através da automação',
      descricao: 'Automatizar processos repetitivos para economia',
      icon: IoTrendingUp,
      cor: 'from-green-500/20 to-green-600/20'
    },
    {
      id: 'melhorar-experiencia',
      titulo: 'Melhorar a experiência do cliente',
      descricao: 'Personalização e atendimento mais eficiente',
      icon: IoHappy,
      cor: 'from-blue-500/20 to-blue-600/20'
    },
    {
      id: 'expandir-mercado',
      titulo: 'Expandir a participação no mercado',
      descricao: 'Alcançar novos públicos e oportunidades',
      icon: IoExpand,
      cor: 'from-purple-500/20 to-purple-600/20'
    },
    {
      id: 'otimizar-comunicacao',
      titulo: 'Otimizar a comunicação interna e o fluxo de informações',
      descricao: 'Melhorar colaboração entre equipes',
      icon: IoChatbubbles,
      cor: 'from-orange-500/20 to-orange-600/20'
    },
    {
      id: 'aumentar-escalabilidade',
      titulo: 'Aumentar a escalabilidade do negócio sem comprometer a qualidade ou o atendimento',
      descricao: 'Crescer mantendo excelência',
      icon: IoSpeedometer,
      cor: 'from-cyan-500/20 to-cyan-600/20'
    },
    {
      id: 'acelerar-decisoes',
      titulo: 'Acelerar a tomada de decisão estratégica',
      descricao: 'Decisões mais rápidas baseadas em dados',
      icon: IoAnalytics,
      cor: 'from-pink-500/20 to-pink-600/20'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          {dados.nome && dados.empresa 
            ? `Olá, ${dados.nome}. Quais são os principais objetivos da ${dados.empresa} atualmente?`
            : 'Quais são seus principais objetivos?'
          }
        </h2>
        <p className="text-gray-400">
          Selecione até 2 objetivos que você pretende alcançar com a I.A.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-headerButton font-semibold">
            {objetivos.length}/2 selecionados
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4">
        {opcoes.map((opcao, index) => {
          const isSelected = objetivos.includes(opcao.id);
          const isDisabled = !isSelected && objetivos.length >= 2;

          return (
            <motion.div
              key={opcao.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative cursor-pointer transition-all duration-300
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => !isDisabled && toggleObjetivo(opcao.id)}
            >
              <div className={`
                p-5 rounded-xl border-2 transition-all duration-300
                bg-gradient-to-r ${opcao.cor}
                backdrop-blur-sm
                ${isSelected 
                  ? 'border-headerButton bg-headerButton/10 shadow-lg shadow-headerButton/20' 
                  : 'border-white/20 hover:border-white/40'
                }
              `}>
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    {isSelected ? (
                      <IoCheckbox className="text-headerButton text-2xl" />
                    ) : (
                      <IoSquareOutline className="text-gray-400 text-2xl" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <opcao.icon className={`text-3xl ${isSelected ? 'text-headerButton' : 'text-gray-400'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg mb-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {opcao.titulo}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {opcao.descricao}
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-3 h-3 bg-headerButton rounded-full"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {objetivos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
        >
          <IoAdd className="text-gray-400 text-4xl mx-auto mb-3" />
          <p className="text-gray-400">
            Selecione pelo menos um objetivo para continuar
          </p>
        </motion.div>
      )}
    </div>
  );
} 