### IAM Cache Server

## Prepare


```bash
# development
$ git checkout develop
$ cp .env.dist .env
$ cp docker-compose.dev.yml docker.compose.yml
```

```bash
# production mode
$ git checkout master
$ cp .env.dist .env
$ cp docker-compose.prod.yml docker.compose.yml
```

### Populate env file for development

The following values can be used in the `.env` file
#### DB Config
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=dev

#### Redis
REDIS_VERSION=6.0.8 
REDIS_PASSWORD="password"
REDIS_PORT=6379
REDIS_HOST=localhost

## Installation

```bash
$ npm install
$ npm run docker:build
$ npm run generate:jwtkeys
```

## Running the app

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

