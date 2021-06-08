import { Test, TestingModule } from '@nestjs/testing';
import { DIDService } from './did.service';

// TODO: fix test so pending can be removed
xdescribe('DidDocumentService', () => {
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
