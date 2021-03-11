import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../application/application.entity';
import { Organization } from '../organization/organization.entity';
import { Role } from '../role/role.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Organization, Role])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
