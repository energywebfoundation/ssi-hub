### IAM Cache Server

## Prepare

```bash
# development
$ git checkout develop
$ cp .env.dist .env
$ cp docker-compose.dev.yml docker-compose.yml
```

```bash
# production mode
$ git checkout master
$ cp .env.dist .env
$ cp docker-compose.prod.yml docker-compose.yml
```

### Populate env file for development

The following values can be used in the `.env` file

#### NESTJS CONFIG

NESTJS_PORT=

#### DB Config

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=dev

#### Redis

REDIS_VERSION=6.0.8
REDIS_PASSWORD="password"
REDIS_PORT=6379
REDIS_HOST=redis

#### NATS.IO CONFIG

NATS_VERSION=2.1.8
NATS_CLIENTS_URL=nats:4222

## Installation

```bash
$ npm install
$ npm run docker:build
$ npm run generate:jwtkeys
```

## Running the app

### Populate env file for development

The values from .env.dev can be used to run locally

```bash
# development
$ npm run docker:watch

# production mode
$ npm run docker:start
```

### Cookies

Note that when running in dev, you can change the cookie policy in
`cookies.service.ts` from

```
sameSite: 'none',
secure: true
```

to

```
sameSite: 'strict',
secure: false,
```

In this way, an app hosted on `localhost` (assuming the cache-server is also served on localhost)
will store the authentication cookies even if the requests aren't sent over a
secure connection.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Release Notes

Release note is generated using [standard-version](https://www.npmjs.com/package/standard-version) which generates
`CHANGELOG.md` based on last tag version and commits history.
this can be generated using the command.

```bash
 $ npm run release
```
