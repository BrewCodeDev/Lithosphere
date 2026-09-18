FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32

# The accepted source pins this Node base. Refresh its fixable Alpine packages,
# then remove package-management tooling that is not needed by the API runtime.
RUN apk upgrade --no-cache \
    && rm -rf \
      /usr/local/bin/corepack \
      /usr/local/bin/npm \
      /usr/local/bin/npx \
      /usr/local/lib/node_modules/corepack \
      /usr/local/lib/node_modules/npm

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

CMD ["node", "src/entrypoint.mjs"]
