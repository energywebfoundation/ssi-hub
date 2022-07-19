import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { BigNumber, Wallet } from 'ethers';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';
import { v4 } from 'uuid';
import { app } from '../app.e2e.spec';
import { RoleService } from '../../src/modules/role/role.service';
import { randomUser, createRole } from '../utils';
import { ClaimService } from '../../src/modules/claim/services';
import { DIDDocumentEntity } from '../../src/modules/did/did.entity';
import { RegistrationTypes } from '../../src/modules/claim/claim.types';

export const claimWithoutRequestTestSuite = () => {
  let roleService: RoleService;
  let claimService: ClaimService;
  let queryRunner;

  const issueClaim = async (
    claimData: {
      id: string;
      requester: string;
      claimType: string;
      claimTypeVersion: number;
      subject: string;
      expirationTimestamp?: number;
      registrationTypes: RegistrationTypes[];
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
        id: v4(),
        requester: claimData.subject,
        claimIssuer: [issuer.did],
        acceptedBy: issuer.did,
        expirationTimestamp: claimData.expirationTimestamp,
        issuedToken: claimData.registrationTypes.includes(
          RegistrationTypes.OffChain
        )
          ? await jwt.sign(
              {
                claimData: {
                  claimType: claimData.claimType,
                  claimTypeVersion: claimData.claimTypeVersion,
                  issuerFields: [],
                },
              },
              { issuer: issuer.did, subject: claimData.subject }
            )
          : undefined,
        onChainProof: claimData.registrationTypes.includes(
          RegistrationTypes.OnChain
        )
          ? 'on-chain-proof'
          : undefined,
        claimType: claimData.claimType,
        claimTypeVersion: claimData.claimTypeVersion.toString(),
      })
      .expect(expectStatusCode);
  };

  const verifyClaim = async ({
    subject,
    claimType,
    registrationTypes,
    claimTypeVersion,
    issuer,
    expirationTimestamp,
  }: {
    subject: string;
    claimType: string;
    registrationTypes: RegistrationTypes[];
    claimTypeVersion: string;
    issuer: string;
    expirationTimestamp?: number;
  }) => {
    const foundedClaim = await claimService.getBySubject({
      subject: subject,
    });

    expect(foundedClaim).toBeDefined();
    expect(foundedClaim.length).toBe(1);

    expect(foundedClaim[0]).toMatchObject({
      id: expect.any(String),
      requester: subject,
      subject: subject,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      token: null,
      subjectAgreement: null,
      onChainProof: registrationTypes.includes(RegistrationTypes.OnChain)
        ? expect.any(String)
        : null,
      issuedToken: registrationTypes.includes(RegistrationTypes.OffChain)
        ? expect.any(String)
        : null,
      isAccepted: true,
      createdAt: expect.any(Date),
      acceptedBy: issuer,
      isRejected: false,
      rejectionReason: null,
      namespace: 'e2e.iam.ewc',
      expirationTimestamp: expirationTimestamp
        ? expirationTimestamp.toString()
        : null,
    });
  };

  beforeAll(async () => {
    roleService = app.get(RoleService);
    claimService = app.get(ClaimService);
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

  it(`should issue a off-chain claim with role issuer type DID`, async () => {
    const [subject, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const claimId = v4();
    const claimType = 'test1.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OffChain];

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer,
      201
    );

    verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });

  it(`should issue a on-chain claim with role issuer type DID`, async () => {
    const [subject, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test2',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const claimId = v4();
    const claimType = 'test2.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OnChain];

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer,
      201
    );

    await verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });

  it(`should issue a on-chain and off-chain claim with role issuer type DID`, async () => {
    const [subject, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test2',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const claimId = v4();
    const claimType = 'test2.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [
      RegistrationTypes.OnChain,
      RegistrationTypes.OffChain,
    ];

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer,
      201
    );

    await verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });

  it(`should issue a on-chain claim request with role issuer type ROLE`, async () => {
    const [subject, issuer, roleOwner] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'test2',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: roleOwner.wallet.address,
      },
      roleService
    );
    const didRepository = app.get<Repository<DIDDocumentEntity>>(
      getRepositoryToken(DIDDocumentEntity)
    );

    await didRepository.save({
      id: `did:ethr:volta:${issuer.wallet.address}`,
      service: [
        {
          id: `did:ethr:volta:${issuer.wallet.address}`,
          type: 'role.roles.iam.ewc',
          claimType: 'role.roles.iam.ewc',
          serviceEndpoint: '',
          validity: BigNumber.from(0),
          block: 1,
          iss: issuer.did,
        },
      ],
      authentication: [],
      publicKey: [],
      '@context': '',
      logs: '',
    });

    const claimId = v4();
    const claimType = 'test2.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OnChain];

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer,
      201
    );

    await verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });

  it(`should issue a off-chain claim request with role issuer type ROLE`, async () => {
    const [subject, issuer, roleOwner] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'test2',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: roleOwner.wallet.address,
      },
      roleService
    );
    const didRepository = app.get<Repository<DIDDocumentEntity>>(
      getRepositoryToken(DIDDocumentEntity)
    );

    await didRepository.save({
      id: `did:ethr:volta:${issuer.wallet.address}`,
      service: [
        {
          id: `did:ethr:volta:${issuer.wallet.address}`,
          type: 'role.roles.iam.ewc',
          claimType: 'role.roles.iam.ewc',
          serviceEndpoint: '',
          validity: BigNumber.from(0),
          block: 1,
          iss: issuer.did,
        },
      ],
      authentication: [],
      publicKey: [],
      '@context': '',
      logs: '',
    });

    const claimId = v4();
    const claimType = 'test2.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OffChain];

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer,
      201
    );

    await verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });

  it(`should issue a off-chain & on-chain claim request with role issuer type ROLE`, async () => {
    const [subject, issuer, roleOwner] = await Promise.all([
      randomUser(),
      randomUser(),
      randomUser(),
    ]);
    await createRole(
      {
        name: 'test2',
        roleName: 'role.roles.iam.ewc',
        ownerAddr: roleOwner.wallet.address,
      },
      roleService
    );
    const didRepository = app.get<Repository<DIDDocumentEntity>>(
      getRepositoryToken(DIDDocumentEntity)
    );

    await didRepository.save({
      id: `did:ethr:volta:${issuer.wallet.address}`,
      service: [
        {
          id: `did:ethr:volta:${issuer.wallet.address}`,
          type: 'role.roles.iam.ewc',
          claimType: 'role.roles.iam.ewc',
          serviceEndpoint: '',
          validity: BigNumber.from(0),
          block: 1,
          iss: issuer.did,
        },
      ],
      authentication: [],
      publicKey: [],
      '@context': '',
      logs: '',
    });

    const claimId = v4();
    const claimType = 'test2.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OffChain];

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer,
      201
    );

    await verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });

  it(`should issue a claim request with expiration timestamp`, async () => {
    const [subject, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        issuerDid: [issuer.wallet.address],
        revokerDid: [issuer.wallet.address],
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const claimId = v4();
    const claimType = 'test1.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OffChain];
    const expirationTimestamp = Date.now() + 5000;

    await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
        expirationTimestamp,
      },
      issuer,
      201
    );

    verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
      expirationTimestamp,
    });
  });
};
