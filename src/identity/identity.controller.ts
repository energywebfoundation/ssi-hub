import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @Get('/:id')
  @ApiTags('Identity')
  public async getById(@Param('id') id: string) {
    return await this.identityService.getById(id);
  }

  @Post()
  @ApiTags('Identity')
  public async create(@Body() body: unknown) {
    console.log(body);
    return await this.identityService.create();
  }
}
