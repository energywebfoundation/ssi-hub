import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  HttpCode,
  Logger,
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
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { DIDService } from './did.service';
import { DID } from './DidTypes';

@Controller('DID')
export class DIDController {
  private readonly logger: Logger;

  constructor(
    private readonly didService: DIDService,
    @InjectQueue('dids') private readonly didQueue: Queue<string>,
  ) {
    this.logger = new Logger('DIDController');
  }

  /**
   * Retrieves a cached DID Document
   * @param id The DID to retrieve
   * @param includeClaimsString true/false string as to whether or not to return full claim data
   * @returns A DID Document representation which optionally includes full claims. Returns 404 if not in cache.
   */
  @Get('/:did')
  @ApiTags('DID')
  @ApiOperation({
    summary: 'Retrieves a cached DID Document',
    description:
      'Returns a resolved DID Document, optionally with full claim data. \n' +
      'If DID Document is not yet cached, 404 is returned and request to cache is queued',
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
    try {
      this.logger.log(
        `Retrieving document for did: ${id} with includeClaims: ${includeClaimsString}`,
      );
      const did = new DID(id);
      const includeClaims = includeClaimsString === 'true';
      let didDocument = await this.didService.getById(did, includeClaims);

      if (!didDocument) {
        this.logger.log(
          `Requested document for did: ${id} not cached. Queuing cache request.`,
        );
        // awaiting refresh so that subsequent calls don't duplicate cached DID Document
        await this.didService.refreshCachedDocument(did);
        didDocument = await this.didService.getById(did, includeClaims);
      }

      this.logger.debug(`Retrieved document for did: ${id}`);
      return didDocument;
    } catch (err) {
      this.logger.error(
        `Retrieving document for did: ${id} threw error: ${err}`,
      );
    }
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
}
