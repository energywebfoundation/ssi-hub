import { Test, TestingModule } from '@nestjs/testing';
import { DidDocumentService } from './didDocument.service';

describe('DidDocumentService', () => {
  let service: DidDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DidDocumentService],
    }).compile();

    service = module.get<DidDocumentService>(DidDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
