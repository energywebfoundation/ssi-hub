/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { Methods, Chain } from '@ew-did-registry/did';
import { getQueueToken } from '@nestjs/bull';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockProvider, deployContract } from 'ethereum-waffle';
import { BigNumber, utils } from 'ethers';
import { Provider } from '../../common/provider';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import { Logger } from '../logger/logger.service';
import { SentryTracingService } from '../sentry/sentry-tracing.service';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';

const { formatBytes32String } = utils;

const nameof = <T>(name: Extract<keyof T, string>): string => name; // https://stackoverflow.com/a/50470026
const MockLogger = {
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
};
const MockObject = {};
const MockSentryTracing = {
  startTransaction: jest.fn(),
};
const provider = new MockProvider();
const didOwner = provider.getWallets()[0];
const didDoc: IDIDDocument = {
  id: `did:${Methods.Erc1056}:${Chain.VOLTA}:${didOwner.address}`,
  service: [],
  authentication: [],
  publicKey: [],
  created: '<created>',
  proof: undefined,
  updated: '<updated>',
  '@context': '<context>',
};
let didDocEntity: DIDDocumentEntity;
const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn(() => {
    return didDocEntity;
  }),
  save: jest.fn((entity) => entity),
}));
const queueMockFactory = jest.fn(() => ({}));
jest.mock('@ew-did-registry/did-ipfs-store', () => {
  return {
    DidStore: jest.fn(() => {
      return {};
    }),
  };
});
jest.mock('@ew-did-registry/did-ethr-resolver', () => ({
  ...(jest.requireActual('@ew-did-registry/did-ethr-resolver') as Record<
    string,
    unknown
  >),
  documentFromLogs: jest.fn(() => didDoc),
  Resolver: jest.fn(() => {
    return {
      readFromBlock: jest.fn(() => '<logs>'),
    };
  }),
}));

describe('DidDocumentService', () => {
  let service: DIDService;
  let didRegistry: EthereumDIDRegistry;

  beforeEach(async () => {
    didRegistry = (await deployContract(
      didOwner,
      ethrReg
    )) as EthereumDIDRegistry;
    await didRegistry.deployed();

    const MockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'DID_SYNC_ENABLED') {
          return 'false';
        } else if (key === 'DID_REGISTRY_ADDRESS') {
          return didRegistry.address;
        } else {
          return null;
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DIDService,
        { provide: ConfigService, useValue: MockConfigService },
        { provide: SchedulerRegistry, useValue: MockObject },
        { provide: HttpService, useValue: MockObject },
        { provide: Logger, useValue: MockLogger },
        { provide: getQueueToken('dids'), useFactory: queueMockFactory },
        {
          provide: getRepositoryToken(DIDDocumentEntity),
          useFactory: repositoryMockFactory,
        },
        { provide: Provider, useValue: provider },
        { provide: SentryTracingService, useValue: MockSentryTracing },
      ],
    }).compile();
    await module.init();

    service = module.get<DIDService>(DIDService);
  });

  afterAll(() => {
    expect(MockLogger.error).not.toBeCalled();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getByID should return only IDIDDocument params from cached document', async () => {
    didDocEntity = Object.assign({}, didDoc, { logs: '<logs>' });
    const returnedDoc = await service.getById('<any DID>');
    checkReturnedDIDDoc(returnedDoc);
  });

  it('getByID should return only IDIDDocument params from non-cached document', async () => {
    didDocEntity = undefined;
    const returnedDoc = await service.getById('<any DID>');
    checkReturnedDIDDoc(returnedDoc);
  });

  it('parseLogs() should parse BigNumbers', async () => {
    const logs = {
      topBlock: BigNumber.from('0x1ffffffffff'),
    };
    const parsedLogs = (service as any).parseLogs(JSON.stringify(logs));
    expect(parsedLogs.topBlock).toBeInstanceOf(BigNumber);
  });

  it('should not update not cached document', async () => {});

  it('should update cached document', async () => {
    didDocEntity = Object.assign({}, didDoc, { logs: '<logs>' });
    const refreshedDID = new Promise((resolve) =>
      jest
        .spyOn(service, 'incrementalRefreshCachedDocument')
        .mockImplementationOnce((did: string) => {
          resolve(did);
          return Promise.resolve(didDocEntity);
        })
    );
    await (
      await didRegistry.setAttribute(
        didOwner.address,
        formatBytes32String('publicKey'),
        '0x12',
        47
      )
    ).wait();
    expect(refreshedDID).resolves.toEqual(didDocEntity.id);
  });

  function checkReturnedDIDDoc(returnedDoc: IDIDDocument) {
    for (const property in returnedDoc) {
      expect(returnedDoc[property]).toStrictEqual(didDoc[property]);
    }
    expect(returnedDoc[nameof<DIDDocumentEntity>('logs')]).toBeUndefined();
  }
});
