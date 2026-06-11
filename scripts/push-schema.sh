#!/usr/bin/env bash
# Aplica el schema.prisma directamente a la DB (dev/prod sin migrations).
set -e
cd /opt/apps/digitalsurvivor

set -a
# shellcheck disable=SC1091
source .env
set +a

echo ">> prisma db push (aplica schema.prisma directo, sin migraciones)"
docker compose exec -T api npx prisma db push --skip-generate

echo
echo ">> prisma generate (regenera el client por las dudas)"
docker compose exec -T api npx prisma generate

echo
echo ">> prisma seed"
docker compose exec -T api npm run prisma:seed && echo "seed OK" || echo "seed FAIL (continuamos)"

echo
echo ">> Verificación: contar tablas"
docker compose exec -T db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\dt"
