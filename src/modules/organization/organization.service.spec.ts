import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Application } from '../application/application.entity';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import * as TestDbCOnfig from '../../../test/config';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import { organizationFixture } from './organization.fixture';
import { Chance } from 'chance';
import { Logger } from '../logger/logger.service';
import { namehash } from '../../ethers/utils';

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
    jest.resetAllMocks();
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application]),
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

  describe('create', () => {
    it('create() it should not save an organization with existing namespace ', async () => {
      const testOrg = chance.pickone(organizations);
      const { name, namespace, owner, definition } = testOrg;
      await service.create({
        name,
        namespace,
        owner,
        definition,
        parentOrg: testOrg.parentOrg.namespace,
        namehash: namehash(namespace),
      });

      expect(MockLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining(`namespace ${namespace} already exists`),
      );
      const createdOrgs = await repo.find({ namespace });
      expect(createdOrgs.length).toBe(1);
    });

    it('create() it should create organization', async () => {
      const testOrg = chance.pickone(organizations);
      const name = 'testorg';
      const namespace = `testorg.iam.ewc`;

      const org = await service.create({
        name,
        namespace,
        owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
        definition: testOrg.definition,
        parentOrg: testOrg.parentOrg.namespace,
        namehash: namehash(namespace),
      });

      expect(org).toBeInstanceOf(Organization);
      expect(org.name).toBe(name);
      expect(org.namespace).toBe(`${name}.iam.ewc`);
      expect(org.parentOrg.namespace).toBe(testOrg.parentOrg.namespace);
      expect(org.namehash).toBe(namehash(namespace));
    });
  });

  describe('getByNamehash', () => {
    it('getByNamehash() it should fetch organization using namehash', async () => {
      const testOrg = organizations[0];
      const org = await service.getByNamehash(testOrg.namehash);

      expect(org).toBeInstanceOf(Organization);
      expect(org.name).toBe(testOrg.name);
      expect(org.namespace).toBe(testOrg.namespace);
      expect(org.namehash).toBe(testOrg.namehash);
    });

    it('getByNamehash() it should return undefined when using namehash that does not exist', async () => {
      const name = 'notexists.iam.ewc';
      const namespaceHash = namehash(name);
      const org = await service.getByNamehash(namespaceHash);

      expect(org).toBe(undefined);
    });
  });

  describe('getByNamespace', () => {
    it('getByNamespace() it should fetch organization using namespace', async () => {
      const testOrg = organizations[0];
      const org = await service.getByNamespace(testOrg.namespace);

      expect(org).toBeInstanceOf(Organization);
      expect(org.name).toBe(testOrg.name);
      expect(org.namespace).toBe(testOrg.namespace);
      expect(org.namehash).toBe(testOrg.namehash);
    });

    it('getByNamespace() it should return undefined when using namespace that does not exist', async () => {
      const org = await service.getByNamespace(`notexists.iam.ewc`);

      expect(org).toBe(undefined);
    });
  });

  describe('getByNamespace', () => {
    it('getByNamespace() it should fetch organization using namespace', async () => {
      const testOrg = organizations[0];
      const org = await service.getByNamespace(testOrg.namespace);

      expect(org).toBeInstanceOf(Organization);
      expect(org.name).toBe(testOrg.name);
      expect(org.namespace).toBe(testOrg.namespace);
      expect(org.namehash).toBe(testOrg.namehash);
    });
  });

  describe('removeByNameHash', () => {
    it('removeByNameHash() it should remove organization using namehash', async () => {
      const testOrg = organizations[0];
      await service.removeByNameHash(testOrg.namehash);

      const org = await service.getByNamehash(testOrg.namehash);

      expect(org).toBe(undefined);
    });
  });

  describe('remove', () => {
    it('remove() it should remove organization using namespace', async () => {
      const testOrg = organizations[0];
      await service.remove(testOrg.namespace);

      const org = await service.getByNamespace(testOrg.namespace);

      expect(org).toBe(undefined);
    });
  });
});
