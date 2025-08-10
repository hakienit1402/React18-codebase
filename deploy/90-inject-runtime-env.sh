#!/bin/sh

echo "==> Injecting environment variables"

envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

echo "==> Starting nginx"

exec "$@"