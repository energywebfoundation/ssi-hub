import { IsArray, IsString, Validate } from 'class-validator';
import { BigNumber } from 'ethers';
import { IsBigNumber } from '../../../common/isBigNumber.validator';
import { StakingTermsDTO } from './staking.terms.dto';

export class StakingPoolDTO {
  @IsString()
  address: string;

  @IsString()
  org: string;

  @Validate(IsBigNumber)
  minStakingPeriod: BigNumber;

  @Validate(IsBigNumber)
  withdrawDelay: BigNumber;

  @Validate(IsBigNumber)
  patronRewardPortion: BigNumber;

  @IsArray()
  patronRoles: string[];

  terms: StakingTermsDTO;
}
