import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'staking_terms' })
export class StakingTerms {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('character varying')
  terms: string;

  @Column('double')
  version: number;

  constructor(stakingTerms: Partial<StakingTerms>) {
    Object.assign(this, stakingTerms);
  }
}
