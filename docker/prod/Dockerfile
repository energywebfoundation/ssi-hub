ARG IMAGE=node:12.13-alpine 

FROM $IMAGE as build

WORKDIR /app
COPY . .

RUN chmod +x ./docker/node-modules-clean.sh

RUN apk add --no-cache curl git py-pip make && \
  npm config set unsafe-perm true && \
  curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh && \
  npm i && \
  npm run build && \
  rm -rf node_modules && \
  npm i --production && \
  ./docker/node-modules-clean.sh && \
  ./bin/node-prune

FROM $IMAGE
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/.env /app/build/.env
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
ENV NODE_ENV=production
CMD ["node", "/app/dist/main.js"]

USER node