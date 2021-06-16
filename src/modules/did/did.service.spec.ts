import { getQueueToken } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '../../common/provider';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';

const MockLogger = {
  log: jest.fn(),
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
const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));
const queueMockFactory = jest.fn(() => ({
}));
jest.mock('@ew-did-registry/did-ipfs-store', () => {
  return {
    DidStore: jest.fn().mockImplementation(() => { return {} })
  }
});
jest.mock('@ew-did-registry/did-ethr-resolver', () => ({
  ...jest.requireActual('@ew-did-registry/did-ethr-resolver') as Record<string, unknown>,
  Resolver: jest.fn().mockImplementation(() => { return {} })
}));
jest.mock('../../ethers/EthereumDidRegistryFactory', () => ({
  EthereumDidRegistryFactory: {
    connect: jest.fn(() => {
      return {
        addEventListener: jest.fn()
      }
    })
  }
}));

describe('DidDocumentService', () => {
  let service: DIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DIDService,
        {
          provide: ConfigService,
          useValue: MockConfigService
        },
        {
          provide: SchedulerRegistry,
          useValue: MockObject
        },
        {
          provide: HttpService,
          useValue: MockObject
        },
        {
          provide: Logger,
          useValue: MockLogger
        },
        { provide: getQueueToken('dids'), useFactory: queueMockFactory },
        { provide: getRepositoryToken(DIDDocumentEntity), useFactory: repositoryMockFactory },
        { provide: Provider, useValue: MockObject }
      ]
    }).compile();

    service = module.get<DIDService>(DIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
