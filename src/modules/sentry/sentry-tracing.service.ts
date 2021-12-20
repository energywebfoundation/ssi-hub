import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Transaction } from '@sentry/types';

@Injectable()
export class SentryTracingService {
  public startTransaction(
    operationTag: string,
    operationName: string,
    data?: Record<string, any>,
  ): Transaction {
    return Sentry.startTransaction({
      op: operationTag,
      name: operationName,
      data,
    });
  }
}
