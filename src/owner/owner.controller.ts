import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get('/:owner/roles')
  @ApiTags('Ownership')
  public async getRoles(@Param('owner') owner: string) {
    return await this.ownerService.getRolesByOwner(owner);
  }

  @Get('/:owner/apps')
  @ApiTags('Ownership')
  public async getApps(@Param('owner') owner: string) {
    return await this.ownerService.getAppsByOwner(owner);
  }

  @Get('/:owner/orgs')
  @ApiTags('Ownership')
  public async getOrgs(@Param('owner') owner: string) {
    return await this.ownerService.getOrgsByOwner(owner);
  }

  @Delete('/:namespace')
  @ApiTags('Ownership')
  public async delete(@Param('namespace') namespace: string) {
    return await this.ownerService.deleteNamespace(namespace);
  }
}
