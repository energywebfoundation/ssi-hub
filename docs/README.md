**[iam-cache-server](README.md)**

### IAM Cache Server

## Prepare

```bash
# development
$ cp .env.dist .env
$ cp docker-compose.dev.yml docker.compose.yml
```

```bash
# production mode
$ cp .env.dist .env
$ cp docker-compose.prod.yml docker.compose.yml
```

## Installation

```bash
$ npm install
$ npm run docker:build
```

## Running the app

```bash
# development
$ npm run docker:watch

# production mode
$ npm run docker:start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
