# Deploy — Digital Survivor (Oracle VM)

Infra de la VM (Ubuntu 22.04) ya tiene:

- Docker 29 + Compose 2
- Caddy como reverse proxy público en `:80/:443` con TLS automático
- Postgres 16 compartido (otro stack). **Acá usamos uno propio** vía volumen `ds_pgdata`.

## Topología

```
Internet
   │   digitalsurvivor.bauhub.online  (Caddy → TLS automático)
   ▼
Caddy (:443)
   │   127.0.0.1:3011
   ▼
docker compose "digitalsurvivor_web"   (nginx:1.27)
   │   /api/* ───────────┐
   ▼                     ▼
front estático      docker compose "digitalsurvivor_api"  (node:20)
(SPA React)              │  4000
                         ▼
                  docker compose "digitalsurvivor_db"   (postgres:16-alpine)
```

## Deploy manual (primera vez)

```bash
# 1) En la VM
sudo mkdir -p /opt/apps/digitalsurvivor
sudo chown -R ubuntu:ubuntu /opt/apps/digitalsurvivor
cd /opt/apps/digitalsurvivor

# 2) Traer el código
git clone https://github.com/bautigoni/DIGITAL-SURVIVOR.git .

# 3) Configurar entorno
cp .env.production.example .env
$EDITOR .env
#   - POSTGRES_PASSWORD = algo fuerte
#   - JWT_SECRET        = 32+ chars aleatorios
#   - CORS_ORIGIN       = https://digitalsurvivor.bauhub.online
#   - PUBLIC_DOMAIN     = digitalsurvivor.bauhub.online

# 4) Levantar
bash scripts/deploy.sh

# 5) Registrar el vhost en Caddy
sudo tee -a /etc/caddy/Caddyfile <<'EOF'

digitalsurvivor.bauhub.online {
    reverse_proxy 127.0.0.1:3011
}
EOF
sudo systemctl reload caddy
```

## Actualizar

```bash
cd /opt/apps/digitalsurvivor
git pull
bash scripts/deploy.sh
```

## Comandos útiles

```bash
docker compose logs -f api
docker compose logs -f web
docker compose exec api npx prisma studio --port 5555   # requiere publicar puerto
docker compose down
docker compose down -v          # ⚠️ borra el volumen de Postgres
```

## Backups

```bash
docker compose exec -T db pg_dump -U digitalsurvivor -d digitalsurvivor \
  | gzip > backup-$(date +%F).sql.gz
```

## Notas

- La **API no se publica al host**: nginx (dentro de `web`) la llama por la red interna `dsnet`.
- El **rate-limit** (120 req/min) está en la API; Caddy no agrega nada extra.
- **Helmet** + **CORS** configurados vía env. Si el dominio cambia, actualizar `CORS_ORIGIN` y `PUBLIC_DOMAIN`.
- **CORS_ORIGIN** debe incluir el `https://` para que el browser acepte el handshake.
