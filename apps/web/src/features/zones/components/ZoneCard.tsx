import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { ZONES, type ZoneId } from '@ds/shared';
import { cn } from '@/lib/cn';

interface ZoneCardProps {
  zoneId: ZoneId;
  unlocked: boolean;
  onSelect: (id: ZoneId) => void;
  index?: number;
}

export const ZoneCard = ({ zoneId, unlocked, onSelect, index = 0 }: ZoneCardProps) => {
  const zone = ZONES[zoneId];
  return (
    <motion.button
      type="button"
      disabled={!unlocked}
      onClick={() => unlocked && onSelect(zoneId)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 120 }}
      whileHover={unlocked ? { y: -6, scale: 1.02 } : undefined}
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-2 p-5 text-left',
        'transition-all duration-300',
        unlocked
          ? 'border-white/15 bg-white/[0.04] hover:border-white/40'
          : 'cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50',
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 20% 0%, ${zone.palette.primary}30, transparent 60%)`,
      }}
    >
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: zone.palette.primary, opacity: 0.18 }}
      />
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: zone.palette.primary,
              boxShadow: `0 0 12px ${zone.palette.primary}`,
            }}
          />
          <span className="text-[10px] uppercase tracking-widest text-white/50">
            Zona {index + 1}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight" style={{ color: zone.palette.primary }}>
          {zone.name}
        </h3>
        <p className="mt-1 text-sm italic text-white/60">{zone.tagline}</p>
        <p className="mt-3 text-sm text-white/70">{zone.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {zone.threats.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        {unlocked ? (
          <span className="font-semibold text-emerald-400">Disponible</span>
        ) : (
          <span className="flex items-center gap-1 text-white/50">
            <Lock size={12} /> Nv. {zone.unlockLevel}
          </span>
        )}
        <span className="text-white/40">→ Entrar</span>
      </div>
    </motion.button>
  );
};
