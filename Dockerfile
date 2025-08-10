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

# Replace default NGINX config with external file for readability
RUN rm -f /etc/nginx/conf.d/default.conf
COPY deploy/nginx/app.conf /etc/nginx/conf.d/app.conf

# Copy entrypoint that generates env.js from VITE_* envs then chain to nginx
COPY deploy/entrypoint.sh /usr/local/bin/app-entrypoint.sh
RUN chmod +x /usr/local/bin/app-entrypoint.sh && \
    chown -R nginx:nginx /usr/share/nginx/html /etc/nginx


# ✅ Drop privileges after setup
USER nginx

# Expose port
EXPOSE 8080

# Entrypoint: generate env, then run default nginx entrypoint/cmd
ENTRYPOINT ["/usr/local/bin/app-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]