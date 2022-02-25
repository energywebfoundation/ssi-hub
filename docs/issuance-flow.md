# Issuance approaches

This document describes a generic HTTP duplex (client-server) verifiable credential issuance flow.

## Issuance Flow Diagram

The following is a sequence diagram of an issuance flow.

Points of notes:
- The issuing `ssi-hub` must be able to authorize the approval of the credential issuance request
- The requester `ssi-hub` can be removed if credential applications and issued credentials can be stored locally
(if using a mobile wallet instead of a web wallet, for example)

Deviations from current SB->ssi-hub flow:
- Currently SB prepares credential application from credential governance definition directly

```mermaid
sequenceDiagram
  actor R as requester
  participant RSH as Requester SSI Hub
  participant RSB as Web SSI Wallet (Switchboard)
  participant ISH as Issuer SSI Hub
  participant IService as Issuance Service
  actor I as issuer
  participant ISB as Web SSI Wallet (Switchboard)
  participant CD as Credential Definition Repository

  rect rgb(243, 255, 255)
  note right of R: initiate exchange
    R->>RSB: provide vc_request_url (e.g. from QR code or link)
    RSB->>ISH: initiate credential exchange

    activate ISH
    alt using local Exchange Definition
      ISH->>ISH: 
    else using Credential Governance Definition
      ISH->>CD: retrieve Credential Definition
    end
      ISH-->>RSB: return VP request
    deactivate ISH
  end

  rect rgb(255, 243, 255)
  note right of R: submit credential application
    RSB->>R: display required presentation data
    R-->>RSB: enter required input and/or select credentials
    RSB->>R: request credential application (presentation) signature
    R-->>RSB: approve signature
  end
  
  rect rgb(255, 255, 235)
  note right of R: process credential application
  alt mediated application processing
    RSB->>ISH: submit credential application to issuer hub
    activate ISH
      ISH-->>RSB: reply with "mediation in progress"
    deactivate ISH
      alt human mediated application review
        I->>ISB: query outstanding credential applications
        activate ISB
          ISB->>ISH: query outstanding credential applications
          activate ISH
            ISH-->>ISB: return credential application
          deactivate ISH
          ISB-->>I: display outstanding credential applications
        deactivate ISB
        I->>I: review application
        I->>ISB: approve application (issue VC)
        ISB->>ISH: store issued VC
      else service mediated application review
        ISH->>IService: notify issuance service of new application
        IService->>ISH: query outstanding credential applications
        activate ISH
          ISH-->>IService: return credential application
        deactivate ISH
        IService->>IService: process credential application
        IService->>ISH: issue credential
        ISH-->>IService: return VC
        IService->>ISH: submit application result
      end
    R->>RSB: query outstanding credential applications
    RSB->>RSH: query outstanding credential applications
    RSB->>ISH: query credential application status
    ISH-->>RSB: return issued credential
    RSB->>RSH: store issued credential
    RSB-->>R: display issued credential to requester
  else unmediated application processing
    RSB->>ISH: submit credential application to issuer hub
    activate ISH
    ISH->>IService: notify issuance service of new application
    IService->>ISH: query outstanding credential applications
    activate ISH
      ISH-->>IService: return credential application
    deactivate ISH
    IService->>IService: process credential application
    IService->>ISH: issue credential
    ISH-->>IService: return VC
    IService->>ISH: submit application result
    ISH-->>RSB: return VC
    deactivate ISH
  end
  end


```

## Exchange Definitions

Energy Web is in the process of developing an object schema by which an Exchange Definition can be specified to `ssi-hub`.
(See https://github.com/energywebfoundation/ssi/pull/31 for more details)

An example Exchange Definition is an shown.
```json
{
  // "exchangeId" identifies the exchange at the server (https://w3c-ccg.github.io/vc-api/#initiate-exchange)
  "exchangeId": "permanent-resident-card-presentation",
  // "query" defines what information should be required from the requester (https://w3c-ccg.github.io/vp-request-spec/#query-types)
  "query": [
    {
      "type": "PresentationDefinition",
      "credentialQuery": [{
        ...some presentation definition
      }]
    }
  ],
  // "interactServices" defines where a credential exchange can be initiated (https://w3c-ccg.github.io/vp-request-spec/#interaction-types)
  "interactServices": [
    {
      "type": "UnmediatedHttpPresentationService2021",
      "baseUrl": "http://localhost:3000"
    }
  ]
}
```
```json
{
    // "exchangeId" identifies the exchange at the server (https://w3c-ccg.github.io/vc-api/#initiate-exchange)
    "exchangeId": "permanent-resident-card-issuance",
    // "query" defines what information should be required from the requester (https://w3c-ccg.github.io/vp-request-spec/#query-types)
    "query": [
      {
        "type": "DIDAuth",
        "credentialQuery": []
      }
    ],
    // "interactServices" defines where a credential exchange can be initiated (https://w3c-ccg.github.io/vp-request-spec/#interaction-types)
    "interactServices": [
      {
        "type": "UnmediatedHttpPresentationService2021",
        "baseUrl": "http://localhost:3000"
      }
    ]
}
```

## ENS Credential Governance Definitions

Energy Web has developed an approach which uses ENS namespaces to define credential metadata.
The ENS namespace is used as the identifier of the credential definition and the credential metadata is stored by an ENS Resolver.

Below is an example credential (role) definition that is currently returned from the EnergyWeb role system.

The credential definition currently serves several purposes:
- It defines the information that issuers should require from requestors (`fields` and `enrolementPreconditions` properties)
- It defines which identities are authorized to issue the credential (`issuer` property)
- It defines data which should be included in an issued credential (`issuerFields` property)

Additional properties which may be helpful include:
- An `interactServices` property which communicates where the credential can be requested

```json
{
  "id": 657,
  "name": "battery",
  // "namespace" is the ENS namespace of the credential definition
  "namespace": "battery.roles.assetmanagement.apps.samplecorp.iam.ewc",
  // "namehash" is the ENS namehash of the namespace
  "namehash": "0x147aa42525ed471265e8bed71cb0a903520aae1a1c337d572fd0b9d45957013b",
  // "owner" is the EWC account that is authorized to update the Credential Definition
  "owner": "0x829b91Fa3e91EA4448365ADA58C7Bad1Ff142866",
  "definition": {
    // "fields" are additional fields that a requestor must enter prior to being given a credential
    "fields": [
      {
        "label": "Voltage",
        "maxValue": 10,
        "minValue": 5,
        "required": null,
        "fieldType": "number"
      }
    ],
    "presenationDefinition: []
    // "issuer" defines which DIDs are allowed to read 
    "issuer": {
      "did": [
        "did:ethr:volta:0x829b91Fa3e91EA4448365ADA58C7Bad1Ff142866"
      ],
      "issuerType": "DID"
    },
    "version": 1,
    "roleName": "battery",
    "roleType": "app",
    // "issuerFields" 
    "issuerFields": [
      {
        "label": "Serial Number",
        "pattern": null,
        "required": null,
        "fieldType": "text",
        "maxLength": 20,
        "minLength": 3
      }
    ],
    // "enrolmentPreconditions" are credentials that a requestor must provide
    "enrolmentPreconditions": [
      {
        "type": "role",
        "conditions": [
          "manufactured.roles.assetmanagement.apps.samplecorp.iam.ewc"
        ]
      }
    ]
  }
}
```