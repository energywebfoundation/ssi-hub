import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { getQueueToken } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '../../common/provider';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';
import { Logger } from '../logger/logger.service';

const nameof = <T>(name: Extract<keyof T, string>): string => name; // https://stackoverflow.com/a/50470026
const MockLogger = {
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  setContext: jest.fn(),
};
const MockObject = {};
const MockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'DID_SYNC_ENABLED') {
      return 'false';
    }
    return null;
  }),
};
const didDoc: IDIDDocument = {
  id: '<id>',
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
  save: jest.fn(entity => entity),
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
jest.mock('../../ethers/factories/EthereumDIDRegistry__factory', () => ({
  EthereumDIDRegistry__factory: {
    connect: jest.fn(() => {
      return {
        on: jest.fn(),
      };
    }),
  },
}));

describe('DidDocumentService', () => {
  let service: DIDService;

  beforeEach(async () => {
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
        { provide: Provider, useValue: MockObject },
      ],
    }).compile();

    service = module.get<DIDService>(DIDService);
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

  function checkReturnedDIDDoc(returnedDoc: IDIDDocument) {
    for (const property in returnedDoc) {
      expect(returnedDoc[property]).toStrictEqual(didDoc[property]);
    }
    expect(returnedDoc[nameof<DIDDocumentEntity>('logs')]).toBeUndefined();
  }
});
