import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { utils, Wallet } from 'ethers';
import { Application } from '../application/application.entity';
import * as TestDbCOnfig from '../../../test/config';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import { Chance } from 'chance';
import { Logger } from '../logger/logger.service';
import { OrganizationService } from '../organization/organization.service';
import { organizationFixture } from '../organization/organization.fixture';
import { Organization } from '../organization/organization.entity';
import { Role } from './role.entity';
import { ApplicationService } from '../application/application.service';
import { applicationFixture } from '../application/application.fixture';
import { roleFixture } from './role.fixture';
import { RoleService } from './role.service';
import { DIDService } from '../did/did.service';

const { namehash } = utils;
const chance = new Chance();

const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const MockOrgService = {
  getByNamespace: jest.fn(),
};

const MockAppService = {
  getByNamespace: jest.fn(),
};

const MockDIDService = {
  getByNamespace: jest.fn(),
};

describe('RoleService', () => {
  let service: RoleService;
  let module: TestingModule;
  let repo: Repository<Role>;
  let appRepo: Repository<Application>;
  let orgRepo: Repository<Organization>;
  let organizations: Organization[];
  let applications: Application[];
  let roles: Role[];
  let queryRunner: QueryRunner;
  let owner: string;

  beforeEach(async () => {
    jest.resetAllMocks();
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application, Role]),
      ],
      providers: [
        RoleService,
        { provide: OrganizationService, useValue: MockOrgService },
        { provide: DIDService, useValue: MockDIDService },
        { provide: ApplicationService, useValue: MockAppService },
        {
          provide: Logger,
          useValue: MockLogger,
        },
      ],
    }).compile();

    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
    repo = module.get<Repository<Role>>(getRepositoryToken(Role));
    appRepo = module.get<Repository<Application>>(
      getRepositoryToken(Application)
    );

    orgRepo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization)
    );

    owner = Wallet.createRandom().address;
    organizations = await organizationFixture(orgRepo, owner);
    applications = await applicationFixture(
      appRepo,
      organizations[0],
      owner,
      2
    );
    roles = await roleFixture(
      repo,
      owner,
      organizations[0],
      applications[0],
      2
    );
    service = module.get<RoleService>(RoleService);
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    module.close();
  });

  describe('create', () => {
    it('create() it should not save an role with existing namespace', async () => {
      const org = organizations[0];

      MockOrgService.getByNamespace.mockResolvedValueOnce(org);

      const testRole = chance.pickone(roles);
      const { name, owner, namespace } = testRole;

      await service.create({
        name,
        namespace,
        owner,
        definition: {
          version: 1.0,
          enrolmentPreconditions: [],
          roleType: 'app',
          requestorFields: [],
          issuerFields: [],
          issuer: {
            issuerType: 'Role',
            did: [owner],
            roleName: 'testRole',
          },
          revoker: {
            revokerType: 'Role',
            did: [owner],
            roleName: 'testRole',
          },
          roleName: name,
          metadata: {},
        },
        namehash: namehash(namespace),
        orgNamespace: org.namespace,
      });

      expect(MockLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining(`Role namespace ${namespace} already exists`)
      );

      const createdRoles = await repo.find({ where: { namespace } });
      expect(createdRoles.length).toBe(1);
    });

    it('create() it should create role', async () => {
      const name = 'testrole';
      const app = applications[0];
      MockAppService.getByNamespace.mockResolvedValueOnce(app);

      const namespace = `testrole.roles.testApps.apps.testRole.iam.ewc`;

      const role = await service.create({
        name,
        namespace,
        owner,
        definition: {
          version: 1.0,
          enrolmentPreconditions: [],
          roleType: 'app',
          requestorFields: [],
          issuerFields: [],
          issuer: {
            issuerType: 'Role',
            did: [owner],
            roleName: 'testRole',
          },
          revoker: {
            revokerType: 'Role',
            did: [owner],
            roleName: 'testRole',
          },
          roleName: name,
          metadata: {},
        },
        namehash: namehash(namespace),
        appNamespace: app.namespace,
      });

      expect(role).toBeInstanceOf(Role);
      expect(role.name).toBe(name);
      expect(role.namespace).toBe(namespace);
      expect(role.parentApp.namespace).toBe(app.namespace);
    });

    it('create() it should not save when role object has both parentOrg and appOrg params', async () => {
      const org = organizations[0];
      const app = applications[0];
      MockOrgService.getByNamespace.mockResolvedValueOnce(org);
      MockAppService.getByNamespace.mockResolvedValueOnce(app);

      const testRole = chance.pickone(roles);
      const { name, owner, namespace } = testRole;

      await service.create({
        name,
        namespace,
        owner,
        definition: {
          version: 1.0,
          enrolmentPreconditions: [],
          roleType: 'app',
          requestorFields: [],
          issuerFields: [],
          issuer: {
            issuerType: 'Role',
            did: [owner],
            roleName: 'testRole',
          },
          revoker: {
            revokerType: 'Role',
            did: [owner],
            roleName: 'testRole',
          },
          roleName: name,
          metadata: {},
        },
        namehash: namehash(namespace),
        appNamespace: app.namespace,
        orgNamespace: org.namespace,
      });

      expect(MockLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining(
          `Not able to create role: ${namespace}, namespace can only have one of parentApp and OrgApp`
        )
      );
    });
  });

  describe('getByNamehash', () => {
    it('getByNamehash() it should fetch role using namehash', async () => {
      const testRole = roles[0];
      const role = await service.getByNamehash(testRole.namehash);

      expect(role).toBeInstanceOf(Role);
      expect(role.name).toBe(testRole.name);
      expect(role.namespace).toBe(testRole.namespace);
      expect(role.namehash).toBe(testRole.namehash);
    });

    it('getByNamehash() it should return undefined when using namehash that does not exist', async () => {
      const name = 'notexists.iam.ewc';
      const namespaceHash = namehash(name);
      const role = await service.getByNamehash(namespaceHash);

      expect(role).toBeNull();
    });
  });

  describe('getByNamespace', () => {
    it('getByNamespace() it should fetch organization using namespace', async () => {
      const testRole = roles[0];
      const role = await service.getByNamespace(testRole.namespace);

      expect(role).toBeInstanceOf(Role);
      expect(role.name).toBe(testRole.name);
      expect(role.namespace).toBe(testRole.namespace);
      expect(role.namehash).toBe(testRole.namehash);
    });

    it('getByNamespace() it should return undefined when using namespace that does not exist', async () => {
      const role = await service.getByNamespace(
        `nonexisting.roles.testApp.apps.iam.ewc`
      );

      expect(role).toBeNull();
    });
  });

  describe('getByNamespace', () => {
    it('getByNamespace() it should fetch role using namespace', async () => {
      const testRole = roles[0];
      const role = await service.getByNamespace(testRole.namespace);

      expect(role).toBeInstanceOf(Role);
      expect(role.name).toBe(testRole.name);
      expect(role.namespace).toBe(testRole.namespace);
      expect(role.namehash).toBe(testRole.namehash);
    });
  });

  describe('getByNamespaces', () => {
    it('getByNamespaces() it should fetch roles using namespaces', async () => {
      const testRoles = [...roles];
      const resultRoles = await service.getByNamespaces(
        testRoles.map((role) => role.namespace)
      );

      expect(resultRoles).toHaveLength(testRoles.length);
      testRoles.forEach((role) => {
        expect(resultRoles).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: role.name,
              namespace: role.namespace,
              namehash: role.namehash,
            }),
          ])
        );
      });
      resultRoles.forEach((role) => {
        expect(role).toBeInstanceOf(Role);
      });
    });
  });

  describe('removeByNameHash', () => {
    it('removeByNameHash() it should remove role using namehash', async () => {
      const testRole = roles[0];
      await service.removeByNameHash(testRole.namehash);
      const role = await service.getByNamehash(testRole.namehash);
      expect(role).toBeNull();
    });
  });

  describe('remove', () => {
    it('remove() it should remove role using namespace', async () => {
      const testRole = roles[0];
      await service.remove(testRole.namespace);
      const role = await service.getByNamespace(testRole.namespace);
      expect(role).toBeNull();
    });
  });
});
