/**
 * RNG seedable basado en mulberry32.
 * Determinístico y rápido. Útil para que el mismo seed genere siempre
 * el mismo "día" en modo supervivencia (fair play + replayable).
 */
export type Rng = {
  next(): number;
  int(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
  weighted<T>(items: readonly { item: T; weight: number }[]): T;
  shuffle<T>(items: readonly T[]): T[];
};

export const createRng = (seed: number): Rng => {
  let state = seed >>> 0;
  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number): number => {
    const lo = Math.ceil(min);
    const hi = Math.floor(max);
    return Math.floor(next() * (hi - lo + 1)) + lo;
  };

  const pick = <T>(items: readonly T[]): T => {
    if (items.length === 0) throw new Error('Cannot pick from empty array');
    return items[int(0, items.length - 1)] as T;
  };

  const weighted = <T>(items: readonly { item: T; weight: number }[]): T => {
    if (items.length === 0) throw new Error('Cannot pick from empty weighted array');
    const total = items.reduce((s, i) => s + Math.max(0, i.weight), 0);
    let r = next() * total;
    for (const { item, weight } of items) {
      r -= Math.max(0, weight);
      if (r <= 0) return item;
    }
    return items[items.length - 1]!.item;
  };

  const shuffle = <T>(items: readonly T[]): T[] => {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = int(0, i);
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  };

  return { next, int, pick, weighted, shuffle };
};
