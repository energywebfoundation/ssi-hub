/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { addressOf, ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { Methods, Chain } from '@ew-did-registry/did';
import { getQueueToken } from '@nestjs/bull';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockProvider, deployContract } from 'ethereum-waffle';
import { BigNumber, utils, Wallet } from 'ethers';
import { Provider } from '../../common/provider';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import { Logger } from '../logger/logger.service';
import { SentryTracingService } from '../sentry/sentry-tracing.service';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';
import { UPDATE_DOCUMENT_QUEUE_NAME } from './did.types';
import { IPFSService } from '../ipfs/ipfs.service';
import { LatestDidSync } from './latestDidSync.entity';

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
const cachedIdentity = provider.getWallets()[0];
const didDoc: IDIDDocument = {
  id: `did:${Methods.Erc1056}:${Chain.VOLTA}:${cachedIdentity.address}`,
  service: [],
  authentication: [],
  publicKey: [],
  created: '<created>',
  proof: undefined,
  updated: '<updated>',
  '@context': '<context>',
};
let cachedDoc: DIDDocumentEntity;
const repositoryMockFactory = jest.fn(() => ({
  findOneBy: jest.fn((did: string) => {
    return did === cachedDoc?.id ? cachedDoc : null;
  }),
  save: jest.fn((entity) => entity),
}));
const queueMockFactory = jest.fn(() => ({ clean: jest.fn() }));
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
  let module: TestingModule;

  beforeEach(async () => {
    didRegistry = (await deployContract(
      cachedIdentity,
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

    module = await Test.createTestingModule({
      providers: [
        DIDService,
        { provide: ConfigService, useValue: MockConfigService },
        { provide: SchedulerRegistry, useValue: MockObject },
        { provide: HttpService, useValue: MockObject },
        { provide: Logger, useValue: MockLogger },
        {
          provide: getQueueToken(UPDATE_DOCUMENT_QUEUE_NAME),
          useFactory: queueMockFactory,
        },
        {
          provide: getRepositoryToken(DIDDocumentEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(LatestDidSync),
          useFactory: repositoryMockFactory,
        },
        { provide: Provider, useValue: provider },
        { provide: SentryTracingService, useValue: MockSentryTracing },
        {
          provide: 'RegistrySettings',
          useFactory: (configService: ConfigService) => ({
            abi: ethrReg.abi,
            address: configService.get<string>('DID_REGISTRY_ADDRESS'),
            method: Methods.Erc1056,
          }),
          inject: [ConfigService],
        },
        { provide: IPFSService, useValue: MockObject },
      ],
    }).compile();
    await module.init();

    service = module.get<DIDService>(DIDService);
  });

  afterEach(async () => {
    await module.close();
  });

  afterAll(() => {
    expect(MockLogger.error).not.toBeCalled();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getByID should return cached document', async () => {
    cachedDoc = { ...didDoc, logs: '<logs>' };
    const returnedDoc = await service.getById(cachedDoc.id);
    checkReturnedDIDDoc(returnedDoc);
  });

  it('getById should return cached document when DID is in lower case', async () => {
    cachedDoc = { ...didDoc, logs: '<logs>' };
    const returnedDoc = await service.getById(cachedDoc.id.toLowerCase());
    checkReturnedDIDDoc(returnedDoc);
  });

  it('getByID should not return non-cached document', async () => {
    cachedDoc = undefined;
    const returnedDoc = await service.getById(
      `did:ethr:${Chain.VOLTA}:${Wallet.createRandom().address}`
    );
    checkReturnedDIDDoc(returnedDoc);
  });

  it('parseLogs() should parse BigNumbers', async () => {
    const logs = {
      topBlock: BigNumber.from('0x1ffffffffff'),
    };
    const parsedLogs = (service as any).parseLogs(JSON.stringify(logs));
    expect(parsedLogs.topBlock).toBeInstanceOf(BigNumber);
  });

  it('should synchronize not cached document', async () => {
    const identity = provider.getWallets()[1];
    const did = `did:${Methods.Erc1056}:${Chain.VOLTA}:${identity}`;
    cachedDoc = { ...didDoc, logs: '<logs>' };
    const cachedDID = new Promise((resolve) =>
      jest
        .spyOn(service, 'addCachedDocument')
        .mockImplementationOnce((did: string) => {
          resolve(did);
          return Promise.resolve({ ...cachedDoc, id: did });
        })
    );
    await (
      await didRegistry
        .connect(identity)
        .setAttribute(
          identity.address,
          formatBytes32String('publicKey'),
          '0x12',
          47
        )
    ).wait();
    expect(cachedDID).resolves.toEqual(did);
  });

  it('should update cached document', async () => {
    cachedDoc = { ...didDoc, logs: '<logs>' };
    const refreshedDID = new Promise((resolve) =>
      jest
        .spyOn(service, 'incrementalRefreshCachedDocument')
        .mockImplementationOnce((did: string) => {
          resolve(did);
          return Promise.resolve(cachedDoc);
        })
    );
    await (
      await didRegistry.setAttribute(
        addressOf(cachedDoc.id),
        formatBytes32String('publicKey'),
        '0x12',
        47
      )
    ).wait();
    expect(refreshedDID).resolves.toEqual(cachedDoc.id);
  });

  function checkReturnedDIDDoc(returnedDoc: IDIDDocument) {
    for (const property in returnedDoc) {
      expect(returnedDoc[property]).toStrictEqual(didDoc[property]);
    }
    expect(returnedDoc[nameof<DIDDocumentEntity>('logs')]).toBeUndefined();
  }
});
