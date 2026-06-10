import type { Stats } from './stats.js';
import type { ZoneId } from './zones.js';
import type { Character } from './characters.js';

export type ThreatCategory =
  | 'phishing'
  | 'fake_news'
  | 'malware'
  | 'disinformation'
  | 'grooming'
  | 'social_engineering'
  | 'digital_addiction'
  | 'online_scam'
  | 'algorithmic_manipulation'
  | 'deepfake'
  | 'deceptive_ai';

export const THREAT_LABELS: Record<ThreatCategory, string> = {
  phishing: 'Phishing',
  fake_news: 'Fake News',
  malware: 'Malware',
  disinformation: 'Desinformación',
  grooming: 'Grooming',
  social_engineering: 'Ingeniería Social',
  digital_addiction: 'Adicción Digital',
  online_scam: 'Estafa Online',
  algorithmic_manipulation: 'Manipulación Algorítmica',
  deepfake: 'Deepfake',
  deceptive_ai: 'IA Engañosa',
};

export type ChoiceOutcomeQuality = 'safe' | 'risky' | 'dangerous' | 'educational';

export interface Choice {
  id: string;
  label: string;
  /** Calidad pedagógica. Define la dirección de la consecuencia esperada. */
  outcomeQuality: ChoiceOutcomeQuality;
  /** Delta sugerido. Puede ser modificado por RNG para variar la experiencia. */
  deltas: Partial<Stats>;
  /** Mensaje narrativo que se muestra al elegir esta opción. */
  feedback: string;
  /** Categoría de amenaza que se enseña. */
  teaches?: ThreatCategory;
  /** Bonus de XP por elección correcta. */
  xpReward?: number;
}

export interface GameEvent {
  id: string;
  zoneId: ZoneId;
  category: ThreatCategory;
  title: string;
  prompt: string;
  context: string;
  speaker?: Pick<Character, 'id' | 'name' | 'avatar' | 'archetype'>;
  choices: readonly Choice[];
  /** Nivel mínimo para que aparezca. */
  minLevel: number;
  /** Tags semánticos. Sirven al generador procedural. */
  tags: readonly string[];
  /** Modo donde aparece. */
  modes: readonly ('story' | 'survival' | 'school')[];
}
