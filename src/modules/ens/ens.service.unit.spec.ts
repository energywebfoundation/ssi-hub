/* eslint-disable @typescript-eslint/no-explicit-any */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Provider } from '../../common/provider';
import {
  IAppDefinition,
  IOrganizationDefinition,
  IRoleDefinition,
} from '@energyweb/credential-governance';
import { EnsService } from './ens.service';
import { OrganizationService } from '../organization/organization.service';
import { RoleService } from '../role/role.service';
import { ApplicationService } from '../application/application.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Logger } from '../logger/logger.service';
import { StakingService } from '../staking/staking.service';
import { utils } from 'ethers';
import { SentryTracingService } from '../sentry/sentry-tracing.service';

const { namehash } = utils;

dotenv.config();

const MockRoleService = {
  handleRoleSyncWithEns: jest.fn(),
  remove: jest.fn(),
  getByNamespace: jest.fn(),
  getByNamehash: jest.fn(),
  removeByNameHash: jest.fn(),
};
const MockApplicationService = {
  handleAppSyncWithEns: jest.fn(),
  remove: jest.fn(),
  getByNamespace: jest.fn(),
  getByNamehash: jest.fn(),
  removeByNameHash: jest.fn(),
};
const MockOrgService = {
  handleOrgSyncWithEns: jest.fn(),
  remove: jest.fn(),
  getByNamespace: jest.fn(),
  getByNamehash: jest.fn(),
  removeByNameHash: jest.fn(),
};
const MockStakingService = {};
const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const MockSentryTracing = {
  startTransaction: jest.fn(),
};

export const ORG_MOCK_DATA: IOrganizationDefinition = {
  orgName: 'onion',
  description: '',
  websiteUrl: '',
  logoUrl: '',
  others: {
    a: '1',
    b: '2',
    c: '3',
  },
};

const APP_MOCK_DATA: IAppDefinition = {
  appName: 'onionapp',
  description: '',
  websiteUrl: '',
  logoUrl: '',
  others: {
    a: '1',
    b: '2',
    c: '3',
  },
};

const ROLE_MOCK_DATA: IRoleDefinition = {
  version: 1,
  roleType: 'app',
  roleName: 'admin',
  fields: [
    {
      fieldType: 'a',
      label: 'bb',
      pattern: 'ccc',
    },
  ],
  metadata: {
    a: '1',
    b: '2',
    c: '3',
  },
  issuer: {
    issuerType: 'issuer',
    did: ['did_0000000'],
  },
  enrolmentPreconditions: [],
};

