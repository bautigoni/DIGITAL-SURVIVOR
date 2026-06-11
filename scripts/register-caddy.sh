#!/usr/bin/env bash
# Agrega el vhost de Digital Survivor al Caddyfile de la VM y recarga Caddy.
set -e

if ! id ubuntu &>/dev/null; then
  echo "ERROR: no soy ubuntu" >&2
  exit 1
fi

CADDYFILE=/etc/caddy/Caddyfile
BACKUP="/etc/caddy/Caddyfile.bak-digitalsurvivor-$(date +%s)"

# Backup antes de tocar
sudo cp "$CADDYFILE" "$BACKUP"
echo "Backup: $BACKUP"

# Agregar bloque si no existe
if ! grep -q "digitalsurvivor.bauhub.online" "$CADDYFILE"; then
  sudo tee -a "$CADDYFILE" >/dev/null <<'EOF'

digitalsurvivor.bauhub.online {
    reverse_proxy 127.0.0.1:3011
}
EOF
  echo "vhost agregado"
else
  echo "vhost ya estaba, no modifico"
fi

echo "--- tail Caddyfile ---"
sudo tail -10 "$CADDYFILE"

echo "--- recargando Caddy ---"
if systemctl is-active --quiet caddy 2>/dev/null; then
  sudo systemctl reload caddy
elif pgrep -x caddy >/dev/null; then
  sudo pkill -USR1 -x caddy
else
  echo "WARN: caddy no corre como servicio ni está en foreground, recargá manualmente"
fi

echo "OK"
