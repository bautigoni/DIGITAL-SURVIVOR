# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────
# Web – Digital Survivor
# Multi-stage:
#   1) deps   → instala deps del monorepo
#   2) build  → compila shared + vite build
#   3) runner → nginx sirviendo los estáticos + proxy /api → API
# ─────────────────────────────────────────────────────────────

ARG NODE_VERSION=20.19.0

# ─── 1) deps ────────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /repo

COPY package.json package-lock.json* .npmrc tsconfig.base.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci --no-audit --no-fund

# ─── 2) build ───────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

RUN npm run build -w @ds/shared
RUN npm run build -w @ds/web

# ─── 3) runner (nginx) ─────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Quitamos el default
RUN rm -f /etc/nginx/conf.d/default.conf

COPY --from=build /repo/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/app.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
