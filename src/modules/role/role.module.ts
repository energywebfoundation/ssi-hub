import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '../application/application.module';
import { DIDModule } from '../did/did.module';
import { OrganizationModule } from '../organization/organization.module';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { RoleSubscriber } from './role.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    DIDModule,
    ApplicationModule,
    OrganizationModule,
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleResolver, RoleSubscriber],
  exports: [RoleService, TypeOrmModule, ApplicationModule, OrganizationModule],
})
export class RoleModule {}
