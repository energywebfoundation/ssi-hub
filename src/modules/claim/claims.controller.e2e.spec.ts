import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import request from 'supertest';
import { Keys } from '@ew-did-registry/keys';
import { JWT } from '@ew-did-registry/jwt';
import { v5 } from 'uuid';
import * as TestDbCOnfig from '../../../test/config';
import { LoggerModule } from '../logger/logger.module';
import { SentryModule } from '../sentry/sentry.module';
import { RoleClaim } from './entities/roleClaim.entity';
import { ClaimController } from './claim.controller';
import { ClaimService, UUID_NAMESPACE } from './claim.service';
import { IClaimRequest, IRoleClaim, RegistrationTypes } from './claim.types';
import { NatsModule } from '../nats/nats.module';
import { RoleService } from '../role/role.service';
import { AssetsService } from '../assets/assets.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { appConfig } from '../../common/test.utils';
import { Claim } from './entities/claim.entity';
import { Provider } from '../../common/provider';
import { Asset, AssetsHistory } from '../assets/assets.entity';
import { DIDService } from '../did/did.service';
import { Wallet } from '@ethersproject/wallet';
import { BullModule } from '@nestjs/bull';

// const emptyAddress = '0x0000000000000000000000000000000000000000';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};

jest.setTimeout(60000);
describe('ClaimsController', () => {
  const issuer = new Keys();
  const issuerDID = `did:ethr:volta:${issuer.getAddress()}`;
  const jwt = new JWT(issuer);
  let module: TestingModule;
  let queryRunner: QueryRunner;
  let dbConnection: Connection;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let service: ClaimService;

  const randomDID = () => {
    return `did:ethr:volta:${Wallet.createRandom().address}`;
  };

  const didMock = jest.fn(
    () => 'did:ethr:volta:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9',
  );
  const isAuthorizeMock = jest.fn(() => true);

  const MockRoleService = {
    verifyEnrolmentPrecondition: jest.fn(),
    getAll: jest.fn().mockResolvedValue([]),
  };

  const MockJWTAuthGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = {
        did: didMock(),
      };
      return isAuthorizeMock();
    },
  };

  const addClaim = async ({
    claimType,
    claimTypeVersion,
    requester,
    issuer = randomDID(),
  }) => {
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
      claimIssuer: [issuer],
      token,
    };

    didMock.mockReturnValueOnce(requester);

    await testHttpServer
      .post(`/v1/claim/request/${requester}`)
      .send(claimRequest)
      .expect(201);

    return { id, token };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({ redis: redisConfig }),

        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([RoleClaim, Claim, Asset, AssetsHistory]),
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
        { provide: DIDService, useValue: {} },
        AssetsService,
        Provider,
        EventEmitter2,
        SchedulerRegistry,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(MockJWTAuthGuard)
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
    await queryRunner?.rollbackTransaction();
    await app.close();
  });

  it('getBySubject() should return claim requested for subject', async () => {
    const claimType = 'myRole.roles.myApp.apps.myOrg.iam.ewc';
    const claimTypeVersion = '1';
    const requester = randomDID();
    const registrationTypes = [RegistrationTypes.OffChain];
    const { id, token } = await addClaim({
      claimType,
      claimTypeVersion,
      requester,
    });

    didMock.mockReturnValueOnce(requester);
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

  it('should save issuedToken and fetch it by subject', async () => {
    const claimType = 'myRole.roles.myApp.apps.myOrg.iam.ewc';
    const claimTypeVersion = '1';
    const requester = randomDID();
    const token = await jwt.sign(
      { claimData: { claimType, claimTypeVersion } },
      { subject: requester },
    );

    await testHttpServer
      .post(`/v1/claim/issued`)
      .send({ issuedToken: token })
      .expect(201);

    await testHttpServer
      .get(`/v1/claim/issued?subjects=${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].issuedToken).toEqual(token);
        expect(res.body[0].issuedAt).not.toBeNaN();
        expect(res.body[0].subject).toEqual(requester);
      });
  });

  it('`/user/:did` should return only claim related to authenticated user', async () => {
    const requester = randomDID();
    const foreignRequester = randomDID();
    const [ownedClaim] = await Promise.all([
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
    ]);

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/user/${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].token).toEqual(ownedClaim.token);
        expect(res.body[0].id).toEqual(ownedClaim.id);
        expect(res.body[0].subject).toEqual(requester);
      });

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/user/${foreignRequester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(0);
      });
  });

  it('`/issuer/:did` should return claims requested by authenticated user', async () => {
    const requester = randomDID();
    const issuer = randomDID();
    const claims = await Promise.all([
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester,
        issuer,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: issuer,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: issuer,
      }),
    ]);

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/issuer/${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(0);
      });

    jest.spyOn(service, 'rolesByIssuer').mockResolvedValueOnce([
      {
        id: 1,
        name: 'myRole',
        namespace: 'myRole.roles.myOrg.iam.ewc',
        owner: issuer,
        definition: {} as any,
        parentOrg: {} as any,
        parentApp: {} as any,
      },
    ]);

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/issuer/${issuer}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].token).toEqual(claims[0].token);
        expect(res.body[0].id).toEqual(claims[0].id);
        expect(res.body[0].subject).toEqual(requester);
      });
  });

  it('`/requester/:did` should return only claims requested by authenticated user', async () => {
    const requester = randomDID();
    const foreignRequester = randomDID();
    const [ownedClaim] = await Promise.all([
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
    ]);

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/requester/${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].token).toEqual(ownedClaim.token);
        expect(res.body[0].id).toEqual(ownedClaim.id);
        expect(res.body[0].subject).toEqual(requester);
      });

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/requester/${foreignRequester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(0);
      });
  });

  it('`/subject/:did` should return only claim related to authenticated user', async () => {
    const requester = randomDID();
    const foreignRequester = randomDID();
    const [ownedClaim] = await Promise.all([
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
    ]);

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/subject/${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].token).toEqual(ownedClaim.token);
        expect(res.body[0].id).toEqual(ownedClaim.id);
        expect(res.body[0].subject).toEqual(requester);
      });

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/subject/${foreignRequester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(0);
      });
  });

  it('`/by/subjects` should return only claim related to authenticated user', async () => {
    const requester = randomDID();
    const foreignRequester = randomDID();
    const [ownedClaim] = await Promise.all([
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
      addClaim({
        claimType: 'myRole.roles.myOrg.iam.ewc',
        claimTypeVersion: '1',
        requester: foreignRequester,
      }),
    ]);

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/by/subjects?subjects=${requester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0].token).toEqual(ownedClaim.token);
        expect(res.body[0].id).toEqual(ownedClaim.id);
        expect(res.body[0].subject).toEqual(requester);
      });

    didMock.mockReturnValueOnce(requester);
    await testHttpServer
      .get(`/v1/claim/by/subjects?subjects=${foreignRequester}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toEqual(0);
      });
  });

  describe('claim rejection', () => {
    let requesterDID: string;
    let claim: Pick<IRoleClaim, 'id' | 'token'>;
    const rejectionReason = 'SMTP error';

    beforeEach(async () => {
      const claimType = 'patron.roles.staking.apps.auth.ewc';
      const claimTypeVersion = '1';
      requesterDID = randomDID();
      [claim] = await Promise.all([
        addClaim({
          claimType,
          claimTypeVersion,
          requester: requesterDID,
        }),
      ]);

      await testHttpServer
        .post(`/v1/claim/reject/${issuerDID}`)
        .send({
          id: claim.id,
          claimIssuer: [issuerDID],
          requester: requesterDID,
          isRejected: true,
          rejectionReason,
        })
        .expect(201);
    });

    it('should be able to specify rejection reason', async () => {
      didMock.mockReturnValueOnce(requesterDID);
      await testHttpServer
        .get(`/v1/claim/by/subjects?subjects=${requesterDID}`)
        .expect(200)
        .expect(res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toEqual(1);
          expect(res.body[0]).toBeInstanceOf(Object);
          expect(res.body[0].id).toEqual(claim.id);
          expect(res.body[0].subject).toEqual(requesterDID);
          expect(res.body[0].isRejected).toEqual(true);
          expect(res.body[0].rejectionReason).toEqual(rejectionReason);
        });
    });
  });
});