describe('EnsService', () => {
  let service: EnsService;
  let module: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        SchedulerRegistry,
        EnsService,
        Provider,
        {
          provide: OrganizationService,
          useValue: MockOrgService,
        },
        {
          provide: StakingService,
          useValue: MockStakingService,
        },
        {
          provide: RoleService,
          useValue: MockRoleService,
        },
        {
          provide: ApplicationService,
          useValue: MockApplicationService,
        },
        {
          provide: Logger,
          useValue: MockLogger,
        },
        {
          provide: SentryTracingService,
          useValue: MockSentryTracing,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<EnsService>(EnsService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await app.close();
  });

  describe('Sync ENS', () => {
    it('syncENS() it should attempt to delete a deregistered namespace using orgService', async () => {
      const name = 'myorg.daniel.iam.ewc';
      const hash = namehash(name);
      jest.spyOn(service, 'syncNamespace');
      jest.spyOn(MockOrgService, 'getByNamehash').mockResolvedValueOnce(true);
      jest
        .spyOn(MockOrgService, 'removeByNameHash')
        .mockResolvedValueOnce(true);
      jest
        .spyOn(service as any, 'getAllNamespaces')
        .mockResolvedValueOnce([name]);
      await service.syncENS();
      expect(MockLogger.log).toHaveBeenCalledWith(
        expect.stringContaining(
          `OrgDeleted: successfully removed deregistered org with namehash ${hash}`
        )
      );
      expect(MockOrgService.removeByNameHash).toHaveBeenCalledWith(hash);
    });

    it('syncENS() it should attempt to delete a deregistered namespace using roleService', async () => {
      const name = 'myrole.daniel.iam.ewc';
      const hash = namehash(name);
      jest.spyOn(service, 'syncNamespace');
      jest.spyOn(MockRoleService, 'getByNamehash').mockResolvedValueOnce(true);
      jest
        .spyOn(service as any, 'getAllNamespaces')
        .mockResolvedValueOnce([name]);
      jest
        .spyOn(MockRoleService, 'removeByNameHash')
        .mockResolvedValueOnce(true);
      await service.syncENS();
      expect(MockLogger.log).toHaveBeenCalledWith(
        expect.stringContaining(
          `RoleDeleted: successfully removed deregistered role with namehash ${hash}`
        )
      );
      expect(MockRoleService.removeByNameHash).toHaveBeenCalledWith(hash);
    });

    it('syncENS() it should attempt to delete a deregistered namespace using appService', async () => {
      const name = 'myapplication.daniel.iam.ewc';
      const hash = namehash(name);
      jest.spyOn(service, 'syncNamespace');
      jest
        .spyOn(MockApplicationService, 'getByNamehash')
        .mockResolvedValueOnce(true);
      jest
        .spyOn(MockApplicationService, 'removeByNameHash')
        .mockResolvedValueOnce(true);
      jest
        .spyOn(service as any, 'getAllNamespaces')
        .mockResolvedValueOnce([name]);
      await service.syncENS();
      expect(MockLogger.log).toHaveBeenCalledWith(
        expect.stringContaining(
          `AppDeleted: successfully removed deregistered app with namehash ${hash}`
        )
      );
      expect(MockApplicationService.removeByNameHash).toHaveBeenCalledWith(
        hash
      );
    });

    it('syncENS() malfunctioned metadata should not be sync', async () => {
      jest.spyOn(service, 'syncNamespace');
      jest
        .spyOn(service as any, 'getAllNamespaces')
        .mockResolvedValueOnce(['apps.daniel.iam.ewc']);
      jest
        .spyOn((service as any).domainReader, 'readName')
        .mockResolvedValueOnce('apps.daniel.iam.ewc');
      const serviceDomainReaderReadFn = jest.spyOn(
        (service as any).domainReader,
        'read'
      );
      const serviceSyncNamespaceFn = jest.spyOn(service, 'syncNamespace');

      await service.syncENS();
      expect(serviceDomainReaderReadFn).toHaveBeenCalledTimes(0);
      expect(serviceSyncNamespaceFn).toHaveBeenCalledTimes(0);
      expect(MockLogger.error).toHaveBeenCalledTimes(0);
    }, 60000);

    it('eventHandler() should filter out roles and apps domains from syncing', async () => {
      const appDomain = 'apps.daniel.iam.ewc';
      jest
        .spyOn((service as any).domainReader, 'readName')
        .mockResolvedValueOnce(appDomain);

      const serviceDomainReaderReadFn = jest.spyOn(
        (service as any).domainReader,
        'read'
      );
      const serviceSyncNamespaceFn = jest.spyOn(service, 'syncNamespace');

      await (service as any).eventHandler({
        hash: namehash(appDomain),
      });
      expect(serviceDomainReaderReadFn).toHaveBeenCalledTimes(0);
      expect(serviceSyncNamespaceFn).toHaveBeenCalledTimes(0);
      expect(MockLogger.error).toHaveBeenCalledTimes(0);
    });
  });

  describe('ENS Sync Validation', () => {
    it('syncNamespace() Validate and accept APP Sync Data', async () => {
      const namespacehash = namehash('onionapp.app.onion.iam.ewc');
      const mockAppServiceSpy = jest.spyOn(
        MockApplicationService,
        'handleAppSyncWithEns'
      );
      await service.syncNamespace({
        data: APP_MOCK_DATA,
        namespace: 'onionapp.apps.onion.iam.ewc',
        owner: 'onion',
        hash: namespacehash,
      });
      expect(MockLogger.debug).not.toHaveBeenCalled();
      expect(mockAppServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: APP_MOCK_DATA,
          namespace: 'onionapp.apps.onion.iam.ewc',
          owner: 'onion',
          namehash: namespacehash,
        })
      );
    });

    it('syncNamespace() Validate and reject APP Sync Data', async () => {
      const namespacehash = namehash('onionapp.app.onion.iam.ewc');
      const appSyncData = {
        data: APP_MOCK_DATA,
        namespace: 'onionapp.app.onion.iam.ewc',
        owner: 'onion',
        hash: namespacehash,
      };

      const mockAppServiceSpy = jest.spyOn(
        MockApplicationService,
        'handleAppSyncWithEns'
      );
      await service.syncNamespace(appSyncData);
      expect(MockLogger.debug).toHaveBeenCalledWith(
        `Bailed: App with namespace:${appSyncData.namespace} does not have 'apps' subdomain`
      );
      expect(mockAppServiceSpy).not.toHaveBeenCalled();
    });

    it('syncNamespace() Validate and accept ROLE Sync Data with roleType app', async () => {
      const namespacehash = namehash('test.roles.onion.apps.myorg.org.iam.ewc');
      const mockRoleServiceSpy = jest.spyOn(
        MockRoleService,
        'handleRoleSyncWithEns'
      );
      await service.syncNamespace({
        data: ROLE_MOCK_DATA,
        namespace: 'test.roles.onion.apps.myorg.org.iam.ewc',
        owner: 'carrot',
        hash: namespacehash,
      });
      expect(MockLogger.debug).not.toHaveBeenCalled();
      expect(mockRoleServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: ROLE_MOCK_DATA,
          namespace: 'test.roles.onion.apps.myorg.org.iam.ewc',
          owner: 'carrot',
          namehash: namespacehash,
        })
      );
    });

    it('syncNamespace() Validate and accept ROLE Sync Data with roleType org', async () => {
      const namespacehash = namehash('test.roles.onion.iam.ewc');
      ROLE_MOCK_DATA.roleType = 'org';
      const mockRoleServiceSpy = jest.spyOn(
        MockRoleService,
        'handleRoleSyncWithEns'
      );
      await service.syncNamespace({
        data: ROLE_MOCK_DATA,
        namespace: 'test.roles.onion.iam.ewc',
        owner: 'carrot',
        hash: namespacehash,
      });
      expect(MockLogger.debug).not.toHaveBeenCalled();
      expect(mockRoleServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: ROLE_MOCK_DATA,
          namespace: 'test.roles.onion.iam.ewc',
          owner: 'carrot',
          namehash: namespacehash,
        })
      );
    });

    it('syncNamespace() Validate and reject ROLE Sync Data with roleType custom', async () => {
      const namespacehash = namehash('test.roles.onionapp.apps.onion.iam.ewc');
      ROLE_MOCK_DATA.roleType = 'custom';
      const mockRoleServiceSpy = jest.spyOn(
        MockRoleService,
        'handleRoleSyncWithEns'
      );
      await service.syncNamespace({
        data: ROLE_MOCK_DATA,
        namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
        owner: 'carrot',
        hash: namespacehash,
      });
      expect(MockLogger.debug).toHaveBeenCalledWith(
        `Bailed: Roletype ${ROLE_MOCK_DATA.roleType} is not a valid roletype`
      );
      expect(mockRoleServiceSpy).not.toHaveBeenCalled();
    });

    it('syncNamespace() Validate ORG Sync Data', async () => {
      const namespacehash = namehash('onion.iam.ewc');
      const mockOrgServiceSpy = jest.spyOn(
        MockOrgService,
        'handleOrgSyncWithEns'
      );
      await service.syncNamespace({
        data: ORG_MOCK_DATA,
        namespace: 'onion.iam.ewc',
        owner: 'onion',
        hash: namespacehash,
      });
      expect(mockOrgServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: ORG_MOCK_DATA,
          namespace: 'onion.iam.ewc',
          owner: 'onion',
          namehash: namespacehash,
        })
      );
    });
  });
});
