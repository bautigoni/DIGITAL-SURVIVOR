# Arquitectura

## Visión general

```
┌────────────────────────────────────────────────────────────────┐
│                          WEB (React 19)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Pages   │→ │ Features │→ │   Store  │→ │   API Client     │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                              │ HTTP (REST) + JWT
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                       API (Express + TS)                        │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────┐  ┌──────────┐  │
│  │  Routes  │→ │ Controllers  │→ │  Services   │→ │  Repos   │  │
│  └──────────┘  └──────────────┘  └──────────────┘  └──────────┘  │
│                                                  Prisma         │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │  PostgreSQL  │
                       └──────────────┘

                            ▲
                            │ (sin acoplamiento)
┌────────────────────────────────────────────────────────────────┐
│                    @ds/shared (Domain + RPG)                   │
│  - Stats, Zones, Characters, Events, Player, Achievements      │
│  - Decision engine, Streak tracker, Survival rules             │
│  - Procedural AI (RNG seedable)                                │
└────────────────────────────────────────────────────────────────┘
```

## Capas

### `@ds/shared` — Dominio puro

- Sin dependencias de Node o React.
- Exporta tipos (`Stats`, `GameEvent`, `Player`, etc.).
- Implementa los casos de uso **puros** (applyDecision, checkSurvival, pickEvent).
- 100% testeable sin DB ni red.

### `apps/api` — Backend (Clean Architecture)

```
src/
├── domain/
│   ├── entities/         # PlayerProfile
│   └── repositories/     # Interfaces IPlayerRepository, IDecisionRepository, IClassroomRepository
├── application/
│   ├── services/         # GameService, ClassroomService, AIService
│   └── dto/              # Tipos de entrada/salida
├── infrastructure/
│   ├── database/         # Prisma client
│   └── repositories/     # Implementaciones Prisma
├── interfaces/
│   └── http/
│       ├── routes/       # (no usado: prefiero controllers)
│       ├── controllers/  # HealthController, GameController, ClassroomController, AIController
│       └── middleware/   # auth, errors, rate limit
└── config/               # container (composition root) + app
```

**Reglas de dependencia:**

- `domain` no importa nada de infraestructura.
- `application` depende de `domain`.
- `infrastructure` implementa interfaces de `domain`.
- `interfaces` orquesta todo vía el `container`.

### `apps/web` — Frontend (Feature Based)

```
src/
├── app/              # Router, providers, entrypoint
├── components/       # UI compartido (Button, Card, Modal, Toast, Confetti)
├── features/         # Una carpeta por feature
│   ├── game/         # Session, EventCard, ChoiceCard, store
│   ├── zones/        # WorldMap, ZoneCard
│   ├── rpg/          # Player store, StatsHud
│   ├── story/        # Modo Historia
│   ├── survival/     # Modo Supervivencia
│   ├── school/       # Modo Escuela (docente)
│   ├── multiplayer/  # Eventos y ranking
│   └── achievements/ # Logros
├── lib/              # Cliente API, sound, cn helper
├── pages/            # Composición final de features en rutas
└── styles/           # Tailwind + tokens globales
```

**Reglas:**

- Una feature no importa de otra feature directamente. Si necesitan compartir, va a `components/` o `lib/`.
- Las páginas son composición, no lógica de negocio.
- El store del jugador persiste en `localStorage` con Zustand.

## Flujo de una decisión

```
1. Player clickea un ChoiceCard
        ↓
2. useRunSession.decide.mutate(choiceId)
        ↓
3. POST /api/game/runs/:id/decision
        ↓
4. GameService.resolveDecision
   - Lee PlayerProfile
   - Construye un Player "core" para applyDecision
   - applyDecision aplica deltas y calcula XP
   - log en DecisionRepository
   - update en PlayerRepository
        ↓
5. Respuesta → setStats + addXp + pushToast + toasts + sonidos
        ↓
6. invalidateQueries(['run', id, 'event']) → next event
```

## IA procedural

`packages/shared/src/ai/procedural.ts` combina:

- **Banco curado** (`seedEvents.ts`): 11 eventos modelo, editados por diseño.
- **Generador procedural** (`generateProceduralEvent`): combina framings por categoría, hooks temporales, hooks emocionales y NPCs por zona. Devuelve un `GameEvent` con 4 opciones (peligrosa, riesgosa, segura, educativa).
- **Pick ponderado** (`pickEvent`): elige entre banco y procedural con probabilidad configurable. Filtra por nivel, zona y anti-repetición.

`apps/api/src/application/services/AIService.ts` define la interfaz `IAIProvider`. Hoy la implementación es heurística; mañana se enchufa OpenAI/Anthropic sin cambiar el resto.

## Diseño de datos (Prisma)

- `User`: estudiante/docente/admin.
- `GameRun`: una partida con su modo, zona, nivel, stats, clase, talentos y outcome.
- `Decision`: log append-only de cada elección (auditoría educativa).
- `Achievement`: marca cuándo se desbloquea cada logro (idempotente con `@@unique`).
- `Classroom` + `ClassroomMember`: aulas y membresía.
- `MultiplayerEvent` + `MultiplayerParticipant`: eventos semanales y scores.

## Seguridad

- Auth JWT (`apps/api/src/interfaces/http/middleware/auth.ts`).
- Helmet + CORS estricto + rate limit 120 req/min.
- Validación de inputs con Zod en cada controller.
- Passwords hasheados (recomendado: bcrypt en `User.passwordHash`).
- Decisiones registradas con `quality` y deltas → permiten análisis forense ético.

## Performance

- Lazy loading de páginas con `React.lazy` + `Suspense`.
- React Query con `staleTime` y `refetchOnWindowFocus: false` para evitar refetch ruidoso.
- Zustand selectores por slice para minimizar re-renders.
- Tailwind con purga automática en build (contenido restringido a `./src/**/*.{ts,tsx}`).
- Bundle splitting por defecto de Vite.

## Decisiones de diseño

| Decisión                          | Por qué                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------- |
| Monorepo npm workspaces           | Sin overhead de pnpm/turbo; el grafo es chico.                                |
| Zustand + persist en localStorage | Sin backend obligatorio para jugar la primera sesión.                         |
| API REST simple (sin GraphQL)     | Endpoints estables y cacheables. Suficiente para el alcance.                  |
| IA heurística en `shared`         | Permite al cliente previsualizar sin round-trip; el server tiene su provider. |
| Sound procedural WebAudio         | Cero assets externos; reproducible.                                           |
| Componentes con Framer Motion     | Motion como citizen de primera para look "premium".                           |
