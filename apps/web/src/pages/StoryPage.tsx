import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRunSession } from '@/features/game/hooks/useRunSession';
import { EventCard } from '@/features/game/components/EventCard';
import { StatsHud } from '@/features/rpg/components/StatsHud';
import { Confetti } from '@/components/ui/Confetti';
import { useGameStore } from '@/features/game/store/gameStore';
import { usePlayerStore } from '@/features/rpg/store/playerStore';
import { sound } from '@/lib/sound';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export const StoryPage = () => {
  const nav = useNavigate();
  const { eventQuery, resolveDecision, isDead, setIsDead } = useRunSession('social_media');
  const current = useGameStore((s) => s.currentEvent);
  const lastFeedback = useGameStore((s) => s.lastFeedback);
  const lastChoice = useGameStore((s) => s.lastChoice);
  const isResolving = useGameStore((s) => s.isResolving);
  const { level, stats, xp, setZone } = usePlayerStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [prevLevel, setPrevLevel] = useState(level);

  useEffect(() => {
    sound.init();
    sound.startMusic();
    setZone('social_media');
    return () => sound.stopMusic();
  }, [setZone]);

  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2500);
      setPrevLevel(level);
    }
  }, [level, prevLevel]);

  const onChoose = (choiceId: string) => {
    if (!current) return;
    const choice = current.choices.find((c) => c.id === choiceId);
    if (choice) resolveDecision(choice);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-3xl font-bold">Modo Historia</h1>
          <p className="text-sm text-white/60">
            Una campaña narrativa con NPCs recurrentes, misiones y un arco que escala en dificultad.
          </p>
        </header>
        {eventQuery.isLoading || !current ? (
          <div className="panel-strong animate-pulse p-10 text-center text-white/60">
            Cargando universo…
          </div>
        ) : (
          <EventCard
            event={current}
            onChoose={onChoose}
            disabled={isResolving}
            highlight={lastChoice?.outcomeQuality ?? null}
          />
        )}
        {lastFeedback && (
          <div className="panel p-4 text-sm text-white/80">
            <span className="text-white/50">Consecuencia: </span>
            {lastFeedback}
          </div>
        )}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => nav('/play')}>
            ← Volver al mapa
          </Button>
          <Button variant="ghost" onClick={() => nav('/achievements')}>
            Ver logros
          </Button>
        </div>
      </div>
      <aside>
        <StatsHud stats={stats} level={level} xp={xp} />
      </aside>
      <Confetti show={celebrate} />
      <Modal open={showLevelUp} onClose={() => setShowLevelUp(false)} title="¡Subiste de nivel!">
        <p className="text-white/80">Elegí un talento para desbloquear.</p>
        <div className="mt-4 grid gap-2">
          {[
            { id: 'digital_detective', name: 'Detective Digital', desc: '+15% Seguridad' },
            { id: 'fake_news_hunter', name: 'Cazador de Fake News', desc: '+15% Conocimiento' },
            { id: 'ai_analyst', name: 'Analista de IA', desc: '+20% Conocimiento' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                usePlayerStore.getState().unlockTalent(t.id as never);
                setShowLevelUp(false);
              }}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:border-white/30"
            >
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-white/60">{t.desc}</div>
            </button>
          ))}
        </div>
      </Modal>
      <Modal
        open={isDead}
        onClose={() => {
          setIsDead(false);
          nav('/play');
        }}
        title="Fin de la partida"
      >
        <p className="text-white/80">
          Una de tus estadísticas colapsó. Volvé al mapa y replantá tu estrategia.
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => {
              setIsDead(false);
              nav('/play');
            }}
          >
            Volver
          </Button>
        </div>
      </Modal>
    </div>
  );
};
