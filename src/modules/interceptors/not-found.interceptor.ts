import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    {
      return next.handle().pipe(
        tap(data => {
          if (data === null)
            context
              .switchToHttp()
              .getResponse()
              .status(HttpStatus.NOT_FOUND);
        }),
      );
    }
  }
}
