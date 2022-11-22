import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CID } from 'multiformats/cid';

@Injectable()
export class CIDPipe implements PipeTransform {
  transform(cid: any, metadata: ArgumentMetadata) {
    return Boolean(CID.parse(cid));
  }
}
