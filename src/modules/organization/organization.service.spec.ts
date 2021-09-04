import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Application } from '../application/application.entity';
import { LoggerModule } from '../logger/logger.module';
import { SentryModule } from '../sentry/sentry.module';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import * as TestDbCOnfig from '../../../test/config';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import { organizationFixture } from './organization.fixture';
import { Chance } from 'chance';
import { Logger } from '../logger/logger.service';

const chance = new Chance();

const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

describe('OrganizationService', () => {
  let service: OrganizationService;
  let module: TestingModule;
  let repo: Repository<Organization>;
  let organizations: Organization[];
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application]),
        LoggerModule,
        ConfigModule,
        SentryModule,
      ],
      providers: [
        OrganizationService,
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
    repo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization),
    );

    organizations = await organizationFixture(repo, 2);

    service = module.get<OrganizationService>(OrganizationService);
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    module.close();
  });

  it('create() it should not save an organization with same namespace and parentOrg ', async () => {
    const testOrg = chance.pickone(organizations);
    const { name, namespace, owner, definition } = testOrg;
    await service.create({
      name,
      namespace,
      owner,
      definition,
      parentOrg: testOrg.parentOrg.namespace,
    });

    expect(MockLogger.debug).toHaveBeenCalledWith(
      expect.stringContaining(
        `namespace ${namespace} already exists in org ${testOrg.parentOrg.namespace}`,
      ),
    );
  });

  it('create() it should create organization', async () => {
    const testOrg = chance.pickone(organizations);
    const name = chance.name();

    const org = await service.create({
      name,
      namespace: `${name}.iam.ewc`,
      owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
      definition: testOrg.definition,
      parentOrg: testOrg.parentOrg.namespace,
    });

    expect(org).toBeInstanceOf(Organization);
    expect(org.name).toBe(name);
    expect(org.namespace).toBe(`${name}.iam.ewc`);
    expect(org.parentOrg.namespace).toBe(testOrg.parentOrg.namespace);
  });
});
