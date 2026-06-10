import { describe, it, expect } from 'vitest';
import {
  type GameEvent,
  type Choice,
  DEFAULT_STATS,
  applyDecision,
} from '../index.js';

const safeChoice: Choice = {
  id: 'safe',
  label: 'safe',
  outcomeQuality: 'safe',
  deltas: { security: 10, knowledge: 5, stress: -5 },
  feedback: 'good',
  xpReward: 30,
};

const dangerousChoice: Choice = {
  id: 'dangerous',
  label: 'dangerous',
  outcomeQuality: 'dangerous',
  deltas: { security: -25, stress: 20 },
  feedback: 'bad',
  xpReward: 5,
};

const _event: GameEvent = {
  id: 'evt',
  zoneId: 'social_media',
  category: 'phishing',
  title: 't',
  prompt: 'p',
  context: 'c',
  choices: [safeChoice, dangerousChoice],
  minLevel: 1,
  tags: [],
  modes: ['story'],
};

describe('applyDecision', () => {
  it('applies safe choice correctly', () => {
    const res = applyDecision({
      player: { id: 'p1', username: 'u', level: 1, xp: 0, classId: 'digital_detective', unlockedTalents: [], stats: { ...DEFAULT_STATS }, currentZone: 'social_media', recentDecisions: [] },
      choice: safeChoice,
      pickNextEvent: () => null,
    });
    expect(res.newStats.security).toBe(70);
    expect(res.newStats.stress).toBe(15);
    expect(res.isPerfect).toBe(true);
  });

  it('detects dangerous choice', () => {
    const res = applyDecision({
      player: { id: 'p1', username: 'u', level: 1, xp: 0, classId: 'digital_detective', unlockedTalents: [], stats: { ...DEFAULT_STATS }, currentZone: 'social_media', recentDecisions: [] },
      choice: dangerousChoice,
      pickNextEvent: () => null,
    });
    expect(res.isPerfect).toBe(false);
    expect(res.newStats.security).toBe(35);
    expect(res.newStats.stress).toBe(40);
  });

  it('levels up when xp threshold is reached', () => {
    const res = applyDecision({
      player: { id: 'p1', username: 'u', level: 1, xp: 90, classId: 'digital_detective', unlockedTalents: [], stats: { ...DEFAULT_STATS }, currentZone: 'social_media', recentDecisions: [] },
      choice: safeChoice,
      pickNextEvent: () => null,
    });
    expect(res.leveledUp).toBe(true);
    expect(res.newLevel).toBe(2);
  });
});
