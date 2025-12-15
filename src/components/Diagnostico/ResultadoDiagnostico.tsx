import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GradientText } from "@/components/ui/GradientText";
import { IoTrophy, IoSparkles, IoRocket, IoCheckmarkCircle, IoMail, IoDownload, IoArrowBack, IoClose, IoCall } from "react-icons/io5";
import { Input } from "@heroui/input";
import { useState } from "react";

interface ResultadoDiagnosticoProps {
  dados: any;
  onVoltar?: () => void;
}

export function ResultadoDiagnostico({ dados, onVoltar }: ResultadoDiagnosticoProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [actionType, setActionType] = useState<'email' | 'download'>('email');
  const [contactData, setContactData] = useState({
    email: '',
    telefone: ''
  });

  // Preparar payload completo do diagnóstico para API externa
  const prepararPayloadDiagnostico = () => {
    const payload = {
      tipo: 'diagnostico',
      timestamp: new Date().toISOString(),
      dados: {
        informacoesPessoais: {
          nome: dados.nome || '',
          empresa: dados.empresa || '',
          areaAtuacao: dados.areaAtuacao || '',
          email: dados.email || '',
          telefone: dados.telefone || '',
          website: dados.website || ''
        },
        respostas: {
          objetivos: dados.objetivos || [],
          investimentos: dados.investimentos || {},
          ferramentas: dados.ferramentas || '',
          desafios: dados.desafios || '',
          gargalos: dados.gargalos || '',
          metas: dados.metas || '',
          formasAtualizacao: dados.formasAtualizacao || [],
          definicaoSucesso: dados.definicaoSucesso || ''
        },
        analise: {
          pontuacaoMaturidade: pontuacao,
          areasAvaliadas: Object.keys(dados.investimentos || {}).length,
          objetivosDefinidos: (dados.objetivos || []).length,
          potencialIA: 'Alto',
          statusCompleto: true
        }
      },
      metadata: {
        origem: 'website_atria',
        versao: '1.0',
        userAgent: navigator.userAgent,
        tempoPreenchimento: 'calculado_dinamicamente',
        etapasCompletadas: 9
      }
    };

    return payload;
  };

  const handleEnviarEmail = () => {
    setActionType('email');
    setShowContactModal(true);
  };

  const handleBaixarPDF = () => {
    setActionType('download');
    setShowContactModal(true);
  };

  // Google Ads conversion tracking helper
  const trackConversion = (conversionId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': conversionId
      });
    }
  };

  const sendDataToN8N = async (data: any) => {
    try {
      const response = await fetch('https://n8n.servidoremn.site/webhook/51db370d-5b50-42bb-9ef4-8f9a232459c5diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleConfirmarAcao = async () => {
    if (!contactData.email || !contactData.telefone) {
      alert('Por favor, preencha seu email e telefone para prosseguir.');
      return;
    }

    const payload = prepararPayloadDiagnostico();
    // Adicionar os dados de contato ao payload
    payload.dados.informacoesPessoais.email = contactData.email;
    payload.dados.informacoesPessoais.telefone = contactData.telefone;

    if (actionType === 'email') {
      console.log('Payload do Diagnóstico para API:', JSON.stringify(payload, null, 2));
      
      try {
        await sendDataToN8N(payload);
        
        // Track Lead Conversion
        trackConversion('AW-17727916408/m6PHCOmI-8YbEPiSqoVC');

        console.log("Enviando relatório por email para:", contactData.email);
        alert("Relatório enviado com sucesso para seu email!");
      } catch (error) {
        console.error('Erro ao enviar diagnóstico:', error);
        alert("Erro ao enviar relatório. Tente novamente.");
      }
    } else {
      console.log('Payload do Diagnóstico para geração de PDF:', JSON.stringify(payload, null, 2));
      
      try{
        await sendDataToN8N(payload);
      }catch(error){
        console.error('Erro ao enviar diagnóstico:', error);
      }
      // Aqui você implementaria a geração e download do PDF
      console.log("Gerando PDF do diagnóstico...");
      alert("Função de download em desenvolvimento!");
    }

    setShowContactModal(false);
    setContactData({ email: '', telefone: '' });
  };

  const pontuacao = Math.floor(Math.random() * 30) + 70; // Pontuação fictícia entre 70-100

  return (
    <div className="w-full min-h-screen bg-[#030A0D] py-20 px-6 relative overflow-hidden">
      {/* Background Effects - mais intensos para celebração */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-headerButton/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-yellow-500/15 via-transparent to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-headerButton/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

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

        {/* Header de Celebração */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <IoTrophy className="text-yellow-500 text-6xl mx-auto" />
          </motion.div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoSparkles className="text-headerButton text-3xl" />
            <GradientText className="text-4xl md:text-5xl font-bold">
              Diagnóstico Concluído!
            </GradientText>
            <IoSparkles className="text-headerButton text-3xl" />
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Parabéns, {dados.nome?.split(' ')[0] || 'participante'}! Seu diagnóstico foi processado com sucesso.
          </p>
        </motion.div>

        {/* Card Principal com Resultado */}
        <GlassCard className="p-8 mb-8" hover={false}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative inline-block mb-4"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-headerButton to-headerButton/60 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-bold text-white z-10">
                  {pontuacao}%
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              Nível de Maturidade Tecnológica
            </h3>
            <p className="text-gray-400">
              Sua empresa tem um bom potencial para implementação de I.A.
            </p>
          </div>

          {/* Métricas rápidas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center p-4 bg-white/5 rounded-xl"
            >
              <IoCheckmarkCircle className="text-green-500 text-3xl mx-auto mb-2" />
              <h4 className="text-white font-semibold">Áreas Avaliadas</h4>
              <p className="text-headerButton text-2xl font-bold">{Object.keys(dados.investimentos || {}).length}/6</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center p-4 bg-white/5 rounded-xl"
            >
              <IoRocket className="text-blue-500 text-3xl mx-auto mb-2" />
              <h4 className="text-white font-semibold">Objetivos Definidos</h4>
              <p className="text-headerButton text-2xl font-bold">{(dados.objetivos || []).length}/2</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center p-4 bg-white/5 rounded-xl"
            >
              <IoSparkles className="text-purple-500 text-3xl mx-auto mb-2" />
              <h4 className="text-white font-semibold">Potencial I.A.</h4>
              <p className="text-headerButton text-2xl font-bold">Alto</p>
            </motion.div>
          </div>

          {/* Próximos passos */}
          <div className="bg-gradient-to-r from-headerButton/10 to-purple-500/10 p-6 rounded-xl border border-headerButton/20 mb-8">
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <IoRocket className="text-headerButton" />
              Próximos Passos Recomendados
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-headerButton rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Agendar reunião estratégica para definir prioridades de implementação
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-headerButton rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Desenvolver roadmap tecnológico personalizado para sua empresa
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-headerButton rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Começar implementação gradual das soluções de I.A. mais impactantes
                </p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              onClick={handleEnviarEmail}
              className="flex items-center gap-2"
            >
              <IoMail />
              Enviar por Email
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={handleBaixarPDF}
              className="flex items-center gap-2"
            >
              <IoDownload />
              Baixar Relatório
            </MagneticButton>
          </div>
        </GlassCard>

        {/* Call to Action Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Quer discutir os resultados e próximos passos?
          </p>
          <div className="relative inline-block">
            {/* Efeito de brilho animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-headerButton via-white to-headerButton rounded-full blur-sm opacity-75"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Brilho pulsante */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-headerButton/50 via-white/50 to-headerButton/50 rounded-full blur-md"
              animate={{
                scale: [0.95, 1.1, 0.95],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            <MagneticButton 
              size="lg" 
              className="relative text-lg px-8 py-4 bg-gradient-to-r from-headerButton to-headerButton/80 shadow-2xl shadow-headerButton/30"
            >
              Agendar Consultoria Gratuita
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Modal para Informações de Contato */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#030A0D] border border-white/20 rounded-xl p-6 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <IoClose size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {actionType === 'email' ? 'Enviar por Email' : 'Baixar Relatório'}
              </h3>
              <p className="text-gray-400">
                Para prosseguir, precisamos de suas informações de contato
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <IoMail className="text-headerButton text-xl" />
                  <label className="text-white font-medium">E-mail</label>
                </div>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={contactData.email}
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  classNames={{
                    base: "max-w-full",
                    mainWrapper: "h-full",
                    input: [
                      "bg-transparent",
                      "text-white",
                      "placeholder:text-gray-400",
                      "text-base"
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
                    mainWrapper: "h-full",
                    input: [
                      "bg-transparent",
                      "text-white",
                      "placeholder:text-gray-400",
                      "text-base"
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
                onClick={handleConfirmarAcao}
                className="flex-1"
              >
                {actionType === 'email' ? 'Enviar' : 'Baixar'}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}