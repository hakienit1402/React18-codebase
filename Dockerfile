# Build stage
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# Production stage
FROM nginxinc/nginx-unprivileged:1.27-alpine-slim

# Switch to root to install stuff and modify files
USER root

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built app
COPY --from=builder /app/dist .

# Replace default NGINX config with minimal SPA fallback and no-cache for env.js
RUN rm -f /etc/nginx/conf.d/default.conf && \
    cat > /etc/nginx/conf.d/app.conf <<'NGINX_CONF' && \
map $sent_http_content_type $expires {
  default off;
  text/html 15m;
  text/css 15m;
  application/javascript 15m;
  ~image/ 15m;
}

server {
  listen 8080;
  listen [::]:8080;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html index.htm;

  etag on;
  expires $expires;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location = /env.js {
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" always;
  }
}
NGINX_CONF

# Create entrypoint that generates env.js from VITE_* envs then chain to nginx
RUN cat > /usr/local/bin/app-entrypoint.sh <<'ENTRYPOINT_SH' && \
    chmod +x /usr/local/bin/app-entrypoint.sh && \
    chown -R nginx:nginx /usr/share/nginx/html /etc/nginx
#!/bin/sh
set -e
HTML_DIR="/usr/share/nginx/html"
OUT_FILE="$HTML_DIR/env.js"
echo "[entrypoint] Generating $OUT_FILE from VITE_* envs"
TMP_FILE="$(mktemp)"
{
  echo "window._env_ = {"
  FIRST=1
  for KEY in $(printenv | awk -F= '/^(VITE_)/{print $1}' | sort -u); do
    VAL=$(printenv "$KEY" | sed -e 's/\\\\/\\\\\\\\/g' -e 's/\"/\\\"/g')
    if [ "$FIRST" -eq 0 ]; then
      echo ","
    fi
    printf "  %s: \"%s\"" "$KEY" "$VAL"
    FIRST=0
  done
  echo "\n};"
} > "$TMP_FILE"
mv "$TMP_FILE" "$OUT_FILE"
exec /docker-entrypoint.sh "$@"
ENTRYPOINT_SH


# ✅ Drop privileges after setup
USER nginx

# Expose port
EXPOSE 8080

# Entrypoint: generate env, then run default nginx entrypoint/cmd
ENTRYPOINT ["/usr/local/bin/app-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]