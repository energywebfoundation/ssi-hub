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
  describe('resolveCredentialAndVerify', () => {
    const did = 'did:ethr:01987654321';
    const roleNamespace = 'whitney.roles.ewc';
    it('should call return a No credential found" error', async () => {
      MockRoleCredentialResolver.getCredential.mockResolvedValueOnce(null);
      const result = await service.resolveCredentialAndVerify(
        did,
        roleNamespace
      );
      expect(result).toEqual({
        isVerified: false,
        errors: [
          `No credential found for role ${roleNamespace} for Did ${did}`,
        ],
      });
    });
    xit('should call the verify method if the return is of type Eip191Jwt', async () => {
      const spiedMethod = jest.spyOn(service, 'verifyRoleEIP191JWT');
      jest
        .spyOn(MockRoleCredentialResolver, 'getCredential')
        .mockResolvedValueOnce(resolvedCredential);
      await service.resolveCredentialAndVerify(
        resolvedCredential.payload.did,
        resolvedCredential.payload.claimData.claimType
      );
      expect(spiedMethod).toHaveBeenCalledTimes(1);
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
      resolvedCredential.payload.exp = Date.now() - 1000;
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
