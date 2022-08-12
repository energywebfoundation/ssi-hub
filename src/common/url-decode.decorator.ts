import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decodes URL encoded "originalUrl"
 */
export const UrlDecoded = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return decodeURIComponent(request.originalUrl);
  }
);
