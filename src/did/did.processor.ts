import { DIDDocumentLite } from '@ew-did-registry/did-document';
import { RegistrySettings, IResolver } from "@ew-did-registry/did-resolver-interface";
import { Resolver } from '@ew-did-registry/did-ethr-resolver';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DIDService } from './did.service';
import { ResolverFactory } from './ResolverFactory';

@Processor('dids')
export class DIDProcessor {
  private readonly logger: Logger;
  private readonly resolver: IResolver

  constructor(
    private readonly didService: DIDService,
    private readonly resolverFactory: ResolverFactory
  ) {
    this.logger = new Logger('DidProcessor');
    this.resolver = resolverFactory.create()
  }

  @Process('register')
  public async processDidRegistration(job: Job<string>) {
    this.logger.debug(`processing ${job.data}`);
    const id = job.data;

    this.logger.verbose(`retrieving did ${id}`);
    const alreadyRegistered = await this.didService.getById(id)
    if (alreadyRegistered) {
      this.logger.warn(`DID ${id} already registered as ${alreadyRegistered}`);
      return;
    }

    const document = new DIDDocumentLite(id, this.resolver)
    const response = await document.read();
    await this.didService.saveOrUpdateDocument(response);
  }
}