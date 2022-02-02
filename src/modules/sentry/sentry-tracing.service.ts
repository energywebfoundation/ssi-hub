import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Transaction, TransactionContext } from '@sentry/types';

@Injectable()
export class SentryTracingService {
  public startTransaction(params: TransactionContext): Transaction | undefined {
    return Sentry.startTransaction(params);
  }
}
