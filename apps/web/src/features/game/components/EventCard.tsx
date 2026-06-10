import { motion } from 'framer-motion';
import { THREAT_LABELS, type GameEvent, ZONES } from '@ds/shared';
import { ChoiceCard } from './ChoiceCard';
import { Sparkles } from 'lucide-react';

interface EventCardProps {
  event: GameEvent;
  onChoose: (choiceId: string) => void;
  disabled?: boolean;
  highlight?: 'safe' | 'educational' | 'risky' | 'dangerous' | null;
}

export const EventCard = ({ event, onChoose, disabled, highlight }: EventCardProps) => {
  const zone = ZONES[event.zoneId];
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="panel-strong relative overflow-hidden p-6"
      style={{ boxShadow: `0 0 40px ${zone.palette.primary}40` }}
    >
      <div
        className="absolute inset-x-0 -top-10 h-40 opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${zone.palette.primary}, transparent 70%)` }}
      />

      <div className="relative">
        <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: zone.palette.primary, boxShadow: `0 0 8px ${zone.palette.primary}` }}
          />
          <span>{zone.name}</span>
          <span className="opacity-40">•</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest">
            {THREAT_LABELS[event.category]}
          </span>
        </div>

        <h2 className="text-2xl font-bold leading-tight text-white">{event.title}</h2>

        {event.speaker && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
            <span className="text-lg">{event.speaker.avatar}</span>
            <span className="font-medium text-white">{event.speaker.name}</span>
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-base italic text-white/90">&ldquo;{event.prompt}&rdquo;</p>
          {event.context && <p className="mt-2 text-sm text-white/60">{event.context}</p>}
        </div>

        <div className="mt-5 grid gap-3">
          {event.choices.map((c, i) => (
            <ChoiceCard
              key={c.id}
              choice={c}
              index={i}
              onSelect={() => onChoose(c.id)}
              disabled={disabled}
              highlight={highlight}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-white/40">
          <Sparkles size={12} /> Cada decisión modifica tus estadísticas.
        </div>
      </div>
    </motion.div>
  );
};
