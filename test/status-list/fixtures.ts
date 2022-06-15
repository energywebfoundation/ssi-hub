export const getEWFVerifiableCredential = (issuer: string) => ({
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  id: 'urn:uuid:b40311fa-cf70-4fec-b268-52c3055b2a68',
  type: ['VerifiableCredential', 'EWFRole'],
  credentialSubject: {
    id: issuer,
    role: { namespace: 'test1.roles.e2e.iam.ewc', version: '1' },
    issuerFields: [{ key: 'foo', value: 'bar' }],
  },
  issuer,
  issuanceDate: '2022-05-30T10:00:17.196Z',
  proof: {
    '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
    type: 'EthereumEip712Signature2021',
    proofPurpose: 'assertionMethod',
    proofValue:
      '0xc57fd9ca178fc45ca01be207bfdab925898ac779825eb7700a9bce41318570c4480b3a147e60ff2abb1fb00471fb0d53e46a353bc202996c5b67d46ab3c78ba61c',
    verificationMethod: `${issuer}#controller`,
    created: '2022-05-30T10:00:17.196Z',
    eip712Domain: {
      domain: {},
      messageSchema: {
        CredentialStatus: [
          { name: 'id', type: 'string' },
          { name: 'type', type: 'string' },
          { name: 'statusPurpose', type: 'string' },
          { name: 'statusListIndex', type: 'string' },
          { name: 'statusListCredential', type: 'string' },
        ],
        CredentialSubject: [
          { name: 'id', type: 'string' },
          { name: 'role', type: 'EWFRole' },
          { name: 'issuerFields', type: 'IssuerFields[]' },
        ],
        EIP712Domain: [],
        EWFRole: [
          { name: 'namespace', type: 'string' },
          { name: 'version', type: 'string' },
        ],
        IssuerFields: [
          { name: 'key', type: 'string' },
          { name: 'value', type: 'string' },
        ],
        Proof: [
          { name: '@context', type: 'string' },
          { name: 'verificationMethod', type: 'string' },
          { name: 'created', type: 'string' },
          { name: 'proofPurpose', type: 'string' },
          { name: 'type', type: 'string' },
        ],
        VerifiableCredential: [
          { name: '@context', type: 'string[]' },
          { name: 'id', type: 'string' },
          { name: 'type', type: 'string[]' },
          { name: 'issuer', type: 'string' },
          { name: 'issuanceDate', type: 'string' },
          { name: 'credentialSubject', type: 'CredentialSubject' },
          { name: 'credentialStatus', type: 'CredentialStatus' },
          { name: 'proof', type: 'Proof' },
        ],
      },
      primaryType: 'VerifiableCredential',
    },
  },
  credentialStatus: {
    id: 'http://localhost:3000/v1/status-list/urn:uuid:b40311fa-cf70-4fec-b268-52c3055b2a68',
    type: 'StatusList2021Entry',
    statusPurpose: 'revocation',
    statusListIndex: '0',
    statusListCredential:
      'http://localhost:3000/v1/status-list/urn:uuid:b40311fa-cf70-4fec-b268-52c3055b2a68',
  },
});

export const getStatusListCredential = (issuer: string) => ({
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/vc/status-list/2021/v1',
  ],
  id: 'http://localhost:3000/v1/status-list/urn:uuid:b40311fa-cf70-4fec-b268-52c3055b2a68',
  type: ['VerifiableCredential', 'StatusList2021Credential'],
  issuer: issuer,
  issuanceDate: '2022-05-30T14:32:24.069Z',
  credentialSubject: {
    id: 'urn:uuid:b40311fa-cf70-4fec-b268-52c3055b2a68',
    type: 'StatusList2021',
    statusPurpose: 'revocation',
    encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
  },
  proof: {
    '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
    type: 'EthereumEip712Signature2021',
    proofPurpose: 'assertionMethod',
    proofValue:
      '0xc57fd9ca178fc45ca01be207bfdab925898ac779825eb7700a9bce41318570c4480b3a147e60ff2abb1fb00471fb0d53e46a353bc202996c5b67d46ab3c78ba61c',
    verificationMethod: `${issuer}#controller`,
    created: '2022-05-30T10:00:17.196Z',
    eip712Domain: {
      domain: {},
      messageSchema: {},
      primaryType: 'VerifiableCredential',
    },
  },
});
