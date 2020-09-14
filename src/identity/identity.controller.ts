import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.identityService.getById(id);
  }

  @Post()
  public async create(@Body() body: unknown) {
    console.log(body);
    return await this.identityService.create();
  }
}
