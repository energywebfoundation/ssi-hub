import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Provider } from '../../common/provider';
import { IdentityManager } from '../../ethers/IdentityManager';
import { IdentityManager__factory } from '../../ethers/factories/IdentityManager__factory';
import { OfferableIdentity__factory } from '../../ethers/factories/OfferableIdentity__factory';
import { DIDService } from '../did/did.service';
import { AssetDto } from './assets.dto';
import { Asset, AssetsHistory } from './assets.entity';
import { utils, BigNumber } from 'ethers';
import { DID, getDIDFromAddress } from '../did/did.types';
import { abi as AssetsManagerContract } from '../../../node_modules/@ew-did-registry/proxyidentity/build/contracts/IdentityManager.json';
import { Logger } from '../logger/logger.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { emptyAddress } from '../../common/constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AssetCreatedEventValues,
  AssetEvent,
  AssetHistoryEvent,
  AssetHistoryEventType,
  OfferCanceledEventValues,
  OfferedEventValues,
  OfferRejectedEventValues,
  TransferEventValue,
} from './assets.event';

@Injectable()
export class AssetsService {
  private readonly assetsManager: IdentityManager;
  constructor(
    private readonly configService: ConfigService,
    private readonly provider: Provider,
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    @InjectRepository(AssetsHistory)
    private readonly assetsHistoryRepository: Repository<AssetsHistory>,
    private readonly didService: DIDService,
    private readonly logger: Logger,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.logger.setContext(AssetsService.name);
    this.assetsManager = IdentityManager__factory.connect(
      this.configService.get<string>('ASSETS_MANAGER_ADDRESS') || '',
      this.provider,
    );
    this.initializeListeners();
    this.initializeSyncInterval();
  }

  getById(id: string) {
    return this.assetsRepository.findOne(id);
  }

  getByOfferedTo(offeredTo: string) {
    return this.assetsRepository.find({
      where: {
        offeredTo,
      },
    });
  }

  getByOwner(owner: string) {
    return this.assetsRepository.find({
      where: {
        owner,
      },
    });
  }

  getAssetHistory(
    assetId: string,
    {
      skip,
      take,
      order,
      type,
    }: {
      take: number;
      skip: number;
      order: 'ASC' | 'DESC';
      type: AssetHistoryEventType;
    },
  ) {
    const filters: { assetId: string; type?: AssetHistoryEventType } = {
      assetId,
    };
    if (type) {
      filters.type = type;
    }
    return this.assetsHistoryRepository.find({
      where: filters,
      order: {
        at: order,
      },
      skip,
      take,
    });
  }

  getPreviouslyOwnedAssets(owner: string) {
    return this.assetsRepository
      .createQueryBuilder('asset')
      .leftJoin('asset.history', 'assets_history')
      .leftJoinAndSelect('asset.document', 'did_document_entity')
      .where('assets_history.emittedBy = :owner', { owner })
      .andWhere('asset.owner != :owner', { owner })
      .andWhere(
        new Brackets(qb => {
          qb.where('assets_history.type = :asset_transferred', {
            asset_transferred: AssetHistoryEventType.ASSET_TRANSFERRED,
          }).orWhere('assets_history.type = :asset_created', {
            asset_created: AssetHistoryEventType.ASSET_CREATED,
          });
        }),
      )
      .getMany();
  }

