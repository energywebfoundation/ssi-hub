import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ApiQuery } from '@nestjs/swagger';
import { ClaimDataMessage } from './ClaimTypes';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get('/test')
  public async test() {

    const fakeData: ClaimDataMessage = {
      id: 'ASDF',
      issuer: 'issuer_did',
      requester: 'requester_did',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGFpbURhdGEiOnsiY2xhaW1UeXBlIjoib25pb24ucm9sZXMuYXNkZi5hcHAub25pb24uaWFtLmV3YyJ9LCJqdGkiOiIwOTBhNzM0NS1iNDBkLTRiZDktOWY5ZC1hMzU0ZTk0NWYzN2EiLCJpYXQiOjE2MDI3Njc3NDYsImV4cCI6MTYwMjc3MTM0Nn0.xxk6tng0kpQYk6yNkW2OxTM7Q440rplNCe78NDeOAgU'
    }

    this.claimService.saveOrUpdate(fakeData);


  }

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
  @ApiQuery({ name: 'accepted', required: false})
  @ApiQuery({ name: 'namespace', required: false})
  public async getByIssuerDid(
    @Param('did') did: string,
    @Query('accepted') accepted: boolean,
    @Query('namespace') namespace: string
  ) {
    return await this.claimService.getByIssuer(did, {accepted, namespace});
  }
  @Get('/requester/:did')
  @ApiQuery({ name: 'accepted', required: false})
  @ApiQuery({ name: 'namespace', required: false})
  public async getByRequesterDid(
    @Param('did') did: string,
    @Query('accepted') accepted: boolean,
    @Query('namespace') namespace: string,
  ) {
    return await this.claimService.getByRequester(did, {accepted, namespace});
  }
}
