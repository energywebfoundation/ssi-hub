import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  validateOrReject,
} from 'class-validator';
import { AssetHistoryEventType } from './assets.event';
import { Order } from './assets.types';

export class AssetDto {
  static async create(data: Partial<AssetDto>) {
    const dto = new AssetDto();
    Object.assign(dto, data);
    await validateOrReject(dto, { whitelist: true });
    return dto;
  }

  @IsString()
  id: string;

  @IsString()
  owner: string;

  @IsNumber()
  at: number;

  @IsString()
  @IsOptional()
  offeredTo?: string;
}

export class HistoryQuery {
  static async create(data: Partial<HistoryQuery>) {
    const dto = new HistoryQuery();
    Object.assign(dto, data);
    await validateOrReject(dto);
    return dto;
  }
  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;

  @IsOptional()
  @IsNumber()
  @Max(100)
  take?: number = 10;

  @IsOptional()
  @IsNumber()
  skip?: number = 0;

  @IsOptional()
  @IsEnum(AssetHistoryEventType)
  type?: AssetHistoryEventType;
}
