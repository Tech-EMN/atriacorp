import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

interface SectorData {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  features: string[];
}

interface SectorGridProps {
  sectors: SectorData[];
}

function SectorGridItem({ sector, index }: { sector: SectorData; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <GlassCard className="h-full p-6" hover={false}>
        <motion.div className="space-y-4">
          {/* Header com azul */}
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-xl ${sector.gradient} flex items-center justify-center border border-headerButton/20`}>
              {sector.icon}
            </div>

            <motion.div
              className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-[#0B1F28]/80 text-xs font-mono bg-[#0B1F28]/5 px-2 py-1 rounded">
                {String(index + 1).padStart(2, '0')}
              </span>
              <motion.div
                animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4 text-headerButton" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white leading-tight">
              {sector.title}
            </h3>

            <p className="text-white/70 leading-relaxed text-sm">
              {sector.description}
            </p>

            {/* Expandable features */}
            <motion.div
              initial={false}
              animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-[#0B1F28]/20 space-y-2">
                <h4 className="text-xs font-semibold text-headerButton uppercase tracking-wide">
                  Recursos principais
                </h4>
                <ul className="space-y-1">
                  {sector.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-2 text-xs text-white/80"
                    >
                      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-headerButton to-[#0B1F28]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Hover indicator com azul */}
          <div className="flex items-center justify-between pt-3 border-t border-[#0B1F28]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-headerButton text-xs">
              {isExpanded ? "Clique para recolher" : "Clique para expandir"}
            </span>
            <div className="w-6 h-0.5 bg-gradient-to-r from-headerButton to-[#0B1F28] rounded-full" />
          </div>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}

export function SectorGrid({ sectors }: SectorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {sectors.map((sector, index) => (
        <SectorGridItem
          key={index}
          sector={sector}
          index={index}
        />
      ))}
    </div>
  );
} 