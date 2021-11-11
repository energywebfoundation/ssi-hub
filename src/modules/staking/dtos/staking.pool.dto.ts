import { IsArray, IsString } from 'class-validator';
import { StakingTermsDTO } from './staking.terms.dto';

export class StakingPoolDTO {
  @IsString()
  id: string;

  @IsString()
  address: string;

  @IsArray()
  patronRoles: string[];

  terms: StakingTermsDTO;
}
