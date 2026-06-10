import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type StartRunResponse } from '@/lib/api';
import { useGameStore, qualityToToastType } from '@/features/game/store/gameStore';
import { usePlayerStore } from '@/features/rpg/store/playerStore';
import { checkSurvival, type Stats } from '@ds/shared';
import { sound } from '@/lib/sound';
import { useEffect, useState } from 'react';

export const useRunSession = () => {
  const setEvent = useGameStore((s) => s.setEvent);
  const setResolving = useGameStore((s) => s.setResolving);
  const pushToast = useGameStore((s) => s.pushToast);
  const setLastFeedback = useGameStore((s) => s.setLastFeedback);
  const setLastChoice = useGameStore((s) => s.setLastChoice);
  const setStats = usePlayerStore((s) => s.setStats);
  const addXp = usePlayerStore((s) => s.addXp);
  const incrementStreak = usePlayerStore((s) => s.incrementStreak);
  const resetStreak = usePlayerStore((s) => s.resetStreak);
  const pushDecision = usePlayerStore((s) => s.pushDecision);
  const addAchievement = usePlayerStore((s) => s.addAchievement);
  const qc = useQueryClient();
  const [runId, setRunId] = useState<string | null>(null);
  const [isDead, setIsDead] = useState(false);

  const start = useMutation({
    mutationFn: (payload: Parameters<typeof api.startRun>[0]) => api.startRun(payload),
    onSuccess: (data: StartRunResponse) => {
      setRunId(data.id);
      setStats(data.stats as Stats);
      qc.invalidateQueries({ queryKey: ['run', data.id] });
    },
  });

  const eventQuery = useQuery({
    queryKey: ['run', runId, 'event'],
    queryFn: () => api.nextEvent(runId!),
    enabled: !!runId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (eventQuery.data) setEvent(eventQuery.data.event);
  }, [eventQuery.data, setEvent]);

  const decide = useMutation({
    mutationFn: (choiceId: string) => {
      const event = useGameStore.getState().currentEvent;
      if (!event || !runId) throw new Error('No hay evento activo');
      const choice = event.choices.find((c) => c.id === choiceId);
      if (!choice) throw new Error('Opción inválida');
      setLastChoice(choice);
      return api.resolveDecision(runId, { eventId: event.id, choiceId, event, choice });
    },
    onMutate: () => setResolving(true),
    onSuccess: (res) => {
      setStats(res.profile.stats as Stats);
      setLastFeedback(res.feedback);
      const { leveledUp, newLevel } = addXp(res.xpGained);
      const choice = useGameStore.getState().lastChoice!;
      pushToast({
        type: qualityToToastType(choice.outcomeQuality),
        title: choice.outcomeQuality === 'safe' || choice.outcomeQuality === 'educational'
          ? '¡Buena decisión!'
          : choice.outcomeQuality === 'risky' ? 'Decisión riesgosa' : 'Cuidado',
        description: res.feedback,
      });
      if (res.isPerfect) incrementStreak();
      else resetStreak();
      if (res.isPerfect && usePlayerStore.getState().achievements.length === 0) {
        addAchievement('first_perfect');
        pushToast({ type: 'achievement', title: 'Logro: Ojo clínico', icon: '🎯' });
      }
      if (leveledUp) {
        sound.levelUp();
        pushToast({ type: 'achievement', title: `¡Nivel ${newLevel}!`, icon: '🆙' });
      } else if (res.isPerfect) {
        sound.reward();
      } else {
        sound.danger();
      }
      const check = checkSurvival(res.profile.stats as Stats);
      if (!check.alive) {
        setIsDead(true);
        pushToast({ type: 'danger', title: 'Game Over', description: 'Tus stats colapsaron.' });
      }
      pushDecision(useGameStore.getState().currentEvent?.id ?? '');
      qc.invalidateQueries({ queryKey: ['run', runId, 'event'] });
    },
    onSettled: () => setResolving(false),
  });

  return { start, eventQuery, decide, runId, isDead, setRunId, setIsDead };
};
