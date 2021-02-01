import { Test, TestingModule } from '@nestjs/testing';
import { NamespaceService } from './namespace.service';

describe('NamespaceService', () => {
  let service: NamespaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NamespaceService],
    }).compile();

    service = module.get<NamespaceService>(NamespaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
