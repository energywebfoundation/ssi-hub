import { Injectable } from '@nestjs/common';
import { PEX } from '@sphereon/pex';
import {
  VerifiableCredential,
  isVerifiableCredential,
} from '@ew-did-registry/credentials-interface';
import { Logger } from '../../logger/logger.service';
import { HandlerService } from '../../decentralized-web-node/services/handler.service';
import { MatchResultsDto } from '../dtos/match-results.dto';
import { PresentationDefinitionDto } from '../dtos/presentation-definition.dto';
import { MessageDto } from '../../decentralized-web-node/dtos/message.dto';
import { CollectionsQueryDescriptorDto } from '../../decentralized-web-node/dtos/collections-query-descriptor.dto';

@Injectable()
export class VCMatchService {
  constructor(
    private readonly logger: Logger,
    private readonly handlerService: HandlerService
  ) {
    this.logger.setContext(VCMatchService.name);
  }

  async matchCredentials(
    presentationDefinition: PresentationDefinitionDto,
    holder: string
  ): Promise<MatchResultsDto> {
    const pex: PEX = new PEX();
    const credentials = await this.queryHolderVCs(holder);

    return pex.selectFrom(presentationDefinition, credentials, [holder]);
  }

  private decodeData(
    writeMessage: unknown
  ): Record<string, unknown> | undefined {
    try {
      if (!writeMessage['data']) return;
      const dataBase64 = Buffer.from(writeMessage['data'], 'base64').toString(
        'utf8'
      );
      return JSON.parse(dataBase64);
    } catch {
      return;
    }
  }

  private async queryHolderVCs(
    holder: string
  ): Promise<VerifiableCredential<Record<string, unknown>>[]> {
    const queryMessage: MessageDto & {
      descriptor: CollectionsQueryDescriptorDto;
    } = {
      descriptor: {
        method: 'CollectionsQuery',
        schema: 'https://www.w3.org/2018/credentials#VerifiableCredential',
        dataFormat: 'application/ld+json',
      },
    };

    const reply = await this.handlerService.handleMessage(queryMessage, holder);

    if (reply.status.code !== 200 || !Array.isArray(reply.entries)) {
      throw new Error(
        `Failed to query holder ${holder} for verifiable credentials`
      );
    }

    const entries = reply.entries
      .map(this.decodeData)
      .filter(Boolean)
      .filter(isVerifiableCredential);

    return entries;
  }
}
