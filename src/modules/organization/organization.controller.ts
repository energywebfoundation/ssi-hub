import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDTO } from './organization.dto';
import { ApplicationDTO } from '../application/application.dto';
import { RoleDTO } from '../role/role.dto';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { BooleanPipe } from '../../common/boolean.pipe';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'org', version: '1' })
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

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

  @Get('/owner/:owner')
  @ApiTags('Organization')
  @ApiOperation({
    summary:
      'Returns organizations owned by given identity optionally including organizations subdomains',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrganizationDTO,
    description: 'Organizations owned by given identity',
  })
  public async getByOwner(
    @Param('owner') owner: string,
    @Query('withRelations', BooleanPipe) withRelations: boolean
  ) {
    return this.organizationService.getByOwner(owner, { withRelations });
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
    return await this.organizationService.getSubOrgs(namespace);
  }
}
