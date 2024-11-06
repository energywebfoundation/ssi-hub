### EWF SSI Hub

## Description

The SSI Hub aims to be a server application to provide SSI and IAM functionality as a part of an SSI wallet system. It performs the following functions:
- Facilitates the credentials exchange between credential requesters and issuers.
- Account multi-tenancy. Multiple users can store their data and data access is authorized appropriately.
- Caches smart contract data such  DID documents in order to improve read-query performance.

This repository was formerly refered to as the `iam-cache-server`.

## Prepare

### Development

```bash
$ git checkout develop
$ cp .env.dev .env
$ cp docker-compose.dev.yml docker-compose.yml
```

Fill in configuration values in your `.env`. For reference look at `.env.dev`

### Production
```bash
$ git checkout master
$ cp .env.dist .env
$ cp docker-compose.prod.yml docker-compose.yml
```
In `production` empty values need to be populated in `.env` file, while `development` is prepopulated with sample values  

## Installation

```bash
$ npm install
```

On Apple Silicon (M1)  `TARGET_ARCH=amd64` may be required for dependencies to be build. So
execute `TARGET_ARCH=amd64 npm install` or set `export TARGET_ARCH=amd64` in your shell.

## Generating the keys pair
```bash
$ npm run generate:jwtkeys
```

## Generating types for contracts
```bash
$ npm run build:contracts
```

## Running the app

### development
```bash
$ docker-compose up -d
$ npm run start:dev
```

### production
```bash
$ npm run docker:start
```

### Cookies

Note that when running in dev, you can change the cookie policy in `cookies.service.ts` from

```
sameSite: 'none',
secure: true
```

to

```
sameSite: 'strict',
secure: false,
```

In this way, an app hosted on `localhost` (assuming the cache-server is also served on localhost) will store the authentication cookies even if the requests aren't sent over a secure connection.

## Test

Make sure `ENABLE_AUTH=true` is set as it is required for tests passing.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Release Notes

Release note is generated using [standard-version](https://www.npmjs.com/package/standard-version) which generates `CHANGELOG.md` based on last tag version and commits history. this can be generated using the command.

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
`LEAST({DBInstanceClassMemory/9531392}, 5000)`. This is taken from the [AWS RDS "Maximum number of database connections" documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html).

Then divide maximum connections number by number of maximum amount of IAM Cache Server instances.  
If you are going to host 4 instances of ICS then `DB_MAXIMUM_CONNECTION_POOL` should be `40/4=10`
