import { Test, TestingModule } from '@nestjs/testing';
import { ClaimService } from './claim.service';

// TODO: fix test so pending can be removed
xdescribe('ClaimService', () => {
  let service: ClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimService],
    }).compile();

    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
