import { Controller, Get, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('app')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {
  }

  @Get()
  @ApiTags('Application')
  public async getAll() {
    return await this.applicationService.getAll();
  }

  @Get('/:namespace')
  @ApiTags('Application')
  public async getById(@Param('namespace') namespace: string) {
    return await this.applicationService.getByNamespace(namespace);
  }
  @Get('/:namespace/exists')
  @ApiTags('Application')
  public async exists(@Param('namespace') namespace: string) {
    return await this.applicationService.exists(namespace);
  }

  @Get('/:namespace/roles')
  @ApiTags('Application')
  public async getRolesByAppId(@Param('namespace') namespace: string) {
    return await this.applicationService.getRoles(namespace);
  }
}
