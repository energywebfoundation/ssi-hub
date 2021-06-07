import { Test, TestingModule } from '@nestjs/testing';
import { ClaimController } from './claim.controller';

// TODO: fix test so pending can be removed
xdescribe('ClaimController', () => {
  let controller: ClaimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimController],
    }).compile();

    controller = module.get<ClaimController>(ClaimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
