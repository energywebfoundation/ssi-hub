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
import { ApplicationService } from './application.service';
import { OrganizationService } from '../organization/organization.service';
import { organizationFixture } from '../organization/organization.fixture';
import { Organization } from '../organization/organization.entity';
import { applicationFixture } from './application.fixture';

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

describe('ApplicationService', () => {
  let service: ApplicationService;
  let module: TestingModule;
  let repo: Repository<Application>;
  let orgRepo: Repository<Organization>;
  let organizations: Organization[];
  let applications: Application[];
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    jest.resetAllMocks();
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application]),
      ],
      providers: [
        ApplicationService,
        { provide: OrganizationService, useValue: MockOrgService },
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
    repo = module.get<Repository<Application>>(getRepositoryToken(Application));
    orgRepo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization),
    );

    organizations = await organizationFixture(orgRepo);
    applications = await applicationFixture(repo, organizations[0], 2);

    service = module.get<ApplicationService>(ApplicationService);
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    module.close();
  });

  it('create() it should not save an application with existing namespace and parentOrg ', async () => {
    const testApp = chance.pickone(applications);
    const organization = chance.pickone(organizations);
    const { name, owner, definition, namespace } = testApp;

    MockOrgService.getByNamespace.mockResolvedValueOnce(organization);

    await service.create({
      name,
      namespace,
      owner,
      definition,
      parentOrg: organization.namespace,
    });

    expect(MockLogger.debug).toHaveBeenCalledWith(
      expect.stringContaining(
        `Not able to create application: ${namespace} with same parent organization ${organization.namespace} already exists`,
      ),
    );
  });

  it('create() it should create application', async () => {
    const organization = chance.pickone(organizations);
    MockOrgService.getByNamespace.mockResolvedValueOnce(organization);
    const name = chance.name();

    const app = await service.create({
      name,
      namespace: `${name}.apps.testOrg.iam.ewc`,
      owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
      definition: {
        appName: name,
        description: chance.paragraph(),
        websiteUrl: chance.url(),
      },
      parentOrg: organization.namespace,
    });

    expect(app).toBeInstanceOf(Application);
    expect(app.name).toBe(name);
    expect(app.namespace).toBe(`${name}.apps.testOrg.iam.ewc`);
    expect(app.parentOrg.namespace).toBe(organization.namespace);
  });
});
