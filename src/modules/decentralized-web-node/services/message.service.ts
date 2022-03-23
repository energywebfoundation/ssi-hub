import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Logger } from '../../logger/logger.service';
import { DataSort } from '../dtos/collections-query-descriptor.dto';
import { CollectionsWriteMessage } from '../entities/collections-write-message.entity';

@Injectable()
export class MessageService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(CollectionsWriteMessage)
    private readonly messageRepository: Repository<CollectionsWriteMessage>
  ) {
    this.logger.setContext(MessageService.name);
  }

  async find(
    user: string,
    options: {
      dateSort?: DataSort;
      dataFormat?: string;
      schema?: string;
      objectId?: string;
    }
  ): Promise<CollectionsWriteMessage[]> {
    const whereParams: Record<string, string | number> = {
      target: user,
    };

    if (options.schema) {
      whereParams.schema = options.schema;
    }

    if (options.dataFormat) {
      whereParams.dataFormat = options.dataFormat;
    }

    if (options.objectId) {
      whereParams.objectId = options.objectId;
    }

    let order: FindManyOptions<CollectionsWriteMessage>['order'];
    switch (options.dateSort) {
      case 'createdDescending':
        order = {
          dateCreated: 'DESC',
        };
        break;
      case 'publishedAscending':
        order = {
          datePublished: 'ASC',
        };
        break;
      case 'publishedDescending':
        order = {
          datePublished: 'DESC',
        };
        break;
      default:
      case 'createdAscending':
        order = {
          dateCreated: 'ASC',
        };
        break;
    }

    const items = await this.messageRepository.find({
      where: whereParams,
      order,
    });
    return items;
  }

  async save(
    message: CollectionsWriteMessage,
    user: string
  ): Promise<CollectionsWriteMessage | undefined> {
    const foundMessage = await this.messageRepository.findOne({
      where: {
        objectId: message.objectId,
        target: user,
      },
    });
    let item: CollectionsWriteMessage = foundMessage;

    // https://identity.foundation/decentralized-web-node/spec/#processing-instructions
    if (foundMessage && message.dateCreated > foundMessage.dateCreated) {
      item = await this.messageRepository.save(message);
    } else if (foundMessage && message.dateCreated < foundMessage.dateCreated) {
      item = foundMessage;
    } else if (
      foundMessage &&
      message.dateCreated === foundMessage.dateCreated
    ) {
      item =
        message.cid > foundMessage.cid
          ? await this.messageRepository.save(message)
          : foundMessage;
    } else {
      item = await this.messageRepository.save(message);
    }
    return item;
  }
}
