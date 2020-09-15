import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {
  }

  @Get()
  @ApiTags('Organization')
  public async getAll() {
    return await this.organizationService.getAll();
  }

  @Get('/:id')
  @ApiTags('Organization')
  public async getById(@Param('id') id: string) {
    return await this.organizationService.getById(id);
  }

  @Post()
  @ApiTags('Organization')
  public async create(@Body() body: unknown) {
    return await this.organizationService.create();
  }
}
