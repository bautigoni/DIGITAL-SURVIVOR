/**
 * Las 6 zonas del universo de Internet.
 * Cada zona tiene su propia paleta cromática y taxonomía de amenazas.
 */
export type ZoneId =
  | 'social_media'
  | 'gaming'
  | 'news'
  | 'shopping'
  | 'ai'
  | 'dark_network';

export const ZONE_IDS: readonly ZoneId[] = [
  'social_media',
  'gaming',
  'news',
  'shopping',
  'ai',
  'dark_network',
] as const;

export interface Zone {
  id: ZoneId;
  name: string;
  tagline: string;
  description: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  threats: readonly string[];
  unlockLevel: number;
}

export const ZONES: Record<ZoneId, Zone> = {
  social_media: {
    id: 'social_media',
    name: 'Social Media District',
    tagline: 'La plaza pública del mundo digital.',
    description:
      'Millones de voces. Likes que compran, perfiles que mienten. Aprendé a leer entre líneas.',
    palette: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#fbbf24',
      background: '#0f0a1f',
    },
    threats: ['likes falsos', 'perfiles falsos', 'estafas'],
    unlockLevel: 1,
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming World',
    tagline: 'Recompensas gratis. Trampas gratis.',
    description:
      'Robux, V-Bucks, hacks… los atajos siempre tienen un precio. Identificá las ofertas imposibles.',
    palette: {
      primary: '#22d3ee',
      secondary: '#06b6d4',
      accent: '#a78bfa',
      background: '#04111f',
    },
    threats: ['Robux gratis', 'V-Bucks gratis', 'hacks falsos'],
    unlockLevel: 2,
  },
  news: {
    id: 'news',
    name: 'News District',
    tagline: 'Lo que parece verdad no siempre lo es.',
    description:
      'Titulares diseñados para viralizar, no para informar. Verificá antes de compartir.',
    palette: {
      primary: '#facc15',
      secondary: '#fb923c',
      accent: '#f43f5e',
      background: '#1a0f04',
    },
    threats: ['fake news', 'titulares engañosos'],
    unlockLevel: 3,
  },
  shopping: {
    id: 'shopping',
    name: 'Shopping City',
    tagline: 'Descuentos del 99%. Estafas del 100%.',
    description:
      'Tiendas espejo, tarjetas clonadas y precios ridículos. Aprendé a comprar sin caer.',
    palette: {
      primary: '#34d399',
      secondary: '#10b981',
      accent: '#fde047',
      background: '#04140d',
    },
    threats: ['tiendas falsas', 'descuentos irreales'],
    unlockLevel: 4,
  },
  ai: {
    id: 'ai',
    name: 'AI District',
    tagline: 'Lo que ves puede no haber ocurrido.',
    description:
      'Imágenes, voces y videos fabricados con precisión milimétrica. Tu ojo ya no alcanza.',
    palette: {
      primary: '#a78bfa',
      secondary: '#8b5cf6',
      accent: '#22d3ee',
      background: '#0a0420',
    },
    threats: ['imágenes falsas', 'voces falsas', 'deepfakes'],
    unlockLevel: 5,
  },
  dark_network: {
    id: 'dark_network',
    name: 'Dark Network',
    tagline: 'La parte que no querés ver.',
    description:
      'Manipulación emocional, suplantación y cadenas. La amenaza más humana de Internet.',
    palette: {
      primary: '#7c3aed',
      secondary: '#1e1b4b',
      accent: '#f43f5e',
      background: '#030014',
    },
    threats: ['manipulación', 'ingeniería social avanzada'],
    unlockLevel: 7,
  },
};

export const ZONE_LIST: readonly Zone[] = ZONE_IDS.map((id) => ZONES[id]);
