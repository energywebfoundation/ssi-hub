import { Test, TestingModule } from '@nestjs/testing';
import { DIDController } from './did.controller';

describe('DidDocumentController', () => {
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
