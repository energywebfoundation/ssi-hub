import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { StatusListEntry } from './status-list-entry.entity';

@Entity()
export class CredentialWithStatus {
  static create(
    data: Pick<CredentialWithStatus, 'id' | 'namespace'>
  ): CredentialWithStatus {
    const entity = new CredentialWithStatus();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  namespace: string;

  @OneToOne(() => StatusListEntry, { cascade: true })
  @JoinColumn()
  entry: StatusListEntry;

  public associateEntry(entry: StatusListEntry) {
    this.entry = { ...entry, id: undefined };
  }

  public getCredentialStatus() {
    return {
      id: this.entry.statusListCredential,
      type: this.entry.type,
      statusPurpose: this.entry.statusPurpose,
      statusListIndex: this.entry.statusListIndex,
      statusListCredential: this.entry.statusListCredential,
    };
  }
}
