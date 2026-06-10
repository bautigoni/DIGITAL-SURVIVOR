import { motion } from 'framer-motion';
import { ShieldCheck, AlertOctagon, AlertTriangle, GraduationCap } from 'lucide-react';
import type { Choice, ChoiceOutcomeQuality } from '@ds/shared';
import { cn } from '@/lib/cn';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onSelect: () => void;
  disabled?: boolean;
  highlight?: ChoiceOutcomeQuality | null;
}

const variants: Record<
  ChoiceOutcomeQuality,
  { label: string; className: string; icon: React.ReactNode }
> = {
  safe: {
    label: 'Seguro',
    className: 'border-emerald-400/40 hover:border-emerald-300/80',
    icon: <ShieldCheck size={18} className="text-emerald-300" />,
  },
  educational: {
    label: 'Aprendizaje',
    className: 'border-cyan-400/40 hover:border-cyan-300/80',
    icon: <GraduationCap size={18} className="text-cyan-300" />,
  },
  risky: {
    label: 'Arriesgado',
    className: 'border-amber-400/40 hover:border-amber-300/80',
    icon: <AlertTriangle size={18} className="text-amber-300" />,
  },
  dangerous: {
    label: 'Peligroso',
    className: 'border-rose-500/40 hover:border-rose-300/80',
    icon: <AlertOctagon size={18} className="text-rose-300" />,
  },
};

export const ChoiceCard = ({ choice, index, onSelect, disabled, highlight }: ChoiceCardProps) => {
  const v = variants[choice.outcomeQuality];
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.08 }}
      whileHover={!disabled ? { x: 4 } : undefined}
      className={cn(
        'group flex w-full items-center gap-3 rounded-2xl border-2 bg-white/[0.03] p-4 text-left',
        'transition-all duration-200 hover:bg-white/[0.07] disabled:opacity-50',
        v.className,
        highlight === choice.outcomeQuality && 'ring-2 ring-white/30',
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/30">
        {v.icon}
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-widest text-white/40">{v.label}</div>
        <div className="text-base font-medium text-white">{choice.label}</div>
      </div>
      <div className="text-xs text-white/30 group-hover:text-white/60">→</div>
    </motion.button>
  );
};
