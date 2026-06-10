import type { Stats } from '../domain/index.js';

/**
 * Reglas de supervivencia: el jugador pierde si una stat llega a 0
 * (distinta de stress) o si el estrés llega a 100.
 */
export type SurvivalFailReason =
  | 'security_collapsed'
  | 'reputation_collapsed'
  | 'money_collapsed'
  | 'trust_collapsed'
  | 'time_collapsed'
  | 'stress_overload';

export interface SurvivalCheck {
  alive: boolean;
  reason: SurvivalFailReason | null;
  warning: 'critical' | 'low' | 'ok';
}

export const checkSurvival = (stats: Stats): SurvivalCheck => {
  if (stats.security <= 0) return { alive: false, reason: 'security_collapsed', warning: 'critical' };
  if (stats.reputation <= 0) return { alive: false, reason: 'reputation_collapsed', warning: 'critical' };
  if (stats.money <= 0) return { alive: false, reason: 'money_collapsed', warning: 'critical' };
  if (stats.trust <= 0) return { alive: false, reason: 'trust_collapsed', warning: 'critical' };
  if (stats.time <= 0) return { alive: false, reason: 'time_collapsed', warning: 'critical' };
  if (stats.stress >= 100) return { alive: false, reason: 'stress_overload', warning: 'critical' };

  const minStat = Math.min(
    stats.security,
    stats.reputation,
    stats.money,
    stats.trust,
    stats.time,
  );
  const warning: SurvivalCheck['warning'] = minStat <= 15 ? 'critical' : minStat <= 30 ? 'low' : 'ok';
  return { alive: true, reason: null, warning };
};
