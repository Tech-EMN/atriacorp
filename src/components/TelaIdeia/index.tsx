import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Textarea } from "@heroui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GradientText } from "@/components/ui/GradientText";
import { AudioRecorder } from "@/components/ui/AudioRecorder";
import { IoSparkles, IoArrowBack, IoPerson, IoBusiness, IoMail, IoCall, IoBulb, IoSend, IoClose } from "react-icons/io5";

interface TelaIdeiaProps {
  onVoltar?: () => void;
}

export function TelaIdeia({ onVoltar }: TelaIdeiaProps = {}) {
  const [ideia, setIdeia] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactData, setContactData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTranscription = (transcription: string) => {
    const novoTexto = ideia ? `${ideia} ${transcription}` : transcription;
    setIdeia(novoTexto);
  };

  const handleEnviarIdeia = () => {
    if (!ideia.trim()) {
      alert('Por favor, descreva sua ideia antes de enviar.');
      return;
    }
    setShowContactModal(true);
  };

  const sendDataToN8N = async (data: any) => {
    try {
      const response = await fetch('https://n8n.servidoremn.site/webhook/51db370d-5b50-42bb-9ef4-8f9a232459c5ideia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async () => {
    if (!contactData.nome || !contactData.email) {
      alert('Por favor, preencha ao menos seu nome e email.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Payload preparado para API externa
      const payload = {
        tipo: 'ideia',
        timestamp: new Date().toISOString(),
        dados: {
          contato: {
            nome: contactData.nome,
            empresa: contactData.empresa,
            email: contactData.email,
            telefone: contactData.telefone
          },
          conteudo: {
            ideia: ideia,
            caracteresTotal: ideia.length
          }
        },
        metadata: {
          origem: 'website_atria',
          versao: '1.0',
          userAgent: navigator.userAgent
        }
      };

      console.log('Payload da Ideia para API:', JSON.stringify(payload, null, 2));

      await sendDataToN8N(payload);

      // Track Contact Conversion (using "Contato" snippet)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17727916408/2_BBCPWI-8YbEPiSqoVC'
        });
      }
      
      // Aqui será feita a chamada para a API externa quando estiver pronta
      // const response = await fetch('/api/ideias', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });

      // Simulação de sucesso
      setSubmitted(true);
      setShowContactModal(false);
      
    } catch (error) {
      console.error('Erro ao enviar ideia:', error);
      alert('Erro ao enviar sua ideia. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full min-h-screen bg-[#030A0D] py-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-headerButton/10 via-transparent to-transparent blur-3xl" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <GlassCard className="p-8 text-center" hover={false}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-headerButton/20 to-green-500/20 rounded-full flex items-center justify-center">
                <IoSparkles className="text-headerButton text-4xl" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ideia Recebida com Sucesso!
                </h2>
                <p className="text-gray-400 text-lg">
                  Obrigado por compartilhar sua ideia conosco. Nossa equipe irá analisá-la e entrar em contato em breve.
                </p>
              </div>

              <MagneticButton
                onClick={onVoltar}
                className="flex items-center gap-2"
              >
                <IoArrowBack />
                Voltar ao Site
              </MagneticButton>
            </motion.div>
          </GlassCard>
        </div>
      </div>
    );
  }

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
            <IoBulb className="text-headerButton text-4xl" />
            <GradientText className="text-4xl md:text-5xl font-bold">
              Tenho uma Ideia
            </GradientText>
            <IoBulb className="text-headerButton text-4xl" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Grave ou digite sua ideia inovadora. Nossa equipe está pronta para transformar conceitos em realidade.
          </p>
        </motion.div>

        {/* Botão do Microfone - Grande e Centralizado */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center">
            <div className="scale-[2.5] transform">
              <AudioRecorder 
                onTranscription={handleTranscription}
                isRecording={isRecording}
                onRecordingChange={setIsRecording}
              />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-8">
            {isRecording ? 'Gravando... fale sua ideia' : 'Clique no microfone para gravar sua ideia'}
          </p>
        </motion.div>

        {/* Caixa de Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard className="p-6" hover={false}>
            <Textarea
              placeholder="Sua ideia será transcrita aqui automaticamente ou você pode digitar diretamente..."
              value={ideia}
              onChange={(e) => setIdeia(e.target.value)}
              minRows={8}
              classNames={{
                base: "max-w-full",
                input: [
                  "bg-transparent",
                  "text-white",
                  "placeholder:text-gray-400",
                  "text-base",
                  "resize-none"
                ],
                inputWrapper: [
                  "bg-white/5",
                  "backdrop-blur-sm",
                  "border",
                  "border-white/20",
                  "hover:border-headerButton/50",
                  "focus-within:border-headerButton",
                  "rounded-xl",
                  "min-h-[200px]"
                ]
              }}
            />
            <div className="text-right mt-3">
              <span className={`text-sm ${ideia.length > 0 ? 'text-headerButton' : 'text-gray-500'}`}>
                {ideia.length} caracteres
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Botão Enviar */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MagneticButton
            onClick={handleEnviarIdeia}
            disabled={!ideia.trim()}
            className={`text-lg px-8 py-4 flex items-center gap-3 ${
              !ideia.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <IoSend size={20} />
            Enviar Ideia
          </MagneticButton>

          {!ideia.trim() && (
            <p className="text-gray-400 text-sm mt-3">
              Descreva sua ideia para continuar
            </p>
          )}
        </motion.div>

        {/* Dicas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-start gap-3">
              <IoBulb className="text-headerButton text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Dicas para uma boa descrição:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Qual problema sua ideia resolve?</li>
                  <li>• Quem seria beneficiado por ela?</li>
                  <li>• Como você imagina que funcionaria?</li>
                  <li>• Que tecnologias poderiam ser envolvidas?</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Modal para Coleta de Dados */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#030A0D] border border-white/20 rounded-xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <IoClose size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Quase lá!
              </h3>
              <p className="text-gray-400">
                Para enviar sua ideia, precisamos de algumas informações suas
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IoPerson className="text-headerButton text-xl" />
                  <label className="text-white font-medium">Nome *</label>
                </div>
                <Input
                  placeholder="Seu nome completo"
                  value={contactData.nome}
                  onChange={(e) => setContactData(prev => ({ ...prev, nome: e.target.value }))}
                  classNames={{
                    base: "max-w-full",
                    input: [
                      "bg-transparent",
                      "text-white",
                      "placeholder:text-gray-400"
                    ],
                    inputWrapper: [
                      "bg-white/5",
                      "backdrop-blur-sm",
                      "border",
                      "border-white/20",
                      "hover:border-headerButton/50",
                      "focus-within:border-headerButton",
                      "rounded-xl",
                      "h-12"
                    ]
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IoBusiness className="text-headerButton text-xl" />
                  <label className="text-white font-medium">Empresa</label>
                </div>
                <Input
                  placeholder="Nome da sua empresa"
                  value={contactData.empresa}
                  onChange={(e) => setContactData(prev => ({ ...prev, empresa: e.target.value }))}
                  classNames={{
                    base: "max-w-full",
                    input: [
                      "bg-transparent",
                      "text-white",
                      "placeholder:text-gray-400"
                    ],
                    inputWrapper: [
                      "bg-white/5",
                      "backdrop-blur-sm",
                      "border",
                      "border-white/20",
                      "hover:border-headerButton/50",
                      "focus-within:border-headerButton",
                      "rounded-xl",
                      "h-12"
                    ]
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IoMail className="text-headerButton text-xl" />
                  <label className="text-white font-medium">E-mail *</label>
                </div>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={contactData.email}
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  classNames={{
                    base: "max-w-full",
                    input: [
                      "bg-transparent",
                      "text-white",
                      "placeholder:text-gray-400"
                    ],
                    inputWrapper: [
                      "bg-white/5",
                      "backdrop-blur-sm",
                      "border",
                      "border-white/20",
                      "hover:border-headerButton/50",
                      "focus-within:border-headerButton",
                      "rounded-xl",
                      "h-12"
                    ]
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IoCall className="text-headerButton text-xl" />
                  <label className="text-white font-medium">Telefone</label>
                </div>
                <Input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={contactData.telefone}
                  onChange={(e) => setContactData(prev => ({ ...prev, telefone: e.target.value }))}
                  classNames={{
                    base: "max-w-full",
                    input: [
                      "bg-transparent",
                      "text-white",
                      "placeholder:text-gray-400"
                    ],
                    inputWrapper: [
                      "bg-white/5",
                      "backdrop-blur-sm",
                      "border",
                      "border-white/20",
                      "hover:border-headerButton/50",
                      "focus-within:border-headerButton",
                      "rounded-xl",
                      "h-12"
                    ]
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <MagneticButton
                variant="secondary"
                onClick={() => setShowContactModal(false)}
                className="flex-1"
              >
                Cancelar
              </MagneticButton>
              <MagneticButton
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 