import { IsDecimal, IsString } from 'class-validator';

export class StakingTermsDTO {
  @IsDecimal()
  version: number;

  @IsString()
  terms: string;
}
