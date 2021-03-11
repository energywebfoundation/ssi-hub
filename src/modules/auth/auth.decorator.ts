import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';

export function Auth({ useAuth = false }: { useAuth?: boolean } = {}) {
  if (useAuth || process.env.ENABLE_AUTH === 'true') {
    return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
  }
  return applyDecorators();
}
