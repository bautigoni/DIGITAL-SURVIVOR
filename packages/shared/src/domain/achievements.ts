export type AchievementId =
  | 'first_decision'
  | 'first_perfect'
  | 'streak_5'
  | 'streak_10'
  | 'zone_clear_social'
  | 'zone_clear_gaming'
  | 'zone_clear_news'
  | 'zone_clear_shopping'
  | 'zone_clear_ai'
  | 'zone_clear_dark'
  | 'no_stress_run'
  | 'speedrun_survival'
  | 'mentor_saved';

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: 'first_decision',
    name: 'Primer paso',
    description: 'Tomá tu primera decisión en Internet.',
    icon: '👣',
    xpReward: 25,
  },
  {
    id: 'first_perfect',
    name: 'Ojo clínico',
    description: 'Elegí la mejor respuesta en un evento.',
    icon: '🎯',
    xpReward: 50,
  },
  {
    id: 'streak_5',
    name: 'Racha x5',
    description: 'Cinco decisiones seguras seguidas.',
    icon: '🔥',
    xpReward: 100,
  },
  {
    id: 'streak_10',
    name: 'Racha x10',
    description: 'Diez decisiones seguras seguidas.',
    icon: '⚡',
    xpReward: 250,
  },
  {
    id: 'no_stress_run',
    name: 'Mente de acero',
    description: 'Terminá un día con Estrés Digital en 0.',
    icon: '🧘',
    xpReward: 200,
  },
  {
    id: 'mentor_saved',
    name: 'Héroe cotidiano',
    description: 'Ayudaste a un NPC a evitar una estafa.',
    icon: '🦸',
    xpReward: 150,
  },
  {
    id: 'zone_clear_social',
    name: 'Maestro de Redes',
    description: 'Completaste el Social Media District.',
    icon: '📱',
    xpReward: 300,
  },
  {
    id: 'zone_clear_gaming',
    name: 'Guardián Gamer',
    description: 'Completaste Gaming World.',
    icon: '🎮',
    xpReward: 300,
  },
  {
    id: 'zone_clear_news',
    name: 'Cazador de Titulares',
    description: 'Completaste News District.',
    icon: '📰',
    xpReward: 300,
  },
  {
    id: 'zone_clear_shopping',
    name: 'Comprador Inteligente',
    description: 'Completaste Shopping City.',
    icon: '🛒',
    xpReward: 300,
  },
  {
    id: 'zone_clear_ai',
    name: 'Ojo Digital',
    description: 'Completaste AI District.',
    icon: '🤖',
    xpReward: 400,
  },
  {
    id: 'zone_clear_dark',
    name: 'Sombra Vigilante',
    description: 'Completaste Dark Network.',
    icon: '🕶️',
    xpReward: 500,
  },
];
