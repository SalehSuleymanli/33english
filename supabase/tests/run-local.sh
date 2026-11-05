#!/usr/bin/env bash
# Spins up a throwaway Postgres, applies the auth emulation + migrations, runs RLS tests.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PGBIN="${PGBIN:-$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | tail -1)}"
DATA="$(mktemp -d)"
PORT="${PORT:-54329}"
"$PGBIN/initdb" -D "$DATA" -U postgres -A trust >/dev/null
"$PGBIN/pg_ctl" -D "$DATA" -o "-p $PORT -k $DATA" -l "$DATA/log" start >/dev/null
trap '"$PGBIN/pg_ctl" -D "$DATA" stop >/dev/null; rm -rf "$DATA"' EXIT
PSQL=(psql -h "$DATA" -p "$PORT" -U postgres -v ON_ERROR_STOP=1 -q)
"${PSQL[@]}" -c "create database structa_test"
"${PSQL[@]}" -d structa_test -f "$HERE/local_auth_emulation.sql"
for f in "$HERE"/../migrations/*.sql; do "${PSQL[@]}" -d structa_test -f "$f"; done
"${PSQL[@]}" -d structa_test -f "$HERE/rls_test.sql"
"${PSQL[@]}" -d structa_test -f "$HERE/gamification_test.sql"
"${PSQL[@]}" -d structa_test -f "$HERE/arena_test.sql"
