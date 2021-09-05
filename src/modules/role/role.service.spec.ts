import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
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
    queryRunner = manager.queryRunner = dbConnection.createQueryRunner(
      'master',
    );
    await queryRunner.startTransaction();
    repo = module.get<Repository<Role>>(getRepositoryToken(Role));
    appRepo = module.get<Repository<Application>>(
      getRepositoryToken(Application),
    );

    orgRepo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization),
    );

    organizations = await organizationFixture(orgRepo);
    applications = await applicationFixture(appRepo, organizations[0], 2);
    roles = await roleFixture(repo, organizations[0], applications[0], 2);
    service = module.get<RoleService>(RoleService);
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    module.close();
  });

  it('create() it should not save an role with existing namespace, parentOrg and parentApp', async () => {
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
        fields: [],
        issuer: {
          issuerType: 'Role',
          did: ['0x7dD4cF86e6f143300C4550220c4eD66690a655fc'],
          roleName: 'testRole',
        },
        roleName: name,
        metadata: {},
      },
      appNamespace: app.namespace,
      orgNamespace: org.namespace,
    });

    expect(MockLogger.debug).toHaveBeenCalledWith(
      expect.stringContaining(
        `Role namespace ${namespace} with ParentOrg ${org.namespace} and parent App ${app.namespace} already exists`,
      ),
    );
  });

  it('create() it should create role', async () => {
    const org = organizations[0];
    const app = applications[0];
    MockOrgService.getByNamespace.mockResolvedValueOnce(org);
    MockAppService.getByNamespace.mockResolvedValueOnce(app);

    const name = chance.name();
    const role = await service.create({
      name,
      namespace: `${name}.roles.testApps.apps.testOrg.iam.ewc`,
      owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
      definition: {
        version: 1.0,
        enrolmentPreconditions: [],
        roleType: 'app',
        fields: [],
        issuer: {
          issuerType: 'Role',
          did: ['0x7dD4cF86e6f143300C4550220c4eD66690a655fc'],
          roleName: 'testRole',
        },
        roleName: name,
        metadata: {},
      },
      appNamespace: app.namespace,
      orgNamespace: org.namespace,
    });

    expect(role).toBeInstanceOf(Role);
    expect(role.name).toBe(name);
    expect(role.namespace).toBe(`${name}.roles.testApps.apps.testOrg.iam.ewc`);
    expect(role.parentOrg.namespace).toBe(org.namespace);
    expect(role.parentApp.namespace).toBe(app.namespace);
  });
});
