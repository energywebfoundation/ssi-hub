import { Controller, Get, Param } from '@nestjs/common';
import { ClaimService } from './claim.service';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.claimService.getById(id);
  }
  @Get('/issuer/:did')
  public async getByIssuerDid(@Param('did') did: string) {
    return await this.claimService.getByIssuer(did);
  }
  @Get('/requester/:did')
  public async getByRequesterDid(@Param('did') did: string) {
    return await this.claimService.getByRequester(did);
  }
  @Get('/requester/:did/accepted')
  public async getAcceptedByRequesterDid(@Param('did') did: string) {
    return await this.claimService.getByRequester(did, 'accepted');
  }
  @Get('/requester/:did/pending')
  public async getPendingByRequesterDid(@Param('did') did: string) {
    return await this.claimService.getByRequester(did, 'pending');
  }
}
