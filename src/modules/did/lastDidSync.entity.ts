import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LastDidSync {
  @PrimaryColumn()
  block: number;

  @CreateDateColumn()
  createdDate: Date;
}
