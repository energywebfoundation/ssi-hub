import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DgraphModule } from '../dgraph/dgraph.module';
import { SentryModule } from '../sentry/sentry.module';
import { NamespaceController } from './namespace.controller';
import { NamespaceService } from './namespace.service';

@Module({
  imports: [DgraphModule, SentryModule, AuthModule],
  controllers: [NamespaceController],
  providers: [NamespaceService],
})
export class NamespaceModule {}
