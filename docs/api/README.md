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

## Commit Message Guidelines

This repository follows [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

### Commit message format
`<type>(<scope>): <subject>`  

Samples:  
```
feat(login.strategy): add optional numBlocksBack config
feat(deps): bump `passport-did-auth` and `iam-contracts` versions to latest
```

### Using CLI
If you want to be lead step-by-step you can use `cz-cli` which will help you setup commit message according to our standards   
`$ npm run commit`  

In case if commit got interrupted (i.e. failed tests, failed eslint etc.) you can run  
`$ npm run commit:retry`

### Troubleshooting

`error: unknown option 'hook'`
  
In this case you need to initialize commitizen locally  
`$ commitizen init cz-conventional-changelog --save-dev --save-exact`

### Connection pooling

To calculate maximum number of connections use following formula:  
`{DBInstanceClassMemory/12582880}` - for example t2.micro has 512 MB RAM so maximum connections will be `(512*1024*1024)/12582880 ~= 40,`  

Then divide maximum connections number by number of maximum amount of IAM Cache Server instances.  
If you are going to host 4 instances of ICS then `DB_MAXIMUM_CONNECTION_POOL` should be `40/4=10`
