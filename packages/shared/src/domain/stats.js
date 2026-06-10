export const STAT_KEYS = [
    'security',
    'reputation',
    'money',
    'knowledge',
    'trust',
    'time',
    'stress',
];
export const STAT_LABELS = {
    security: 'Seguridad',
    reputation: 'Reputación',
    money: 'Dinero',
    knowledge: 'Conocimiento',
    trust: 'Confianza',
    time: 'Tiempo',
    stress: 'Estrés Digital',
};
export const STAT_COLORS = {
    security: '#22d3ee',
    reputation: '#f472b6',
    money: '#facc15',
    knowledge: '#a78bfa',
    trust: '#34d399',
    time: '#60a5fa',
    stress: '#f87171',
};
export const DEFAULT_STATS = {
    security: 60,
    reputation: 50,
    money: 50,
    knowledge: 30,
    trust: 50,
    time: 80,
    stress: 20,
};
export const clampStat = (value) => Math.max(0, Math.min(100, Math.round(value)));
/**
 * Aplica un delta por stat respetando los límites [0,100].
 * Devuelve un nuevo objeto (inmutabilidad).
 */
export const applyStatDeltas = (stats, deltas) => {
    const next = { ...stats };
    for (const key of STAT_KEYS) {
        const delta = deltas[key];
        if (typeof delta === 'number' && Number.isFinite(delta)) {
            next[key] = clampStat(stats[key] + delta);
        }
    }
    return next;
};
