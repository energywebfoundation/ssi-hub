import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimDefinitionDTO } from '../Interfaces/Claims';

@Controller('claim')
export class ClaimController {
  constructor(private claimService: ClaimService) {
  }

  @Get('/definition/:id')
  public async getById(@Param('id') id: string) {
    return await this.claimService.getClaimById(id);
  }

  @Post('/definition')
  public async create(@Body() body: ClaimDefinitionDTO) {
    console.log(body);
    return await this.claimService.addClaim(body);
  }

  @Put('/definition/:id/attributes')
  public async update(@Param('id') id: string,@Body() body: [string, string][]) {
    console.log(body);
    return await this.claimService.addAttributes(id, body);
  }
}
