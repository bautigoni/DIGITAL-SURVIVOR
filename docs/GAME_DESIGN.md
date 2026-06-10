# Game Design Document

## 1. Loop central

```
Ver situación → Elegir opción → Ver feedback + stats → Subir nivel / desbloquear talento → Repetir
```

El feedback es **siempre narrativo y específico**. Nunca genérico.

## 2. Stats (7)

| Stat | ¿Qué modela? | ¿Cómo se gana? | ¿Cómo se pierde? |
|------|--------------|----------------|------------------|
| Seguridad | Capacidad de detectar amenazas | Verificar, reportar, denunciar | Clics, transferencias impulsivas |
| Reputación | Imagen pública | Compartir cosas ciertas, ayudar a NPCs | Viralizar fake news |
| Dinero | Recursos para vivir el juego | Misiones, ayudas de la comunidad | Comprar scams |
| Conocimiento | Educación acumulada | Eventos resueltos bien, level-ups | Decisiones peligrosas |
| Confianza | Vínculos con NPCs | Hablar con la abuela, mentor | Caer en grooming, abandono |
| Tiempo | Margen de maniobra | Organizarse, dormir | Scroll infinito |
| Estrés Digital | Costo emocional | Eventos con presión | Dormir, verificar |

**Game over** cuando cualquier stat (excepto estrés) llega a 0, o estrés llega a 100.

## 3. Zonas (6)

| Zona | Nivel | Amenaza principal | Color |
|------|-------|--------------------|-------|
| Social Media District | 1 | Likes falsos, perfiles falsos, estafas | Rosa |
| Gaming World | 2 | Robux, V-Bucks, hacks | Cyan |
| News District | 3 | Fake news, clickbait | Amarillo |
| Shopping City | 4 | Tiendas falsas, descuentos | Verde |
| AI District | 5 | Imágenes, voces, deepfakes | Violeta |
| Dark Network | 7 | Grooming, ingeniería social | Negro/Púrpura |

## 4. Clases (5)

| Clase | Stat principal | Pasivo |
|-------|----------------|--------|
| Detective Digital | Seguridad | +15% |
| Experto en Redes | Reputación | +10% |
| Cazador de Fake News | Conocimiento | +15% |
| Analista de IA | Conocimiento | +20% |
| Experto en Seguridad | Seguridad | +25% |

Las clases otorgan **multiplicador pasivo**, no技能的 numéricos absolutos, para evitar trivializar la elección.

## 5. Sistema de decisiones

Cada evento tiene 4 opciones con etiquetas de calidad:

- **Seguro** (verde): el camino correcto. Refuerza el hábito.
- **Educativo** (cyan): el camino **óptimo**. Reporta, enseña, multiplica impacto.
- **Arriesgado** (ámbar): no es la mejor pero tampoco catastrófico. Enseña por contraste.
- **Peligroso** (rojo): la trampa. Tiene consecuencias negativas claras.

Esto produce un **espacio de aprendizaje**: el jugador ve todas las alternativas con sus consecuencias, sin "una sola correcta".

## 6. Progresión

- XP se gana por **calidad** de decisión (no por cantidad).
- Level-ups otorgan elección de talento.
- Rachas: 5 y 10 decisiones seguras seguidas dan logros.
- Stress sostenido alto reduce XP ganado (incentivo a cuidarse).

## 7. Modos

### Historia
- Campaña principal.
- NPC recurrentes (LunaSky, Abuela Rosa, Prof. Medina, Max Trend, Sr. Phisher, Inés Biotech, Joa).
- Arcos temáticos por zona.
- "Villano" mayor en AI District / Dark Network.

### Supervivencia
- Eventos infinitos generados por IA.
- Reloj de tiempo real.
- Mide "cuánto sobrevivís" como puntaje.
- Ideal para speedruns diarios.

### Escuela
- Panel docente con:
  - Progreso individual
  - Errores comunes
  - Puntaje promedio
  - Códigos de invitación
- Diseñado para aula (1 docente, N estudiantes).

### Multijugador
- Cooperativo: resistir oleadas juntos.
- Competitivo: rankeds 1v1.
- Eventos semanales temáticos (Phishing Fridays, Deepfake Showdown).
- Rankings globales.

## 8. Psicología del comportamiento

Principios aplicados:

- **Refuerzo variable**: 4 outcomes posibles por evento (no solo "ganar/perder").
- **Choice architecture**: la opción segura es **clara y fácil**, no escondida.
- **Social proof**: logros visibles en perfil para reforzar identidad digital sana.
- **Loss aversion sutil**: el game over por stress es costoso emocionalmente, pero predecible.
- **Frequent feedback**: cada decisión tiene feedback inmediato, no esperar a "aprender al final".
- **Curated autonomy**: el jugador elige; nosotros curamos el espacio.

## 9. Educación

- **No hay clases teóricas**. El aprendizaje emerge de la decisión + feedback.
- El feedback siempre **explica el porqué** (heurística aplicable).
- Logros basados en **habilidad transferible** (verificar, reportar, diversificar fuentes) — no en horas.
- Modo Escuela provee **métricas para el docente** que mapean a competencias curriculares de Ciudadanía Digital.
