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

  describe('verifyEnrolmentPreconditions', () => {
    it('should thrown an error if a precondition type is a type other than "role"', async () => {
      const enrolmentPreconditions = [
        { type: PreconditionType.Role, conditions: ['conditionone.org.ewc'] },
        {
          type: 'someType' as PreconditionType,
          conditions: ['conditionone.org.ewc'],
        },
      ];
      await expect(
        service.verifyEnrolmentPreconditions(
          enrolmentPreconditions,
          resolvedCredential.payload.did,
          'claimType'
        )
      ).rejects.toThrowError();
    });
    it('should throw an error if the resolveCredentialAndVerify returns an error', async () => {
      const mockError = {
        isVerified: false,
        errors: [`Issuer not authorised to issue the credential`],
      };
      jest
        .spyOn(service, 'resolveCredentialAndVerify')
        .mockResolvedValueOnce(mockError);
      jest
        .spyOn(service, 'verifyClaimPresentInDidDocument')
        .mockResolvedValueOnce(true);
      const enrolmentPreconditions = [
        { type: PreconditionType.Role, conditions: ['conditionone.org.ewc'] },
      ];
      await expect(
        service.verifyEnrolmentPreconditions(
          enrolmentPreconditions,
          resolvedCredential.payload.did,
          'claimType'
        )
      ).rejects.toThrowError(
        `Role enrolment precondition not met for user: ${
          resolvedCredential.payload.did
        } for role: ${'conditionone.org.ewc'}. Verification errors for enrolment preconditions: ${JSON.stringify(
          mockError.errors
        )}`
      );
    });
    it('should throw an error if required roles are not in the User DID Document', async () => {
      // const mockError = {
      //   isVerified: false,
      //   errors: [`Issuer not authorised to issue the credential`],
      // };
      // jest
      //   .spyOn(service, 'resolveCredentialAndVerify')
      //   .mockResolvedValueOnce(mockError);
      jest
        .spyOn(service, 'verifyClaimPresentInDidDocument')
        .mockResolvedValueOnce(false);
      const enrolmentPreconditions = [
        { type: PreconditionType.Role, conditions: ['conditionone.org.ewc'] },
      ];
      await expect(
        service.verifyEnrolmentPreconditions(
          enrolmentPreconditions,
          resolvedCredential.payload.did,
          'claimType'
        )
      ).rejects.toThrowError(
        `Role enrolment precondition not met for user: ${resolvedCredential.payload.did} and role: claimType. User does not have the required enrolment preconditons.`
      );
    });
  });
});
