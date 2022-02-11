import request from 'supertest';
import { Wallet, BigNumber } from 'ethers';
import { v4 } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';
import { app } from '../app.e2e.spec';
import { RoleService } from '../../src/modules/role/role.service';
import { DIDDocumentEntity } from '../../src/modules/did/did.entity';
import { createRole, randomUser } from './utils';

const emptyAddress = '0x0000000000000000000000000000000000000000';

export const claimWithRequestTestSuite = () => {
  let roleService: RoleService;
  let queryRunner;

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
    expectStatusCode: number
  ) => {
    const claimId = v4();
    const issKeys = new Keys({ privateKey: issuer.wallet.privateKey });
    const jwt = new JWT(issKeys);
    await request(app.getHttpServer())
      .post(`/v1/claim/request`)
      .set('Cookie', requester.cookies)
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

  const issueClaimRequest = async (
    claimData: {
      id: string;
      requester: string;
      claimType: string;
      claimTypeVersion: number;
    },
    issuer: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    },
    expectStatusCode: number
  ) => {
    const issKeys = new Keys({ privateKey: issuer.wallet.privateKey });
    const jwt = new JWT(issKeys);
    return request(app.getHttpServer())
      .post(`/v1/claim/issue/${issuer.did}`)
      .set('Cookie', issuer.cookies)
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
      })
      .expect(expectStatusCode);
  };

  beforeAll(async () => {
    roleService = app.get(RoleService);
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
  });

  it(`should issue a claim request with role issuer type DID`, async () => {
    const [requester, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        did: issuer.wallet.address,
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
    await issueClaimRequest(claimData, issuer, 201);
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
        did: issuer.wallet.address,
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
};
