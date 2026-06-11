#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# Deploy Digital Survivor en la VM
# Uso:  bash scripts/deploy.sh
# Requiere: .env en la raíz del proyecto.
# ─────────────────────────────────────────────────────────────
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "ERROR: falta .env. Copiá .env.production.example y completá los secretos." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

echo ">> Build imágenes"
docker compose build

echo ">> Levantar stack"
docker compose up -d

echo ">> Esperando a que la API responda (max 60s)"
for i in $(seq 1 30); do
  if docker compose exec -T api node -e "fetch('http://127.0.0.1:4000/api/health').then(r=>process.exit(r.ok?0:1))" 2>/dev/null; then
    echo "API OK"; break
  fi
  sleep 2
done

echo ">> Prisma db push (aplica schema.prisma; este repo no usa migrations formales)"
docker compose exec -T api npx prisma db push --skip-generate

echo ">> Prisma seed (idempotente, podés comentar si no querés)"
docker compose exec -T api npm run prisma:seed || echo "(seed falló, continuando)"

echo ">> Estado"
docker compose ps

echo ">> Listo. Probá: https://${PUBLIC_DOMAIN:-digitalsurvivor.bauhub.online}/api/health"
