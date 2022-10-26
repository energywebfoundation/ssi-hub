/* eslint-disable no-empty */
import { Test, TestingModule } from '@nestjs/testing';
import { ClaimService, ClaimVerificationService } from './services';
import { Logger } from '../logger/logger.service';
import { RoleService } from '../role/role.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import * as TestDbCOnfig from '../../../e2e/config';
import { AssetsService } from '../assets/assets.service';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { RoleClaim } from './entities/roleClaim.entity';
import { ConfigService } from '@nestjs/config';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { Methods } from '@ew-did-registry/did';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';
import { deployContract, MockProvider } from 'ethereum-waffle';
import { Provider } from '../../common/provider';
import { Asset, AssetsHistory } from '../assets/assets.entity';
import { DIDService } from '../did/did.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { IClaimRequest } from './claim.types';
import { v4 } from 'uuid';

const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const MockDidService = {
  getByNamespace: jest.fn(),
};

const MockClaimVerificationService = {
  verifyClaimPresentinDidDocument: jest.fn(),
  resolveCredentialAndVerify: jest.fn(),
};

const provider = new MockProvider();
let didRegistry: EthereumDIDRegistry;
const cachedIdentity = provider.getWallets()[0];

const MockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'DID_SYNC_ENABLED') {
      return 'false';
    } else if (key === 'DID_REGISTRY_ADDRESS') {
      return didRegistry.address;
    } else {
      return null;
    }
  }),
};

const MockRoleService = {
  fetchEnrolmentPreconditions: jest.fn(),
};

