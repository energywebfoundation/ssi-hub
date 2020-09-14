import { Test, TestingModule } from '@nestjs/testing';
import { DgraphService } from './dgraph.service';

describe('DgraphService', () => {
  let service: DgraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DgraphService],
    }).compile();

    service = module.get<DgraphService>(DgraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
