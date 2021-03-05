import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Queue } from 'bull';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { Auth } from '../auth/auth.decorator';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { DIDService } from './did.service';
import { DID } from './did.types';
import { AssetService } from './asset/asset.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller('DID')
export class DIDController {
  constructor(
    private readonly didService: DIDService,
    private readonly assetService: AssetService,
    @InjectQueue('dids') private readonly didQueue: Queue<string>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(DIDController.name);
  }

  /**
   * Retrieves a cached DID Document. If not in cache, retrieves from blockchain.
   * @param id The DID to retrieve
   * @param includeClaimsString true/false string as to whether or not to return full claim data
   * @returns A DID Document representation which optionally includes full claims.
   */
  @Get('/:did')
  @ApiTags('DID')
  @ApiOperation({
    summary: 'Retrieves a cached DID Document',
    description:
      'Returns a resolved DID Document, optionally with full claim data. \n' +
      'If DID Document is not yet cached, it is retrieved from the blockchain',
  })
  @ApiQuery({
    name: 'includeClaims',
    required: false,
    description:
      'If true, includes parsed claim JWT data in service endpoint objects',
  })
  @UseInterceptors(NotFoundInterceptor)
  public async getById(
    @Param('did') id: string,
    @Query('includeClaims') includeClaimsString: string,
  ) {
    const includeClaims = includeClaimsString === 'true';
    this.logger.info(
      `Retrieving document for did: ${id} ${
        includeClaims ? 'with claims' : ''
      }`,
    );
    const did = new DID(id);

    if (did.method !== 'ethr') {
      return this.didService.getDIDDocumentFromUniversalResolver(did.id);
    }

    let didDocument = await this.didService.getById(did, includeClaims);

    if (!didDocument) {
      this.logger.info(
        `Requested document for did: ${id} not cached. Queuing cache request.`,
      );
      // awaiting refresh so that subsequent calls don't duplicate cached DID Document
      await this.didService.refreshCachedDocument(did);
      didDocument = await this.didService.getById(did, includeClaims);
    }

    this.logger.debug(`Retrieved document for did: ${id}`);
    return didDocument;
  }

  /**
   * Queues a DID to have its DID Document cached.
   * Remark: Once a DID Document has been cached, it will be periodically refreshed
   * @param id The DID to cache
   */
  @Post('/:id')
  @ApiTags('DID')
  @ApiExcludeEndpoint()
  @HttpCode(202)
  public async upsertById(@Param('id') id: string) {
    this.logger.debug(`queueing upsert for ${id}`);
    await this.didQueue.add('refreshDocument', id);
  }

  @Get('/assets/owner/:owner')
  @ApiTags('DID')
  @HttpCode(202)
  public async getAssetsByOwner(@Param('owner') owner: string) {
    return this.assetService.getAssetsByOwner(owner);
  }

  @Get('/assets/offered_to/:offered_to')
  @ApiTags('DID')
  @HttpCode(202)
  public async getAssetsByOfferedTo(@Param('offered_to') offeredTo: string) {
    return this.assetService.getAssetsByOwner(offeredTo);
  }
}
