#!/bin/sh
set -e

HTML_DIR="/usr/share/nginx/html"
OUT_FILE="$HTML_DIR/env.js"

echo "==> Generating runtime env at $OUT_FILE"

# Build window._env_ from all env vars starting with VITE_
TMP_FILE="$(mktemp)"
{
  echo "window._env_ = {"
  FIRST=1
  # shellcheck disable=SC2046
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

echo "==> Runtime env generated"

exec "$@"