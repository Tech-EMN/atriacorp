import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoMic, IoStop, IoSend } from "react-icons/io5";

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
  isRecording?: boolean;
  onRecordingChange?: (isRecording: boolean) => void;
}

export function AudioRecorder({ onTranscription, isRecording = false, onRecordingChange }: AudioRecorderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      onRecordingChange?.(true);
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
      alert('Erro ao acessar o microfone. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      onRecordingChange?.(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'gpt-4o-mini-transcribe');
      formData.append('response_format', 'text');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro na transcrição');
      }

      const transcription = await response.text();
      onTranscription(transcription);
    } catch (error) {
      console.error('Erro na transcrição:', error);
      alert('Erro ao transcrever o áudio. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isRecording && !isProcessing && (
        <motion.button
          type="button"
          onClick={startRecording}
          className="p-2 bg-headerButton/20 text-headerButton rounded-full border border-headerButton/30 hover:bg-headerButton/30 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Gravar áudio"
        >
          <IoMic size={16} />
        </motion.button>
      )}

      {isRecording && (
        <motion.button
          type="button"
          onClick={stopRecording}
          className="p-2 bg-red-500/20 text-red-500 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          title="Parar gravação"
        >
          <IoStop size={16} />
        </motion.button>
      )}

      {isProcessing && (
        <div className="p-2 bg-blue-500/20 text-blue-500 rounded-full border border-blue-500/30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <IoSend size={16} />
          </motion.div>
        </div>
      )}

      {isRecording && (
        <span className="text-red-500 text-sm animate-pulse">
          Gravando...
        </span>
      )}

      {isProcessing && (
        <span className="text-blue-500 text-sm">
          Transcrevendo...
        </span>
      )}
    </div>
  );
} 