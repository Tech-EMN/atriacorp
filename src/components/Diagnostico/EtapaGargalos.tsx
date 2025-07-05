import { motion } from "framer-motion";
import { Textarea } from "@heroui/input";
import { useState, useEffect } from "react";
import { IoHourglass, IoBulb } from "react-icons/io5";
import { AudioRecorder } from "@/components/ui/AudioRecorder";

interface EtapaGargalosProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaGargalos({ dados, atualizarDados }: EtapaGargalosProps) {
  const [gargalos, setGargalos] = useState(dados.gargalos || '');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    atualizarDados({ gargalos });
  }, [gargalos]);

  const exemplos = [
    "Aprovação manual de orçamentos",
    "Processo de onboarding de clientes",
    "Geração de relatórios mensais",
    "Controle de estoque",
    "Agendamento de reuniões",
    "Processamento de pedidos"
  ];

  const handleTranscription = (transcription: string) => {
    const novoTexto = gargalos ? `${gargalos} ${transcription}` : transcription;
    setGargalos(novoTexto);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <IoHourglass className="text-orange-500 text-3xl" />
          <h2 className="text-2xl font-bold text-white">
            Quais processos apresentam gargalos?
          </h2>
        </div>
        <p className="text-gray-400">
          Identifique os processos que estão lentos ou travando o fluxo de trabalho
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            Digite ou grave sua resposta:
          </span>
          <AudioRecorder 
            onTranscription={handleTranscription}
            isRecording={isRecording}
            onRecordingChange={setIsRecording}
          />
        </div>
        
        <Textarea
          placeholder="Descreva os processos que estão causando lentidão ou problemas no seu negócio (ex: aprovações manuais, geração de relatórios, controle de estoque...)"
          value={gargalos}
          onChange={(e) => setGargalos(e.target.value)}
          minRows={6}
          classNames={{
            base: "max-w-full",
            input: [
              "bg-transparent",
              "text-white",
              "placeholder:text-gray-400",
              "text-base",
              "resize-none",
              "autofill:bg-white/10",
              "autofill:text-white"
            ],
            inputWrapper: [
              "bg-white/5",
              "backdrop-blur-sm",
              "border",
              "border-white/20",
              "hover:border-headerButton/50",
              "focus-within:border-headerButton",
              "rounded-xl",
              "transition-all",
              "duration-300",
              "min-h-[150px]"
            ],
            helperWrapper: "text-gray-300",
            errorMessage: "text-red-400"
          }}
        />
      </motion.div>

      {/* Exemplos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-orange-500/10 to-transparent p-6 rounded-xl border-l-4 border-orange-500"
      >
        <div className="flex items-start gap-3">
          <IoBulb className="text-orange-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-3">Gargalos comuns:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exemplos.map((exemplo, index) => (
                <motion.div
                  key={exemplo}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-300 text-sm"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  {exemplo}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Character counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-right"
      >
        <span className={`text-sm ${gargalos.length > 0 ? 'text-headerButton' : 'text-gray-500'}`}>
          {gargalos.length} caracteres
        </span>
      </motion.div>
    </div>
  );
} 