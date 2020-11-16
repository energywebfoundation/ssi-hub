import { Test, TestingModule } from '@nestjs/testing';
import { DIDService } from './did.service';

describe('DidDocumentService', () => {
  let service: DIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DIDService],
    }).compile();

    service = module.get<DIDService>(DIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
