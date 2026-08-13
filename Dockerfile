# Douro Wonders — Next.js 16 + Payload CMS 3 + SQLite
#
# Debian slim rather than Alpine on purpose: both sharp and the libsql client
# that @payloadcms/db-sqlite uses ship glibc native binaries, and the musl
# builds are a recurring source of runtime failures.

# ---------- deps ----------
FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# ---------- build ----------
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pages are statically generated from the CMS, so the build reads payload.db
# straight out of the repo. The secret only has to exist for the config to
# initialise — the real one is supplied at runtime.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV DATABASE_URL=file:./payload.db
ENV PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime
RUN npm run build

# NOTE: `npm prune --omit=dev` would cut the image down a few hundred MB, but
# `next start` still loads next.config.ts and so needs typescript at runtime.
# Worth revisiting once the first deploy is confirmed working.

# ---------- runtime ----------
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# The database and the uploads live on volumes, not in the image
ENV DATABASE_URL=file:/app/data/payload.db

RUN groupadd -r app && useradd -r -g app app

COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/.next ./.next
COPY --from=build --chown=app:app /app/public ./public
COPY --from=build --chown=app:app /app/src ./src
COPY --from=build --chown=app:app /app/package.json ./package.json
COPY --from=build --chown=app:app /app/next.config.ts ./next.config.ts
COPY --from=build --chown=app:app /app/tsconfig.json ./tsconfig.json

# Seed copies: the entrypoint moves these onto the volumes on first boot only
COPY --from=build --chown=app:app /app/payload.db ./seed/payload.db
COPY --from=build --chown=app:app /app/media ./seed/media

COPY --chown=app:app docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && mkdir -p /app/data /app/media \
    && chown -R app:app /app/data /app/media

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
