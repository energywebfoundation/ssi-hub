export const getCredential = (options: {
  subject: string;
  issuerFields: { key: string; value: string }[];
  namespace: string;
  version: string;
}) => ({
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  id: 'urn:uuid:7f94d397-3e70-4a43-945e-1a13069e636f',
  type: ['VerifiableCredential', 'EWFRole'],
  credentialSubject: {
    id: options.subject,
    issuerFields: options.issuerFields,
    role: {
      namespace: options.namespace,
      version: options.version,
    },
  },
  issuer: 'did:example:123456789af312312i',
  issuanceDate: '2022-03-18T08:57:32.477Z',
  proof: {
    '@context': 'https://demo.spruceid.com/ld/eip712sig-2021/v0.1.jsonld',
    type: 'EthereumEip712Signature2021',
    proofPurpose: 'assertionMethod',
    proofValue:
      '0x9abee96d684a146aa0b30498d8799ee9a4f8f54488c73d4a4fba3a6fb94eca8764af54f15a24deba0dd9ee2f460d1f6bd174a4ca7504a72d6b1fe9b739d613fe1b',
    verificationMethod:
      'did:pkh:eth:0x2fbf1be19d90a29aea9363f4ef0b6bf1c4ff0758#Recovery2020',
    created: '2021-06-17T17:16:39.791Z',
    eip712Domain: {
      domain: {
        name: 'EthereumEip712Signature2021',
      },
      messageSchema: {},
      primaryType: 'VerifiableCredential',
    },
  },
});
