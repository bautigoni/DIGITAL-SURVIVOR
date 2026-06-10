import { ZONES, THREAT_LABELS, CHARACTERS, } from '../domain/index.js';
import { SEED_EVENTS } from '../content/seedEvents.js';
const TIME_HOOKS = [
    'a las 3 AM',
    'antes de un examen',
    'en tu primer día de trabajo',
    'mientras cuidás a tu hermanx',
    'durante una videollamada',
];
const EMOTIONAL_HOOKS = [
    'te sentís curiosx',
    'tenés miedo de perder una oportunidad',
    'te aburrís profundamente',
    'estás cansadx y bajxs las defensas',
    'estás feliz y querés compartirlo',
];
const VERIFICATION_TIPS = {
    phishing: 'Verificá siempre el dominio y no hagas clic en enlaces acortados.',
    fake_news: 'Buscá la fuente original antes de compartir.',
    malware: 'No descargues archivos de fuentes no verificadas.',
    disinformation: 'Diversificá tus fuentes de información.',
    grooming: 'Ningún adulto debería pedirte secretos. Hablá con alguien de confianza.',
    social_engineering: 'Verificá siempre por otro canal.',
    digital_addiction: 'Configurá límites de tiempo de pantalla.',
    online_scam: 'Si es demasiado bueno para ser verdad, no es verdad.',
    algorithmic_manipulation: 'Curá tu feed. Es tu responsabilidad, no del algoritmo.',
    deepfake: 'La voz de un ser querido no prueba su identidad. Verificá por fuera.',
    deceptive_ai: 'Las imágenes sintéticas dejan huellas: hacé búsqueda inversa.',
};
const FRAMINGS = {
    phishing: [
        'Recibís un mensaje con un premio inesperado y un link sospechoso.',
        'Tu banco te pide "confirmar tu identidad" con un formulario.',
    ],
    fake_news: [
        'Un titular incendiario promete revelar una verdad oculta.',
        'Circula una captura con un diálogo "filtrado".',
    ],
    malware: [
        'Un amigo te pasa un archivo .exe diciéndote que es un "hack".',
        'Una web te pide instalar un codec para ver un video.',
    ],
    disinformation: [
        'Un canal difunde estadísticas sin fuente.',
        'Una cuenta viral toma una foto vieja como si fuera actual.',
    ],
    grooming: [
        'Unx adultx te contacta alabando tu contenido.',
        'Te ofrecen "regalos" a cambio de conversaciones privadas.',
    ],
    social_engineering: [
        'Un "soporte técnico" te llama para que instales un programa.',
        'Un CEO de una startup te pide códigos de verificación.',
    ],
    digital_addiction: [
        'Una app te notifica justo cuando intentás dejarla.',
        'Un loop infinito de recomendaciones te atrapa.',
    ],
    online_scam: [
        'Una tienda desconocida ofrece un producto premium a precio regalado.',
        'Un "inversor" te promete rendimientos del 30% mensual.',
    ],
    algorithmic_manipulation: [
        'Tu feed te muestra solo opiniones que confirman las tuyas.',
        'Una notificación te empuja a volver a una app tras un minuto fuera.',
    ],
    deepfake: [
        'Recibís un audio de un familiar pidiendo dinero urgente.',
        'Ves un video de un famoso recomendando una cripto.',
    ],
    deceptive_ai: [
        'Una imagen impactante tiene marcas extrañas en los bordes.',
        'Una cuenta publica capturas de conversaciones "privadas".',
    ],
};
const NEGATIVE_DELTAS = {
    security: -20,
    money: -20,
    reputation: -15,
    trust: -10,
    knowledge: -5,
    stress: 15,
};
const POSITIVE_DELTAS = {
    security: 8,
    knowledge: 12,
    reputation: 5,
    stress: -5,
};
const EDUCATIONAL_DELTAS = {
    security: 12,
    knowledge: 15,
    reputation: 8,
    stress: -5,
};
const generateSafe = (rng, cat) => ({
    id: `c_safe_${rng.int(1000, 9999)}`,
    label: 'Verificar antes de actuar',
    outcomeQuality: 'safe',
    deltas: { ...POSITIVE_DELTAS },
    feedback: `Acción segura. ${VERIFICATION_TIPS[cat] ?? ''}`,
    teaches: cat,
    xpReward: 30,
});
const generateRisky = (rng, cat) => ({
    id: `c_risk_${rng.int(1000, 9999)}`,
    label: 'Reaccionar rápido para no perder la oportunidad',
    outcomeQuality: 'risky',
    deltas: { security: -5, stress: 10, knowledge: 2 },
    feedback: 'A veces la prisa es mala consejera. La próxima, verificá.',
    teaches: cat,
    xpReward: 10,
});
const generateDangerous = (rng, cat) => ({
    id: `c_dang_${rng.int(1000, 9999)}`,
    label: 'Hacer clic / pagar / compartir de inmediato',
    outcomeQuality: 'dangerous',
    deltas: { ...NEGATIVE_DELTAS, knowledge: 1 },
    feedback: `Cayó la trampa. Recordá: ${VERIFICATION_TIPS[cat] ?? 'desconfiá por defecto.'}`,
    teaches: cat,
    xpReward: 5,
});
const generateEducational = (rng, cat) => ({
    id: `c_edu_${rng.int(1000, 9999)}`,
    label: 'Reportar, documentar y enseñar a otros',
    outcomeQuality: 'educational',
    deltas: { ...EDUCATIONAL_DELTAS },
    feedback: 'Tu reporte protege a toda la comunidad.',
    teaches: cat,
    xpReward: 50,
});
export const generateProceduralEvent = (opts) => {
    const { rng, zone, category, playerLevel } = opts;
    const zoneData = ZONES[zone];
    const framing = rng.pick(FRAMINGS[category] ?? [`Una situación típica de ${zoneData.name}.`]);
    const time = rng.pick(TIME_HOOKS);
    const emotion = rng.pick(EMOTIONAL_HOOKS);
    const speaker = rng.pick(CHARACTERS.filter((c) => c.zone === zone));
    const title = `${THREAT_LABELS[category]}: ${zoneData.name.split(' ')[0]}`;
    const prompt = `${framing} Ocurrió ${time}. ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}.`;
    const choices = [
        generateDangerous(rng, category),
        generateRisky(rng, category),
        generateSafe(rng, category),
        generateEducational(rng, category),
    ];
    return {
        id: `proc_${Date.now()}_${rng.int(1000, 9999)}`,
        zoneId: zone,
        category,
        title,
        prompt,
        context: `Evento generado dinámicamente. Categoría: ${THREAT_LABELS[category]}.`,
        speaker: speaker
            ? { id: speaker.id, name: speaker.name, avatar: speaker.avatar, archetype: speaker.archetype }
            : undefined,
        choices,
        minLevel: playerLevel,
        tags: [zone, category, 'procedural'],
        modes: ['story', 'survival', 'school'],
    };
};
const CATEGORIES = [
    'phishing',
    'fake_news',
    'malware',
    'disinformation',
    'grooming',
    'social_engineering',
    'digital_addiction',
    'online_scam',
    'algorithmic_manipulation',
    'deepfake',
    'deceptive_ai',
];
/**
 * Selecciona un evento: del banco curado o generado proceduralmente.
 * Filtra por nivel, zona y evita repetir recientes.
 */
export const pickEvent = (opts) => {
    const { rng, zone, playerLevel, recentIds = [], proceduralChance = 0.4 } = opts;
    const pool = SEED_EVENTS.filter((e) => e.zoneId === zone && e.minLevel <= playerLevel && !recentIds.includes(e.id));
    if (pool.length > 0 && rng.next() > proceduralChance) {
        return rng.pick(pool);
    }
    const category = rng.pick(CATEGORIES);
    return generateProceduralEvent({ rng, zone, category, playerLevel, recentIds });
};
