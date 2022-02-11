# Migration Guide

This list contains information about all breaking changes that occurred or are planned.

## List

#### Drop support for old DID format

ICS will no longer support DID in the following form `did:{method}:{address}` for all available resources. The new format will be `did:${method}:${chain_name}:${address}` and is currently supported. `iam-client-lib` in version 4 and latest is compatible with this deprecation.

**Planned implementation time**: 1 april 2022

**Compatible ICL version:** 4.0.0 and latest

---

List maintained by IAM Team.
