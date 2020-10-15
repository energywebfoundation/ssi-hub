import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('org')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  @ApiTags('Organization')
  public async getAll() {
    return await this.organizationService.getAll();
  }

  @Get('/:namespace')
  @ApiTags('Organization')
  public async getById(@Param('namespace') namespace: string) {
    return await this.organizationService.getByNamespace(namespace);
  }

  @Get('/:namespace/exists')
  @ApiTags('Organization')
  public async exists(@Param('namespace') namespace: string) {
    return await this.organizationService.exists(namespace);
  }

  @Get('/:namespace/apps')
  @ApiTags('Organization')
  public async getAppsByOrgId(@Param('namespace') namespace: string) {
    return await this.organizationService.getApps(namespace);
  }

  @Get('/:namespace/roles')
  @ApiTags('Organization')
  public async getRolesByOrgId(@Param('namespace') namespace: string) {
    return await this.organizationService.getRoles(namespace);
  }
}
