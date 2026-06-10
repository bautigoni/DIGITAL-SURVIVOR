import { describe, it, expect } from 'vitest';
import { checkSurvival, DEFAULT_STATS } from '../index.js';

describe('checkSurvival', () => {
  it('is alive by default', () => {
    const r = checkSurvival(DEFAULT_STATS);
    expect(r.alive).toBe(true);
  });

  it('dies if security collapses', () => {
    const r = checkSurvival({ ...DEFAULT_STATS, security: 0 });
    expect(r.alive).toBe(false);
    expect(r.reason).toBe('security_collapsed');
  });

  it('dies if stress overloads', () => {
    const r = checkSurvival({ ...DEFAULT_STATS, stress: 100 });
    expect(r.alive).toBe(false);
    expect(r.reason).toBe('stress_overload');
  });

  it('warns on low stat', () => {
    const r = checkSurvival({ ...DEFAULT_STATS, money: 20 });
    expect(r.alive).toBe(true);
    expect(r.warning).toBe('low');
  });

  it('warns critically when very low', () => {
    const r = checkSurvival({ ...DEFAULT_STATS, time: 10 });
    expect(r.alive).toBe(true);
    expect(r.warning).toBe('critical');
  });
});
