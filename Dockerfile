# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginxinc/nginx-unprivileged:1.26-alpine-slim

# Switch to root to install stuff and modify files
USER root

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built app
COPY --from=builder /app/dist .

# Clean default NGINX config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX config
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

# Copy env template + entrypoint
COPY deploy/env.template.js /usr/share/nginx/html/env.template.js
COPY deploy/90-inject-runtime-env.sh /docker-entrypoint.d/90-inject-runtime-env.sh

# Fix permissions
RUN chmod +x /docker-entrypoint.d/90-inject-runtime-env.sh && \
    chown -R nginx:nginx /usr/share/nginx/html


# ✅ Drop privileges after setup
USER nginx

# Expose port
EXPOSE 8080

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]