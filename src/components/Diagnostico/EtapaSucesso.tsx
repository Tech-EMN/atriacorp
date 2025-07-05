import { motion } from "framer-motion";
import { Textarea } from "@heroui/input";
import { useState, useEffect } from "react";
import { IoTrophy, IoBulb } from "react-icons/io5";
import { AudioRecorder } from "@/components/ui/AudioRecorder";

interface EtapaSucessoProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaSucesso({ dados, atualizarDados }: EtapaSucessoProps) {
  const [definicaoSucesso, setDefinicaoSucesso] = useState(dados.definicaoSucesso || '');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    atualizarDados({ definicaoSucesso });
  }, [definicaoSucesso]);

  const exemplos = [
    "Redução de 30% no tempo de atendimento",
    "Aumento de 50% na conversão de vendas",
    "Automação de 80% dos processos manuais",
    "ROI positivo em 12 meses",
    "Melhoria de 40% na satisfação do cliente",
    "Redução de 25% nos custos operacionais"
  ];

  const handleTranscription = (transcription: string) => {
    const novoTexto = definicaoSucesso ? `${definicaoSucesso} ${transcription}` : transcription;
    setDefinicaoSucesso(novoTexto);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <IoTrophy className="text-yellow-500 text-3xl" />
          <h2 className="text-2xl font-bold text-white">
            Como você definiria o sucesso?
          </h2>
        </div>
        <p className="text-gray-400">
          Descreva como você medirá o sucesso da implementação tecnológica
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
          placeholder="Descreva como você definiria uma implementação tecnológica bem-sucedida (ex: redução de custos, aumento da eficiência, melhoria na satisfação do cliente...)"
          value={definicaoSucesso}
          onChange={(e) => setDefinicaoSucesso(e.target.value)}
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
        className="bg-gradient-to-r from-yellow-500/10 to-transparent p-6 rounded-xl border-l-4 border-yellow-500"
      >
        <div className="flex items-start gap-3">
          <IoBulb className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-3">Métricas de sucesso comuns:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exemplos.map((exemplo, index) => (
                <motion.div
                  key={exemplo}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-300 text-sm"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  {exemplo}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Completion indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-headerButton/20 to-purple-500/20 p-6 rounded-xl border border-headerButton/30 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <IoTrophy className="text-headerButton text-2xl" />
          <h4 className="text-white font-semibold text-lg">Quase lá!</h4>
        </div>
        <p className="text-gray-300">
          Esta é a última etapa do diagnóstico. Após finalizar, você receberá um relatório personalizado com recomendações específicas para sua empresa.
        </p>
      </motion.div>

      {/* Character counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-right"
      >
        <span className={`text-sm ${definicaoSucesso.length > 0 ? 'text-headerButton' : 'text-gray-500'}`}>
          {definicaoSucesso.length} caracteres
        </span>
      </motion.div>
    </div>
  );
} 