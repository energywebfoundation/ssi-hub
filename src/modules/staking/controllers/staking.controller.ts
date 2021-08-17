import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { Auth } from '../../auth/auth.decorator';
import { SentryErrorInterceptor } from '../../interceptors/sentry-error-interceptor';
import { StakingTermsDTO } from '../dtos/staking.terms.dto';
import { StakingService } from '../staking.service';

//@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'staking', version: VERSION_NEUTRAL })
export class StakingController {
  constructor(private stakingService: StakingService) {}

  @Get('/:terms')
  @ApiTags('Staking Terms')
  @ApiOperation({
    summary: 'Returns the latest version of terms and conditions',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: StakingTermsDTO,
    description: 'Latest version of terms and condition',
  })
  public async getTerms() {
    return this.stakingService.getTerms();
  }

  @Post('/terms')
  @UsePipes(new ValidationPipe())
  @ApiTags('Staking Terms')
  @ApiBody({
    type: StakingTermsDTO,
    description: 'Staking Terms data object, containing version and terms',
  })
  @ApiOperation({
    summary: 'creates staking terms',
    description: 'creates staking terms and condition',
  })
  public async createTerms(@Body() data: StakingTermsDTO) {
    return this.stakingService.saveTerms(data);
  }
}
