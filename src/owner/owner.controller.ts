import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OwnerService } from './owner.service';
import { EnsTestService } from '../ENS/ens.testService';

@Controller('owner')
export class OwnerController {
  constructor(
    private ownerService: OwnerService,
    private ensTest: EnsTestService,
  ) {}

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

  @Post('/fix')
  @ApiTags('Fix')
  public async delete() {
    const fixes = await this.ensTest.TypesFix();
    return `${fixes} nodes fixed`;
  }
}
