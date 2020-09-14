import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.applicationService.getById(id);
  }

  @Post()
  public async create(@Body() body: unknown) {
    console.log(body);
    return await this.applicationService.create();
  }
}
