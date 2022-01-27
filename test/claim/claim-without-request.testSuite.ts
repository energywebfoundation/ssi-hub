import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { BigNumber, Wallet } from 'ethers';
import {
  initWithPrivateKeySigner,
  RegistrationTypes,
  setCacheConfig,
  VOLTA_CHAIN_ID,
} from 'iam-client-lib';
import { v4 } from 'uuid';
import { app } from '../app.e2e.spec';
import { RoleService } from '../../src/modules/role/role.service';
import { createRole, randomUser } from './utils';
import { ClaimService } from '../../src/modules/claim/services';
import { DIDDocumentEntity } from '../../src/modules/did/did.entity';

setCacheConfig(VOLTA_CHAIN_ID, {
  url: process.env.STRATEGY_CACHE_SERVER,
});

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
      registrationTypes: RegistrationTypes[];
    },
    issuer: {
      wallet: Wallet;
      did: string;
      cookies: string[];
    }
  ) => {
    const { connectToCacheServer } = await initWithPrivateKeySigner(
      issuer.wallet.privateKey,
      process.env.ENS_URL
    );
    const { connectToDidRegistry } = await connectToCacheServer();
    const { claimsService } = await connectToDidRegistry();

    return await claimsService.issueClaim({
      claim: { ...claimData, issuerFields: [] },
      subject: claimData.subject,
      registrationTypes: claimData.registrationTypes,
    });
  };

  const verifyClaim = async ({
    subject,
    claimType,
    registrationTypes,
    claimTypeVersion,
    issuer,
  }: {
    subject: string;
    claimType: string;
    registrationTypes: RegistrationTypes[];
    claimTypeVersion: string;
    issuer: string;
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
    });
  };

  beforeAll(async () => {
    roleService = app.get(RoleService);
  });

  beforeEach(async () => {
    const manager = app.get(EntityManager);
    const dbConnection = app.get(Connection);

    claimService = app.get(ClaimService);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    queryRunner;
    await queryRunner.startTransaction();
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
  });

  it(`should issue a off-chain claim with role issuer type DID`, async () => {
    const [subject, issuer] = await Promise.all([randomUser(), randomUser()]);
    await createRole(
      {
        name: 'test1',
        did: issuer.wallet.address,
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const claimId = v4();
    const claimType = 'test1.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OffChain];

    const data = await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer
    );

    expect(data).toBeDefined();
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
        did: issuer.wallet.address,
        ownerAddr: issuer.wallet.address,
      },
      roleService
    );

    const claimId = v4();
    const claimType = 'test2.roles.e2e.iam.ewc';
    const claimTypeVersion = 1;
    const registrationTypes = [RegistrationTypes.OnChain];

    const data = await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer
    );

    expect(data).toBeUndefined();
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
        did: issuer.wallet.address,
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

    const data = await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer
    );

    expect(data).toBeDefined();
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

    const data = await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer
    );

    expect(data).toBeUndefined();
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

    const data = await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer
    );

    expect(data).toBeDefined();
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

    const data = await issueClaim(
      {
        id: claimId,
        requester: issuer.did,
        claimType,
        claimTypeVersion,
        subject: subject.did,
        registrationTypes,
      },
      issuer
    );

    expect(data).toBeDefined();
    await verifyClaim({
      subject: subject.did,
      claimType,
      registrationTypes,
      claimTypeVersion: claimTypeVersion.toString(),
      issuer: issuer.did,
    });
  });
};
