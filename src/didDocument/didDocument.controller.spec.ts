import { Test, TestingModule } from '@nestjs/testing';
import { DidDocumentController } from './didDocument.controller';

describe('DidDocumentController', () => {
  let controller: DidDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DidDocumentController],
    }).compile();

    controller = module.get<DidDocumentController>(DidDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
