import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
 * https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021entry
 */
@Entity()
export class StatusListEntry {
  static create(data: Omit<StatusListEntry, 'id' | 'entry'>): StatusListEntry {
    const entity = new StatusListEntry();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  statusListIndex: string;

  @Column()
  statusListCredential: string;

  @Column()
  type: string;

  @Column()
  statusPurpose: string;
}
