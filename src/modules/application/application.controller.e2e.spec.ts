import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Wallet } from 'ethers';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import request from 'supertest';
import { Chance } from 'chance';
import { LoggerModule } from '../logger/logger.module';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { SentryModule } from '../sentry/sentry.module';
import { Role } from '../role/role.entity';
import * as TestDbCOnfig from '../../../e2e/config';
import { appConfig, MockJWTAuthGuard } from '../../common/test.utils';
import { OrganizationService } from '../organization/organization.service';
import { Organization } from '../organization/organization.entity';
import { IRoleDefinitionV2 } from '@energyweb/credential-governance';
import { JwtAuthGuard } from '../auth/jwt.guard';

const chance = new Chance();

describe('ApplicationController', () => {
  let module: TestingModule;
  let orgRepo: Repository<Organization>;
  let appRepo: Repository<Application>;
  let roleRepo: Repository<Role>;
  let queryRunner: QueryRunner;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;

  const mockOrganizationService = jest.fn();

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application, Role]),
        LoggerModule,
        SentryModule,
      ],
      controllers: [ApplicationController],
      providers: [
        ApplicationService,
        { provide: OrganizationService, useValue: mockOrganizationService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(MockJWTAuthGuard)
      .compile();

    app = module.createNestApplication();
    appConfig(app);
    await app.init();

    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
    orgRepo = module.get<Repository<Organization>>(
      getRepositoryToken(Organization)
    );
    appRepo = module.get<Repository<Application>>(
      getRepositoryToken(Application)
    );
    roleRepo = module.get<Repository<Role>>(getRepositoryToken(Role));
    testHttpServer = request(app.getHttpServer());
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    module.close();
  });

  it('getByOwner(), should be able to specify if relations should be included', async () => {
    const parentOrg = await orgRepo.save(
      Organization.create({
        name: 'parentOrg',
        namespace: `parentOrg.iam.ewc`,
        owner: Wallet.createRandom().address,
        definition: {
          orgName: 'parentOrg.iam.ewc',
          description: chance.paragraph(),
          websiteUrl: chance.url(),
        },
      })
    );

    const app = await appRepo.save(
      Application.create({
        name: 'app',
        owner: parentOrg.owner,
        namespace: 'app',
        definition: { appName: 'app' },
        parentOrg,
      })
    );

    const role = await roleRepo.save(
      Role.create({
        name: 'role',
        namespace: 'role',
        owner: parentOrg.owner,
        definition: {} as IRoleDefinitionV2,
        parentApp: app,
      })
    );

    await testHttpServer
      .get(`/v1/app/owner/${parentOrg.owner}`)
      .expect(200)
      .expect((res) => {
        const response: Application[] = res.body;
        expect(response.length).toBe(1);
        expect(response[0].roles.length).toBe(1);
        expect(role).toMatchObject(response[0].roles[0]);
      });

    await testHttpServer
      .get(`/v1/app/owner/${parentOrg.owner}?withRelations=false`)
      .expect(200)
      .expect((res) => {
        const response: Application[] = res.body;
        expect(response.length).toBe(1);
        expect(response[0].roles).toBe(undefined);
      });
  });
});
