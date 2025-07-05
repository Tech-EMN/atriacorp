import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { useState, useEffect } from "react";
import { IoPerson, IoBusiness, IoGlobe } from "react-icons/io5";

interface EtapaBasicaProps {
  dados: any;
  atualizarDados: (dados: any) => void;
}

export function EtapaBasica({ dados, atualizarDados }: EtapaBasicaProps) {
  const [formData, setFormData] = useState({
    nome: dados.nome || '',
    empresa: dados.empresa || '',
    areaAtuacao: dados.areaAtuacao || '',
    website: dados.website || ''
  });

  useEffect(() => {
    atualizarDados(formData);
  }, [formData]);

  const handleChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Validação especial para website
    if (field === 'website' && value && !value.startsWith('http')) {
      processedValue = value.startsWith('www.') ? `https://${value}` : `https://www.${value}`;
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
  };

  const campos = [
    { key: 'nome', label: 'Nome do Responsável', icon: IoPerson, type: 'text', placeholder: 'Seu nome completo' },
    { key: 'empresa', label: 'Nome da Empresa', icon: IoBusiness, type: 'text', placeholder: 'Nome da sua empresa' },
    { key: 'areaAtuacao', label: 'Área de Atuação da Empresa', icon: IoBusiness, type: 'text', placeholder: 'Ex: Tecnologia, Saúde, Educação...' },
    { key: 'website', label: 'Website da Empresa', icon: IoGlobe, type: 'url', placeholder: 'https://suaempresa.com.br' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          Vamos nos conhecer melhor!
        </h2>
        <p className="text-gray-400">
          Preciso de algumas informações básicas para personalizar sua experiência
        </p>
      </motion.div>

      <div className="grid gap-6 md:gap-8">
        {campos.map((campo, index) => (
          <motion.div
            key={campo.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <campo.icon className="text-headerButton text-xl" />
              <label className="text-white font-medium">
                {campo.label}
              </label>
            </div>
            
            <Input
              type={campo.type}
              placeholder={campo.placeholder}
              value={formData[campo.key as keyof typeof formData]}
              onChange={(e) => handleChange(campo.key, e.target.value)}
              classNames={{
                base: "max-w-full",
                mainWrapper: "h-full",
                input: [
                  "bg-transparent",
                  "text-white",
                  "placeholder:text-gray-400",
                  "text-base",
                  "autofill:bg-white/10",
                  "autofill:text-white",
                  "autofill:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.1)]"
                ],
                inputWrapper: [
                  "bg-white/5",
                  "backdrop-blur-sm",
                  "border",
                  "border-white/20",
                  "hover:border-headerButton/50",
                  "focus-within:border-headerButton",
                  "rounded-xl",
                  "h-12",
                  "transition-all",
                  "duration-300"
                ],
                helperWrapper: "text-gray-300",
                errorMessage: "text-red-400"
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-headerButton/10 to-transparent p-4 rounded-xl border-l-4 border-headerButton"
      >
        <p className="text-sm text-gray-300">
          <span className="text-headerButton font-semibold">💡 Dica:</span> Todas as informações são seguras e utilizadas apenas para personalizar seu diagnóstico.
        </p>
      </motion.div>
    </div>
  );
} 