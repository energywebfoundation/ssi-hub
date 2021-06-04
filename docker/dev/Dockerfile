FROM node:12.13-alpine As development

WORKDIR /app

RUN apk add --no-cache bash curl openssl python make g++ && npm prune && \
  npm install node-dev -g && npm cache clean --force

COPY package*.json ./
COPY docker ./docker

RUN chmod +x ./docker/node-modules-clean.sh

RUN npm i && npm cache clean --force && \
  ./docker/node-modules-clean.sh && \
  npm dedupe && \
  rm -f .npmrc
