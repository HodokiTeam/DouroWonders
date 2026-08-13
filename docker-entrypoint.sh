#!/bin/sh
set -e

# First boot only: populate the volumes from the copies baked into the image.
# Afterwards the volumes are the source of truth, so anything the founders edit
# in the CMS survives a redeploy.

if [ ! -f /app/data/payload.db ]; then
  echo "[entrypoint] empty data volume — seeding payload.db from the image"
  cp /app/seed/payload.db /app/data/payload.db
fi

if [ -z "$(ls -A /app/media 2>/dev/null)" ]; then
  echo "[entrypoint] empty media volume — seeding uploads from the image"
  cp -r /app/seed/media/. /app/media/
fi

if [ -z "$PAYLOAD_SECRET" ]; then
  echo "[entrypoint] FATAL: PAYLOAD_SECRET is not set" >&2
  exit 1
fi

exec "$@"
