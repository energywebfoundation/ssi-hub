import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerService } from './owner.service';
import { ApplicationDTO } from '../application/application.dto';
import { OrganizationDTO } from '../organization/organization.dto';
import { RoleDTO } from '../role/role.dto';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get('/:owner/roles')
  @ApiTags('Ownership')
  @ApiOperation({
    summary: 'Returns Array or Roles owned by given DID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RoleDTO],
  })
  public async getRoles(@Param('owner') owner: string) {
    return await this.ownerService.getRolesByOwner(owner);
  }

  @Get('/:owner/apps')
  @ApiTags('Ownership')
  @ApiOperation({
    summary: 'Returns Array or Applications owned by given DID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ApplicationDTO],
  })
  public async getApps(@Param('owner') owner: string) {
    return await this.ownerService.getAppsByOwner(owner);
  }

  @Get('/:owner/orgs')
  @ApiTags('Ownership')
  @ApiOperation({
    summary: 'Returns Array or Organizations owned by given DID',
  })
  @ApiQuery({
    name: 'excludeSubOrgs',
    required: false,
    type: Boolean,
    description:
      '**true** - shows only main orgs <br> **false** - show all orgs',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDTO],
  })
  public async getOrgs(
    @Param('owner') owner: string,
    @Query('excludeSubOrgs') excludeSubOrgs: string,
  ) {
    return await this.ownerService.getOrgsByOwner(owner, excludeSubOrgs);
  }
}
