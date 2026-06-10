import {
  type Choice,
  type GameEvent,
  type Stats,
  type Player,
  type ChoiceOutcomeQuality,
  applyStatDeltas,
  xpForNextLevel,
} from '../domain/index.js';

export interface DecisionResult {
  newStats: Stats;
  xpGained: number;
  leveledUp: boolean;
  newLevel: number;
  feedback: string;
  quality: ChoiceOutcomeQuality;
  nextEvent: GameEvent | null;
  /** Si la decisión fue "perfecta" (educativa). */
  isPerfect: boolean;
}

export interface DecisionEngineDeps {
  player: Player;
  choice: Choice;
  /** Stream de eventos siguientes (inyectable para tests). */
  pickNextEvent: (player: Player, lastChoice: Choice) => GameEvent | null;
}

/**
 * Caso de uso: aplicar una decisión del jugador.
 * Aplica los deltas, suma XP, evalúa level-up y selecciona el próximo evento.
 */
export const applyDecision = ({
  player,
  choice,
  pickNextEvent,
}: DecisionEngineDeps): DecisionResult => {
  const newStats = applyStatDeltas(player.stats, choice.deltas);
  const xpGained = choice.xpReward ?? (choice.outcomeQuality === 'safe' ? 20 : 5);
  let xp = player.xp + xpGained;
  let level = player.level;
  let leveledUp = false;

  while (xp >= xpForNextLevel(level)) {
    xp -= xpForNextLevel(level);
    level += 1;
    leveledUp = true;
  }

  const isPerfect = choice.outcomeQuality === 'safe' || choice.outcomeQuality === 'educational';

  return {
    newStats,
    xpGained,
    leveledUp,
    newLevel: level,
    feedback: choice.feedback,
    quality: choice.outcomeQuality,
    nextEvent: pickNextEvent(player, choice),
    isPerfect,
  };
};
