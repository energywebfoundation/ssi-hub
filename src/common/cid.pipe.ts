import { PipeTransform, Injectable } from '@nestjs/common';
import { CID } from 'multiformats/cid';

@Injectable()
export class CIDPipe implements PipeTransform {
  transform(cid: string) {
    return CID.parse(cid);
  }
}
