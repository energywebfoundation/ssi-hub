import { BullModule, getQueueToken } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';
import { Logger } from '../logger/logger.service';
import { NatsService } from './nats.service';
import { NatsWrapper } from './nats.wrapper';

describe.only('NatsService', () => {
  let mockedNats: jest.Mocked<NatsWrapper>;
  let service: NatsService;
  const QUEUE_NAME = 'nats-messages';
  let mockQueue;
  beforeEach(async () => {
    mockedNats = createMockInstance(NatsWrapper);
    mockQueue = {
      add: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: QUEUE_NAME,
        }),
      ],
      providers: [NatsService, NatsWrapper, ConfigService, Logger],
    })
      .overrideProvider(getQueueToken(QUEUE_NAME))
      .useValue(mockQueue)
      .overrideProvider(NatsWrapper)
      .useValue(mockedNats)
      .compile();

    service = module.get<NatsService>(NatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send same event to every did only once', async () => {
    await service.publishForDids(
      'rt',
      'topic1',
      ['did1', 'did2', 'did3', 'did1', 'did2', 'did1'],
      { data: 'some data' },
    );

    expect(mockQueue.add).toBeCalledTimes(3);
  });
});
