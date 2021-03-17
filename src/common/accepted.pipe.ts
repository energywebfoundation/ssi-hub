import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IsAcceptedPipe implements PipeTransform {
  transform(value: any) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  }
}
