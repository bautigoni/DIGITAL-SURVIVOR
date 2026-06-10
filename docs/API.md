# API Reference

Base URL: `http://localhost:4000/api`

Todas las rutas (excepto `/health`) requieren header `Authorization: Bearer <token>`.

## Health

### `GET /health`
```json
{ "status": "ok", "service": "digital-survivor-api", "time": "2026-06-10T..." }
```

## Game

### `POST /game/runs`
Inicia una partida.
```json
{ "mode": "STORY", "zoneId": "social_media", "classId": "digital_detective" }
```
Devuelve: `PlayerProfile`.

### `GET /game/runs/:id/event`
Devuelve el próximo evento.
```json
{ "event": { ... }, "profile": { ... } }
```

### `POST /game/runs/:id/decision`
Resuelve una decisión.
```json
{
  "eventId": "evt_social_iphone",
  "choiceId": "ignore",
  "event": { ... },
  "choice": { ... }
}
```
Devuelve:
```json
{
  "profile": { ... },
  "feedback": "Bien. Los premios inesperados casi siempre son anzuelos.",
  "leveledUp": false,
  "isPerfect": true
}
```

## Classrooms

### `POST /classrooms`
Crea un aula.
```json
{ "name": "Aula 4to B" }
```

### `POST /classrooms/join`
Une a un aula por código.
```json
{ "code": "DS-2026" }
```

### `GET /classrooms/:id/stats`
Estadísticas agregadas del aula.

### `GET /classrooms/:id/members`
Lista de miembros.

## AI

### `POST /ai/event`
Genera un evento dinámicamente.
```json
{ "zone": "ai", "level": 5, "recentIds": [], "seed": 123 }
```

### `GET /ai/zones`
Lista todas las zonas (con paleta, amenazas, unlock level).
