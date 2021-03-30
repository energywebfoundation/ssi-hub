import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from '../organization/organization.module';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), OrganizationModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationResolver],
  exports: [ApplicationService, TypeOrmModule, TypeOrmModule],
})
export class ApplicationModule {}
