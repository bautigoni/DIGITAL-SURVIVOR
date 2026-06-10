import { applyStatDeltas, xpForNextLevel, } from '../domain/index.js';
/**
 * Caso de uso: aplicar una decisión del jugador.
 * Aplica los deltas, suma XP, evalúa level-up y selecciona el próximo evento.
 */
export const applyDecision = ({ player, choice, pickNextEvent, }) => {
    const newStats = applyStatDeltas(player.stats, choice.deltas);
    const xpGained = choice.xpReward ?? (choice.outcomeQuality === 'safe' ? 20 : 5);
    let xp = player.xp + xpGained;
    let level = player.level;
    let leveledUp = false;
    while (xp >= xpForNextLevel(level)) {
        xp -= xpForNextLevel(level);
        level += 1;
        leveledUp = true;
    }
    const isPerfect = choice.outcomeQuality === 'safe' || choice.outcomeQuality === 'educational';
    return {
        newStats,
        xpGained,
        leveledUp,
        newLevel: level,
        feedback: choice.feedback,
        quality: choice.outcomeQuality,
        nextEvent: pickNextEvent(player, choice),
        isPerfect,
    };
};
