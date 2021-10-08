import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';

// TODO: fix test so pending can be removed
xdescribe('SearchController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
