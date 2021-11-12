import { BigNumber } from 'ethers';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Organization } from '../../organization/organization.entity';
import { StakingTerms } from './staking.terms.entity';

@Entity({ name: 'staking_pool' })
export class StakingPool {
  @PrimaryColumn()
  address: string;

  @JoinColumn()
  @OneToOne(() => Organization)
  org: Organization;

  @Column('simple-json')
  minStakingPeriod: BigNumber;

  @Column('simple-json')
  withdrawDelay: BigNumber;

  @Column('simple-json')
  patronRewardPortion: BigNumber;

  @Column({ type: 'varchar', array: true })
  patronRoles: string[];

  @ManyToOne(
    () => StakingTerms,
    t => t.id,
    { eager: true },
  )
  terms: StakingTerms;

  constructor(stakingPool: Partial<StakingPool>) {
    Object.assign(this, stakingPool);
  }
}
