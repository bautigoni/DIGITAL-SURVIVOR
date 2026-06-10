import {
  ACHIEVEMENTS,
  type AchievementId,
} from '../domain/index.js';
import type { StreakState } from '../rpg/streakTracker.js';

export const findAchievement = (id: AchievementId) =>
  ACHIEVEMENTS.find((a) => a.id === id);

export const achievementsFromStreak = (
  streak: StreakState,
): AchievementId[] => {
  const ids: AchievementId[] = [];
  if (streak.current >= 5) ids.push('streak_5');
  if (streak.current >= 10) ids.push('streak_10');
  return ids;
};
