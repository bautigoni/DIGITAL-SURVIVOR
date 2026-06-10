export const initialStreak = () => ({
    current: 0,
    best: 0,
    lastQuality: null,
});
/**
 * Una racha se considera "buena" cuando la decisión es safe o educational.
 * Cualquier otra calidad resetea la racha.
 */
export const updateStreak = (state, quality) => {
    const isGood = quality === 'safe' || quality === 'educational';
    const current = isGood ? state.current + 1 : 0;
    return {
        current,
        best: Math.max(state.best, current),
        lastQuality: quality,
    };
};
