/**
 * Servicio de IA "del lado servidor".
 * Hoy funciona con un motor heurístico determinístico basado en @ds/shared.
 * Diseñado para enchufar luego un proveedor (OpenAI, Anthropic, etc.) detrás
 * de la misma interfaz.
 */
import { pickEvent, createRng, type GameEvent, type ZoneId, type ThreatCategory } from '@ds/shared';

export interface IARequest {
  zone: ZoneId;
  level: number;
  recentIds?: string[];
  category?: ThreatCategory;
  /** Cuando viene de OpenAI, se ignora y se usa el provider configurado. */
  seed?: number;
}

export interface IAIProvider {
  generateEvent(req: IARequest): Promise<GameEvent>;
}

export class HeuristicAIProvider implements IAIProvider {
  async generateEvent(req: IARequest): Promise<GameEvent> {
    const rng = createRng(req.seed ?? Date.now());
    return pickEvent({
      rng,
      zone: req.zone,
      playerLevel: req.level,
      recentIds: req.recentIds ?? [],
      proceduralChance: 0.6,
    });
  }
}

/**
 * Punto de extensión: si AI_PROVIDER=openai, instanciar acá
 * el provider que llame a la API externa y devuelva un GameEvent tipado.
 */
export const buildAIProvider = (): IAIProvider => {
  const which = process.env.AI_PROVIDER ?? 'heuristic';
  switch (which) {
    case 'heuristic':
    default:
      return new HeuristicAIProvider();
  }
};
