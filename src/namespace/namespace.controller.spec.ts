import { Test, TestingModule } from '@nestjs/testing';
import { NamespaceController } from './namespace.controller';

describe('NamespaceController', () => {
  let controller: NamespaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NamespaceController],
    }).compile();

    controller = module.get<NamespaceController>(NamespaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
