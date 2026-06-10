export const TALENTS = [
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
export const xpForNextLevel = (level) => 100 + (level - 1) * 50;
