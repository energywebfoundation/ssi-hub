ARG IMAGE=node:14.15.1-alpine 

FROM $IMAGE as build

WORKDIR /app
COPY . .

RUN chmod +x ./docker/node-modules-clean.sh

RUN apk add --no-cache curl git py-pip make g++ openssl && \
  npm config set unsafe-perm true && \
  curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh && \
  npm ci && \
  npm run build && \
  rm -rf node_modules && \
  npm ci --production && \
  ./docker/node-modules-clean.sh && \
  ./bin/node-prune

RUN npm run generate:jwtkeys

FROM $IMAGE

RUN apk add --no-cache curl

COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/wait-for-db.sh /app/wait-for-db.sh
COPY --chown=node:node --from=build /app/private.pem /app/private.pem
COPY --chown=node:node --from=build /app/public.pem /app/public.pem

RUN chmod +x /app/wait-for-db.sh

USER node

ENV NODE_ENV=production

