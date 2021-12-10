import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DIDContactDTO } from './did.contact.dto';
import { Logger } from '../logger/logger.service';
import { DIDContact } from './did.contact.entity';
import { DIDDocumentEntity } from '../did/did.entity';

@Injectable()
export class DIDContactService {
  constructor(
    @InjectRepository(DIDContact)
    private readonly didContactRepository: Repository<DIDContact>,
    @InjectRepository(DIDDocumentEntity)
    private readonly didDocumentRepository: Repository<DIDDocumentEntity>,
    private readonly logger: Logger,
  ) {}
  public async createDIDContact(
    didContact: DIDContactDTO,
    userDID: string,
  ): Promise<DIDContact> {
    const { did } = didContact;

    const contactCreatorDID = await this.didDocumentRepository.findOne({
      where: { id: userDID },
    });

    if (!contactCreatorDID) {
      throw new NotFoundException(`cannot find DID document for ${userDID}`);
    }
    const didContactExists = await this.didContactRepository.findOne({
      where: { did, createdBy: userDID },
    });

    if (didContactExists) {
      this.logger.debug(`DID contact with did ${did} already exists`);
      throw new BadRequestException(
        `DID contact with did ${did} already exists`,
      );
    }

    const didContactDoc = new DIDContact(didContact);
    didContactDoc.createdBy = contactCreatorDID;
    return this.didContactRepository.save(didContactDoc);
  }

  public async getDIDContacts(userDID: string): Promise<DIDContact[]> {
    return this.didContactRepository.find({ where: { createdBy: userDID } });
  }

  public async deleteDIDContact(id: string, userDID: string) {
    const didContact = await this.didContactRepository.findOne({
      where: { id, createdBy: userDID },
    });

    if (!didContact) {
      this.logger.debug(`DID contact with id ${id} was not found`);
      throw new NotFoundException(`DID contact with id ${id} was not found`);
    }

    return this.didContactRepository.remove(didContact);
  }
}
