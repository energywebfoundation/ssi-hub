import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { StatusListEntry } from './status-list-entry.entity';

@Entity()
export class CredentialWithStatus {
  static create(data: CredentialWithStatus): CredentialWithStatus {
    const entity = new CredentialWithStatus();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  namespace: string;

  @OneToOne(() => StatusListEntry)
  @JoinColumn()
  entry: StatusListEntry;
}
