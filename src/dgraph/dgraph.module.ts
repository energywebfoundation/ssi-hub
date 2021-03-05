import { Module } from '@nestjs/common';
import { DgraphService } from './dgraph.service';

@Module({
  providers: [DgraphService],
  exports: [DgraphService],
})
export class DgraphModule {}
