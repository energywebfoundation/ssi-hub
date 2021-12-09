import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { Auth } from '../auth/auth.decorator';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { DIDService } from './did.service';
import { DID, getDIDFromAddress } from './did.types';
import { DIDPipe } from './did.pipe';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'DID', version: '1' })
export class DIDController {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
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
    this.logger.info(`Received request for document for did: ${did}`);

    // If an ethr DID is received that doesn't have chain info, then add it.
    // This is because we want to be backwards compatible with EWF code that didn't include the chain info in the DID
    // But we want to add the chain info because the DID resolution is actually occurring from a specific chain
    let didToRetrieve: string;
    if (did.method === 'ethr' && did.chain === undefined) {
      didToRetrieve = getDIDFromAddress(did.id);
    } else {
      didToRetrieve = did.did;
    }

    this.logger.info(`Retrieving document for did: ${didToRetrieve}`);
    if (did.method !== 'ethr') {
      return this.didService.getDIDDocumentFromUniversalResolver(didToRetrieve);
    }
    return this.didService.getById(didToRetrieve);
  }
}
