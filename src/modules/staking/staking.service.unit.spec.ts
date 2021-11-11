import { Wallet } from 'ethers';
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
import { RoleService } from '../role/role.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OrganizationService } from '../organization/organization.service';

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

const MockRoleService = jest.fn();

const MockOrganizationService = jest.fn();

const stakingTerms = new StakingTerms({
  terms: `<ul> <li> <a href='#'>term 1 </a></li> </ul>`,
  version: 1.0,
});

const patronRole = 'patronRole.roles.ewc.iam';

const pool = new StakingPool({
  address: Wallet.createRandom().address,
  patronRoles: [patronRole],
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
        SchedulerRegistry,
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
        {
          provide: RoleService,
          useValue: MockRoleService,
        },
        {
          provide: OrganizationService,
          useValue: MockOrganizationService,
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

  it('stakePool(), should save pool', async () => {
    jest.spyOn(service, 'getTerms').mockResolvedValue(stakingTerms);
    jest.spyOn(service as any, 'getPoolFromChain').mockResolvedValueOnce(pool);
    jest.spyOn(stakePoolRepo, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(stakePoolRepo, 'save');
    await service.syncPool(pool.address);
    expect(service.getTerms).toHaveBeenCalled();
    expect(stakePoolRepo.findOne).toHaveBeenCalledWith(pool.address);
    expect(stakePoolRepo.save).toHaveBeenCalledWith(pool);
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