  async create({ at, ...data }: AssetDto) {
    const document = await this.didService.addCachedDocument(data.id);
    const timestamp = new Date(at * 1000).toISOString();
    const entity = Asset.create({
      ...data,
      document,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return this.assetsRepository.save(entity);
  }

  async update({ at, ...data }: AssetDto) {
    const asset = await this.assetsRepository.findOne(data.id);
    if (!asset) {
      return this.create({ at, ...data });
    }
    const updatedAt = new Date(at * 1000).toISOString();

    const update = Asset.create({
      ...asset,
      ...data,
      updatedAt,
    });
    return this.assetsRepository.save(update);
  }

  private initializeSyncInterval() {
    const ASSETS_SYNC_INTERVAL = this.configService.get<string>(
      'ASSETS_SYNC_INTERVAL_IN_HOURS',
    );

    const ASSETS_HISTORY_SYNC_INTERVAL = this.configService.get<string>(
      'ASSETS_SYNC_HISTORY_INTERVAL_IN_HOURS',
    );

    const ASSETS_SYNC_ENABLED =
      this.configService.get<string>('ASSETS_SYNC_ENABLED') === 'true';

    if (ASSETS_SYNC_ENABLED && ASSETS_SYNC_INTERVAL) {
      const interval = setInterval(
        this.syncAssets.bind(this),
        +ASSETS_SYNC_INTERVAL * 3600000,
      );
      this.schedulerRegistry.addInterval('Assets Sync', interval);
    }

    if (ASSETS_SYNC_ENABLED && ASSETS_HISTORY_SYNC_INTERVAL) {
      const interval = setInterval(
        this.syncAssetEvents.bind(this),
        +ASSETS_HISTORY_SYNC_INTERVAL * 3600000,
      );
      this.schedulerRegistry.addInterval('Assets Events Sync', interval);
    }
  }

  private initializeListeners() {
    this.assetsManager.on(
      'IdentityCreated',
      async (identity: string, owner: string, at: BigNumber) => {
        const atAsNumber = at.toNumber();
        const assetDto = await AssetDto.create({
          id: getDIDFromAddress(identity),
          owner: getDIDFromAddress(owner),
          at: atAsNumber,
        });

        await this.create(assetDto);

        this.eventEmitter.emit(
          AssetHistoryEventType.ASSET_CREATED,
          AssetEvent.create({
            at: atAsNumber,
            emittedBy: getDIDFromAddress(owner),
            timestamp: new Date(atAsNumber * 1000).toISOString(),
            assetId: assetDto.id,
          }),
        );
      },
    );
    this.assetsManager.on(
      'IdentityOfferCanceled',
      async (
        identity: string,
        owner: string,
        offeredTo: string,
        at: BigNumber,
      ) => {
        const atNumbered = at.toNumber();
        const ownerDID = getDIDFromAddress(owner);
        const offeredToDID = getDIDFromAddress(offeredTo);
        const assetDID = getDIDFromAddress(identity);

        const assetDto = await AssetDto.create({
          id: assetDID,
          offeredTo: null,
          owner: ownerDID,
          at: atNumbered,
        });

        await this.update(assetDto);

        this.eventEmitter.emit(
          AssetHistoryEventType.ASSET_OFFER_CANCELED,
          AssetEvent.create({
            at: atNumbered,
            emittedBy: ownerDID,
            relatedTo: offeredToDID,
            timestamp: new Date(atNumbered * 1000).toISOString(),
            assetId: assetDID,
          }),
        );
      },
    );
    this.assetsManager.on(
      'IdentityOfferRejected',
      async (
        identity: string,
        owner: string,
        offeredTo: string,
        at: BigNumber,
      ) => {
        const assetDID = getDIDFromAddress(identity);
        const ownerDID = getDIDFromAddress(owner);
        const offeredToDID = getDIDFromAddress(offeredTo);
        const numberedAt = at.toNumber();

        const assetDto = await AssetDto.create({
          id: assetDID,
          offeredTo: null,
          owner: ownerDID,
          at: numberedAt,
        });
        await this.update(assetDto);

        this.eventEmitter.emit(
          AssetHistoryEventType.ASSET_OFFER_REJECTED,
          AssetEvent.create({
            at: numberedAt,
            emittedBy: offeredToDID,
            relatedTo: ownerDID,
            timestamp: new Date(numberedAt * 1000).toISOString(),
            assetId: assetDID,
          }),
        );
      },
    );
    this.assetsManager.on(
      'IdentityOffered',
      async (
        identity: string,
        owner: string,
        offeredTo: string,
        at: BigNumber,
      ) => {
        const ownerDID = getDIDFromAddress(owner);
        const assetDID = getDIDFromAddress(identity);
        const offeredToDID = getDIDFromAddress(offeredTo);
        const numberedAt = at.toNumber();

        const assetDto = await AssetDto.create({
          id: assetDID,
          offeredTo: offeredToDID,
          owner: ownerDID,
          at: numberedAt,
        });

        await this.update(assetDto);

        this.eventEmitter.emit(
          AssetHistoryEventType.ASSET_OFFERED,
          AssetEvent.create({
            at: numberedAt,
            emittedBy: ownerDID,
            timestamp: new Date(numberedAt * 1000).toISOString(),
            assetId: assetDID,
            relatedTo: offeredToDID,
          }),
        );
      },
    );
    this.assetsManager.on(
      'IdentityTransferred',
      async (identity: string, owner: string, at: BigNumber) => {
        const assetDID = getDIDFromAddress(identity);
        const newOwnerDID = getDIDFromAddress(owner);
        const numberedAt = at.toNumber();

        const assetDto = await AssetDto.create({
          id: assetDID,
          offeredTo: null,
          owner: newOwnerDID,
          at: numberedAt,
        });
        const asset = await this.getById(assetDID);
        const update = Asset.create({ ...asset, ...assetDto });
        this.assetsRepository.save(update);

        this.eventEmitter.emit(
          AssetHistoryEventType.ASSET_TRANSFERRED,
          AssetEvent.create({
            assetId: assetDID,
            at: numberedAt,
            emittedBy: newOwnerDID,
            timestamp: new Date(numberedAt * 1000).toISOString(),
            relatedTo: asset.owner,
          }),
        );
      },
    );
  }

  private async getAllCreatedAssets() {
    const assetsManagerInterface = new utils.Interface(AssetsManagerContract);
    const CreatedAssetEvent = this.assetsManager.filters.IdentityCreated(
      null,
      null,
      null,
    );
    const filter = {
      fromBlock: 0,
      toBlock: 'latest',
      address: CreatedAssetEvent.address,
      topics: [...CreatedAssetEvent.topics],
    };
    const logs = await this.provider.getLogs(filter);
    return logs.map(log => {
      const parsedLog = assetsManagerInterface.parseLog(log);
      return {
        identity: parsedLog.args.identity,
        owner: parsedLog.args.owner,
        at: parsedLog.args.at,
      } as AssetCreatedEventValues;
    });
  }

  private async syncEventForAsset<T extends { at: BigNumber }>({
    event,
    contractInterface,
    mapChainEventToCacheEvent,
  }: {
    event: any;
    contractInterface: utils.Interface;
    mapChainEventToCacheEvent(
      data: T,
      previousData: T,
    ): AssetHistoryEvent & { type: AssetHistoryEventType };
  }) {
    const filter = {
      fromBlock: 0,
      toBlock: 'latest',
      address: event.address,
      topics: [...event.topics],
    };
    const logs = await this.provider.getLogs(filter);

    const events = logs
      .map(log => {
        const parsedLog = contractInterface.parseLog(log);
        return ({
          identity: parsedLog.args.identity,
          owner: parsedLog.args.owner,
          offeredTo: parsedLog.args.offeredTo,
          at: parsedLog.args.at as BigNumber,
        } as unknown) as T;
      })
      .sort((a, b) => a.at.toNumber() - b.at.toNumber());

    await Promise.all(
      events.map((event, index, array) => {
        const { type, ...rest } = mapChainEventToCacheEvent(
          event,
          index === 0 ? ({} as T) : array[index - 1],
        );
        return this.eventEmitter.emit(type, rest);
      }),
    );
  }

  /*
   * syncAssetEvents function is syncing all events fired for certain asset
   * this function is not able to get all information from the event
   * this is caused by solidity limitation, we can only index and read 3 arguments
   * so the approach that we taken is to only index asset address, at - timestamp and the owner or offeredBy
   * depends on who fired the event
   * so the information that we going to sync is the assetId, timestamp and who fired this event
   */
  private async syncAssetEvents() {
    this.logger.debug('### ASSETS EVENTS SYNC STARTED ###');
    const assets = await this.assetsRepository.find({ select: ['id'] });
    for (const { id: assetDID } of assets) {
      this.logger.debug(`### ASSET ${assetDID} EVENTS SYNC STARTED ###`);

      const assetsManagerInterface = new utils.Interface(AssetsManagerContract);
      const parsedDID = new DID(assetDID);
      const assetAddress = parsedDID.id;
      const CreatedEvent = this.assetsManager.filters.IdentityCreated(
        assetAddress,
        null,
        null,
      );

      const logs = await this.provider.getLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: CreatedEvent.address,
        topics: [...CreatedEvent.topics],
      });

      const [{ owner: firstOwner }] = logs.map(log => {
        const parsedLog = assetsManagerInterface.parseLog(log);
        return {
          identity: parsedLog.args.identity,
          owner: parsedLog.args.owner,
          offeredTo: parsedLog.args.offeredTo,
          at: parsedLog.args.at as BigNumber,
        } as AssetCreatedEventValues;
      });

      const OfferCanceledEvent = this.assetsManager.filters.IdentityOfferCanceled(
        assetAddress,
        null,
        null,
        null,
      );

      const OfferRejectedEvent = this.assetsManager.filters.IdentityOfferRejected(
        assetAddress,
        null,
        null,
        null,
      );

      const OfferedEvent = this.assetsManager.filters.IdentityOffered(
        assetAddress,
        null,
        null,
        null,
      );

      const TransferEvent = this.assetsManager.filters.IdentityTransferred(
        assetAddress,
        null,
        null,
      );

      await this.syncEventForAsset<OfferCanceledEventValues>({
        contractInterface: assetsManagerInterface,
        event: OfferCanceledEvent,
        mapChainEventToCacheEvent: ({ at, owner }) => ({
          at: at.toNumber(),
          emittedBy: getDIDFromAddress(owner),
          timestamp: new Date(at.toNumber() * 1000).toISOString(),
          assetId: assetDID,
          type: AssetHistoryEventType.ASSET_OFFER_CANCELED,
        }),
      });

      await this.syncEventForAsset<OfferRejectedEventValues>({
        contractInterface: assetsManagerInterface,
        event: OfferRejectedEvent,
        mapChainEventToCacheEvent: ({ at, offeredTo }) => ({
          at: at.toNumber(),
          emittedBy: getDIDFromAddress(offeredTo),
          timestamp: new Date(at.toNumber() * 1000).toISOString(),
          assetId: assetDID,
          type: AssetHistoryEventType.ASSET_OFFER_REJECTED,
        }),
      });

      await this.syncEventForAsset<OfferedEventValues>({
        contractInterface: assetsManagerInterface,
        event: OfferedEvent,
        mapChainEventToCacheEvent: ({ at, owner }) => ({
          at: at.toNumber(),
          emittedBy: getDIDFromAddress(owner),
          timestamp: new Date(at.toNumber() * 1000).toISOString(),
          assetId: assetDID,
          type: AssetHistoryEventType.ASSET_OFFERED,
        }),
      });

      await this.syncEventForAsset<TransferEventValue>({
        contractInterface: assetsManagerInterface,
        event: TransferEvent,
        mapChainEventToCacheEvent: (
          { at, owner },
          { owner: previousOwner },
        ) => ({
          at: at.toNumber(),
          emittedBy: getDIDFromAddress(owner),
          timestamp: new Date(at.toNumber() * 1000).toISOString(),
          assetId: assetDID,
          relatedTo: getDIDFromAddress(previousOwner || firstOwner),
          type: AssetHistoryEventType.ASSET_TRANSFERRED,
        }),
      });
      this.logger.debug(`### ASSET ${assetDID} EVENTS SYNC FINISHED ###`);
    }
    this.logger.debug('### ASSETS EVENTS SYNC FINISHED ###');
  }

