import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';

// TODO: fix test so pending can be removed
xdescribe('RoleController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
