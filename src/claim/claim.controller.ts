import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.claimService.getById(id);
  }
  @Get('/parent/:namespace')
  public async getByParentNamespace(@Param('id') id: string) {
    return await this.claimService.getByParentNamespace(id);
  }
  @Get('/user/:did')
  public async getByUserDid(@Param('did') did: string) {
    return await this.claimService.getByUserDid(did);
  }
  @Get('/issuer/:did')
  @ApiQuery({ name: 'accepted', required: false })
  @ApiQuery({ name: 'namespace', required: false })
  public async getByIssuerDid(
    @Param('did') did: string,
    @Query('accepted') accepted: boolean,
    @Query('namespace') namespace: string,
  ) {
    return await this.claimService.getByIssuer(did, { accepted, namespace });
  }
  @Get('/requester/:did')
  @ApiQuery({ name: 'accepted', required: false })
  @ApiQuery({ name: 'namespace', required: false })
  public async getByRequesterDid(
    @Param('did') did: string,
    @Query('accepted') accepted: boolean,
    @Query('namespace') namespace: string,
  ) {
    return await this.claimService.getByRequester(did, { accepted, namespace });
  }
}
