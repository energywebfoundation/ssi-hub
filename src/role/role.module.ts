import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DgraphModule } from '../dgraph/dgraph.module';
import { DIDModule } from '../did/did.module';
import { SentryModule } from '../sentry/sentry.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    DgraphModule,
    DIDModule,
    SentryModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