  private async syncAssets() {
    this.logger.debug('### ASSETS SYNC STARTED ###');
    const assets = await this.getAllCreatedAssets();

    for (const { at, identity, owner } of assets) {
      const assetContract = OfferableIdentity__factory.connect(
        identity,
        this.provider,
      );
      const [currentOwner, offeredTo] = await Promise.all([
        assetContract.owner(),
        assetContract.offeredTo(),
      ]);

      const assetDID = getDIDFromAddress(identity);
      let assetDto: AssetDto;
      try {
        assetDto = await AssetDto.create({
          id: assetDID,
          owner: getDIDFromAddress(currentOwner),
          offeredTo:
            offeredTo !== emptyAddress ? getDIDFromAddress(offeredTo) : null,
          at: at.toNumber(),
        });
      } catch (err) {
        this.logger.debug(
          `Validation failed for asset of did: ${assetDID} with errors: ${JSON.stringify(
            err,
            null,
            2,
          )}`,
        );
        continue;
      }
      await this.update(assetDto);
      this.logger.debug(`Asset ${assetDID} found`);
      this.eventEmitter.emit(
        AssetHistoryEventType.ASSET_CREATED,
        AssetEvent.create({
          assetId: assetDID,
          at: assetDto.at,
          emittedBy: getDIDFromAddress(owner),
          timestamp: new Date(assetDto.at * 1000).toISOString(),
        }),
      );
      continue;
    }
    this.logger.debug('### ASSETS SYNC FINISHED ###');
  }
}
