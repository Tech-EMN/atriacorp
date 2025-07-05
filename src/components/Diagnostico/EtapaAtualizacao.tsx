import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoCheckbox, IoSquareOutline, IoSchool, IoBusinessOutline, IoPeople, IoHelpCircle, IoAdd } from "react-icons/io5";

interface EtapaAtualizacaoProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaAtualizacao({ dados, atualizarDados }: EtapaAtualizacaoProps) {
  const [formasAtualizacao, setFormasAtualizacao] = useState<string[]>(dados.formasAtualizacao || []);

  useEffect(() => {
    atualizarDados({ formasAtualizacao });
  }, [formasAtualizacao]);

  const toggleForma = (forma: string) => {
    if (formasAtualizacao.includes(forma)) {
      setFormasAtualizacao(formasAtualizacao.filter(f => f !== forma));
    } else {
      setFormasAtualizacao([...formasAtualizacao, forma]);
    }
  };

  const opcoes = [
    {
      id: 'eventos-tech',
      titulo: 'Participações de eventos de Tech',
      descricao: 'Congressos, meetups e conferências',
      icon: IoSchool,
      cor: 'from-blue-500/20 to-blue-600/20'
    },
    {
      id: 'parcerias',
      titulo: 'Parcerias com consultorias de tecnologia',
      descricao: 'Consultoria especializada em inovação',
      icon: IoBusinessOutline,
      cor: 'from-purple-500/20 to-purple-600/20'
    },
    {
      id: 'equipe-pd',
      titulo: 'Equipe interna de P&D',
      descricao: 'Time dedicado a pesquisa e desenvolvimento',
      icon: IoPeople,
      cor: 'from-green-500/20 to-green-600/20'
    },
    {
      id: 'preciso-ajuda',
      titulo: 'Preciso de ajuda com isso',
      descricao: 'Gostaria de orientação sobre como me manter atualizado',
      icon: IoHelpCircle,
      cor: 'from-orange-500/20 to-orange-600/20'
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
          Como sua empresa se mantém atualizada?
        </h2>
        <p className="text-gray-400">
          Selecione as formas que utiliza para acompanhar inovações tecnológicas
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-headerButton font-semibold">
            {formasAtualizacao.length} forma{formasAtualizacao.length !== 1 ? 's' : ''} selecionada{formasAtualizacao.length !== 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4">
        {opcoes.map((opcao, index) => {
          const isSelected = formasAtualizacao.includes(opcao.id);

          return (
            <motion.div
              key={opcao.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative cursor-pointer transition-all duration-300"
              onClick={() => toggleForma(opcao.id)}
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

      {formasAtualizacao.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
        >
          <IoAdd className="text-gray-400 text-4xl mx-auto mb-3" />
          <p className="text-gray-400">
            Selecione pelo menos uma forma de se manter atualizado
          </p>
        </motion.div>
      )}
    </div>
  );
} 