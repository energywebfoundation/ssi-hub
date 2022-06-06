# Revocation

## StatusList2021

https://w3c-ccg.github.io/vc-status-list-2021/ 

### StatusList2021 Sequences

#### Issue credential
```mermaid
sequenceDiagram
participant ri as Role Issuer
participant shsl as SSI-Hub StatusList Module

ri->>shsl: request a status list entry
shsl->>shsl: create entry index
shsl-->>ri: return entry index + list URL

ri->>ri: issue a VC with the credentialStatus
```

#### Revoke a credential
```mermaid
sequenceDiagram
participant rv as Revoker
participant shsl as SSI-Hub StatusList Module

rv->>shsl: request to revoke a credential (provide entry)
shsl-->>rv: return status list credential to be signed 
rv->>rv: sign credential
rv->>shsl: return status list VC
shsl->>shsl: check the DID/credentials of the revoker
opt revoker is authorized 
shsl->>shsl: persist updated status list
end
```

#### Verify a credential
```mermaid
sequenceDiagram
participant vr as Verifier
participant shsl as SSI-Hub StatusList Module

vr->>shsl: request a status list for presented VC
shsl-->>vr: return status list VC
vr->>vr: check that status list proof is valid
vr->>vr: check if presented VC is revoked
```

### Design Challenges

#### StatusList Credential should have an issuer or proof
https://w3c-ccg.github.io/vc-status-list-2021/#example-example-statuslist2021credential-0

This has the benefit that ssi-hub can not unilaterally forge revocation lists.
This means that we must get a signature from revoker.

**Problem**:
It only makes sense for a revoker to sign a list that they are authorized to sign.
We couldn't have just one list in SSI Hub, for example.
We need to check the authority of the revoker and it may not be clear who the revoker is

Solution:
- We could have one list per role definition/namespace.
  - Revoker A revokes credential A on list 1 (signing list 1).
  Revoker B then revokes credential B on list 1 (signing list 1).
  Revoker B therefore also signing the previous revocation of Revoker A (in addition to their new revocation).
  *This is acceptable as long as Revoker B trusts what Revoker A has done*.
  - This approach allows bulk revocation of credential of the same role

Other possible solutions:
- Have a 1to1 mapping of StatusListCredential to VC.
  - This elimates the [herd privacy benefits of StatusList2021](https://w3c-ccg.github.io/vc-status-list-2021/#introduction)
  - If decentralized storage was used, privacy could be restored?
  - In this case the issuer of the StatusListCredential is the revoker

**Problem**:
The issuer can't necessarily sign the StatusList2021 Credential

Solution:
- The status list isn't created until revocation. 
  - SSI-Hub could define the URL but the URL could return an `empty` (e.g. 204 No Content) status code if no revocations

Other possible solutions:
- Verifier can expect that issuer's can sign the list **if the revocation's are empty**

**Problem**: Verifying that revoker is valid could require a credential

Solution: As currently done with issuance, we require that revoker's publish their credential publicly (e.g. to IPFS) in order to revoke and in order for their revocations to be verifiable

## Class Diagrams


### NamespaceRevocations
`NamespaceRevocations` is the aggregate root that manages the `StatusListCredentials` for a given namespace.
All operations on a `StatusListCredential` should be through the `NamespaceRevocation`.
All methods on `NamespaceRevocation` should be able to be performed concurrently.

### StatusListCredential

`StatusListCredential.id` maps to `CredentialWithStatus.statusListCredential`.
This is in line with the `id` property guidance for [StatusList2021Credential](https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential).

### CredentialWithStatus

`CredentialWithStatus` represents a credential with a StatusList2021
[credentialStatus](https://www.w3.org/TR/vc-data-model/#status) property.
`CredentialWithStatus` is a separate aggregate root in order to more easily enforce the unique constraint of the `CredentialWithStatus.id`.
If the association of a credential to an entry is located within
the `NamespaceRevocations` aggregate root, then is is not possible to have a consistency boundary around the revocations of a single namespace as one would need to check that a given `CredentialWithStatus.id` has not been saved to a different `NamespaceRevocations`.


```mermaid
classDiagram

CredentialWithStatus -- StatusListEntry

class CredentialWithStatus
CredentialWithStatus : String id
CredentialWithStatus : String namespace
CredentialWithStatus : StatusListEntry entry

class StatusListEntry
StatusListEntry : String statusListIndex
StatusListEntry : String statusListCredential

StatusListCredential *-- NamespaceRevocations

class NamespaceRevocations

NamespaceRevocations : String namespace (primaryKey)
NamespaceRevocations : +createEntry() StatusListEntry
NamespaceRevocations : +updateEntry(StatusListEntry)
NamespaceRevocations : +getList() StatusListCredential

class StatusListCredential
StatusListCredential : String id
StatusListCredential : VerifiableCredential vc
StatusListCredential : String namespace (foreignKey)
```

### Approach #2

```mermaid
classDiagram

class StatusListEntry
StatusListEntry : String id
StatusListEntry : String statusListIndex
StatusListEntry : String statusListCredential

class StatusListCredential
StatusListCredential : String id
StatusListCredential : VerifiableCredential vc
StatusListCredential : String namespace (foreignKey)
```

## Pseudocode

### Getting entry for issuance

```
const namespaceRevocation = service.getNamespaceRevocation(namespace)
const entry = namespaceRevocation.createEntry()
const credential = new CredentialWithStatus(id, entry.statusListCredential, namespace) 
```

Note that `createEntry` and the creation of `CredentialWithStatus` are in sequence.
So, a claimed `entry` may failed to be associated with a `CredentialWithStatus`.
However, as entries are inexpensive and their creation can be authorized, this is acceptable.

### Update entry in NamespaceRevocation