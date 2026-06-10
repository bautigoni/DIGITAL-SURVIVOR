import { create } from 'zustand';
import type { GameEvent, Choice, ChoiceOutcomeQuality } from '@ds/shared';

export interface ToastMessage {
  id: string;
  type: 'success' | 'danger' | 'info' | 'achievement';
  title: string;
  description?: string;
  icon?: string;
}

interface GameStore {
  currentEvent: GameEvent | null;
  lastChoice: Choice | null;
  lastFeedback: string | null;
  toasts: ToastMessage[];
  isResolving: boolean;
  showHud: boolean;
  setEvent: (e: GameEvent | null) => void;
  setResolving: (v: boolean) => void;
  setLastChoice: (c: Choice | null) => void;
  setLastFeedback: (f: string | null) => void;
  pushToast: (t: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
  toggleHud: () => void;
}

const newId = () => Math.random().toString(36).slice(2);

export const useGameStore = create<GameStore>((set) => ({
  currentEvent: null,
  lastChoice: null,
  lastFeedback: null,
  toasts: [],
  isResolving: false,
  showHud: true,
  setEvent: (e) => set({ currentEvent: e, lastChoice: null, lastFeedback: null }),
  setResolving: (v) => set({ isResolving: v }),
  setLastChoice: (c) => set({ lastChoice: c }),
  setLastFeedback: (f) => set({ lastFeedback: f }),
  pushToast: (t) => set((s) => ({ toasts: [...s.toasts, { ...t, id: newId() }].slice(-4) })),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  toggleHud: () => set((s) => ({ showHud: !s.showHud })),
}));

export const qualityToToastType = (q: ChoiceOutcomeQuality): ToastMessage['type'] => {
  if (q === 'safe' || q === 'educational') return 'success';
  if (q === 'risky') return 'info';
  return 'danger';
};
