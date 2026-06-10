# 🛡️ Digital Survivor

> **RPG de supervivencia en Internet.** Aprendé a defenderte de phishing, fake news, malware, deepfakes y más… **tomando decisiones, equivocándote y subiendo de nivel.**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)]()
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)]()
[![TS](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)]()
[![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js&logoColor=white)]()
[![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?logo=prisma&logoColor=white)]()
[![Postgres](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)]()

---

## ✨ Visión

Internet es el universo. Cada zona tiene su propia fauna: streamers, abuelas, profesores, influencers, scammers y falsos CEOs. El jugador sobrevive **tomando decisiones**. Nunca mediante clases teóricas.

**El aprendizaje emerge del contraste:** se ofrece la opción peligrosa, la riesgosa, la segura y la educativa. El feedback explica el porqué.

---

## 🎮 Features

- 🗺️ **6 zonas** (Social Media, Gaming, News, Shopping, AI, Dark Network)
- 🧠 **7 stats** (Seguridad, Reputación, Dinero, Conocimiento, Confianza, Tiempo, Estrés Digital)
- 🤖 **IA procedural** que genera eventos, NPCs y desafíos dinámicamente
- 🧙 **5 clases** (Detective Digital, Experto en Redes, Cazador de Fake News, Analista de IA, Experto en Seguridad)
- 🏆 **12 logros** con métricas saludables, no de "horas de juego"
- 🎯 **4 modos**: Historia · Supervivencia · Escuela · Multijugador
- 🎨 UI/UX inspirada en **Persona 5 + Spider-Verse + Duolingo + Fall Guys**
- 🔊 **Sistema de sonido** procedural con WebAudio (sin assets externos)
- 🌐 **i18n ready** (textos en castellano por defecto)
- ♿ **Accesible**: foco visible, contraste alto, motion-reduce respetado

---

## 🏗️ Arquitectura

```
DIGITAL SURVIVOR/
├── apps/
│   ├── web/         # React 19 + Vite + TS + Tailwind + Framer Motion
│   └── api/         # Node + Express + TS + Prisma + PostgreSQL
├── packages/
│   └── shared/      # Dominio + RPG engine + IA procedural
├── docs/            # Documentación técnica y diseño
└── .github/         # CI workflows
```

### Principios

- **Feature Based**: cada feature es una carpeta autocontenida.
- **SOLID**: cada clase cumple una responsabilidad clara.
- **Clean Architecture**: dominio ⇆ aplicación ⇆ infraestructura ⇆ interfaces.
- **DDD simplificado**: agregados ligeros, value objects explícitos, eventos como ciudadanos de primera.

### Stack obligatorio

| Capa     | Tecnología                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------- |
| Frontend | React 19 · TypeScript · Vite · Tailwind · Framer Motion · Zustand · React Query · React Router |
| Backend  | Node 20 · Express · TypeScript · PostgreSQL · Prisma                                           |
| Testing  | Vitest · React Testing Library                                                                 |
| Calidad  | ESLint · Prettier · Husky · lint-staged                                                        |

---

## 🚀 Quick start

### Requisitos

- Node.js ≥ 20
- pnpm **o** npm ≥ 10
- PostgreSQL 14+ (o usar Docker)

### Setup

```bash
git clone <repo>
cd "DIGITAL SURVIVOR"

# 1. Instalar dependencias
npm install

# 2. Backend
cd apps/api
cp .env.example .env
# Editar DATABASE_URL y JWT_SECRET
npx prisma migrate dev --name init
npm run prisma:seed
cd ../..

# 3. Frontend
cd apps/web
cp .env.example .env
cd ../..

# 4. Dev (API + Web en paralelo)
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)
API: [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# Watch
npm run test:watch
```

---

## 📦 Producción

```bash
npm run build
npm run start
```

El build genera:

- `apps/api/dist` → correr con `node dist/index.js`
- `apps/web/dist` → servir como estático desde cualquier CDN

---

## 🔐 Seguridad

- Rate limiting global (`express-rate-limit`).
- Helmet con CSP estricto en producción.
- Validación de inputs con Zod.
- Auth con JWT, secret por env.
- Passwords hasheados (bcrypt recomendado en producción).
- Auditoría de decisiones (`Decision` model) para análisis forense educativo.

---

## 🛣️ Roadmap

Ver [`docs/ROADMAP.md`](./docs/ROADMAP.md).

---

## 🤝 Equipo

Este proyecto fue diseñado y construido de forma colaborativa por:

- **Senior Product Designer** — Visión y priorización
- **Senior UX Designer** — Flow, accesibilidad, feedback
- **Senior UI Designer** — Sistema visual, tipografía, motion
- **Senior Frontend Engineer** — React 19, performance, accesibilidad
- **Senior Backend Engineer** — Express, Prisma, arquitectura limpia
- **Senior Game Designer** — Sistemas RPG, balance, progresión
- **Especialista en Seguridad Digital** — Amenazas modeladas
- **Especialista en Psicología del Comportamiento** — Refuerzo, sesgos, gamificación sana
- **Especialista en Educación Digital** — Taxonomía de aprendizajes, docente-first

---

## 📄 Licencia

MIT. Hecho con fines **educativos**.
