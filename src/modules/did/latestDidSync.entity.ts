import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LatestDidSync {
  @PrimaryColumn()
  block: number;

  @CreateDateColumn()
  createdDate: Date;
}
