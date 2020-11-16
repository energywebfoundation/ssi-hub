import { Resolver } from '@ew-did-registry/did-ethr-resolver';
import { DIDDocumentLite } from '@ew-did-registry/did-document'
import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, HttpCode, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { DIDService } from './did.service';
import { ResolverFactory } from './ResolverFactory';

@Controller('DID')
export class DIDController {
  private readonly logger: Logger;

  constructor(
    private readonly didService: DIDService,
    @InjectQueue('dids') private readonly didQueue: Queue<string>
  ) {
    this.logger = new Logger('DidController');
  }

  /**
   * Retrieve a chached DID Document
   * @param id The DID to retrieve
   */
  @Get('/:did')
  @ApiTags('DID')
  public async getById(@Param('did') id: string) {
    // What should be returned if Did isn't in cache?
    // Should it be resolved and then returned?
    // Probably just return 'Not Found' HTTP response
    return await this.didService.getById(id);
  }

  /**
   * Registers the DID so that it will be tracked by the cache
   * @param id The id of the DID, i.e. the EWC address
   */
  @Post('/:id')
  @ApiTags('DID')
  @HttpCode(202)
  public async registerById(@Param('id') id: string) {
    this.logger.debug(`registering ${id}`)
    await this.didQueue.add('register', id)
  }
}
