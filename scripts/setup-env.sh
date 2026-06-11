#!/usr/bin/env bash
set -euo pipefail
cd /opt/apps/digitalsurvivor

if [[ ! -f .env.production.example ]]; then
  echo "ERROR: no se encuentra .env.production.example en $(pwd)" >&2
  exit 1
fi

cp .env.production.example .env
chmod 600 .env

# Generar secretos localmente (openssl está disponible en Ubuntu)
JWT_SECRET="$(openssl rand -hex 32)"
PG_PASSWORD="$(openssl rand -hex 16)"

# Reemplazar placeholders. Usamos | como delimitador para no chocar con /
sed -i "s|^JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|"          .env
sed -i "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=${PG_PASSWORD}|" .env

# Sanity check (no imprime los secretos)
grep -q "^JWT_SECRET=$" .env          && { echo "ERROR: JWT_SECRET vacío" >&2; exit 1; }
grep -q "^POSTGRES_PASSWORD=$" .env   && { echo "ERROR: POSTGRES_PASSWORD vacío" >&2; exit 1; }

# Longitud mínima
JWT_LEN=$(grep -E "^JWT_SECRET=" .env | cut -d= -f2 | tr -d '\n' | wc -c)
if [[ $JWT_LEN -lt 32 ]]; then
  echo "ERROR: JWT_SECRET demasiado corto ($JWT_LEN)" >&2
  exit 1
fi

echo "OK"
