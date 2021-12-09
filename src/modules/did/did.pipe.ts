import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { DID } from './did.types';

@Injectable()
export class DIDPipe implements PipeTransform<string, DID> {
  transform(did: string, metadata: ArgumentMetadata): DID {
    return new DID(did);
  }
}
