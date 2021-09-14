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
import { INestApplication, VersioningType } from '@nestjs/common';
import { organizationFixture } from './organization.fixture';

const chance = new Chance();

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
    app.enableVersioning({
      type: VersioningType.URI,
    });
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
      .get(`/v1/org/${testOrg.namespace}`)
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
      .get(`/v1/org/${testOrgNamespace}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual({});
      });
  });

  it('getByOwner(), should return organization belonging to an owner', async () => {
    const testOrg = chance.pickone(organizations);
    await testHttpServer
      .get(`/v1/org/owner/${testOrg.owner}`)
      .expect(200)
      .expect(res => {
        const response: Organization[] = res.body;
        expect(response.length).toBe(3);
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
      .get(`/v1/org/owner/${testOrgOwner}`)
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
      .get(`/v1/org/${namespace}/exists`)
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('true');
      });
  });

  it('exists(), should return false if an organization does not exist', async () => {
    const testOrgNamespace = `${chance.first().toLowerCase()}.ewc.iam`;
    await testHttpServer
      .get(`/v1/org/${testOrgNamespace}/exists`)
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('false');
      });
  });
});
