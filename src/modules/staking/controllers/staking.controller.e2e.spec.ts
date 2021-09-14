import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import request from 'supertest';
import { INestApplication, VersioningType } from '@nestjs/common';
import { StakingTerms } from '../entities/staking.terms.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { LoggerModule } from '../../logger/logger.module';
import { SentryModule } from '../../sentry/sentry.module';
import { StakingController } from './staking.controller';
import { StakingService } from '../staking.service';
import * as TestDbCOnfig from '../../../../test/config';
import { StakingPool } from '../entities/staking.pool.entity';
import { Provider } from '../../../common/provider';
import { ConfigModule } from '@nestjs/config';

const stakingTermsFixture = async (
  repo: Repository<StakingTerms>,
  count = 1,
) => {
  const terms = [];
  for (let i = 0; i < count; i++) {
    const stakingTerms = new StakingTerms({
      terms: `<ul> <li> <a href='#'>term ${i + 1} </a></li> </ul>`,
      version: i + 0.1,
    });
    terms.push(stakingTerms);
  }
  return repo.save(terms);
};

describe('StakingController', () => {
  let module: TestingModule;
  let repo: Repository<StakingTerms>;
  let queryRunner: QueryRunner;
  let testHttpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let stakeTerms: StakingTerms[];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([StakingTerms, StakingPool]),
        LoggerModule,
        SentryModule,
        ConfigModule,
      ],
      controllers: [StakingController],
      providers: [StakingService, Provider],
    }).compile();

    app = module.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
    });
    await app.init();

    const dbConnection = module.get(Connection);
    const manager = module.get(EntityManager);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryRunner = manager.queryRunner = dbConnection.createQueryRunner(
      'master',
    );
    repo = module.get<Repository<StakingTerms>>(
      getRepositoryToken(StakingTerms),
    );
    await queryRunner.startTransaction();
    stakeTerms = await stakingTermsFixture(repo, 2);
    testHttpServer = request(app.getHttpServer());
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
    await app.close();
  });

  it('getTerms(), should get the current terms and conditions', async () => {
    await testHttpServer
      .get(`/v1/staking/terms`)
      .expect(200)
      .expect(res => {
        expect(res.body.version).toEqual(stakeTerms[1].version);
        expect(res.body.terms).toEqual(stakeTerms[1].terms);
      });
  }, 30000);

  it('createTerms(), should throw an error when trying to save an already existing terms and conditions', async () => {
    await testHttpServer
      .post(`/v1/staking/terms`)
      .send({
        version: stakeTerms[1].version,
        terms: stakeTerms[1].terms,
      })
      .expect(400);
  }, 30000);

  it('createTerms(), should create terms and conditions', async () => {
    const termsToSave = {
      version: `1.2`,
      terms: '<h1> <a href="#"> Term version 1.3 </a> </h1>',
    };
    await testHttpServer
      .post(`/v1/staking/terms`)
      .send(termsToSave)
      .expect(201)
      .expect(res => {
        expect(res.body.version).toEqual(`${termsToSave.version}`);
        expect(res.body.terms).toEqual(termsToSave.terms);
      });
  }, 30000);
});
