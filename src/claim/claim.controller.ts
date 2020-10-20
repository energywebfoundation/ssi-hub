import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClaimDataMessage, NATS_EXCHANGE_TOPIC } from './ClaimTypes';
import { NatsService } from '../nats/nats.service';
import { v4 as uuid } from 'uuid';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('claim')
export class ClaimController {
  constructor(
    private readonly claimService: ClaimService,
    private readonly nats: NatsService,
    @InjectQueue('claims') private claimQueue: Queue<string>
  ) {
    this.nats.connection.subscribe(`*.${NATS_EXCHANGE_TOPIC}`, async data => {
      const job = await this.claimQueue.add('save', data);
      console.log(job.id);
    });
  }

  @Post('/issue/:did')
  @ApiTags('Claims')
  public async postIssuerClaim(
    @Param('did') did: string,
    @Body() data: ClaimDataMessage
  ){
    const id = uuid();
    const claimData: ClaimDataMessage = {
      ...data,
      id,
      acceptedBy: did,
    }

    console.log(id);

    const payload = JSON.stringify(claimData);
    this.nats.connection.publish(`${data.requester}.${NATS_EXCHANGE_TOPIC}`, payload);
    return id;
  }

  @Post('/request/:did')
  @ApiTags('Claims')
  public async postRequesterClaim(
    @Param('did') did: string,
    @Body() data: ClaimDataMessage
  ){
    const claimData: ClaimDataMessage = {
      ...data,
      id: uuid(),
    }
    const payload = JSON.stringify(claimData);
    this.nats.connection.publish(did, payload);
    data.claimIssuer.map(issuerDid => {
      this.nats.connection.publish(`${issuerDid}.${NATS_EXCHANGE_TOPIC}`, payload);
    })
  }

  @Get('/:id')
  @ApiTags('Claims')
  public async getById(@Param('id') id: string) {
    return await this.claimService.getById(id);
  }
  @Get('/parent/:namespace')
  @ApiTags('Claims')
  public async getByParentNamespace(@Param('id') id: string) {
    return await this.claimService.getByParentNamespace(id);
  }
  @Get('/user/:did')
  @ApiTags('Claims')
  public async getByUserDid(@Param('did') did: string) {
    return await this.claimService.getByUserDid(did);
  }
  @Get('/issuer/:did')
  @ApiTags('Claims')
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
  @ApiTags('Claims')
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
