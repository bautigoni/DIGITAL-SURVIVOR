import type { PrismaClient } from '@prisma/client';
import type { IPlayerRepository } from '../../domain/repositories/IPlayerRepository.js';
import type { PlayerProfile } from '../../domain/entities/PlayerProfile.js';
import type { TalentId, Stats } from '@ds/shared';

export class PrismaPlayerRepository implements IPlayerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    input: Omit<PlayerProfile, 'id' | 'startedAt' | 'endedAt' | 'outcome' | 'score'>,
  ): Promise<PlayerProfile> {
    const created = await this.prisma.gameRun.create({
      data: {
        userId: input.userId,
        mode: input.mode,
        zoneId: input.zoneId,
        level: input.level,
        xp: input.xp,
        stats: input.stats as unknown as object,
        classId: input.classId,
        unlockedTalents: input.unlockedTalents as string[],
      },
    });
    return this.map(created);
  }

  async findById(id: string): Promise<PlayerProfile | null> {
    const found = await this.prisma.gameRun.findUnique({ where: { id } });
    return found ? this.map(found) : null;
  }

  async listByUser(userId: string): Promise<PlayerProfile[]> {
    const rows = await this.prisma.gameRun.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
    });
    return rows.map((r) => this.map(r));
  }

  async update(id: string, patch: Partial<PlayerProfile>): Promise<PlayerProfile> {
    const updated = await this.prisma.gameRun.update({
      where: { id },
      data: {
        level: patch.level,
        xp: patch.xp,
        stats: patch.stats as unknown as object | undefined,
        endedAt: patch.endedAt ?? undefined,
        outcome: patch.outcome ?? undefined,
        score: patch.score,
        unlockedTalents: patch.unlockedTalents as string[] | undefined,
        zoneId: patch.zoneId,
        mode: patch.mode,
      },
    });
    return this.map(updated);
  }

  private map(row: {
    id: string;
    userId: string;
    mode: 'STORY' | 'SURVIVAL' | 'SCHOOL' | 'MULTIPLAYER';
    zoneId: string;
    level: number;
    xp: number;
    stats: unknown;
    classId: string;
    unlockedTalents: string[];
    startedAt: Date;
    endedAt: Date | null;
    outcome: 'VICTORY' | 'DEFEAT' | 'ABANDONED' | null;
    score: number;
  }): PlayerProfile {
    return {
      id: row.id,
      userId: row.userId,
      mode: row.mode,
      zoneId: row.zoneId,
      level: row.level,
      xp: row.xp,
      stats: row.stats as Stats,
      classId: row.classId as TalentId,
      unlockedTalents: row.unlockedTalents as TalentId[],
      startedAt: row.startedAt,
      endedAt: row.endedAt,
      outcome: row.outcome,
      score: row.score,
    };
  }
}
