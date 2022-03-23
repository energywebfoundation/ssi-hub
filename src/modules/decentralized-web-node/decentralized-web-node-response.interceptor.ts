import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, catchError } from 'rxjs';
import { ResponseObjectDto } from './dtos/response-object.dto';

/**
 * This is motivated by the example error responses from the DWebNode spec
 * https://identity.foundation/decentralized-web-node/spec/#request-level-status-coding
 * For example, the "General request-level processing errors" example is
 *  {
 *    "requestId": "c5784162-84af-4aab-aff5-f1f8438dfc3d",
 *     "status": {
 *       "code": 500,
 *       "text": "The request could not be processed correctly"
 *     }
 * }
 */
@Injectable()
export class DecentralizedWebNodeInterceptor
  implements NestInterceptor<ResponseObjectDto>
{
  errorStatusMapping(status: number) {
    switch (status) {
      case 400:
        return {
          code: 400,
          message: 'The request object was malformed or improperly constructed',
        };
      default:
        return {
          code: 500,
          message: 'The request could not be processed correctly',
        };
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseObjectDto> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe<ResponseObjectDto>(
      catchError(async (err) => {
        const statusCode = err.status || 500;
        const statusObj = this.errorStatusMapping(statusCode);
        response.status(statusObj.code);
        return {
          requestId: request.body.requestId || '',
          status: statusObj,
        };
      })
    );
  }
}
