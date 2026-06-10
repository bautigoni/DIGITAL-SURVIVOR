import type { ChoiceOutcomeQuality } from '../domain/index.js';

export interface StreakState {
  current: number;
  best: number;
  lastQuality: ChoiceOutcomeQuality | null;
}

export const initialStreak = (): StreakState => ({
  current: 0,
  best: 0,
  lastQuality: null,
});

/**
 * Una racha se considera "buena" cuando la decisión es safe o educational.
 * Cualquier otra calidad resetea la racha.
 */
export const updateStreak = (
  state: StreakState,
  quality: ChoiceOutcomeQuality,
): StreakState => {
  const isGood = quality === 'safe' || quality === 'educational';
  const current = isGood ? state.current + 1 : 0;
  return {
    current,
    best: Math.max(state.best, current),
    lastQuality: quality,
  };
};
