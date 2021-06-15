import { ForbiddenException } from '@nestjs/common';
import { Args, Int, Query, registerEnumType, Resolver } from '@nestjs/graphql';
import { UserGQL } from '../../common/user.decorator';
import { AuthGQL } from '../auth/auth.decorator';
import { HistoryQuery } from './assets.dto';
import { Asset, AssetsHistory } from './assets.entity';
import { AssetHistoryEventType } from './assets.event';
import { AssetsService } from './assets.service';
import { Order } from './assets.types';

registerEnumType(Order, {
  name: 'Order',
});

registerEnumType(AssetHistoryEventType, {
  name: 'AssetHistoryEventType',
});

@AuthGQL()
@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => Asset)
  async asset(
    @Args('id', { type: () => String }) id: string,
    @UserGQL() currentUser?: string,
  ) {
    const asset = await this.assetsService.getById(id);
    if (
      currentUser &&
      asset.owner !== currentUser &&
      asset.offeredTo !== currentUser
    ) {
      throw new ForbiddenException();
    }
    return asset;
  }

  @Query(() => [Asset])
  getAssetsByOwner(
    @Args('owner', { type: () => String }) owner: string,
    @UserGQL() currentUser?: string,
  ) {
    if (currentUser && owner !== currentUser) {
      throw new ForbiddenException();
    }
    return this.assetsService.getByOwner(owner);
  }

  @Query(() => [Asset])
  getAssetsByPreviousOwner(
    @Args('owner', { type: () => String }) owner: string,
    @UserGQL() currentUser?: string,
  ) {
    if (currentUser && owner !== currentUser) {
      throw new ForbiddenException();
    }
    return this.assetsService.getPreviouslyOwnedAssets(owner);
  }

  @Query(() => [Asset])
  getAssetsByOfferedTo(
    @Args('offeredTo', { type: () => String }) offeredTo: string,
    @UserGQL() currentUser?: string,
  ) {
    if (currentUser && offeredTo !== currentUser) {
      throw new ForbiddenException();
    }
    return this.assetsService.getByOfferedTo(offeredTo);
  }

  @Query(() => [AssetsHistory])
  async getAssetHistory(
    @Args('id', { type: () => String }) id: string,
    @Args('take', { type: () => Int, nullable: true, defaultValue: 10 })
    take?: number,
    @Args('skip', { type: () => Int, nullable: true, defaultValue: 0 })
    skip?: number,
    @Args('order', { type: () => Order, nullable: true })
    order?: Order,
    @Args('type', { type: () => AssetHistoryEventType, nullable: true })
    type?: AssetHistoryEventType,
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
}
