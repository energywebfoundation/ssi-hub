ARG IMAGE=node:16.19.1-alpine

FROM $IMAGE as build

ARG SENTRY_RELEASE

WORKDIR /app
COPY . .

RUN chmod +x ./docker/node-modules-clean.sh

RUN apk add --no-cache curl git py-pip make g++ openssl bash && \
  npm ci && \
  npm run build && \
  rm -rf node_modules && \
  npm ci --production && \
  ./docker/node-modules-clean.sh

RUN curl -sf https://gobinaries.com/tj/node-prune | sh && node-prune

FROM $IMAGE
ENV SENTRY_RELEASE=$SENTRY_RELEASE
RUN apk add --no-cache curl

COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules

RUN mkdir /app/logs

RUN chown -R node:node /app/logs

ARG GIT_SHA
RUN echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"gitSha\": \"$GIT_SHA\"}" > /app/build.json
COPY package.json /app

USER node

ENV NODE_ENV=production
