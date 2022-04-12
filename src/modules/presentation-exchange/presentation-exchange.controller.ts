import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/user.decorator';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { MatchResultsDto } from './dtos/match-results.dto';
import { PresentationDefinitionDto } from './dtos/presentation-definition.dto';
import { VCMatchService } from './services/vc-match.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'vp', version: '1' })
@ApiTags('Verifiable Presentation')
export class PresentationExchangeController {
  constructor(
    private readonly logger: Logger,
    private readonly vcMatchService: VCMatchService
  ) {
    this.logger.setContext(PresentationExchangeController.name);
  }

  @Post('/match')
  @ApiOkResponse({ type: MatchResultsDto })
  public async getMatchedCredentialsForVpDefinition(
    @User() user: string,
    @Body() presentationDefinition: PresentationDefinitionDto
  ): Promise<MatchResultsDto> {
    return await this.vcMatchService.matchCredentials(
      presentationDefinition,
      user
    );
  }
}
