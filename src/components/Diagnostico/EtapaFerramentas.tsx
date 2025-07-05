import { motion } from "framer-motion";
import { Textarea } from "@heroui/input";
import { useState, useEffect } from "react";
import { IoConstruct, IoBulb } from "react-icons/io5";

interface EtapaFerramentasProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaFerramentas({ dados, atualizarDados }: EtapaFerramentasProps) {
  const [ferramentas, setFerramentas] = useState(dados.ferramentas || '');

  useEffect(() => {
    atualizarDados({ ferramentas });
  }, [ferramentas]);

  const exemplos = [
    "Microsoft Office 365", "Google Workspace", "Slack", "Trello", "Asana",
    "Salesforce", "HubSpot", "WhatsApp Business", "Zoom", "Teams"
  ];

  const adicionarFerramenta = (ferramenta: string) => {
    const ferramentasAtuais = ferramentas.split(',').map((f: string) => f.trim()).filter((f: string) => f);
    if (!ferramentasAtuais.includes(ferramenta)) {
      const novaLista = [...ferramentasAtuais, ferramenta].join(', ');
      setFerramentas(novaLista);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <IoConstruct className="text-headerButton text-3xl" />
          <h2 className="text-2xl font-bold text-white">
            Quais ferramentas estão sendo utilizadas?
          </h2>
        </div>
        <p className="text-gray-400">
          Liste as principais ferramentas e softwares que sua empresa usa atualmente
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Textarea
          placeholder="Liste as ferramentas que sua empresa utiliza (ex: WhatsApp Business, Excel, Trello, Google Drive...)"
          value={ferramentas}
          onChange={(e) => setFerramentas(e.target.value)}
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
        className="bg-gradient-to-r from-headerButton/10 to-transparent p-6 rounded-xl border-l-4 border-headerButton"
      >
        <div className="flex items-start gap-3">
          <IoBulb className="text-headerButton text-xl flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-3">Exemplos de ferramentas:</h4>
            <div className="flex flex-wrap gap-2">
              {exemplos.map((exemplo, index) => (
                <motion.button
                  key={exemplo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  onClick={() => adicionarFerramenta(exemplo)}
                  className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20 hover:bg-headerButton/20 hover:border-headerButton/50 hover:text-white transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {exemplo}
                </motion.button>
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
        <span className={`text-sm ${ferramentas.length > 0 ? 'text-headerButton' : 'text-gray-500'}`}>
          {ferramentas.length} caracteres
        </span>
      </motion.div>
    </div>
  );
} 