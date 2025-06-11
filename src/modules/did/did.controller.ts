import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { SentryTracingService } from '../sentry/sentry-tracing.service';
import { DIDPipe } from './did.pipe';
import { DIDService } from './did.service';
import { DID } from './did.types';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'DID', version: '1' })
export class DIDController {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly sentryTracingService: SentryTracingService
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
  @ApiParam({ name: 'did', type: 'string', required: true })
  @UseInterceptors(NotFoundInterceptor)
  public async getById(@Param('did', DIDPipe) did: DID) {
    const transaction = this.sentryTracingService.startTransaction({
      op: 'get_did_document_by_id',
      name: 'Retrieve DID Document by id',
      data: { did },
      tags: { service: DIDController.name, operation: 'getById' },
    });
    this.logger.info(`Received request for document for did: ${did.did}`);

    this.logger.info(`Retrieving document for did: ${did.did}`);
    if (did.method !== 'ethr') {
      this.logger.info(
        `Retrieving document for did: ${did.did} from universal resolver for DID method ${did.method}`
      );
      return this.didService.getDIDDocumentFromUniversalResolver(did.did);
    }
    const document = await this.didService.getById(did.did, transaction);
    this.logger.info(`Retrieved document for did: ${did.did}`);
    transaction?.finish();
    return document;
  }

  @Post()
  @ApiTags('DID')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        did: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Sync and refresh a DID document',
    description:
      'Add any incremental changes to the DID document that occurred since the last sync.\n' +
      'Also retrieves all claims from IPFS for the document.',
  })
  @UseInterceptors(NotFoundInterceptor)
  public async postById(@Body('did', DIDPipe) did: DID) {
    this.logger.info(
      `Received request for Sync and refresh document for did: ${did.id}`
    );
    const document =
      await this.didService.incrementalRefreshCachedDocumentByDid(did.did);
    this.logger.info(`Retrieved document for did: ${did.id}`);
    return document;
  }
}
