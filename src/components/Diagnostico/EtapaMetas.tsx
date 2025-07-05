import { motion } from "framer-motion";
import { Textarea } from "@heroui/input";
import { useState, useEffect } from "react";
import { IoFlag, IoTrendingUp, IoCalendar, IoInfinite } from "react-icons/io5";
import { AudioRecorder } from "@/components/ui/AudioRecorder";

interface EtapaMetasProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaMetas({ dados, atualizarDados }: EtapaMetasProps) {
  const [metas, setMetas] = useState(dados.metas || '');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    atualizarDados({ metas });
  }, [metas]);

  const exemplos = {
    curto: ["Automatizar atendimento", "Reduzir custos em 20%", "Implementar CRM"],
    medio: ["Dobrar base de clientes", "Expandir para novas cidades", "Melhorar NPS"],
    longo: ["Ser líder no mercado", "Expandir internacionalmente", "IPO da empresa"]
  };

  const handleTranscription = (transcription: string) => {
    const novoTexto = metas ? `${metas} ${transcription}` : transcription;
    setMetas(novoTexto);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <IoFlag className="text-headerButton text-3xl" />
          <h2 className="text-2xl font-bold text-white">
            Quais são as metas da sua empresa?
          </h2>
        </div>
        <p className="text-gray-400">
          Descreva os objetivos a curto, médio e longo prazo (separe em tópicos)
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
          placeholder="Liste as metas da sua empresa separadas por tópicos:

Curto prazo (até 1 ano):
- Automatizar processo de vendas
- Reduzir custos operacionais em 15%

Médio prazo (1-3 anos):
- Dobrar a base de clientes
- Expandir para 3 novas cidades

Longo prazo (3+ anos):
- Ser referência no mercado
- Expandir nacionalmente"
          value={metas}
          onChange={(e) => setMetas(e.target.value)}
          minRows={10}
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
              "min-h-[250px]"
            ],
            helperWrapper: "text-gray-300",
            errorMessage: "text-red-400"
          }}
        />
      </motion.div>

      {/* Exemplos por prazo */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-500/10 to-green-600/5 p-4 rounded-xl border border-green-500/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <IoTrendingUp className="text-green-500 text-xl" />
            <h4 className="text-white font-semibold">Curto Prazo</h4>
          </div>
          {exemplos.curto.map((meta, index) => (
            <motion.div
              key={meta}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 text-gray-300 text-sm mb-1"
            >
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {meta}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4 rounded-xl border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <IoCalendar className="text-blue-500 text-xl" />
            <h4 className="text-white font-semibold">Médio Prazo</h4>
          </div>
          {exemplos.medio.map((meta, index) => (
            <motion.div
              key={meta}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2 text-gray-300 text-sm mb-1"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              {meta}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-xl border border-purple-500/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <IoInfinite className="text-purple-500 text-xl" />
            <h4 className="text-white font-semibold">Longo Prazo</h4>
          </div>
          {exemplos.longo.map((meta, index) => (
            <motion.div
              key={meta}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-2 text-gray-300 text-sm mb-1"
            >
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              {meta}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Character counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-right"
      >
        <span className={`text-sm ${metas.length > 0 ? 'text-headerButton' : 'text-gray-500'}`}>
          {metas.length} caracteres
        </span>
      </motion.div>
    </div>
  );
} 