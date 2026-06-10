import { useEffect, useState } from 'react';
import { useRunSession } from '@/features/game/hooks/useRunSession';
import { EventCard } from '@/features/game/components/EventCard';
import { StatsHud } from '@/features/rpg/components/StatsHud';
import { usePlayerStore } from '@/features/rpg/store/playerStore';
import { useGameStore } from '@/features/game/store/gameStore';
import { sound } from '@/lib/sound';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';
import type { ZoneId } from '@ds/shared';

const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const r = (s % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
};

export const SurvivalPage = () => {
  const { currentZone } = usePlayerStore();
  const { eventQuery, resolveDecision } = useRunSession(currentZone as ZoneId);
  const current = useGameStore((s) => s.currentEvent);
  const isResolving = useGameStore((s) => s.isResolving);
  const { level, stats, xp } = usePlayerStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    sound.init();
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const onChoose = (choiceId: string) => {
    if (!current) return;
    const choice = current.choices.find((c) => c.id === choiceId);
    if (choice) resolveDecision(choice);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 font-display text-3xl font-bold">
              <Swords className="text-rose-400" /> Modo Supervivencia
            </h1>
            <p className="text-sm text-white/60">
              Eventos infinitos generados por IA. Mantené tus 7 stats saludables.
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-center"
          >
            <div className="text-[10px] uppercase tracking-widest text-rose-200">Tiempo</div>
            <div className="font-mono text-2xl text-rose-100">{formatTime(seconds)}</div>
          </motion.div>
        </header>
        {eventQuery.isLoading || !current ? (
          <div className="panel-strong animate-pulse p-10 text-center text-white/60">
            Generando evento…
          </div>
        ) : (
          <EventCard event={current} onChoose={onChoose} disabled={isResolving} />
        )}
        <div className="mt-4 flex gap-2">
          <Button variant="ghost" onClick={() => location.reload()}>
            Reiniciar run
          </Button>
        </div>
      </div>
      <aside>
        <StatsHud stats={stats} level={level} xp={xp} />
      </aside>
    </div>
  );
};
