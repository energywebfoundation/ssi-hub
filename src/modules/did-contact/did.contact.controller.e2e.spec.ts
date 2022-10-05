import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import { Provider } from '../../common/provider';
import { LoggerModule } from '../logger/logger.module';
import * as TestDbCOnfig from '../../../e2e/config';
import request from 'supertest';
import { appConfig, MockJWTAuthGuard } from '../../common/test.utils';
import { didContactFixture, didDocumentFixture } from './did.contact.fixture';
import { Chance } from 'chance';
import { DIDContactController } from './did.contact.controller';
import { DIDContactService } from './did.contact.service';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '../sentry/sentry.module';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DIDContact } from './did.contact.entity';
import { DIDDocumentEntity } from '../did/did.entity';

const chance = new Chance();
const userDID1 = 'did:ethr:volta:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9';
const userDID2 = 'did:ethr:volta:0x0C4021qb2085C8AA0f686caA011de1cB53a615E9';

const MockGuardImplementation = jest
  .fn()
  .mockImplementation((context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      did: userDID1,
    };
    return true;
  });

const MockEmptyDIDGuardImplementation = jest
  .fn()
  .mockImplementation((context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      did: userDID2,
    };
    return true;
  });

describe('DIDContactController', () => {
  let module: TestingModule;
  let didContactRepo: Repository<DIDContact>;
  let didDocRepo: Repository<DIDDocumentEntity>;
  let queryRunner: QueryRunner;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let didContacts: DIDContact[];
  let didDoc: DIDDocumentEntity;

  beforeEach(async () => {
    jest.clearAllMocks();
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([DIDContact, DIDDocumentEntity]),
        SentryModule,
        ConfigModule,
        LoggerModule,
      ],
      controllers: [DIDContactController],
      providers: [DIDContactService, Provider],
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
    didContactRepo = module.get<Repository<DIDContact>>(
      getRepositoryToken(DIDContact)
    );
    didDocRepo = module.get<Repository<DIDDocumentEntity>>(
      getRepositoryToken(DIDDocumentEntity)
    );
    await queryRunner.startTransaction();
    didDoc = await didDocumentFixture(didDocRepo);
    didContacts = await didContactFixture(didDoc, didContactRepo, 2);
    testHttpServer = request(app.getHttpServer());
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    await app.close();
  });

  describe('getDIDContacts()', () => {
    it('getDIDContacts(), should return list of saved contacts created by authenticated user', async () => {
      MockJWTAuthGuard.canActivate = MockGuardImplementation;
      await testHttpServer
        .get(`/v1/didContact`)
        .send()
        .expect(200)
        .expect(async (res) => {
          expect(res.body.length).toBe(2);
          expect(res.body[0].id).toEqual(didContacts[0].id);
          expect(res.body[1].id).toEqual(didContacts[1].id);
        });
    });

    it('getDIDContacts(), return empty list of saved contacts', async () => {
      MockJWTAuthGuard.canActivate = MockEmptyDIDGuardImplementation;
      await testHttpServer
        .get(`/v1/didContact`)
        .send()
        .expect(200)
        .expect(async (res) => {
          expect(res.body.length).toBe(0);
        });
    });
  });

  describe('createDIDContact()', () => {
    it('createDIDContact(), should create didContact', async () => {
      MockJWTAuthGuard.canActivate = MockGuardImplementation;
      const didContactToSave = {
        label: 'DIDContact Label 1',
        did: 'did:ethr:volta:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9',
      };
      await testHttpServer
        .post(`/v1/didContact`)
        .send(didContactToSave)
        .expect(201)
        .expect(async (res) => {
          expect(res.body.label).toEqual(`${didContactToSave.label}`);
          expect(res.body.did).toEqual(didContactToSave.did);
          expect(res.body.createdBy.id).toBe(userDID1);

          const savedContact = await didContactRepo.findOneBy({
            id: res.body.id,
          });

          expect(savedContact.id).toEqual(res.body.id);
          expect(savedContact.did).toEqual(res.body.did);
        });
    });

    it('createDIDContact(), should throw an error when trying to create a didContact with an already existing did value', async () => {
      MockJWTAuthGuard.canActivate = MockGuardImplementation;
      const didContactToSave = didContacts[0];
      await testHttpServer
        .post(`/v1/didContact`)
        .send(didContactToSave)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toEqual(
            `DID contact with did ${didContactToSave.did} already exists`
          );
        });
    });

    it('createDIDContact(), should throw an error when passed userDID could not be found in DID Document', async () => {
      MockJWTAuthGuard.canActivate = MockEmptyDIDGuardImplementation;
      const didContactToSave = didContacts[0];
      await testHttpServer
        .post(`/v1/didContact`)
        .send(didContactToSave)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain(`cannot find DID document`);
        });
    });
  });

  describe('deleteDIDContact()', () => {
    it('deleteDIDContact(), should delete DIDContact of passed id', async () => {
      MockJWTAuthGuard.canActivate = MockGuardImplementation;
      const id = didContacts[0].id;
      await testHttpServer
        .delete(`/v1/didContact/${id}`)
        .send()
        .expect(200)
        .expect(async (res) => {
          expect(res.body).not.toHaveProperty('id');
          const contacts = await didContactRepo.find();
          expect(contacts.length).toBe(1);
        });
    });

    it('deleteDIDContact(), should throw an error when trying to delete a didContact record that does not exist', async () => {
      MockJWTAuthGuard.canActivate = MockGuardImplementation;
      const id = chance.guid({ version: 4 });
      await testHttpServer
        .delete(`/v1/didContact/${id}`)
        .send()
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toEqual(
            `DID contact with id ${id} was not found`
          );
        });
    });

    it('deleteDIDContact(), should throw an error when authenticated user tries to delete a didContact record not created by them', async () => {
      const id = didContacts[0].id;
      MockJWTAuthGuard.canActivate = MockEmptyDIDGuardImplementation;
      await testHttpServer
        .delete(`/v1/didContact/${id}`)
        .send()
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toEqual(
            `DID contact with id ${id} was not found`
          );
        });
    });
  });
});
