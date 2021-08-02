import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Provider } from '../../common/provider';
import {
  IAppDefinition,
  IOrganizationDefinition,
  IRoleDefinition,
} from '@energyweb/iam-contracts';
import { EnsService } from './ens.service';
import { OrganizationService } from '../organization/organization.service';
import { RoleService } from '../role/role.service';
import { ApplicationService } from '../application/application.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const MockRoleService = {
  handleRoleSyncWithEns: jest.fn(),
};
const MockApplicationService = {
  handleAppSyncWithEns: jest.fn(),
};
const MockOrgService = {
  handleOrgSyncWithEns: jest.fn(),
};
const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
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
    jest.clearAllMocks();
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
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<EnsService>(EnsService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('ENS Sync Validation', () => {
    it('syncNamespace() Validate and accept APP Sync Data', async () => {
      const mockAppServiceSpy = jest.spyOn(
        MockApplicationService,
        'handleAppSyncWithEns',
      );
      await service.syncNamespace({
        data: APP_MOCK_DATA,
        namespace: 'onionapp.apps.onion.iam.ewc',
        owner: 'onion',
      });
      expect(MockLogger.debug).not.toHaveBeenCalled();
      expect(mockAppServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: APP_MOCK_DATA,
          namespace: 'onionapp.apps.onion.iam.ewc',
          owner: 'onion',
        }),
      );
    }, 30000);

    it('syncNamespace() Validate and reject APP Sync Data', async () => {
      const appSyncData = {
        data: APP_MOCK_DATA,
        namespace: 'onionapp.app.onion.iam.ewc',
        owner: 'onion',
      };

      const mockAppServiceSpy = jest.spyOn(
        MockApplicationService,
        'handleAppSyncWithEns',
      );
      await service.syncNamespace(appSyncData);
      expect(MockLogger.debug).toHaveBeenCalledWith(
        `Bailed: App with namespace:${appSyncData.namespace} does not have 'apps' subdomain`,
      );
      expect(mockAppServiceSpy).not.toHaveBeenCalled();
    }, 30000);

    it('syncNamespace() Validate and accept ROLE Sync Data with roleType app', async () => {
      const mockRoleServiceSpy = jest.spyOn(
        MockRoleService,
        'handleRoleSyncWithEns',
      );
      await service.syncNamespace({
        data: ROLE_MOCK_DATA,
        namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
        owner: 'carrot',
      });
      expect(MockLogger.debug).not.toHaveBeenCalled();
      expect(mockRoleServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: ROLE_MOCK_DATA,
          namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
          owner: 'carrot',
        }),
      );
    }, 30000);
    it('syncNamespace() Validate and accept ROLE Sync Data with roleType org', async () => {
      ROLE_MOCK_DATA.roleType = 'org';
      const mockRoleServiceSpy = jest.spyOn(
        MockRoleService,
        'handleRoleSyncWithEns',
      );
      await service.syncNamespace({
        data: ROLE_MOCK_DATA,
        namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
        owner: 'carrot',
      });
      expect(MockLogger.debug).not.toHaveBeenCalled();
      expect(mockRoleServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: ROLE_MOCK_DATA,
          namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
          owner: 'carrot',
        }),
      );
    }, 30000);
    it('syncNamespace() Validate and reject ROLE Sync Data with roleType custom', async () => {
      ROLE_MOCK_DATA.roleType = 'custom';
      const mockRoleServiceSpy = jest.spyOn(
        MockRoleService,
        'handleRoleSyncWithEns',
      );
      await service.syncNamespace({
        data: ROLE_MOCK_DATA,
        namespace: 'test.roles.onionapp.apps.onion.iam.ewc',
        owner: 'carrot',
      });
      expect(MockLogger.debug).toHaveBeenCalledWith(
        `Bailed: Roletype ${ROLE_MOCK_DATA.roleType} is not a valid roletype`,
      );
      expect(mockRoleServiceSpy).not.toHaveBeenCalled();
    }, 30000);

    it('syncNamespace() Validate ORG Sync Data', async () => {
      const mockOrgServiceSpy = jest.spyOn(
        MockOrgService,
        'handleOrgSyncWithEns',
      );
      await service.syncNamespace({
        data: ORG_MOCK_DATA,
        namespace: 'onion.iam.ewc',
        owner: 'onion',
      });
      expect(mockOrgServiceSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: ORG_MOCK_DATA,
          namespace: 'onion.iam.ewc',
          owner: 'onion',
        }),
      );
    }, 30000);
  });
});
