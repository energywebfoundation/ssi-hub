import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ApiTags } from '@nestjs/swagger';
import { ClaimDefinitionDTO } from './ClaimDTO';

@Controller('claim')
export class ClaimController {
  constructor(private claimService: ClaimService) {
  }

  @Get('/definition/:id')
  @ApiTags('Claims')
  public async getById(@Param('id') id: string) {
    return await this.claimService.getClaimById(id);
  }

  @Post('/definition')
  @ApiTags('Claims')
  public async create(@Body() body: ClaimDefinitionDTO) {
    console.log(body);
    return await this.claimService.addClaim(body);
  }

  @Put('/definition/:id/attributes')
  @ApiTags('Claims')
  public async update(@Param('id') id: string,@Body() body: [string, string][]) {
    return await this.claimService.addAttributes(id, body);
  }
}
