import { describe, it, expect } from 'vitest';
import { createRng, generateProceduralEvent, pickEvent } from '../index.js';

describe('Procedural AI', () => {
  it('generates an event with 4 distinct choices', () => {
    const rng = createRng(42);
    const e = generateProceduralEvent({ rng, zone: 'social_media', category: 'phishing', playerLevel: 1 });
    expect(e.choices.length).toBe(4);
    const ids = new Set(e.choices.map((c) => c.id));
    expect(ids.size).toBe(4);
  });

  it('pickEvent is deterministic with the same seed', () => {
    const a = pickEvent({ rng: createRng(1), zone: 'social_media', playerLevel: 5, recentIds: [] });
    const b = pickEvent({ rng: createRng(1), zone: 'social_media', playerLevel: 5, recentIds: [] });
    expect(a.id).toBe(b.id);
  });

  it('pickEvent filters by level when using seed bank', () => {
    const e = pickEvent({ rng: createRng(7), zone: 'social_media', playerLevel: 1, recentIds: [] });
    // Either procedural or low-level seed event
    expect(e.minLevel).toBeLessThanOrEqual(1);
  });

  it('avoids recent ids when possible', () => {
    const e = pickEvent({
      rng: createRng(99),
      zone: 'social_media',
      playerLevel: 5,
      recentIds: ['evt_social_iphone', 'evt_social_fakeprofile'],
      proceduralChance: 0,
    });
    expect(['evt_social_iphone', 'evt_social_fakeprofile']).not.toContain(e.id);
  });
});
