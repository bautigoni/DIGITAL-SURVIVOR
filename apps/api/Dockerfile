# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────
# API – Digital Survivor
# Multi-stage:
#   1) deps      → instala deps de prod usando el lockfile
#   2) build     → compila TypeScript + genera Prisma client
#   3) runner    → imagen final slim, sólo runtime
# ─────────────────────────────────────────────────────────────

ARG NODE_VERSION=20.19.0

# ─── 1) deps ────────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /repo

# libc6-compat para Prisma engine binary
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Copiamos sólo los manifests para cachear bien las capas
COPY package.json package-lock.json* .npmrc tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json

# node-linker=hoisted → genera node_modules en la raíz (monorepo)
RUN npm ci --no-audit --no-fund

# ─── 2) build ───────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /repo
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

# Build del shared (necesario porque vite/api importan @ds/shared/dist)
RUN npm run build -w @ds/shared

# Prisma generate (lee schema.prisma; no se conecta a la DB)
ENV DATABASE_URL="postgresql://x:x@localhost:5432/x?schema=public"
RUN npx --workspace @ds/api prisma generate

# Build de la API
RUN npm run build -w @ds/api

# ─── 3) runner ──────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates dumb-init \
 && rm -rf /var/lib/apt/lists/* \
 && groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs --home /app --shell /sbin/nologin survivor

# Layout de runtime: /app contiene todo lo necesario.
#
#   /app/
#     packages/shared/dist      ← dist del shared (consumido por la API)
#     apps/api/dist             ← código compilado de la API
#     apps/api/prisma           ← schema + migrations
#     apps/api/node_modules/@ds/shared → symlink a packages/shared (resolución workspace)
#     node_modules              ← deps de prod (hoisted)
#     node_modules/.prisma      ← Prisma client generado
#
# Publicamos el shared como un paquete resoluble bajo apps/api/node_modules/@ds/shared
# para que la API lo encuentre con `import '@ds/shared'` sin tocar la resolución.

# 1) Shared compilado
COPY --from=build --chown=survivor:nodejs /repo/packages/shared/dist /app/packages/shared/dist
COPY --from=build --chown=survivor:nodejs /repo/packages/shared/package.json /app/packages/shared/package.json

# 2) API compilada
COPY --from=build --chown=survivor:nodejs /repo/apps/api/dist /app/apps/api/dist
COPY --from=build --chown=survivor:nodejs /repo/apps/api/prisma /app/apps/api/prisma
COPY --from=build --chown=survivor:nodejs /repo/apps/api/package.json /app/apps/api/package.json

# 3) Hoisted node_modules con .prisma adentro
COPY --from=build --chown=survivor:nodejs /repo/node_modules /app/node_modules

# 4) Hacemos el shared resolvable por la API sin que la build de TS se queje
RUN mkdir -p /app/apps/api/node_modules/@ds \
 && ln -sfn /app/packages/shared /app/apps/api/node_modules/@ds/shared

USER survivor
WORKDIR /app/apps/api

EXPOSE 4000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
