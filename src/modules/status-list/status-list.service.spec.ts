import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import didKit from 'didkit-wasm-node';
import { STATUS_LIST_MODULE_PATH } from './status-list.const';
import { StatusListService } from './status-list.service';
import {
  CredentialWithStatus,
  NamespaceStatusList,
  NamespaceStatusLists,
  StatusListCredential,
} from './entities';

describe('StatusList2021 service', () => {
  let service: StatusListService;

  const configService = {
    get: jest.fn(),
  };

  const credentialWithStatusRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    manager: {
      transaction: jest.fn(),
    },
  };

  const namespaceStatusListsRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const namespaceStatusListRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const statusListCredentialRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    service = new StatusListService(
      configService as unknown as ConfigService,
      credentialWithStatusRepository as unknown as Repository<CredentialWithStatus>,
      namespaceStatusListsRepository as unknown as Repository<NamespaceStatusLists>,
      namespaceStatusListRepository as unknown as Repository<NamespaceStatusList>,
      statusListCredentialRepository as unknown as Repository<StatusListCredential>
    );
  });

  describe('addStatusListEntry()', () => {
    const credential = {
      id: 'uuid',
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      issuer: 'https://example.com/issuer',
      issuanceDate: '2020-01-01T00:00:00Z',
      credentialSubject: {
        id: 'https://example.com/subject/3',
        role: {
          namespace: 'root.iam.ewc',
          version: '1',
        },
        issuerFields: [],
      },
    };

    it('should re-create status list entry if was already created', async () => {
      credentialWithStatusRepository.findOne.mockResolvedValueOnce({
        id: 'uuid2',
        namespace: {},
        entry: {
          id: 'uuid',
          statusListIndex: '0',
          statusListCredential: 'https://example.com/v1/status-list/uuid2',
        },
        getCredentialStatus: () => ({
          id: `https://example.com/v1/status-list/uuid2`,
          type: 'StatusList2021Entry',
          statusPurpose: 'revocation',
          statusListIndex: '0',
          statusListCredential: `https://example.com/v1/status-list/uuid2`,
        }),
      });

      await expect(
        service.addStatusListEntry(credential)
      ).resolves.toStrictEqual({
        ...credential,
        credentialStatus: {
          id: `https://example.com/v1/status-list/uuid2`,
          type: 'StatusList2021Entry',
          statusPurpose: 'revocation',
          statusListIndex: '0',
          statusListCredential: `https://example.com/v1/status-list/uuid2`,
        },
      });
    });

    it('should create status list entry', async () => {
      credentialWithStatusRepository.findOne.mockResolvedValueOnce(null);
      credentialWithStatusRepository.manager.transaction.mockImplementation(
        (fn) => fn({ save: (data) => ({ id: 'entry', ...data }) })
      );
      configService.get.mockReturnValueOnce('https://example.com/v1');
      namespaceStatusListsRepository.findOne.mockResolvedValueOnce({
        createEntry: () => ({
          type: 'StatusList2021Entry',
          statusPurpose: 'revocation',
          statusListIndex: '0',
          statusListCredential: `https://example.com/v1/status-list/uuid`,
        }),
      });

      await expect(
        service.addStatusListEntry(credential)
      ).resolves.toStrictEqual({
        ...credential,
        credentialStatus: {
          id: `https://example.com/v1/status-list/uuid`,
          type: 'StatusList2021Entry',
          statusPurpose: 'revocation',
          statusListIndex: '0',
          statusListCredential: `https://example.com/v1/status-list/uuid`,
        },
      });
    });
  });

  describe('markStatusListCredential()', () => {
    const credential = {
      id: 'uuid',
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      issuer: 'https://example.com/issuer',
      issuanceDate: '2020-01-01T00:00:00Z',
      credentialSubject: {
        id: 'https://example.com/subject/3',
        role: {
          namespace: 'root.iam.ewc',
          version: '1',
        },
        issuerFields: [],
      },
      credentialStatus: {
        id: `https://example.com/v1/${STATUS_LIST_MODULE_PATH}/uuid`,
        type: 'StatusList2021Entry' as const,
        statusPurpose: 'revocation',
        statusListIndex: '0', // because we are using one-to-one mapping
        statusListCredential: `https://example.com/v1/${STATUS_LIST_MODULE_PATH}/uuid`,
      },
      proof: {
        '@context': 'https://www.w3.org/2018/credentials/proof/v1',
        proofValue: 'proofValue',
        type: 'Ed25519Signature2018',
        proofPurpose: 'assertionMethod',
        verificationMethod: 'https://example.com/verificationMethod',
        created: '2020-01-01T00:00:00Z',
        eip712Domain: {},
      },
    };

    it('should throw an error if the credential is not registered', async () => {
      credentialWithStatusRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.markStatusListCredential(
          credential,
          'did:ethr:volta:0xe852f6784EeD893cC81dDa21D31f212332CC120a'
        )
      ).rejects.toThrowError(BadRequestException);
    });

    it('should throw an error if the credential was registered with different namespace', async () => {
      credentialWithStatusRepository.findOne.mockResolvedValueOnce({
        namespace: 'other',
      });

      await expect(
        service.markStatusListCredential(
          credential,
          'did:ethr:volta:0xe852f6784EeD893cC81dDa21D31f212332CC120a'
        )
      ).rejects.toThrowError(BadRequestException);
    });

    it('should create a new status list credential for given credential', async () => {
      credentialWithStatusRepository.findOne.mockResolvedValueOnce({
        namespace: credential.credentialSubject.role.namespace,
        id: credential.id,
        entry: {
          statusListCredential: `https://example.com/v1/status-list/${credential.id}`,
        },
      });
      process.env.CHAIN_NAME = 'volta';
      process.env.CHAIN_ID = '73799';

      expect(
        await service.markStatusListCredential(
          credential,
          'did:ethr:volta:0xe852f6784EeD893cC81dDa21D31f212332CC120a'
        )
      ).toStrictEqual({
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/vc/status-list/2021/v1',
        ],
        id: credential.credentialStatus.statusListCredential,
        type: ['VerifiableCredential', 'StatusList2021Credential'],
        issuer: 'did:ethr:0x12047:0xe852f6784EeD893cC81dDa21D31f212332CC120a',
        issuanceDate: expect.any(String),
        credentialSubject: {
          id: 'uuid',
          type: 'StatusList2021',
          statusPurpose: 'revocation',
          encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
        },
      });
    });
  });

  describe('addSignedStatusListCredential()', () => {
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/vc/status-list/2021/v1',
      ],
      id: 'https://example.com/v1/status-list/urn:uuid:a98c8eb6-7bdc-48b8-8c26-0418dd044180',
      type: ['VerifiableCredential', 'StatusList2021Credential'],
      credentialSubject: {
        id: 'https://example.com/v1/status-list/urn:uuid:a98c8eb6-7bdc-48b8-8c26-0418dd044180',
        encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
        statusPurpose: 'revocation',
        type: 'StatusList2021',
      },
      issuer: 'did:ethr:0x0539:0xd0d07cdd21cddb268c41573d24c2d7f0e8cdb7bd',
      issuanceDate: '2022-05-27T11:31:30.225Z',
      proof: {
        '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
        type: 'EthereumEip712Signature2021',
        proofPurpose: 'assertionMethod',
        proofValue:
          '0xa264f127ba72b6ef87322706e2c716dbf56afebbae3164dfb731777043b5514a16fdbdf7e54e88833f4877788d6c369856080880a6c96874e81cff7a09d4023f1c',
        verificationMethod:
          'did:ethr:0x0539:0xd0d07cdd21cddb268c41573d24c2d7f0e8cdb7bd#controller',
        created: '2022-05-27T12:23:37.924Z',
        eip712Domain: {
          domain: {},
          messageSchema: {
            CredentialSubject: [
              { name: 'id', type: 'string' },
              { name: 'type', type: 'string' },
              { name: 'statusPurpose', type: 'string' },
              { name: 'encodedList', type: 'string' },
            ],
            EIP712Domain: [],
            Proof: [
              { name: '@context', type: 'string' },
              { name: 'verificationMethod', type: 'string' },
              { name: 'created', type: 'string' },
              { name: 'proofPurpose', type: 'string' },
              { name: 'type', type: 'string' },
            ],
            VerifiableCredential: [
              { name: '@context', type: 'string[]' },
              { name: 'id', type: 'string' },
              { name: 'type', type: 'string[]' },
              { name: 'issuer', type: 'string' },
              { name: 'issuanceDate', type: 'string' },
              { name: 'credentialSubject', type: 'CredentialSubject' },
              { name: 'proof', type: 'Proof' },
            ],
          },
          primaryType: 'VerifiableCredential',
        },
      },
    };

    it('should be able to re-revoke credential if already revoked', async () => {
      credentialWithStatusRepository.findOne.mockResolvedValueOnce({
        entry: {
          statusListCredential:
            'https://example.com/v1/status-list/a98c8eb6-7bdc-48b8-8c26-0418dd044180',
        },
      });
      statusListCredentialRepository.findOne.mockResolvedValueOnce({
        vc: credential,
      });
      statusListCredentialRepository.save.mockResolvedValueOnce({
        vc: credential,
      });
      namespaceStatusListRepository.findOne.mockResolvedValueOnce({
        namespace: 'namespace',
      });

      await expect(
        service.addSignedStatusListCredential(credential)
      ).resolves.toBe(credential);

      expect(statusListCredentialRepository.save).toBeCalledTimes(1);
    });

    it('should add a valid StatusList2021Credential when namespace revocations exists', async () => {
      statusListCredentialRepository.findOne.mockResolvedValueOnce(null);
      statusListCredentialRepository.save.mockImplementationOnce(
        (entity) => entity
      );
      namespaceStatusListRepository.findOne.mockResolvedValueOnce({
        namespace: 'namespace',
      });

      await expect(
        service.addSignedStatusListCredential(credential)
      ).resolves.toBe(credential);

      expect(statusListCredentialRepository.save).toHaveBeenCalledWith({
        statusListId: credential.id,
        vc: credential,
      });
    });

    it('should add a valid StatusList2021Credential when namespace revocations not exists', async () => {
      statusListCredentialRepository.findOne.mockResolvedValueOnce(null);
      statusListCredentialRepository.save.mockImplementationOnce(
        (entity) => entity
      );
      namespaceStatusListRepository.findOne.mockResolvedValueOnce({
        namespace: 'namespace',
      });

      await expect(
        service.addSignedStatusListCredential(credential)
      ).resolves.toBe(credential);

      expect(statusListCredentialRepository.save).toHaveBeenCalledWith({
        statusListId: credential.id,
        vc: credential,
      });
    });

    it('should throw an error when missing namespace status list', async () => {
      namespaceStatusListRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.addSignedStatusListCredential(credential)
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('verifyCredential()', () => {
    it('should throw an error when credential is not valid', async () => {
      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: ["Credential doesn't have a valid signature"],
        })
      );

      await expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        service.verifyCredential({ id: 'uuid' } as any)
      ).rejects.toThrowError(BadRequestException);
    });

    it('should not throw an error when credential is valid', async () => {
      jest.spyOn(didKit, 'verifyCredential').mockResolvedValueOnce(
        JSON.stringify({
          checks: [],
          warnings: [],
          errors: [],
        })
      );

      await expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        service.verifyCredential({ id: 'uuid' } as any)
      ).resolves.toBe(void 0);
    });
  });
});
