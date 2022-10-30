/* eslint-disable no-empty */
import { Test, TestingModule } from '@nestjs/testing';
import {
  ClaimVerificationService,
  IssuerVerificationService,
} from './services';
import { Logger } from '../logger/logger.service';
import { DIDService } from '../did/did.service';
import { RoleCredentialResolver } from './resolvers/credential.resolver';
import {
  CredentialStatusPurpose,
  StatusListEntryType,
} from '@ew-did-registry/credentials-interface';
import { RoleEIP191JWT } from '@energyweb/vc-verification';
import { PreconditionType } from '@energyweb/credential-governance';

const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const resolvedCredential: RoleEIP191JWT = {
  eip191Jwt:
    'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJjbGFpbURhdGEiOnsicmVxdWVzdG9yRmllbGRzIjpbXSwiY2xhaW1UeXBlIjoicHJlc2lkZW50LnJvbGVzLnN1Ym9yZ3Mud2hpdG5leS5pYW0uZXdjIiwiY2xhaW1UeXBlVmVyc2lvbiI6MSwiaXNzdWVyRmllbGRzIjpbXX0sImRpZCI6ImRpZDpldGhyOnZvbHRhOjB4MTdiNjVDOEM5NzQ2Rjg3YzgyY2M2ZjdDNEZDMzhmQ0E1ZjFBZUI3NSIsInNpZ25lciI6ImRpZDpldGhyOnZvbHRhOjB4MTdiNjVDOEM5NzQ2Rjg3YzgyY2M2ZjdDNEZDMzhmQ0E1ZjFBZUI3NSIsImNyZWRlbnRpYWxTdGF0dXMiOnsiaWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvdjEvc3RhdHVzLWxpc3QvdXJuOnV1aWQ6ZjhhZDAxZGYtZDA0YS00NjY3LTlmMzYtM2M3YTdlOTBhZDQ3IiwidHlwZSI6IlN0YXR1c0xpc3QyMDIxRW50cnkiLCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC92MS9zdGF0dXMtbGlzdC91cm46dXVpZDpmOGFkMDFkZi1kMDRhLTQ2NjctOWYzNi0zYzdhN2U5MGFkNDciLCJzdGF0dXNQdXJwb3NlIjoicmV2b2NhdGlvbiIsInN0YXR1c0xpc3RJbmRleCI6IjAifSwiZXhwIjo5MDA3MTk5MjU0NzQwOTkwLCJpc3MiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJzdWIiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUifQ.MHhiMzY2MjNjZDA3OTkwNjIwNTQwNTJkNjExZjFjMjQyM2UwNjgxNWJiNzRiMDU5ODc3ZWEwMTI3MjFiNTZhZDQ3MWEwNmFjYzc0Y2Y4OTFjZWEzNjdmMzRmZDQ5YzkxN2EwMGU2NWQyZGViMmNkNWY4N2M2MjE5ZWM5NjYyMjAyYjFi',
  payload: {
    claimData: {
      fields: undefined,
      claimType: 'president.roles.suborgs.whitney.iam.ewc',
      claimTypeVersion: 1,
    },
    did: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
    signer: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
    credentialStatus: {
      id: 'http://localhost:3000/v1/status-list/urn:uuid:f8ad01df-d04a-4667-9f36-3c7a7e90ad47',
      type: 'StatusList2021Entry' as StatusListEntryType,
      statusListCredential:
        'http://localhost:3000/v1/status-list/urn:uuid:f8ad01df-d04a-4667-9f36-3c7a7e90ad47',
      statusPurpose: 'revocation' as CredentialStatusPurpose,
      statusListIndex: '0',
    },
    exp: undefined,
    iss: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
    sub: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
  },
};

const didDocument = {
  '@context': 'https://www.w3.org/ns/did/v1',
  authentication: [
    {
      type: 'owner',
      validity: { hex: '0x1ffffffffffffe', type: 'BigNumber' },
      publicKey:
        'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75#owner',
    },
  ],
  created: null,
  delegates: null,
  id: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
  service: [
    {
      id: '602b09f7-393a-446d-8ae7-11327f1182d1',
      did: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      exp: 1667399211,
      iss: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      sub: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      hash: '6a0129e709b15f88b902d2a5ecc9155695a939cd39119c80c72aa42beb398653',
      signer: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      hashAlg: 'SHA256',
      claimType: 'logexp.roles.suborgs.whitney.iam.ewc',
      issuerFields: [],
      requestorFields: [],
      serviceEndpoint: 'QmNM9atwbsPdYZXfXz8u1J8nuy3F8NCMsDPsP5sZ2tPhQd',
      claimTypeVersion: 1,
      credentialStatus: {
        id: 'http://localhost:3000/v1/status-list/urn:uuid:ed1e05cd-4f25-4cf6-b34f-e35ee80fead7',
        type: 'StatusList2021Entry',
        statusPurpose: 'revocation',
        statusListIndex: '0',
        statusListCredential:
          'http://localhost:3000/v1/status-list/urn:uuid:ed1e05cd-4f25-4cf6-b34f-e35ee80fead7',
      },
    },
    {
      id: '1f5515eb-05d5-444d-861f-811fa2d9930a',
      did: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      exp: 9007199254740990,
      iss: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      sub: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      hash: '349339c90ff752080825b2a5203bf36494652379521b927cac554d9b610ef2b3',
      signer: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      hashAlg: 'SHA256',
      claimType: 'regressiontestdid.roles.suborgs.whitney.iam.ewc',
      issuerFields: [],
      requestorFields: [],
      serviceEndpoint: 'QmaobNimcp11Sp4tio8hfqT3fjntV4jET8BnxJoNJZpjZp',
      claimTypeVersion: 1,
      credentialStatus: {
        id: 'http://localhost:3000/v1/status-list/urn:uuid:2610bf4c-029d-433e-b2ca-1ad633bc9e0b',
        type: 'StatusList2021Entry',
        statusPurpose: 'revocation',
        statusListIndex: '0',
        statusListCredential:
          'http://localhost:3000/v1/status-list/urn:uuid:2610bf4c-029d-433e-b2ca-1ad633bc9e0b',
      },
    },
  ],
  publicKey: [
    {
      id: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75#key-owner',
      type: 'Secp256k1veriKey',
      controller: '0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      publicKeyHex:
        '0x020ee3388dd3db4e3e4da39f2fdc27113161d33579c4d0350b5672bcb654ceff98',
    },
  ],
  proof: null,
  updated: null,
};

