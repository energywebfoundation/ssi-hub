import { Connection, EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import didKit from '@spruceid/didkit-wasm-node';
import { app } from '../app.e2e.spec';
import { RoleService } from '../../src/modules/role/role.service';
import { createRole, randomUser } from '../utils';
import { STATUS_LIST_MODULE_PATH } from '../../src/modules/status-list/status-list.const';
import { StatusListService } from '../../src/modules/status-list/status-list.service';
import {
  getEWFVerifiableCredential,
  getStatusListCredential,
} from './fixtures';
import {
  CredentialWithStatus,
  NamespaceStatusLists,
  StatusListEntry,
  StatusListCredential,
} from '../../src/modules/status-list/entities';
import { utils } from 'ethers';

export const statusList2021TestSuite = () => {
  let roleService: RoleService;
  let statusListService: StatusListService;
  let credentialWithStatusRepository: Repository<CredentialWithStatus>;
  let namespaceStatusListsRepository: Repository<NamespaceStatusLists>;
  let statusListCredentialRepository: Repository<StatusListCredential>;
  let statusListEntryRepository: Repository<StatusListEntry>;
  let queryRunner;

  beforeAll(async () => {
    roleService = app.get(RoleService);
    statusListService = app.get(StatusListService);

    credentialWithStatusRepository = app.get<Repository<CredentialWithStatus>>(
      getRepositoryToken(CredentialWithStatus)
    );
    namespaceStatusListsRepository = app.get<Repository<NamespaceStatusLists>>(
      getRepositoryToken(NamespaceStatusLists)
    );
    statusListCredentialRepository = app.get<Repository<StatusListCredential>>(
      getRepositoryToken(StatusListCredential)
    );
    statusListEntryRepository = app.get<Repository<StatusListEntry>>(
      getRepositoryToken(StatusListEntry)
    );
    statusListCredentialRepository;
  });

  beforeEach(async () => {
    const manager = app.get(EntityManager);
    const dbConnection = app.get(Connection);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  });

  describe('/entries', () => {
    it(`should return credential with subject status`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      const { body } = await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: {
            id: 'uuid',
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            issuer: issuer.didHex,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
              id: 'https://example.com/subject/3',
              role: {
                namespace: `test1.roles.e2e.iam.ewc`,
                version: '1',
              },
              issuerFields: [],
            },
          },
        })
        .expect(201);

      const expectedStatusListCredential = `${process.env.STATUS_LIST_DOMAIN}${STATUS_LIST_MODULE_PATH}/uuid`;

      expect(body.credentialStatus).toMatchObject({
        type: 'StatusList2021Entry',
        statusPurpose: 'revocation',
        statusListIndex: '0',
        statusListCredential: expectedStatusListCredential,
      });

      expect(await credentialWithStatusRepository.count()).toBe(1);
      expect(await namespaceStatusListsRepository.count()).toBe(1);
      expect(await statusListEntryRepository.count()).toBe(1);
      expect(
        await namespaceStatusListsRepository.findOne({
          where: { id: utils.namehash(`test1.roles.e2e.iam.ewc`) },
          relations: {
            lists: true,
          },
        })
      ).toEqual({
        id: utils.namehash(`test1.roles.e2e.iam.ewc`),
        namespace: `test1.roles.e2e.iam.ewc`,
        lists: [
          {
            id: expect.any(String),
            statusListId: expectedStatusListCredential,
          },
        ],
      });
      expect(
        await credentialWithStatusRepository.findOne({
          where: { id: 'uuid' },
          relations: {
            entry: true,
          },
        })
      ).toEqual({
        id: 'uuid',
        namespace: 'test1.roles.e2e.iam.ewc',
        entry: {
          id: expect.any(String),
          statusListIndex: '0',
          statusListCredential: `${process.env.STATUS_LIST_DOMAIN}${STATUS_LIST_MODULE_PATH}/uuid`,
          statusPurpose: 'revocation',
          type: 'StatusList2021Entry',
        },
      });
    });

    it(`should return credential with subject status when credential revoked`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: {
            id: 'uuid',
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            issuer: issuer.didHex,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
              id: 'https://example.com/subject/3',
              role: {
                namespace: `test1.roles.e2e.iam.ewc`,
                version: '1',
              },
              issuerFields: [],
            },
          },
        })
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: {
            id: 'uuid',
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            issuer: issuer.didHex,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
              id: 'https://example.com/subject/3',
              role: {
                namespace: `test1.roles.e2e.iam.ewc`,
                version: '1',
              },
              issuerFields: [],
            },
          },
        })
        .expect(201);

      expect(body.credentialStatus).toMatchObject({
        type: 'StatusList2021Entry',
        statusPurpose: 'revocation',
        statusListIndex: '0',
        statusListCredential: `${process.env.STATUS_LIST_DOMAIN}${STATUS_LIST_MODULE_PATH}/uuid`,
      });
    });

    it(`should throw an error when user is not authorized to issue given role`, async () => {
      const [issuer, user] = await Promise.all([randomUser(), randomUser()]);
      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', user.cookies)
        .send({
          credential: {
            id: 'uuid',
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            issuer: user.didHex,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
              id: 'https://example.com/subject/3',
              role: {
                namespace: `test1.roles.e2e.iam.ewc`,
                version: '1',
              },
              issuerFields: [],
            },
          },
        })
        .expect(403);
    });

    it(`should throw an error when user is not a issuer of given credential`, async () => {
      const [issuer, user] = await Promise.all([randomUser(), randomUser()]);
      await createRole(
        {
          name: 'test1',
          issuerDid: [user.wallet.address],
          revokerDid: [user.wallet.address],
          ownerAddr: user.wallet.address,
        },
        roleService
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', user.cookies)
        .send({
          credential: {
            id: 'uuid',
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            issuer: issuer.didHex,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
              id: 'https://example.com/subject/3',
              role: {
                namespace: `test1.roles.e2e.iam.ewc`,
                version: '1',
              },
              issuerFields: [],
            },
          },
        })
        .expect(403);
    });

    it(`should throw an error when passed invalid credential`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          id: 'uuid',
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiableCredential'],
          issuer: issuer.didHex,
          issuanceDate: new Date().toISOString(),
          credentialSubject: {
            id: 'https://example.com/subject/3',
            role: {
              namespace: `test1.roles.e2e.iam.ewc`,
              version: '1',
            },
            issuerFields: [],
          },
        })
        .expect(400);
    });
  });

  describe('/credentials/status/initiate', () => {
    it(`should return a status list credential to be signed`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      const vc = getEWFVerifiableCredential(issuer.did);

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: { ...vc, proof: undefined },
        })
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', issuer.cookies)
        .send({
          verifiableCredential: vc,
        })
        .expect(201);

      expect(body).toMatchObject({
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/vc/status-list/2021/v1',
        ],
        id: vc.credentialStatus.statusListCredential,
        type: ['VerifiableCredential', 'StatusList2021Credential'],
        issuer: issuer.didHex,
        issuanceDate: expect.any(String),
        credentialSubject: {
          id: vc.credentialStatus.statusListCredential,
          type: 'StatusList2021',
          statusPurpose: 'revocation',
          encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
        },
      });
    });

    it(`should throw an error when user is not authorized revoker`, async () => {
      const [revoker, user] = await Promise.all([randomUser(), randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [user.wallet.address],
          revokerDid: [revoker.wallet.address],
          ownerAddr: revoker.wallet.address,
        },
        roleService
      );

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      const vc = getEWFVerifiableCredential(user.did);
      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', user.cookies)
        .send({
          verifiableCredential: vc,
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: `${user.did} is not allowed to revoke test1.roles.e2e.iam.ewc`,
          error: 'Forbidden',
        });
    });

    it(`should throw an error when credential are not valid`, async () => {
      const [revoker, user] = await Promise.all([randomUser(), randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [user.wallet.address],
          revokerDid: [user.wallet.address],
          ownerAddr: revoker.wallet.address,
        },
        roleService
      );

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: ['error'],
        })
      );

      const vc = getEWFVerifiableCredential(user.did);
      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', user.cookies)
        .send({
          verifiableCredential: vc,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: `Verifiable Credential is invalid, errors: error`,
          error: 'Bad Request',
        });
    });

    it(`should throw an error when credential was issued by unauthorized user`, async () => {
      const [issuer, user] = await Promise.all([randomUser(), randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [user.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      const vc = getEWFVerifiableCredential(user.did);
      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', user.cookies)
        .send({
          verifiableCredential: vc,
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: `${user.did} is not allowed to issue test1.roles.e2e.iam.ewc`,
          error: 'Forbidden',
        });
    });

    it(`should throw an error when credential is not registered`, async () => {
      const [user] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [user.wallet.address],
          revokerDid: [user.wallet.address],
          ownerAddr: user.wallet.address,
        },
        roleService
      );

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      const vc = getEWFVerifiableCredential(user.did);
      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', user.cookies)
        .send({
          verifiableCredential: vc,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: `Credential was not registered`,
          error: 'Bad Request',
        });
    });

    it(`should throw an error when credential was registered for other namespace`, async () => {
      const [revoker] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [revoker.wallet.address],
          revokerDid: [revoker.wallet.address],
          ownerAddr: revoker.wallet.address,
        },
        roleService
      );

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      jest
        .spyOn(statusListService, 'getCredential')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockResolvedValueOnce({ namespace: 'other' } as any);

      const vc = getEWFVerifiableCredential(revoker.did);
      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', revoker.cookies)
        .send({
          verifiableCredential: vc,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: `Credential was registered with another namespace`,
          error: 'Bad Request',
        });
    });

    it(`should throw an error when input data is not valid`, async () => {
      const [revoker] = await Promise.all([randomUser()]);

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/initiate`)
        .set('Cookie', revoker.cookies)
        .send({
          verifiableCredential: {
            id: 'uuid',
          },
        })
        .expect(400);
    });
  });

  describe('/credentials/status/finalize', () => {
    it(`should throw an error when credential is not valid`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      const vc = getEWFVerifiableCredential(issuer.didHex);
      const statusListCredential = getStatusListCredential(issuer.didHex);

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: { ...vc, proof: undefined },
        })
        .expect(201);

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: ['error'],
        })
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/finalize`)
        .set('Cookie', issuer.cookies)
        .send({
          statusListCredential: statusListCredential,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: `Verifiable Credential is invalid, errors: error`,
          error: 'Bad Request',
        });
    });

    it(`should throw an error when credential is not registered`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      const statusListCredential = getStatusListCredential(issuer.didHex);

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/finalize`)
        .set('Cookie', issuer.cookies)
        .send({
          statusListCredential: statusListCredential,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: `Credential was not registered`,
          error: 'Bad Request',
        });
    });

    it(`should throw an error when revoker is not authorized`, async () => {
      const [issuer, user] = await Promise.all([randomUser(), randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [user.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      const vc = getEWFVerifiableCredential(issuer.didHex);
      const statusListCredential = getStatusListCredential(issuer.didHex);

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: { ...vc, proof: undefined },
        })
        .expect(201);

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/finalize`)
        .set('Cookie', issuer.cookies)
        .send({
          statusListCredential: statusListCredential,
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: `${issuer.did} is not allowed to revoke test1.roles.e2e.iam.ewc`,
          error: 'Forbidden',
        });
    });

    it(`should revoke credential with given signed StatusList2021 credential`, async () => {
      const [issuer] = await Promise.all([randomUser()]);

      await createRole(
        {
          name: 'test1',
          issuerDid: [issuer.wallet.address],
          revokerDid: [issuer.wallet.address],
          ownerAddr: issuer.wallet.address,
        },
        roleService
      );

      const vc = getEWFVerifiableCredential(issuer.didHex);
      const statusListCredential = getStatusListCredential(issuer.didHex);

      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/entries`)
        .set('Cookie', issuer.cookies)
        .send({
          credential: { ...vc, proof: undefined },
        })
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .post(`/v1/${STATUS_LIST_MODULE_PATH}/credentials/status/finalize`)
        .set('Cookie', issuer.cookies)
        .send({
          statusListCredential,
        })
        .expect(201);

      expect(body).toMatchObject(statusListCredential);
      await expect(credentialWithStatusRepository.count()).resolves.toBe(1);
      await expect(statusListCredentialRepository.find()).resolves.toEqual([
        {
          statusListId: `${process.env.STATUS_LIST_DOMAIN}${STATUS_LIST_MODULE_PATH}/${vc.id}`,
          vc: {
            '@context': [
              'https://www.w3.org/2018/credentials/v1',
              'https://w3id.org/vc/status-list/2021/v1',
            ],
            credentialSubject: {
              encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
              id: vc.id,
              statusPurpose: 'revocation',
              type: 'StatusList2021',
            },
            id: `${process.env.STATUS_LIST_DOMAIN}${STATUS_LIST_MODULE_PATH}/${vc.id}`,
            issuanceDate: expect.any(String),
            issuer: issuer.didHex,
            proof: {
              '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
              created: expect.any(String),
              eip712Domain: {
                domain: {},
                messageSchema: {},
                primaryType: 'VerifiableCredential',
              },
              proofPurpose: 'assertionMethod',
              proofValue: expect.any(String),
              type: 'EthereumEip712Signature2021',
              verificationMethod: `${issuer.didHex}#controller`,
            },
            type: ['VerifiableCredential', 'StatusList2021Credential'],
          },
        },
      ]);
    });
  });

  describe('/:credentialId', () => {
    it(`should fetch credential status for anonymous user`, async () => {
      const statusListCredential = getStatusListCredential('did:ethr:0x123');

      const mockFunc = jest.spyOn(statusListCredentialRepository, 'findOne');
      jest
        .spyOn(statusListCredentialRepository, 'findOne')
        .mockResolvedValueOnce({
          statusListId: '',
          vc: statusListCredential,
          getStatusListCredential: (issuerDid) => {
            return StatusListCredential.create({
              statusListId: '',
              vc: statusListCredential,
            }).getStatusListCredential(issuerDid);
          },
        });

      const { body } = await request(app.getHttpServer())
        .get(`/v1/${STATUS_LIST_MODULE_PATH}/urn:uuid:b40311fa-cf70-4fec-b268`)
        .expect(200);

      expect(mockFunc).toBeCalledWith(
        expect.objectContaining({
          where: {
            statusListId: expect.stringContaining(
              `/v1/${STATUS_LIST_MODULE_PATH}/urn:uuid:b40311fa-cf70-4fec-b268`
            ),
          },
        })
      );
      expect(body).toEqual(statusListCredential);
    });

    it(`should result with NO_CONTENT status code when credential is not revoked`, async () => {
      const mockFunc = jest
        .spyOn(statusListCredentialRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const { body } = await request(app.getHttpServer())
        .get(`/v1/${STATUS_LIST_MODULE_PATH}/urn:uuid:b40311fa-cf70-4fec-b268`)
        .expect(204);

      expect(mockFunc).toBeCalledWith(
        expect.objectContaining({
          where: {
            statusListId: expect.stringContaining(
              `/v1/${STATUS_LIST_MODULE_PATH}/urn:uuid:b40311fa-cf70-4fec-b268`
            ),
          },
        })
      );
      expect(body).toEqual({});
    });
  });
};
