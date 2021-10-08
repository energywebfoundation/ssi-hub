import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';

// TODO: fix test so pending can be removed
xdescribe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
