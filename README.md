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

