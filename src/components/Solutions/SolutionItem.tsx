import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

interface SolutionItemProps {
  icon: ReactNode;
  intro: string;
  title: string;
  description: string;
  delay?: number;
  index: number;
}

export function SolutionItem({ icon, intro, title, description, delay = 0, index }: SolutionItemProps) {
  return (
    <GlassCard
      className="group p-6 md:p-8 h-full"
      delay={delay}
    >
      <div className="flex flex-col h-full space-y-4">
        {/* Header com azul da empresa */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-headerButton/20 via-[#0B1F28]/10 to-headerButton/10 flex items-center justify-center border border-headerButton/20 group-hover:scale-105 transition-transform duration-200">
            {icon}
          </div>

          {/* Number indicator com azul */}
          <span className="text-[#0B1F28]/80 text-sm font-mono bg-[#0B1F28]/5 px-2 py-1 rounded-md">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-headerButton bg-gradient-to-r from-headerButton/10 to-[#0B1F28]/10 rounded-full border border-headerButton/20">
            {intro}
          </span>

          <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
            {title}
          </h3>

          <p className="text-white/70 leading-relaxed text-sm">
            {description}
          </p>
        </div>

        {/* Hover indicator com azul */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2">
          <div className="h-px flex-1 bg-gradient-to-r from-headerButton/50 via-[#0B1F28]/30 to-transparent" />
          <span className="text-headerButton text-xs">Ver mais</span>
          <svg className="w-3 h-3 text-headerButton" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </GlassCard>
  );
} 