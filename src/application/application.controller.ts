import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {
  }

  @Get()
  @ApiTags('Application')
  public async getAll() {
    return await this.applicationService.getAll();
  }

  @Get('/:id')
  @ApiTags('Application')
  public async getById(@Param('id') id: string) {
    return await this.applicationService.getById(id);
  }

  @Post()
  @ApiTags('Application')
  public async create(@Body() body: unknown) {
    console.log(body);
    return await this.applicationService.create();
  }
}
