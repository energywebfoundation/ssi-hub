import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { DID } from './did.types';

@Injectable()
export class DIDPipe implements PipeTransform<string, DID> {
  transform(did: string): DID {
    try {
      return new DID(did);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
