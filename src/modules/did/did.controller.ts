import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { Auth } from '../auth/auth.decorator';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { DIDService } from './did.service';
import { DID } from './did.types';
import { DIDPipe } from './did.pipe';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'DID', version: '1' })
export class DIDController {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(DIDController.name);
  }

  /**
   * Retrieves a cached DID Document. If not in cache, retrieves from blockchain.
   * @param did The DID to retrieve
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
  public async getById(@Param('did', DIDPipe) did: DID) {
    this.logger.info(`Received request for document for did: ${did.did}`);

    this.logger.info(`Retrieving document for did: ${did.did}`);
    if (did.method !== 'ethr') {
      return this.didService.getDIDDocumentFromUniversalResolver(did.did);
    }
    return this.didService.getById(did.did);
  }
}
