import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';

describe('OwnerController', () => {
  let controller: OwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
    }).compile();

    controller = module.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
