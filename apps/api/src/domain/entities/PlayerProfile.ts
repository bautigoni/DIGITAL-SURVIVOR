import type { Stats, TalentId } from '@ds/shared';

/**
 * Snapshot de un jugador dentro de una partida.
 * Es la entidad que el dominio de aplicación manipula.
 */
export interface PlayerProfile {
  id: string;
  userId: string;
  mode: 'STORY' | 'SURVIVAL' | 'SCHOOL' | 'MULTIPLAYER';
  zoneId: string;
  level: number;
  xp: number;
  stats: Stats;
  classId: TalentId;
  unlockedTalents: TalentId[];
  startedAt: Date;
  endedAt: Date | null;
  outcome: 'VICTORY' | 'DEFEAT' | 'ABANDONED' | null;
  score: number;
}
