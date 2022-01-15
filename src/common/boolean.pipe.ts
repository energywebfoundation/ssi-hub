import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BooleanPipe implements PipeTransform {
  transform(value: unknown) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  }
}
