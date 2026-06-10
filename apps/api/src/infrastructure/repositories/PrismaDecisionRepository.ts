import type { PrismaClient } from '@prisma/client';
import type {
  DecisionLog,
  DecisionAggregate,
  IDecisionRepository,
} from '../../domain/repositories/IDecisionRepository.js';

export class PrismaDecisionRepository implements IDecisionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async log(input: DecisionLog): Promise<void> {
    await this.prisma.decision.create({
      data: {
        runId: input.runId,
        eventId: input.eventId,
        choiceId: input.choiceId,
        quality: input.quality,
        statDeltas: input.statDeltas as object,
        xpGained: input.xpGained,
      },
    });
  }

  async listByRun(runId: string): Promise<DecisionLog[]> {
    const rows = await this.prisma.decision.findMany({ where: { runId } });
    return rows.map((r) => ({
      runId: r.runId,
      eventId: r.eventId,
      choiceId: r.choiceId,
      quality: r.quality,
      statDeltas: r.statDeltas as Record<string, number>,
      xpGained: r.xpGained,
    }));
  }

  async aggregateByUser(userId: string): Promise<DecisionAggregate> {
    const runs = await this.prisma.gameRun.findMany({
      where: { userId },
      include: { decisions: true },
    });
    const all = runs.flatMap((r) => r.decisions);
    const byQuality: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const mistakesMap = new Map<string, number>();
    for (const d of all) {
      byQuality[d.quality] = (byQuality[d.quality] ?? 0) + 1;
      const key = `${d.eventId}::${d.choiceId}`;
      if (d.quality === 'dangerous' || d.quality === 'risky') {
        mistakesMap.set(key, (mistakesMap.get(key) ?? 0) + 1);
      }
    }
    const commonMistakes = [...mistakesMap.entries()]
      .map(([key, count]) => {
        const [eventId, choiceId] = key.split('::');
        return { eventId: eventId!, choiceId: choiceId!, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { total: all.length, byQuality, byCategory, commonMistakes };
  }
}
