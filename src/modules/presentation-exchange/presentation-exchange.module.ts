import { Module } from '@nestjs/common';
import { DecentralizedWebNodeModule } from '../decentralized-web-node/decentralized-web-node.module';
import { VCMatchService } from './services/vc-match.service';
import { PresentationExchangeController } from './presentation-exchange.controller';

@Module({
  imports: [DecentralizedWebNodeModule],
  controllers: [PresentationExchangeController],
  providers: [VCMatchService],
})
export class PresentationExchangeModule {}
