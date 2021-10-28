import { Test, TestingModule } from '@nestjs/testing';
import { DIDController } from './did.controller';

// TODO: fix test so pending can be removed
xdescribe('DidDocumentController', () => {
  let controller: DIDController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DIDController],
    }).compile();

    controller = module.get<DIDController>(DIDController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
