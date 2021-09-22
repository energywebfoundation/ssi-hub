import {
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/user.decorator';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { HistoryQuery } from './assets.dto';
import { AssetHistoryEventType } from './assets.event';
import { AssetsService } from './assets.service';
import { Order } from './assets.types';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@ApiTags('Assets')
@Controller({ path: 'assets', version: '1' })
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get(':id')
  async getByID(@Param('id') id: string, @User() currentUser?: string) {
    const asset = await this.assetsService.getById(id);
    if (
      currentUser &&
      asset &&
      asset.offeredTo !== currentUser &&
      asset.owner !== currentUser
    ) {
      throw new ForbiddenException();
    }
    return asset;
  }

  @Get('history/:id')
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: Order,
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: AssetHistoryEventType,
  })
  async getHistoryByAssetId(
    @Param('id') id: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('order') order?: Order,
    @Query('type') type?: AssetHistoryEventType,
  ) {
    const query = await HistoryQuery.create({
      order,
      skip,
      take,
      type,
    });
    return this.assetsService.getAssetHistory(id, {
      skip: query.skip,
      take: query.take,
      order: query.order,
      type: query.type,
    });
  }

  @Get('owner/:owner')
  getByOwner(@Param('owner') owner: string, @User() currentUser?: string) {
    if (currentUser && owner !== currentUser) {
      throw new ForbiddenException();
    }
    return this.assetsService.getByOwner(owner);
  }

  @Get('owner/history/:owner')
  getByPreviousOwner(
    @Param('owner') owner: string,
    @User() currentUser?: string,
  ) {
    if (currentUser && owner !== currentUser) {
      throw new ForbiddenException();
    }
    return this.assetsService.getPreviouslyOwnedAssets(owner);
  }

  @Get('offered_to/:offered_to')
  getByOfferedTo(
    @Param('offered_to') offeredTo: string,
    @User() currentUser?: string,
  ) {
    if (currentUser && offeredTo !== currentUser) {
      throw new ForbiddenException();
    }
    return this.assetsService.getByOfferedTo(offeredTo);
  }
}
