import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GqlAuthGuard } from './jwt.gql.guard';
import { JwtAuthGuard } from './jwt.guard';

export function Auth({ useAuth = false }: { useAuth?: boolean } = {}) {
  if (useAuth || process.env.ENABLE_AUTH === 'true') {
    return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
  }
  return applyDecorators();
}

export function AuthGQL({ useAuth = false }: { useAuth?: boolean } = {}) {
  if (useAuth || process.env.ENABLE_AUTH === 'true') {
    return applyDecorators(UseGuards(GqlAuthGuard));
  }
  return applyDecorators();
}
