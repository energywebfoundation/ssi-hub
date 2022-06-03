import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimModule } from '../claim/claim.module';
import { DIDModule } from '../did/did.module';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import {
  CredentialWithStatus,
  StatusListCredential,
  NamespaceStatusLists,
  StatusListEntry,
  NamespaceStatusList,
} from './entities';
import { StatusListController } from './status-list.controller';
import { StatusListService } from './status-list.service';

@Module({
  imports: [
    RoleModule,
    DIDModule,
    ClaimModule,
    TypeOrmModule.forFeature([
      StatusListCredential,
      CredentialWithStatus,
      NamespaceStatusLists,
      NamespaceStatusList,
      StatusListEntry,
    ]),
  ],
  controllers: [StatusListController],
  providers: [StatusListService, RoleService],
})
export class StatusListModule {}
