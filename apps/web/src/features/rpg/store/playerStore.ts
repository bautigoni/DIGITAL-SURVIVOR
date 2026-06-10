import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DEFAULT_STATS,
  type Stats,
  type TalentId,
} from '@ds/shared';

export type RunMode = 'STORY' | 'SURVIVAL' | 'SCHOOL' | 'MULTIPLAYER';

export interface PlayerState {
  id: string;
  username: string;
  level: number;
  xp: number;
  classId: TalentId;
  unlockedTalents: TalentId[];
  stats: Stats;
  currentZone: string;
  recentDecisions: string[];
  streak: { current: number; best: number };
  achievements: string[];
}

interface PlayerStore extends PlayerState {
  setPlayer: (p: Partial<PlayerState>) => void;
  setStats: (s: Stats) => void;
  setZone: (zone: string) => void;
  pushDecision: (eventId: string) => void;
  setClass: (talent: TalentId) => void;
  unlockTalent: (talent: TalentId) => void;
  addXp: (xp: number) => { leveledUp: boolean; newLevel: number };
  incrementStreak: () => void;
  resetStreak: () => void;
  addAchievement: (id: string) => void;
  reset: () => void;
}

const initial: PlayerState = {
  id: 'guest',
  username: 'Sobreviviente',
  level: 1,
  xp: 0,
  classId: 'digital_detective',
  unlockedTalents: [],
  stats: { ...DEFAULT_STATS },
  currentZone: 'social_media',
  recentDecisions: [],
  streak: { current: 0, best: 0 },
  achievements: [],
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      ...initial,
      setPlayer: (p) => set((s) => ({ ...s, ...p })),
      setStats: (s) => set({ stats: s }),
      setZone: (zone) => set({ currentZone: zone }),
      pushDecision: (eventId) =>
        set((s) => ({ recentDecisions: [...s.recentDecisions.slice(-20), eventId] })),
      setClass: (talent) => set({ classId: talent }),
      unlockTalent: (talent) =>
        set((s) =>
          s.unlockedTalents.includes(talent)
            ? s
            : { unlockedTalents: [...s.unlockedTalents, talent] },
        ),
      addXp: (xp) => {
        const state = get();
        let total = state.xp + xp;
        let level = state.level;
        let leveledUp = false;
        const xpFor = (lvl: number) => 100 + (lvl - 1) * 50;
        while (total >= xpFor(level)) {
          total -= xpFor(level);
          level += 1;
          leveledUp = true;
        }
        set({ xp: total, level });
        return { leveledUp, newLevel: level };
      },
      incrementStreak: () =>
        set((s) => ({
          streak: { current: s.streak.current + 1, best: Math.max(s.streak.best, s.streak.current + 1) },
        })),
      resetStreak: () => set((s) => ({ streak: { ...s.streak, current: 0 } })),
      addAchievement: (id) =>
        set((s) => (s.achievements.includes(id) ? s : { achievements: [...s.achievements, id] })),
      reset: () => set({ ...initial }),
    }),
    { name: 'ds-player' },
  ),
);
