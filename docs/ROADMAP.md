# Roadmap

## ✅ v1.0 — Lanzamiento (estado actual)

- 6 zonas con biomas visuales
- 7 stats con deltas por decisión
- 5 clases con multiplicador pasivo
- 11 amenazas modeladas
- 12 logros
- 4 modos (Historia, Supervivencia, Escuela, Multijugador)
- IA procedural (heurística seedable)
- API REST con Prisma + PostgreSQL
- Auth JWT, helmet, CORS, rate limit
- Sonido procedural WebAudio
- Tests: Vitest + RTL
- Lint + Prettier + Husky

## 🚧 v1.1 — Contenido (siguiente)

- [ ] 20+ eventos adicionales curados
- [ ] Narrativa con arcos por zona (Story acts)
- [ ] Minijuego "Verificá la URL" (training wheels)
- [ ] Minijuego "Reverse image search" guiado

## 🤖 v1.2 — IA real

- [ ] Provider OpenAI opcional (`AI_PROVIDER=openai`)
- [ ] Personalización de dificultad dinámica según patrón de errores
- [ ] Generación de **NPCs vivos** (chat corto) en Dark Network

## 🏫 v1.3 — Escuela pro

- [ ] Dashboard de cohorte
- [ ] Exportar reportes (PDF / CSV)
- [ ] Misiones creadas por el docente
- [ ] Integración con Google Classroom / Microsoft Teams

## 🌐 v1.4 — Multiplayer real

- [ ] WebSockets con Socket.io
- [ ] Matchmaking por rango
- [ ] Leaderboard global con anti-cheat
- [ ] Eventos semanales con rewards cosméticas

## 📱 v2.0 — Mobile

- [ ] PWA con offline
- [ ] Build con Capacitor (iOS / Android)
- [ ] Notificaciones suaves para "rituales digitales"

## ♿ v2.1 — Accesibilidad

- [ ] Modo alto contraste
- [ ] Soporte para screen readers (ARIA completo)
- [ ] Modo reduced motion
- [ ] Internacionalización (EN, PT)

## 🔐 v2.2 — Seguridad

- [ ] bcrypt en `User.passwordHash`
- [ ] 2FA TOTP
- [ ] Auditoría OWASP completa
- [ ] Pen-test externo

## 🧪 v2.3 — Calidad

- [ ] E2E con Playwright
- [ ] Coverage gate 80%
- [ ] Mutation testing
- [ ] Visual regression con Chromatic
