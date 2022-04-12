import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';
import { Logger } from '../../logger/logger.service';
import { CollectionsQueryDescriptorDto } from '../dtos/collections-query-descriptor.dto';
import { CollectionsWriteDescriptorDto } from '../dtos/collections-write-descriptor.dto';
import { MessageDto } from '../dtos/message.dto';
import { ResponseReplyDto } from '../dtos/response-reply.dto';
import { CollectionsWriteMessage } from '../entities/collections-write-message.entity';
import { MessageService } from './message.service';

@Injectable()
export class HandlerService {
  constructor(
    private readonly logger: Logger,
    private readonly messageService: MessageService
  ) {
    this.logger.setContext(HandlerService.name);
  }

  private async generateMessageId(message: MessageDto): Promise<string> {
    const bytes = json.encode(message);
    const hash = await sha256.digest(bytes);
    const cid = CID.create(1, json.code, hash);
    return cid.toString();
  }

  async handleMessage(
    message: MessageDto,
    holder: string
  ): Promise<ResponseReplyDto> {
    const messageId = await this.generateMessageId(message);
    const isValid = await validate(plainToClass(MessageDto, message), {
      forbidNonWhitelisted: true,
    });

    if (isValid.length) {
      return {
        messageId,
        status: {
          code: 400,
          message: 'The message was malformed or improperly constructed',
        },
      };
    }

    switch (message.descriptor.method) {
      case CollectionsQueryDescriptorDto.methodValue:
        return this.handleQuery(
          message as MessageDto & {
            descriptor: CollectionsQueryDescriptorDto;
          },
          holder,
          messageId
        );

      case CollectionsWriteDescriptorDto.methodValue:
        return this.handleWrite(
          message as {
            descriptor: CollectionsWriteDescriptorDto;
          },
          holder,
          messageId
        );
      default:
        return {
          messageId,
          status: {
            code: 501,
            message: 'The interface method is not implemented',
          },
        };
    }
  }

  private async handleQuery(
    message: MessageDto & { descriptor: CollectionsQueryDescriptorDto },
    holder: string,
    messageId: string
  ): Promise<ResponseReplyDto> {
    const entries = await this.messageService.find(holder, {
      dateSort: message.descriptor.dateSort,
      dataFormat: message.descriptor.dataFormat,
      schema: message.descriptor.schema,
      objectId: message.descriptor.objectId,
    });

    return {
      messageId,
      status: {
        code: 200,
        message: 'OK',
      },
      entries: [...entries.map((entry) => entry.message)],
    };
  }

  private async handleWrite(
    message: MessageDto & { descriptor: CollectionsWriteDescriptorDto },
    holder: string,
    messageId: string
  ): Promise<ResponseReplyDto> {
    const entry = await this.messageService.save(
      CollectionsWriteMessage.create({
        message,
        objectId: message.descriptor.objectId,
        target: holder,
        data: message.data,
        method: message.descriptor.method,
        schema: message.descriptor.schema,
        dataFormat: message.descriptor.dataFormat,
        dateCreated: new Date(message.descriptor.dateCreated).toISOString(),
        datePublished:
          message.descriptor.datePublished &&
          new Date(message.descriptor.datePublished).toISOString(),
        cid: message.descriptor.cid,
      }),
      holder
    );

    return {
      messageId,
      status: {
        code: 201,
        message: 'OK',
      },
      entries: [entry.message],
    };
  }
}
