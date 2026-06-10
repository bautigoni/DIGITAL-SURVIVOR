# UI / UX System

## Inspiraciones

- **Persona 5** — UI bold, angular, con paneles tipo "revista" y tipografía display.
- **Spider-Verse** — Halftones, comic borders, líneas de velocidad.
- **Duolingo** — Feedback inmediato, recompensas, racha.
- **Fall Guys** — Personajes-mascota, colores saturados, animaciones de celebración.

## Principios

1. **Bold by default.** Tipografía display, contraste alto.
2. **Motion con propósito.** Animaciones que enseñan (pulse en stat crítico) o premian (confetti en level-up).
3. **Feedback inmediato.** Cada decisión tiene feedback escrito, sonoro y visual.
4. **Color con significado.** Cada stat tiene un color; cada zona tiene paleta.
5. **No punitivo.** Decisiones riesgosas no "matán" — enseñan. Game over solo por colapso real.

## Tokens

### Color

| Token | Uso | Hex |
|-------|-----|-----|
| `ink-900/800/700` | Backgrounds | #06030f / #0a0518 / #120a2a |
| `neon-pink` | Acento primario | #ff2e88 |
| `neon-cyan` | Acento secundario | #22e3ff |
| `neon-purple` | Acento intermedio | #a855f7 |
| `neon-yellow` | Highlights | #fde047 |
| `neon-green` | Seguro | #34d399 |
| `neon-orange` | Advertencia | #fb923c |

### Tipografía

- **Display**: `Space Grotesk` — títulos, números grandes.
- **Body**: `Inter` — párrafos, UI.
- **Mono**: `JetBrains Mono` — stats, IDs, terminal.

### Motion

| Animación | Uso |
|-----------|-----|
| `floaty` | Partículas de fondo |
| `pop` | Aparición de tarjetas |
| `glitch` | Estados de "hackeo" / dark network |
| `shimmer` | Estados de carga premium |

## Componentes núcleo

- `Button` — 4 variantes (primary, ghost, danger, success), 3 tamaños.
- `Card` — 3 variantes (panel, strong, comic).
- `ProgressBar` — gradiente animado.
- `Modal` — backdrop blur, focus trap implícito.
- `ToastStack` — apilado bottom-right, auto-dismiss.
- `Confetti` — celebración, 2.4s.

## Estados visuales

- **Default**: panel translúcido sobre fondo radial.
- **Crítico** (stat ≤ 15): borde + icono rojos, pulse suave.
- **Éxito**: shadow-glow + confetti.
- **Game over**: modal centrado con CTA "volver al mapa".

## Responsive

- Mobile-first. Breakpoints `sm` / `md` / `lg` / `xl` de Tailwind.
- Sidebar HUD colapsa a grid 2x4 en <lg.
- Mapa de zonas pasa de 3 cols a 1 col en <md.
