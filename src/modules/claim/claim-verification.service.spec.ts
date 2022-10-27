/* eslint-disable no-empty */
import { Test, TestingModule } from '@nestjs/testing';
import {
  ClaimVerificationService,
  IssuerVerificationService,
} from './services';
import { Logger } from '../logger/logger.service';
import { DIDService } from '../did/did.service';
import { RoleCredentialResolver } from './resolvers/credential.resolver';

const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
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
  // let queryRunner: QueryRunner;
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
    it('should throw a "no credential found" error if there is no resolved credential', async () => {
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
  });
});
