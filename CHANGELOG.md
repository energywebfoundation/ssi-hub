# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](2021-09-20)

### Features

- **assets:** assets caching
- **assets:** assets subscription events
- **auth:** handleOriginCheck now returns unauthorized error instead of internal server error for unknown origins
- **claim.dto:** claimTypeVersion param now requires stringNumber type
- **claim:** claim access now includes authorization check
- **claim:** adds getBySubject endpoint
- **claim:** adds claim registration types
- **claim:** ignore claimIssuer when fetching claims by subjects DIDs
- **claim:** persist onchain proof in database
- **claim:** persist subject agreement in database
- **claim:** adds staking pool service
- **role:** getAll role method
- support of apple M1 ARM based systems

### Bug Fixes

- **assets:** add type when saving asset
- **assets:** query accepted and created assets
- **claim:** return claim id from claim data
- **claim:** ignore filtering claims when roles is empty
- **claim:** filter claims by requester
- **claim:** issuedToken now optional
- **did.controller:** remove includeClaims param for /DID endpoint
- **did.service:** handle trailing slash in UNIVERSAL_RESOLVER_CONFIG
- **ens:** update iam-contracts to fix ENS Sync
- installing jwt keys

### BREAKING CHANGES

- **all endpoints:** updates all endpoints to use versioning(v1)
