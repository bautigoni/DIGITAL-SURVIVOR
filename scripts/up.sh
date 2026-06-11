#!/usr/bin/env bash
# Levanta el stack detached
set -e
cd /opt/apps/digitalsurvivor

set -a
# shellcheck disable=SC1091
source .env
set +a

docker compose up -d
echo "--- compose ps ---"
docker compose ps
