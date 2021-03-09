import { Test, TestingModule } from '@nestjs/testing';
import { EnsService } from './ens.service';

describe('Web3Service', () => {
  let service: EnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnsService],
    }).compile();

    service = module.get<EnsService>(EnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
