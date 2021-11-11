import { BigNumber } from '@energyweb/iam-contracts/node_modules/ethers';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StakingTerms } from './staking.terms.entity';

@Entity({ name: 'staking_pool' })
export class StakingPool {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  org: string;

  @Column('simple-json', { default: BigNumber.from(0) })
  minStakingPeriod: BigNumber;

  @Column('simple-json')
  withdrawDelay: BigNumber;

  @Column('simple-json')
  patronRewardPortion: BigNumber;

  @Column({ type: 'varchar', array: true, default: [] })
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
