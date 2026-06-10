import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  className?: string;
  showValue?: boolean;
}

export const ProgressBar = ({
  value,
  max = 100,
  color = '#ff2e88',
  label,
  className,
  showValue = true,
}: ProgressBarProps) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-white/70">
          <span>{label}</span>
          {showValue && <span className="font-mono">{Math.round(value)}/{max}</span>}
        </div>
      )}
      <div className="stat-bar">
        <motion.div
          className="stat-fill"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        />
      </div>
    </div>
  );
};