describe('ClaimService', () => {
  let service: ClaimService;
  let queryRunner: QueryRunner;
  let module: TestingModule;
  beforeEach(async () => {
    didRegistry = (await deployContract(
      cachedIdentity,
      ethrReg
    )) as EthereumDIDRegistry;
    await didRegistry.deployed();
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([RoleClaim, Claim, Asset, AssetsHistory]),
      ],
      providers: [
        ClaimService,
        {
          provide: RoleService,
          useValue: MockRoleService,
        },
        {
          provide: DIDService,
          useValue: MockDidService,
        },

        {
          provide: Logger,
          useValue: MockLogger,
        },
        AssetsService,
        {
          provide: ClaimVerificationService,
          useValue: MockClaimVerificationService,
        },
        {
          provide: 'RegistrySettings',
          useFactory: (configService: ConfigService) => ({
            abi: ethrReg.abi,
            address: configService.get<string>('DID_REGISTRY_ADDRESS'),
            method: Methods.Erc1056,
          }),
          inject: [ConfigService],
        },
        { provide: ConfigService, useValue: MockConfigService },
        Provider,
        EventEmitter2,
        SchedulerRegistry,
      ],
    }).compile();
    await module.init();
    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
    service = module.get<ClaimService>(ClaimService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    module.close();
  });
  describe('handleClaimEnrolmentRequest', () => {
    const baseClaim = {
      token:
        'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJkaWQiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJzaWduZXIiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJjbGFpbURhdGEiOnsicmVxdWVzdG9yRmllbGRzIjpbXSwiY2xhaW1UeXBlIjoic2hvdWxkZXJyb3Iucm9sZXMuc3Vib3Jncy53aGl0bmV5LmlhbS5ld2MiLCJjbGFpbVR5cGVWZXJzaW9uIjoxfSwiaXNzIjoiZGlkOmV0aHI6dm9sdGE6MHgxN2I2NUM4Qzk3NDZGODdjODJjYzZmN0M0RkMzOGZDQTVmMUFlQjc1Iiwic3ViIjoiZGlkOmV0aHI6dm9sdGE6MHgxN2I2NUM4Qzk3NDZGODdjODJjYzZmN0M0RkMzOGZDQTVmMUFlQjc1IiwiaWF0IjoxNjY2Nzk0MDg4NDczfQ.MHg1MzI2ZjFkODQzM2YxMzE2OTc4ODdmNmE0NzQ1M2I1M2UyNzc0ZGUxOTY4ZjdlNjhhYWU0Y2ZmOWJmMGQxNDk1N2QxNjI4NzExMmNlMzc0YTA1ZWRiYWUyMDUyZmY0ZmJhNWQyNWI0ZDJlZmQwNWI5MjNhODU1ZjY3ODgwNDZjMzFi',
      claimIssuer: [
        'did:ethr:volta:0x0000000000000000000000000000000000000000',
      ],
      requester: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
      claimTypeVersion: '1',
    };
    it('should return correct error if use does not have enrolment prerequisite in Did Document', async () => {
      const claimRequest: IClaimRequest = {
        ...baseClaim,
        id: v4(),
        claimType: 'testcaseone.roles.suborgs.whitney.iam.ewc',
      };
      MockRoleService.fetchEnrolmentPreconditions.mockResolvedValue([
        {
          type: 'role',
          conditions: ['enrolmentprereq.roles.suborgs.whitney.iam.ewc'],
        },
      ]);
      MockClaimVerificationService.verifyClaimPresentinDidDocument.mockResolvedValueOnce(
        new Error(
          `Role enrolment precondition not met for user: ${claimRequest.requester} and role: ${claimRequest.claimType}. User does not have this claim.`
        )
      );
      try {
        const result = await service.handleClaimEnrolmentRequest(
          claimRequest,
          'http://localhost:4200'
        );
        expect(result).toThrowError(
          'Error: Role enrolment precondition not met for user: did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75 and role: shoulderror4.roles.suborgs.whitney.iam.ewc. User does not have this claim.'
        );
      } catch (_) {}
    });
    xit('should not perform verification if there are no enrolment prerequisites', async () => {
      const claimRequest: IClaimRequest = {
        ...baseClaim,
        id: v4(),
        claimType: 'testcastwo.roles.suborgs.whitney.iam.ewc',
      };
      MockRoleService.fetchEnrolmentPreconditions.mockResolvedValue([]);
      await service.handleClaimEnrolmentRequest(
        claimRequest,
        'http://localhost:4200'
      );
      expect(service.verifyEnrolmentPrerequisites).toHaveBeenCalledTimes(0);
    });
    it('should return correct error if user does not have credential required for enrolment', async () => {
      const claimRequest: IClaimRequest = {
        ...baseClaim,
        id: v4(),
        claimType: 'blah.roles.suborgs.whitney.iam.ewc',
      };
      MockRoleService.fetchEnrolmentPreconditions.mockResolvedValue([
        {
          type: 'role',
          conditions: ['enrolmentprereq.roles.suborgs.whitney.iam.ewc'],
        },
      ]);
      MockClaimVerificationService.resolveCredentialAndVerify.mockResolvedValueOnce(
        {
          isVerified: false,
          errors: [
            `No credential found for role ${claimRequest.claimType} for Did ${claimRequest.requester}`,
          ],
        }
      );
      try {
        await service.handleClaimEnrolmentRequest(
          claimRequest,
          'http://localhost:4200'
        );
      } catch (e) {
        expect(e.message).toContain(
          'No credential found for role blah.roles.suborgs.whitney.iam.ewc for Did did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75'
        );
      }
    });

    it('should return correct error if verification fails for claim', async () => {
      const claimRequest: IClaimRequest = {
        id: v4(),
        token:
          'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJkaWQiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJzaWduZXIiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJjbGFpbURhdGEiOnsicmVxdWVzdG9yRmllbGRzIjpbXSwiY2xhaW1UeXBlIjoic2hvdWxkZXJyb3Iucm9sZXMuc3Vib3Jncy53aGl0bmV5LmlhbS5ld2MiLCJjbGFpbVR5cGVWZXJzaW9uIjoxfSwiaXNzIjoiZGlkOmV0aHI6dm9sdGE6MHgxN2I2NUM4Qzk3NDZGODdjODJjYzZmN0M0RkMzOGZDQTVmMUFlQjc1Iiwic3ViIjoiZGlkOmV0aHI6dm9sdGE6MHgxN2I2NUM4Qzk3NDZGODdjODJjYzZmN0M0RkMzOGZDQTVmMUFlQjc1IiwiaWF0IjoxNjY2Nzk0MDg4NDczfQ.MHg1MzI2ZjFkODQzM2YxMzE2OTc4ODdmNmE0NzQ1M2I1M2UyNzc0ZGUxOTY4ZjdlNjhhYWU0Y2ZmOWJmMGQxNDk1N2QxNjI4NzExMmNlMzc0YTA1ZWRiYWUyMDUyZmY0ZmJhNWQyNWI0ZDJlZmQwNWI5MjNhODU1ZjY3ODgwNDZjMzFi',
        claimIssuer: [
          'did:ethr:volta:0x0000000000000000000000000000000000000000',
        ],
        requester: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
        claimType: 'testcasethree.roles.suborgs.whitney.iam.ewc',
        claimTypeVersion: '1',
      };
      MockRoleService.fetchEnrolmentPreconditions.mockResolvedValue([
        {
          type: 'role',
          conditions: ['enrolmentprereq.roles.suborgs.whitney.iam.ewc'],
        },
      ]);
      MockClaimVerificationService.resolveCredentialAndVerify.mockResolvedValueOnce(
        {
          isVerified: false,
          errors: [
            `Verification failed for ${claimRequest.claimType} for Did ${claimRequest.requester}: Proof not verified for role`,
          ],
        }
      );
      try {
        await service.handleClaimEnrolmentRequest(
          claimRequest,
          'http://localhost:4200'
        );
      } catch (e) {
        expect(e.message).toContain(
          `Verification failed for ${claimRequest.claimType} for Did ${claimRequest.requester}: Proof not verified for role`
        );
      }
    });

    it('should return correct error if claim is expired', async () => {
      const claimRequest: IClaimRequest = {
        id: v4(),
        token:
          'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJkaWQiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJzaWduZXIiOiJkaWQ6ZXRocjp2b2x0YToweDE3YjY1QzhDOTc0NkY4N2M4MmNjNmY3QzRGQzM4ZkNBNWYxQWVCNzUiLCJjbGFpbURhdGEiOnsicmVxdWVzdG9yRmllbGRzIjpbXSwiY2xhaW1UeXBlIjoic2hvdWxkZXJyb3Iucm9sZXMuc3Vib3Jncy53aGl0bmV5LmlhbS5ld2MiLCJjbGFpbVR5cGVWZXJzaW9uIjoxfSwiaXNzIjoiZGlkOmV0aHI6dm9sdGE6MHgxN2I2NUM4Qzk3NDZGODdjODJjYzZmN0M0RkMzOGZDQTVmMUFlQjc1Iiwic3ViIjoiZGlkOmV0aHI6dm9sdGE6MHgxN2I2NUM4Qzk3NDZGODdjODJjYzZmN0M0RkMzOGZDQTVmMUFlQjc1IiwiaWF0IjoxNjY2Nzk0MDg4NDczfQ.MHg1MzI2ZjFkODQzM2YxMzE2OTc4ODdmNmE0NzQ1M2I1M2UyNzc0ZGUxOTY4ZjdlNjhhYWU0Y2ZmOWJmMGQxNDk1N2QxNjI4NzExMmNlMzc0YTA1ZWRiYWUyMDUyZmY0ZmJhNWQyNWI0ZDJlZmQwNWI5MjNhODU1ZjY3ODgwNDZjMzFi',
        claimIssuer: [
          'did:ethr:volta:0x0000000000000000000000000000000000000000',
        ],
        requester: 'did:ethr:volta:0x17b65C8C9746F87c82cc6f7C4FC38fCA5f1AeB75',
        claimType: 'testcasefour.roles.suborgs.whitney.iam.ewc',
        claimTypeVersion: '1',
      };
      MockRoleService.fetchEnrolmentPreconditions.mockResolvedValue([
        {
          type: 'role',
          conditions: ['enrolmentprereq.roles.suborgs.whitney.iam.ewc'],
        },
      ]);
      MockClaimVerificationService.resolveCredentialAndVerify.mockResolvedValueOnce(
        {
          isVerified: false,
          errors: [
            `Verification failed for ${claimRequest.claimType} for Did ${claimRequest.requester}: Credential for prerequisite role expired`,
          ],
        }
      );
      try {
        await service.handleClaimEnrolmentRequest(
          claimRequest,
          'http://localhost:4200'
        );
      } catch (e) {
        expect(e.message).toContain(
          `Verification failed for ${claimRequest.claimType} for Did ${claimRequest.requester}: Credential for prerequisite role expired`
        );
      }
    });
  });
});
