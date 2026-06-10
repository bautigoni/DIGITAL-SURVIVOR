import type { GameEvent, TalentId } from '@ds/shared';

const BASE = '/api';

const getToken = (): string | null => {
  try {
    return localStorage.getItem('ds_token');
  } catch {
    return null;
  }
};

const authHeaders = (): Record<string, string> => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const res = await fetch(BASE + path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
};

export interface StartRunResponse {
  id: string;
  zoneId: string;
  level: number;
  stats: Record<string, number>;
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  startRun: (payload: { mode: 'STORY' | 'SURVIVAL' | 'SCHOOL' | 'MULTIPLAYER'; zoneId: string; classId?: TalentId }) =>
    request<StartRunResponse>('/game/runs', { method: 'POST', body: JSON.stringify(payload) }),
  nextEvent: (runId: string) =>
    request<{ event: GameEvent; profile: StartRunResponse }>(`/game/runs/${runId}/event`),
  resolveDecision: (
    runId: string,
    payload: { eventId: string; choiceId: string; event: GameEvent; choice: GameEvent['choices'][number] },
  ) =>
    request<{
      profile: StartRunResponse;
      feedback: string;
      leveledUp: boolean;
      isPerfect: boolean;
      xpGained: number;
    }>(`/game/runs/${runId}/decision`, { method: 'POST', body: JSON.stringify(payload) }),
  generateAIEvent: (payload: { zone: string; level: number; recentIds?: string[]; seed?: number }) =>
    request<GameEvent>('/ai/event', { method: 'POST', body: JSON.stringify(payload) }),
};
