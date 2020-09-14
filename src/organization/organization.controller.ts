import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.organizationService.getById(id);
  }

  @Post()
  public async create(@Body() body: unknown) {
    console.log(body);
    return await this.organizationService.create();
  }
}
