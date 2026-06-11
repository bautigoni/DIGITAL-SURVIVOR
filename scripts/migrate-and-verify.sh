#!/usr/bin/env bash
set -e
cd /opt/apps/digitalsurvivor

set -a
# shellcheck disable=SC1091
source .env
set +a

echo ">> Prisma migrate deploy"
docker compose exec -T api npx prisma migrate deploy

echo
echo ">> Prisma seed (opcional, idempotente)"
docker compose exec -T api npm run prisma:seed || echo "(seed falló o no existe, continuando)"

echo
echo ">> Esperando health check"
for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:3011/healthz >/dev/null 2>&1; then
    echo "web OK"
    break
  fi
  sleep 2
done

echo
echo ">> Probar API vía web (proxy /api/*)"
curl -sS -i http://127.0.0.1:3011/api/health | head -10

echo
echo ">> Probar web (index.html)"
curl -sS -I http://127.0.0.1:3011/ | head -5

echo
echo ">> Listo. Caddy debería estar enrutando digitalsurvivor.bauhub.online → :3011"
