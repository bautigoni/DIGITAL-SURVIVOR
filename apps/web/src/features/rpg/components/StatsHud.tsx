import { STAT_KEYS, STAT_LABELS, STAT_COLORS, type Stats, type StatKey } from '@ds/shared';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { motion } from 'framer-motion';
import { Heart, Wallet, Brain, Shield, Clock, Flame, Users, type LucideIcon } from 'lucide-react';

const icons: Record<StatKey, LucideIcon> = {
  security: Shield,
  reputation: Users,
  money: Wallet,
  knowledge: Brain,
  trust: Heart,
  time: Clock,
  stress: Flame,
};

interface StatsHudProps {
  stats: Stats;
  level: number;
  xp: number;
  xpForLevel?: number;
  className?: string;
}

const xpFor = (lvl: number) => 100 + (lvl - 1) * 50;

export const StatsHud = ({ stats, level, xp, className }: StatsHudProps) => {
  return (
    <div className={`panel p-4 ${className ?? ''}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-neon-purple/20 px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-neon-purple">
            Nv. {level}
          </div>
          <div className="text-xs text-white/60">XP</div>
        </div>
        <div className="flex-1 px-3">
          <ProgressBar value={xp} max={xpFor(level)} color="#a855f7" showValue={false} />
          <div className="mt-1 text-right text-[10px] text-white/50">
            {xp} / {xpFor(level)} XP
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {STAT_KEYS.map((key, i) => {
          const Icon = icons[key];
          const isLow = stats[key] <= 15;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-white/80">
                  <Icon size={12} className="text-white/60" /> {STAT_LABELS[key]}
                </span>
                <span className={`font-mono ${isLow ? 'text-rose-400' : 'text-white/70'}`}>
                  {stats[key]}
                </span>
              </div>
              <ProgressBar
                value={stats[key]}
                color={STAT_COLORS[key]}
                showValue={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
