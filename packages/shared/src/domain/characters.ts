import type { ZoneId } from './zones.js';

export type CharacterRole = 'victim' | 'attacker' | 'neutral' | 'mentor';

export type CharacterArchetype =
  | 'streamer'
  | 'grandma'
  | 'teacher'
  | 'influencer'
  | 'scammer'
  | 'businessman'
  | 'friend';

export interface Character {
  id: string;
  name: string;
  archetype: CharacterArchetype;
  role: CharacterRole;
  zone: ZoneId;
  avatar: string;
  description: string;
  traits: readonly string[];
}

/**
 * NPCs memorables. Cada uno puede aparecer como víctima o como atacante
 * según el contexto del evento generado por la IA procedural.
 */
export const CHARACTERS: readonly Character[] = [
  {
    id: 'npc_luna',
    name: 'LunaSky',
    archetype: 'streamer',
    role: 'victim',
    zone: 'social_media',
    avatar: '🌙',
    description: 'Streamer con 200k seguidores. Su cara aparece en deepfakes.',
    traits: ['creativa', 'impulsiva', 'comunicadora'],
  },
  {
    id: 'npc_abu',
    name: 'Abuela Rosa',
    archetype: 'grandma',
    role: 'victim',
    zone: 'social_media',
    avatar: '👵',
    description: 'Le encanta reenviar cadenas. Cree que el primo de su primo la quiere ayudar.',
    traits: ['confiada', 'cariñosa', 'desconfiada-de-la-tecnología'],
  },
  {
    id: 'npc_profe',
    name: 'Prof. Medina',
    archetype: 'teacher',
    role: 'mentor',
    zone: 'news',
    avatar: '🧑‍🏫',
    description: 'Docente de Ciudadanía Digital. Te enseña a verificar.',
    traits: ['riguroso', 'paciente', 'sarcástico'],
  },
  {
    id: 'npc_influ',
    name: 'Max Trend',
    archetype: 'influencer',
    role: 'attacker',
    zone: 'social_media',
    avatar: '📱',
    description: 'Vende cursos milagrosos. Captura la atención y vacía la billetera.',
    traits: ['persuasivo', 'oportunista', 'carismático'],
  },
  {
    id: 'npc_scam',
    name: 'Sr. Phisher',
    archetype: 'scammer',
    role: 'attacker',
    zone: 'dark_network',
    avatar: '🎣',
    description: 'Maestro de la ingeniería social. Su firma: un mensaje con urgencia.',
    traits: ['paciente', 'metódico', 'creativo'],
  },
  {
    id: 'npc_ceo',
    name: 'Inés Biotech',
    archetype: 'businessman',
    role: 'neutral',
    zone: 'shopping',
    avatar: '💼',
    description: 'CEO con startup de IA. ¿Genio o fraude? Vos decidís.',
    traits: ['ambiciosa', 'inteligente', 'opaca'],
  },
  {
    id: 'npc_amigo',
    name: 'Joa',
    archetype: 'friend',
    role: 'neutral',
    zone: 'gaming',
    avatar: '🎮',
    description: 'Tu amigo de toda la vida. A veces se equivoca feo.',
    traits: ['leal', 'impulsivo', 'divertido'],
  },
];
