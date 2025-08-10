#!/bin/sh
set -e

# Generate runtime env.js from all environment variables prefixed with VITE_
HTML_DIR="/usr/share/nginx/html"
OUT_FILE="$HTML_DIR/env.js"

echo "[entrypoint] Generating $OUT_FILE from VITE_* envs"

TMP_FILE="$(mktemp)"
{
  echo "window._env_ = {"
  FIRST=1
  for KEY in $(printenv | awk -F= '/^(VITE_)/{print $1}' | sort -u); do
    VAL=$(printenv "$KEY" | sed -e 's/\\/\\\\/g' -e 's/\"/\\"/g')
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


