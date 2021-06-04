FROM node:12.13-alpine As development

WORKDIR /app

RUN apk add --no-cache bash curl openssl python make g++ && \
  curl -sfL https://install.goreleaser.com/github.com/tuananh/node-prune.sh | sh && \
  npm install node-dev -g && npm cache clean --force

COPY package*.json ./
COPY docker ./docker

RUN chmod +x ./docker/node-modules-clean.sh

RUN npm i && npm cache clean --force && \
  ./docker/node-modules-clean.sh && \
  npm dedupe && \
  rm -f .npmrc
