import { Test, TestingModule } from '@nestjs/testing';
import { Web3Service } from './web3.service';

describe('Web3Service', () => {
  let service: Web3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Web3Service],
    }).compile();

    service = module.get<Web3Service>(Web3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
