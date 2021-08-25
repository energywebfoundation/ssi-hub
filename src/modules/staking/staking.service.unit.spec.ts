import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../logger/logger.service';
import { StakingService } from './staking.service';
import { StakingPool } from './entities/staking.pool.entity';
import { StakingTerms } from './entities/staking.terms.entity';
import { Provider } from '../../common/provider';
import { ConfigModule } from '@nestjs/config';

const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const MockStakePoolRepo = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const MockStakeTermsRepo = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const stakingTerms = new StakingTerms({
  terms: `<ul> <li> <a href='#'>term 1 </a></li> </ul>`,
  version: 1.0,
});

const stakePool = new StakingPool({
  address: '',
  terms: stakingTerms,
});

describe('StakingService', () => {
  let module: TestingModule;
  let app: INestApplication;
  let service: StakingService;
  let stakePoolRepo: Repository<StakingPool>;
  let stakeTermsRepo: Repository<StakingTerms>;

  beforeEach(async () => {
    jest.clearAllMocks();
    module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        StakingService,
        Provider,
        {
          provide: Logger,
          useValue: MockLogger,
        },
        {
          provide: getRepositoryToken(StakingPool),
          useValue: MockStakePoolRepo,
        },
        {
          provide: getRepositoryToken(StakingTerms),
          useValue: MockStakeTermsRepo,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<StakingService>(StakingService);
    stakePoolRepo = module.get<Repository<StakingPool>>(
      getRepositoryToken(StakingPool),
    );
    stakeTermsRepo = module.get<Repository<StakingTerms>>(
      getRepositoryToken(StakingTerms),
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('getTerms(), should call mocked findOne method to fetch terms and conditions', async () => {
    jest.spyOn(stakeTermsRepo, 'findOne');
    await service.getTerms();
    expect(stakeTermsRepo.findOne).toHaveBeenCalledWith({
      order: {
        version: 'DESC',
      },
    });
  }, 30000);

  it('stakePool(), should throw an error if address already exists', async () => {
    jest.spyOn(service, 'getTerms').mockResolvedValueOnce(stakingTerms);
    jest.spyOn(stakePoolRepo, 'findOne').mockResolvedValueOnce(stakePool);
    jest.spyOn(stakePoolRepo, 'save');
    await expect(service.saveStakingPool('')).rejects.toThrowError(
      'Staking pool with this address already exists!',
    );
    expect(service.getTerms).toHaveBeenCalled();
    expect(stakePoolRepo.findOne).toHaveBeenCalledWith({
      where: {
        address: stakePool.address,
      },
    });
    expect(stakePoolRepo.save).not.toHaveBeenCalled();
  }, 30000);

  it('stakePool(), should save stake pool', async () => {
    jest.spyOn(service, 'getTerms').mockResolvedValueOnce(stakingTerms);
    jest.spyOn(stakePoolRepo, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(stakePoolRepo, 'save');
    await service.saveStakingPool('');
    expect(service.getTerms).toHaveBeenCalled();
    expect(stakePoolRepo.findOne).toHaveBeenCalledWith({
      where: {
        address: stakePool.address,
      },
    });
    expect(stakePoolRepo.save).toHaveBeenCalledWith(stakePool);
  }, 30000);

  it('stakePool(), should throw error when trying to save terms that already exists', async () => {
    jest.spyOn(stakeTermsRepo, 'findOne').mockResolvedValueOnce(stakingTerms);

    await expect(service.saveTerms(stakingTerms)).rejects.toThrowError(
      'Staking terms and condition already exists',
    );
    expect(stakeTermsRepo.findOne).toHaveBeenCalledWith({
      where: stakingTerms,
    });
    expect(stakeTermsRepo.save).not.toHaveBeenCalled();
  }, 30000);

  it('stakePool(), should save terms and conditions', async () => {
    jest.spyOn(stakeTermsRepo, 'findOne').mockResolvedValueOnce(null);

    await service.saveTerms(stakingTerms);

    expect(stakeTermsRepo.findOne).toHaveBeenCalledWith({
      where: stakingTerms,
    });

    expect(stakeTermsRepo.save).toHaveBeenCalledWith(stakingTerms);
  }, 30000);
});
