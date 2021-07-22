import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import * as TestDbCOnfig from '../../../test/config';
// import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';
import { LoggerModule } from '../logger/logger.module';
import { Application } from '../application/application.entity';
import { SentryModule } from '../sentry/sentry.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganizationService } from './organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TestDbCOnfig.default as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Organization, Application]),
        LoggerModule,
        ConfigModule,
        SentryModule,
      ],
      controllers: [OrganizationController],
      providers: [ConfigService, OrganizationService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  afterEach(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
