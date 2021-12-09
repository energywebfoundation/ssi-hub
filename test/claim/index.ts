import request from 'supertest';
import { Wallet, providers, utils, BigNumber } from 'ethers';
import { v4 } from 'uuid';
import { app } from '../app.e2e.spec';
import { getIdentityToken } from '../utils';
import { RoleService } from '../../src/modules/role/role.service';
import { RoleDTO } from '../../src/modules/role/role.dto';
import { Connection, EntityManager } from 'typeorm';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';
import { DIDService } from '../../src/modules/did/did.service';

const jwt = new JWT(new Keys());
const emptyAddress = '0x0000000000000000000000000000000000000000';

export const claimTestSuite = () => {
  describe('Claim (version: 1)', () => {
    const provider = new providers.JsonRpcProvider(process.env.ENS_URL);
    let roleService: RoleService;
    let queryRunner;

    const createRole = async ({
      roleName,
      did,
      name,
      ownerAddr,
    }: {
      ownerAddr: string;
      roleName?: string;
      did?: string;
      name: string;
    }) => {
      const roleNamespace = `${name}.roles.e2e.iam.ewc`;
      roleService.create(
        await RoleDTO.create({
          name: name,
          namespace: roleNamespace,
          namehash: utils.namehash(roleNamespace),
          owner: ownerAddr,
          definition: {
            fields: [],
            metadata: {},
            issuer: {
              issuerType: did ? 'DID' : 'ROLE',
              did: did ? [`did:ethr:volta:${did}`] : undefined,
              roleName,
            },
            enrolmentPreconditions: [],
            roleName: name,
            roleType: 'org',
            version: 1,
          },
        }),
      );
    };

    const randomUser = async () => {
      let wallet = Wallet.createRandom();
      wallet = wallet.connect(provider);

      const identityToken = await getIdentityToken(provider, wallet);
      const loginResponse = await request(app.getHttpServer())
        .post('/v1/login')
        .send({
          identityToken,
        })
        .expect(201);

      return {
        address: wallet.address,
        did: `did:ethr:volta:${wallet.address}`,
        cookies: [
          loginResponse.headers['set-cookie'][0].split(';')[0] + ';',
          loginResponse.headers['set-cookie'][1].split(';')[0] + ';',
        ],
      };
    };

    const createClaimRequest = async (
      role: string,
      requester: {
        did: string;
        cookies: string[];
      },
      expectStatusCode: number,
    ) => {
      const claimId = v4();
      await request(app.getHttpServer())
        .post(`/v1/claim/request/${requester.did}`)
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
            { issuer: requester.did, subject: requester.did },
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
        did: string;
        cookies: string[];
      },
      expectStatusCode: number,
    ) => {
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
            { issuer: issuer.did, subject: claimData.requester },
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
      queryRunner = manager.queryRunner = dbConnection.createQueryRunner(
        'master',
      );
      await queryRunner.startTransaction();
    });

    afterEach(async () => {
      await queryRunner.rollbackTransaction();
    });

    it(`should issue a claim request with role issuer type DID`, async () => {
      const [requester, issuer] = await Promise.all([
        randomUser(),
        randomUser(),
      ]);
      await createRole({
        name: 'test1',
        did: issuer.address,
        ownerAddr: issuer.address,
      });
      const claimData = await createClaimRequest(
        'test1.roles.e2e.iam.ewc',
        requester,
        201,
      );
      await issueClaimRequest(claimData, issuer, 201);
    });

    it(`should issue a claim request with role issuer type ROLE`, async () => {
      const [requester, issuer, issuerWithRole] = await Promise.all([
        randomUser(),
        randomUser(),
        randomUser(),
      ]);
      await createRole({
        name: 'test2',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: issuer.address,
      });
      const claimData = await createClaimRequest(
        'test2.roles.e2e.iam.ewc',
        requester,
        201,
      );
      const didService = app.get(DIDService);
      jest.spyOn(didService, 'getById').mockReturnValueOnce(
        Promise.resolve({
          '@context': '',
          id: '',
          publicKey: [],
          authentication: [],
          service: [
            {
              id: '',
              type: 'role.roles.iam.ewc',
              claimType: 'role.roles.iam.ewc',
              serviceEndpoint: '',
              validity: BigNumber.from(0),
              block: 1,
            },
          ],
        }),
      );
      await issueClaimRequest(claimData, issuerWithRole, 201);
    });

    it(`should not issue a claim request, because issuer is not a valid issuer`, async () => {
      const [requester, issuer, invalidIssuer] = await Promise.all([
        randomUser(),
        randomUser(),
        randomUser(),
      ]);
      await createRole({
        name: 'test3',
        did: issuer.address,
        ownerAddr: issuer.address,
      });
      const claimData = await createClaimRequest(
        'test3.roles.e2e.iam.ewc',
        requester,
        201,
      );
      await issueClaimRequest(claimData, invalidIssuer, 403);
    });

    it(`should not issue a claim request, because issuer doesn't have a required role`, async () => {
      const [requester, issuer, invalidIssuer] = await Promise.all([
        randomUser(),
        randomUser(),
        randomUser(),
      ]);
      await createRole({
        name: 'test4',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: issuer.address,
      });
      const claimData = await createClaimRequest(
        'test4.roles.e2e.iam.ewc',
        requester,
        201,
      );
      await issueClaimRequest(claimData, invalidIssuer, 403);
    });
  });
};
