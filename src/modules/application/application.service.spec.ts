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
import { namehash } from '../../ethers/utils';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { MockJWTAuthGuard } from '../../common/test.utils';
import { Wallet } from 'ethers';

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
  let owner: string;

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
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(MockJWTAuthGuard)
      .compile();

    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
    repo = module.get<Repository<Application>>(getRepositoryToken(Application));
    orgRepo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization)
    );

    owner = Wallet.createRandom().address;
    organizations = await organizationFixture(orgRepo, owner);
    applications = await applicationFixture(repo, organizations[0], owner, 2);

    service = module.get<ApplicationService>(ApplicationService);
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    module.close();
  });

  describe('create', () => {
    it('create() it should not save an application with existing namespace', async () => {
      const testApp = chance.pickone(applications);
      const organization = chance.pickone(organizations);
      const { name, owner, definition, namespace } = testApp;
      const namespacehash = namehash(namespace);

      MockOrgService.getByNamespace.mockResolvedValueOnce(organization);

      await service.create({
        name,
        namespace,
        owner,
        definition,
        parentOrg: organization.namespace,
        namehash: namespacehash,
      });

      expect(MockLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining(
          `Not able to create application: ${namespace} already exists`
        )
      );
      const createdApps = await repo.find({ where: { namespace } });
      expect(createdApps.length).toBe(1);
    });

    it('create() it should create application', async () => {
      const organization = chance.pickone(organizations);
      MockOrgService.getByNamespace.mockResolvedValueOnce(organization);
      const namespace = 'testapp.apps.testOrg.iam.ewc';
      const name = 'testapp';

      const app = await service.create({
        name,
        namespace,
        owner,
        definition: {
          appName: name,
          description: chance.paragraph(),
          websiteUrl: chance.url(),
        },
        parentOrg: organization.namespace,
        namehash: namehash(namespace),
      });

      expect(app).toBeInstanceOf(Application);
      expect(app.name).toBe(name);
      expect(app.namespace).toBe(namespace);
      expect(app.parentOrg.namespace).toBe(organization.namespace);
      expect(app.namehash).toBe(namehash(namespace));
    });
  });

  describe('getByNamehash', () => {
    it('getByNamehash() it should fetch application using namehash', async () => {
      const testApp = applications[0];
      const app = await service.getByNamehash(testApp.namehash);

      expect(app).toBeInstanceOf(Application);
      expect(app.name).toBe(testApp.name);
      expect(app.namespace).toBe(testApp.namespace);
      expect(app.namehash).toBe(testApp.namehash);
    });

    it('getByNamehash() it should return undefined when using namehash that does not exist', async () => {
      const name = 'notexists.apps.testOrg.iam.ewc';
      const namespaceHash = namehash(name);
      const app = await service.getByNamehash(namespaceHash);

      expect(app).toBeNull();
    });
  });

  describe('getByNamespace', () => {
    it('getByNamespace() it should fetch organization using namespace', async () => {
      const testApp = applications[0];
      const app = await service.getByNamespace(testApp.namespace);

      expect(app).toBeInstanceOf(Application);
      expect(app.name).toBe(testApp.name);
      expect(app.namespace).toBe(testApp.namespace);
      expect(app.namehash).toBe(testApp.namehash);
    });

    it('getByNamespace() it should return undefined when using namespace that does not exist', async () => {
      const app = await service.getByNamespace(
        `notexists.apps.testOrg.iam.ewc`
      );

      expect(app).toBeNull();
    });
  });

  describe('getByNamespace', () => {
    it('getByNamespace() it should fetch organization using namespace', async () => {
      const testApp = applications[0];
      const app = await service.getByNamespace(testApp.namespace);

      expect(app).toBeInstanceOf(Application);
      expect(app.name).toBe(testApp.name);
      expect(app.namespace).toBe(testApp.namespace);
      expect(app.namehash).toBe(testApp.namehash);
    });
  });

  describe('removeByNameHash', () => {
    it('removeByNameHash() it should remove organization using namehash', async () => {
      const testApp = organizations[0];
      await service.removeByNameHash(testApp.namehash);

      const app = await service.getByNamehash(testApp.namehash);

      expect(app).toBeNull();
    });
  });

  describe('remove', () => {
    it('remove() it should remove organization using namespace', async () => {
      const testApp = organizations[0];
      await service.remove(testApp.namespace);

      const app = await service.getByNamespace(testApp.namespace);

      expect(app).toBeNull();
    });
  });
});
