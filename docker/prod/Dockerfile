ARG IMAGE=node:14.15.1-alpine

FROM $IMAGE as build

ARG SENTRY_RELEASE
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_COMMIT

WORKDIR /app
COPY . .

RUN chmod +x ./docker/node-modules-clean.sh
RUN chmod +x ./sentry-upload.sh

RUN apk add --no-cache curl git py-pip make g++ openssl bash && \
  curl -sL https://sentry.io/get-cli/ | bash && \
  npm config set unsafe-perm true && \
  curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh && \
  npm ci && \
  npm run build && \
  SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN SENTRY_COMMIT=$SENTRY_COMMIT ./sentry-upload.sh && \
  rm -rf node_modules && \
  npm ci --production && \
  ./docker/node-modules-clean.sh && \
  ./bin/node-prune

RUN npm run generate:jwtkeys

FROM $IMAGE
ENV SENTRY_RELEASE=$SENTRY_RELEASE
RUN apk add --no-cache curl

COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/private.pem /app/private.pem
COPY --chown=node:node --from=build /app/public.pem /app/public.pem

RUN mkdir /app/logs

RUN chown -R node:node /app/logs

USER node

ENV NODE_ENV=production

