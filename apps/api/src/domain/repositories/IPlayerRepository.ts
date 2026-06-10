import type { PlayerProfile } from '../entities/PlayerProfile.js';

export interface IPlayerRepository {
  create(profile: Omit<PlayerProfile, 'id' | 'startedAt' | 'endedAt' | 'outcome' | 'score'>): Promise<PlayerProfile>;
  findById(id: string): Promise<PlayerProfile | null>;
  listByUser(userId: string): Promise<PlayerProfile[]>;
  update(id: string, patch: Partial<PlayerProfile>): Promise<PlayerProfile>;
}
