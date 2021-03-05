import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DgraphModule } from '../dgraph/dgraph.module';
import { DgraphService } from '../dgraph/dgraph.service';
import { SentryModule } from '../sentry/sentry.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [DgraphModule, SentryModule, AuthModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, DgraphService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
