# stubs

`empty-module` is an intentionally empty package. It replaces dependencies that `passport-did-auth`
declares but never loads at runtime, so they are not installed:

- `@ensdomains/ens-contracts`: every published version is flagged as malware
  ([GHSA-58x9-4xmp-8mg5](https://github.com/advisories/GHSA-58x9-4xmp-8mg5)).
  The ABIs this project needs are vendored in `abi/` instead.
- `ganache-cli`: bundles many vulnerable packages that npm cannot update or override.

It is wired up in `package.json` with a `file:` dependency plus a `$` override, because npm resolves a
`file:` override relative to the dependent package rather than the project root:

```json
"dependencies": {
  "@ensdomains/ens-contracts": "file:stubs/empty-module",
  "ganache-cli": "file:stubs/empty-module"
},
"overrides": {
  "passport-did-auth": {
    "@ensdomains/ens-contracts": "$@ensdomains/ens-contracts",
    "ganache-cli": "$ganache-cli"
  }
}
```

Remove these entries once `passport-did-auth` no longer depends on these packages.
