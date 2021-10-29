import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import { Provider } from '../../common/provider';
import { LoggerModule } from '../logger/logger.module';
import { SentryModule } from '../sentry/sentry.module';
import { DIDService } from './did.service';
import * as TestDbCOnfig from '../../../test/config';
import { DIDContact, DIDDocumentEntity } from './did.entity';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../../common/test.utils';
import { didContactFixture } from './did.fixture';
import { SchedulerRegistry } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { getQueueToken } from '@nestjs/bull';
import { DIDContactController } from './did.contact.controller';
import { Chance } from 'chance';

const chance = new Chance();

describe('DIDContactController', () => {
  let module: TestingModule;
  let didContactRepo: Repository<DIDContact>;
  let queryRunner: QueryRunner;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let didContacts: DIDContact[];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([DIDContact, DIDDocumentEntity]),
        LoggerModule,
        HttpModule,
        SentryModule,
        ConfigModule,
      ],
      controllers: [DIDContactController],
      providers: [
        DIDService,
        { provide: SchedulerRegistry, useValue: jest.fn() },
        { provide: getQueueToken('dids'), useValue: jest.fn() },
        Provider,
      ],
    }).compile();

    app = module.createNestApplication();
    appConfig(app);
    await app.init();

    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner = dbConnection.createQueryRunner(
      'master',
    );
    didContactRepo = module.get<Repository<DIDContact>>(
      getRepositoryToken(DIDContact),
    );
    await queryRunner.startTransaction();
    didContacts = await didContactFixture(didContactRepo, 2);
    testHttpServer = request(app.getHttpServer());
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await app.close();
  });

  describe('getDIDContacts()', () => {
    it('getDIDContacts(), return list of saved contacts', async () => {
      await testHttpServer
        .get(`/v1/didContact`)
        .send()
        .expect(200)
        .expect(async res => {
          expect(res.body.length).toBe(2);
          expect(res.body[0].id).toEqual(didContacts[0].id);
          expect(res.body[1].id).toEqual(didContacts[1].id);
        });
    }, 30000);
  });

  describe('createDIDContact()', () => {
    it('createDIDContact(), should create didContact', async () => {
      const didContactToSave = {
        label: 'DIDContact Label 1',
        did: 'did:ethr:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9',
      };
      await testHttpServer
        .post(`/v1/didContact`)
        .send(didContactToSave)
        .expect(201)
        .expect(async res => {
          expect(res.body.label).toEqual(`${didContactToSave.label}`);
          expect(res.body.did).toEqual(didContactToSave.did);

          const savedContact = await didContactRepo.findOne({
            id: res.body.id,
          });
          expect(savedContact.id).toEqual(res.body.id);
          expect(savedContact.did).toEqual(res.body.did);
        });
    }, 30000);

    it('createDIDContact(), should throw an error when trying to create a didContact with an already existing did value', async () => {
      const didContactToSave = didContacts[0];
      await testHttpServer
        .post(`/v1/didContact`)
        .send(didContactToSave)
        .expect(400)
        .expect(res => {
          expect(res.body.message).toEqual(
            `DID contact with did ${didContactToSave.did} already exists`,
          );
        });
    }, 30000);
  });

  describe('deleteDIDContact()', () => {
    it('deleteDIDContact(), should throw an error when trying to delete a didContact record that does not exist', async () => {
      const id = chance.guid({ version: 4 });
      await testHttpServer
        .delete(`/v1/didContact/${id}`)
        .send()
        .expect(404)
        .expect(res => {
          expect(res.body.message).toEqual(
            `DID contact with id ${id} was not found`,
          );
        });
    }, 30000);

    it('deleteDIDContact(), should delete DIDContact of passed id', async () => {
      const id = didContacts[0].id;
      await testHttpServer
        .delete(`/v1/didContact/${id}`)
        .send()
        .expect(200)
        .expect(async res => {
          expect(res.body).not.toHaveProperty('id');
          const contacts = await didContactRepo.find();
          expect(contacts.length).toBe(1);
        });
    }, 30000);
  });
});
