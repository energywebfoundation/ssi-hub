import { 
  Controller,
  Get,
  Param,
  UseInterceptors,
  VERSION_NEUTRAL
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { Auth } from '../auth/auth.decorator';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { DIDService } from './did.service';
import { DID } from './did.types';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({path: 'DID', version: VERSION_NEUTRAL})
export class DIDController {
  constructor(
    private readonly didService: DIDService,
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
  @UseInterceptors(NotFoundInterceptor)
  public async getById(@Param('did') id: string) {
    this.logger.info(`Retrieving document for did: ${id}`);
    const did = new DID(id);

    if (did.method !== 'ethr') {
      return this.didService.getDIDDocumentFromUniversalResolver(did.id);
    }

    return this.didService.getById(did.id);
  }
}
