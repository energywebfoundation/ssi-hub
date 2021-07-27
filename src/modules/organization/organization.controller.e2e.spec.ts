import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import * as TestDbCOnfig from '../../../test/config';
import { Organization } from './organization.entity';
import { LoggerModule } from '../logger/logger.module';
import { Application } from '../application/application.entity';
import { SentryModule } from '../sentry/sentry.module';
import { ConfigModule } from '@nestjs/config';
import { OrganizationService } from './organization.service';
import { Chance } from 'chance';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

const chance = new Chance();

const organizationFixture = async (
  repo: Repository<Organization>,
  count = 1,
) => {
  const organizations = [];
  for (let i = 0; i < count; i++) {
    const name = chance
      .string({ pool: 'abcdefghijklmnopqrstuvwxyz' })
      .toLowerCase();
    const definition = {
      orgName: name,
      description: chance.paragraph(),
      websiteUrl: chance.url(),
    };
    const org = Organization.create({
      name,
      namespace: `${name}.iam.ewc`,
      owner: '0x7dD4cF86e6f143300C4550220c4eD66690a655fc',
      definition,
    });
    organizations.push(org);
  }
  return repo.save(organizations);
};

describe('OrganizationController', () => {
  let module: TestingModule;
  let repo: Repository<Organization>;
  let queryRunner: QueryRunner;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let organizations: Organization[];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application]),
        LoggerModule,
        ConfigModule,
        SentryModule,
      ],
      controllers: [OrganizationController],
      providers: [OrganizationService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

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
    testHttpServer = request(app.getHttpServer());
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    module.close();
  });

  it('getById(), should fetch organization by id', async () => {
    const testOrg = chance.pickone(organizations);
    await testHttpServer
      .get(`/org/${testOrg.namespace}`)
      .expect(200)
      .expect(res => {
        expect(res.body.id).toEqual(testOrg.id);
        expect(res.body.namespace).toEqual(testOrg.namespace);
        expect(res.body.owner).toEqual(testOrg.owner);
        expect(res.body.name).toEqual(testOrg.name);
      });
  });

  it('getById(), should not return any organization given an id that does not exist', async () => {
    const testOrgNamespace = `${chance.first().toLowerCase()}.ewc.iam`;
    await testHttpServer
      .get(`/org/${testOrgNamespace}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual({});
      });
  });

  it('getByOwner(), should return organization belonging to an owner', async () => {
    const testOrg = chance.pickone(organizations);
    await testHttpServer
      .get(`/org/owner/${testOrg.owner}`)
      .expect(200)
      .expect(res => {
        const response: Organization[] = res.body;
        expect(response.length).toBe(2);
        response.map(res => {
          expect(res).toHaveProperty('id');
          expect(res).toHaveProperty('name');
          expect(res).toHaveProperty('namespace');
          expect(res).toHaveProperty('owner');
          expect(res).toHaveProperty('definition');
        });
      });
  });

  it('getByOwner(), should return organization belonging to an owner', async () => {
    const testOrgOwner = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz' });
    await testHttpServer
      .get(`/org/owner/${testOrgOwner}`)
      .expect(200)
      .expect(res => {
        const response: Organization[] = res.body;
        expect(response.length).toBe(0);
      });
  });

  it('exists(), should return true if an organization exists', async () => {
    const testOrg = chance.pickone(organizations);
    const { namespace } = testOrg;
    await testHttpServer
      .get(`/org/${namespace}/exists`)
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('true');
      });
  });

  it('exists(), should return false if an organization does not exist', async () => {
    const testOrgNamespace = `${chance.first().toLowerCase()}.ewc.iam`;
    await testHttpServer
      .get(`/org/${testOrgNamespace}/exists`)
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('false');
      });
  });
});
