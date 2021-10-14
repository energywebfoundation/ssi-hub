import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as TestDbCOnfig from '../../../test/config';
import { LoggerModule } from '../logger/logger.module';
import { SentryModule } from '../sentry/sentry.module';
import { ConfigModule } from '@nestjs/config';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { RoleClaim } from './entities/roleClaim.entity';
import { ClaimController } from './claim.controller';
import { ClaimService, UUID_NAMESPACE } from './claim.service';
import { IClaimRequest, RegistrationTypes } from './claim.types';
import { Keys } from '@ew-did-registry/keys';
import { JWT } from '@ew-did-registry/jwt';
import { BullModule } from '@nestjs/bull';
import { NatsModule } from '../nats/nats.module';
import { RoleService } from '../role/role.service';
import { AssetsService } from '../assets/assets.service';
import { ClaimProcessor } from './claim.processor';
import { v5 } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { appConfig } from '../../common/test.utils';

const emptyAddress = '0x0000000000000000000000000000000000000000';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};

describe('ClaimsController', () => {
  const jwt = new JWT(new Keys());
  let module: TestingModule;
  let queryRunner: QueryRunner;
  let dbConnection: Connection;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let service: ClaimService;

  const MockRoleService = {
    verifyEnrolmentPrecondition: jest.fn(),
    getAll: jest.fn(),
  };

  const MockAssetService = {
    getByOwner: jest.fn(),
    getByOwnedTo: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([RoleClaim]),
        BullModule.registerQueue({
          name: 'claims',
          redis: redisConfig,
        }),
        NatsModule,
        LoggerModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        SentryModule,
      ],
      controllers: [ClaimController],
      providers: [
        ClaimService,
        { provide: RoleService, useValue: MockRoleService },
        { provide: AssetsService, useValue: MockAssetService },
        ClaimProcessor,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => {
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    appConfig(app);
    await app.init();
    service = app.get(ClaimService);

    dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner = dbConnection.createQueryRunner(
      'master',
    );
    await queryRunner.connect();
    await queryRunner.startTransaction();
    testHttpServer = request(app.getHttpServer());
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await app.close();
  });

  it('getBySubject() should return claim requested for subject', async () => {
    const claimType = 'myRole.roles.myApp.apps.myOrg.iam.ewc';
    const claimTypeVersion = '1';
    const requester = `did:ethr:requester`;
    const registrationTypes = [RegistrationTypes.OffChain];
    const token = await jwt.sign(
      { claimData: { claimType, claimTypeVersion } },
      { subject: requester },
    );
    const id = v5(token, UUID_NAMESPACE);
    const claimRequest: IClaimRequest = {
      claimType,
      claimTypeVersion,
      id,
      requester,
      claimIssuer: [emptyAddress],
      token,
    };

    await testHttpServer
      .post(`/v1/claim/request/${requester}`)
      .send(claimRequest)
      .expect(201);

    await new Promise(resolve =>
      jest.spyOn(service, 'create').mockImplementationOnce(claimDto =>
        service.create(claimDto).then(claim => {
          resolve(claim);
          return claim;
        }),
      ),
    );

    await testHttpServer
      .get(`/v1/claim/subject/${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toStrictEqual(
          expect.objectContaining({
            claimType,
            claimTypeVersion,
            id,
            requester,
            subject: requester,
            token,
            registrationTypes,
          }),
        );
      });
  });
});
