import { describe, it, expect } from 'vitest';
import { applyStatDeltas, clampStat, DEFAULT_STATS } from '../domain/stats.js';

describe('Stats', () => {
  it('clamp keeps value in [0, 100]', () => {
    expect(clampStat(-5)).toBe(0);
    expect(clampStat(150)).toBe(100);
    expect(clampStat(42)).toBe(42);
  });

  it('applyStatDeltas returns a new object (immutable)', () => {
    const before = { ...DEFAULT_STATS };
    const after = applyStatDeltas(before, { security: 10 });
    expect(before.security).toBe(60);
    expect(after.security).toBe(70);
  });

  it('applyStatDeltas clamps to max', () => {
    const after = applyStatDeltas(DEFAULT_STATS, { security: 1000 });
    expect(after.security).toBe(100);
  });

  it('applyStatDeltas clamps to min', () => {
    const after = applyStatDeltas(DEFAULT_STATS, { security: -1000 });
    expect(after.security).toBe(0);
  });

  it('ignores non-finite deltas', () => {
    const after = applyStatDeltas(DEFAULT_STATS, { security: NaN });
    expect(after.security).toBe(DEFAULT_STATS.security);
  });
});
