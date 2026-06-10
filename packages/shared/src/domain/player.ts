import type { Stats } from './stats.js';

export type TalentId =
  | 'digital_detective'
  | 'network_expert'
  | 'fake_news_hunter'
  | 'ai_analyst'
  | 'security_expert';

export interface Talent {
  id: TalentId;
  name: string;
  description: string;
  /** Stat principal que potencia. */
  primaryStat: keyof Stats;
  /** Multiplicador pasivo (1.0 = neutro). */
  passiveMultiplier: number;
}

export const TALENTS: readonly Talent[] = [
  {
    id: 'digital_detective',
    name: 'Detective Digital',
    description: 'Detecta inconsistencias en URLs, remitentes y patrones.',
    primaryStat: 'security',
    passiveMultiplier: 1.15,
  },
  {
    id: 'network_expert',
    name: 'Experto en Redes',
    description: 'Lee perfiles y comunidades como un libro abierto.',
    primaryStat: 'reputation',
    passiveMultiplier: 1.1,
  },
  {
    id: 'fake_news_hunter',
    name: 'Cazador de Fake News',
    description: 'Verifica fuentes y detecta titulares clickbait.',
    primaryStat: 'knowledge',
    passiveMultiplier: 1.15,
  },
  {
    id: 'ai_analyst',
    name: 'Analista de IA',
    description: 'Reconoce deepfakes y contenido sintético.',
    primaryStat: 'knowledge',
    passiveMultiplier: 1.2,
  },
  {
    id: 'security_expert',
    name: 'Experto en Seguridad',
    description: 'Reduce el impacto de malware y phishing.',
    primaryStat: 'security',
    passiveMultiplier: 1.25,
  },
];

export interface PlayerClass {
  id: TalentId;
  level: number;
  xp: number;
}

export const xpForNextLevel = (level: number): number => 100 + (level - 1) * 50;

export interface Player {
  id: string;
  username: string;
  level: number;
  xp: number;
  /** Clase activa (talent tree principal). */
  classId: TalentId;
  /** Talentos secundarios desbloqueados. */
  unlockedTalents: readonly TalentId[];
  stats: Stats;
  /** Zona actual en el mapa. */
  currentZone: string;
  /** Historial ligero para IA contextual. */
  recentDecisions: readonly string[];
}
