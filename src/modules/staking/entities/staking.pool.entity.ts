import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StakingTerms } from './staking.terms.entity';

@Entity({ name: 'staking_pool' })
export class StakingPool {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @OneToOne(
    () => StakingTerms,
    t => t.id,
    { eager: true },
  )
  terms: StakingTerms;

  constructor(stakingPool: Partial<StakingPool>) {
    Object.assign(this, stakingPool);
  }
}
