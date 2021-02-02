import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDTO } from './OrganizationDTO';
import { ApplicationDTO } from '../application/ApplicationDTO';
import { RoleDTO } from '../role/RoleDTO';
import { Auth } from '../auth/auth.decorator';

@Auth()
@Controller('org')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  @ApiTags('Organization')
  @ApiOperation({
    summary: 'Returns Array or Organizations',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDTO],
    description: 'Array of existing Organizations',
  })
  @ApiQuery({
    name: 'onlySubOrgs',
    required: false,
    type: Boolean,
    description:
      '**true** - shows only sub orgs <br> **false** - show all orgs',
  })
  public async getAll(@Query('onlySubOrgs') onlySubOrgs?: 'true' | 'false') {
    return await this.organizationService.getAll(onlySubOrgs);
  }

  @Get('/:namespace')
  @ApiTags('Organization')
  @ApiOperation({
    summary: 'Returns Organization with given namespace',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrganizationDTO,
    description: 'Organizations with matching Id',
  })
  public async getById(@Param('namespace') namespace: string) {
    return await this.organizationService.getByNamespace(namespace);
  }

  @Get('/:namespace/exists')
  @ApiTags('Organization')
  @ApiOperation({
    summary: 'Returns if Organization exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  public async exists(@Param('namespace') namespace: string) {
    return await this.organizationService.exists(namespace);
  }

  @Get('/:namespace/apps')
  @ApiTags('Organization')
  @ApiOperation({
    summary: 'Returns Array of Apps of an Organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ApplicationDTO],
    description: 'Apps connected with Org namespace',
  })
  public async getAppsByOrgId(@Param('namespace') namespace: string) {
    return await this.organizationService.getApps(namespace);
  }

  @Get('/:namespace/roles')
  @ApiTags('Organization')
  @ApiOperation({
    summary: 'Returns Array of Roles of an Organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RoleDTO],
    description: 'Roles connected with Org namespace',
  })
  public async getRolesByOrgId(@Param('namespace') namespace: string) {
    return await this.organizationService.getRoles(namespace);
  }

  @Get('/:namespace/suborgs')
  @ApiTags('Organization')
  @ApiOperation({
    summary: 'Returns Array of Sub Organizations of an Organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDTO],
    description: 'Sub Organizations connected with Org namespace',
  })
  public async getSubOrgs(@Param('namespace') namespace: string) {
    return await this.organizationService.getSubOrgByParentNamespace(namespace);
  }
}
