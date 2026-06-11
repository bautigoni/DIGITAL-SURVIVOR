#!/usr/bin/env bash
# Relanza el build de Docker en una sesión totalmente desacoplada.
# Usa setsid para crear un nuevo grupo de procesos, y redirige todo a un log.
set -e
cd /opt/apps/digitalsurvivor

# Cargar .env
set -a
# shellcheck disable=SC1091
source .env
set +a

# Limpiar log previo
: > /tmp/ds-build.log

# Lanzar en nueva sesión (sobrevive a que el shell padre se vaya)
setsid bash -c '
  cd /opt/apps/digitalsurvivor || exit 1
  set -a; source .env; set +a
  exec docker compose build
' </dev/null >/tmp/ds-build.log 2>&1 &
echo $! > /tmp/ds-build.pid
disown
sleep 2
echo "started pid=$(cat /tmp/ds-build.pid)"
ps -p "$(cat /tmp/ds-build.pid)" -o pid,etime,stat,cmd 2>/dev/null || echo "WARNING: pid not visible (puede estar en otra sesión)"