const MockDidService = {
  getById: jest.fn(),
  resolveServiceEndpoints: jest.fn(),
};

const MockIssuerVerificationService = {
  verifyIssuer: jest.fn(),
};

const MockRoleCredentialResolver = {
  getCredential: jest.fn(),
};

describe('ClaimVerificationService', () => {
  let service: ClaimVerificationService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ClaimVerificationService,
        {
          provide: DIDService,
          useValue: MockDidService,
        },
        {
          provide: Logger,
          useValue: MockLogger,
        },
        {
          provide: IssuerVerificationService,
          useValue: MockIssuerVerificationService,
        },
        {
          provide: RoleCredentialResolver,
          useValue: MockRoleCredentialResolver,
        },
      ],
    }).compile();
    await module.init();
    service = module.get<ClaimVerificationService>(ClaimVerificationService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    module.close();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processEnrolmentPreconditions', () => {
    it('should thrown an error if a precondition type is a type other than "role"', async () => {
      const enrolmentPreconditions = [
        { type: PreconditionType.Role, conditions: ['conditionone.org.ewc'] },
        {
          type: 'someType' as PreconditionType,
          conditions: ['conditionone.org.ewc'],
        },
      ];
      try {
        const result = await service.verifyEnrolmentPreconditions(
          enrolmentPreconditions,
          resolvedCredential.payload.did,
          'claimType'
        );
        expect(result).toThrowError(
          'Error: An enrolment precondition has an unsupported precondition type. Supported precondition types include: "Role"'
        );
      } catch (_) {}
    });
  });

  describe('verifyClaimPresentInDidDocument', () => {
    it('should throw an error if claim is not present in did document', async () => {
      MockDidService.getById.mockResolvedValueOnce(didDocument);

      const result = await service.verifyClaimPresentInDidDocument({
        conditions: ['examplerole.ewc'],
        userDID: didDocument.id,
      });
      expect(result).toBe(false);
    });

    it('should throw an error if claim is not present in did document', async () => {
      MockDidService.getById.mockResolvedValueOnce(didDocument);
      const result = await service.verifyClaimPresentInDidDocument({
        conditions: ['regressiontestdid.roles.suborgs.whitney.iam.ewc'],
        userDID: didDocument.id,
      });
      expect(result).toBe(true);
    });
  });
  describe('verifyRoleEIP191JWT', () => {
    it('should return no errors and isVerified as true if all verification methods succeed', async () => {
      jest.spyOn(service, 'verifyPublicClaim').mockResolvedValueOnce('string');
      MockIssuerVerificationService.verifyIssuer.mockResolvedValueOnce({
        verified: true,
        error: [],
      });
      const result = await service.verifyRoleEIP191JWT(
        resolvedCredential,
        resolvedCredential.payload.did,
        'president.roles.suborgs.whitney.iam.ewc'
      );
      expect(result).toEqual({
        errors: [],
        isVerified: true,
      });
    });
    it('should return a "proof not verified" error if proof verification fails', async () => {
      jest.spyOn(service, 'verifyPublicClaim').mockResolvedValueOnce(undefined);
      MockIssuerVerificationService.verifyIssuer.mockResolvedValueOnce({
        verified: true,
        error: [],
      });
      const result = await service.verifyRoleEIP191JWT(
        resolvedCredential,
        resolvedCredential.payload.did,
        'president.roles.suborgs.whitney.iam.ewc'
      );
      expect(result).toEqual({
        errors: [
          `Verification failed for ${resolvedCredential.payload.claimData.claimType} for ${resolvedCredential.payload.did}: Proof not verified for role`,
        ],
        isVerified: false,
      });
    });
    it('should return an "expiration" error if credential is expired', async () => {
      jest.spyOn(service, 'verifyPublicClaim').mockResolvedValueOnce('string');
      MockIssuerVerificationService.verifyIssuer.mockResolvedValueOnce({
        verified: true,
        error: [],
      });
      resolvedCredential.payload.exp = Date.now() / 1000 - 1000;
      const result = await service.verifyRoleEIP191JWT(
        resolvedCredential,
        resolvedCredential.payload.did,
        'president.roles.suborgs.whitney.iam.ewc'
      );
      expect(result).toEqual({
        errors: [
          `Verification failed for ${resolvedCredential.payload.claimData.claimType} for ${resolvedCredential.payload.did}: Credential for prerequisite role expired`,
        ],
        isVerified: false,
      });
    });
  });
});
