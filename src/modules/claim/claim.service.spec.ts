import { Test, TestingModule } from '@nestjs/testing';
import { ClaimService, ClaimVerificationService } from './services';
import { Logger } from '../logger/logger.service';
import { RoleService } from '../role/role.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import * as TestDbCOnfig from '../../../e2e/config';
import { AssetsService } from '../assets/assets.service';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { RoleClaim } from './entities/roleClaim.entity';
import { ConfigService } from '@nestjs/config';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { Methods } from '@ew-did-registry/did';
import { EthereumDIDRegistry } from '../../ethers/EthereumDIDRegistry';
import { deployContract, MockProvider } from 'ethereum-waffle';
import { Provider } from '../../common/provider';
import { Asset, AssetsHistory } from '../assets/assets.entity';
import { DIDService } from '../did/did.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
// TODO: fix test so pending can be removed
// private readonly roleService: RoleService,
// private readonly logger: Logger,
// @InjectRepository(RoleClaim)
// private readonly roleClaimRepository: Repository<RoleClaim>,
// @InjectRepository(Claim)
// private readonly claimRepository: Repository<Claim>,
// private readonly assetService: AssetsService,
// private claimVerificationService: ClaimVerificationService
// ) {
// this.logger.setContext(ClaimService.name);
// }
const MockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

const MockClaimVerificationService = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

//let service: DIDService;
const provider = new MockProvider();
let didRegistry: EthereumDIDRegistry;
const cachedIdentity = provider.getWallets()[0];

const MockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'DID_SYNC_ENABLED') {
      return 'false';
    } else if (key === 'DID_REGISTRY_ADDRESS') {
      return didRegistry.address;
    } else {
      return null;
    }
  }),
};

const MockRoleService = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
const MockDidService = {
  log: jest.fn(),
  error: jest.fn(),
  setContext: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
describe('ClaimService', () => {
  let service: ClaimService;
  let queryRunner: QueryRunner;
  //let claimRepo: Repository<Claim>;
  //let roleRepo: Repository<Role>;
  beforeEach(async () => {
    jest.resetAllMocks();
    didRegistry = (await deployContract(
      cachedIdentity,
      ethrReg
    )) as EthereumDIDRegistry;
    await didRegistry.deployed();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([RoleClaim, Claim, Asset, AssetsHistory]),
      ],
      providers: [
        ClaimService,
        {
          provide: RoleService,
          useValue: MockRoleService,
        },
        {
          provide: DIDService,
          useValue: MockDidService,
        },

        {
          provide: Logger,
          useValue: MockLogger,
        },
        AssetsService,
        {
          provide: ClaimVerificationService,
          useValue: MockClaimVerificationService,
        },
        {
          provide: 'RegistrySettings',
          useFactory: (configService: ConfigService) => ({
            abi: ethrReg.abi,
            address: configService.get<string>('DID_REGISTRY_ADDRESS'),
            method: Methods.Erc1056,
          }),
          inject: [ConfigService],
        },
        { provide: ConfigService, useValue: MockConfigService },
        Provider,
        EventEmitter2,
        SchedulerRegistry,
      ],
    }).compile();
    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner =
      dbConnection.createQueryRunner('master');
    await queryRunner.startTransaction();
    //roleRepo = module.get<Repository<Role>>(getRepositoryToken(Role));
    //claimRepo = module.get<Repository<Claim>>(getRepositoryToken(Claim))
    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
