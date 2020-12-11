import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClaimService } from './claim.service';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClaimDataMessage, NATS_EXCHANGE_TOPIC } from './ClaimTypes';
import { NatsService } from '../nats/nats.service';
import { v4 as uuid } from 'uuid';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { validate } from 'class-validator';
import { ClaimIssue, ClaimRequest } from './ClaimDTO';

@Controller('claim')
export class ClaimController {
  private readonly logger: Logger;

  constructor(
    private readonly claimService: ClaimService,
    private readonly nats: NatsService,
    @InjectQueue('claims') private claimQueue: Queue<string>,
  ) {
    this.logger = new Logger('ClaimController');
    this.nats.connection.subscribe(`*.${NATS_EXCHANGE_TOPIC}`, async data => {
      this.logger.debug(`saving ${data}`);
      await this.claimQueue.add('save', data);
    });
  }

  @Post('/issue/:did')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  @ApiBody({
    type: ClaimIssue,
    description: 'Claim data object, containing id and issuedToken',
  })
  @ApiOperation({
    summary: 'updates claim request',
    description: 'updates claim request upon acceptance with DID of an Issuer',
  })
  public async postIssuerClaim(
    @Param('did') did: string,
    @Body() data: ClaimDataMessage,
  ) {
    const claimData: ClaimDataMessage = {
      ...data,
      acceptedBy: did,
    };

    const claimDTO = new ClaimIssue(claimData);

    const err = await validate(claimDTO);

    if (err.length > 0) {
      return err;
    }

    const payload = JSON.stringify(claimData);
    this.nats.connection.publish(
      `${data.requester}.${NATS_EXCHANGE_TOPIC}`,
      payload,
    );
  }

  @Post('/request/:did')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'registers new claim request',
    description:
      'registers new claim request, returns ID of newly added claim request',
  })
  @ApiResponse({
    status: 200,
    type: String,
    description: 'ID of newly added claim',
  })
  public async postRequesterClaim(
    @Param('did') did: string,
    @Body() data: ClaimDataMessage,
  ) {
    const id = uuid();
    const claimData: ClaimDataMessage = {
      ...data,
      id,
    };

    const claimDTO = new ClaimRequest(claimData);

    const err = await validate(claimDTO);

    if (err.length > 0) {
      return err;
    }

    const payload = JSON.stringify(claimData);
    this.logger.debug(`publishing claims request ${payload}`);
    this.nats.connection.publish(did, payload);
    data.claimIssuer.map(issuerDid => {
      this.nats.connection.publish(
        `${issuerDid}.${NATS_EXCHANGE_TOPIC}`,
        payload,
      );
    });
    return id;
  }

  @Get('/:id')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claim with given ID',
  })
  public async getById(@Param('id') id: string) {
    return await this.claimService.getById(id);
  }

  @Delete('/:id')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  public async removeById(@Param('id') id: string) {
    return await this.claimService.removeById(id);
  }

  @Get('/parent/:namespace')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims for roles related to given namespace',
    description:
      '### Usage: \n ' +
      'providing namespace `myApp.apps.myOrg.iam.ewc` <br> ' +
      'should return claims for namespaces like ' +
      '`admin.roles.myApp.apps.myOrg.iam.ewc`',
  })
  public async getByParentNamespace(@Param('id') id: string) {
    return await this.claimService.getByParentNamespace(id);
  }

  @Get('/user/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims Related to given DID',
  })
  public async getByUserDid(@Param('did') did: string) {
    return await this.claimService.getByUserDid(did);
  }

  @Get('/issuer/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims of Issuer with given DID',
  })
  @ApiQuery({
    name: 'accepted',
    required: false,
    description:
      '**true** - show only accepted <br> **false** - show only pending',
  })
  @ApiQuery({
    name: 'namespace',
    required: false,
    description: 'filter only claims of given namespace',
  })
  public async getByIssuerDid(
    @Param('did') did: string,
    @Query('accepted') accepted: boolean,
    @Query('namespace') namespace: string,
  ) {
    return await this.claimService.getByIssuer(did, { accepted, namespace });
  }

  @Get('/requester/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims for Requester with given DID',
  })
  @ApiQuery({
    name: 'accepted',
    required: false,
    description:
      '**true** - show only accepted <br> **false** - show only pending',
  })
  @ApiQuery({
    name: 'namespace',
    required: false,
    description: 'filter only claims of given namespace',
  })
  public async getByRequesterDid(
    @Param('did') did: string,
    @Query('accepted') accepted: boolean,
    @Query('namespace') namespace: string,
  ) {
    return await this.claimService.getByRequester(did, { accepted, namespace });
  }

  @Get('/did/:namespace')
  @ApiQuery({
    name: 'accepted',
    required: false,
    description: 'additional filter',
  })
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns DIDs of claim requests for given namespace',
  })
  public async getDidsOfNamespace(
    @Param('namespace') namespace: string,
    @Query('accepted') accepted: boolean,
  ) {
    return this.claimService.getDidOfClaimsOfnamespace(namespace, accepted);
  }
}
