import { IsNumber, IsString } from 'class-validator';

export class StakingTermsDTO {
  @IsNumber()
  version: number;

  @IsString()
  terms: string;
}
