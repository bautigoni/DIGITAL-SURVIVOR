import {
  applyDecision as applyDecisionCore,
  pickEvent,
  createRng,
  type GameEvent,
  type Choice,
  type Stats,
  type TalentId,
  DEFAULT_STATS,
  type Player,
} from '@ds/shared';
import type { IPlayerRepository } from '../../domain/repositories/IPlayerRepository.js';
import type { IDecisionRepository } from '../../domain/repositories/IDecisionRepository.js';
import type { PlayerProfile } from '../../domain/entities/PlayerProfile.js';

export interface StartRunInput {
  userId: string;
  mode: PlayerProfile['mode'];
  zoneId: string;
  classId?: TalentId;
  seed?: number;
}

export class GameService {
  constructor(
    private readonly players: IPlayerRepository,
    private readonly decisions: IDecisionRepository,
  ) {}

  async startRun(input: StartRunInput): Promise<PlayerProfile> {
    const profile = await this.players.create({
      userId: input.userId,
      mode: input.mode,
      zoneId: input.zoneId,
      level: 1,
      xp: 0,
      stats: { ...DEFAULT_STATS },
      classId: input.classId ?? 'digital_detective',
      unlockedTalents: [],
    });
    return profile;
  }

  async nextEvent(runId: string): Promise<{ event: GameEvent; profile: PlayerProfile } | null> {
    const profile = await this.players.findById(runId);
    if (!profile) return null;
    const seed = (profile.level + 1) * 7919 + runId.length;
    const rng = createRng(seed);
    const event = pickEvent({
      rng,
      zone: profile.zoneId as Parameters<typeof pickEvent>[0]['zone'],
      playerLevel: profile.level,
      recentIds: [],
    });
    return { event, profile };
  }

  async resolveDecision(input: {
    runId: string;
    event: GameEvent;
    choice: Choice;
  }): Promise<{
    profile: PlayerProfile;
    feedback: string;
    leveledUp: boolean;
    isPerfect: boolean;
    xpGained: number;
  }> {
    const profile = await this.players.findById(input.runId);
    if (!profile) throw new Error('Run not found');

    const playerForCore: Player = {
      id: profile.id,
      username: profile.userId,
      level: profile.level,
      xp: profile.xp,
      classId: profile.classId,
      unlockedTalents: profile.unlockedTalents,
      stats: profile.stats as Stats,
      currentZone: profile.zoneId,
      recentDecisions: [],
    };

    const result = applyDecisionCore({
      player: playerForCore,
      choice: input.choice,
      pickNextEvent: () => null,
    });

    await this.decisions.log({
      runId: profile.id,
      eventId: input.event.id,
      choiceId: input.choice.id,
      quality: result.quality,
      statDeltas: input.choice.deltas as Record<string, number>,
      xpGained: result.xpGained,
    });

    const updated = await this.players.update(profile.id, {
      stats: result.newStats as unknown as Stats,
      level: result.newLevel,
      xp: profile.xp + result.xpGained,
    });

    return {
      profile: updated,
      feedback: result.feedback,
      leveledUp: result.leveledUp,
      isPerfect: result.isPerfect,
      xpGained: result.xpGained,
    };
  }
}
