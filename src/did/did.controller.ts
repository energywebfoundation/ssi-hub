import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, HttpCode, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { DIDService } from './did.service';

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
   * @returns A DID Document representation which includes full claims
   */
  @Get('/:did')
  @ApiTags('DID')
  public async getById(@Param('did') id: string) {
    // What should be returned if Did isn't in cache?
    // Should it be resolved and then returned?
    // Probably just return 'Not Found' HTTP response
    const didEntity =  await this.didService.getById(id);
    return didEntity ? JSON.parse(didEntity.document) : null
  }

  /**
   * Registers the DID so that it will be tracked by the cache
   * @param id The DID to register and cache
   */
  @Post('/:id')
  @ApiTags('DID')
  @HttpCode(202)
  public async registerById(@Param('id') id: string) {
    this.logger.debug(`registering ${id}`)
    await this.didQueue.add('register', id)
  }
}
