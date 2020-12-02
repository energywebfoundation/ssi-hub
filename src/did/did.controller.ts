import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, HttpCode, Logger, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { NotFoundInterceptor } from 'src/interceptors/not-found.interceptor';
import { DIDService } from './did.service';
import { DID } from './DidTypes';

@Controller('DID')
export class DIDController {
  private readonly logger: Logger;

  constructor(
    private readonly didService: DIDService,
    @InjectQueue('dids') private readonly didQueue: Queue<string>
  ) {
    this.logger = new Logger('DIDController');
  }

  /**
   * Retrieves a cached DID Document
   * @param id The DID to retrieve
   * @returns A DID Document representation which includes full claims. Returns 404 if not in cache.
   */
  @Get('/:did')
  @ApiTags('DID')
  @ApiQuery({ name: 'includeClaims', required: false })
  @UseInterceptors(NotFoundInterceptor)
  public async getById(
    @Param('did') id: string,
    @Query('includeClaims') includeClaimsString: string
  ) {
    try {
      this.logger.log(`Retrieving document for did: ${id} with includeClaims: ${includeClaimsString}`)
      const did = new DID(id);
      const includeClaims = (includeClaimsString === 'true');
      const didDocument = await this.didService.getById(did, includeClaims);

      // If DID document isn't in the cache, queue cache so that it can be retrieved on subsequent calls 
      if (!didDocument) {
        this.logger.log(`Requested document for did: ${id} not cached. Queuing cache request.`);
        //Not awaiting result of add because it does not affect result returned to client
        this.didQueue.add('refreshDocument', id);
      }

      this.logger.debug(`Retrieved document for did: ${id}`);
      return didDocument;
    }
    catch (err) {
      this.logger.error(`Retrieving document for did: ${id} threw error: ${err}`);
    }
  }

  /**
   * Queues a DID to have its DID Document cached.
   * Remark: Once a DID Document has been cached, it will be periodically refreshed
   * @param id The DID to cache
   */
  @Post('/:id')
  @ApiTags('DID')
  @HttpCode(202)
  public async upsertById(@Param('id') id: string) {
    this.logger.debug(`queueing upsert for ${id}`)
    await this.didQueue.add('refreshDocument', id)
  }
}
