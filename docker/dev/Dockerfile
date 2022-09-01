FROM node:18 As development

WORKDIR /app

RUN apt-get update && \
  apt-get install -y bash curl openssl python-pip make g++ && \
  npm install node-dev -g && npm cache clean --force

COPY package*.json ./
COPY docker ./docker

RUN chmod +x ./docker/node-modules-clean.sh

RUN npm ci && npm cache clean --force && \
  ./docker/node-modules-clean.sh && \
  npm dedupe && \
  rm -f .npmrc
