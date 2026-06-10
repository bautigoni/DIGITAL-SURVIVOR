export interface DecisionLog {
  runId: string;
  eventId: string;
  choiceId: string;
  quality: string;
  statDeltas: Record<string, number>;
  xpGained: number;
}

export interface IDecisionRepository {
  log(input: DecisionLog): Promise<void>;
  listByRun(runId: string): Promise<DecisionLog[]>;
  /** Métricas agregadas para el panel docente. */
  aggregateByUser(userId: string): Promise<DecisionAggregate>;
}

export interface DecisionAggregate {
  total: number;
  byQuality: Record<string, number>;
  byCategory: Record<string, number>;
  commonMistakes: Array<{ eventId: string; choiceId: string; count: number }>;
}
