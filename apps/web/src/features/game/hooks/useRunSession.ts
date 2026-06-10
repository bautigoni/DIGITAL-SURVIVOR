import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  applyDecision as applyDecisionCore,
  pickEvent,
  createRng,
  type GameEvent,
  type Choice,
  type Stats,
  type ZoneId,
} from '@ds/shared';
import { api } from '@/lib/api';
import { useGameStore, qualityToToastType } from '@/features/game/store/gameStore';
import { usePlayerStore } from '@/features/rpg/store/playerStore';
import { checkSurvival } from '@ds/shared';
import { sound } from '@/lib/sound';

/**
 * Hook de sesión de juego.
 * Funciona sin backend con DB: usa `/api/ai/event` (auth opcional) para
 * generar eventos y aplica el motor de decisiones en el cliente.
 * Si el backend no está disponible, cae a generación 100% local con
 * la IA procedural de @ds/shared.
 */
export const useRunSession = (zone: ZoneId = 'social_media') => {
  const setEvent = useGameStore((s) => s.setEvent);
  const setLastFeedback = useGameStore((s) => s.setLastFeedback);
  const setLastChoice = useGameStore((s) => s.setLastChoice);
  const pushToast = useGameStore((s) => s.pushToast);
  const setResolving = useGameStore((s) => s.setResolving);
  const setStats = usePlayerStore((s) => s.setStats);
  const addXp = usePlayerStore((s) => s.addXp);
  const incrementStreak = usePlayerStore((s) => s.incrementStreak);
  const resetStreak = usePlayerStore((s) => s.resetStreak);
  const pushDecision = usePlayerStore((s) => s.pushDecision);
  const addAchievement = usePlayerStore((s) => s.addAchievement);
  const player = usePlayerStore();
  const [isDead, setIsDead] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const generateLocal = useCallback((): GameEvent => {
    const seed = (player.level + 1) * 7919 + Date.now();
    const rng = createRng(seed);
    return pickEvent({
      rng,
      zone,
      playerLevel: player.level,
      recentIds,
      proceduralChance: 0.4,
    });
  }, [player.level, recentIds, zone]);

  const eventQuery = useQuery({
    queryKey: ['event', zone, player.level, recentIds.length],
    queryFn: async (): Promise<GameEvent> => {
      try {
        const ev = await api.generateAIEvent({
          zone,
          level: player.level,
          recentIds,
          seed: (player.level + 1) * 7919 + recentIds.length,
        });
        return ev;
      } catch {
        // Fallback 100% local si el backend no responde.
        return generateLocal();
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (eventQuery.data) setEvent(eventQuery.data);
  }, [eventQuery.data, setEvent]);

  const resolveDecision = useCallback(
    (choice: Choice) => {
      const current = useGameStore.getState().currentEvent;
      if (!current) return;
      setLastChoice(choice);
      setResolving(true);

      const result = applyDecisionCore({
        player: {
          id: player.id,
          username: player.username,
          level: player.level,
          xp: player.xp,
          classId: player.classId,
          unlockedTalents: player.unlockedTalents,
          stats: player.stats as Stats,
          currentZone: player.currentZone,
          recentDecisions: player.recentDecisions,
        },
        choice,
        pickNextEvent: () => null,
      });

      setStats(result.newStats as Stats);
      setLastFeedback(result.feedback);
      const { leveledUp, newLevel } = addXp(result.xpGained);

      pushToast({
        type: qualityToToastType(choice.outcomeQuality),
        title:
          choice.outcomeQuality === 'safe' || choice.outcomeQuality === 'educational'
            ? '¡Buena decisión!'
            : choice.outcomeQuality === 'risky'
              ? 'Decisión riesgosa'
              : 'Cuidado',
        description: result.feedback,
      });

      if (result.isPerfect) {
        incrementStreak();
        if (player.achievements.length === 0) {
          addAchievement('first_perfect');
          pushToast({ type: 'achievement', title: 'Logro: Ojo clínico', icon: '🎯' });
        }
      } else {
        resetStreak();
      }

      if (leveledUp) {
        sound.levelUp();
        pushToast({ type: 'achievement', title: `¡Nivel ${newLevel}!`, icon: '🆙' });
      } else if (result.isPerfect) {
        sound.reward();
      } else {
        sound.danger();
      }

      const surv = checkSurvival(result.newStats as Stats);
      if (!surv.alive) {
        setIsDead(true);
        pushToast({ type: 'danger', title: 'Game Over', description: 'Tus stats colapsaron.' });
      }

      pushDecision(current.id);
      setRecentIds((prev) => [...prev.slice(-20), current.id]);
      setResolving(false);

      // siguiente evento
      eventQuery.refetch();
    },
    [
      player,
      setLastChoice,
      setResolving,
      setStats,
      setLastFeedback,
      addXp,
      pushToast,
      incrementStreak,
      resetStreak,
      addAchievement,
      pushDecision,
      eventQuery,
    ],
  );

  return {
    eventQuery,
    resolveDecision,
    isDead,
    setIsDead,
  };
};
