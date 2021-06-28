import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';

// TODO: fix test so pending can be removed
xdescribe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationService],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
