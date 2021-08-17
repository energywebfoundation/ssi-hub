import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class StakingPool {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column('text', { array: true })
  terms: string[];

  constructor(stakingPool: Partial<StakingPool>) {
    Object.assign(this, stakingPool);
  }
}
