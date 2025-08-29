import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
  <motion.div
    className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col overflow-hidden"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
  >
    {/* Cabeçalho */}
    <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-gray-200/60 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-xl"
      >
        ✕
      </button>
    </div>
    {/* Conteúdo com scroll */}
    <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
      {children /* seu markdown grande aqui */}
    </div>
  </motion.div>
</div>

  );
}
