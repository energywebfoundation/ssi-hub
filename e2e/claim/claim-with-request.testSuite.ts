import request from 'supertest';
import { Wallet, BigNumber } from 'ethers';
import { v4 } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';
import { app } from '../app.e2e.spec';
import { RoleService } from '../../src/modules/role/role.service';
import { ClaimService } from '../../src/modules/claim/services/claim.service';
import { DIDDocumentEntity } from '../../src/modules/did/did.entity';
import { randomUser, createRole } from '../utils';
import { NatsService } from '../../src/modules/nats/nats.service';
import {
  ClaimEventType,
  NATS_EXCHANGE_TOPIC,
} from '../../src/modules/claim/claim.types';
import { ConfigService } from '@nestjs/config';

const emptyAddress = '0x0000000000000000000000000000000000000000';

export const claimWithRequestTestSuite = () => {
  let roleService: RoleService;
  let claimService: ClaimService;
  let nats: NatsService;
  let queryRunner;
  let allowedOrigins: string[];

  const createClaimRequest = async (
    role: string,
    requester: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    },
    issuer: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    },
    expectStatusCode: number,
    Origin?: string
  ) => {
    const claimId = v4();
    const issKeys = new Keys({ privateKey: issuer.wallet.privateKey });
    const jwt = new JWT(issKeys);
    await request(app.getHttpServer())
      .post(`/v1/claim/request`)
      .set('Cookie', requester.cookies)
      .set(Origin ? { Origin } : {})
      .send({
        token: await jwt.sign(
          {
            claimData: {
              claimType: role,
              claimTypeVersion: 1,
              fields: [],
              issuerFields: [],
            },
          },
          { issuer: issuer.did, subject: requester.did }
        ),
        claimType: role,
        claimTypeVersion: '1',
        id: claimId,
        requester: requester.did,
        claimIssuer: [emptyAddress],
      })
      .expect(expectStatusCode);
    return {
      id: claimId,
      requester: requester.did,
      claimType: role,
      claimTypeVersion: 1,
    };
  };

  const rejectClaimRequest = async (
    claimId: string,
    requester: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    },
    issuer: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    },
    expectStatusCode: number,
    Origin?: string
  ) => {
    return await request(app.getHttpServer())
      .post(`/v1/claim/reject/${requester.did}`)
      .set('Cookie', issuer.cookies)
      .set(Origin ? { Origin } : {})
      .send({
        isRejected: true,
        id: claimId,
        requester: requester.did,
        claimIssuer: [issuer.did],
      })
      .expect(expectStatusCode);
  };

  const issueClaimRequest = async (
    claimData: {
      id: string;
      requester: string;
      claimType: string;
      claimTypeVersion: number;
      expirationTimestamp?: number;
    },
    issuer: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    },
    expectStatusCode: number,
    Origin?: string
  ) => {
    const issKeys = new Keys({ privateKey: issuer.wallet.privateKey });
    const jwt = new JWT(issKeys);
    return request(app.getHttpServer())
      .post(`/v1/claim/issue/${issuer.did}`)
      .set('Cookie', issuer.cookies)
      .set(Origin ? { Origin } : {})
      .send({
        id: claimData.id,
        acceptedBy: issuer.did,
        issuedToken: await jwt.sign(
          {
            did: claimData.requester,
            signer: issuer.did,
            claimData: {
              claimType: claimData.claimType,
              claimTypeVersion: claimData.claimTypeVersion,
            },
          },
          { issuer: issuer.did, subject: claimData.requester }
        ),
        requester: claimData.requester,
        expirationTimestamp: claimData.expirationTimestamp,
      })
      .expect(expectStatusCode);
  };

  beforeAll(async () => {
    roleService = app.get(RoleService);
    claimService = app.get(ClaimService);
    nats = app.get(NatsService);
    allowedOrigins = app.get(ConfigService).get('ALLOWED_ORIGINS').split(',');
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

  it(`should issue a claim request with role issuer type DID`, async () => {
    const [requester, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );
    const claimData = await createClaimRequest(
      'test1.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );

    const publishForDids = jest.spyOn(nats, 'publishForDids');
    await issueClaimRequest(claimData, issuer, 201);
    expect(publishForDids).toHaveBeenCalledTimes(1);
    expect(publishForDids).toHaveBeenCalledWith(
      ClaimEventType.ISSUE_CREDENTIAL,
      NATS_EXCHANGE_TOPIC,
      [requester.did],
      { claimId: claimData.id }
    );
  });

  it(`should issue a claim request with role issuer type ROLE`, async () => {
    const [requester, issuer, issuerWithRole] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'test2',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );
    const claimData = await createClaimRequest(
      'test2.roles.e2e.iam.ewc',
      requester,
      issuerWithRole,
      201
    );
    const didRepository = app.get<Repository<DIDDocumentEntity>>(
      getRepositoryToken(DIDDocumentEntity)
    );

    await didRepository.save({
      id: `did:ethr:volta:${issuerWithRole.wallet.address}`,
      service: [
        {
          id: `did:ethr:volta:${issuerWithRole.wallet.address}`,
          type: 'role.roles.iam.ewc',
          claimType: 'role.roles.iam.ewc',
          serviceEndpoint: '',
          validity: BigNumber.from(0),
          block: 1,
        },
      ],
      authentication: [],
      publicKey: [],
      '@context': '',
      logs: '',
    });

    await issueClaimRequest(claimData, issuerWithRole, 201);
  });

  it(`should not issue a claim request, because issuer is not a valid issuer`, async () => {
    const [requester, issuer, invalidIssuer] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'test3',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );
    const claimData = await createClaimRequest(
      'test3.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );
    await issueClaimRequest(claimData, invalidIssuer, 403);
  });

  it(`should not issue a claim request, because issuer doesn't have a required role`, async () => {
    const [requester, issuer, invalidIssuer] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'test4',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );
    const claimData = await createClaimRequest(
      'test4.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );
    await issueClaimRequest(claimData, invalidIssuer, 403);
  });

  it(`should save request origin along with claim`, async () => {
    const requestOrigin = allowedOrigins[3];
    const [requester] = await Promise.all([randomUser(requestOrigin)]);
    await createRole(
      {
        name: 'test5',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: requester.wallet.address,
      },
      roleService
    );

    const { id } = await createClaimRequest(
      'test5.roles.e2e.iam.ewc',
      requester,
      requester,
      201,
      requestOrigin
    );

    const { body } = await request(app.getHttpServer())
      .get(`/v1/claim/${id}`)
      .set('Cookie', requester.cookies)
      .set({ Origin: requestOrigin })
      .expect(200);

    expect(body.redirectUri).toBe(requestOrigin);
  });

  it(`/v1/claim/revoker should respond with a 200 and return credential`, async () => {
    const requestOrigin = allowedOrigins[0];
    const [requester, revoker, issuer] = await Promise.all([
      randomUser(),
      randomUser(requestOrigin),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'supertest',
        issuerDid: [issuer.wallet.address],
        revokerDid: [revoker.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );
    const claimData = await createClaimRequest(
      'supertest.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );
    await issueClaimRequest(claimData, issuer, 201);
    const { body } = await request(app.getHttpServer())
      .get(`/v1/claim/revoker/${revoker.did}`)
      .set('Cookie', revoker.cookies)
      .set({ Origin: requestOrigin })
      .expect(200);

    expect(body).toHaveLength(1);
    expect(body[0].claimType).toEqual('supertest.roles.e2e.iam.ewc');
    expect(body[0].isAccepted).toBeTruthy;
  });

  it(`/v1/claim/revoker should respond with a 200 and return credential given a namespace`, async () => {
    const requestOrigin = allowedOrigins[0];
    const [requester, revoker, issuer] = await Promise.all([
      randomUser(),
      randomUser(requestOrigin),
      randomUser(),
    ]);
    const roleOne = {
      name: 'supertestone',
      namespace: `roles.spaceOne.e2e.iam.ewc`,
      issuerDid: [issuer.wallet.address],
      revokerDid: [revoker.wallet.address],
      ownerAddr: issuer.wallet.address,
    };
    const roleTwo = {
      name: 'supertesttwo',
      namespace: `roles.spaceTwo.e2e.iam.ewc`,
      issuerDid: [issuer.wallet.address],
      revokerDid: [revoker.wallet.address],
      ownerAddr: issuer.wallet.address,
    };
    await Promise.all([
      createRole(roleOne, roleService),
      createRole(roleTwo, roleService),
    ]);
    const [claimDataOne, claimDataTwo] = await Promise.all([
      createClaimRequest(
        'supertestone.roles.spaceOne.e2e.iam.ewc',
        requester,
        issuer,
        201
      ),
      createClaimRequest(
        'supertesttwo.roles.spaceTwo.e2e.iam.ewc',
        requester,
        issuer,
        201
      ),
    ]);
    await Promise.all([
      issueClaimRequest(claimDataOne, issuer, 201),
      issueClaimRequest(claimDataTwo, issuer, 201),
    ]);
    const namespace = 'supertesttwo.roles.spaceTwo.e2e.iam.ewc';
    const { body } = await request(app.getHttpServer())
      .get(`/v1/claim/revoker/${revoker.did}?namespace=${namespace}`)
      .set('Cookie', revoker.cookies)
      .set({ Origin: requestOrigin })
      .expect(200);

    expect(body).toHaveLength(1);
    expect(body[0].claimType).toEqual(
      'supertesttwo.roles.spaceTwo.e2e.iam.ewc'
    );
    expect(body[0].isAccepted).toBeTruthy;
  });

  it(`should fetch claims for a DID param if no user detected`, async () => {
    const [requester, revoker, issuer] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    const roleOne = {
      name: 'supertestparams',
      namespace: `roles.e2e.iam.ewc`,
      issuerDid: [issuer.wallet.address],
      revokerDid: [revoker.wallet.address],
      ownerAddr: issuer.wallet.address,
    };
    await createRole(roleOne, roleService);
    const claimData = await createClaimRequest(
      'supertestparams.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );
    await issueClaimRequest(claimData, issuer, 201);
    const result = await claimService.getByRevoker({ revoker: revoker.did });
    expect(result).toHaveLength(1);
    expect(result[0].claimType).toEqual('supertestparams.roles.e2e.iam.ewc');
    expect(result[0].isAccepted).toBeTruthy;
  });

  it(`should not be able to create two the same claim requests`, async () => {
    const [requester, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    await createClaimRequest('test1.roles.e2e.iam.ewc', requester, issuer, 201);

    await createClaimRequest('test1.roles.e2e.iam.ewc', requester, issuer, 403);

    await request(app.getHttpServer())
      .get(`/v1/claim/user/${requester.did}`)
      .set('Cookie', requester.cookies)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
      });
  });

  it(`should be able to create again claim request after rejection`, async () => {
    const [requester, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const { id: claimId } = await createClaimRequest(
      'test1.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );

    await rejectClaimRequest(claimId, requester, issuer, 201);

    await createClaimRequest('test1.roles.e2e.iam.ewc', requester, issuer, 201);

    await request(app.getHttpServer())
      .get(`/v1/claim/user/${requester.did}`)
      .set('Cookie', requester.cookies)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
        expect(res.body.find((claim) => claim.id === claimId)).toStrictEqual(
          expect.objectContaining({
            isAccepted: false,
            isRejected: true,
          })
        );
        expect(res.body.find((claim) => claim.id !== claimId)).toStrictEqual(
          expect.objectContaining({
            isAccepted: false,
            isRejected: false,
          })
        );
      });
  });

  it(`should issue a claim request with expiration timestamp`, async () => {
    const [requester, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );
    const claimData = await createClaimRequest(
      'test1.roles.e2e.iam.ewc',
      requester,
      issuer,
      201
    );
    const expirationTimestamp = Date.now() + 1000;
    await issueClaimRequest({ ...claimData, expirationTimestamp }, issuer, 201);

    const persistedClaim = await claimService.getById(claimData.id);
    expect(persistedClaim).toHaveProperty('expirationTimestamp');
    expect(persistedClaim.expirationTimestamp).toBe(
      expirationTimestamp.toString()
    );
  });
};
