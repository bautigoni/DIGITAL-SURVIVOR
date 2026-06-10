import { ACHIEVEMENTS, } from '../domain/index.js';
export const findAchievement = (id) => ACHIEVEMENTS.find((a) => a.id === id);
export const achievementsFromStreak = (streak) => {
    const ids = [];
    if (streak.current >= 5)
        ids.push('streak_5');
    if (streak.current >= 10)
        ids.push('streak_10');
    return ids;
};
