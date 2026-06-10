/**
 * Estadísticas centrales del jugador.
 * Cada una es un entero en [0, 100]. Toda decisión modifica este snapshot.
 */
export type StatKey =
  | 'security'
  | 'reputation'
  | 'money'
  | 'knowledge'
  | 'trust'
  | 'time'
  | 'stress';

export const STAT_KEYS: readonly StatKey[] = [
  'security',
  'reputation',
  'money',
  'knowledge',
  'trust',
  'time',
  'stress',
] as const;

export const STAT_LABELS: Record<StatKey, string> = {
  security: 'Seguridad',
  reputation: 'Reputación',
  money: 'Dinero',
  knowledge: 'Conocimiento',
  trust: 'Confianza',
  time: 'Tiempo',
  stress: 'Estrés Digital',
};

export const STAT_COLORS: Record<StatKey, string> = {
  security: '#22d3ee',
  reputation: '#f472b6',
  money: '#facc15',
  knowledge: '#a78bfa',
  trust: '#34d399',
  time: '#60a5fa',
  stress: '#f87171',
};

export type Stats = Record<StatKey, number>;

export const DEFAULT_STATS: Stats = {
  security: 60,
  reputation: 50,
  money: 50,
  knowledge: 30,
  trust: 50,
  time: 80,
  stress: 20,
};

export const clampStat = (value: number): number => Math.max(0, Math.min(100, Math.round(value)));

/**
 * Aplica un delta por stat respetando los límites [0,100].
 * Devuelve un nuevo objeto (inmutabilidad).
 */
export const applyStatDeltas = (stats: Stats, deltas: Partial<Stats>): Stats => {
  const next: Stats = { ...stats };
  for (const key of STAT_KEYS) {
    const delta = deltas[key];
    if (typeof delta === 'number' && Number.isFinite(delta)) {
      next[key] = clampStat(stats[key] + delta);
    }
  }
  return next;
};
